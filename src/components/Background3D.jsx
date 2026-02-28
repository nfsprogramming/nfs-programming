import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

class Particle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.baseX = Math.random() * width;
        this.baseY = Math.random() * height;
        this.x = this.baseX;
        this.y = this.baseY;
        this.size = Math.random() * 2 + 1;
        this.z = Math.random() * 2 + 0.5;
        this.baseColor = `rgba(255, 46, 46, ${0.2 * this.z})`;
        this.density = (Math.random() * 30) + 1;
        this.vx = 0;
        this.vy = 0;
    }

    update(mouse, scrollY) {
        const scrollSpeed = 0.5;
        const friction = 0.95;
        const ease = 0.05;

        let screenY = (this.y - (scrollY * this.z * scrollSpeed)) % this.height;
        if (screenY < 0) screenY += this.height;

        let dx = mouse.x - this.x;
        let dy = mouse.y - screenY;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        const maxDistance = 250;

        if (mouse.x != null && distance < maxDistance && !mouse.isHoveringText) {
            const force = (maxDistance - distance) / maxDistance;
            if (distance < 100) {
                const repulsionForce = (100 - distance) / 100;
                this.vx -= forceDirectionX * repulsionForce * 5;
                this.vy -= forceDirectionY * repulsionForce * 5;
            } else {
                const attractionForce = force * this.density * 0.5;
                this.vx += forceDirectionX * attractionForce;
                this.vy += forceDirectionY * attractionForce;
            }
        }

        // Return to base position physics
        let rdx = this.baseX - this.x;
        let rdy = this.baseY - this.y;
        this.vx += rdx * ease;
        this.vy += rdy * ease;

        this.vx *= friction;
        this.vy *= friction;
        this.x += this.vx;
        this.y += this.vy;
    }

    draw(ctx, x, y) {
        ctx.fillStyle = this.baseColor;
        ctx.beginPath();
        ctx.arc(x, y, this.size * this.z * 0.6, 0, Math.PI * 2);
        ctx.fill();
    }
}

export default function Background3D() {
    const canvasRef = useRef(null);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        if (shouldReduceMotion) return; // Don't run animation if reduced motion is requested

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        let mouse = { x: null, y: null, isHoveringText: false };
        const connectionDistance = 150;
        const mouseDistance = 180;

        const initParticles = () => {
            particles = [];
            const count = width < 768 ? 50 : 100;
            for (let i = 0; i < count; i++) {
                particles.push(new Particle(width, height));
            }
        };

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initParticles();
        };

        let animationFrameId;

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Subtle Mouse Glow Background
            if (mouse.x != null) {
                const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 400);
                gradient.addColorStop(0, 'rgba(255, 46, 46, 0.03)');
                gradient.addColorStop(1, 'transparent');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);
            }

            let mouseConnections = [];
            const scrollY = window.scrollY;
            const scrollSpeed = 0.5;

            // Update and draw particles first
            particles.forEach(particle => {
                particle.update(mouse, scrollY);

                // Calculate render position
                let visibleY = (particle.y - (scrollY * particle.z * scrollSpeed)) % height;
                if (visibleY < 0) visibleY += height;

                particle.renderX = particle.x;
                particle.renderY = visibleY;

                particle.draw(ctx, particle.renderX, particle.renderY);
            });

            // Draw connections between particles
            ctx.lineWidth = 0.5;
            for (let i = 0; i < particles.length; i++) {
                // Connection between particles
                for (let j = i; j < particles.length; j++) {
                    let dx = particles[i].renderX - particles[j].renderX;
                    let dy = particles[i].renderY - particles[j].renderY;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        let opacity = 1 - (distance / connectionDistance);
                        let depthFactor = (particles[i].z + particles[j].z) / 4;

                        // More vibrant connection color
                        ctx.strokeStyle = `rgba(255, 46, 46, ${opacity * depthFactor * 0.25})`;
                        ctx.moveTo(particles[i].renderX, particles[i].renderY);
                        ctx.lineTo(particles[j].renderX, particles[j].renderY);
                        ctx.stroke();
                    }
                }

                // Mouse Connections (The "Capturing" Visual) - Collect first
                if (mouse.x != null && !mouse.isHoveringText) {
                    let dx = mouse.x - particles[i].renderX;
                    let dy = mouse.y - particles[i].renderY;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouseDistance) {
                        mouseConnections.push({
                            x: particles[i].renderX,
                            y: particles[i].renderY,
                            distance: distance
                        });
                    }
                }
            }

            // Mouse connections (lines) removed for cleaner look. 
            // The particles will still interact via physics (attraction/repulsion) defined in the update() method.

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;

            // Text hover detection 
            const target = e.target;
            const textTags = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'A', 'LI', 'BUTTON', 'LABEL', 'STRONG', 'EM', 'B', 'I'];
            const isText = textTags.includes(target.tagName) || target.closest('a') || target.closest('button');

            // Update the shared variable - we can attach it to the mouse object for cleaner scope access in the loop
            mouse.isHoveringText = isText;
        };

        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
            mouse.isHoveringText = false;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        resize();
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [shouldReduceMotion]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: -1,
                background: '#020202',
                pointerEvents: 'none'
            }}
        />
    );
}
