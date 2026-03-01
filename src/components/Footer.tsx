import { useTranslation } from 'react-i18next';
import { Instagram, Linkedin, ArrowUp } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal-950 border-t border-charcoal-800">
      <div className="section-container py-16">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <span className="font-heading font-bold text-2xl tracking-wider">
              <span className="text-silver-300">CALVIA</span>
              <span className="mx-0.5 text-amber-500">.</span>
              <span className="text-silver-300">CLUB</span>
            </span>
            <p className="text-silver-500 text-sm mt-2">{t('footer.tagline')}</p>
          </div>
          <div className="flex gap-6 items-center flex-wrap">
            <span className="text-silver-500 text-sm hover:text-amber-500 transition cursor-pointer">
              {t('footer.privacy')}
            </span>
            <span className="text-silver-500 text-sm hover:text-amber-500 transition cursor-pointer">
              {t('footer.terms')}
            </span>
            <span className="text-silver-500 text-sm hover:text-amber-500 transition cursor-pointer">
              {t('footer.imprint')}
            </span>
            <Instagram className="text-silver-500 hover:text-amber-500 transition cursor-pointer" size={20} />
            <Linkedin className="text-silver-500 hover:text-amber-500 transition cursor-pointer" size={20} />
          </div>
        </div>
        <div className="gold-line my-8" />
        <div className="flex items-center justify-between">
          <span className="text-silver-600 text-sm">{t('footer.copyright')}</span>
          <button
            type="button"
            onClick={handleBackToTop}
            className="flex items-center gap-1.5 text-silver-500 hover:text-amber-500 text-sm transition"
          >
            {t('footer.backToTop')}
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
