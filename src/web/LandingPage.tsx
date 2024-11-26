import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import FunnelModal from "../components/funnel/FunnelModal";
import ErrorBoundary from "../components/ErrorBoundary";
import FeaturesSection from "./FeaturesSection";
import AboutSection from "./AboutSection";
import VideoSection from "./VideoSection";
import Header from "./Header";
import HeroSection from "./HeroSection";
import Footer from "./Footer";
import "./styles.css";

const LandingPage: React.FC = () => {
  const [isFunnelModalOpen, setIsFunnelModalOpen] = useState(false);
  const navigate = useNavigate();

  // Add scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openFunnelModal = () => {
    setIsFunnelModalOpen(true);
  };

  const closeFunnelModal = () => {
    setIsFunnelModalOpen(false);
  };

  return (
    <div className="landing-page noto-sans-hebrew" dir="rtl">
      <Header scrollToSection={scrollToSection} />

      <main>
        <HeroSection openFunnelModal={openFunnelModal} />
        <VideoSection />
        <FeaturesSection />
        <AboutSection />
      </main>

      {isFunnelModalOpen && (
        <FunnelModal step="personal" onClose={closeFunnelModal} />
      )}

      <Footer />
    </div>
  );
};

export default LandingPage;