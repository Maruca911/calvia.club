import { Briefcase, Heart, Target, Activity } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const personas = [
  { key: 'professional', Icon: Briefcase },
  { key: 'family', Icon: Heart },
  { key: 'purposeDriven', Icon: Target },
  { key: 'active', Icon: Activity },
] as const;

export default function WhoIsItFor() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="made-for" className="bg-charcoal-900 section-padding">
      <div className="section-container" ref={ref}>
        <div className={`animate-on-scroll${isVisible ? ' is-visible' : ''}`}>
          <h2 className="heading-lg text-white text-center">
            {t('madeFor.headline')}
          </h2>
          <div className="gold-line max-w-28 mx-auto mt-4 mb-16" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {personas.map(({ key, Icon }, index) => (
            <div
              key={key}
              className={`bg-charcoal-950 border border-amber-500/20 rounded-sm p-8 group hover:border-amber-500/40 hover:-translate-y-1 transition-all duration-300 slide-in-left${isVisible ? ' is-visible' : ''}`}
              style={{ transitionDelay: isVisible ? `${200 + index * 120}ms` : '0ms' }}
            >
              <div className="w-12 h-12 rounded-sm bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors duration-300 mb-4">
                <Icon className="text-amber-500" size={24} />
              </div>
              <h3 className="text-white font-heading font-semibold text-xl">
                {t('madeFor.personas.' + key + '.title')}
              </h3>
              <p className="text-silver-300 text-body mt-3 leading-relaxed">
                {t('madeFor.personas.' + key + '.description')}
              </p>
            </div>
          ))}
        </div>
        <p className={`text-silver-400 text-center text-body-lg mt-16 max-w-2xl mx-auto animate-on-scroll${isVisible ? ' is-visible' : ''}`}
          style={{ transitionDelay: isVisible ? '700ms' : '0ms' }}
        >
          {t('madeFor.closing')}
        </p>
        <a
          href="#apply"
          className={`text-amber-500 underline font-semibold mt-4 block text-center animate-on-scroll${isVisible ? ' is-visible' : ''}`}
          style={{ transitionDelay: isVisible ? '800ms' : '0ms' }}
        >
          {t('madeFor.cta')}
        </a>
      </div>
    </section>
  );
}
