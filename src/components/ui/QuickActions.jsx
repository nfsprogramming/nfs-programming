import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MessageSquare, Github, Linkedin, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Magnetic from './Magnetic';

export default function QuickActions() {
    const [isOpen, setIsOpen] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsOpen(false);
    };

    const actions = [
        { icon: <ArrowUp size={20} />, label: "Scroll Top", onClick: scrollToTop },
        { icon: <MessageSquare size={20} />, label: "Contact", link: "/contact" },
        { icon: <Github size={20} />, label: "GitHub", href: "https://github.com/nfsprogramming" },
        { icon: <Linkedin size={20} />, label: "LinkedIn", href: "https://www.linkedin.com/in/nfs-photography" },
    ];

    return (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999 }}>
            <AnimatePresence>
                {isOpen && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>
                        {actions.map((action, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Magnetic>
                                    <div>
                                        {action.link ? (
                                            <Link to={action.link} onClick={() => setIsOpen(false)}>
                                                <ActionButton icon={action.icon} label={action.label} />
                                            </Link>
                                        ) : action.href ? (
                                            <a href={action.href} target="_blank" rel="noopener noreferrer">
                                                <ActionButton icon={action.icon} label={action.label} />
                                            </a>
                                        ) : (
                                            <div onClick={action.onClick}>
                                                <ActionButton icon={action.icon} label={action.label} />
                                            </div>
                                        )}
                                    </div>
                                </Magnetic>
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>

            <Magnetic>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'var(--accent-color)',
                        color: 'white',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 10px 30px rgba(255, 46, 46, 0.4)',
                    }}
                >
                    <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                    >
                        <Plus size={30} />
                    </motion.div>
                </motion.button>
            </Magnetic>
        </div>
    );
}

function ActionButton({ icon, label }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'flex-end' }}>
            <span style={{ 
                background: 'var(--glass-bg)', 
                color: 'var(--text-color)', 
                padding: '6px 14px', 
                borderRadius: '8px', 
                fontSize: '0.85rem',
                fontWeight: 600,
                border: '1px solid var(--glass-border)',
                backdropFilter: 'blur(10px)',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
                {label}
            </span>
            <div style={{
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-color)',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
                {icon}
            </div>
        </div>
    );
}
