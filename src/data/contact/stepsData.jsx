// Contact form process steps data
import { getIcon } from '../../components/ui/Icons';

export const STEPS = [
  {
    icon: getIcon('CheckCircle', 'w-8 h-8 text-white'),
    gradient: 'from-indigo-500 to-purple-500',
    title: '1. Instant Confirmation',
    description: 'Your inquiry is received instantly and assigned to a travel expert who specializes in your destination.',
  },
  {
    icon: getIcon('MessageCircle', 'w-8 h-8 text-white'),
    gradient: 'from-blue-500 to-cyan-500',
    title: '2. Personal Consultation',
    description: 'Within 2 hours, we\'ll reach out via your preferred contact method to discuss your travel plans in detail.',
  },
  {
    icon: getIcon('FileText', 'w-8 h-8 text-white'),
    gradient: 'from-pink-500 to-rose-500',
    title: '3. Customized Itinerary',
    description: 'We\'ll craft a personalized travel itinerary tailored to your preferences, budget, and travel dates.',
  },
];

