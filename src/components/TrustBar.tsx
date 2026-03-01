import { useTranslation } from 'react-i18next';
import { Shield, Users, Heart, Award } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const signals = [
  { key: 'founding', Icon: Award },
  { key: 'transparent', Icon: Shield },
  { key: 'familyIncluded', Icon: Users },
  { key: 'impact', Icon: Heart },
] as const;

export default function TrustBar() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div className="bg-charcoal-900/50 border-y border-charcoal-800/50 py-8" ref={ref}>
      <div className="section-container">
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 animate-on-scroll${isVisible ? ' is-visible' : ''}`}>
          {signals.map(({ key, Icon }) => (
            <div key={key} className="flex items-center gap-3">
              <Icon size={18} className="text-amber-500 shrink-0" />
              <span className="text-silver-400 text-sm">{t(`trust.${key}`)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
