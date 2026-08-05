# 마음결 음악치유센터 랜딩페이지

상담이 어렵게 느껴지는 성인과 시니어를 위한 음악치유 프로그램 소개 및 무료체험 신청 랜딩페이지입니다.

- **배포 URL**: https://jisu296387-gif.github.io/jeju_vibe/landing-page/
- **저장소**: https://github.com/jisu296387-gif/jeju_vibe

## 프로젝트 소개

노래, 즉흥연주, 음악감상을 통해 마음을 표현하는 음악치유 프로그램을 소개하는 원페이지 랜딩사이트입니다. 방문자가 프로그램 소개를 보고 하단의 폼으로 무료체험을 신청하면, 신청 내용이 자동으로 접수·저장되고 담당자와 신청자 모두에게 메일이 발송됩니다.

### 주요 구성

- **Hero** — 핵심 메시지와 무료체험 신청 CTA
- **이런 분들을 위한 시간입니다** — 타겟 대상 소개
- **제공 서비스** — 노래로 표현하기 / 즉흥연주 / 음악감상, 개인·그룹 세션, 제주4.3 트라우마 치유 프로그램
- **믿고 함께해온 시간들** — 경력·이력, 후기
- **신청 폼** — 이름/연락처/이메일/희망 프로그램/희망 시간대 입력 후 제출

## 기술 스택

빌드 도구나 패키지 매니저 없이 순수 HTML/CSS/JS로 작성되었습니다.

- `index.html` — 페이지 마크업
- `style.css` — 스타일. 색상·폰트는 `:root`에 CSS 커스텀 프로퍼티로 정의되어 있어, 팔레트를 바꿀 때는 여기서 수정합니다.
- `script.js` — 신청 폼 제출 로직 (`WEBAPP_URL`로 fetch POST)
- `apps-script/Code.gs` — 폼 백엔드 (Google Apps Script)

## 로컬에서 열어보기

별도 빌드 없이 바로 실행할 수 있습니다.

```bash
# 방법 1: 브라우저에서 index.html 직접 열기

# 방법 2: 정적 서버로 실행
python -m http.server
```

## 폼 백엔드 (Google Apps Script) 설정

신청 폼은 이 저장소에서 직접 배포되지 않고, Google 계정에서 별도로 배포해야 합니다.

1. Google Sheet를 하나 만들고, 확장 프로그램 → Apps Script로 들어갑니다.
2. `apps-script/Code.gs` 내용을 붙여넣습니다 (파일 상단 설정 주석 참고).
3. `Code.gs`의 `OWNER_EMAIL` 상수를 신청 알림을 받을 이메일로 설정합니다.
4. 웹 앱으로 배포한 뒤 발급되는 실행(exec) URL을 복사합니다.
5. `script.js`의 `WEBAPP_URL` 상수를 방금 복사한 URL로 교체합니다.

폼 제출 흐름: `index.html`의 `#applyForm` → `script.js`가 `fetch(WEBAPP_URL, ...)`로 JSON을 `text/plain`으로 전송(CORS 프리플라이트 회피) → `Code.gs`의 `doPost()`가 시트에 행 추가 + 담당자 알림 메일 + 신청자 자동회신 메일 발송.

> 신청이 접수되지 않는다면 `WEBAPP_URL`이 비어있거나(플레이스홀더 상태) 최신 배포를 가리키고 있지 않은지 먼저 확인하세요.

## 배포

`main` 브랜치의 `landing-page/` 폴더가 GitHub Pages로 서빙됩니다. 별도의 빌드 단계 없이 파일을 수정하고 커밋·푸시하면 바로 반영됩니다.
