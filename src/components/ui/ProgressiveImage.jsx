import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ProgressiveImage({ src, alt, className, style, ...props }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [prevSrc, setPrevSrc] = useState(src);

    // Reset state if src prop changes
    if (src !== prevSrc) {
        setPrevSrc(src);
        setIsLoaded(false);
    }

    // Generate an extreme low-quality placeholder (LQIP) for Unsplash images
    const placeholderSrc = src?.includes('unsplash.com')
        ? src.replace('&w=800', '&w=20').replace('&q=80', '&q=10')
        : src;

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#111' }}>
            {/* Hardware-Accelerated Placeholder */}
            <img
                src={placeholderSrc}
                alt=""
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: isLoaded ? 0 : 0.6,
                    transition: 'opacity 0.6s ease-out',
                    willChange: 'opacity'
                }}
                aria-hidden="true"
            />

            {/* High-Resolution Foreground Image */}
            <motion.img
                src={src}
                alt={alt}
                className={className}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{
                    opacity: isLoaded ? 1 : 0,
                    scale: isLoaded ? 1 : 1.05
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                onLoad={() => setIsLoaded(true)}
                style={{
                    ...style,
                    position: 'relative',
                    zIndex: 1,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    willChange: 'opacity, transform'
                }}
                {...props}
            />
        </div>
    );
}
