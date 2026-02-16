import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Parallax3D({ children, offset = 50, className = "" }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
    const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

    return (
        <div ref={ref} className={className} style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>
            <motion.div style={{ y, rotateX, opacity, scale, transformStyle: 'preserve-3d' }}>
                {children}
            </motion.div>
        </div>
    );
}
