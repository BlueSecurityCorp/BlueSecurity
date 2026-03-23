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
        { name: 'Trial', price: '0', period: '', description: '14일 무료 체험', features: ['프로젝트 15개', '사용자 무제한', 'SAST + SCA 분석', 'SBOM 생성/비교', '의존성 그래프', 'HTML 보고서', '이메일 지원'], cta: '무료 체험 시작' },
        { name: 'Starter', price: '99,000', period: '/월', description: '소규모 팀', features: ['프로젝트 15개', '사용자 무제한', '무제한 스캔/SBOM', 'SAST + SCA 분석', 'SBOM 생성/비교', '의존성 그래프', '공급망 위험 경고', 'HTML 보고서', '6개월 데이터 보관', '이메일 지원'], cta: '시작하기' },
        { name: 'Pro', price: '199,000', period: '/월', description: '성장하는 개발팀', features: ['프로젝트 50개', '사용자 무제한', '납품용 PDF 보고서 무제한', 'VEX 문서 관리', '라이선스 정책 (커스텀)', 'SBOM 공유 링크', 'SAST+SCA 교차 분석', '공급망 위협 알림 (5개 생태계)', '업데이트 권고', '자동 SBOM 비교 + 변경 알림', '2년 데이터 보관', '이메일 지원 (48시간 SLA)'], cta: '시작하기', highlighted: true },
        { name: 'Business', price: '399,000', period: '/월', description: '엔터프라이즈', features: ['프로젝트 무제한', '사용자 무제한', 'SBOM 서명/검증 (Ed25519/ES256)', 'GitHub PR 연동 (SBOM diff)', '라이선스 정책 (자동 평가 + 위반 대시보드)', 'VEX 전체 워크플로우', '5년 데이터 보관', '채팅 + 이메일 지원 (24시간 SLA)'], cta: '시작하기' },
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
        { name: 'Trial', price: '0', period: '', description: '14-day free trial', features: ['Up to 15 projects', 'Unlimited users', 'SAST + SCA analysis', 'SBOM generation/comparison', 'Dependency graph', 'HTML reports', 'Email support'], cta: 'Start Free Trial' },
        { name: 'Starter', price: '99,000', period: '/mo', description: 'Small Teams', features: ['Up to 15 projects', 'Unlimited users', 'Unlimited scans/SBOM', 'SAST + SCA analysis', 'SBOM generation/comparison', 'Dependency graph', 'Supply chain risk alerts', 'HTML reports', '6-month data retention', 'Email support'], cta: 'Get Started' },
        { name: 'Pro', price: '199,000', period: '/mo', description: 'Growing Dev Teams', features: ['Up to 50 projects', 'Unlimited users', 'Unlimited PDF reports for delivery', 'VEX document management', 'License policy (custom)', 'SBOM sharing links', 'SAST+SCA cross analysis', 'Supply chain threat alerts (5 ecosystems)', 'Update recommendations', 'Auto SBOM comparison + change alerts', '2-year data retention', 'Email support (48h SLA)'], cta: 'Get Started', highlighted: true },
        { name: 'Business', price: '399,000', period: '/mo', description: 'Enterprise', features: ['Unlimited projects', 'Unlimited users', 'SBOM signing/verification (Ed25519/ES256)', 'GitHub PR integration (SBOM diff)', 'License policy (auto evaluation + violation dashboard)', 'Full VEX workflow', '5-year data retention', 'Chat + email support (24h SLA)'], cta: 'Get Started' },
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
    { question: '무료 체험(Trial)에서 유료 플랜으로 전환 시 데이터가 유지되나요?', answer: '네, 기존 스캔 결과와 설정이 모두 유지됩니다. 체험 종료 후에는 읽기 전용으로 전환되며 데이터는 삭제되지 않습니다.' },
    { question: '결제 방식은 어떻게 되나요?', answer: '월간/연간 구독 방식이며, 연간 구독 시 20% 할인이 적용됩니다. 세금계산서 발행 가능합니다.' },
    { question: 'On-Premise 설치도 가능한가요?', answer: 'Business 플랜에서 On-Premise 설치를 지원합니다. 별도 문의해 주세요.' },
    { question: 'BluePhalanx Enterprise 견적은 어떻게 문의하나요?', answer: 'BluePhalanx Enterprise는 규모와 요구사항에 따라 맞춤 견적을 제공합니다. 문의 페이지를 통해 연락해 주세요.' },
    { question: 'BlueProxy는 무료인가요?', answer: '네, BlueProxy는 오픈소스 무료 소프트웨어입니다. GitHub에서 다운로드할 수 있습니다.' },
    { question: '환불 정책은 어떻게 되나요?', answer: '구독 시작 후 14일 이내 전액 환불이 가능합니다.' },
  ],
  en: [
    { question: 'Is my data preserved when upgrading from Trial to a paid plan?', answer: 'Yes, all existing scan results and settings are preserved. After the trial ends, your account switches to read-only mode and no data is deleted.' },
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
