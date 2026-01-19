import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, X, Minus, Square } from 'lucide-react';

const commands = {
    help: "Available commands: bio, skills, socials, email, contact, quote, clear, whoami",
    bio: "I am a Full Stack Engineer passionate about AI and scalable architectures.",
    skills: "JavaScript, React, Python, Node.js, AI/ML, Three.js, Docker, AWS",
    socials: "GitHub: nfsprogramming | LinkedIn: (Simulated)",
    email: "nifrasempire25@gmail.com",
    contact: "You can reach me at nifrasempire25@gmail.com or via the Contact page.",
    whoami: "visitor@nfs-portfolio:~ (You are a curious explorer)",
    quote: "\"The best way to predict the future is to invent it.\" - Alan Kay",
    sudo: "Permission denied: You are not authorized."
};

export default function Terminal() {
    const [history, setHistory] = useState([
        { type: 'info', content: 'Welcome to NFS Terminal v1.0.0' },
        { type: 'info', content: 'Type "help" to see available commands.' }
    ]);
    const [input, setInput] = useState('');
    const bottomRef = useRef(null);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            let cmd = input.trim().toLowerCase();

            // Aliases
            if (cmd === 'who i am' || cmd === 'who am i') cmd = 'whoami';
            if (cmd === 'hi' || cmd === 'hello') cmd = 'help';

            const newHistory = [...history, { type: 'input', content: input }];

            if (cmd === 'clear') {
                setHistory([]);
            } else if (commands[cmd]) {
                newHistory.push({ type: 'output', content: commands[cmd] });
                setHistory(newHistory);
            } else if (cmd !== '') {
                newHistory.push({ type: 'error', content: `Command not found: ${cmd}. Type "help" for valid commands.` });
                setHistory(newHistory);
            }

            setInput('');
        }
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md-terminal"
            style={{
                background: '#0a0a0a',
                borderRadius: '12px',
                border: '1px solid #333',
                overflow: 'hidden',
                fontFamily: '"Fira Code", monospace',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                marginTop: '1rem',
                width: '100%',
                maxWidth: '700px'
            }}
        >
            {/* Terminal Header */}
            <div style={{
                background: '#1a1a1a',
                padding: '0.8rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                borderBottom: '1px solid #333'
            }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
                </div>
                <div style={{ flex: 1, textAlign: 'center', color: '#888', fontSize: '0.8rem', fontWeight: 600 }}>
                    visitor@nfs-portfolio:~
                </div>
            </div>

            {/* Terminal Body */}
            <div style={{ padding: '1.5rem', minHeight: '300px', maxHeight: '300px', overflowY: 'auto', color: '#e0e0e0', fontSize: '0.9rem' }}>
                {history.map((line, i) => (
                    <div key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.5' }}>
                        {line.type === 'input' && (
                            <span style={{ color: '#27c93f', marginRight: '0.5rem' }}>➜ ~</span>
                        )}
                        <span style={{
                            color: line.type === 'error' ? '#ff5f56' :
                                line.type === 'info' ? '#888' :
                                    'inherit'
                        }}>
                            {line.content}
                        </span>
                    </div>
                ))}

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: '#27c93f', marginRight: '0.5rem' }}>➜ ~</span>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleCommand}
                        autoFocus
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'white',
                            fontFamily: 'inherit',
                            fontSize: 'inherit',
                            outline: 'none',
                            flex: 1,
                            minWidth: '50px'
                        }}
                    />
                </div>
                <div ref={bottomRef} />
            </div>
        </motion.div>
    );
}
