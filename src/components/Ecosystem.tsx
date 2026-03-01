import { ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const brandKeys = ['group', 'app', 'realestate', 'digital', 'jobs', 'ventures'] as const;

export default function Ecosystem() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="ecosystem" className="bg-charcoal-900 section-padding">
      <div className="section-container">
        <div
          ref={ref}
          className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h2 className="heading-lg text-white text-center">
            {t('ecosystem.headline')}
          </h2>
          <div className="gold-line max-w-24 mx-auto mt-4 mb-8" />
          <p className="text-body text-silver-300 text-center max-w-3xl mx-auto mb-16">
            {t('ecosystem.description')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandKeys.map((key) => (
              <div
                key={key}
                className="bg-charcoal-950 border border-charcoal-700/50 rounded-sm p-6 hover:border-amber-500/30 transition-all duration-300 group relative"
              >
                <ExternalLink
                  size={14}
                  className="text-silver-600 absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition"
                />
                <span className="text-amber-500 font-heading font-semibold text-lg">
                  {t(`ecosystem.brands.${key}.name`)}
                </span>
                <p className="text-silver-400 text-sm mt-2 leading-relaxed">
                  {t(`ecosystem.brands.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
