import { memo } from 'react';
import { STEPS } from '../../../data/contact/stepsData.jsx';

const WhatHappensNextSection = memo(function WhatHappensNextSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Happens Next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`bg-gradient-to-br ${step.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default WhatHappensNextSection;
