import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const AboutSection = () => {
  return (
    <section id="about">
      <div className="about-container">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="about-header"
        >
          <motion.h2 variants={fadeInUp}>אודות</motion.h2>
          <motion.div variants={fadeInUp} className="about-divider" />
        </motion.div>

        <div className="about-grid">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="about-card"
          >
            <div className="about-icon-wrapper">
              <span className="about-icon">💎</span>
            </div>
            <h3>המומחיות שלנו</h3>
            <p>
              אנו מתמחים באיתור והתאמה אישית של תכשיטים.
              הצוות המקצועי שלנו, הכולל מומחים בתחום התכשיטנות והיהלומים, עובד
             במסירות כדי להביא לכם את הפריטים המדוייקים ביותר עבורכם
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="about-card"
          >
            <div className="about-icon-wrapper">
              <span className="about-icon">✨</span>
            </div>
            <h3>הגישה שלנו</h3>
            <p>
              אנו מאמינים שכל לקוח ייחודי, ולכן מקדישים תשומת לב מיוחדת
              להבנת הצרכים והרצונות האישיים של כל אחד. השירות שלנו מותאם אישית,
              מקצועי ודיסקרטי
            </p>
          </motion.div>
        </div>

        {/* <div className="stats-grid">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="stat-card"
          >
            <span className="stat-number">25+</span>
            <span className="stat-label">שנות ניסיון</span>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="stat-card"
          >
            <span className="stat-number">1000+</span>
            <span className="stat-label">לקוחות מרוצים</span>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="stat-card"
          >
            <span className="stat-number">100%</span>
            <span className="stat-label">שביעות רצון</span>
          </motion.div>
        </div> */}
      </div>
    </section>
  );
};

export default AboutSection;