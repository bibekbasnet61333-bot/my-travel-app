import React from "react";
import { motion } from "framer-motion";
import { HelpCircle } from 'lucide-react';
import { parseGradientToStyle } from '../../utils/gradientUtils';

const DestinationAbout = ({
  title,
  subtitle,
  highlights,
  stats,
  theme,
  onOpenModal
}) => {
  const handleClick = () => {
    if (typeof onOpenModal === 'function') {
      onOpenModal('faq');
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={`py-12 ${theme.backgroundGradient}`}
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-poppins bg-clip-text text-transparent"
            style={{ backgroundImage: theme.titleGradient }}
          >
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Stats & Important Information */}
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Stats Grid */}
            {stats && stats.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.4, type: 'spring' }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    <stat.icon className="w-6 h-6 mx-auto mb-2" style={{ color: theme.accentColor }} />
                    <div className="text-xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Important Information CTA */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-stone-100 text-center">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto"
                  style={parseGradientToStyle(theme.primaryGradientClass)}
                >
                  <HelpCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-4">Important Information</h3>
                <p className="text-stone-600 mb-8">Access detailed policies, FAQs, and essential information for your trip</p>
                <button
                  onClick={handleClick}
                  className="w-full text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  style={parseGradientToStyle(theme.primaryGradientClass)}
                >
                  View Policies & FAQ
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Highlights */}
          {highlights && highlights.length > 0 && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${highlight.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {highlight.icon && (
                        React.createElement(highlight.icon, { className: "w-6 h-6 text-white" })
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{highlight.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{highlight.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default DestinationAbout;

