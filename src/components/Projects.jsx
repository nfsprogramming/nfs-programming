import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Code2, Globe, Eye, X, BrainCircuit, Camera, Smartphone, Sparkles, Link as LinkIcon, Briefcase, FileImage } from 'lucide-react';
import TiltCard from './ui/TiltCard';
import RevealOnScroll from './ui/RevealOnScroll';
import TextReveal from './ui/TextReveal';
import Parallax3D from './ui/Parallax3D';
import Scroll3DSection from './ui/Scroll3DSection';
import ProgressiveImage from './ui/ProgressiveImage';

const projects = [
    {
        title: "StudyMate AI Study Bot",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        description: "An intelligent study companion that leverages advanced AI to distill complex textbooks, research papers, and expansive PDFs into actionable insights, helping students master material faster.",
        tags: ["JavaScript", "AI", "PDF Processing"],
        Icon: BrainCircuit,
        github: "https://github.com/nfsprogramming/StudyMate-AI-Study-Bot",
        live: null
    },
    {
        title: "Smart Resume Analyzer",
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800",
        description: "An NLP-driven platform that dynamically evaluates resumes, providing targeted, intelligent feedback to optimize candidate profiles for modern ATS algorithms and improve hireability.",
        tags: ["Python", "AI", "NLP"],
        Icon: BrainCircuit,
        github: "https://github.com/nfsprogramming/smartresumeanlyzer",
        live: null
    },
    {
        title: "Image Generator using NLP",
        image: "https://images.unsplash.com/photo-1547953580-c1995540a45b?auto=format&fit=crop&q=80&w=800",
        description: "A cutting-edge generative AI tool that transforms natural language prompts into stunning, high-fidelity visual assets utilizing sophisticated NLP architectures.",
        tags: ["Python", "NLP", "Image Gen"],
        Icon: FileImage,
        github: "https://github.com/nfsprogramming/image-generator-using-NLP",
        live: null
    },
    {
        title: "Shaha Rice Export",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        description: "An enterprise-grade, highly performant business platform engineered with modern React and TypeScript, delivering a robust digital presence for global export operations.",
        tags: ["TypeScript", "React", "Business"],
        Icon: Briefcase,
        github: "https://github.com/nfsprogramming/shaha-rice-export",
        live: null
    },
    {
        title: "NFS Photography",
        image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80&w=800",
        description: "A visually captivating portfolio leveraging pristine CSS animations and bespoke design systems to showcase high-end photography with premium aesthetics.",
        tags: ["CSS", "Web Design", "Portfolio"],
        Icon: Camera,
        github: "https://github.com/nfsprogramming/nfsphotography",
        live: null
    },
    {
        title: "Untoldable Lines",
        image: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&q=80&w=800",
        description: "An immersive digital storytelling experience powered by advanced JavaScript, pushing the boundaries of interactive web elements and dynamic narrative flow.",
        tags: ["JavaScript", "Interactive", "Creative"],
        Icon: Sparkles,
        github: "https://github.com/nfsprogramming/untoldablelines",
        live: null
    },
    {
        title: "Link to QR & Business Card",
        image: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=800",
        description: "A sleek, full-stack utility for generating instant URL QR codes and crafting elegant digital business cards for seamless professional networking.",
        tags: ["TypeScript", "QR Code", "Business Card"],
        Icon: LinkIcon,
        github: "https://github.com/nfsprogramming/link-to-qr-and-business-card",
        live: null
    },
    {
        title: "Custom Browser",
        image: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?auto=format&fit=crop&q=80&w=800",
        description: "A hyper-fast, minimalist web browser interface constructed with modern web technologies, prioritizing speed, efficiency, and a refined user experience.",
        tags: ["TypeScript", "Web Browser", "UI"],
        Icon: Globe,
        github: "https://github.com/nfsprogramming/Browser",
        live: null
    },
    {
        title: "Moodtune",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800",
        description: "An interactive, sentiment-aware audio platform that dynamically curates and fine-tunes musical playlists to perfectly match the user's real-time emotional state.",
        tags: ["JavaScript", "Music", "Interactive"],
        Icon: Sparkles,
        github: "https://github.com/nfsprogramming/moodtune",
        live: null
    },
    {
        title: "Women Safety App (Offline)",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800",
        description: "A mission-critical, offline-first mobile application engineered in Kotlin, featuring robust emergency alert routing and precise proximity tracking for enhanced personal security.",
        tags: ["Kotlin", "Android", "Safety"],
        Icon: Smartphone,
        github: "https://github.com/nfsprogramming/Women-safety-app-offline",
        live: null
    }
];

const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.9)',
                zIndex: 10000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem'
            }}
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                style={{
                    background: '#111',
                    borderRadius: '24px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    width: '100%',
                    maxWidth: '900px',
                    maxHeight: '90vh',
                    overflow: 'hidden',
                    position: 'relative'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'rgba(0,0,0,0.5)',
                        border: 'none',
                        color: 'white',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 10
                    }}
                >
                    <X size={24} />
                </button>

                <div style={{ height: '400px', width: '100%', position: 'relative' }}>
                    <ProgressiveImage
                        src={project.image}
                        alt={project.title}
                    />
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '2rem',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)'
                    }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{project.title}</h2>
                        <div className="flex gap-2">
                            {project.tags.map(tag => (
                                <span key={tag} style={{
                                    background: 'rgba(255, 46, 46, 0.2)',
                                    color: '#ff2e2e',
                                    padding: '4px 12px',
                                    borderRadius: '20px',
                                    fontSize: '0.85rem',
                                    fontWeight: 600
                                }}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ padding: '2rem', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                    <div>
                        <h3 style={{ marginBottom: '1rem', color: '#fff' }}>About Project</h3>
                        <p style={{ color: '#aaa', lineHeight: 1.6 }}>{project.description}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                padding: '1rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '12px',
                                color: 'white',
                                textDecoration: 'none',
                                fontWeight: 600,
                                transition: 'background 0.3s'
                            }}
                            onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                            onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.05)'}
                        >
                            <Github size={20} /> View Source
                        </a>
                        {project.live && (
                            <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    padding: '1rem',
                                    background: 'linear-gradient(135deg, #ff2e2e, #ff6b6b)',
                                    borderRadius: '12px',
                                    color: 'white',
                                    textDecoration: 'none',
                                    fontWeight: 600,
                                    boxShadow: '0 4px 15px rgba(255, 46, 46, 0.3)'
                                }}
                            >
                                <ExternalLink size={20} /> Live Demo
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);

    const titleVariants = {
        hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        visible: {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            transition: { duration: 0.8, ease: "easeInOut" }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: (index) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut", delay: index * 0.1 }
        })
    };

    return (
        <section id="projects" className="container section-padding" style={{ position: 'relative' }}>
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
                )}
            </AnimatePresence>

            <Scroll3DSection>
                <motion.div
                    className="section-header"
                    style={{ marginBottom: '4rem', textAlign: 'center' }}
                    variants={titleVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    <h2 className="text-center">
                        Featured <span className="text-accent">Projects</span>
                    </h2>
                </motion.div>

                <div className="grid grid-3" style={{ position: 'relative', zIndex: 1, alignItems: 'stretch' }}>
                    {projects.map((project, index) => (
                        <Parallax3D
                            key={index}
                            offset={index % 3 === 1 ? 40 : index % 3 === 2 ? 80 : 0}
                        >
                            <motion.div
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                custom={index}
                                style={{ height: '100%' }}
                            >
                                <div className="project-card" onClick={() => setSelectedProject(project)}>
                                    <div className="card-image-wrap">
                                        <ProgressiveImage
                                            src={project.image}
                                            alt={project.title}
                                            className="card-img-inner"
                                            loading="lazy"
                                        />
                                        <div className="card-image-gradient" />
                                    </div>

                                    <div className="card-body">
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                            <h3 className="card-title" style={{ marginBottom: 0 }}>{project.title}</h3>
                                            {project.Icon ? <project.Icon size={18} className="text-accent opacity-50" /> : <Code2 size={18} className="text-accent opacity-50" />}
                                        </div>

                                        <p className="card-desc">
                                            {project.description}
                                        </p>

                                        <div className="card-tags">
                                            {project.tags.map((tag) => (
                                                <span key={tag} className="card-tag">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="card-links">
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="card-link-git"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Github size={14} /> GitHub →
                                            </a>
                                            {project.live && (
                                                <a
                                                    href={project.live}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="card-link-live"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <ExternalLink size={14} /> Live Demo →
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </Parallax3D>
                    ))}
                </div>
            </Scroll3DSection>
        </section>
    );
}
