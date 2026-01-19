import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
    {
        role: "Senior Full Stack Engineer",
        company: "Freelance",
        period: "2024 - Present",
        description: "Architecting high-performance web applications and AI-driven solutions for global clients. Specializing in Next.js, React, and Python scalable backends."
    },
    {
        role: "AI Solutions Developer",
        company: "Tech Innovations Inc.",
        period: "2023 - 2024",
        description: "Led the integration of Large Language Models (LLMs) into existing enterprise workflows, reducing manual data processing time by 40%."
    },
    {
        role: "Frontend Developer",
        company: "Digital Creative Agency",
        period: "2021 - 2023",
        description: "Developed award-winning interactive websites using 3D technologies (Three.js) and modern CSS animations."
    }
];

export default function Experience() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    return (
        <section id="experience" className="container section-padding" ref={ref}>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center', marginBottom: '5rem' }}
            >
                Professional <span className="text-accent">Journey</span>
            </motion.h2>

            <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
                {/* Center Line */}
                <motion.div
                    style={{
                        position: 'absolute',
                        left: '0px',
                        top: 0,
                        bottom: 0,
                        width: '2px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        transform: 'translateX(50%)',
                        scaleY: scrollYProgress
                    }}
                    className="md-center-line"
                />

                {/* Mobile: Line is on the left */}
                <style>{`
                    @media (min-width: 768px) {
                        .md-center-line {
                            left: 50% !important;
                        }
                    }
                `}</style>

                {experiences.map((exp, index) => (
                    <div
                        key={index}
                        className={`experience-item flex ${index % 2 === 0 ? 'row' : 'row-reverse'}`}
                        style={{
                            marginBottom: '4rem',
                            position: 'relative',
                            paddingLeft: '2rem' // Mobile default
                        }}
                    >
                        {/* Styles for desktop alignment handled via media query blocks or inline conditional logic is tricky. 
                             Let's use a simpler approach: A clean vertical list with the line on the left for all sizes 
                             to ensure perfect responsiveness, or a proper side-by-side for desktop.
                             
                             Let's go with a modern "Left-aligned with nodes" look which is cleaner on mobile.
                          */}

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            style={{
                                borderLeft: '2px solid rgba(255, 46, 46, 0.3)',
                                paddingLeft: '2rem',
                                position: 'relative'
                            }}
                        >
                            {/* Node */}
                            <div style={{
                                position: 'absolute',
                                left: '-9px',
                                top: '0',
                                width: '16px',
                                height: '16px',
                                borderRadius: '50%',
                                background: 'var(--accent-color)',
                                boxShadow: '0 0 10px rgba(255, 46, 46, 0.6)'
                            }} />

                            <div className="glass-card" style={{ padding: '2rem' }}>
                                <div className="flex gap-2" style={{ marginBottom: '0.5rem', opacity: 0.7, fontSize: '0.9rem' }}>
                                    <Calendar size={14} /> {exp.period}
                                </div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'white' }}>{exp.role}</h3>
                                <div className="flex gap-2" style={{ marginBottom: '1.5rem', color: 'var(--accent-color)', alignItems: 'center' }}>
                                    <Briefcase size={16} /> {exp.company}
                                </div>
                                <p style={{ lineHeight: 1.6, color: '#ccc' }}>
                                    {exp.description}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>
        </section>
    );
}
