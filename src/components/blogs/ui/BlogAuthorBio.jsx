

import PropTypes from 'prop-types';

const AUTHOR_BIOS = {
  'Nyoman Sudiana': 'Cultural travel specialist with 15+ years exploring Bali\'s sacred sites and traditions. Born and raised in Ubud, Nyoman has dedicated his career to sharing the spiritual heritage of the Island of the Gods with travelers from around the world.',
  'Li Wei Chen': 'Heritage historian and travel writer specializing in Chinese dynasties and cultural preservation. With a background in archaeology and over a decade of documenting ancient sites, Li Wei brings historical depth to every journey.',
  'Hiroshi Tanaka': 'Cultural journalist and Japan expert with 20+ years of experience covering the intersection of tradition and modernity. Based in Tokyo, Hiroshi has witnessed Japan\'s remarkable transformation while documenting its enduring cultural treasures.',
  'Rajesh Sharma': 'Nepal trekking expert and adventure travel writer. Having completed over 100 Himalayan expeditions, Rajesh shares insider knowledge of Nepal\'s most spectacular trails and hidden cultural gems.',
  'Tenzing Lama': 'Sherpa guide turned travel writer, Tenzing combines deep knowledge of Himalayan mountaineering with a passion for sharing authentic Nepali culture. His stories bridge Western travelers with mountain traditions.',
};

const DEFAULT_BIO = 'Passionate travel writer dedicated to sharing authentic travel experiences and helping readers discover amazing destinations around the world.';

const BlogAuthorBio = ({ author, bio, role = 'Travel Writer' }) => {
  if (!author) {
    return null;
  }

  // Use provided bio, or look up from AUTHOR_BIOS, or fall back to DEFAULT_BIO
  const authorBio = bio || AUTHOR_BIOS[author] || DEFAULT_BIO;

  return (
    <div className="bg-gradient-to-r from-slate-50 to-cyan-50 rounded-2xl p-8 mb-12 border border-cyan-100">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        <div className="flex-shrink-0">
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
            {author.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-2xl font-bold text-slate-800 mb-2">
            About {author}
          </h3>
          <p className="text-cyan-600 font-medium text-sm mb-4">
            {role}
          </p>
          <p className="text-slate-600 leading-relaxed">
            {authorBio}
          </p>
        </div>
      </div>
    </div>
  );
};

BlogAuthorBio.propTypes = {
  author: PropTypes.string.isRequired,
  bio: PropTypes.string,
  role: PropTypes.string,
};

export default BlogAuthorBio;

