// Quiz Modal Component for DBLearn
import { MEETINGS_DATA } from '../data/meetings.js';
import { state } from '../state.js';

export function renderQuizModal(meetingId) {
  const id = parseInt(meetingId, 10);
  const meeting = MEETINGS_DATA.find(m => m.id === id);
  if (!meeting || !meeting.quiz) return '';

  const questionsHtml = meeting.quiz.questions.map((q, idx) => {
    let optionsHtml = '';
    if (q.type === 'mc') {
      optionsHtml = q.options.map((opt, optIdx) => `
        <label style="display: flex; align-items: center; gap: 10px; padding: 10px 14px; background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); margin-bottom: 8px; cursor: pointer; transition: var(--trans-fast);">
          <input type="radio" name="question_${q.id}" value="${optIdx}" required>
          <span style="font-size: 0.85rem; color: var(--text-main);">${opt}</span>
        </label>
      `).join('');
    } else if (q.type === 'tf') {
      optionsHtml = `
        <label style="display: flex; align-items: center; gap: 10px; padding: 10px 14px; background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); margin-bottom: 8px; cursor: pointer;">
          <input type="radio" name="question_${q.id}" value="true" required>
          <span style="font-size: 0.85rem; color: var(--text-main);">Benar (True)</span>
        </label>
        <label style="display: flex; align-items: center; gap: 10px; padding: 10px 14px; background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); margin-bottom: 8px; cursor: pointer;">
          <input type="radio" name="question_${q.id}" value="false" required>
          <span style="font-size: 0.85rem; color: var(--text-main);">Salah (False)</span>
        </label>
      `;
    }

    return `
      <div class="card" style="margin-bottom: 16px; background: var(--bg-secondary);">
        <div style="font-size: 0.75rem; font-weight: 700; color: var(--primary-light); margin-bottom: 4px;">
          SOAL ${idx + 1} DARI ${meeting.quiz.questions.length}
        </div>
        <p style="font-size: 0.95rem; font-weight: 600; margin-bottom: 14px; color: var(--text-main);">
          ${q.question}
        </p>
        <div>
          ${optionsHtml}
        </div>
        <div id="feedback_${q.id}" style="display: none; margin-top: 10px; padding: 10px; border-radius: var(--radius-sm); font-size: 0.8rem; line-height: 1.5;"></div>
      </div>
    `;
  }).join('');

  return `
    <div class="modal-overlay" id="quizModal">
      <div class="modal-content" style="max-width: 700px;">
        <div class="modal-header">
          <div>
            <h3 style="font-size: 1.15rem; font-weight: 800;">${meeting.quiz.title}</h3>
            <p style="font-size: 0.775rem; color: var(--text-muted);">Pilih jawaban yang paling tepat kemudian klik Submit Kuis</p>
          </div>
          <button class="btn btn-secondary btn-icon" onclick="window.app.closeModal()">✕</button>
        </div>

        <form id="quizForm" onsubmit="window.app.submitQuiz(event, ${meeting.id})">
          <div class="modal-body" style="max-height: 65vh; overflow-y: auto;">
            ${questionsHtml}
          </div>

          <div class="modal-footer">
            <div id="quizResultSummary" style="margin-right: auto; font-size: 0.9rem; font-weight: 700;"></div>
            <button type="button" class="btn btn-secondary" onclick="window.app.closeModal()">Batal</button>
            <button type="submit" class="btn btn-primary" id="btnSubmitQuiz">Submit Jawaban</button>
          </div>
        </form>
      </div>
    </div>
  `;
}
