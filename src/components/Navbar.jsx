import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const navItems = ['About', 'Services', 'Experience', 'Skills', 'Projects', 'Contact'];

    return (
        <nav className="navbar">
            <Link to="/" className="brand-logo" onClick={() => setIsNavOpen(false)}>
                <img src="/logo.png" alt="NFS Programming Logo" className="nav-logo" />
                NFS <span>Programming</span>
            </Link>

            <button className="mobile-menu-btn" onClick={() => setIsNavOpen(!isNavOpen)} aria-label="Toggle Menu">
                {isNavOpen ? <X size={28} color="#fff" /> : <Menu size={28} color="#fff" />}
            </button>

            <ul className={`nav-links ${isNavOpen ? 'mobile-open' : 'hidden-mobile'}`}>
                {navItems.map((item) => (
                    <li key={item}>
                        <NavLink
                            to={`/${item.toLowerCase()}`}
                            onClick={() => setIsNavOpen(false)}
                            style={({ isActive }) => ({
                                opacity: isActive ? 1 : 0.7,
                                color: isActive ? 'var(--accent-color)' : 'inherit'
                            })}
                        >
                            {item}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
