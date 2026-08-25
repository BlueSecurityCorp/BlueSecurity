---
title: "뉴스 제목"
description: "목록과 카카오 비즈니스톡에 사용할 한두 문장의 요약"
date: "2026-08-25"
published: false
lang: "ko"
category: "security"
template: "weekly-action-brief"
tags: ["보안", "가이드"]
featured: false
kakaoMessage: "카카오 비즈니스톡 본문에 사용할 400자 이내의 메시지"
kakaoButtonLabel: "자세히 보기"
---

> 작성 전 `C:\Users\JHLBLUE\Documents\GitHub\News\templates`에서 목적에 맞는 원본 템플릿을 선택하고, 해당 파일의 `복사용 본문` 구조를 우선 적용하세요. `previews`의 샘플 데이터와 완성 미리보기는 홈페이지 콘텐츠로 사용하지 않습니다.

독자가 가장 먼저 알아야 할 내용을 짧게 소개합니다.

## 핵심 요약

- 첫 번째 핵심 내용
- 두 번째 핵심 내용
- 지금 확인하거나 대응해야 할 사항

## 자세히 알아보기

뉴스 또는 뉴스레터 본문을 작성하세요.

> 외부 자료를 인용했다면 frontmatter에 `source.name`과 `source.url`을 추가해 주세요.

## 콘텐츠 등록 기준

- `category`: `security`, `industry`, `product`, `newsletter` 중 하나
- `template`: `weekly-action-brief`, `critical-security-alert`, `vulnerability-radar`, `executive-security-brief`, `monthly-threat-deep-dive`, `security-decision-brief`, `visual-news-brief` 중 하나
- 뉴스레터는 `newsletterIssue: 1`처럼 호수를 추가할 수 있습니다.
- 대표 이미지는 `image: "/images/news/파일명.webp"` 형식으로 지정합니다.
- 검토가 끝난 뒤 `published: true`로 변경하면 목록, 상세 페이지, `/news.json`에 함께 반영됩니다.
