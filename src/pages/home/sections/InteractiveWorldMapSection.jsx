import React, { memo, useMemo, useState } from 'react';
import { interactiveMapDestinations } from '../../../data/home/interactiveMapDestinations';
import ParticleBackground from '../../../components/animations/ParticleBackground';
import homeMapImage from '../../../assets/home/home-1.avif';

const InteractiveWorldMapSection = memo(() => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const allDestinations = useMemo(() => {
    const regionGradients = {
      Beach: 'from-sky-400 to-emerald-400',
      Mountain: 'from-violet-400 to-purple-400',
      City: 'from-emerald-400 to-teal-400',
      Historical: 'from-amber-400 to-orange-400',
      Nature: 'from-amber-400 to-orange-400',
      Island: 'from-violet-400 to-purple-400'
    };

    return interactiveMapDestinations.map(dest => ({
      name: dest.name,
      region: dest.category,
      position: { top: `${dest.coordinates.y}%`, left: `${dest.coordinates.x}%` },
      gradient: regionGradients[dest.category] || 'from-sky-400 to-emerald-400'
    }));
  }, []);

  return (
    <section className="relative py-16 lg:py-20 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-gray-900/50 to-black/50">
      <ParticleBackground className="opacity-30" />

      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-r from-sky-500/15 to-emerald-500/15 rounded-full blur-2xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-r from-violet-500/15 to-purple-500/15 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-10 lg:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg mb-4">
            Explore Countries With Us
          </h2>
          <p className="text-gray-200 text-base sm:text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
            Discover breathtaking destinations across the globe, from majestic mountains to pristine beaches
          </p>
        </div>

        <div className="relative mb-10 lg:mb-12">
          <div className="bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-4 sm:p-6 lg:p-8 border border-slate-700/50 shadow-2xl">
            <div className="relative h-[400px] sm:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden border border-slate-600/30 group">
              {!imageError && (
                <img
                  src={homeMapImage}
                  alt="World map destinations visualization"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading="lazy"
                  decoding="async"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              )}

              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800/40 to-slate-900/60 animate-pulse" />
              )}

              <div className={`absolute inset-0 transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-900/40 to-slate-900/70" />
              </div>

              <div className="absolute inset-0 p-6 sm:p-8">
                {allDestinations.map((destination, index) => (
                  <div
                    key={destination.name}
                    className={`absolute transform transition-all duration-500 ${
                      imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                    }`}
                    style={{
                      top: destination.position.top,
                      left: destination.position.left,
                      transitionDelay: `${index * 100}ms`
                    }}
                  >
                    <div className="relative">
                      <div
                        className={`w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r ${destination.gradient} rounded-full cursor-pointer transform hover:scale-150 transition-all duration-300 shadow-lg ring-2 ring-white/20`}
                      />
                      <div
                        className="absolute inset-0 bg-white/40 rounded-full animate-ping"
                        style={{ animationDelay: `${index * 0.15}s` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div
                className={`absolute top-4 left-4 bg-black/70 backdrop-blur-xl rounded-xl px-4 py-2.5 border border-white/15 shadow-xl transition-all duration-700 ${
                  imageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                }`}
              >
                <div className="text-white font-bold text-lg">Global Destinations</div>
                <div className="text-slate-300 text-sm">
                  {allDestinations.length} countries
                </div>
              </div>

              <div className="absolute bottom-4 right-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-lg rounded-full border border-white/10">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-white text-xs font-medium">Interactive Map</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-5">
          {allDestinations.map((destination, index) => (
            <div
              key={destination.name}
              className={`group bg-slate-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:bg-slate-700/70 transition-all duration-500 border border-slate-600/40 hover:border-slate-400/60 cursor-pointer transform hover:scale-105 hover:-translate-y-1 sm:hover:-translate-y-2 shadow-xl ${
                imageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${destination.gradient} rounded-xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-lg sm:text-xl">📍</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                {destination.name}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm">
                {destination.region}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

InteractiveWorldMapSection.displayName = 'InteractiveWorldMapSection';

export default InteractiveWorldMapSection;

