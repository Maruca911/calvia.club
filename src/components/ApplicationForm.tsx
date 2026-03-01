import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { submitApplication } from '../lib/supabase';
import type { MembershipApplication } from '../lib/supabase';
import ThankYou from './ThankYou';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  language: number;
  ageRange: number;
  propertyStatus: number;
  visitFrequency: number;
  heardAboutUs: number;
  interests: number[];
  benefits: number[];
  wishes: string;
}

const LANGUAGE_CODES = ['de', 'en', 'es', 'sv'];

const initialFormData: FormData = {
  fullName: '',
  email: '',
  phone: '',
  country: '',
  language: 0,
  ageRange: -1,
  propertyStatus: 0,
  visitFrequency: 0,
  heardAboutUs: 0,
  interests: [],
  benefits: [],
  wishes: '',
};

export default function ApplicationForm() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const animationClass = isVisible
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-8';

  const stepLabels = [
    t('form.steps.personal'),
    t('form.steps.qualifying'),
    t('form.steps.interests'),
  ];

  const languages = t('form.options.languages', { returnObjects: true }) as string[];
  const ageRanges = t('form.options.ageRanges', { returnObjects: true }) as string[];
  const propertyStatuses = t('form.options.propertyStatuses', { returnObjects: true }) as string[];
  const visitFrequencies = t('form.options.visitFrequencies', { returnObjects: true }) as string[];
  const heardOptions = t('form.options.heardOptions', { returnObjects: true }) as string[];
  const interestOptions = t('form.options.interestOptions', { returnObjects: true }) as string[];
  const benefitOptions = t('form.options.benefitOptions', { returnObjects: true }) as string[];

  const inputClass =
    'w-full bg-charcoal-950 border border-charcoal-700 rounded-sm px-4 py-3 text-white placeholder:text-silver-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition';
  const inputErrorClass =
    'w-full bg-charcoal-950 border border-red-500 rounded-sm px-4 py-3 text-white placeholder:text-silver-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition';
  const labelClass = 'text-silver-300 text-sm font-medium mb-2 block';

  function validateStep(step: number): boolean {
    const newErrors: Record<string, boolean> = {};

    if (step === 0) {
      if (!formData.fullName.trim()) newErrors.fullName = true;
      if (!formData.email.trim()) newErrors.email = true;
    }

    if (step === 1) {
      if (formData.ageRange < 0) newErrors.ageRange = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleNext() {
    if (!validateStep(currentStep)) return;
    setCurrentStep((prev) => Math.min(prev + 1, 2));
  }

  function handleBack() {
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }

  function toggleArrayItem(
    field: 'interests' | 'benefits',
    index: number
  ) {
    setFormData((prev) => {
      const arr = prev[field];
      const next = arr.includes(index)
        ? arr.filter((i) => i !== index)
        : [...arr, index];
      return { ...prev, [field]: next };
    });
  }

  async function handleSubmit() {
    if (!validateStep(currentStep)) return;

    setSubmitting(true);
    setSubmitError(false);

    const application: MembershipApplication = {
      full_name: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      country_of_residence: formData.country.trim(),
      preferred_language: LANGUAGE_CODES[formData.language] ?? 'en',
      age_range: Array.isArray(ageRanges) ? ageRanges[formData.ageRange] ?? '' : '',
      property_status: Array.isArray(propertyStatuses) ? propertyStatuses[formData.propertyStatus] ?? '' : '',
      visit_frequency: Array.isArray(visitFrequencies) ? visitFrequencies[formData.visitFrequency] ?? '' : '',
      heard_about_us: Array.isArray(heardOptions) ? heardOptions[formData.heardAboutUs] ?? '' : '',
      interests: Array.isArray(interestOptions)
        ? formData.interests.map((i) => interestOptions[i]).filter(Boolean)
        : [],
      preferred_benefits: Array.isArray(benefitOptions)
        ? formData.benefits.map((i) => benefitOptions[i]).filter(Boolean)
        : [],
      wishes: formData.wishes.trim(),
    };

    try {
      await submitApplication(application);
      setSubmitted(true);
    } catch {
      setSubmitting(false);
      setSubmitError(true);
    }
  }

  function renderStepIndicator() {
    return (
      <div className="flex items-center justify-center mb-12">
        {stepLabels.map((label, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isFuture = index > currentStep;

          return (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ' +
                    (isCompleted
                      ? 'bg-amber-500 text-charcoal-950'
                      : isActive
                        ? 'bg-amber-500 text-charcoal-950'
                        : 'bg-charcoal-700 text-silver-400')
                  }
                >
                  {isCompleted ? <Check size={18} strokeWidth={3} /> : index + 1}
                </div>
                <span
                  className={
                    'text-xs mt-2 whitespace-nowrap ' +
                    (isFuture ? 'text-silver-600' : 'text-silver-300')
                  }
                >
                  {label}
                </span>
              </div>
              {index < stepLabels.length - 1 && (
                <div
                  className={
                    'w-16 sm:w-24 h-px mx-3 mb-6 ' +
                    (index < currentStep ? 'bg-amber-500' : 'bg-charcoal-700')
                  }
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  function renderStep0() {
    return (
      <>
        <div className="mb-6">
          <label className={labelClass}>{t('form.fields.fullName')}</label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className={errors.fullName ? inputErrorClass : inputClass}
          />
        </div>
        <div className="mb-6">
          <label className={labelClass}>{t('form.fields.email')}</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={errors.email ? inputErrorClass : inputClass}
          />
        </div>
        <div className="mb-6">
          <label className={labelClass}>{t('form.fields.phone')}</label>
          <input
            type="tel"
            required
            placeholder="+49..."
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={inputClass}
          />
        </div>
        <div className="mb-6">
          <label className={labelClass}>{t('form.fields.country')}</label>
          <input
            type="text"
            required
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className={inputClass}
          />
        </div>
        <div className="mb-6">
          <label className={labelClass}>{t('form.fields.language')}</label>
          <select
            value={formData.language}
            onChange={(e) => setFormData({ ...formData, language: Number(e.target.value) })}
            className={inputClass}
          >
            {Array.isArray(languages) &&
              languages.map((lang, i) => (
                <option key={i} value={i}>
                  {lang}
                </option>
              ))}
          </select>
        </div>
      </>
    );
  }

  function renderStep1() {
    return (
      <>
        <div className="mb-6">
          <label className={labelClass}>{t('form.fields.ageRange')}</label>
          <select
            value={formData.ageRange}
            onChange={(e) => setFormData({ ...formData, ageRange: Number(e.target.value) })}
            className={errors.ageRange ? inputErrorClass : inputClass}
          >
            <option value={-1} disabled>{t('form.selectPlaceholder')}</option>
            {Array.isArray(ageRanges) &&
              ageRanges.map((option, i) => (
                <option key={i} value={i}>
                  {option}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-6">
          <label className={labelClass}>{t('form.fields.propertyStatus')}</label>
          <select
            value={formData.propertyStatus}
            onChange={(e) => setFormData({ ...formData, propertyStatus: Number(e.target.value) })}
            className={inputClass}
          >
            {Array.isArray(propertyStatuses) &&
              propertyStatuses.map((option, i) => (
                <option key={i} value={i}>
                  {option}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-6">
          <label className={labelClass}>{t('form.fields.visitFrequency')}</label>
          <select
            value={formData.visitFrequency}
            onChange={(e) => setFormData({ ...formData, visitFrequency: Number(e.target.value) })}
            className={inputClass}
          >
            {Array.isArray(visitFrequencies) &&
              visitFrequencies.map((option, i) => (
                <option key={i} value={i}>
                  {option}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-6">
          <label className={labelClass}>{t('form.fields.heardAbout')}</label>
          <select
            value={formData.heardAboutUs}
            onChange={(e) => setFormData({ ...formData, heardAboutUs: Number(e.target.value) })}
            className={inputClass}
          >
            {Array.isArray(heardOptions) &&
              heardOptions.map((option, i) => (
                <option key={i} value={i}>
                  {option}
                </option>
              ))}
          </select>
        </div>
      </>
    );
  }

  function renderStep2() {
    return (
      <>
        <div className="mb-6">
          <label className={labelClass}>{t('form.fields.interests')}</label>
          <div className="flex flex-wrap gap-3">
            {Array.isArray(interestOptions) &&
              interestOptions.map((option, i) => {
                const selected = formData.interests.includes(i);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => toggleArrayItem('interests', i)}
                    className={
                      'px-4 py-2 rounded-sm text-sm transition-all duration-200 ' +
                      (selected
                        ? 'bg-amber-500/10 border border-amber-500/50 text-amber-500'
                        : 'bg-charcoal-950 border border-charcoal-700 text-silver-300 hover:border-charcoal-600')
                    }
                  >
                    {option}
                  </button>
                );
              })}
          </div>
        </div>
        <div className="mb-6">
          <label className={labelClass}>{t('form.fields.benefits')}</label>
          <div className="flex flex-wrap gap-3">
            {Array.isArray(benefitOptions) &&
              benefitOptions.map((option, i) => {
                const selected = formData.benefits.includes(i);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => toggleArrayItem('benefits', i)}
                    className={
                      'px-4 py-2 rounded-sm text-sm transition-all duration-200 ' +
                      (selected
                        ? 'bg-amber-500/10 border border-amber-500/50 text-amber-500'
                        : 'bg-charcoal-950 border border-charcoal-700 text-silver-300 hover:border-charcoal-600')
                    }
                  >
                    {option}
                  </button>
                );
              })}
          </div>
        </div>
        <div className="mb-6">
          <label className={labelClass}>{t('form.fields.wishes')}</label>
          <textarea
            rows={4}
            value={formData.wishes}
            onChange={(e) => setFormData({ ...formData, wishes: e.target.value })}
            className={inputClass}
          />
        </div>
      </>
    );
  }

  return (
    <section id="apply" className="bg-charcoal-900 section-padding">
      <div className="section-container max-w-3xl mx-auto">
        <div
          ref={ref}
          className={'transition-all duration-700 ' + animationClass}
        >
          {submitted ? (
            <ThankYou />
          ) : (
            <>
              <h2 className="heading-lg text-white text-center">
                {t('form.headline')}
              </h2>
              <p className="text-silver-400 text-center text-body mb-12">
                {t('form.subheadline')}
              </p>
              {renderStepIndicator()}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (currentStep < 2) {
                    handleNext();
                  } else {
                    handleSubmit();
                  }
                }}
              >
                {currentStep === 0 && renderStep0()}
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}

                {submitError && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-sm p-4 mb-6">
                    <p className="text-red-400 text-sm">{t('form.submitError')}</p>
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  {currentStep > 0 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="btn-secondary"
                    >
                      {t('form.back')}
                    </button>
                  ) : (
                    <div />
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary"
                  >
                    {submitting
                      ? t('form.submitting')
                      : currentStep < 2
                        ? t('form.next')
                        : t('form.submit')}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
