import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export default function Scroll3DSection({ children, className = "" }) {
    const ref = useRef(null);
    const shouldReduceMotion = useReducedMotion();
    
    // Track the scroll progress of this container relative to the viewport
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Create 3D transformation values
    // As the element enters: tilts up, scales up, fades in
    // Center: flat, full scale, full opacity
    // As it leaves: tilts down, scales down, fades out
    const rotateX = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [15, 0, 0, -15]);
    const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.85, 1, 1, 0.85]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]); // More pronounced parallax translation
    
    // Premium additions: blur and brightness for depth
    const blurValue = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [10, 0, 0, 10]);
    const brightness = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.5, 1, 1, 0.5]);
    
    // Performance: Only apply blur if not on mobile and not reduced motion
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const filter = useTransform(
        [blurValue, brightness],
        ([b, br]) => (isMobile || shouldReduceMotion) ? `brightness(${br})` : `blur(${b}px) brightness(${br})`
    );

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{
                perspective: shouldReduceMotion ? 'none' : '2000px', // Disable perspective for reduced motion
                transformStyle: 'preserve-3d',
                willChange: 'transform, filter' // Performance optimization
            }}
        >
            <motion.div
                style={{
                    rotateX: shouldReduceMotion ? 0 : rotateX,
                    scale: shouldReduceMotion ? 1 : scale,
                    opacity: shouldReduceMotion ? 1 : opacity,
                    y: shouldReduceMotion ? 0 : y,
                    filter: shouldReduceMotion ? 'none' : filter,
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'center center'
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
}
