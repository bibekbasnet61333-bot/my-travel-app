

import { memo, useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { videos } from '../../../data/about/aboutData';
import { SOCIAL_LINKS } from '../../../constants';

const VideoShowcaseSection = memo(() => {
  const videoRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleGalleryClick = (e) => {
    e.preventDefault();
    navigate('/gallery');
  };

  const handleStoriesClick = (e) => {
    e.preventDefault();
    window.open(SOCIAL_LINKS.FACEBOOK_STORIES, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        autoPlay={isInView}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        poster="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop&fm=webp"
      >
        {isInView && (
          <source src={videos[0]?.src} type="video/mp4" />
        )}
      </video>

      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-sky-900/60 to-emerald-900/70" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-slate-100 via-sky-200 to-emerald-200 bg-clip-text text-transparent block drop-shadow-lg">
          Experience the World
        </h2>

        <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-300 via-amber-300 to-sky-300 bg-clip-text text-transparent block drop-shadow-lg">
          Through Our Lens
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            onClick={handleGalleryClick}
            className="inline-block px-8 py-4 bg-gradient-to-r from-sky-600/90 to-emerald-600/90 backdrop-blur-lg rounded-full text-white text-base font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
          >
            Explore Our Gallery
          </button>
          <button
            onClick={handleStoriesClick}
            className="inline-block px-8 py-4 border-2 border-slate-300/40 hover:border-slate-200/60 rounded-full text-slate-200 text-base font-semibold hover:bg-slate-200/10 hover:text-white transition-all duration-300 backdrop-blur-sm cursor-pointer"
          >
            Watch Stories
          </button>
        </div>
      </div>

      <div
        onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-3xl text-slate-400 hover:text-slate-200 animate-bounce cursor-pointer transition-colors duration-300"
      >
        ↓
      </div>
    </section>
  );
});

VideoShowcaseSection.displayName = 'VideoShowcaseSection';

export default VideoShowcaseSection;
