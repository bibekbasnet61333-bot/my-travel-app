import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronDown,
  CreditCard,
  AlertTriangle,
  Clock,
  HelpCircle,
  Shield,
  Calendar,
  MapPin,
  Star,
  Phone,
  Mail,
  Globe,
  DollarSign,
  Info,
  Image
} from 'lucide-react';
import { parseGradientToStyle } from '../../utils/gradientUtils';

const DestinationKnowBeforeYouGoModal = ({
  isOpen,
  onClose,
  initialTab = 'faq',
  faqs = [],
  policies = {},
  theme = {},
  destinationName = 'Your Destination',
  destinationId,
  galleryImages = []
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [openFAQ, setOpenFAQ] = useState(null);

  // Reset internal state when destination changes to prevent state leakage between pages
  useEffect(() => {
    setActiveTab(initialTab);
    setOpenFAQ(null);
  }, [destinationId, initialTab]);

  // Sync internal activeTab with initialTab when modal opens or initialTab changes
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setOpenFAQ(null);
    }
  }, [initialTab, isOpen]);

  // Default theme if not provided
  const defaultTheme = {
    primaryGradientClass: 'from-amber-600 to-yellow-600',
    secondaryGradientClass: 'from-amber-500 to-yellow-500',
    headingColor: '#78350f',
    accentColor: '#d97706'
  };

  const t = {
    ...defaultTheme,
    ...theme,
    primaryGradientClass: theme.primaryGradientClass || defaultTheme.primaryGradientClass,
    secondaryGradientClass: theme.secondaryGradientClass || defaultTheme.secondaryGradientClass,
    headingColor: theme.headingColor || defaultTheme.headingColor,
    accentColor: theme.accentColor || defaultTheme.accentColor
  };

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const tabs = [
    { id: 'faq', label: 'Frequently Asked Questions', icon: HelpCircle },
    { id: 'policies', label: 'Important Policies', icon: Shield },
  ];

  // Add gallery tab if images are available
  if (galleryImages && galleryImages.length > 0) {
    tabs.push({ id: 'gallery', label: 'Gallery', icon: Image });
  }

  // Parse theme colors for gradients
  const headerGradientStyle = parseGradientToStyle(t.primaryGradientClass);
  const tabActiveStyle = parseGradientToStyle(t.primaryGradientClass);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden relative flex flex-col"
          >
            {/* Gradient Header */}
            <div
              className="p-6 text-white relative overflow-hidden"
              style={headerGradientStyle}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full -ml-10 -mb-10" />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Info className="w-7 h-7 text-white/90" />
                  {destinationName} Travel Guide
                </h2>
                <p className="text-white/80 mt-1 text-sm">Essential information before your journey</p>
              </div>
            </div>

            {/* Company Info Banner */}
            <div className="bg-gradient-to-r from-amber-50 to-stone-50 px-6 py-4 border-b border-amber-100">
              <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
                <div className="flex items-center gap-2 text-stone-700">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span className="font-medium">Gyanashwor-30 Kathmandu, Gita Complex 2nd floor</span>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <a href="mailto:info@sasatravels.com" className="flex items-center gap-2 text-stone-600 hover:text-amber-600 transition">
                    <Mail className="w-4 h-4" />
                    <span>info@sasatravels.com</span>
                  </a>
                  <a href="https://www.sasatravels.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-stone-600 hover:text-amber-600 transition">
                    <Globe className="w-4 h-4" />
                    <span>www.sasatravels.com</span>
                  </a>
                  <div className="flex items-center gap-2 text-stone-600">
                    <Phone className="w-4 h-4" />
                    <span>01-4539333, 01-4539334</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Tabs */}
            <div className="flex gap-2 px-6 py-4 bg-white border-b border-stone-100">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'text-white shadow-lg'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-800'
                  }`}
                  style={activeTab === tab.id ? tabActiveStyle : {}}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="overflow-y-auto flex-1 px-6 py-4" style={{ maxHeight: 'calc(90vh - 280px)' }}>
              {activeTab === 'faq' && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={parseGradientToStyle(t.primaryGradientClass)}
                    >
                      <HelpCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-stone-800">Frequently Asked Questions</h3>
                      <p className="text-stone-500 text-sm">Everything you need to know about your {destinationName} trip</p>
                    </div>
                  </div>
                  {faqs.length > 0 ? (
                    <div className="space-y-3">
                      {faqs.map((faq, idx) => (
                        <motion.div
                          key={idx}
                          initial={false}
                          className="bg-stone-50 rounded-xl overflow-hidden border border-stone-100"
                        >
                          <button
                            className="flex items-center justify-between w-full p-4 text-left font-semibold text-stone-800 hover:bg-stone-100 transition"
                            onClick={() => toggleFAQ(idx)}
                          >
                            <span className="pr-4">{faq.question}</span>
                            <ChevronDown
                              className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${openFAQ === idx ? 'rotate-180' : ''}`}
                              style={{ color: t.accentColor }}
                            />
                          </button>
                          <AnimatePresence>
                            {openFAQ === idx && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4 text-stone-600 leading-relaxed">
                                  {faq.answer}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-stone-500 text-center py-8">No FAQs available for this destination.</p>
                  )}
                </div>
              )}
              {activeTab === 'policies' && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={parseGradientToStyle(t.secondaryGradientClass || t.primaryGradientClass)}
                    >
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-stone-800">Important Policies</h3>
                      <p className="text-stone-500 text-sm">Please read these terms carefully</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Important Notes */}
                    {policies.importantNotes && policies.importantNotes.length > 0 && (
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200">
                        <h4 className="font-bold text-amber-800 flex items-center gap-2 mb-4">
                          <AlertTriangle className="w-5 h-5" />
                          Important Notes
                        </h4>
                        <ul className="space-y-3 text-stone-700">
                          {policies.importantNotes.map((note, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <Star className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
                              <span>{note}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Check-in/out */}
                    {policies.checkInOut && (
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-200">
                        <h4 className="font-bold text-blue-800 flex items-center gap-2 mb-4">
                          <Clock className="w-5 h-5" />
                          Check-in / Check-out
                        </h4>
                        <ul className="space-y-3 text-stone-700">
                          <li className="flex items-start gap-3">
                            <Calendar className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                            <span><strong>Check-in:</strong> {policies.checkInOut.checkin}</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Calendar className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                            <span><strong>Check-out:</strong> {policies.checkInOut.checkout}</span>
                          </li>
                          {policies.checkInOut.note && (
                            <li className="flex items-start gap-3">
                              <Clock className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                              <span>{policies.checkInOut.note}</span>
                            </li>
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Payment Conditions */}
                    {policies.paymentConditions && policies.paymentConditions.length > 0 && (
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-200">
                        <h4 className="font-bold text-green-800 flex items-center gap-2 mb-4">
                          <CreditCard className="w-5 h-5" />
                          Payment Conditions
                        </h4>
                        <ul className="space-y-3 text-stone-700">
                          {policies.paymentConditions.map((condition, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <DollarSign className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                              <span>{condition}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Cancellation Policy */}
                    {policies.cancellation && policies.cancellation.length > 0 && (
                      <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-5 border border-red-200">
                        <h4 className="font-bold text-red-800 flex items-center gap-2 mb-4">
                          <X className="w-5 h-5" />
                          Cancellation Policy
                        </h4>
                        <ul className="space-y-3 text-stone-700">
                          {policies.cancellation.map((rule, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <AlertTriangle className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                              <span>{rule}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Fallback if no policies */}
                    {!policies.importantNotes && !policies.checkInOut && !policies.paymentConditions && !policies.cancellation && (
                      <p className="text-stone-500 text-center py-8">No policies available for this destination.</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
              <span className="text-stone-500 text-sm">SASA TOURS AND TRAVELS PVT LTD</span>
              <span className="text-stone-400 text-sm italic">"Your Dreams, Take Flight."</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DestinationKnowBeforeYouGoModal;

