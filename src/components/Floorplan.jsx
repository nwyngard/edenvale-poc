import React, { useState, useRef, useEffect } from 'react';
import './Floorplan.css';
import floorplanImg from '../assets/floorplan.png';
import floorplanMobImg from '../assets/floorplan_mob.png';

const hotspots = [
  { id: 'garage', label: 'Garage', info: 'Secure double garage with internal home entry.', size: '6.0 x 5.5m', top: '29.68%', left: '11.25%' },
  { id: 'foyer', label: 'Foyer', info: 'Welcoming entrance with immediate access to key living zones.', size: '2.5 x 2.0m', top: '77.92%', left: '11.25%' },
  { id: 'livingroom', label: 'Living Room & Dining', info: 'The central living space connects to the kitchen and patio.', size: '5.0 x 6.5m', top: '60.00%', left: '35.00%' },
  { id: 'bathroom', label: 'Bathroom', info: 'Modern bathroom with sleek finishes and functional layout.', size: '2.8 x 2.2m', top: '22.26%', left: '55.00%' },
  { id: 'bedroom', label: 'Bedroom', info: 'Spacious bedrooms designed for comfort and privacy.', size: '4.0 x 3.5m', top: '22.26%', left: '68.00%' },
  { id: 'laundry', label: 'Laundry', info: 'Practical laundry room with external access and storage.', size: '2.5 x 1.8m', top: '22.26%', left: '82.00%' },
  { id: 'patio', label: 'Patio', info: 'Outdoor alfresco area for entertaining or relaxing.', size: '4.5 x 3.0m', top: '22.26%', left: '93.50%' },
  { id: 'kitchen', label: 'Kitchen', info: 'The kitchen features ample bench space, modern appliances, and natural light.', size: '4.0 x 3.0m', top: '74.21%', left: '55.00%' },
  { id: 'office', label: 'Office', info: 'A quiet, dedicated workspace perfect for remote work or study.', size: '3.0 x 2.8m', top: '74.21%', left: '72.00%' },
  { id: 'rumpus', label: 'Rumpus', info: 'A flexible retreat for kids, games, or a second living zone.', size: '4.2 x 4.0m', top: '55.66%', left: '82.50%' }
];

const Floorplan = () => {
  const wrapperRef = useRef(null);
  const [active, setActive] = useState(null);
  const [coords, setCoords] = useState(null);
  const [hoveredLabel, setHoveredLabel] = useState(false);
  const [hoveredTooltip, setHoveredTooltip] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!hoveredLabel && !hoveredTooltip) {
      const timer = setTimeout(() => {
        setActive(null);
        setCoords(null);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [hoveredLabel, hoveredTooltip]);

  const calculatePosition = (element) => {
    const wrapper = wrapperRef.current;
    const wrapperRect = wrapper.getBoundingClientRect();
    const labelRect = element.getBoundingClientRect();

    const panelWidth = 240;
    const padding = 10;

    let left = labelRect.left - wrapperRect.left + labelRect.width / 2;
    const minLeft = panelWidth / 2 + padding;
    const maxLeft = wrapper.offsetWidth - panelWidth / 2 - padding;

    if (left < minLeft) left = minLeft;
    if (left > maxLeft) left = maxLeft;

    const top = labelRect.top - wrapperRect.top - 70;

    return { top, left };
  };

  const handleEnter = (hotspot, e) => {
    setHoveredLabel(true);
    const position = calculatePosition(e.currentTarget);
    setCoords(position);
    setActive(hotspot);
  };

  const handleLeave = () => {
    setHoveredLabel(false);
  };

  const handleTooltipEnter = () => {
    setHoveredTooltip(true);
  };

  const handleTooltipLeave = () => {
    setHoveredTooltip(false);
  };

  return (
    <div className="floorplan-wrapper" ref={wrapperRef}>
      {isMobile ? (
        <div className="floorplan-mobile-container">
          <img
            src={floorplanMobImg}
            alt="Floorplan Mobile"
            className="floorplan-mobile-image"
          />
        </div>
      ) : (
        <>
          <img src={floorplanImg} alt="Floorplan" className="floorplan-image" />

          {hotspots.map(h => (
            <div
              key={h.id}
              className="label-hotspot"
              style={{ top: h.top, left: h.left }}
              onMouseEnter={(e) => handleEnter(h, e)}
              onMouseLeave={handleLeave}
              onClick={(e) => {
                e.stopPropagation();
                const position = calculatePosition(e.currentTarget);
                setCoords(position);
                setActive(h);
              }}
            >
              <span>{h.label}</span>
            </div>
          ))}

          {active && coords && (
            <div
              className="info-panel"
              style={{
                top: `${coords.top}px`,
                left: `${coords.left}px`,
                transform: 'translate(-50%, 0)'
              }}
              onMouseEnter={handleTooltipEnter}
              onMouseLeave={handleTooltipLeave}
            >
              <h3>{active.label}</h3>
              <div className="info-size">{active.size}</div>
              <p className="no-hyphens">{active.info}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Floorplan;







