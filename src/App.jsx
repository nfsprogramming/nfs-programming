import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, useScroll, motion } from 'framer-motion';
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
import PageTransition from './components/ui/PageTransition';
import Preloader from './components/ui/Preloader';
import QuickActions from './components/ui/QuickActions';
import './grain.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageTransition>
              <Hero />
              <Workflow />
            </PageTransition>
          } />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
          <Route path="/experience" element={<PageTransition><Experience /></PageTransition>} />
          <Route path="/skills" element={<PageTransition><Skills /></PageTransition>} />
          <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();

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
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CustomCursor />
            <QuickActions />
            {/* Global Scroll Progress Bar */}
            <motion.div
              className="scroll-progress-bar"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #ff2e2e, #ff6b6b)',
                transformOrigin: '0%',
                zIndex: 10001,
                boxShadow: '0 2px 10px rgba(255, 46, 46, 0.4)',
                scaleX: scrollYProgress
              }}
            />
            <div className="app">
              <Background3D />
              <div className="grain-overlay" />
              <Navbar />
              <AnimatedRoutes />
              <footer className="footer" style={{ 
                position: 'relative', 
                zIndex: 10, 
                background: 'rgba(5, 5, 5, 0.95)', 
                backdropFilter: 'blur(20px)',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                padding: '6rem 2rem 2rem 2rem'
              }}>
                <div className="container">
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                    gap: '4rem',
                    marginBottom: '4rem'
                  }}>
                    {/* Brand Column */}
                    <div>
                      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.5rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem' }}>
                        <img src="/logo.png" alt="NFS Programming Logo" style={{ width: '40px', height: '40px' }} />
                        NFS <span className="text-accent">Programming</span>
                      </Link>
                      <p style={{ color: '#888', lineHeight: '1.6', fontSize: '0.95rem' }}>
                        Crafting high-performance digital solutions with cutting-edge technology and intelligent architecture.
                      </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                      <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 700 }}>Quick Links</h4>
                      <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        {['About', 'Services', 'Projects', 'Contact'].map(item => (
                          <li key={item}>
                            <Link to={`/${item.toLowerCase()}`} style={{ color: '#888', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color = '#ff2e2e'} onMouseLeave={e => e.target.style.color = '#888'}>
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Contact CTA */}
                    <div>
                      <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 700 }}>Let's Build Something</h4>
                      <p style={{ color: '#888', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                        Ready to start your next project? Get in touch and let's make it happen.
                      </p>
                      <Link to="/contact">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            padding: '0.8rem 2rem',
                            background: 'linear-gradient(135deg, #ff2e2e, #ff6b6b)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(255, 46, 46, 0.3)'
                          }}
                        >
                          Contact Me
                        </motion.button>
                      </Link>
                    </div>
                  </div>

                  {/* Bottom Bar */}
                  <div style={{ 
                    paddingTop: '2rem', 
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}>
                    <p style={{ color: '#555', fontSize: '0.85rem' }}>
                      © {new Date().getFullYear()} NFS Programming. All Rights Reserved.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                      <a href="https://github.com/nfsprogramming" target="_blank" rel="noopener noreferrer" style={{ color: '#555', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = '#555'}>GitHub</a>
                      <a href="https://www.linkedin.com/in/nfs-photography" target="_blank" rel="noopener noreferrer" style={{ color: '#555', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = '#555'}>LinkedIn</a>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </BrowserRouter>
  );
}

