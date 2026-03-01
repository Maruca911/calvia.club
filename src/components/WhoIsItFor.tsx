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
        <h2
          className={[
            'heading-lg text-white text-center transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          ].join(' ')}
        >
          {t('madeFor.headline')}
        </h2>
        <div
          className={[
            'gold-line max-w-24 mx-auto mt-4 mb-16 transition-all duration-700 delay-200',
            isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0',
          ].join(' ')}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {personas.map(({ key, Icon }, index) => (
            <div
              key={key}
              className={[
                'bg-charcoal-950 border border-amber-500/20 rounded-sm p-8 hover:border-amber-500/40 transition-all duration-300',
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8',
              ].join(' ')}
              style={{
                transitionDelay: isVisible ? (300 + index * 100) + 'ms' : '0ms',
              }}
            >
              <Icon className="text-amber-500 mb-4" size={36} />
              <h3 className="text-white font-heading font-semibold text-xl">
                {t('madeFor.personas.' + key + '.title')}
              </h3>
              <p className="text-silver-300 text-body mt-3 leading-relaxed">
                {t('madeFor.personas.' + key + '.description')}
              </p>
            </div>
          ))}
        </div>
        <p
          className={[
            'text-silver-400 text-center text-body-lg mt-16 max-w-2xl mx-auto transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          ].join(' ')}
          style={{ transitionDelay: isVisible ? '700ms' : '0ms' }}
        >
          {t('madeFor.closing')}
        </p>
        <a
          href="#apply"
          className={[
            'text-amber-500 underline font-semibold mt-4 block text-center transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          ].join(' ')}
          style={{ transitionDelay: isVisible ? '800ms' : '0ms' }}
        >
          {t('madeFor.cta')}
        </a>
      </div>
    </section>
  );
}
