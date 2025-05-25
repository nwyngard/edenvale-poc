import { useState, useEffect } from 'react';
import './Features.css';
import featuresImg from '../assets/featurehouse.webp';
import FadeInStagger from './FadeInStagger';

import PetIcon from '../assets/Pet.svg';
import SecurityIcon from '../assets/Security.svg';
import SpaceIcon from '../assets/Space.svg';
import SoundproofIcon from '../assets/Soundproof.svg';

const fullFeatures = [
  {
    title: 'Pet Friendly',
    description: 'Enclosed courtyards and durable materials designed for comfortable living with pets.',
    icon: PetIcon
  },
  {
    title: 'Expansive Spaces',
    description: 'Open-plan interiors and generous outdoor areas offer space to unwind and entertain.',
    icon: SpaceIcon
  },
  {
    title: 'Soundproof Living',
    description: 'Enjoy peace and quiet with sound-insulated walls for extra comfort and privacy.',
    icon: SoundproofIcon
  },
  {
    title: 'Secure & Private',
    description: 'On-site CCTV and smart surveillance ensure peace of mind day and night.',
    icon: SecurityIcon
  }
];

const shortFeatures = [
  {
    title: 'Pet Friendly',
    description: 'Enclosed courtyards and durable materials.',
    icon: PetIcon
  },
  {
    title: 'Expansive Spaces',
    description: 'Open-plan interiors and generous outdoor areas.',
    icon: SpaceIcon
  },
  {
    title: 'Soundproof Living',
    description: 'Enjoy peace and quiet with sound-insulated walls.',
    icon: SoundproofIcon
  },
  {
    title: 'Secure & Private',
    description: 'On-site CCTV and smart surveillance.',
    icon: SecurityIcon
  }
];

const Features = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [features, setFeatures] = useState(isMobile ? shortFeatures : fullFeatures);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setFeatures(mobile ? shortFeatures : fullFeatures);
    };

    handleResize(); // set on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className='features-section'>
      <div className='features-column-left'>
        <div className='features-content'>
          <h2>{isMobile ? 'Lifestyle Conveniences' : 'Thoughtfully Designed Features'}</h2>
          <p className='features-subtext'>
            {isMobile
              ? 'Edenvale reimagines townhome living, offering modern conveniences for a relaxed and comfortable lifestyle.'
              : 'Edenvale reimagines townhome living, offering space, comfort, and privacy for a relaxed lifestyle where every essential is considered.'}
          </p>
          <FadeInStagger className="features-grid">
            {features.map((feature, index) => (
              <div className="feature-card" key={index}>
                <img src={feature.icon} alt={feature.title} className="feature-icon-svg" />
                <div className="feature-text">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </div>
            ))}
          </FadeInStagger>
        </div>
      </div>
      <div className='features-image'>
        <img src={featuresImg} alt='Feature' className='features-image-tag' />
      </div>
    </section>
  );
};

export default Features;
