// Contact information data for contact cards
import { CONTACT_PHONES, CONTACT_EMAILS } from '../../constants';
import { getIcon } from '../../components/ui/Icons';

export const CONTACT_CARDS = [
  {
    href: `tel:${CONTACT_PHONES.PRIMARY}`,
    gradient: 'from-green-400 to-green-600',
    icon: getIcon('Phone', 'w-7 h-7 text-white'),
    title: 'Call Us',
    detail: CONTACT_PHONES.PRIMARY,
    textColor: 'text-indigo-600',
  },
  {
    href: `https://wa.me/${CONTACT_PHONES.WHATSAPP.replace(/\D/g, '')}`,
    gradient: 'from-green-500 to-green-700',
    icon: getIcon('MessageCircle', 'w-7 h-7 text-white'),
    title: 'WhatsApp',
    detail: 'Chat with us',
    textColor: 'text-green-600',
    external: true,
  },
  {
    href: `mailto:${CONTACT_EMAILS.SUPPORT}`,
    gradient: 'from-orange-400 to-orange-600',
    icon: getIcon('Mail', 'w-7 h-7 text-white'),
    title: 'Email Us',
    detail: CONTACT_EMAILS.SUPPORT,
    textColor: 'text-orange-600',
  },
];

