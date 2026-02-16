import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Cpu, Globe, Rocket, Layers, Smartphone } from 'lucide-react';
import Workflow from './Workflow';
import TiltCard from './ui/TiltCard';
import RevealOnScroll from './ui/RevealOnScroll';
import Scroll3DSection from './ui/Scroll3DSection';

const services = [
    {
        icon: Globe,
        title: "Web Architecture",
        description: "Building scalable, high-performance web applications using modern frameworks like React, Next.js, and TypeScript."
    },
    {
        icon: Cpu,
        title: "AI Integration",
        description: "Empowering businesses with intelligent solutions, from LLM integration to custom chatbots and automated workflows."
    },
    {
        icon: Layers,
        title: "SaaS Development",
        description: "End-to-end development of Software as a Service products, focusing on multi-tenancy, security, and scalability."
    },
    {
        icon: Rocket,
        title: "Performance Optimization",
        description: "Audit and optimization of existing applications to ensure lightning-fast load times and smooth user interactions."
    },
    {
        icon: Code,
        title: "API Design",
        description: "Designing robust, secure, and well-documented RESTful and GraphQL APIs for seamless data exchange."
    },
    {
        icon: Smartphone,
        title: "Responsive Design",
        description: "Crafting pixel-perfect, mobile-first interfaces that provide flawlessly consistency across all devices."
    }
];

export default function Services() {
    const ref = useRef(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <section id="services" className="container section-padding" ref={ref}>
            <Scroll3DSection>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <RevealOnScroll width="100%">
                        <h2 className="text-center">
                            My <span className="text-accent">Services</span>
                        </h2>
                    </RevealOnScroll>
                </div>

                <div className="grid grid-3">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <RevealOnScroll key={index} delay={index * 0.1}>
                                <TiltCard
                                    className="glass-card"
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        justifyContent: 'flex-start',
                                        gap: '1.5rem',
                                        cursor: 'default',
                                        height: '100%'
                                    }}
                                >
                                    <div
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                        style={{ height: '100%', width: '100%' }}
                                    >
                                        <motion.div
                                            initial={{ scale: 1, rotate: 0 }}
                                            animate={hoveredIndex === index ? { scale: 1.1, rotate: 5, color: '#ff2e2e' } : { color: '#ff2e2e' }}
                                            style={{
                                                padding: '1rem',
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                borderRadius: '12px',
                                                width: 'fit-content',
                                                marginBottom: '0.5rem'
                                            }}
                                        >
                                            <Icon size={32} />
                                        </motion.div>

                                        <div>
                                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.8rem', fontWeight: 700 }}>
                                                {service.title}
                                            </h3>
                                            <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#b3b3b3' }}>
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                </TiltCard>
                            </RevealOnScroll>
                        );
                    })}
                </div>

                <div style={{ marginTop: '5rem' }}>
                    <Workflow />
                </div>
            </Scroll3DSection>
        </section>
    );
}
