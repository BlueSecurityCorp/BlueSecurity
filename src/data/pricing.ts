import type { Locale } from '../i18n/index';

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export interface ProductPricing {
  productId: string;
  productName: string;
  tiers: PricingTier[];
}

export interface FAQ {
  question: string;
  answer: string;
}

const pricingData: Record<Locale, ProductPricing[]> = {
  ko: [
    {
      productId: 'codeblue',
      productName: 'CodeBlue',
      tiers: [
        { name: 'Free', price: '0', period: '', description: '개인 프로젝트 및 오픈소스', features: ['월 5회 스캔', '기본 취약점 탐지', '커뮤니티 지원', '기본 리포트'], cta: '무료로 시작' },
        { name: 'Starter', price: '59,000', period: '/월', description: '소규모 팀', features: ['월 50회 스캔', '전체 취약점 탐지', '이메일 지원', '상세 리포트', 'CI/CD 통합', 'SBOM 생성'], cta: '시작하기' },
        { name: 'Team', price: '120,000', period: '/월', description: '성장하는 개발팀', features: ['무제한 스캔', '전체 취약점 탐지', '우선 지원', '커스텀 리포트', 'CI/CD 통합', 'SBOM 생성', 'ISMS-P 매핑', '팀 대시보드'], cta: '시작하기', highlighted: true },
        { name: 'Business', price: '290,000', period: '/월', description: '엔터프라이즈', features: ['무제한 스캔', '전체 취약점 탐지', '전담 매니저', '커스텀 리포트', 'CI/CD 통합', 'SBOM 생성', 'ISMS-P 매핑', '팀 대시보드', 'On-Premise 옵션', 'SLA 보장'], cta: '문의하기' },
      ],
    },
  ],
  en: [
    {
      productId: 'codeblue',
      productName: 'CodeBlue',
      tiers: [
        { name: 'Free', price: '0', period: '', description: 'Personal & Open Source', features: ['5 scans/month', 'Basic vulnerability detection', 'Community support', 'Basic reports'], cta: 'Get Started Free' },
        { name: 'Starter', price: '59,000', period: '/mo', description: 'Small Teams', features: ['50 scans/month', 'Full vulnerability detection', 'Email support', 'Detailed reports', 'CI/CD integration', 'SBOM generation'], cta: 'Get Started' },
        { name: 'Team', price: '120,000', period: '/mo', description: 'Growing Dev Teams', features: ['Unlimited scans', 'Full vulnerability detection', 'Priority support', 'Custom reports', 'CI/CD integration', 'SBOM generation', 'ISMS-P mapping', 'Team dashboard'], cta: 'Get Started', highlighted: true },
        { name: 'Business', price: '290,000', period: '/mo', description: 'Enterprise', features: ['Unlimited scans', 'Full vulnerability detection', 'Dedicated manager', 'Custom reports', 'CI/CD integration', 'SBOM generation', 'ISMS-P mapping', 'Team dashboard', 'On-Premise option', 'SLA guarantee'], cta: 'Contact Us' },
      ],
    },
  ],
};

export function getPricing(lang: Locale = 'ko'): ProductPricing[] {
  return pricingData[lang];
}

export const pricing = pricingData.ko;

const faqData: Record<Locale, FAQ[]> = {
  ko: [
    { question: '무료 플랜에서 유료 플랜으로 전환 시 데이터가 유지되나요?', answer: '네, 기존 스캔 결과와 설정이 모두 유지됩니다.' },
    { question: '결제 방식은 어떻게 되나요?', answer: '월간/연간 구독 방식이며, 연간 구독 시 20% 할인이 적용됩니다. 세금계산서 발행 가능합니다.' },
    { question: 'On-Premise 설치도 가능한가요?', answer: 'Business 플랜에서 On-Premise 설치를 지원합니다. 별도 문의해 주세요.' },
    { question: 'BluePhalanx, BlueProxy의 가격은 어떻게 되나요?', answer: '제품별 맞춤 견적을 제공합니다. 문의 페이지를 통해 연락해 주세요.' },
    { question: '환불 정책은 어떻게 되나요?', answer: '구독 시작 후 14일 이내 전액 환불이 가능합니다.' },
  ],
  en: [
    { question: 'Is my data preserved when upgrading from Free to a paid plan?', answer: 'Yes, all existing scan results and settings are preserved.' },
    { question: 'What payment methods are available?', answer: 'Monthly and annual subscriptions are available. Annual plans receive a 20% discount. Tax invoices can be issued.' },
    { question: 'Is On-Premise installation available?', answer: 'On-Premise installation is supported on the Business plan. Please contact us for details.' },
    { question: 'What about pricing for BluePhalanx and BlueProxy?', answer: 'Custom quotes are provided for each product. Please reach out via our contact page.' },
    { question: 'What is the refund policy?', answer: 'Full refund is available within 14 days of subscription start.' },
  ],
};

export function getFaq(lang: Locale = 'ko'): FAQ[] {
  return faqData[lang];
}

export const faq = faqData.ko;
