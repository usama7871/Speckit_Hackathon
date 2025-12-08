import React from 'react';
import ChatInterface from './ChatInterface';

// Default implementation, that you can customize
export default function Root({ children }) {
    return (
        <>
            {children}
            <ChatInterface />
        </>
    );
}
