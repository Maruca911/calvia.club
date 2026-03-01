import { CalendarCheck, Tag, MessageCircle, Lock, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const featureKeys = [
  { key: 'booking', Icon: CalendarCheck },
  { key: 'deals', Icon: Tag },
  { key: 'community', Icon: MessageCircle },
  { key: 'gated', Icon: Lock },
] as const;

export default function AppShowcase() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="app" className="bg-charcoal-950 stripe-divider section-padding">
      <div className="section-container relative">
        <div
          ref={ref}
          className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h2 className="heading-lg text-white text-center">
            {t('appShowcase.headline')}
          </h2>
          <div className="gold-line max-w-24 mx-auto mt-4 mb-8" />
          <p className="text-body text-silver-300 text-center max-w-3xl mx-auto mb-16">
            {t('appShowcase.description')}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {featureKeys.map(({ key, Icon }) => (
                  <div key={key} className="bg-charcoal-900 border border-charcoal-700/50 rounded-sm p-6 hover:border-amber-500/30 transition-all duration-300">
                    <Icon size={28} className="text-amber-500 mb-3" />
                    <h3 className="text-white font-semibold text-lg">
                      {t(`appShowcase.features.${key}.title`)}
                    </h3>
                    <p className="text-silver-400 text-sm mt-2 leading-relaxed">
                      {t(`appShowcase.features.${key}.description`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative aspect-video bg-charcoal-900 rounded-sm border border-charcoal-700/50 overflow-hidden group cursor-pointer">
                <img
                  src="https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Calvia App preview"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play size={28} className="text-charcoal-950 ml-1" />
                  </div>
                  <span className="text-white text-sm font-medium mt-4">
                    {t('appShowcase.videoLabel')}
                  </span>
                </div>
              </div>
              <div className="mt-6 text-center">
                <span className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-sm px-4 py-2 text-amber-500 text-sm font-medium">
                  <Lock size={14} />
                  {t('appShowcase.comingSoon')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
