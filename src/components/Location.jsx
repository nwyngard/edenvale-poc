import { useRef, useEffect, useState } from 'react';
import './Location.css';
import mapImage from '../assets/map.webp';
import mapImageMobile from '../assets/map_mob.webp';
import { motion, useInView } from 'framer-motion';

const Location = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // catch on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="location-section">
      <div className="location-container">
        <div className="section-intro">
          <h2>Peaceful yet connected.</h2>
          <p className="intro-paragraph">
            {isMobile ? (
              'Tucked away in a leafy corner of Maryborough, with shops, cafes and transport just a step away.'
            ) : (
              <>
                Edenvale is tucked away in a leafy corner of Maryborough, <br />
                with local shops, cafes and public transport just an easy stroll from your doorstep.
              </>
            )}
          </p>
        </div>

        <picture ref={ref}>
          <source srcSet={mapImageMobile} media="(max-width: 768px)" />
          <motion.img
            src={mapImage}
            alt="Map showing Edenvale's location"
            className="location-image"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </picture>
      </div>
    </section>
  );
};

export default Location;




