import React, { useState, useEffect } from 'react';
import './Collections.css';
import Modal from './Modal';
import Floorplan from './Floorplan';
import Button from './Button';
import FadeInStagger from './FadeInStagger';

import BGPlant1 from '../assets/BG-Plant1.svg';
import BGPlant2 from '../assets/BG-Plant2.svg';

import gardenImg from '../assets/garden-collection.webp';
import terraceImg from '../assets/terrace-collection.webp';

const Collections = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOpenModal = (collectionName) => {
    setModalTitle(`${collectionName} Floor Plan`);
    setShowModal(true);
  };

  return (
    <section className="collections-section">
      <img src={BGPlant1} alt="" className="bg-plant-left" />
      <img src={BGPlant2} alt="" className="bg-plant-right" />

      <div className="collections-content">
        <div className="section-intro">
          <h2>Townhome Collections</h2>
          <p>
            {isMobile ? (
              'Edenvale offers two home styles, each thoughtfully designed with modern materials and functional layouts.'
            ) : (
              <>
                Edenvale offers two distinct home styles, the Garden and Terrace Collections.
                <br />
                Each thoughtfully designed with functional layouts, and a relaxed, modern feel.
              </>
            )}
          </p>
        </div>

        <FadeInStagger className="collections-grid">
          <div
            className="collection-card"
            style={{ backgroundImage: `url(${terraceImg})` }}
          >
            <div className="collection-overlay" />
            <div className="collection-inner">
              <h3 className="collection-title">Terrace Collection</h3>
              <p className="collection-description">
                {isMobile ? (
                  '2 bedroom townhomes with upper level balconies.'
                ) : (
                  <>
                    Light-filled homes with upper-level balconies designed for a low-maintenance lifestyle.
                  </>
                )}
              </p>
              <Button
                className="collection-btn"
                variant="primary"
                size="md"
                onClick={() => handleOpenModal('Terrace Collection')}
              >
                VIEW FLOORPLAN
              </Button>
            </div>
          </div>

          <div
            className="collection-card"
            style={{ backgroundImage: `url(${gardenImg})` }}
          >
            <div className="collection-overlay" />
            <div className="collection-inner">
              <h3 className="collection-title">Garden Collection</h3>
              <p className="collection-description">
                {isMobile ? (
                  '3 bedroom townhomes with private backyards.'
                ) : (
                  <>
                    Spacious two-level homes with private gardens designed for a relaxed outdoor lifestyle.
                  </>
                )}
              </p>
              <Button
                className="collection-btn"
                variant="primary"
                size="md"
                onClick={() => handleOpenModal('Garden Collection')}
              >
                VIEW FLOORPLAN
              </Button>
            </div>
          </div>
        </FadeInStagger>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalTitle}
      >
        <Floorplan />
      </Modal>
    </section>
  );
};

export default Collections;









