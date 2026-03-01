import { ArrowRight, Home, Anchor, Ship, UtensilsCrossed } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const partnerKeys = [
  { key: 'agency', Icon: Home },
  { key: 'ribclub', Icon: Anchor },
  { key: 'boatsters', Icon: Ship },
  { key: 'justcurry', Icon: UtensilsCrossed },
] as const;

export default function Partners() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="partners-section" className="bg-charcoal-950 section-padding">
      <div className="section-container">
        <div
          ref={ref}
          className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h2 className="heading-lg text-white text-center">
            {t('partners.headline')}
          </h2>
          <div className="gold-line max-w-24 mx-auto mt-4 mb-4" />
          <p className="text-silver-400 text-center text-body mb-16">
            {t('partners.subtitle')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {partnerKeys.map(({ key, Icon }) => (
              <div
                key={key}
                className="group bg-charcoal-900 border border-charcoal-700/50 rounded-sm p-8 hover:border-amber-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon size={20} className="text-amber-500/60" />
                  <span className="uppercase text-2xs tracking-widest text-amber-500/70 font-semibold">
                    {t(`partners.list.${key}.category`)}
                  </span>
                </div>
                <h3 className="text-white font-heading font-semibold text-2xl">
                  {t(`partners.list.${key}.name`)}
                </h3>
                <p className="text-silver-400 text-body mt-3">
                  {t(`partners.list.${key}.perk`)}
                </p>
                <ArrowRight
                  size={18}
                  className="text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
