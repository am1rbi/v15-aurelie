import React from 'react';
import { motion } from 'framer-motion';
import SocialProofSection from './SocialProofSection';
import TextCarousel from './TextCarousel';

interface HeroSectionProps {
  openFunnelModal: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ openFunnelModal }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    openFunnelModal();
  };

  return (
    <section className="hero-section">
      <div className="content-section">
        <div className="text-content">
          <div className="hero-title-container">
            <motion.h1 
              className="main-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              יש דרך חדשה לרכוש
            </motion.h1>
            <div className="carousel-container">
              <TextCarousel />
            </div>
          </div>
          
          <motion.p 
            className="text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            dir="rtl"
          >
            <span className="whitespace-normal md:whitespace-nowrap inline-block">
              כמה קליקים והצוות שלנו יתחיל לחפש את התכשיט המושלם, המותאם והמדויק עבורכם.
            </span>
            <br />
            תחסכו זמן, אנרגיה וכסף - ללא עלות או התחייבות.
          </motion.p>

          <motion.div 
            className="cta-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button 
              className="continue-button"
              onClick={handleClick}
              type="button"
              aria-label="התחל עכשיו"
            >
              לחצו כאן כדי להתחיל
            </button>
          </motion.div>

          <SocialProofSection />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;