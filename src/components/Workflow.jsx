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
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ fontSize: '2.5rem' }}
                >
                    My <span className="text-accent">Process</span>
                </motion.h2>
                <p style={{ color: '#aaa', marginTop: '1rem' }}>
                    How I bring digital ideas to life.
                </p>
            </div>

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '2rem', 
                marginTop: '4rem',
                maxWidth: '1200px',
                margin: '4rem auto 0 auto'
            }}>
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                        <TiltCard 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            style={{ height: '100%', padding: '2.5rem', textAlign: 'left' }}
                        >
                            <div style={{ 
                                width: '60px', 
                                height: '60px', 
                                borderRadius: '16px', 
                                background: 'rgba(255, 46, 46, 0.1)', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                marginBottom: '2rem',
                                border: '1px solid rgba(255, 46, 46, 0.2)'
                            }}>
                                <Icon className="text-accent" size={30} />
                            </div>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>{step.title}</h3>
                            <p style={{ color: '#ccc', lineHeight: 1.6 }}>{step.description}</p>
                        </TiltCard>
                    );
                })}
            </div>
        </section>
    );
}
