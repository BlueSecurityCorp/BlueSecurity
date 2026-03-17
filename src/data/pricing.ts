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

export const pricing: ProductPricing[] = [
  {
    productId: 'codeblue',
    productName: 'CodeBlue',
    tiers: [
      {
        name: 'Free',
        price: '0',
        period: '',
        description: '개인 프로젝트 및 오픈소스',
        features: [
          '월 5회 스캔',
          '기본 취약점 탐지',
          '커뮤니티 지원',
          '기본 리포트',
        ],
        cta: '무료로 시작',
      },
      {
        name: 'Starter',
        price: '59,000',
        period: '/월',
        description: '소규모 팀',
        features: [
          '월 50회 스캔',
          '전체 취약점 탐지',
          '이메일 지원',
          '상세 리포트',
          'CI/CD 통합',
          'SBOM 생성',
        ],
        cta: '시작하기',
      },
      {
        name: 'Team',
        price: '120,000',
        period: '/월',
        description: '성장하는 개발팀',
        features: [
          '무제한 스캔',
          '전체 취약점 탐지',
          '우선 지원',
          '커스텀 리포트',
          'CI/CD 통합',
          'SBOM 생성',
          'ISMS-P 매핑',
          '팀 대시보드',
        ],
        cta: '시작하기',
        highlighted: true,
      },
      {
        name: 'Business',
        price: '290,000',
        period: '/월',
        description: '엔터프라이즈',
        features: [
          '무제한 스캔',
          '전체 취약점 탐지',
          '전담 매니저',
          '커스텀 리포트',
          'CI/CD 통합',
          'SBOM 생성',
          'ISMS-P 매핑',
          '팀 대시보드',
          'On-Premise 옵션',
          'SLA 보장',
        ],
        cta: '문의하기',
      },
    ],
  },
];

export const faq = [
  {
    question: '무료 플랜에서 유료 플랜으로 전환 시 데이터가 유지되나요?',
    answer: '네, 기존 스캔 결과와 설정이 모두 유지됩니다.',
  },
  {
    question: '결제 방식은 어떻게 되나요?',
    answer: '월간/연간 구독 방식이며, 연간 구독 시 20% 할인이 적용됩니다. 세금계산서 발행 가능합니다.',
  },
  {
    question: 'On-Premise 설치도 가능한가요?',
    answer: 'Business 플랜에서 On-Premise 설치를 지원합니다. 별도 문의해 주세요.',
  },
  {
    question: 'BluePhalanx, BlueProxy의 가격은 어떻게 되나요?',
    answer: '제품별 맞춤 견적을 제공합니다. 문의 페이지를 통해 연락해 주세요.',
  },
  {
    question: '환불 정책은 어떻게 되나요?',
    answer: '구독 시작 후 14일 이내 전액 환불이 가능합니다.',
  },
];
