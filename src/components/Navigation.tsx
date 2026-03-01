import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe } from 'lucide-react';

const navLinks = [
  { key: 'nav.vision', href: '#vision' },
  { key: 'nav.benefits', href: '#benefits' },
  { key: 'nav.experiences', href: '#experiences' },
  { key: 'nav.impact', href: '#impact' },
  { key: 'nav.ecosystem', href: '#ecosystem' },
];

const languages = [
  { code: 'de', label: 'DE' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'sv', label: 'SV' },
];

export default function Navigation() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    setLangOpen(false);
  };

  const closeMobile = () => setMobileOpen(false);
  const currentLang = languages.find((l) => l.code === i18n.language)?.label ?? 'EN';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-charcoal-950/95 backdrop-blur-md border-b border-charcoal-800/50' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <a href="#" className="flex items-center font-['DM_Sans'] text-xl font-bold tracking-[0.15em] group">
            <span className="text-silver-300 transition-colors group-hover:text-silver-100">CALVIA</span>
            <span className="mx-0.5 text-amber-500">.</span>
            <span className="text-silver-300 transition-colors group-hover:text-silver-100">CLUB</span>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="relative text-sm font-medium text-silver-400 transition-colors hover:text-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-amber-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                {t(link.key)}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangOpen((prev) => !prev)}
                className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-silver-400 transition-colors hover:text-white"
              >
                <Globe className="h-4 w-4" />
                {currentLang}
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-1 w-24 rounded-md border border-charcoal-800 bg-charcoal-950/95 backdrop-blur-sm py-1 shadow-lg">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`block w-full px-4 py-1.5 text-left text-sm transition-colors ${
                        i18n.language === lang.code ? 'text-amber-500' : 'text-silver-400 hover:text-white'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <a href="#apply" className="btn-primary !py-2.5 !px-6 !text-sm">
              {t('nav.apply')}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="text-silver-300 transition-colors hover:text-white lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-charcoal-950 lg:hidden">
          <div className="flex h-20 items-center justify-between px-4 sm:px-6">
            <a href="#" onClick={closeMobile} className="flex items-center font-['DM_Sans'] text-xl font-bold tracking-[0.15em]">
              <span className="text-silver-300">CALVIA</span>
              <span className="mx-0.5 text-amber-500">.</span>
              <span className="text-silver-300">CLUB</span>
            </a>
            <button type="button" onClick={closeMobile} className="text-silver-300 hover:text-white" aria-label="Close menu">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-8">
            {navLinks.map((link) => (
              <a key={link.key} href={link.href} onClick={closeMobile} className="text-2xl font-medium text-silver-300 hover:text-white transition-colors">
                {t(link.key)}
              </a>
            ))}
            <div className="flex items-center gap-2 pt-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    i18n.language === lang.code ? 'bg-amber-500 text-charcoal-950' : 'text-silver-400 hover:text-white'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
            <a href="#apply" onClick={closeMobile} className="btn-primary mt-4 !text-sm">
              {t('nav.apply')}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
