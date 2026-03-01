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
    <section id="vision" className="bg-charcoal-950 section-padding">
      <div className="section-container" ref={ref}>
        <div className={`animate-on-scroll${isVisible ? ' is-visible' : ''}`}>
          <h2 className="heading-lg text-white text-center">
            {t('vision.headline')}
          </h2>
          <div className="gold-line max-w-28 mx-auto mt-5 mb-8" />
          <p className="text-body text-silver-300 text-center max-w-3xl mx-auto leading-relaxed">
            {t('vision.description')}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.key}
                className={`card-dark group animate-on-scroll${isVisible ? ' is-visible' : ''}`}
                style={{ transitionDelay: isVisible ? `${200 + index * 120}ms` : '0ms' }}
              >
                <div className="w-12 h-12 rounded-sm bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors duration-300">
                  <Icon className="text-amber-500" size={24} />
                </div>
                <h3 className="text-white font-semibold text-xl mt-5">
                  {t(`vision.pillars.${pillar.key}.title`)}
                </h3>
                <p className="text-silver-400 text-base mt-3 leading-relaxed">
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
