import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';
import heroImg from '../assets/hero_render.webp';
import Button from './Button';

export default function Hero() {
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth <= 390);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallMobile(window.innerWidth <= 390);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      className="hero" 
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <motion.div
        className="hero-overlay"
        initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
        animate={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
        transition={{ delay: 0.6, duration: 0.4, ease: 'easeOut' }}
      />

      <div className="hero-content">
        <motion.div
          className="hero-glass-box"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
        >
          <motion.div
            className="hero-light-mask"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />

          <motion.div
            className="hero-inner"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4, ease: 'easeOut' }}
          >
            <h1 className="hero-title">
              {isSmallMobile ? (
                <>
                  Boutique townhomes<br />
                  in Maryborough<span className="kern-period">.</span>
                </>
              ) : (
                <>
                  Boutique townhomes<br />
                  in lea<span className="kern-f">f</span>y Maryborough.
                </>
              )}
            </h1>
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              SCHEDULE A TOUR
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}







