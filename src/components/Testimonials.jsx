import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

const testimonials = [
    {
        name: "Sarah Jenkins",
        role: "CTO, StartUp Vision",
        content: "Nifras transformed our chaotic MVP into a scalable, high-performance platform. The attention to detail and architectural decisions were top-notch."
    },
    {
        name: "David Chen",
        role: "Product Manager, TechFlow",
        content: "An absolute professional. The AI integration he built for our dashboard increased user engagement by 40% in just two months."
    },
    {
        name: "Emily Carter",
        role: "Founder, Creative Minds",
        content: "I've worked with many developers, but Nifras stands out. He doesn't just write code; he understands the product and improves it."
    }
];

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-rotate testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="container" style={{ padding: '6rem 2rem', background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.4))' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ fontSize: '2.5rem' }}
                >
                    Client <span className="text-accent">Stories</span>
                </motion.h2>
            </div>

            <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', overflow: 'hidden', minHeight: '300px' }}>
                <div style={{ position: 'absolute', top: '-20px', left: '0', opacity: 0.1 }}>
                    <Quote size={100} className="text-accent" />
                </div>

                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="glass-card"
                    style={{
                        padding: '3rem',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                >
                    <p style={{
                        fontSize: '1.25rem',
                        lineHeight: '1.8',
                        fontStyle: 'italic',
                        marginBottom: '2rem',
                        color: '#ddd'
                    }}>
                        "{testimonials[activeIndex].content}"
                    </p>

                    <div>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-color)' }}>
                            {testimonials[activeIndex].name}
                        </h4>
                        <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '0.2rem' }}>
                            {testimonials[activeIndex].role}
                        </p>
                    </div>
                </motion.div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', marginTop: '2rem' }}>
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                border: 'none',
                                background: index === activeIndex ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.2)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
