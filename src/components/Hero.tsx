import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { getSpotsRemaining } from '../lib/supabase';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Hero() {
  const { t } = useTranslation();
  const [count, setCount] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const { ref, isVisible } = useScrollAnimation();

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
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <img
        src="https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=1920"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/80 to-charcoal-950/60" />

      <div
        ref={ref}
        className={`relative z-10 flex flex-col items-center text-center px-6 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h1 className="heading-xl text-white max-w-4xl">
          {t('hero.headline')}
        </h1>

        <p className="text-body-lg text-silver-300 max-w-3xl mt-6">
          {t('hero.subheadline')}
        </p>

        <a href="#apply" className="btn-primary mt-10">
          {t('hero.cta')}
        </a>

        {count !== null && total !== null && (
          <div className="mt-6 flex items-center gap-2 text-amber-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
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
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 120 L0 80 Q360 20 720 60 Q1080 100 1440 40 L1440 120 Z"
          className="fill-amber-500/20"
        />
        <line
          x1="0"
          y1="90"
          x2="1440"
          y2="30"
          stroke="currentColor"
          strokeWidth="2"
          className="text-amber-500/20"
        />
      </svg>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <ChevronDown className="w-8 h-8 text-white/70 animate-bounce" />
      </div>
    </section>
  );
}
