import PropTypes from 'prop-types';

const AUTHOR_BIOS = {
  'Nyoman Sudiana': 'Cultural travel specialist with 15+ years exploring Bali\'s sacred sites and traditions.',
  'Li Wei Chen': 'Heritage historian and travel writer specializing in Chinese dynasties and cultural preservation.',
  'Hiroshi Tanaka': 'Cultural journalist and Japan expert with 20+ years covering tradition and modernity.',
  'Rajesh Sharma': 'Nepal trekking expert and adventure travel writer with over 100 Himalayan expeditions.',
  'Tenzing Lama': 'Sherpa guide turned travel writer, bridging Western travelers with mountain traditions.',
};

const DEFAULT_BIO = 'Passionate travel writer dedicated to sharing authentic travel experiences worldwide.';

const BlogAuthorBio = ({ author, bio, role = 'Travel Writer' }) => {
  if (!author) {
    return null;
  }

  const authorBio = bio || AUTHOR_BIOS[author] || DEFAULT_BIO;

  return (
    <div className="bg-gradient-to-r from-slate-50 to-cyan-50 rounded-xl p-4 md:p-6 lg:p-8 mb-8 md:mb-10 border border-cyan-100">
      <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-start md:items-center">
        <div className="flex-shrink-0">
          <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl md:text-2xl shadow-lg">
            {author.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-1">
            About {author}
          </h3>
          <p className="text-cyan-600 font-medium text-xs md:text-sm mb-2 md:mb-3">
            {role}
          </p>
          <p className="text-slate-600 leading-relaxed text-sm md:text-base line-clamp-3">
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

