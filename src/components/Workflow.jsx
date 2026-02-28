import { motion } from 'framer-motion';
import { Search, PenTool, Code2, Rocket } from 'lucide-react';
import TiltCard from './ui/TiltCard';

const steps = [
    {
        icon: Search,
        title: "Discovery",
        description: "We start by diving deep into your requirements, goals, and target audience to build a solid strategy."
    },
    {
        icon: PenTool,
        title: "Design",
        description: "I craft intuitive, high-fidelity prototypes and UI designs that align perfectly with your brand identity."
    },
    {
        icon: Code2,
        title: "Development",
        description: "Using cutting-edge tech (React, Node, AI), I build scalable, clean, and performant solutions."
    },
    {
        icon: Rocket,
        title: "Launch",
        description: "Rigorous testing, optimization, and a smooth deployment ensure your product hits the market with a bang."
    }
];

export default function Workflow() {
    return (
        <section className="container" style={{ padding: '6rem 2rem', position: 'relative', zIndex: 1 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ textAlign: 'center', marginBottom: '5rem' }}
            >
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                    My <span className="text-accent">Workflow</span>
                </h2>
                <p style={{ color: '#aaa', maxWidth: '600px', margin: '0 auto' }}>
                    From concept to code, I follow a streamlined process to ensure pixel-perfect results and timely delivery.
                </p>
            </motion.div>

            <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)', // Force exactly 2 columns on desktop
                gap: '2.5rem',
                marginTop: '4rem',
                maxWidth: '900px',
                margin: '4rem auto 0 auto',
                alignItems: 'stretch'
            }} className="workflow-grid">
                <style>{`
                    @media (max-width: 768px) {
                        .workflow-grid {
                            grid-template-columns: 1fr !important;
                        }
                    }
                `}</style>
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                        <TiltCard
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                position: 'relative',
                                zIndex: 1,
                                padding: '3.5rem 2.5rem',
                                height: '100%'
                            }}
                        >
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    background: 'rgba(255, 46, 46, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '1.5rem',
                                    border: '1px solid rgba(255, 46, 46, 0.3)',
                                    boxShadow: '0 0 20px rgba(255, 46, 46, 0.2)'
                                }}>
                                    <Icon size={32} className="text-accent" />
                                </div>

                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{step.title}</h3>
                                <p style={{ color: '#ccc', lineHeight: '1.6', fontSize: '0.95rem' }}>
                                    {step.description}
                                </p>

                                <div style={{
                                    fontSize: '4rem',
                                    fontWeight: 900,
                                    color: 'rgba(255, 255, 255, 0.03)',
                                    position: 'absolute',
                                    top: '10px',
                                    right: '1.5rem',
                                    zIndex: -1,
                                    pointerEvents: 'none'
                                }}>
                                    0{index + 1}
                                </div>
                            </TiltCard>
                        );
                    })}
                </div>
            </section>
        );
    }
