import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { validateField, useFormValidation } from '../../utils/inputValidation';
import { DESTINATION_CONTACT_FORM, GRADIENTS, FORM_THEME } from '../../constants';

const FORM_FIELDS = ['name', 'phone', 'date', 'message', 'travelers'];

const validateDestinationField = (fieldName, value) => {
  const MSG = DESTINATION_CONTACT_FORM.VALIDATION;

  if (fieldName === 'travelers') {
    if (value && (isNaN(value) || parseInt(value) < 1)) {
      return MSG.TRAVELERS_INVALID;
    }
    return '';
  }

  if (fieldName === 'message') {
    if (!value.trim()) return MSG.MESSAGE_REQUIRED;
    if (value.trim().length < 10) return MSG.MESSAGE_MIN_LENGTH;
    return '';
  }

  if (fieldName === 'date') {
    if (!value) return MSG.DATE_REQUIRED;
    return '';
  }

  return validateField(fieldName, value);
};

const gradientStyle = { background: GRADIENTS.PRIMARY };

const DestinationContactForm = ({ destinationId, destinationName, theme }) => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    travelers: '',
    date: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState(null);

  const t = {
    ...FORM_THEME.DEFAULT,
    ...theme,
    headingColor: theme?.headingColor || FORM_THEME.DEFAULT.headingColor,
    borderColor: theme?.borderColor || FORM_THEME.DEFAULT.borderColor,
    inputBorderColor: theme?.inputBorderColor || FORM_THEME.DEFAULT.inputBorderColor,
    cardBorder: theme?.cardBorder || FORM_THEME.DEFAULT.cardBorder,
    formBgGradient: theme?.formBgGradient || FORM_THEME.DEFAULT.formBgGradient,
  };

  const formBgColors = t.formBgGradient.split(',').map(c => c.trim());
  const formBgStyle = { backgroundImage: `linear-gradient(to bottom right, ${formBgColors.join(', ')})` };
  const cardBorderClass = t.cardBorder;
  const inputBorderClass = t.inputBorderColor;
  const focusBorderClass = inputBorderClass.replace('200', '400').replace('100', '300');
  const headingColor = t.headingColor;

  const { errors, validateForm: validateAll, clearError, reset: resetValidation } = useFormValidation(form, {
    fields: FORM_FIELDS,
    validate: validateDestinationField,
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    clearError(name);
    setError(null);
  }, [clearError]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validateAll(form)) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: '',
          phone: form.phone,
          destination: destinationName || 'General Inquiry',
          travelDate: form.date,
          message: `Travelers: ${form.travelers || 1}\n\n${form.message}`,
        }),
      });

      // Check response status first before parsing JSON to avoid "Unexpected end of JSON input"
      if (!response.ok) {
        let errorMessage = 'Failed to send message';
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
          } else {
            errorMessage = `Server error (${response.status}). Please try again.`;
          }
        } catch {
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      // Parse JSON only if response is OK
      const data = await response.json();

      if (data.url) {
        window.open(data.url, '_blank');
      }

      setSubmitSuccess(true);
      setTimeout(() => {
        setForm({ name: '', phone: '', travelers: '', date: '', message: '' });
        resetValidation();
        setSubmitSuccess(false);
      }, DESTINATION_CONTACT_FORM.SUCCESS_MESSAGE_DURATION || 3000);

    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [form, validateAll, resetValidation, destinationName]);

  if (submitSuccess) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className={`rounded-3xl shadow-2xl p-8 border ${cardBorderClass} sticky top-24 z-20`} style={formBgStyle}>
        <div className="text-center py-8">
          <h3 className="text-xl font-bold text-green-700 mb-2">{DESTINATION_CONTACT_FORM.SUCCESS_MESSAGES.TITLE}</h3>
          <p className="text-gray-600">{DESTINATION_CONTACT_FORM.SUCCESS_MESSAGES.MESSAGE}</p>
        </div>
      </motion.div>
    );
  }

  const MSG = DESTINATION_CONTACT_FORM.PLACEHOLDERS;
  const SUBMIT_STATE = DESTINATION_CONTACT_FORM.SUBMIT_STATES;

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
      viewport={{ once: true }} id={`${destinationId}-contact-form`}
      className={`rounded-3xl shadow-2xl p-8 border ${cardBorderClass} sticky top-24 z-20`} style={formBgStyle}>
      <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: headingColor }}>Enquire Now</h3>

      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"><p className="text-red-600 text-sm">{error}</p></div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input type="text" name="name" placeholder={MSG.NAME} value={form.name} onChange={handleChange}
            className={`w-full border-2 rounded-lg px-4 py-3 ${errors.name ? 'border-red-300' : inputBorderClass + ' ' + focusBorderClass}`} />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <input type="tel" name="phone" placeholder={MSG.PHONE} value={form.phone} onChange={handleChange}
            className={`w-full border-2 rounded-lg px-4 py-3 ${errors.phone ? 'border-red-300' : inputBorderClass + ' ' + focusBorderClass}`} />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div className="flex gap-2">
          <div className="w-1/2">
            <input type="number" name="travelers" placeholder={MSG.TRAVELERS} value={form.travelers} onChange={handleChange} min="1"
              className={`w-full border-2 rounded-lg px-4 py-3 ${errors.travelers ? 'border-red-300' : inputBorderClass + ' ' + focusBorderClass}`} />
            {errors.travelers && <p className="text-red-500 text-sm mt-1">{errors.travelers}</p>}
          </div>
          <div className="w-1/2">
            <input type="date" name="date" value={form.date} onChange={handleChange}
              className={`w-full border-2 rounded-lg px-4 py-3 ${inputBorderClass} ${focusBorderClass}`} />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
          </div>
        </div>

        <div>
          <textarea name="message" placeholder={MSG.MESSAGE} value={form.message} onChange={handleChange} rows={3}
            className={`w-full border-2 rounded-lg px-4 py-3 resize-none ${errors.message ? 'border-red-300' : inputBorderClass + ' ' + focusBorderClass}`} />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>

        <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="w-full text-white font-bold py-3 rounded-lg disabled:opacity-50" style={gradientStyle}>
          {isSubmitting ? SUBMIT_STATE.SUBMITTING : SUBMIT_STATE.IDLE}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default DestinationContactForm;
