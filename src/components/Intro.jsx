import React, { useState, useEffect, useRef } from 'react';
import './Intro.css';
import { motion, useInView } from 'framer-motion';
import BGPlant1 from '../assets/BG-Plant1.svg';
import BGPlant2 from '../assets/BG-Plant2.svg';
import Button from './Button';

import slide1 from '../assets/slide1.webp';
import slide2 from '../assets/slide2.webp';
import slide3 from '../assets/slide3.webp';
import slide4 from '../assets/slide4.webp';
import slide5 from '../assets/slide5.webp';
import slide6 from '../assets/slide6.webp';

import slide1Mob from '../assets/slide1_mob.webp';
import slide2Mob from '../assets/slide2_mob.webp';
import slide3Mob from '../assets/slide3_mob.webp';
import slide4Mob from '../assets/slide4_mob.webp';
import slide5Mob from '../assets/slide5_mob.webp';
import slide6Mob from '../assets/slide6_mob.webp';

const Intro = () => {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef(null);
  const carouselWrapperRef = useRef(null);
  const carouselInView = useInView(carouselWrapperRef, { once: true, margin: '-100px' });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const desktopSlides = [slide1, slide2, slide3, slide4, slide5, slide6];
  const mobileSlides = [slide1Mob, slide2Mob, slide3Mob, slide4Mob, slide5Mob, slide6Mob];
  const slides = isMobile ? mobileSlides : desktopSlides;

  useEffect(() => {
    if (isMobile) return;
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isMobile, slides.length]);

  useEffect(() => {
    if (!isMobile || !scrollRef.current) return;

    const container = scrollRef.current;
    const handleScroll = () => {
      const index = Math.round(container.scrollLeft / container.offsetWidth);
      setCurrent(index);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  const scrollToIndex = index => {
    if (isMobile && scrollRef.current) {
      const container = scrollRef.current;
      const scrollX = container.offsetWidth * index;
      container.scrollTo({ left: scrollX, behavior: 'smooth' });
    } else {
      setCurrent(index);
    }
  };

  return (
    <section className="intro-container">
      <img src={BGPlant1} alt="" className="bg-plant-left" />
      <img src={BGPlant2} alt="" className="bg-plant-right" />

      <div className="section-intro">
        <h2>
          {isMobile ? (
            'Relaxed parkside living.'
          ) : (
            <>
              A relaxed lifestyle in idyllic parklands<span className="kern-period">.</span>
            </>
          )}
        </h2>
        <p>
          {isMobile
            ? "Edenvale offers a curated collection of spacious, modern townhomes adjacent to Maryborough's idyllic parklands."
            : "Edenvale offers a curated collection of townhomes designed for a relaxed lifestyle. Every detail has been considered, from elegant finishes to generous living spaces, with Maryborough’s idyllic parklands as your backyard."}
        </p>
      </div>

      <motion.div
        ref={carouselWrapperRef}
        initial={{ scale: 0.95 }}
        animate={carouselInView ? { scale: 1 } : { scale: 0.95 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div
          className="carousel-placeholder"
          style={{
            backgroundImage: isMobile ? 'none' : `url(${slides[current]})`,
          }}
        >
          <div className="carousel-blur-overlay" />
          <div className="carousel-inner">
            <div className="carousel-image-wrapper" ref={scrollRef}>
              {slides.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Slide ${idx + 1}`}
                  className="carousel-slide"
                  style={
                    isMobile
                      ? {}
                      : {
                          opacity: idx === current ? 1 : 0,
                          transition: 'opacity 1s ease',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }
                  }
                  width={isMobile ? undefined : 1120}
                  height={isMobile ? undefined : 600}
                  loading="lazy"
                />
              ))}

              {!isMobile && (
                <div className="carousel-dots desktop-only">
                  {slides.map((_, idx) => (
                    <span
                      key={idx}
                      className={`dot ${idx === current ? 'active' : ''}`}
                      onClick={() => scrollToIndex(idx)}
                    />
                  ))}
                </div>
              )}
            </div>

            {isMobile && (
              <div className="carousel-dots mobile-only">
                {slides.map((_, idx) => (
                  <span
                    key={idx}
                    className={`dot ${idx === current ? 'active' : ''}`}
                    onClick={() => scrollToIndex(idx)}
                  />
                ))}
              </div>
            )}

            <div className="carousel-info">
              <div className="carousel-caption">
                2 &amp; 3 Bedroom townhomes starting from $620,000.
              </div>
              <Button
                className="carousel-button"
                variant="primary"
                size="lg"
                onClick={() => {
                  const el = document.getElementById('collections');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                SEE TOWNHOMES
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Intro;





