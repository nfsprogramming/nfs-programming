import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    // Use motion values instead of state to avoid re-renders
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth spring animation for the trailing ring
    const springConfig = { damping: 20, stiffness: 300 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseDown = () => setIsClicked(true);
        const handleMouseUp = () => setIsClicked(false);

        // Add event listeners
        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [cursorX, cursorY]);



    // Hide on mobile/touch devices
    const isTouchDevice = typeof window !== 'undefined' && (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));

    if (isTouchDevice || typeof window !== 'undefined' && window.innerWidth < 768) {
        return null;
    }

    return (
        <div style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s ease' }}>
            {/* Main Cursor Dot - follows instantly */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#ff2e2e',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    mixBlendMode: 'difference'
                }}
            />
            {/* Trailing Ring - follows with physics */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                    width: '32px',
                    height: '32px',
                    border: '1px solid white',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9998,
                    mixBlendMode: 'difference'
                }}
                animate={{
                    scale: isClicked ? 0.8 : isHovering ? 1.5 : 1,
                    opacity: isHovering ? 0.8 : 0.4,
                    borderColor: isClicked ? '#ff2e2e' : isHovering ? '#ff2e2e' : 'rgba(255, 255, 255, 0.5)',
                    borderWidth: isClicked ? '2px' : '1px'
                }}
                transition={{
                    duration: 0.15
                }}
            />
        </div>
    );
}
