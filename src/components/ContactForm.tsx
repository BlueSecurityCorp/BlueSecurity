import { useState, useEffect, useRef, type FormEvent, type ChangeEvent } from 'react';

// ---------------------------------------------------------------------------
// i18n (inline translations — mirrors src/i18n/ui.ts for form keys)
// ---------------------------------------------------------------------------

type Locale = 'ko' | 'en';

const formUI = {
  ko: {
    name: '이름',
    namePlaceholder: '홍길동',
    email: '이메일',
    emailPlaceholder: 'example@company.com',
    company: '회사명',
    companyPlaceholder: '(주)블루시큐리티',
    companyOptional: '(선택)',
    type: '문의 유형',
    message: '문의 내용',
    messagePlaceholder: '문의하실 내용을 자세히 작성해 주세요.',
    privacy: '입력하신 개인정보는 문의 응대 목적으로만 사용되며, 답변 완료 후 안전하게 파기됩니다.',
    submit: '문의 보내기',
    submitting: '전송 중…',
    successHeading: '문의가 접수되었습니다',
    successDescription: '소중한 문의 감사합니다. 영업일 기준 24시간 이내에 이메일로 답변 드리겠습니다.',
    successReset: '새 문의 작성',
    error: '전송 중 오류가 발생했습니다.',
    errorName: '이름을 입력해 주세요.',
    errorEmailRequired: '이메일 주소를 입력해 주세요.',
    errorEmailInvalid: '올바른 이메일 형식이 아닙니다.',
    errorMessageRequired: '문의 내용을 입력해 주세요.',
    errorMessageMin: '문의 내용을 10자 이상 입력해 주세요.',
    typeProduct: '제품 문의',
    typeQuote: '견적 요청',
    typeSupport: '기술 지원',
    typeOther: '기타',
    ariaLabel: '문의하기 양식',
  },
  en: {
    name: 'Name',
    namePlaceholder: 'John Doe',
    email: 'Email',
    emailPlaceholder: 'example@company.com',
    company: 'Company',
    companyPlaceholder: 'BlueSecurity Inc.',
    companyOptional: '(Optional)',
    type: 'Inquiry Type',
    message: 'Message',
    messagePlaceholder: 'Please describe your inquiry in detail.',
    privacy: 'Your personal information will only be used for responding to your inquiry and will be safely disposed of after the response is complete.',
    submit: 'Send Message',
    submitting: 'Sending…',
    successHeading: 'Message Received',
    successDescription: 'Thank you for your inquiry. We will respond via email within 24 business hours.',
    successReset: 'Send Another Message',
    error: 'An error occurred while sending.',
    errorName: 'Please enter your name.',
    errorEmailRequired: 'Please enter your email address.',
    errorEmailInvalid: 'Please enter a valid email address.',
    errorMessageRequired: 'Please enter your message.',
    errorMessageMin: 'Please enter at least 10 characters.',
    typeProduct: 'Product Inquiry',
    typeQuote: 'Quote Request',
    typeSupport: 'Technical Support',
    typeOther: 'Other',
    ariaLabel: 'Contact form',
  },
} as const;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type InquiryType = string;

interface FormData {
  name: string;
  email: string;
  company: string;
  inquiryType: InquiryType;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

// Cloudflare Worker endpoint for contact form
// Deploy worker first: cd worker && npm install && npm run deploy
const WORKER_ENDPOINT = 'https://contact.bluesecurity.online';
const TURNSTILE_SITE_KEY = '0x4AAAAAACu3_CKDiBUyWKSw';

function getInquiryOptions(ui: typeof formUI[Locale]): InquiryType[] {
  return [ui.typeProduct, ui.typeQuote, ui.typeSupport, ui.typeOther];
}

function makeInitialForm(ui: typeof formUI[Locale]): FormData {
  return {
    name: '',
    email: '',
    company: '',
    inquiryType: ui.typeProduct,
    message: '',
  };
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: FormData, ui: typeof formUI[Locale]): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = ui.errorName;
  }

  if (!data.email.trim()) {
    errors.email = ui.errorEmailRequired;
  } else if (!EMAIL_RE.test(data.email)) {
    errors.email = ui.errorEmailInvalid;
  }

  if (!data.message.trim()) {
    errors.message = ui.errorMessageRequired;
  } else if (data.message.trim().length < 10) {
    errors.message = ui.errorMessageMin;
  }

  return errors;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface FieldProps {
  id: string;
  label: string;
  optional?: boolean;
  optionalLabel?: string;
  error?: string;
  children: React.ReactNode;
}

function Field({ id, label, optional, optionalLabel, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-300">
        {label}
        {optional && (
          <span className="ml-1.5 text-xs font-normal text-slate-500">
            {optionalLabel ?? '(선택)'}
          </span>
        )}
      </label>
      {children}
      {error && (
        <p role="alert" className="flex items-center gap-1 text-xs text-red-400">
          <svg
            aria-hidden="true"
            className="h-3.5 w-3.5 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

// Shared Tailwind base for text inputs / textarea / select
const inputBase =
  'w-full rounded-lg border bg-slate-800/80 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 ' +
  'transition-colors duration-200 ' +
  'focus:outline-none focus:ring-2 focus:ring-blue-500/40 ' +
  'disabled:cursor-not-allowed disabled:opacity-50';

const inputNormal = `${inputBase} border-slate-700 focus:border-blue-500`;
const inputError  = `${inputBase} border-red-500/70 focus:border-red-400`;

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

interface ContactFormProps {
  lang?: Locale;
}

export default function ContactForm({ lang = 'ko' }: ContactFormProps) {
  const ui = formUI[lang];
  const INQUIRY_OPTIONS = getInquiryOptions(ui);
  const INITIAL_FORM = makeInitialForm(ui);

  const [form, setForm]         = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors]     = useState<FormErrors>({});
  const [touched, setTouched]   = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [status, setStatus]     = useState<SubmitStatus>('idle');
  const [turnstileToken, setTurnstileToken] = useState('');

  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    let mounted = true;

    function renderWidget() {
      if (!mounted || !turnstileRef.current || widgetIdRef.current) return;
      const t = (window as any).turnstile;
      if (!t) return;
      widgetIdRef.current = t.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: 'dark',
        callback: (token: string) => { if (mounted) setTurnstileToken(token); },
        'expired-callback': () => { if (mounted) setTurnstileToken(''); },
        'error-callback': () => { if (mounted) setTurnstileToken(''); },
      });
    }

    const existing = document.getElementById('cf-turnstile-script');
    if (existing) {
      renderWidget();
    } else {
      const script = document.createElement('script');
      script.id = 'cf-turnstile-script';
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.onload = renderWidget;
      document.head.appendChild(script);
    }

    return () => {
      mounted = false;
      if (widgetIdRef.current && (window as any).turnstile) {
        (window as any).turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = undefined;
      }
    };
  }, []);

  // ------------------------------------------------------------------
  // Handlers
  // ------------------------------------------------------------------

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Re-validate touched fields on change
    if (touched[name as keyof FormData]) {
      const next = { ...form, [name]: value };
      const nextErrors = validate(next, ui);
      setErrors((prev) => ({
        ...prev,
        [name]: nextErrors[name as keyof FormErrors],
      }));
    }
  }

  function handleBlur(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const nextErrors = validate(form, ui);
    setErrors((prev) => ({
      ...prev,
      [name]: nextErrors[name as keyof FormErrors],
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Mark all validatable fields as touched
    setTouched({ name: true, email: true, message: true });
    const nextErrors = validate(form, ui);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setStatus('loading');

    try {
      const res = await fetch(WORKER_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company || '',
          inquiryType: form.inquiryType,
          message: form.message,
          turnstileToken,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setForm(INITIAL_FORM);
        setTouched({});
        setErrors({});
        setTurnstileToken('');
        if (widgetIdRef.current && (window as any).turnstile) {
          (window as any).turnstile.reset(widgetIdRef.current);
        }
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  function handleReset() {
    setStatus('idle');
    setForm(INITIAL_FORM);
    setErrors({});
    setTouched({});
  }

  // ------------------------------------------------------------------
  // Success screen
  // ------------------------------------------------------------------

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-6 rounded-2xl border border-blue-800/50 bg-navy-800/60 px-8 py-14 text-center shadow-lg">
        {/* Animated checkmark circle */}
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-blue-600/20">
          <div className="absolute inset-0 animate-ping rounded-full bg-blue-500/20" />
          <svg
            aria-hidden="true"
            className="h-10 w-10 text-blue-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <div>
          <h3 className="mb-2 text-xl font-semibold text-slate-100">
            {ui.successHeading}
          </h3>
          <p className="text-sm leading-relaxed text-slate-400">
            {ui.successDescription}
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="mt-2 rounded-lg border border-slate-700 bg-slate-800 px-6 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-blue-600 hover:text-blue-400"
        >
          {ui.successReset}
        </button>
      </div>
    );
  }

  // ------------------------------------------------------------------
  // Form
  // ------------------------------------------------------------------

  const isLoading = status === 'loading';
  const canSubmit = !isLoading && !!turnstileToken;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label={ui.ariaLabel}
      className="flex flex-col gap-5"
    >
      {/* Error banner */}
      {status === 'error' && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300"
        >
          <svg
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
              clipRule="evenodd"
            />
          </svg>
          <span>
            {ui.error}{' '}
            <a
              href="mailto:blue@bluesecurity.online"
              className="underline underline-offset-2 hover:text-red-200"
            >
              blue@bluesecurity.online
            </a>
          </span>
        </div>
      )}

      {/* Row: name + email */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id="name" label={ui.name} error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={ui.namePlaceholder}
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isLoading}
            aria-required="true"
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={errors.name ? inputError : inputNormal}
          />
        </Field>

        <Field id="email" label={ui.email} error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={ui.emailPlaceholder}
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isLoading}
            aria-required="true"
            className={errors.email ? inputError : inputNormal}
          />
        </Field>
      </div>

      {/* Row: company + inquiry type */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id="company" label={ui.company} optional optionalLabel={ui.companyOptional}>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder={ui.companyPlaceholder}
            value={form.company}
            onChange={handleChange}
            disabled={isLoading}
            className={inputNormal}
          />
        </Field>

        <Field id="inquiryType" label={ui.type}>
          <select
            id="inquiryType"
            name="inquiryType"
            value={form.inquiryType}
            onChange={handleChange}
            disabled={isLoading}
            className={`${inputNormal} cursor-pointer appearance-none bg-[image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")] bg-[right_0.75rem_center] bg-no-repeat pr-10`}
          >
            {INQUIRY_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {/* message */}
      <Field id="message" label={ui.message} error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder={ui.messagePlaceholder}
          value={form.message}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isLoading}
          aria-required="true"
          className={`${errors.message ? inputError : inputNormal} resize-y`}
        />
      </Field>

      {/* Privacy notice */}
      <p className="text-xs leading-relaxed text-slate-500">
        {ui.privacy}
      </p>

      {/* Turnstile */}
      <div ref={turnstileRef} />

      {/* Submit */}
      <button
        type="submit"
        disabled={!canSubmit}
        className={
          'relative flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold ' +
          'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:ring-offset-2 focus:ring-offset-navy-800 ' +
          (!canSubmit
            ? 'cursor-not-allowed bg-blue-700/50 text-blue-300'
            : 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 hover:bg-blue-500 hover:shadow-blue-500/30 active:scale-[0.98]')
        }
      >
        {isLoading ? (
          <>
            <svg
              aria-hidden="true"
              className="h-4 w-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            {ui.submitting}
          </>
        ) : (
          <>
            {ui.submit}
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
