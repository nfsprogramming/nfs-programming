import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

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
        <section id="skills" ref={ref} style={{ padding: '6rem 2rem', background: 'rgba(0,0,0,0.3)' }}>
            <div className="container" style={{ maxWidth: '900px' }}>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    My <span className="text-accent">Skills</span>
                </motion.h2>

                <div className="grid grid-2">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{
                                delay: index * 0.1,
                                duration: 0.6,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                        >
                            <div className="flex justify-between" style={{ marginBottom: '0.5rem', alignItems: 'center' }}>
                                <motion.span
                                    style={{ fontWeight: 600, fontSize: '1.1rem' }}
                                    initial={{ opacity: 0 }}
                                    animate={isInView ? { opacity: 1 } : {}}
                                    transition={{ delay: index * 0.1 + 0.2 }}
                                >
                                    {skill.name}
                                </motion.span>
                                <motion.span
                                    className="text-accent"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{
                                        delay: index * 0.1 + 0.3,
                                        type: "spring",
                                        stiffness: 200
                                    }}
                                    style={{ fontWeight: 700 }}
                                >
                                    {skill.level}%
                                </motion.span>
                            </div>

                            {/* Skill Bar Container */}
                            <div style={{
                                height: '10px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '10px',
                                overflow: 'hidden',
                                position: 'relative',
                                border: '1px solid rgba(255, 255, 255, 0.05)'
                            }}>
                                {/* Animated Fill */}
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={isInView ? { width: `${skill.level}%` } : {}}
                                    transition={{
                                        delay: index * 0.1 + 0.4,
                                        duration: 1.2,
                                        ease: [0.22, 1, 0.36, 1]
                                    }}
                                    style={{
                                        height: '100%',
                                        background: 'linear-gradient(90deg, #ff2e2e, #ff6b6b)',
                                        boxShadow: '0 0 20px rgba(255, 46, 46, 0.5)',
                                        position: 'relative'
                                    }}
                                >
                                    {/* Shine Effect */}
                                    <motion.div
                                        animate={{
                                            x: ['-100%', '200%']
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            repeatDelay: 1,
                                            ease: "easeInOut"
                                        }}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            height: '100%',
                                            width: '50%',
                                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
                                        }}
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
