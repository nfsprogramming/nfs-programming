import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import TiltCard from './ui/TiltCard';
import RevealOnScroll from './ui/RevealOnScroll';
import Scroll3DSection from './ui/Scroll3DSection';

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
            <Scroll3DSection>
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <RevealOnScroll width="100%">
                        <h2 className="text-center">
                            Professional <span className="text-accent">Journey</span>
                        </h2>
                    </RevealOnScroll>
                </div>

                <div style={{ position: 'relative', margin: '0 auto' }}>
                    {/* Center Line */}
                    
                    <div 
                        className="md-center-line" 
                        style={{ 
                            position: 'absolute', 
                            left: '0px', 
                            top: 0, 
                            bottom: 0, 
                            width: '2px', // Line width
                            transform: 'translateX(50%)',
                        }}
                    >
                        <svg width="2" height="100%" style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}>
                            <motion.line
                                x1="1"
                                y1="0"
                                x2="1"
                                y2="100%"
                                stroke="var(--accent-color)"
                                strokeWidth="2"
                                strokeDasharray="10 10"
                                style={{ pathLength: scrollYProgress }}
                                strokeOpacity={0.6}
                            />
                        </svg>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '2px', height: '100%', background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.05), transparent)', zIndex: -1 }}></div>
                    </div>

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
                                paddingLeft: '2rem',
                                width: '100%',
                                display: 'flex',
                                justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end'
                            }}
                        >
                            <div style={{ width: '100%', maxWidth: '500px' }}>
                                <RevealOnScroll delay={index * 0.1}>
                                    <TiltCard className="glass-card" style={{ padding: '2.5rem' }}>
                                        <div className="flex items-center gap-4" style={{ marginBottom: '1rem' }}>
                                            <Briefcase className="text-accent" size={24} />
                                            <div>
                                                <h3 style={{ margin: 0 }}>{exp.role}</h3>
                                                <p style={{ color: 'var(--accent-color)', fontWeight: 600, margin: 0 }}>{exp.company}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-2" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                                            <Calendar size={16} />
                                            <span>{exp.period}</span>
                                        </div>

                                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                                            {exp.description}
                                        </p>
                                    </TiltCard>
                                </RevealOnScroll>
                            </div>
                        </div>
                    ))}
                </div>
            </Scroll3DSection>
        </section>
    );
}
