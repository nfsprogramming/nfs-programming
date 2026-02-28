import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, useScroll } from 'framer-motion';

export default function TiltCard({ children, className = "", style = {}, ...props }) {
    const ref = useRef(null);
    const shouldReduceMotion = useReducedMotion();

    // Scroll-based dynamic blur logic
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Calculate dynamic blur intensity:
    // 1. As it enters (progress 0-0.4): Low blur (4px) -> No blur (0px)
    // 2. Center (progress 0.4-0.6): No blur (0px)
    // 3. As it leaves (progress 0.6-1): No blur (0px) -> Low blur (4px)
    const dynamicBlurValue = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [4, 0, 0, 4]);
    const dynamicOpacityValue = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.8, 1, 1, 0.8]);
    
    // Performance: Smooth the blur value with a spring
    const blurSpring = useSpring(dynamicBlurValue, { stiffness: 100, damping: 30 });
    const opacitySpring = useSpring(dynamicOpacityValue, { stiffness: 100, damping: 30 });

    const backdropFilter = useTransform(blurSpring, (v) => `blur(${v}px)`);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const glossX = useTransform(mouseXSpring, [-0.5, 0.5], ['-10%', '10%']);
    const glossY = useTransform(mouseYSpring, [-0.5, 0.5], ['-10%', '10%']);

    const [isHovered, setIsHovered] = React.useState(false);

    const handleMouseMove = (e) => {
        if (shouldReduceMotion) return; // Skip tilt if reduced motion is on
        if (!isHovered) setIsHovered(true);
        const rect = e.currentTarget.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={shouldReduceMotion ? { scale: 1.02 } : {
                scale: 1.05,
                boxShadow: '0 30px 100px rgba(0, 0, 0, 0.8)'
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                mass: 1
            }}
            style={{
                rotateX: shouldReduceMotion ? 0 : rotateX,
                rotateY: shouldReduceMotion ? 0 : rotateY,
                transformStyle: "preserve-3d",
                willChange: "transform, box-shadow, backdrop-filter",
                overflow: 'hidden', // Clip the glossy reflection and any bleeding effects
                background: 'var(--glass-bg)',
                backdropFilter: shouldReduceMotion ? 'blur(var(--glass-blur))' : backdropFilter,
                opacity: shouldReduceMotion ? 1 : opacitySpring,
                border: '1px solid var(--glass-border)',
                height: '100%', // Crucial for grid stretching
                width: '100%',
                ...style
            }}
            className={className}
            {...props}
        >
            <motion.div 
                animate={{ 
                    translateZ: shouldReduceMotion ? 0 : (isHovered ? "60px" : "0px"),
                    scale: shouldReduceMotion ? 1 : (isHovered ? 1.05 : 1)
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                }}
                style={{ 
                    transformStyle: "preserve-3d", 
                    height: "100%",
                    width: "100%"
                }}
            >
                {children}
            </motion.div>
            {/* Glossy Reflection Effect */}
            {!shouldReduceMotion && (
                <motion.div
                    style={{
                        position: 'absolute',
                        top: '-50%',
                        left: '-50%',
                        width: '200%',
                        height: '200%',
                        zIndex: 0,
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, transparent 100%)',
                        x: glossX,
                        y: glossY,
                        pointerEvents: 'none',
                        borderRadius: 'inherit'
                    }}
                />
            )}
            {/* Spotlight Effect */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 0,
                    background: useTransform(
                        [x, y],
                        ([latestX, latestY]) => `radial-gradient(circle at ${(latestX + 0.5) * 100}% ${(latestY + 0.5) * 100}%, rgba(255, 46, 46, 0.2), transparent 50%)`
                    ),
                    opacity: useTransform(x, (latest) => (latest === 0 ? 0 : 1)),
                    pointerEvents: 'none',
                    borderRadius: 'inherit'
                }}
            />
        </motion.div>
    );
}
