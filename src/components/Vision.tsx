import { Heart, TreePine, Users, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const pillars = [
  { icon: Heart, key: 'connection' },
  { icon: TreePine, key: 'nature' },
  { icon: Users, key: 'family' },
  { icon: Sparkles, key: 'impact' },
];

export default function Vision() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="vision"
      ref={ref}
      className={`bg-charcoal-950 section-padding animate-on-scroll${isVisible ? ' is-visible' : ''}`}
    >
      <div className="section-container">
        <h2 className="heading-lg text-white text-center">
          {t('vision.headline')}
        </h2>
        <div className="gold-line h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent max-w-24 mx-auto mt-4 mb-8" />
        <p className="text-body text-silver-300 text-center max-w-3xl mx-auto">
          {t('vision.description')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.key} className="card-dark">
                <Icon className="text-amber-500" size={32} />
                <h3 className="text-white font-semibold text-xl mt-4">
                  {t(`vision.pillars.${pillar.key}.title`)}
                </h3>
                <p className="text-silver-400 text-base mt-2 leading-relaxed">
                  {t(`vision.pillars.${pillar.key}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
