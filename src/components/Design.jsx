import React from 'react';
import './Design.css';
import designImage from '../assets/parkside.webp';
import FadeUpOnce from './FadeUpOnce';

const Design = () => (
  <section
    className="design-section"
    style={{ backgroundImage: `url(${designImage})` }}
  >
    <div className="design-overlay">
      <FadeUpOnce>
      <div className="design-grid">
        <h2 className="design-heading">Modern Parkside Living</h2>
        <p className="design-text">
          When it comes to outdoor living, Edenvale offers a fresh approach to townhome design in Australia.
          Blurring the lines between indoors and out, the concept reimagines the traditional ‘garden home’ by integrating generous green spaces directly into the living environment.
          Here, residents can enjoy a seamless connection to nature, with Maryborough’s leafy parks and gardens flowing effortlessly into their own private lawns,
          creating open, expansive areas to relax, play, and experience nature in all directions.
        </p>
      </div>
      </FadeUpOnce>
    </div>
  </section>
);

export default Design;





