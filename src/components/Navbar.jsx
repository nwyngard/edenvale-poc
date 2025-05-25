import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Navbar.css';
import deco from '../assets/deco.svg';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      const bottomReached = scrollTop + windowHeight >= fullHeight - 10;
      const pastThreshold = scrollTop > 30;

      setScrolled(pastThreshold && !bottomReached);
      setAtBottom(bottomReached);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  return (
    <nav
      className={`navbar${scrolled ? ' scrolled' : ''}${atBottom ? ' show-mask' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ opacity: scrolled && !hovered ? 0.9 : 1 }}
    >
      <div className="nav-container">
        <motion.div
          className="nav-left desktop-only"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <a onClick={() => scrollToSection('intro')}>About</a>
          <a onClick={() => scrollToSection('amenities')}>Amenities</a>
          <a onClick={() => scrollToSection('features')}>Features</a>
        </motion.div>

      <motion.div
        className="nav-logo-block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        onClick={() => {
          const hero = document.getElementById('home');
          if (hero) hero.scrollIntoView({ behavior: 'smooth' });
          closeMenu(); // optional: closes the mobile menu if open
        }}
        style={{ cursor: 'pointer' }}
      >
        <div className="nav-logo">EDENVALE</div>
        <div className="nav-subtext-container">
          <img src={deco} alt="" className="logo-deco" />
          <span className="nav-subtext">PARKSIDE LIVING</span>
          <img src={deco} alt="" className="logo-deco flipped" />
        </div>
      </motion.div>

        <motion.div
          className="nav-right desktop-only"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <a onClick={() => scrollToSection('collections')}>Residences</a>
          <a onClick={() => scrollToSection('location')}>Location</a>
          <a onClick={() => scrollToSection('contact')}>Contact</a>
        </motion.div>

        <div
          className={`nav-toggle ${menuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
        >
          <span />
          <span />
          <span />
        </div>

        {menuOpen && <div className="menu-backdrop" onClick={closeMenu} />}

        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <a onClick={() => scrollToSection('intro')}>About</a>
          <a onClick={() => scrollToSection('amenities')}>Amenities</a>
          <a onClick={() => scrollToSection('features')}>Features</a>
          <a onClick={() => scrollToSection('collections')}>Residences</a>
          <a onClick={() => scrollToSection('location')}>Location</a>
          <a onClick={() => scrollToSection('contact')}>Contact</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;





