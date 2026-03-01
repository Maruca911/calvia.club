import { useTranslation } from 'react-i18next';
import { CheckCircle, Mail, Phone, MessageSquare, Smartphone, ArrowUp } from 'lucide-react';

const steps = [
  { key: 'step1', Icon: Mail },
  { key: 'step2', Icon: Phone },
  { key: 'step3', Icon: MessageSquare },
  { key: 'step4', Icon: Smartphone },
] as const;

export default function ThankYou() {
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-amber-500" />
        </div>
        <h3 className="heading-md text-white">{t('form.success.headline')}</h3>
        <p className="text-silver-300 text-body mt-4">{t('form.success.message')}</p>
      </div>

      <div className="space-y-4 mb-10">
        {steps.map(({ key, Icon }, index) => (
          <div
            key={key}
            className="flex items-start gap-4 bg-charcoal-950 border border-charcoal-700/50 rounded-sm p-5 hover:border-amber-500/20 transition-colors duration-300"
          >
            <div className="flex items-center gap-4 shrink-0">
              <span className="w-8 h-8 rounded-full bg-amber-500 text-charcoal-950 flex items-center justify-center text-sm font-bold">
                {index + 1}
              </span>
              <Icon size={20} className="text-amber-500/60" />
            </div>
            <p className="text-silver-300 text-sm leading-relaxed pt-1">
              {t(`form.success.steps.${key}`)}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-amber-500/5 border border-amber-500/20 rounded-sm p-6 mb-10">
        <div className="flex items-start gap-3">
          <Phone size={18} className="text-amber-500 mt-0.5 shrink-0" />
          <p className="text-amber-500/90 text-sm leading-relaxed">
            {t('form.success.callInfo')}
          </p>
        </div>
      </div>

      <div className="text-center">
        <a
          href="#hero"
          className="btn-secondary inline-flex items-center gap-2"
        >
          {t('form.success.back')}
          <ArrowUp size={16} />
        </a>
      </div>
    </div>
  );
}
