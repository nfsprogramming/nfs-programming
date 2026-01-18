import { motion, useInView } from 'framer-motion';
import { Code, Cpu, Globe, Rocket, Layers, Smartphone } from 'lucide-react';
import { useRef, useState } from 'react';
import Workflow from './Workflow';

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
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <section id="services" className="container section-padding" ref={ref}>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                style={{ textAlign: 'center', marginBottom: '4rem' }}
            >
                My <span className="text-accent">Services</span>
            </motion.h2>

            <div className="grid grid-3">
                {services.map((service, index) => {
                    const Icon = service.icon;
                    return (
                        <motion.div
                            key={index}
                            className="glass-card"
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{
                                delay: index * 0.1,
                                duration: 0.8,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            onHoverStart={() => setHoveredIndex(index)}
                            onHoverEnd={() => setHoveredIndex(null)}
                            whileHover={{ y: -10 }}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                gap: '1.5rem',
                                background: hoveredIndex === index ? 'rgba(255, 46, 46, 0.05)' : 'var(--glass-bg)',
                                borderColor: hoveredIndex === index ? 'rgba(255, 46, 46, 0.3)' : 'var(--glass-border)',
                                cursor: 'default'
                            }}
                        >
                            <motion.div
                                initial={{ scale: 1, rotate: 0 }}
                                animate={hoveredIndex === index ? { scale: 1.1, rotate: 5 } : {}}
                                style={{
                                    padding: '1rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: '12px',
                                    color: 'var(--accent-color)',
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
                        </motion.div>
                    );
                })}
            </div>

            <div style={{ marginTop: '5rem' }}>
                <Workflow />
            </div>
        </section>
    );
}
