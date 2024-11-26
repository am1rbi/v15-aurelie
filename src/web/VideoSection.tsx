import React, { useEffect, useRef, useState } from 'react';
import Player from '@vimeo/player';
import { Volume2, VolumeX } from 'lucide-react';

const VideoSection = () => {
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<Player | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    if (!videoWrapperRef.current) return;

    // Initialize Vimeo player with updated options
    const vimeoPlayer = new Player('vimeo-player', {
      id: 1024007323,
      background: true,
      autoplay: false,
      muted: true,
      loop: true,
      responsive: true,
      controls: false,
      autopause: false,
      playsinline: true,
      title: false,
      byline: false,
      portrait: false,
      dnt: true
    });

    setPlayer(vimeoPlayer);

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed) {
            vimeoPlayer.play().catch(console.error);
            setHasPlayed(true);
          }
        });
      },
      {
        threshold: 0.3 // Trigger when 30% of the video is visible
      }
    );

    // Set quality to auto
    vimeoPlayer.setQuality('auto');

    // Start observing the video wrapper
    if (videoWrapperRef.current) {
      observer.observe(videoWrapperRef.current);
    }

    // Cleanup
    return () => {
      observer.disconnect();
      vimeoPlayer.destroy().catch(console.error);
    };
  }, [hasPlayed]);

  const toggleMute = () => {
    if (!player) return;

    if (isMuted) {
      player.setVolume(1);
    } else {
      player.setVolume(0);
    }
    setIsMuted(!isMuted);
  };

  return (
    <section className="video-section">
      <div className="video-wrapper" ref={videoWrapperRef}>
        <div className="video-container">
          <div id="vimeo-player" className="video-player"></div>
        </div>
        <button 
          className="mute-toggle"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      </div>
    </section>
  );
};

export default VideoSection;