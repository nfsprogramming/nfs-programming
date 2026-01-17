import { useEffect } from 'react';
import Lenis from 'lenis';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Services from './components/Services';
import Experience from './components/Experience';
import Background3D from './components/Background3D';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Workflow from './components/Workflow';
import './grain.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <CustomCursor />
      <div className="app">
        {/* New Immersive 3D Background */}
        <Background3D />

        {/* Grain Effect */}
        <div className="grain-overlay" />

        <Navbar />

        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Workflow />
            </>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <footer className="footer" style={{ position: 'relative', zIndex: 10 }}>
          © {new Date().getFullYear()} NFS Programming. All Rights Reserved.
        </footer>
      </div>
    </BrowserRouter>
  );
}
