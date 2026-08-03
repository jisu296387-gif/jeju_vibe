// 배포한 구글 앱스 스크립트 웹앱 URL로 교체하세요 (apps-script/Code.gs 참고)
const WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbxh7m7dGiQjVvbqhPzG3hkauEvhjZgLlUwLcKhZt5DnGBv2HwXnqgci1Ii5ahwt6QJR/exec';

const form = document.getElementById('applyForm');
const statusEl = document.getElementById('formStatus');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  if (!name || !email) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = '접수 중...';
  statusEl.textContent = '신청을 접수하고 있습니다...';
  statusEl.className = 'form-status pending';

  const payload = {
    name: name,
    phone: form.phone.value.trim(),
    email: email,
    program: form.program.value,
    time: form.time.value,
    message: form.message.value.trim()
  };

  try {
    const res = await fetch(WEBAPP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();

    if (!data || data.result !== 'success') {
      throw new Error((data && data.message) || '알 수 없는 오류');
    }

    statusEl.textContent = '신청이 접수되었습니다. 입력하신 이메일로 확인 메일을 보내드렸어요.';
    statusEl.className = 'form-status success';
    form.reset();
  } catch (err) {
    statusEl.textContent = '접수 중 문제가 발생했습니다. 잠시 후 다시 시도해주시거나 전화로 문의해주세요.';
    statusEl.className = 'form-status error';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
});
