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
            const target = e.target;
            if (target.tagName === 'A' || 
                target.tagName === 'BUTTON' || 
                target.closest('a') || 
                target.closest('button') ||
                window.getComputedStyle(target).cursor === 'pointer') {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseDown = () => setIsClicked(true);
        const handleMouseUp = () => setIsClicked(false);
        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        // Add event listeners
        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [cursorX, cursorY, isVisible]);



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
                    backgroundColor: isHovering ? '#fff' : '#ff2e2e',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    boxShadow: isHovering ? '0 0 10px rgba(255, 255, 255, 0.5)' : 'none'
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
                    border: '1px solid',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9998,
                    mixBlendMode: 'difference',
                    backdropFilter: 'blur(1px)'
                }}
                animate={{
                    scale: isClicked ? 0.8 : isHovering ? 2 : 1, // Larger scale on hover
                    opacity: isHovering ? 1 : 0.4,
                    borderColor: isHovering ? '#ffffff' : '#ff2e2e', // White on hover, red default
                    borderWidth: isClicked ? '2px' : '1px',
                    backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.1)' : 'transparent' // Subtle fill on hover
                }}
                transition={{
                    duration: 0.2,
                    ease: "circOut"
                }}
            />
        </div>
    );
}
