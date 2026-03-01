import { useTranslation } from 'react-i18next';
import { TreePine, Map, Flag, Heart } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const breakdownItems = [
  { key: 'mallorca', icon: TreePine },
  { key: 'balearic', icon: Map },
  { key: 'spain', icon: Flag },
  { key: 'member', icon: Heart },
] as const;

export default function Impact() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="impact" className="bg-charcoal-900 section-padding">
      <div className="section-container" ref={ref}>
        <div className={`animate-on-scroll${isVisible ? ' is-visible' : ''}`}>
          <h2 className="heading-lg text-white text-center">
            {t('impact.headline')}
          </h2>
          <div className="gold-line max-w-28 mx-auto mt-4 mb-8" />
          <p className="text-silver-300 text-body text-center max-w-3xl mx-auto mb-16">
            {t('impact.description')}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {breakdownItems.map(({ key, icon: Icon }, index) => (
            <div
              key={key}
              className={`bg-charcoal-950 p-8 border border-charcoal-700/50 rounded-sm text-center group hover:border-amber-500/30 scale-in${isVisible ? ' is-visible' : ''}`}
              style={{ transitionDelay: isVisible ? `${200 + index * 150}ms` : '0ms' }}
            >
              <div className="w-12 h-12 rounded-sm bg-amber-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500/20 transition-colors duration-300">
                <Icon className="text-amber-500" size={24} />
              </div>
              <div className="text-5xl font-bold text-amber-500">
                <span className="font-heading">
                  {t(`impact.breakdown.${key}.percentage`)}
                </span>
              </div>
              <div className="text-white font-semibold text-lg mt-2">
                {t(`impact.breakdown.${key}.label`)}
              </div>
              <p className="text-silver-400 text-sm mt-2 leading-relaxed">
                {t(`impact.breakdown.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
        <p className={`text-silver-400 text-center italic mt-12 max-w-2xl mx-auto animate-on-scroll${isVisible ? ' is-visible' : ''}`}
          style={{ transitionDelay: isVisible ? '800ms' : '0ms' }}
        >
          {t('impact.partners')}
        </p>
      </div>
    </section>
  );
}
