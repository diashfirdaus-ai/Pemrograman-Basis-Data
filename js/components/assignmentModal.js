// Assignment Modal Component for Student Submission & Lecturer Grading
import { MEETINGS_DATA } from '../data/meetings.js';
import { state } from '../state.js';

export function renderAssignmentModal(assignmentId) {
  const meeting = MEETINGS_DATA.find(m => m.assignment.id === assignmentId) || MEETINGS_DATA[0];
  const user = state.getCurrentUser();
  const submissions = state.getSubmissions();
  const userSub = submissions.find(s => s.assignmentId === assignmentId && s.studentNim === user.identifier);

  return `
    <div class="modal-overlay" id="assignmentModal">
      <div class="modal-content" style="max-width: 680px;">
        <div class="modal-header">
          <div>
            <h3 style="font-size: 1.15rem; font-weight: 800;">${meeting.assignment.title}</h3>
            <p style="font-size: 0.775rem; color: var(--accent-amber); font-weight: 600;">
              Batas Pengumpulan: ${meeting.assignment.deadline}
            </p>
          </div>
          <button class="btn btn-secondary btn-icon" onclick="window.app.closeModal()">✕</button>
        </div>

        <form onsubmit="window.app.submitAssignment(event, '${meeting.assignment.id}')">
          <div class="modal-body" style="max-height: 65vh; overflow-y: auto;">
            <!-- Instructions -->
            <div style="background: var(--bg-tertiary); padding: 14px; border-radius: var(--radius-md); margin-bottom: 20px;">
              <h5 style="font-size: 0.825rem; font-weight: 700; color: var(--primary-light); margin-bottom: 4px;">
                Petunjuk Pengerjaan:
              </h5>
              <p style="font-size: 0.85rem; color: var(--text-main); line-height: 1.5;">
                ${meeting.assignment.instructions}
              </p>
            </div>

            <!-- Existing Submission Status -->
            ${userSub ? `
              <div style="padding: 12px; background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.3); border-radius: var(--radius-md); margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                  <span style="font-size: 0.8rem; font-weight: 700; color: var(--accent-emerald);">
                    ✓ Tugas Sudah Dikumpulkan (${userSub.submittedAt})
                  </span>
                  <span class="badge" style="background: ${userSub.status === 'graded' ? 'var(--accent-emerald)' : 'var(--accent-amber)'}; color: white; padding: 2px 8px;">
                    ${userSub.status === 'graded' ? `Nilai: ${userSub.score}/100` : 'Menunggu Penilaian Dosen'}
                  </span>
                </div>
                ${userSub.feedback ? `
                  <p style="font-size: 0.8rem; color: var(--text-main); margin-top: 6px;">
                    <strong>Feedback Dosen:</strong> ${userSub.feedback}
                  </p>
                ` : ''}
              </div>
            ` : ''}

            <!-- Submission Area -->
            <div>
              <label style="font-size: 0.8rem; font-weight: 600; display: block; margin-bottom: 6px;">
                Script SQL / Jawaban Tugas Mahasiswa:
              </label>
              <textarea
                id="assignmentContent"
                class="sql-textarea"
                style="height: 180px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);"
                placeholder="Tuliskan jawaban query SQL, rancangan ERD, atau penjelasan analisis tugas Anda di sini..."
                required
              >${userSub ? userSub.content : ''}</textarea>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onclick="window.app.closeModal()">Tutup</button>
            <button type="submit" class="btn btn-primary">
              ${userSub ? 'Perbarui Pengumpulan' : 'Kirim Tugas'}
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

export function renderLecturerGradingModal(submissionId) {
  const submissions = state.getSubmissions();
  const sub = submissions.find(s => s.id === submissionId);
  if (!sub) return '';

  return `
    <div class="modal-overlay" id="gradingModal">
      <div class="modal-content" style="max-width: 650px;">
        <div class="modal-header">
          <div>
            <h3 style="font-size: 1.15rem; font-weight: 800;">Penilaian Tugas Mahasiswa</h3>
            <p style="font-size: 0.775rem; color: var(--text-muted);">
              Mahasiswa: <strong>${sub.studentName}</strong> (${sub.studentNim}) • Tugas: ${sub.assignmentId.toUpperCase()}
            </p>
          </div>
          <button class="btn btn-secondary btn-icon" onclick="window.app.closeModal()">✕</button>
        </div>

        <form onsubmit="window.app.saveLecturerGrade(event, '${sub.id}')">
          <div class="modal-body" style="max-height: 65vh; overflow-y: auto;">
            <!-- Student Submission Content -->
            <label style="font-size: 0.775rem; font-weight: 700; color: var(--text-dim); text-transform: uppercase;">
              Jawaban yang Dikirimkan Mahasiswa:
            </label>
            <pre style="background: #0d1117; padding: 14px; border-radius: var(--radius-md); font-size: 0.85rem; color: #58a6ff; margin: 8px 0 20px; max-height: 180px; overflow-y: auto;"><code>${sub.content}</code></pre>

            <!-- Grading Inputs -->
            <div style="margin-bottom: 16px;">
              <label style="font-size: 0.8rem; font-weight: 600; display: block; margin-bottom: 6px;">
                Nilai Angka (0 - 100):
              </label>
              <input
                type="number"
                id="gradeScore"
                min="0"
                max="100"
                step="0.5"
                value="${sub.score !== null ? sub.score : 85}"
                style="width: 100%; padding: 10px 14px; background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); color: var(--text-main); font-size: 0.9rem;"
                required
              >
            </div>

            <div>
              <label style="font-size: 0.8rem; font-weight: 600; display: block; margin-bottom: 6px;">
                Catatan / Feedback untuk Mahasiswa:
              </label>
              <textarea
                id="gradeFeedback"
                rows="3"
                style="width: 100%; padding: 10px 14px; background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); color: var(--text-main); font-size: 0.85rem; font-family: inherit;"
                placeholder="Berikan masukan konstruktif mengenai query SQL atau struktur normalisasi mahasiswa..."
              >${sub.feedback || 'Struktur query sudah tepat dan logika relasi berjalan dengan baik.'}</textarea>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onclick="window.app.closeModal()">Batal</button>
            <button type="submit" class="btn btn-emerald">Simpan Nilai & Feedback</button>
          </div>
        </form>
      </div>
    </div>
  `;
}
