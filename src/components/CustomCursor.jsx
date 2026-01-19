import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    // Hide on mobile/touch devices
    const isTouchDevice = typeof window !== 'undefined' && (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));

    if (isTouchDevice || typeof window !== 'undefined' && window.innerWidth < 768) {
        return null;
    }

    return (
        <>
            {/* Main Cursor Dot */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#ff2e2e',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    mixBlendMode: 'difference'
                }}
            />
            {/* Trailing Ring */}
            <motion.div
                animate={{
                    x: mousePosition.x - 16,
                    y: mousePosition.y - 16,
                    scale: isHovering ? 1.5 : 1,
                    opacity: isHovering ? 0.8 : 0.4,
                    borderColor: isHovering ? '#ff2e2e' : 'rgba(255, 255, 255, 0.5)'
                }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                    mass: 0.1
                }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '32px',
                    height: '32px',
                    border: '1px solid white',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9998,
                    mixBlendMode: 'difference'
                }}
            />
        </>
    );
}
