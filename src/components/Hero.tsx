import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { getSpotsRemaining } from '../lib/supabase';

export default function Hero() {
  const { t } = useTranslation();
  const [count, setCount] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.bottom > 0) {
          setScrollY(window.scrollY);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    async function fetchSpots() {
      try {
        const data = await getSpotsRemaining();
        setCount(data.remaining);
        setTotal(data.total);
      } catch {
        setCount(null);
        setTotal(null);
      }
    }
    fetchSpots();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <img
        src="https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=1920"
        alt=""
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-100"
        style={{ transform: `translateY(${scrollY * 0.3}px) scale(1.1)` }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/85 via-charcoal-950/60 to-charcoal-950/90" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #F5A623 0%, transparent 70%)', transform: `translate(${scrollY * 0.05}px, ${scrollY * 0.08}px)` }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #C4C4C4 0%, transparent 70%)', transform: `translate(${scrollY * -0.03}px, ${scrollY * -0.05}px)` }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl">
        <div
          className={`transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <h1 className="heading-xl text-white max-w-4xl mx-auto">
            {t('hero.headline')}
          </h1>
          <div className="gold-line max-w-32 mx-auto mt-6" />
        </div>

        <p
          className={`text-body-lg text-silver-300 max-w-3xl mt-8 transition-all duration-1000 delay-200 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {t('hero.subheadline')}
        </p>

        <a
          href="#apply"
          className={`btn-primary mt-10 transition-all duration-700 delay-500 ease-out ${loaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}`}
        >
          {t('hero.cta')}
        </a>

        {count !== null && total !== null && (
          <div
            className={`mt-6 flex items-center gap-2 text-amber-500 transition-all duration-700 delay-700 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M12 2l3 9h9l-7.5 5.5L19.5 26 12 20 4.5 26l3-9.5L0 11h9z" />
            </svg>
            <span className="text-sm font-medium">
              {t('hero.spotsRemaining', { count, total })}
            </span>
          </div>
        )}
      </div>

      <svg
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="0,40 480,80 0,100" className="fill-amber-500/[0.08]" />
        <polygon points="300,50 800,90 500,100 0,70" className="fill-silver-300/[0.04]" />
        <polygon points="700,30 1200,70 1440,100 900,100 500,60" className="fill-amber-500/[0.06]" />
        <polygon points="0,100 1440,100 1440,60 1100,80 600,95 200,85" className="fill-charcoal-950" />
      </svg>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <ChevronDown
          className={`w-8 h-8 text-white/60 animate-bounce transition-all duration-700 delay-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
    </section>
  );
}
