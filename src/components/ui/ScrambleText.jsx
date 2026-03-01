import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

const chars = '!<>-_\\/[]{}—=+*^?#_0123456789';

export default function ScrambleText({ text, delay = 0 }) {
    const shouldReduceMotion = useReducedMotion();
    const [displayText, setDisplayText] = useState(shouldReduceMotion ? text : "");

    useEffect(() => {
        if (shouldReduceMotion) return;

        let iteration = 0;
        let interval = null;

        const timeout = setTimeout(() => {
            interval = setInterval(() => {
                setDisplayText(
                    text.split("")
                        .map((letter, index) => {
                            if (index < iteration) {
                                return text[index];
                            }
                            if (text[index] === " ") return " ";
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join("")
                );

                if (iteration >= text.length) {
                    clearInterval(interval);
                }
                iteration += 1 / 3;
            }, 30);
        }, delay * 1000);

        return () => {
            clearTimeout(timeout);
            if (interval) clearInterval(interval);
        };
    }, [text, delay, shouldReduceMotion]);

    return <span style={{ fontFamily: 'monospace', letterSpacing: '0.1em' }}>{displayText || (shouldReduceMotion ? text : "")}</span>;
}
