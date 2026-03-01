import { Tag, CalendarCheck, Leaf, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const features = [
  { key: 'deals', Icon: Tag },
  { key: 'events', Icon: CalendarCheck },
  { key: 'sustainability', Icon: Leaf },
  { key: 'family', Icon: Users },
] as const;

export default function Reinvestment() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="reinvestment" className="bg-charcoal-950 stripe-divider section-padding">
      <div className="section-container relative" ref={ref}>
        <div className={`animate-on-scroll${isVisible ? ' is-visible' : ''}`}>
          <h2 className="heading-lg text-white text-center">
            {t('reinvestment.headline')}
          </h2>
          <div className="gold-line max-w-28 mx-auto mt-4 mb-8" />
          <p className="text-body text-silver-300 text-center max-w-3xl mx-auto mb-16">
            {t('reinvestment.description')}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ key, Icon }, index) => (
            <div
              key={key}
              className={`bg-charcoal-900 border border-charcoal-700/50 rounded-sm p-8 text-center group hover:border-amber-500/30 hover:-translate-y-1 transition-all duration-300 scale-in${isVisible ? ' is-visible' : ''}`}
              style={{ transitionDelay: isVisible ? `${200 + index * 120}ms` : '0ms' }}
            >
              <div className="w-12 h-12 rounded-sm bg-amber-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500/20 transition-colors duration-300">
                <Icon size={24} className="text-amber-500" />
              </div>
              <h3 className="text-white font-semibold text-xl">
                {t(`reinvestment.features.${key}.title`)}
              </h3>
              <p className="text-silver-400 text-sm mt-3 leading-relaxed">
                {t(`reinvestment.features.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
        <p className={`italic text-amber-500/80 text-lg text-center max-w-2xl mx-auto mt-16 animate-on-scroll${isVisible ? ' is-visible' : ''}`}
          style={{ transitionDelay: isVisible ? '800ms' : '0ms' }}
        >
          <span className="text-2xl leading-none">&ldquo;</span>
          {t('reinvestment.quote')}
          <span className="text-2xl leading-none">&rdquo;</span>
        </p>
      </div>
    </section>
  );
}
