# 2026년 수학체험센터 여름방학캠프

**AI로 만나는 수학, AI에 깃든 수학** — 고등학생 대상 AI 수학 캠프의 웹 학습지 모음.

## 구성

| 파일 | 내용 |
|---|---|
| `index.html` | 학습 경로 인덱스 (학습지 4종 순차 잠금 + 보너스 활동) |
| `logic.html` | ① 논리 연산 — 진리표·회로·XOR·퍼셉트론 |
| `ai-thinking.html` | ② AI는 어떻게 생각을 할까? — 지도·비지도·강화학습 |
| `image-data.html` | ③ 이미지 데이터 처리 — RGB 색공간·행렬·색 반전 |
| `text-data.html` + `data.js` | ④ 텍스트 데이터 처리 — 속성 벡터·코사인 유사도 |

각 학습지는 단일 HTML 웹앱(오프라인 동작)이며, 진행 상태는 브라우저 localStorage(`aimath26_*`)에 저장됩니다.
인덱스의 교사 패널(제목 5번 탭 또는 Alt+R)에서 기기 단위 전체 초기화가 가능합니다.

## 서드파티

- [KaTeX](https://katex.org) 0.16.22 — MIT (`katex/LICENSE`)
- [three.js](https://threejs.org) r128 — MIT (`three.min.js`, `image-data.html`에서 사용)

수업용 자료입니다.
