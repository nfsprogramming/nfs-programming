import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Parallax3D from './ui/Parallax3D';
import SkillSphere from './ui/SkillSphere';

const skills = [
    { name: 'JavaScript', level: 90 },
    { name: 'React', level: 85 },
    { name: 'Python', level: 80 },
    { name: 'CSS/Animations', level: 95 },
    { name: 'Node.js', level: 75 },
    { name: 'Git', level: 85 },
];

export default function Skills() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="skills" ref={ref} className="section-padding" style={{ background: 'rgba(0,0,0,0.3)', overflow: 'hidden' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        Technical <span className="text-accent">Ecosystem</span>
                    </motion.h2>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
                        Interact with the 3D sphere to explore my core technologies.
                    </p>
                </div>

                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', 
                    alignItems: 'center', 
                    gap: '4rem', 
                    position: 'relative' 
                }}>
                    {/* Skill Bars Column */}
                    <div style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '2.5rem'
                    }}>
                        {skills.map((skill, index) => (
                            <div key={index} style={{ width: '100%' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                                    <span style={{ 
                                        fontWeight: 700, 
                                        fontSize: '1.2rem', 
                                        color: 'var(--text-color)',
                                        letterSpacing: '0.5px'
                                    }}>
                                        {skill.name}
                                    </span>
                                    <span className="text-accent" style={{ fontWeight: 800, fontSize: '1.1rem' }}>
                                        {skill.level}%
                                    </span>
                                </div>
                                <div style={{
                                    height: '10px',
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    position: 'relative'
                                }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={isInView ? { width: `${skill.level}%` } : {}}
                                        transition={{ delay: index * 0.1, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                                        style={{
                                            height: '100%',
                                            background: 'linear-gradient(90deg, #ff2e2e, #ff6b6b)',
                                            boxShadow: '0 0 20px rgba(255, 46, 46, 0.4)',
                                            borderRadius: '20px'
                                        }}
                                    >
                                        <motion.div
                                            animate={{ x: ['-100%', '200%'] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100px',
                                                height: '100%',
                                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                                            }}
                                        />
                                    </motion.div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 3D Sphere Column */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 1, ease: "easeOut" }}
                        style={{ 
                            height: 'min(500px, 70vh)', 
                            width: '100%', 
                            position: 'relative'
                        }}
                    >
                        <SkillSphere />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
