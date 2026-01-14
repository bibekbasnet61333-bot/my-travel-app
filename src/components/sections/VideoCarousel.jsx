
import { useRef, useCallback, useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';

const DEFAULT_INTERVAL = 7000; // 7 seconds

// Video controls hook
function useVideoControls(videos, interval) {
  const videoRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const intervalRef = useRef(null);

  const navigate = useCallback((direction) => {
    setCurrentIndex((prev) => {
      if (direction === 'next') {
        return prev === videos.length - 1 ? 0 : prev + 1;
      }
      return prev === 0 ? videos.length - 1 : prev - 1;
    });
  }, [videos.length]);

  const goToIndex = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  // Handle video play/pause based on state and index changes
  useEffect(() => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.play().catch(() => {
        // If autoplay fails, try muted
        setIsMuted(true);
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        }
      });
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying, currentIndex]);

  // Handle mute toggle
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Auto-switch videos every 7 seconds
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        navigate('next');
      }, interval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, interval, navigate]);

  // Handle video loaded
  const handleVideoLoaded = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return {
    currentIndex,
    isMuted,
    isPlaying,
    isLoaded,
    videoRef,
    togglePlay,
    navigate,
    goToIndex,
    setIsMuted,
    handleVideoLoaded,
  };
}

// Navigation Button Component
function NavButton({ onClick, ariaLabel, children }) {
  return (
    <button
      onClick={onClick}
      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-all duration-300 cursor-pointer active:scale-95"
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

NavButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

// Video Indicators Component
function VideoIndicators({ total, currentIndex, onSelect }) {
  return (
    <div className="flex gap-2 mt-4" role="tablist" aria-label="Video slides">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
            i === currentIndex ? 'w-8 bg-white' : 'w-4 bg-white/50 hover:bg-white/70'
          }`}
          role="tab"
          aria-selected={i === currentIndex}
          aria-label={`Go to video ${i + 1}`}
        />
      ))}
    </div>
  );
}

VideoIndicators.propTypes = {
  total: PropTypes.number.isRequired,
  currentIndex: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

function VideoCarousel({ videos, interval = DEFAULT_INTERVAL }) {
  const {
    currentIndex,
    isMuted,
    isPlaying,
    isLoaded,
    videoRef,
    togglePlay,
    navigate,
    goToIndex,
    setIsMuted,
    handleVideoLoaded,
  } = useVideoControls(videos, interval);

  const handlePrev = useCallback(() => navigate('prev'), [navigate]);
  const handleNext = useCallback(() => navigate('next'), [navigate]);
  const handleMute = useCallback(() => setIsMuted(!isMuted), [setIsMuted, isMuted]);

  const videoSrc = useMemo(() => videos[currentIndex]?.src, [videos, currentIndex]);
  const videoTitle = useMemo(() => videos[currentIndex]?.title || '', [videos, currentIndex]);

  return (
    <section className="relative w-full h-[55vh] md:h-[60vh] lg:h-[70vh] overflow-hidden bg-gray-900" aria-label="Video carousel">
      {/* Video Background */}
      {videoSrc && (
        <video
          ref={videoRef}
          key={videoSrc} // Force re-render on video change for smooth playback
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-70' : 'opacity-0'
          }`}
          muted={isMuted}
          loop
          playsInline
          preload="auto"
          onLoadedData={handleVideoLoaded}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 w-full h-full bg-gray-800 animate-pulse" />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-center">
          About SASA Tourism
        </h1>
        <p className="text-lg md:text-xl text-center max-w-2xl opacity-90">
          {videoTitle}
        </p>

        {/* Controls */}
        <div className="flex items-center gap-3 mt-6" role="group" aria-label="Video controls">
          <NavButton onClick={handlePrev} ariaLabel="Previous video">
            <ChevronLeft className="w-5 h-5" />
          </NavButton>

          <button
            onClick={togglePlay}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300 cursor-pointer active:scale-95"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </button>

          <button
            onClick={handleMute}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-all duration-300 cursor-pointer active:scale-95"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>

          <NavButton onClick={handleNext} ariaLabel="Next video">
            <ChevronRight className="w-5 h-5" />
          </NavButton>
        </div>

        {/* Indicators */}
        <VideoIndicators
          total={videos.length}
          currentIndex={currentIndex}
          onSelect={goToIndex}
        />
      </div>
    </section>
  );
}

VideoCarousel.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  interval: PropTypes.number,
};

export default VideoCarousel;

