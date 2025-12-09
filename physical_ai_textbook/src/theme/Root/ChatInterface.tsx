import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import './ChatInterface.css';

// --- Interfaces ---
interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    sources?: string[];
}

interface UserProfile {
    name: string;
    software_bg: string;
    hardware_bg: string;
}

const SUGGESTIONS = [
    "Explain PID Control",
    "What is ROS 2?",
    "Write Python code for IK",
    "Summarize this page"
];

// --- Component ---
export default function ChatInterface() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', role: 'assistant', content: 'Hello! I am your AI Tutor. Ask me anything about **Robotics** or **Physical AI**.' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Profile State
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [showProfileForm, setShowProfileForm] = useState(true);
    const [formData, setFormData] = useState({ name: '', software: '', hardware: '' });

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initialize
    useEffect(() => {
        const saved = localStorage.getItem('user_profile');
        if (saved) {
            const p = JSON.parse(saved);
            setProfile(p);
            setFormData({ name: p.name, software: p.software_bg, hardware: p.hardware_bg });
            setShowProfileForm(false);
            setMessages([{ id: 'welcome', role: 'assistant', content: `Welcome back, **${p.name}**! How can I help with your studies today?` }]);
        }
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen, showProfileForm]);

    // Scroll State
    const [showScrollBtn, setShowScrollBtn] = useState(false);

    // --- Handlers ---

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        // Show button if we are more than 100px away from bottom
        setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 100);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const clearChat = () => {
        if (confirm("Clear conversation history?")) {
            setMessages([{ id: 'new', role: 'assistant', content: "Chat cleared. Ready for new questions!" }]);
        }
    };

    const saveProfile = () => {
        if (!formData.name) return alert("Name is required");
        const newProfile = {
            name: formData.name,
            software_bg: formData.software || "General",
            hardware_bg: formData.hardware || "None"
        };
        setProfile(newProfile);
        localStorage.setItem('user_profile', JSON.stringify(newProfile));
        setShowProfileForm(false);
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: "Profile saved! I will now tailor my explanations to your background." }]);
    };

    const processContentAction = async (endpoint: string, promptDisplay: string) => {
        const selection = window.getSelection()?.toString();
        const contentToProcess = selection || document.querySelector('main')?.innerText || "";

        if (contentToProcess.length < 10) return alert("Please select some text or go to a page with content.");

        setIsLoading(true);
        setIsOpen(true);
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: promptDisplay }]);

        try {
            const body = endpoint.includes('personalize')
                ? { content: contentToProcess, user_profile: { user_id: '1', ...profile } }
                : { content: contentToProcess };

            const res = await fetch(`https://physical-ai-backend-jfiv.onrender.com${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const data = await res.json();
            setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: data.content }]);
        } catch (e) {
            setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: "Error connecting to Intelligence Engine." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const sendMessage = async (text: string) => {
        if (!text.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        const selection = window.getSelection()?.toString() || '';

        try {
            const response = await fetch('https://physical-ai-backend-jfiv.onrender.com/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMsg.content,
                    context: selection.length > 0 ? selection : undefined,
                    user_profile: profile ? { user_id: '1', ...profile } : undefined
                })
            });

            const data = await response.json();
            setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: data.reply, sources: data.sources }]);
        } catch (error) {
            setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: 'Backend Offline. Please start the FastAPI server.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChatSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
    };

    return (
        <>
            <div className="fab-container">
                <button onClick={() => processContentAction('translate', '🌐 Translate this page to Urdu.')} className="fab-mini" title="Translate to Urdu">🌐</button>
                <button onClick={() => processContentAction('personalize', '✨ Personalize this content for me.')} className="fab-mini" title="Personalize Content">✨</button>
            </div>

            <button
                className={clsx('chat-toggle', { 'chat-toggle-open': isOpen })}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? '✕' : '💬'}
            </button>

            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <h3>AI Tutor {profile ? `• ${profile.name}` : ''}</h3>
                            <button onClick={clearChat} title="Clear Chat" style={{ background: 'transparent', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: '0.8rem' }}>🗑️</button>
                        </div>
                        {profile && <span className="badge" onClick={() => setShowProfileForm(true)} style={{ cursor: 'pointer' }}>Edit</span>}
                    </div>

                    <div className="chat-messages" onScroll={handleScroll}>
                        {showScrollBtn && (
                            <button
                                onClick={scrollToBottom}
                                style={{
                                    position: 'absolute', bottom: '80px', right: '20px',
                                    zIndex: 10, padding: '5px 10px', borderRadius: '20px',
                                    border: 'none', background: 'var(--ifm-color-primary)', color: 'white',
                                    cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
                                }}
                            >
                                ↓ New
                            </button>
                        )}
                        {showProfileForm ? (
                            <div className="profile-form">
                                <h4 style={{ color: 'white', marginBottom: '10px' }}>🚀 Setup Your Profile</h4>
                                <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '15px' }}>Tailor the experience to your background.</p>

                                <div className="form-group">
                                    <label>Name</label>
                                    <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Your Name" />
                                </div>

                                <div className="form-group">
                                    <label>Software Background</label>
                                    <input value={formData.software} onChange={e => setFormData({ ...formData, software: e.target.value })} placeholder="e.g. Python Expert" />
                                </div>

                                <div className="form-group">
                                    <label>Hardware Background</label>
                                    <input value={formData.hardware} onChange={e => setFormData({ ...formData, hardware: e.target.value })} placeholder="e.g. Arduino only" />
                                </div>

                                <button onClick={saveProfile} className="save-btn">Save Profile</button>
                            </div>
                        ) : (
                            <>
                                {messages.map((msg) => (
                                    <div key={msg.id} className={clsx('message', `message-${msg.role}`)}>
                                        <div className="message-content">
                                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                                        </div>
                                    </div>
                                ))}
                                {isLoading && <div className="message message-assistant"><div className="loading-dots"><div /><div /><div /></div></div>}
                                <div ref={messagesEndRef} />
                            </>
                        )}
                    </div>

                    {!showProfileForm && (
                        <>
                            <div className="suggestion-chips">
                                {SUGGESTIONS.map(s => (
                                    <button key={s} className="suggestion-chip" onClick={() => sendMessage(s)} disabled={isLoading}>
                                        {s}
                                    </button>
                                ))}
                            </div>
                            <form className="chat-input-form" onSubmit={handleChatSubmit}>
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={window.getSelection()?.toString() ? "Ask about selected text..." : "Ask a question..."}
                                    disabled={isLoading}
                                />
                                <button type="submit" disabled={isLoading || !input.trim()}>Send</button>
                            </form>
                        </>
                    )}
                </div>
            )}
        </>
    );
}
