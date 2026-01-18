import { useEffect, useRef } from 'react';

export default function Background3D() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        // Configuration
        const isMobile = width < 768;
        const particleCount = isMobile ? 50 : 100; // Optimized for mobile
        const connectionDistance = 150;
        const mouseDistance = 250; // Increased range for capturing

        // Mouse state
        let mouse = { x: null, y: null };

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            // Re-init with correct count if needed, or just let them be naturally
            initParticles();
        };

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                // Simulate depth
                this.z = Math.random() * 2 + 0.5;
                this.baseColor = `rgba(255, 46, 46, ${0.2 * this.z})`; // Varies opacity by depth
            }

            update() {
                // Mouse Interaction (Attraction / Capturing)
                if (mouse.x != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouseDistance) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (mouseDistance - distance) / mouseDistance;

                        // Attraction instead of repulsion
                        const attractionStrength = 0.8;

                        this.vx += forceDirectionX * force * attractionStrength * 0.5;
                        this.vy += forceDirectionY * force * attractionStrength * 0.5;
                    }
                }

                // Constant gentle movement
                this.x += this.vx * this.z;
                this.y += this.vy * this.z;

                // Friction to stabilize mouse interaction velocity
                this.vx *= 0.96;
                this.vy *= 0.96;

                // Add slight randomness to prevent stagnation
                if (Math.abs(this.vx) < 0.1) this.vx += (Math.random() - 0.5) * 0.05;
                if (Math.abs(this.vy) < 0.1) this.vy += (Math.random() - 0.5) * 0.05;

                // Wrap around screen
                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
            }

            draw() {
                ctx.fillStyle = this.baseColor;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * this.z * 0.6, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            const count = width < 768 ? 50 : 100; // Recalculate based on current width
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Update and draw particles first
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw connections between particles
            ctx.lineWidth = 0.5;
            for (let i = 0; i < particles.length; i++) {
                // Connection between particles
                for (let j = i; j < particles.length; j++) {
                    let dx = particles[i].x - particles[j].x;
                    let dy = particles[i].y - particles[j].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        let opacity = 1 - (distance / connectionDistance);
                        let depthFactor = (particles[i].z + particles[j].z) / 4;

                        ctx.strokeStyle = `rgba(255, 46, 46, ${opacity * depthFactor * 0.2})`;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }

                // Mouse Connections (The "Capturing" Visual)
                if (mouse.x != null) {
                    let dx = mouse.x - particles[i].x;
                    let dy = mouse.y - particles[i].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouseDistance) {
                        ctx.beginPath();
                        // Stronger opacity for mouse connections
                        let opacity = 1 - (distance / mouseDistance);
                        ctx.strokeStyle = `rgba(255, 46, 46, ${opacity * 0.5})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(mouse.x, mouse.y);
                        ctx.lineTo(particles[i].x, particles[i].y);
                        ctx.stroke();
                        ctx.lineWidth = 0.5; // Reset
                    }
                }
            }

            requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

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
