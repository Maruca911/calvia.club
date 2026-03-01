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

  const animationClass = isVisible
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-8';

  return (
    <section id="benefits" className="bg-charcoal-900 section-padding">
      <div className="section-container">
        <div
          ref={ref}
          className={'transition-all duration-700 ' + animationClass}
        >
          <h2 className="heading-lg text-white text-center">
            {t('benefits.headline')}
          </h2>
          <div className="gold-line max-w-24 mx-auto mt-4 mb-16" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {benefits.map(({ key, Icon }) => {
              const items = t('benefits.' + key + '.items', { returnObjects: true }) as string[];
              return (
                <div
                  key={key}
                  className="bg-charcoal-950 border border-charcoal-700/50 p-8 rounded-sm hover:border-amber-500/30 transition-all duration-300"
                >
                  <Icon size={36} className="text-amber-500" />
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
      </div>
    </section>
  );
}
