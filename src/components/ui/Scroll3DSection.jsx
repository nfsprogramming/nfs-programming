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
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]); // More pronounced parallax translation
    
    // Premium additions: blur and brightness for depth
    const blurValue = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [10, 0, 0, 10]);
    const brightness = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.5, 1, 1, 0.5]);
    const filter = useTransform(
        [blurValue, brightness],
        ([b, br]) => `blur(${b}px) brightness(${br})`
    );

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{
                perspective: '2000px', // Increased perspective for deeper look
                transformStyle: 'preserve-3d',
                willChange: 'transform, filter' // Performance optimization
            }}
        >
            <motion.div
                style={{
                    rotateX,
                    scale,
                    opacity,
                    y,
                    filter,
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'center center'
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
}
