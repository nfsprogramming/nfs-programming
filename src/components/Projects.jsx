import { motion } from 'framer-motion';
import { ExternalLink, Github, Code2, Globe } from 'lucide-react';
import TiltCard from './ui/TiltCard';
import RevealOnScroll from './ui/RevealOnScroll';
import TextReveal from './ui/TextReveal';
import Parallax3D from './ui/Parallax3D';
import Scroll3DSection from './ui/Scroll3DSection';

const projects = [
    {
        title: "StudyMate AI Study Bot",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        description: "An AI-powered study assistant that helps students tackle information overload by processing large PDFs like textbooks, research papers, and lecture notes intelligently.",
        tags: ["JavaScript", "AI", "PDF Processing"],
        github: "https://github.com/nfsprogramming/StudyMate-AI-Study-Bot"
    },
    {
        title: "Smart Resume Analyzer",
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800",
        description: "AI-powered web application that automatically evaluates resumes and provides insightful feedback using Natural Language Processing to help candidates improve their job applications.",
        tags: ["Python", "AI", "NLP"],
        github: "https://github.com/nfsprogramming/smartresumeanlyzer"
    },
    {
        title: "Image Generator using NLP",
        image: "https://images.unsplash.com/photo-1547953580-c1995540a45b?auto=format&fit=crop&q=80&w=800",
        description: "Advanced image generation system powered by Natural Language Processing to help users create images from text descriptions.",
        tags: ["Python", "NLP", "Image Gen"],
        github: "https://github.com/nfsprogramming/image-generator-using-NLP"
    },
    {
        title: "Shaha Rice Export",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        description: "Professional business website built with modern TypeScript, showcasing enterprise-level web development capabilities.",
        tags: ["TypeScript", "React", "Business"],
        github: "https://github.com/nfsprogramming/shaha-rice-export"
    },
    {
        title: "NFS Photography",
        image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80&w=800",
        description: "Stunning photography portfolio website with custom CSS animations and modern design principles.",
        tags: ["CSS", "Web Design", "Portfolio"],
        github: "https://github.com/nfsprogramming/nfsphotography"
    },
    {
        title: "Untoldable Lines",
        image: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&q=80&w=800",
        description: "Creative JavaScript project exploring interactive storytelling and dynamic web experiences.",
        tags: ["JavaScript", "Interactive", "Creative"],
        github: "https://github.com/nfsprogramming/untoldablelines"
    },
    {
        title: "Link to QR & Business Card",
        image: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=800",
        description: "A web application that generates QR codes for URLs and creates digital business cards for easy contact sharing.",
        tags: ["TypeScript", "QR Code", "Business Card"],
        github: "https://github.com/nfsprogramming/link-to-qr-and-business-card"
    },
    {
        title: "Custom Browser",
        image: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?auto=format&fit=crop&q=80&w=800",
        description: "A fast, lightweight custom web browser interface built with modern web technologies.",
        tags: ["TypeScript", "Web Browser", "UI"],
        github: "https://github.com/nfsprogramming/Browser"
    },
    {
        title: "Moodtune",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800",
        description: "An interactive web application that curates and tunes music playlists based on the user's current mood.",
        tags: ["JavaScript", "Music", "Interactive"],
        github: "https://github.com/nfsprogramming/moodtune"
    },
    {
        title: "Women Safety App (Offline)",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800",
        description: "An offline-first mobile application designed specifically to enhance women's safety with emergency alerts and tracking features.",
        tags: ["Kotlin", "Android", "Safety"],
        github: "https://github.com/nfsprogramming/Women-safety-app-offline"
    }
];

export default function Projects() {
    return (
        <section id="projects" className="container section-padding" style={{ position: 'relative' }}>
            <Scroll3DSection>
                <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                    <RevealOnScroll width="100%">
                        <h2 className="text-center">
                            Featured <span className="text-accent">Projects</span>
                        </h2>
                    </RevealOnScroll>
                </div>

                <div className="grid grid-3" style={{ position: 'relative', zIndex: 1, alignItems: 'stretch' }}>
                    {projects.map((project, index) => (
                        <Parallax3D
                            key={index}
                            offset={index % 3 === 1 ? 40 : index % 3 === 2 ? 80 : 0}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{
                                    delay: index * 0.1,
                                    duration: 0.6,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                style={{ height: '100%' }}
                            >
                                <TiltCard
                                    className="glass-card"
                                    onClick={() => window.open(project.github, '_blank')}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        padding: '3rem 2rem',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        height: '100%',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            background:
                                                'radial-gradient(circle at top left, rgba(255,46,46,0.25), transparent 55%)',
                                            pointerEvents: 'none',
                                            mixBlendMode: 'screen',
                                            zIndex: 0,
                                        }}
                                    />

                                    <div
                                        style={{
                                            position: 'relative',
                                            zIndex: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: '100%',
                                        }}
                                    >
                                        <div style={{
                                            position: 'relative',
                                            width: '100%',
                                            height: '240px',
                                            borderRadius: '16px',
                                            overflow: 'hidden',
                                            marginBottom: '2rem',
                                            border: '1px solid rgba(255, 255, 255, 0.05)'
                                        }}>
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                loading="lazy"
                                                decoding="async"
                                                onError={(e) => {
                                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800';
                                                    e.currentTarget.onerror = null;
                                                }}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
                                                }}
                                                className="project-image"
                                            />
                                            <div style={{
                                                position: 'absolute',
                                                inset: 0,
                                                background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.8))'
                                            }} />
                                        </div>

                                        <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <TextReveal
                                                text={project.title}
                                                className="text-xl font-bold text-white"
                                                delay={index * 0.1 + 0.3}
                                            />
                                            <Code2 size={20} className="text-accent opacity-50" />
                                        </div>

                                        <p
                                            style={{
                                                marginBottom: '1.5rem',
                                                lineHeight: 1.6,
                                                fontSize: '0.95rem',
                                                flexGrow: 1,
                                                color: '#aaa',
                                            }}
                                        >
                                            {project.description}
                                        </p>

                                        <div
                                            className="flex project-tags gap-2"
                                            style={{ marginBottom: '1.5rem', flexWrap: 'wrap' }}
                                        >
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    style={{
                                                        background: 'rgba(255, 255, 255, 0.05)',
                                                        padding: '4px 12px',
                                                        borderRadius: '20px',
                                                        fontSize: '0.75rem',
                                                        color: '#ccc',
                                                        border: '1px solid rgba(255, 255, 255, 0.05)',
                                                    }}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div
                                            className="flex gap-4"
                                            style={{ alignItems: 'center', marginTop: 'auto' }}
                                        >
                                            <motion.a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2"
                                                onClick={(e) => e.stopPropagation()}
                                                style={{
                                                    fontSize: '0.9rem',
                                                    textDecoration: 'none',
                                                    color: 'inherit',
                                                    fontWeight: 500,
                                                    position: 'relative',
                                                    zIndex: 10,
                                                }}
                                                whileHover={{ x: 4 }}
                                                transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                                            >
                                                <Github size={18} className="text-accent" /> View Code
                                            </motion.a>
                                        </div>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        </Parallax3D>
                    ))}
                </div>
            </Scroll3DSection>
        </section>
    );
}
