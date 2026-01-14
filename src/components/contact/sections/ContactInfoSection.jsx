import { memo } from 'react';
import { CONTACT_CARDS } from '../../../data/contact/contactData.jsx';

const ContactInfoSection = memo(function ContactInfoSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to start your adventure? Contact us through any of these channels and let's make your dream trip a reality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {CONTACT_CARDS.map((card, index) => (
            <a
              key={index}
              href={card.href}
              target={card.external ? '_blank' : undefined}
              rel={card.external ? 'noopener noreferrer' : undefined}
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className={`p-6 rounded-t-xl bg-gradient-to-r ${card.gradient} text-white`}>
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4">
                  {card.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              </div>
              <div className="p-6">
                <p className={`text-lg font-medium ${card.textColor} group-hover:underline`}>
                  {card.detail}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
});

export default ContactInfoSection;

