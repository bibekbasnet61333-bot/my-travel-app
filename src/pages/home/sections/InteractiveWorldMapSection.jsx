import { memo, useState } from 'react';
import { interactiveMapDestinations } from '../../../data/home/interactiveMapDestinations';
import homeMapImage from '../../../assets/home/home-1.avif';

const InteractiveWorldMapSection = memo(() => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const regionGradients = {
    Beach: 'from-sky-400 to-emerald-400',
    Mountain: 'from-violet-400 to-purple-400',
    City: 'from-emerald-400 to-teal-400',
    Historical: 'from-amber-400 to-orange-400',
    Nature: 'from-amber-400 to-orange-400',
    Island: 'from-violet-400 to-purple-400'
  };

  const allDestinations = interactiveMapDestinations.map(dest => ({
    name: dest.name,
    region: dest.category,
    position: { top: `${dest.coordinates.y}%`, left: `${dest.coordinates.x}%` },
    gradient: regionGradients[dest.category] || 'from-sky-400 to-emerald-400'
  }));

  return (
    <section className="relative py-10 sm:py-14 px-4 sm:px-6 bg-gradient-to-b from-slate-100 via-blue-50 to-emerald-50">

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#0f4c5c] mb-3">
            Explore Countries With Us
          </h2>
          <p className="text-[#334e68] text-sm sm:text-lg max-w-2xl mx-auto font-medium">
            Discover breathtaking destinations across the globe, from majestic mountains to pristine beaches
          </p>
        </div>

        <div className="relative mb-8">
          <div className="bg-white/80 backdrop-blur-2xl rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-lg">
            <div className="relative h-[300px] sm:h-[400px] lg:h-[450px] rounded-xl overflow-hidden border border-slate-200 group">
              {!imageError && (
                <img
                  src={homeMapImage}
                  alt="World map destinations visualization"
                  width="1200"
                  height="600"
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
                <div className="absolute inset-0 bg-gradient-to-br from-slate-200/40 to-slate-300/60 animate-pulse" />
              )}

              <div className={`absolute inset-0 transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-slate-900/10 to-slate-900/20" />
              </div>

              <div className="absolute inset-0 p-4 sm:p-6">
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
                        className={`w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r ${destination.gradient} rounded-full cursor-pointer transform hover:scale-150 transition-all duration-300 shadow-lg ring-2 ring-white/60`}
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
                className={`absolute top-3 left-3 bg-white/90 backdrop-blur-xl rounded-lg px-3 py-1.5 border border-slate-200 shadow-md transition-all duration-700 ${
                  imageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                }`}
              >
                <div className="text-[#0f4c5c] font-bold text-sm">Global Destinations</div>
                <div className="text-slate-500 text-xs">
                  {allDestinations.length} countries
                </div>
              </div>

              <div className="absolute bottom-3 right-3">
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/80 backdrop-blur-lg rounded-full border border-slate-200">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-[#334e68] text-xs font-medium">Interactive Map</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 lg:gap-4">
          {allDestinations.map((destination, index) => (
            <div
              key={destination.name}
              className={`group bg-white/80 backdrop-blur-xl rounded-xl p-3 sm:p-4 hover:bg-white transition-all duration-500 border border-slate-200 hover:border-slate-300 cursor-pointer transform hover:scale-105 hover:-translate-y-1 shadow-md ${
                imageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r ${destination.gradient} rounded-lg flex items-center justify-center mb-2 sm:mb-3 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-sm sm:text-lg">📍</span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[#334e68] mb-0.5 sm:mb-1">
                {destination.name}
              </h3>
              <p className="text-slate-400 text-[10px] sm:text-xs">
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

