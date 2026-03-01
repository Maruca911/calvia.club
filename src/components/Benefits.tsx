import { Users, Compass, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const benefits = [
  { key: 'network', Icon: Users },
  { key: 'experiences', Icon: Compass },
  { key: 'legacy', Icon: Award },
] as const;

export default function Benefits() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="benefits" className="bg-charcoal-900 section-padding">
      <div className="section-container" ref={ref}>
        <div className={`animate-on-scroll ${isVisible ? 'is-visible' : ''}`}>
          <h2 className="heading-lg text-white text-center">
            {t('benefits.headline')}
          </h2>
          <div className="gold-line h-0.5 max-w-28 mx-auto mt-4 mb-16" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {benefits.map(({ key, Icon }, i) => {
            const items = t('benefits.' + key + '.items', { returnObjects: true }) as string[];
            return (
              <div
                key={key}
                className={`slide-in-left group bg-charcoal-950 border border-charcoal-700/50 p-8 rounded-sm hover:border-amber-500/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-300 ${isVisible ? 'is-visible' : ''}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="w-12 h-12 rounded-sm bg-amber-500/10 flex items-center justify-center">
                  <Icon size={36} className="text-amber-500 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="text-white text-2xl font-semibold mt-4 mb-6">
                  {t('benefits.' + key + '.title')}
                </h3>
                <ul>
                  {items.map((item, index) => (
                    <li key={index} className="text-silver-300 text-body mb-3 flex items-start">
                      <span className="text-amber-500 mr-3 mt-2 block h-1.5 w-1.5 shrink-0 rotate-45 bg-amber-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
