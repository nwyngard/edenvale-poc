import React, { useEffect, useState } from 'react';
import './Footer.css';
import { FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import deco from '../assets/deco.svg';

const Footer = () => {
  const year = new Date().getFullYear();
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    let observer = null;

    const setupObserver = () => {
      const shouldObserve = window.innerWidth <= 768 && window.innerHeight <= 700;
      setShowLogo(true); // Always show unless conditions met

      if (!shouldObserve) return;

      const marker = document.getElementById('footer-logo-end-marker');
      if (!marker) return;

      observer = new IntersectionObserver(
        ([entry]) => {
          setShowLogo(!entry.isIntersecting);
        },
        {
          threshold: 1,
          rootMargin: '0px 0px -20px 0px',
        }
      );

      observer.observe(marker);
    };

    setupObserver();

    window.addEventListener('resize', setupObserver);

    return () => {
      window.removeEventListener('resize', setupObserver);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-column">
            <h4>Location</h4>
            <p>
              2 Nightingale Street<br />
              Maryborough, VIC 3465
            </p>
          </div>
          <div className="footer-column">
            <h4>Sales Enquiries</h4>
            <p><a href="tel:6513219440">(03) 9555 5555</a></p>
          </div>
          <div className="footer-column">
            <h4>Management Contact</h4>
            <p><a href="tel:6128863484">(03) 9000 0000</a></p>
          </div>

          <div className="footer-logo-column">
            {showLogo && (
              <div className="footer-logo-wrapper">
                <div className="footer-logo">EDENVALE</div>
                <div className="footer-subtext-container">
                  <img src={deco} alt="" className="logo-deco" />
                  <span className="footer-subtext">PARKSIDE LIVING</span>
                  <img src={deco} alt="" className="logo-deco flipped" />
                </div>
              </div>
            )}

            <div className="social-icons">
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>
        <p className="copyright">© {year} Edenvale. All rights reserved.</p>
      </div>

      {/* Marker div used for IntersectionObserver */}
      <div id="footer-logo-end-marker" style={{ height: '1px' }}></div>
    </footer>
  );
};

export default Footer;



