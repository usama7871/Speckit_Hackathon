import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
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

// --- Component ---
export default function ChatInterface() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', role: 'assistant', content: 'Hello! I am your AI Tutor. Please set up your profile to enable personalization.' }
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
            setMessages([{ id: 'welcome', role: 'assistant', content: `Welcome back, ${p.name}! How can I help with your Physical AI studies today?` }]);
        }
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen, showProfileForm]);

    // --- Handlers ---

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

            const res = await fetch(`http://localhost:8000/${endpoint}`, {
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

    const handleChatSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        const selection = window.getSelection()?.toString() || '';

        try {
            const response = await fetch('http://localhost:8000/chat', {
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
                        <h3>AI Tutor {profile ? `• ${profile.name}` : ''}</h3>
                        {profile && <span className="badge" onClick={() => setShowProfileForm(true)} style={{ cursor: 'pointer' }}>Edit Profile</span>}
                    </div>

                    <div className="chat-messages">
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
                                    <input value={formData.software} onChange={e => setFormData({ ...formData, software: e.target.value })} placeholder="e.g. Expert Python, No C++" />
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
                                        <div className="message-content" style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</div>
                                    </div>
                                ))}
                                {isLoading && <div className="message message-assistant"><div className="loading-dots"><div /><div /><div /></div></div>}
                                <div ref={messagesEndRef} />
                            </>
                        )}
                    </div>

                    {!showProfileForm && (
                        <form className="chat-input-form" onSubmit={handleChatSubmit}>
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={window.getSelection()?.toString() ? "Ask about selected text..." : "Ask a question..."}
                                disabled={isLoading}
                            />
                            <button type="submit" disabled={isLoading || !input.trim()}>Send</button>
                        </form>
                    )}
                </div>
            )}
        </>
    );
}
