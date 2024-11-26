import React from 'react';

const SocialProofSection: React.FC = () => {
  const avatars = [
    {
      src: "https://i.imghippo.com/files/zjJ4446QM.jpeg",
      alt: "Young woman with brown hair",
    },
    {
      src: "https://i.imghippo.com/files/TKja8547Ipo.jpeg",
      alt: "Middle-aged man with glasses",
    },
    {
      src: "https://i.imghippo.com/files/wqJy9085EHA.jpeg",
      alt: "Woman with blonde hair",
    },
    {
      src: "https://i.imghippo.com/files/uBPV1687bJo.jpeg",
      alt: "Man with dark hair",
    },
    {
      src: "https://i.imghippo.com/files/OIEL5712Fc.jpeg",
      alt: "Woman with red hair",
    }
  ];

  return (
    <div className="social-proof">
      <div className="avatars">
        {avatars.map((avatar, index) => (
          <img 
            key={index}
            src={avatar.src}
            alt={avatar.alt}
            className="avatar"
            style={{ 
              zIndex: 10 + index,
              objectFit: 'cover',
              objectPosition: 'center 20%'
            }}
          />
        ))}
      </div>
      <div className="social-proof-content">
        <div className="stars">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className="star"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="customers-text">אלפי לקוחות מרוצים</span>
      </div>
    </div>
  );
};

export default SocialProofSection;