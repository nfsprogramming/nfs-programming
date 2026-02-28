import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';

const messages = [
    "Initializing neural systems...",
    "Syncing high-fidelity assets...",
    "Optimizing performance...",
    "Loading digital architecture...",
    "Polishing interfaces...",
    "Almost there..."
];

/**
 * Enhanced Preloader Component
 * 
 * Features:
 * - Determinate progress indication
 * - Dynamic loading messages
 * - Full accessibility support (ARIA, Reduced Motion)
 * - Optimized performance (60fps)
 * - Responsive design
 * 
 * @param {Function} onComplete - Callback when loading finishes
 */
const Preloader = ({ 
    onComplete, 
    accentColor = "#ff2e2e",
    backgroundColor = "#000000",
    textColor = "#ffffff"
}) => {
    const [progress, setProgress] = useState(0);
    const [messageIndex, setMessageIndex] = useState(0);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        const duration = 2500; // 2.5 seconds total load time
        const interval = 20;
        const step = 100 / (duration / interval);

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 600);
                    return 100;
                }
                return Math.min(prev + step, 100);
            });
        }, interval);

        const messageTimer = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % messages.length);
        }, 600);

        return () => {
            clearInterval(timer);
            clearInterval(messageTimer);
        };
    }, [onComplete]);

    const roundedProgress = Math.round(progress);

    return (
        <motion.div
            role="progressbar"
            aria-valuenow={roundedProgress}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="Loading portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
                opacity: 0,
                scale: shouldReduceMotion ? 1 : 1.1,
                filter: shouldReduceMotion ? 'none' : 'blur(20px)',
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            }}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 10000,
                background: backgroundColor,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: textColor,
                overflow: 'hidden'
            }}
        >
            {/* Ambient Background Glow */}
            {!shouldReduceMotion && (
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{
                        position: 'absolute',
                        width: '60vw',
                        height: '60vw',
                        background: `radial-gradient(circle, ${accentColor}33 0%, transparent 70%)`,
                        filter: 'blur(60px)',
                        zIndex: -1
                    }}
                />
            )}

            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                {/* Progress Circle (SVG) */}
                <div style={{ position: 'relative', width: '120px', height: '120px' }}>
                    <svg width="120" height="120" viewBox="0 0 120 120">
                        <circle
                            cx="60"
                            cy="60"
                            r="54"
                            fill="none"
                            stroke="rgba(255,255,255,0.15)"
                            strokeWidth="4"
                        />
                        <motion.circle
                            cx="60"
                            cy="60"
                            r="54"
                            fill="none"
                            stroke={accentColor}
                            strokeWidth="4"
                            strokeDasharray="339.29"
                            animate={{ strokeDashoffset: 339.29 - (339.29 * progress) / 100 }}
                            transition={{ ease: "linear" }}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        fontVariantNumeric: 'tabular-nums'
                    }}>
                        {roundedProgress}%
                    </div>
                </div>

                {/* Text and Message */}
                <div style={{ textAlign: 'center' }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ 
                            fontSize: '1rem', 
                            letterSpacing: '0.4em', 
                            textTransform: 'uppercase', 
                            margin: 0,
                            fontWeight: 400,
                            color: 'rgba(255,255,255,0.9)'
                        }}
                    >
                        NFS Portfolio
                    </motion.h1>
                    
                    <div style={{ height: '24px', marginTop: '0.5rem' }}>
                        <p
                            style={{ 
                                fontSize: '0.75rem', 
                                color: 'rgba(255,255,255,0.4)',
                                margin: 0,
                                fontStyle: 'italic'
                            }}
                        >
                            {messages[messageIndex]}
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Progress Line */}
            <motion.div 
                style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    left: 0, 
                    height: '2px', 
                    background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
                    width: '100%',
                    scaleX: progress / 100,
                    transformOrigin: 'center'
                }} 
            />
        </motion.div>
    );
};

export default Preloader;
