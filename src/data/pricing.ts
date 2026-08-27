import type { Locale } from '../i18n/index';

export interface FAQ {
  question: string;
  answer: string;
}

const faqData: Record<Locale, FAQ[]> = {
  ko: [
    { question: 'CodeBlue는 언제 이용할 수 있나요?', answer: '현재 정식 서비스 오픈을 준비 중입니다. 구체적인 출시 일정은 확정되는 대로 안내하겠습니다.' },
    { question: '가격 정책은 언제 공개되나요?', answer: '요금제와 이용 정책은 정식 출시 일정에 맞춰 이 페이지에서 공개할 예정입니다.' },
    { question: '출시 전에 도입 상담이 가능한가요?', answer: '가능합니다. 예상 사용 환경과 연동 요구사항을 문의해 주시면 확인 가능한 범위에서 안내해 드립니다.' },
  ],
  en: [
    { question: 'When will CodeBlue be available?', answer: 'We are preparing for the official service launch. We will announce the release date once it is confirmed.' },
    { question: 'When will pricing be announced?', answer: 'Plans and usage policies will be published on this page alongside the official launch schedule.' },
    { question: 'Can I discuss deployment before launch?', answer: 'Yes. Contact us with your expected environment and integration requirements, and we will share what we can at this stage.' },
  ],
};

export function getFaq(lang: Locale = 'ko'): FAQ[] {
  return faqData[lang];
}

export const faq = faqData.ko;
