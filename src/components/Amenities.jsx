import './Amenities.css';
import { useState, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';
import FadeInStagger from './FadeInStagger';

import BBQIcon from '../assets/BBQ.svg';
import GymIcon from '../assets/Gym.svg';
import ParkIcon from '../assets/Park.svg';
import PlaygroundIcon from '../assets/Playground.svg';
import PoolIcon from '../assets/Pool.svg';
import TerraceIcon from '../assets/Terrace.svg';

import BBQIconMob from '../assets/BBQ_mob.svg';
import GymIconMob from '../assets/Gym_mob.svg';
import ParkIconMob from '../assets/Park_mob.svg';
import PlaygroundIconMob from '../assets/Playground_mob.svg';
import PoolIconMob from '../assets/Pool_mob.svg';
import TerraceIconMob from '../assets/Terrace_mob.svg';

import BBQBg from '../assets/BBQ.webp';
import GymBg from '../assets/gym.webp';
import ParkBg from '../assets/parkaccess.webp';
import PlaygroundBg from '../assets/playground.webp';
import PoolBg from '../assets/pool.webp';
import TerraceBg from '../assets/terrace.webp';

const Amenities = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(null); // For touch support

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const amenities = [
    { icon: isMobile ? BBQIconMob : BBQIcon, label: 'BBQ Area', image: BBQBg, description: 'Enjoy relaxed outdoor dining in the BBQ area, designed for easy entertaining.' },
    { icon: isMobile ? GymIconMob : GymIcon, label: 'Gym', image: GymBg, description: 'Stay active in the private residents’ gym, featuring state of the art equipment.' },
    { icon: isMobile ? ParkIconMob : ParkIcon, label: 'Park Access', image: ParkBg, description: 'Step straight into nature with direct access to Maryborough’s scenic parklands.' },
    { icon: isMobile ? PlaygroundIconMob : PlaygroundIcon, label: 'Playground', image: PlaygroundBg, description: 'Let the kids run free in a secure, modern playground.' },
    { icon: isMobile ? PoolIconMob : PoolIcon, label: 'Pool', image: PoolBg, description: 'Cool off in the serene residents-only pool retreat.' },
    { icon: isMobile ? TerraceIconMob : TerraceIcon, label: 'Terrace', image: TerraceBg, description: 'Unwind in the terrace, perfect for quiet reflection.' },
  ];

  return (
    <section className="amenities-section">
      <div className="amenities-content">
        <div className="section-intro">
          <h2>Resort-style Amenities</h2>
          <p>
            {isMobile
              ? 'A range of functional facilities enhance everyday comfort and leisure.'
              : (
                <>
                  Beautifully landscaped grounds and communal spaces <br />
                  offer a range of functional facilities that enhance everyday comfort and leisure.
                </>
              )}
          </p>
        </div>

        {isMobile ? (
          <div className="amenities-mobile-scroll">
            {amenities.map((item, idx) => (
              <div key={idx} className="amenity-card">
                <img src={item.image} alt={item.label} className="amenity-image" />
                <div className="amenity-content">
                  <div className="amenity-title-row">
                    <img src={item.icon} alt="" className="amenity-icon" />
                    <h3>{item.label}</h3>
                  </div>
                  <p className="card-text">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <FadeInStagger className="amenities-items">
            {amenities.map((item, idx) => {
              const isTouched = selectedIdx === idx;

              return (
                <div
                  key={idx}
                  className={`amenities-item ${isTouched ? 'touched' : ''}`}
                  style={{ backgroundImage: `url(${item.image})` }}
                  onClick={() => setSelectedIdx(idx === selectedIdx ? null : idx)}
                  onTouchStart={() => setSelectedIdx(idx === selectedIdx ? null : idx)}
                >
                  <div className="amenities-item-overlay" />
                  <Motion.div
                    className="amenities-inner"
                    initial={{ height: '80px' }}
                    animate={{ height: isTouched ? '100%' : '80px' }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="amenities-info-row">
                      <img src={item.icon} alt={item.label} className="amenities-item__icon" />
                      <span className="card-label"><h3>{item.label}</h3></span>
                    </div>
                    <p className="amenities-item__details">{item.description}</p>
                  </Motion.div>
                </div>
              );
            })}
          </FadeInStagger>
        )}
      </div>
    </section>
  );
};

export default Amenities;




