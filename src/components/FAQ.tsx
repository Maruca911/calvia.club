import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function FAQ() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = t('faq.items', { returnObjects: true }) as {
    question: string;
    answer: string;
  }[];

  const animationClass = isVisible
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-8';

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-charcoal-950 section-padding">
      <div className="section-container">
        <div
          ref={ref}
          className={'transition-all duration-700 ' + animationClass}
        >
          <h2 className="heading-lg text-white text-center">
            {t('faq.headline')}
          </h2>
          <div className="gold-line max-w-24 mx-auto mt-4 mb-16" />
          <div className="max-w-3xl mx-auto">
            {items.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="border-b border-charcoal-700/50">
                  <button
                    onClick={() => toggle(index)}
                    className="flex items-center justify-between py-6 cursor-pointer w-full text-left"
                  >
                    <span
                      className={
                        'font-heading font-semibold text-lg transition-colors duration-300 ' +
                        (isOpen ? 'text-amber-500' : 'text-white')
                      }
                    >
                      {item.question}
                    </span>
                    <ChevronDown
                      size={20}
                      className={
                        'shrink-0 ml-4 transition-transform duration-300 ' +
                        (isOpen ? 'rotate-180 text-amber-500' : 'text-white')
                      }
                    />
                  </button>
                  <div
                    className={
                      'overflow-hidden transition-all duration-300 ' +
                      (isOpen ? 'max-h-96' : 'max-h-0')
                    }
                  >
                    <p className="text-silver-400 text-body pb-6">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
