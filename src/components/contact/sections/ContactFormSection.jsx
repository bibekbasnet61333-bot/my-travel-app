import { memo } from 'react';
import PropTypes from 'prop-types';
import FormInput from '../form/FormInput';
import FormSelect from '../form/FormSelect';
import FormTextarea from '../form/FormTextarea';
import { DESTINATIONS, FORM_VALIDATION } from '../../../constants';
import { getIcon } from '../../ui/Icons';

const ContactFormSection = memo(function ContactFormSection({
  formData,
  errors,
  isSubmitting,
  submitSuccess,
  handleChange,
  handleSubmit,
}) {
  return (
    <section id="contact-form" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Send Us a Message
            </h2>
            <p className="text-gray-600 text-lg">
              Fill out the form below and we&apos;ll get back to you within 2 hours
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            {submitSuccess && (
              <div
                className="mb-8 p-6 bg-green-50 border-2 border-green-500 rounded-2xl flex items-center gap-4 animate-fade-in"
                role="status"
                aria-live="polite"
              >
                {getIcon('CheckCircle', 'w-8 h-8 text-green-500 flex-shrink-0')}
                <div>
                  <h3 className="text-green-800 font-semibold text-lg">
                    Thank you for contacting us!
                  </h3>
                  <p className="text-green-700">
                    We&apos;ve received your message and will respond within 2 hours.
                  </p>
                </div>
              </div>
            )}

            {errors.submit && (
              <div
                className="mb-6 p-4 bg-red-50 border-2 border-red-500 rounded-2xl flex items-center gap-3"
                role="alert"
                aria-live="assertive"
              >
                {getIcon('AlertCircle', 'w-6 h-6 text-red-500 flex-shrink-0')}
                <p className="text-red-700 text-sm">{errors.submit}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Your Name *"
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="John Doe"
                  required
                  maxLength={FORM_VALIDATION.NAME_MAX_LENGTH}
                />

                <FormInput
                  label="Email Address *"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Phone / WhatsApp *"
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  placeholder="+977 9800000000"
                  required
                  maxLength={FORM_VALIDATION.PHONE_MAX_LENGTH}
                />

                <FormSelect
                  label="Destination *"
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  error={errors.destination}
                  options={DESTINATIONS}
                  required
                />
              </div>

              <FormInput
                label="Preferred Travel Date *"
                id="travelDate"
                name="travelDate"
                type="date"
                value={formData.travelDate}
                onChange={handleChange}
                error={errors.travelDate}
                required
              />

              <FormTextarea
                label="Tell us about your travel plans *"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                rows={6}
                placeholder="Share details about your trip: number of travelers, interests, budget, special requirements..."
                required
                maxLength={FORM_VALIDATION.MESSAGE_MAX_LENGTH}
              />

              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-4 rounded-full font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 inline-flex items-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Backend currently working on...</span>
                    </>
                  ) : (
                    <>
                      {getIcon('Send', 'w-5 h-5')}
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                <p className="mt-4 text-sm text-gray-500">
                  We&apos;ll get back to you within 2 hours
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
});

ContactFormSection.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    travelDate: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
  errors: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  submitSuccess: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default ContactFormSection;

