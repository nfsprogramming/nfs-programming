import { motion, useInView } from 'framer-motion';
import { Award, ShieldCheck, Terminal as TerminalIcon } from 'lucide-react';
import { useRef } from 'react';
import Terminal from './Terminal';
import TiltCard from './ui/TiltCard';
import RevealOnScroll from './ui/RevealOnScroll';
import Scroll3DSection from './ui/Scroll3DSection';

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    return (
        <section id="about" className="container section-padding" ref={ref}>
            <Scroll3DSection>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <RevealOnScroll width="100%">
                        <h2 className="text-center">
                            <span className="text-accent">Digital</span> Architect
                        </h2>
                    </RevealOnScroll>
                </div>

                <motion.div
                    className="grid-2"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    style={{ alignItems: 'stretch' }}
                >
                    {/* Portrait Column */}
                    <div className="auto-layout" style={{ height: '100%' }}>
                        <motion.div variants={itemVariants} style={{ height: '100%' }}>
                            <TiltCard className="glass-card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', height: '100%' }}>
                                <motion.img
                                    src="/portrait.jpg"
                                    alt="Nifras"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '15px',
                                        filter: 'grayscale(0.3) contrast(1.1)',
                                        border: '1px solid rgba(255, 46, 46, 0.3)'
                                    }}
                                    whileHover={{ filter: 'grayscale(0)', scale: 1.02 }}
                                    transition={{ duration: 0.5 }}
                                />
                            </TiltCard>
                        </motion.div>

                        <motion.div variants={itemVariants} style={{ height: '100%' }}>
                            <TiltCard className="glass-card" style={{ height: '100%', padding: '2.5rem' }}>
                                <div className="flex items-center gap-4" style={{ marginBottom: '1rem' }}>
                                    <Award className="text-accent" />
                                    <h3>Expertise</h3>
                                </div>
                                <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                                    <li>Advanced Software Engineering</li>
                                    <li>AI & Machine Learning Systems</li>
                                    <li>Cloud-Native Architectures</li>
                                </ul>
                            </TiltCard>
                        </motion.div>
                    </div>

                    {/* Bio & Terminal Column */}
                    <div className="auto-layout" style={{ height: '100%' }}>
                        <motion.div variants={itemVariants} style={{ height: '100%' }}>
                            <TiltCard className="glass-card" style={{ height: '100%', padding: '2.5rem' }}>
                                <h3 className="text-accent" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <ShieldCheck size={24} /> Who Am I?
                                </h3>
                                <p style={{ marginTop: '1.5rem' }}>
                                    I am a results-driven <strong>Full Stack Engineer</strong> dedicated to the craft of building intelligent,
                                    high-performance digital ecosystems. My approach focuses on systematic architecture and
                                    groundbreaking technology to deliver applications that are as powerful as they are intuitive.
                                </p>
                            </TiltCard>
                        </motion.div>
                        <motion.div variants={itemVariants} style={{ height: '100%' }}>
                            <Terminal />
                        </motion.div>
                    </div>
                </motion.div>
            </Scroll3DSection>
        </section>
    );
}
