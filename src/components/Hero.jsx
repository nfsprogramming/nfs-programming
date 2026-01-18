import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Code, Cpu, Globe, Rocket, Terminal, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
    const ref = useRef(null);
    const navigate = useNavigate();

    // Scroll Parallax
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const techs = [
        { icon: Code, label: "React" },
        { icon: Terminal, label: "Node.js" },
        { icon: Cpu, label: "AI/ML" },
        { icon: Globe, label: "Web3" },
        { icon: Layers, label: "Python" },
        { icon: Rocket, label: "Next.js" }
    ];

    return (
        <section id="hero" className="hero" ref={ref} style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Animated Gradient Orbs - Enhanced Fluidity */}
            <motion.div
                animate={{
                    scale: [1, 1.4, 0.9, 1.2, 1],
                    x: [0, 150, -50, 100, 0],
                    y: [0, -100, 50, -50, 0],
                    rotate: [0, 90, 180, 270, 0]
                }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1]
                }}
                style={{
                    position: 'absolute',
                    top: '15%',
                    left: '5%',
                    width: 'min(500px, 80vw)',
                    height: 'min(500px, 80vw)',
                    background: 'radial-gradient(circle, rgba(255, 46, 46, 0.25) 0%, transparent 65%)',
                    borderRadius: '50%',
                    filter: 'blur(80px)',
                    zIndex: 0,
                    opacity: 0.8
                }}
            />

            <motion.div
                animate={{
                    scale: [1, 1.5, 1.1, 1.3, 1],
                    x: [0, -120, 60, -80, 0],
                    y: [0, 120, -60, 80, 0],
                    rotate: [0, -60, 120, -180, 0]
                }}
                transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                    times: [0, 0.3, 0.6, 0.9, 1]
                }}
                style={{
                    position: 'absolute',
                    bottom: '10%',
                    right: '10%',
                    width: 'min(450px, 80vw)',
                    height: 'min(450px, 80vw)',
                    background: 'radial-gradient(circle, rgba(255, 100, 100, 0.15) 0%, transparent 65%)',
                    borderRadius: '50%',
                    filter: 'blur(90px)',
                    zIndex: 0,
                    opacity: 0.7
                }}
            />

            <motion.div
                style={{
                    position: 'relative',
                    zIndex: 1,
                    textAlign: 'center',
                    y,
                    opacity,
                    maxWidth: '1200px',
                    padding: '0 2rem'
                }}
            >
                {/* Text Content */}

                {/* Massive Title with Split Animation */}
                <div style={{ overflow: 'hidden', marginTop: '2rem' }}>
                    <motion.h1
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            duration: 1.2,
                            delay: 0.3,
                            ease: [0.22, 1, 0.36, 1]
                        }}
                        style={{
                            fontSize: 'clamp(3rem, 10vw, 8rem)',
                            fontWeight: 900,
                            letterSpacing: '-0.03em',
                            lineHeight: 0.9,
                            marginBottom: '1rem'
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            NFS
                        </motion.div>
                        <motion.div
                            className="text-accent"
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            style={{
                                display: 'block',
                                background: 'linear-gradient(135deg, #ff2e2e 0%, #ff6b6b 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                position: 'relative'
                            }}
                        >
                            PROGRAMMING
                            {/* Animated underline */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
                                style={{
                                    position: 'absolute',
                                    bottom: '-10px',
                                    left: 0,
                                    right: 0,
                                    height: '6px',
                                    background: 'linear-gradient(90deg, transparent, #ff2e2e, transparent)',
                                    transformOrigin: 'left'
                                }}
                            />
                        </motion.div>
                    </motion.h1>
                </div>

                {/* Glitch Effect Tagline */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.8 }}
                    style={{ position: 'relative', display: 'inline-block', marginTop: '1rem', marginBottom: '3rem' }}
                >
                    <motion.p
                        style={{
                            textTransform: 'uppercase',
                            letterSpacing: '0.4em',
                            fontSize: 'clamp(0.8rem, 2vw, 1.2rem)',
                            fontWeight: 600,
                            color: '#aaa',
                        }}
                    >
                        {Array.from("FORGING DIGITAL EXCELLENCE").map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 1.8 + (i * 0.03), // Slower typing effect
                                    duration: 0.4,
                                    ease: "easeOut"
                                }}
                                whileHover={{
                                    color: '#ff2e2e',
                                    y: -5,
                                    scale: 1.3,
                                    transition: { duration: 0.2 }
                                }}
                                style={{
                                    display: 'inline-block',
                                    whiteSpace: 'pre',
                                    cursor: 'default'
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </motion.p>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5, duration: 0.8 }}
                    className="cta-container"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '1rem',
                        flexWrap: 'wrap',
                        alignItems: 'center'
                    }}
                >
                    <style>{`
                        @media (max-width: 768px) {
                            .cta-container {
                                flexDirection: column;
                                width: 100%;
                            }
                            .cta-button {
                                width: 100%;
                                justify-content: center;
                            }
                        }
                    `}</style>
                    <motion.button
                        className="cta-button"
                        onClick={() => navigate('/projects')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            padding: '1rem 2.5rem',
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            borderRadius: '50px',
                            background: 'linear-gradient(135deg, #ff2e2e, #ff6b6b)',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            boxShadow: '0 4px 20px rgba(255, 46, 46, 0.4)'
                        }}
                    >
                        Explore Work <ArrowRight size={20} />
                    </motion.button>

                    <motion.button
                        className="cta-button"
                        onClick={() => navigate('/contact')}
                        whileHover={{ scale: 1.05, background: 'rgba(255, 255, 255, 0.1)' }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            padding: '1rem 2.5rem',
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            borderRadius: '50px',
                            background: 'transparent',
                            color: 'white',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            cursor: 'pointer',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        Contact Me
                    </motion.button>
                </motion.div>

                {/* Floating Tech Stack Ring */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3, duration: 1 }}
                    style={{
                        marginTop: '5rem',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '2rem',
                        flexWrap: 'wrap'
                    }}
                >
                    {techs.map((tech, i) => {
                        const Icon = tech.icon;
                        return (
                            <motion.div
                                key={i}
                                animate={{
                                    y: [0, -10, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: i * 0.2
                                }}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    color: 'rgba(255, 255, 255, 0.5)'
                                }}
                                whileHover={{
                                    color: '#ff2e2e',
                                    scale: 1.2,
                                    y: -15
                                }}
                            >
                                <Icon size={24} />
                                <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>{tech.label}</span>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </motion.div>
        </section>
    );
}
