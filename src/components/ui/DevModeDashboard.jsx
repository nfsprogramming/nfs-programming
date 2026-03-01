import { useState, useEffect } from 'react';
import { motion, useScroll, useVelocity } from 'framer-motion';
import { Activity, Cpu, HardDrive, Wifi, Shield, Zap, X, Terminal } from 'lucide-react';

export default function DevModeDashboard() {
    const [isOpen, setIsOpen] = useState(false);
    const [fps, setFps] = useState(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const [velocityVal, setVelocityVal] = useState(0);
    const [memory, setMemory] = useState({ used: 0, total: 0 });
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const handleToggle = () => setIsOpen(prev => !prev);
        window.addEventListener('toggle-dev-mode', handleToggle);
        return () => window.removeEventListener('toggle-dev-mode', handleToggle);
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        // FPS Calculation
        let frameCount = 0;
        let lastTime = performance.now();
        let animationFrameId;

        const measureFPS = () => {
            const now = performance.now();
            frameCount++;
            if (now - lastTime >= 1000) {
                setFps(frameCount);
                frameCount = 0;
                lastTime = now;
            }
            animationFrameId = requestAnimationFrame(measureFPS);
        };
        animationFrameId = requestAnimationFrame(measureFPS);

        // Memory Calculation (Chrome only, mocked fake dynamic data otherwise)
        const updateMemory = () => {
            if (performance.memory) {
                setMemory({
                    used: (performance.memory.usedJSHeapSize / 1048576).toFixed(1),
                    total: (performance.memory.jsHeapSizeLimit / 1048576).toFixed(1)
                });
            } else {
                setMemory({
                    used: (Math.random() * 15 + 40).toFixed(1),
                    total: 1024
                });
            }
        };
        const memInterval = setInterval(updateMemory, 1000);
        updateMemory();

        // Fake System Logs
        const logMessages = [
            "Optimizing GLSL shaders...",
            "Garbage collection executed (12ms).",
            "Re-rendering Virtual DOM...",
            "Fetching real-time analytics...",
            "Neural Node connection established.",
            "Preloading image assets...",
            "Lazy-loading components..."
        ];

        const logInterval = setInterval(() => {
            setLogs(prev => {
                const newLogs = [...prev, `[${new Date().toLocaleTimeString()}] ${logMessages[Math.floor(Math.random() * logMessages.length)]}`];
                if (newLogs.length > 8) return newLogs.slice(newLogs.length - 8);
                return newLogs;
            });
        }, 2500);

        return () => {
            cancelAnimationFrame(animationFrameId);
            clearInterval(memInterval);
            clearInterval(logInterval);
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        const unsubscribe = scrollVelocity.on("change", (v) => {
            setVelocityVal(Math.abs(v).toFixed(0));
        });
        return () => unsubscribe();
    }, [isOpen, scrollVelocity]);

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(25px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                zIndex: 99999,
                background: 'rgba(5, 5, 5, 0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: '"Fira Code", monospace',
                color: '#00ff41',
                padding: '2rem'
            }}
        >
            <div style={{ position: 'absolute', top: '2rem', right: '2rem' }}>
                <button
                    onClick={() => setIsOpen(false)}
                    style={{
                        background: 'transparent',
                        border: '1px solid #00ff41',
                        color: '#00ff41',
                        padding: '0.5rem',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <X size={24} />
                </button>
            </div>

            <div style={{
                width: '100%',
                maxWidth: '1200px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem'
            }}>
                {/* Header Title */}
                <div style={{ gridColumn: '1 / -1', marginBottom: '1rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '1rem', margin: 0 }}>
                        <Terminal size={32} /> PORTFOLIO ENGINE v2.0
                    </h1>
                    <p style={{ color: '#aaa', marginTop: '0.5rem' }}>Real-time telemetry and diagnostics dashboard.</p>
                </div>

                {/* FPS & Performance */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    style={{
                        border: '1px solid rgba(0, 255, 65, 0.3)',
                        background: 'rgba(0, 255, 65, 0.05)',
                        padding: '1.5rem',
                        borderRadius: '12px'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                        <Activity size={24} color="#00ff41" />
                        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Render Engine</h3>
                    </div>
                    <div style={{ fontSize: '3rem', fontWeight: 800 }}>
                        {fps} <span style={{ fontSize: '1.2rem', color: '#aaa' }}>FPS</span>
                    </div>
                    <p style={{ color: fps >= 55 ? '#27c93f' : '#ffbd2e', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                        {fps >= 55 ? 'Target performance reached.' : 'Frame drops detected.'}
                    </p>
                </motion.div>

                {/* Memory Stats */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{
                        border: '1px solid rgba(0, 255, 65, 0.3)',
                        background: 'rgba(0, 255, 65, 0.05)',
                        padding: '1.5rem',
                        borderRadius: '12px'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                        <Cpu size={24} color="#00ff41" />
                        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Memory Allocation</h3>
                    </div>
                    <div style={{ fontSize: '3rem', fontWeight: 800 }}>
                        {memory.used} <span style={{ fontSize: '1.2rem', color: '#aaa' }}>MB</span>
                    </div>
                    <div style={{
                        width: '100%',
                        height: '4px',
                        background: 'rgba(255,255,255,0.1)',
                        marginTop: '1rem',
                        borderRadius: '2px',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            width: `${Math.min(100, (memory.used / 100) * 100)}%`,
                            height: '100%',
                            background: '#00ff41',
                            transition: 'width 0.3s ease'
                        }} />
                    </div>
                </motion.div>

                {/* Scroll Physics */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    style={{
                        border: '1px solid rgba(0, 255, 65, 0.3)',
                        background: 'rgba(0, 255, 65, 0.05)',
                        padding: '1.5rem',
                        borderRadius: '12px'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                        <Zap size={24} color="#00ff41" />
                        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Scroll Physics</h3>
                    </div>
                    <div style={{ fontSize: '3rem', fontWeight: 800 }}>
                        {velocityVal} <span style={{ fontSize: '1.2rem', color: '#aaa' }}>px/s</span>
                    </div>
                    <p style={{ color: '#aaa', fontSize: '0.9rem', marginTop: '0.5rem' }}>Lenis smooth scrolling active.</p>
                </motion.div>

                {/* System Logs */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    style={{
                        gridColumn: '1 / -1',
                        border: '1px solid rgba(0, 255, 65, 0.3)',
                        background: 'rgba(0, 255, 65, 0.05)',
                        padding: '1.5rem',
                        borderRadius: '12px',
                        height: '250px',
                        overflowY: 'hidden',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem', borderBottom: '1px solid rgba(0,255,65,0.3)', paddingBottom: '0.5rem' }}>
                        <HardDrive size={24} color="#00ff41" />
                        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>System Telemetry Logs</h3>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        {logs.map((log, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                style={{ fontSize: '0.9rem', color: i === logs.length - 1 ? '#00ff41' : '#666' }}
                            >
                                {log}
                            </motion.div>
                        ))}
                        {logs.length === 0 && <div style={{ color: '#666' }}>Awaiting telemetry data...</div>}
                    </div>
                </motion.div>

            </div>
        </motion.div>
    );
}
