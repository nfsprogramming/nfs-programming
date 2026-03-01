import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, TrackballControls, PerspectiveCamera } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const skills = [
    'React', 'Node.js', 'Python', 'AI/ML', 'JavaScript',
    'TypeScript', 'Next.js', 'Three.js', 'Framer Motion',
    'Tailwind', 'Docker', 'AWS', 'PostgreSQL', 'MongoDB',
    'Git', 'UI/UX', 'NLP', 'PyTorch', 'FastAPI'
];

function Word({ children, onHover, ...props }) {
    const color = new THREE.Color();
    const fontProps = {
        fontSize: 2.5,
        letterSpacing: -0.05,
        lineHeight: 1,
        'material-toneMapped': false
    };
    const ref = useRef();
    const [hovered, setHovered] = useState(false);

    const over = (e) => {
        e.stopPropagation();
        setHovered(true);
        onHover(children);
    };
    const out = () => {
        setHovered(false);
        onHover(null);
    };

    useFrame(({ camera }) => {
        ref.current.quaternion.copy(camera.quaternion);
        ref.current.material.color.lerp(color.set(hovered ? '#ff2e2e' : props.textColor), 0.1);
        ref.current.scale.lerp(new THREE.Vector3().setScalar(hovered ? 1.2 : 1), 0.1);
    });

    return (
        <Text ref={ref} onPointerOver={over} onPointerOut={out} {...props} {...fontProps}>
            {children}
        </Text>
    );
}

function Cloud({ radius = 20, textColor, onHover }) {
    const words = useMemo(() => {
        const temp = [];
        for (let i = 0; i < skills.length; i++) {
            const phi = Math.acos(-1 + (2 * i) / skills.length);
            const theta = Math.sqrt(skills.length * Math.PI) * phi;
            temp.push([new THREE.Vector3().setFromSphericalCoords(radius, phi, theta), skills[i]]);
        }
        return temp;
    }, [radius]);

    const groupRef = useRef();
    useFrame(() => {
        groupRef.current.rotation.y += 0.002;
        groupRef.current.rotation.x += 0.001;
    });

    return (
        <group ref={groupRef}>
            {words.map(([pos, word], index) => (
                <Word key={index} position={pos} textColor={textColor} onHover={onHover}>
                    {word}
                </Word>
            ))}
        </group>
    );
}

export default function SkillSphere() {
    const [hoveredSkill, setHoveredSkill] = useState(null);
    const fogColor = '#050505';
    const textColor = '#ffffff';

    return (
        <div style={{ width: '100%', height: '100%', cursor: 'grab', position: 'relative' }}>
            <AnimatePresence>
                {hoveredSkill && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: '-50%' }}
                        animate={{ opacity: 1, scale: 1, x: '-50%' }}
                        exit={{ opacity: 0, scale: 0.8, x: '-50%' }}
                        style={{
                            position: 'absolute',
                            top: '5%',
                            left: '50%',
                            zIndex: 10,
                            background: 'rgba(255, 46, 46, 0.95)',
                            color: 'white',
                            padding: '6px 16px',
                            borderRadius: '50px',
                            fontWeight: 800,
                            fontSize: '1rem',
                            boxShadow: '0 8px 25px rgba(255, 46, 46, 0.4)',
                            pointerEvents: 'none',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}
                    >
                        {hoveredSkill}
                    </motion.div>
                )}
            </AnimatePresence>
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 40], fov: 65 }}>
                <fog attach="fog" args={[fogColor, 0, 80]} />
                <Cloud radius={22} textColor={textColor} onHover={setHoveredSkill} />
                <TrackballControls noPan noZoom rotateSpeed={2.5} />
            </Canvas>
        </div>
    );
}
