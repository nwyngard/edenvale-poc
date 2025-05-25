import { useEffect, useState } from 'react';
import FadeInSection from './components/FadeInSection';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Design from './components/Design';
import Collections from './components/Collections';
import Amenities from './components/Amenities';
import Features from './components/Features';
import Location from './components/Location';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileWidth = window.innerWidth <= 768;
      const isMobileHeight = window.innerHeight <= 500;
      setIsMobile(isMobileWidth || isMobileHeight);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <span id="home" className="anchor-spacer" />
        <Hero />
        <FadeInSection id="intro"><Intro /></FadeInSection>
        {!isMobile && <Design />}
        <FadeInSection id="amenities"><Amenities /></FadeInSection>
        <FadeInSection id="features"><Features /></FadeInSection>
        <FadeInSection id="collections"><Collections /></FadeInSection>
        <FadeInSection id="location"><Location /></FadeInSection>
        <FadeInSection id="contact"><Contact /></FadeInSection>
        <Footer />
      </main>
    </>
  );
}

export default App;




