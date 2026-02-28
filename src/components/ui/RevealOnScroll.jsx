import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function RevealOnScroll({ children, width = "100%", height = "auto", delay = 0.25, className = "" }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-75px" });

    return (
        <div 
            ref={ref} 
            className={className}
            style={{ 
                width, 
                height,
                position: 'relative', 
                overflow: 'hidden' 
            }}
        >
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.8, delay: delay, ease: [0.25, 1, 0.5, 1] }} // smooth ease
                style={{ height: height === '100%' ? '100%' : 'auto' }}
            >
                {children}
            </motion.div>

            {/* Optional slide cover effect, currently disabled but good for "next level" */}
        </div>
    );
}
