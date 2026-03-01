import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';

export default function FloatingCTA() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const applySection = document.getElementById('apply');
          const heroSection = document.getElementById('hero');
          if (applySection && heroSection) {
            const applyRect = applySection.getBoundingClientRect();
            const heroRect = heroSection.getBoundingClientRect();
            setVisible(heroRect.bottom < 0 && applyRect.top > window.innerHeight);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <a
        href="#apply"
        className="flex items-center gap-2 bg-amber-500 text-charcoal-950 font-heading font-semibold px-6 py-3 rounded-sm shadow-lg shadow-amber-500/20 hover:bg-amber-400 hover:shadow-amber-500/30 transition-all duration-300 hover:-translate-y-0.5 text-sm"
      >
        {t('nav.apply')}
        <ArrowRight size={16} />
      </a>
    </div>
  );
}
