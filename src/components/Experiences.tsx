import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const events = [
  {
    key: 'padel',
    image:
      'https://images.pexels.com/photos/8224733/pexels-photo-8224733.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    key: 'golf',
    image:
      'https://images.pexels.com/photos/1325748/pexels-photo-1325748.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    key: 'boat',
    image:
      'https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    key: 'dining',
    image:
      'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    key: 'wellness',
    image:
      'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    key: 'family',
    image:
      'https://images.pexels.com/photos/1683975/pexels-photo-1683975.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export default function Experiences() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="experiences" className="bg-charcoal-950 section-padding">
      <div className="section-container">
        <div
          ref={ref}
          className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h2 className="heading-lg text-white text-center">
            {t('experiences.headline')}
          </h2>
          <div className="gold-line max-w-24 mx-auto mt-4 mb-4" />
          <p className="text-silver-400 text-center text-body mb-16">
            {t('experiences.subtitle')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event.key}
                className="group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden rounded-t-sm">
                  <img
                    src={event.image}
                    alt={t(`experiences.events.${event.key}.title`)}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                </div>
                <div className="bg-charcoal-900 p-6 border border-charcoal-700/50 border-t-0 transition-colors duration-300 group-hover:border-amber-500/30">
                  <h3 className="text-white font-semibold text-lg">
                    {t(`experiences.events.${event.key}.title`)}
                  </h3>
                  <p className="text-silver-400 text-sm mt-2">
                    {t(`experiences.events.${event.key}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
