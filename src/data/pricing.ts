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
    {
      productId: 'bluephalanx',
      productName: 'BluePhalanx',
      tiers: [
        {
          name: 'Standard',
          price: '200,000',
          period: '/월',
          description: 'SaaS 전용 기본 분석',
          features: ['기본 분석 (ML + ClamAV + YARA-X)', 'SaaS 전용', '월 100건 분석', '기본 리포트', '이메일 지원'],
          cta: '시작하기',
        },
        {
          name: 'Professional',
          price: '450,000',
          period: '/월',
          description: '전문 위협 탐지',
          features: ['전체 6계층 분석', 'SaaS + On-Premise', '무제한 분석', '상세 리포트', '우선 지원', 'MISP 연동', '팀 대시보드'],
          cta: '시작하기',
          highlighted: true,
        },
        {
          name: 'Enterprise',
          price: '문의하기',
          period: '',
          description: '대규모 엔터프라이즈',
          features: ['전체 6계층 분석', 'Air-Gap 포함 모든 배포', '무제한 분석', '커스텀 리포트', '전담 매니저', 'STIX/TAXII 연동', 'SLA 보장'],
          cta: '문의하기',
        },
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
    {
      productId: 'bluephalanx',
      productName: 'BluePhalanx',
      tiers: [
        {
          name: 'Standard',
          price: '200,000',
          period: '/mo',
          description: 'SaaS-only basic analysis',
          features: ['Basic analysis (ML + ClamAV + YARA-X)', 'SaaS only', '100 analyses/month', 'Basic reports', 'Email support'],
          cta: 'Get Started',
        },
        {
          name: 'Professional',
          price: '450,000',
          period: '/mo',
          description: 'Advanced threat detection',
          features: ['Full 6-layer analysis', 'SaaS + On-Premise', 'Unlimited analyses', 'Detailed reports', 'Priority support', 'MISP integration', 'Team dashboard'],
          cta: 'Get Started',
          highlighted: true,
        },
        {
          name: 'Enterprise',
          price: 'Contact Us',
          period: '',
          description: 'Large-scale enterprise',
          features: ['Full 6-layer analysis', 'All deployments incl. Air-Gap', 'Unlimited analyses', 'Custom reports', 'Dedicated manager', 'STIX/TAXII integration', 'SLA guarantee'],
          cta: 'Contact Us',
        },
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
    { question: 'BluePhalanx Enterprise 견적은 어떻게 문의하나요?', answer: 'BluePhalanx Enterprise는 규모와 요구사항에 따라 맞춤 견적을 제공합니다. 문의 페이지를 통해 연락해 주세요.' },
    { question: 'BlueProxy는 무료인가요?', answer: '네, BlueProxy는 오픈소스 무료 소프트웨어입니다. GitHub에서 다운로드할 수 있습니다.' },
    { question: '환불 정책은 어떻게 되나요?', answer: '구독 시작 후 14일 이내 전액 환불이 가능합니다.' },
  ],
  en: [
    { question: 'Is my data preserved when upgrading from Free to a paid plan?', answer: 'Yes, all existing scan results and settings are preserved.' },
    { question: 'What payment methods are available?', answer: 'Monthly and annual subscriptions are available. Annual plans receive a 20% discount. Tax invoices can be issued.' },
    { question: 'Is On-Premise installation available?', answer: 'On-Premise installation is supported on the Business plan. Please contact us for details.' },
    { question: 'How do I request a BluePhalanx Enterprise quote?', answer: 'BluePhalanx Enterprise pricing is customized based on your scale and requirements. Please reach out via our contact page.' },
    { question: 'Is BlueProxy free?', answer: 'Yes, BlueProxy is free open-source software. You can download it on GitHub.' },
    { question: 'What is the refund policy?', answer: 'Full refund is available within 14 days of subscription start.' },
  ],
};

export function getFaq(lang: Locale = 'ko'): FAQ[] {
  return faqData[lang];
}

export const faq = faqData.ko;
