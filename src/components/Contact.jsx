import { motion, useInView } from 'framer-motion';
import { Mail, Phone, Send, Github, Linkedin } from 'lucide-react';
import { useRef } from 'react';
import Magnetic from './ui/Magnetic';
import RevealOnScroll from './ui/RevealOnScroll';
import TiltCard from './ui/TiltCard';
import Scroll3DSection from './ui/Scroll3DSection';

export default function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const contactItems = [
        { icon: Mail, text: 'nifrasempire25@gmail.com', href: 'mailto:nifrasempire25@gmail.com' },
        { icon: Phone, text: '8925147213', href: 'tel:8925147213' },
        { icon: Github, text: 'nfsprogramming', href: 'https://github.com/nfsprogramming' },
        { icon: Linkedin, text: 'LinkedIn Profile', href: 'https://www.linkedin.com/' }
    ];

    return (
        <section id="contact" ref={ref} className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
            <Scroll3DSection>
                <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
                    <RevealOnScroll width="100%">
                        <h2 style={{ marginBottom: '3rem' }}>
                            Get In <span className="text-accent">Touch</span>
                        </h2>
                    </RevealOnScroll>

                    <div className="grid-2" style={{ marginBottom: '4rem', margin: '0 auto 4rem auto', gap: 'var(--space-md)' }}>
                        {contactItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.a
                                    key={index}
                                    href={item.href}
                                    initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: index * 0.2, duration: 0.8 }}
                                    style={{ textDecoration: 'none', display: 'block' }}
                                >
                                    <TiltCard
                                        className="glass-card"
                                        style={{ padding: '1.5rem 2rem', height: '100%' }}
                                    >
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: '1.5rem',
                                            height: '100%'
                                        }}>
                                            <div
                                                style={{
                                                    width: '50px',
                                                    height: '50px',
                                                    background: 'rgba(255, 46, 46, 0.1)',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    border: '1px solid rgba(255, 46, 46, 0.2)',
                                                    flexShrink: 0
                                                }}
                                            >
                                                <Icon className="text-accent" size={20} />
                                            </div>
                                            <div style={{ overflow: 'hidden' }}>
                                                <p style={{ fontSize: '0.9rem', fontWeight: 500, margin: 0, color: 'white', textAlign: 'left' }}>
                                                    {item.text}
                                                </p>
                                            </div>
                                        </div>
                                    </TiltCard>
                                </motion.a>
                            );
                        })}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        style={{ position: 'relative', display: 'inline-block' }}
                    >
                        <Magnetic>
                            <motion.button
                                onClick={() => window.location.href = 'mailto:nifrasempire25@gmail.com'}
                                whileHover={{
                                    scale: 1.05,
                                    background: 'linear-gradient(135deg, #ff4d4d, #ff1a1a)'
                                }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    background: 'linear-gradient(135deg, #ff2e2e, #ff6b6b)',
                                    color: 'white',
                                    padding: '1rem 3rem',
                                    borderRadius: '50px',
                                    fontWeight: 700,
                                    fontSize: '1.1rem',
                                    boxShadow: '0 4px 20px rgba(255, 46, 46, 0.3)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.8rem',
                                    maxWidth: '100%',
                                    justifyContent: 'center'
                                }}
                            >
                                <span>Let's Collaborate</span>
                                <Send size={18} />
                            </motion.button>
                        </Magnetic>
                    </motion.div>
                </div>
            </Scroll3DSection>
        </section>
    );
}
