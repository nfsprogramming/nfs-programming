import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Scroll3DSection({ children, className = "" }) {
    const ref = useRef(null);
    
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
    const y = useTransform(scrollYProgress, [0, 1], [50, -50]); // Subtle parallax translation

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{
                perspective: '1200px', // Creates the 3D space depth
                transformStyle: 'preserve-3d',
                willChange: 'transform' // Performance optimization
            }}
        >
            <motion.div
                style={{
                    rotateX,
                    scale,
                    opacity,
                    y,
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'center center'
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
}
