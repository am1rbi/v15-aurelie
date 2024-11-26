import React, { useState, useEffect } from 'react';

const TextCarousel: React.FC = () => {
  const words = ["טבעות יהלומים", "טבעות אירוסין", "שרשרת זהב", "צמיד זהב", "צמיד טניס"];
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const typeSpeed = isDeleting ? 75 : 150;
    const currentWord = words[wordIndex];
    
    const tick = () => {
      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), 1500);
        return;
      }
      
      if (isDeleting && text === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
        return;
      }
      
      const newText = isDeleting 
        ? currentWord.substring(0, text.length - 1)
        : currentWord.substring(0, text.length + 1);
        
      setText(newText);
    };

    const timer = setTimeout(tick, typeSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex]);

  return (
    <span className="carousel-text">
      {text}
      <span className="cursor">|</span>
    </span>
  );
};

export default TextCarousel;