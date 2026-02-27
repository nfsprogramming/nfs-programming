import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function TiltCard({ children, className = "", style = {}, ...props }) {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const [isHovered, setIsHovered] = React.useState(false);

    const handleMouseMove = (e) => {
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
            whileHover={{
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
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                willChange: "transform, box-shadow",
                ...style
            }}
            className={className}
            {...props}
        >
            <motion.div 
                animate={{ 
                    translateZ: isHovered ? "80px" : "30px",
                    scale: isHovered ? 1.05 : 1
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
            <motion.div
                style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    zIndex: 0,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, transparent 100%)',
                    x: useTransform(mouseXSpring, [-0.5, 0.5], ['-10%', '10%']),
                    y: useTransform(mouseYSpring, [-0.5, 0.5], ['-10%', '10%']),
                    pointerEvents: 'none',
                    borderRadius: 'inherit'
                }}
            />
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
