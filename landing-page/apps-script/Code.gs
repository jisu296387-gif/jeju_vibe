/**
 * 마음결 음악치유센터 - 무료체험 신청 백엔드
 *
 * 배포 방법:
 * 1. sheets.google.com 에서 새 스프레드시트를 만들고, 주소창 URL에서
 *    /d/ 와 /edit 사이의 문자열(스프레드시트 ID)을 복사해 아래 SHEET_ID에 붙여넣기
 * 2. 스프레드시트 메뉴 확장 프로그램 > Apps Script 클릭
 * 3. 기본 코드를 지우고 이 파일 전체 내용을 붙여넣기
 * 4. 배포 > 새 배포 > 유형: 웹 앱
 *    - 실행 계정: 나
 *    - 액세스 권한: 모든 사용자
 * 5. 배포를 누르고 구글 계정 권한(Gmail 발송, 시트 접근) 승인
 * 6. 발급된 웹 앱 URL을 복사해 script.js의 WEBAPP_URL 상수에 붙여넣기
 */

const SHEET_ID = '1Pq4JZYF4FMgsNv_DiHCqsWm1reqYB8FX0zmertppIC0';
const SHEET_NAME = '신청내역';
const OWNER_EMAIL = 'jisu2963@naver.com';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const name = (data.name || '').toString().trim();
    const phone = (data.phone || '').toString().trim();
    const email = (data.email || '').toString().trim();
    const program = (data.program || '').toString().trim();
    const time = (data.time || '').toString().trim();
    const message = (data.message || '').toString().trim();

    if (!name || !email) {
      throw new Error('이름과 이메일은 필수입니다.');
    }

    appendToSheet(name, phone, email, program, time, message);
    notifyOwner(name, phone, email, program, time, message);
    sendAutoReply(name, email);

    return jsonOutput({ result: 'success' });
  } catch (err) {
    return jsonOutput({ result: 'error', message: err.message });
  }
}

function appendToSheet(name, phone, email, program, time, message) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['접수일시', '이름', '연락처', '이메일', '희망 프로그램', '희망 시간대', '남긴 말']);
  }
  sheet.appendRow([new Date(), name, phone, email, program, time, message]);
}

function notifyOwner(name, phone, email, program, time, message) {
  MailApp.sendEmail({
    to: OWNER_EMAIL,
    subject: '[마음결 음악치유센터] 새 무료체험 신청 - ' + name,
    body:
      '새로운 무료체험 신청이 접수되었습니다.\n\n' +
      '이름: ' + name + '\n' +
      '연락처: ' + phone + '\n' +
      '이메일: ' + email + '\n' +
      '희망 체험 프로그램: ' + program + '\n' +
      '희망 체험 시간대: ' + time + '\n' +
      '남긴 말: ' + (message || '(없음)')
  });
}

function sendAutoReply(name, email) {
  MailApp.sendEmail({
    to: email,
    subject: '[마음결 음악치유센터] 무료체험 신청이 접수되었습니다',
    body:
      name + '님, 안녕하세요.\n\n' +
      '마음결 음악치유센터 무료체험 신청이 정상적으로 접수되었습니다.\n' +
      '입력해주신 연락처로 담당 선생님이 편하신 시간에 맞춰 연락드리겠습니다.\n\n' +
      '감사합니다.\n마음결 음악치유센터 드림'
  });
}

function jsonOutput(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
