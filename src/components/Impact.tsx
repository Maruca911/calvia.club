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
      <div className="section-container">
        <div
          ref={ref}
          className={`animate-on-scroll ${isVisible ? 'is-visible' : ''}`}
        >
          <h2 className="heading-lg text-white text-center">
            {t('impact.headline')}
          </h2>
          <div className="gold-line max-w-24 mx-auto mt-4 mb-8" />
          <p className="text-silver-300 text-body text-center max-w-3xl mx-auto mb-16">
            {t('impact.description')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {breakdownItems.map(({ key, icon: Icon }) => (
              <div
                key={key}
                className="bg-charcoal-950 p-8 border border-charcoal-700/50 rounded-sm text-center"
              >
                <Icon className="text-amber-500/60 mx-auto mb-4" size={28} />
                <div className="text-5xl font-bold text-amber-500 font-heading">
                  {t(`impact.breakdown.${key}.percentage`)}
                </div>
                <div className="text-white font-semibold text-lg mt-2">
                  {t(`impact.breakdown.${key}.label`)}
                </div>
                <p className="text-silver-400 text-sm mt-2">
                  {t(`impact.breakdown.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
          <p className="text-silver-400 text-center italic mt-12 max-w-2xl mx-auto">
            {t('impact.partners')}
          </p>
        </div>
      </div>
    </section>
  );
}
