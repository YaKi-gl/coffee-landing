import { motion } from 'framer-motion';
import { BRAND, NAV_LINKS } from '../../data/content.js';
import { useScrolled } from '../../hooks/useScrolled.js';
import './Nav.css';

/** Липкая шапка: при прокрутке получает тень, ссылки подчёркиваются анимацией. */
export function Nav() {
  const scrolled = useScrolled();

  return (
    <motion.header
      className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
      initial={{ y: -64 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
    >
      <div className="container nav__inner">
        <a href="#" className="nav__logo">
          <motion.span className="nav__logo-icon" whileHover={{ rotate: [0, -15, 15, 0] }} transition={{ duration: 0.5 }}>
            {BRAND.logo}
          </motion.span>{' '}
          {BRAND.name}
        </a>
        <nav className="nav__links">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav__link">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
