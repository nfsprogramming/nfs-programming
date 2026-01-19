import { motion, useInView } from 'framer-motion';
import { Github } from 'lucide-react';
import { useRef, useState } from 'react';

const projects = [
    {
        title: "StudyMate AI Study Bot",
        description: "An AI-powered study assistant that helps students tackle information overload by processing large PDFs like textbooks, research papers, and lecture notes intelligently.",
        tags: ["JavaScript", "AI", "PDF Processing"],
        github: "https://github.com/nfsprogramming/StudyMate-AI-Study-Bot"
    },
    {
        title: "Smart Resume Analyzer",
        description: "AI-powered web application that automatically evaluates resumes and provides insightful feedback using Natural Language Processing to help candidates improve their job applications.",
        tags: ["Python", "AI", "NLP"],
        github: "https://github.com/nfsprogramming/smartresumeanlyzer"
    },
    {
        title: "Image Generator using NLP",
        description: "Advanced image generation system powered by Natural Language Processing, transforming text descriptions into visual content.",
        tags: ["Python", "NLP", "Image Gen"],
        github: "https://github.com/nfsprogramming/image-generator-using-NLP"
    },
    {
        title: "Shaha Rice Export",
        description: "Professional business website built with modern TypeScript, showcasing enterprise-level web development capabilities.",
        tags: ["TypeScript", "React", "Business"],
        github: "https://github.com/nfsprogramming/shaha-rice-export"
    },
    {
        title: "NFS Photography",
        description: "Stunning photography portfolio website with custom CSS animations and modern design principles.",
        tags: ["CSS", "Web Design", "Portfolio"],
        github: "https://github.com/nfsprogramming/nfsphotography"
    },
    {
        title: "Untoldable Lines",
        description: "Creative JavaScript project exploring interactive storytelling and dynamic web experiences.",
        tags: ["JavaScript", "Interactive", "Creative"],
        github: "https://github.com/nfsprogramming/untoldablelines"
    }
];

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [hoveredIndex, setHoveredIndex] = useState(null);

    // Spotlight State
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    return (
        <section id="projects" className="container section-padding" ref={ref} style={{ position: 'relative' }}>
            {/* Floating background elements */}
            <motion.div
                animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{
                    position: 'absolute',
                    top: '10%',
                    right: '5%',
                    width: 'min(300px, 50vw)',
                    height: 'min(300px, 50vw)',
                    background: 'radial-gradient(circle, rgba(255, 46, 46, 0.05) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(40px)',
                    zIndex: 0,
                    pointerEvents: 'none'
                }}
            />

            <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, type: "spring" }}
                style={{ position: 'relative', zIndex: 1, marginBottom: '4rem' }}
            >
                Featured <span className="text-accent" style={{ display: 'inline-block', borderBottom: '2px solid rgba(255, 46, 46, 0.5)' }}>Projects</span>
            </motion.h2>

            <div className="grid grid-3" style={{ position: 'relative', zIndex: 1 }}>
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 80 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                            delay: index * 0.1, // Faster stagger
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1]
                        }}
                        onHoverStart={() => setHoveredIndex(index)}
                        onHoverEnd={() => setHoveredIndex(null)}
                        onMouseMove={handleMouseMove}
                        className="glass-card"
                        whileHover={{ y: -5 }}
                        style={{
                            position: 'relative',
                            transition: 'border-color 0.3s ease',
                            background: 'rgba(20, 20, 20, 0.4)',
                            borderColor: hoveredIndex === index
                                ? 'rgba(255, 46, 46, 0.5)'
                                : 'rgba(255, 255, 255, 0.05)',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Spotlight Effect */}
                        {hoveredIndex === index && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 46, 46, 0.15), transparent 40%)`,
                                    pointerEvents: 'none',
                                    zIndex: 0
                                }}
                            />
                        )}

                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <motion.h3
                                style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1.4rem' }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: index * 0.1 + 0.2 }}
                            >
                                {project.title}
                            </motion.h3>

                            <motion.p
                                style={{ marginBottom: '1.5rem', lineHeight: 1.6, fontSize: '0.95rem' }}
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : {}}
                                transition={{ delay: index * 0.1 + 0.3 }}
                            >
                                {project.description}
                            </motion.p>

                            <div className="flex project-tags gap-2" style={{ marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                                {project.tags.map((tag, i) => (
                                    <motion.span
                                        key={tag}
                                        whileHover={{
                                            scale: 1.05,
                                            backgroundColor: 'rgba(255, 46, 46, 0.2)',
                                            borderColor: 'rgba(255, 46, 46, 0.4)',
                                            transition: { duration: 0.2 }
                                        }}
                                        style={{ cursor: 'default' }}
                                    >
                                        {tag}
                                    </motion.span>
                                ))}
                            </div>

                            <motion.div
                                className="flex gap-4"
                                initial={{ opacity: 0, y: 10 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: index * 0.1 + 0.6 }}
                            >
                                <motion.a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2"
                                    style={{ fontSize: '0.9rem', textDecoration: 'none', color: 'inherit' }}
                                    whileHover={{ scale: 1.05, color: '#ff2e2e' }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Github size={16} /> View Code
                                </motion.a>
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
