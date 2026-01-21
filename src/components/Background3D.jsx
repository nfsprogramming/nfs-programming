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
                this.baseX = Math.random() * width;
                this.baseY = Math.random() * height;
                this.x = this.baseX;
                this.y = this.baseY;
                this.size = Math.random() * 2 + 1;
                this.z = Math.random() * 2 + 0.5;
                this.baseColor = `rgba(255, 46, 46, ${0.2 * this.z})`;
                this.density = (Math.random() * 30) + 1;
            }

            update() {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                const maxDistance = 250;
                const returnSpeed = 0.04; // Tweak spring tension

                if (mouse.x != null && distance < maxDistance) {
                    // Attraction
                    const force = (maxDistance - distance) / maxDistance;
                    const directionX = forceDirectionX * force * this.density;
                    const directionY = forceDirectionY * force * this.density;
                    this.x += directionX;
                    this.y += directionY;
                } else {
                    // Return to original position
                    if (this.x !== this.baseX) {
                        let dx = this.x - this.baseX;
                        this.x -= dx * returnSpeed;
                    }
                    if (this.y !== this.baseY) {
                        let dy = this.y - this.baseY;
                        this.y -= dy * returnSpeed;
                    }
                }
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

            // Subtle Mouse Glow Background
            if (mouse.x != null) {
                const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 400);
                gradient.addColorStop(0, 'rgba(255, 46, 46, 0.03)');
                gradient.addColorStop(1, 'transparent');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);
            }

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

                        // More vibrant connection color
                        ctx.strokeStyle = `rgba(255, 46, 46, ${opacity * depthFactor * 0.25})`;
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
                        ctx.strokeStyle = `rgba(255, 46, 46, ${opacity})`; // Max visibility
                        ctx.lineWidth = 1 + opacity; // Variable thickness based on proximity
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
