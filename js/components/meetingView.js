// Meeting Detail View Component — White & ITENAS Orange Theme
import { MEETINGS_DATA } from '../data/meetings.js';
import { state } from '../state.js';

export function renderMeetingView(meetingId) {
  const id = parseInt(meetingId, 10);
  const meeting = MEETINGS_DATA.find(m => m.id === id) || MEETINGS_DATA[0];
  const isCompleted = state.isMeetingCompleted(id);
  const quizScores = state.getQuizScores();
  const meetingScore = quizScores[id];

  const objectivesHtml = meeting.objectives.map(obj => `
    <li style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px; font-size: 0.95rem; color: var(--text-main); line-height: 1.65;">
      <span style="color: var(--accent-emerald); font-weight: 800; font-size: 1rem; margin-top: 1px;">✓</span>
      <span>${obj}</span>
    </li>
  `).join('');

  // Interactive ERD Box for P2
  const erdHtml = meeting.erdData ? `
    <div class="card" style="padding: 28px 32px; margin: 32px 0; background: #fafafa; border-color: var(--primary-subtle-border);">
      <h4 style="font-size: 1rem; font-weight: 800; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; color: var(--text-main);">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2.2"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></svg>
        Visualisasi ERD (Entity Relationship Diagram)
      </h4>
      <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center; justify-content: center;">
        ${meeting.erdData.entities.map((e, idx) => `
          <div style="background: var(--bg-secondary); border: 2px solid ${idx === 1 ? 'var(--accent-cyan)' : 'var(--primary)'}; border-radius: var(--radius-md); width: 230px; overflow: hidden; box-shadow: var(--shadow-sm);">
            <div style="background: ${idx === 1 ? 'var(--accent-cyan-subtle)' : 'var(--primary-subtle)'}; padding: 10px; font-weight: 800; font-size: 0.875rem; text-align: center; border-bottom: 1px solid var(--border-subtle); color: var(--text-main);">
              ${e.name}
            </div>
            <ul style="list-style: none; padding: 14px; font-size: 0.8rem; font-family: 'JetBrains Mono', monospace; margin: 0;">
              ${e.attrs.map(a => `<li style="margin-bottom: 6px; color: ${a.includes('PK') ? 'var(--accent-amber)' : (a.includes('FK') ? 'var(--accent-cyan)' : 'var(--text-muted)')}; font-weight: ${a.includes('PK') || a.includes('FK') ? '700' : 'normal'};">${a}</li>`).join('')}
            </ul>
          </div>
          ${idx < meeting.erdData.entities.length - 1 ? `<div style="font-size: 1.5rem; color: var(--primary); font-weight: 800;">⇄</div>` : ''}
        `).join('')}
      </div>
    </div>
  ` : '';

  return `
    <div class="meeting-view">
      <!-- Header Breadcrumbs & Status -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; flex-wrap: wrap; gap: 14px;">
        <div style="font-size: 0.85rem; color: var(--text-dim); display: flex; align-items: center; gap: 8px;">
          <a href="#/landing" onclick="window.router.navigate('landing'); return false;" style="color: var(--text-muted); text-decoration: none;">Beranda</a>
          <span>/</span>
          <a href="#/dashboard" onclick="window.router.navigate('dashboard'); return false;" style="color: var(--text-muted); text-decoration: none;">Pertemuan</a>
          <span>/</span>
          <span style="color: var(--primary); font-weight: 700;">Pertemuan ${meeting.id}</span>
        </div>

        <div style="display: flex; align-items: center; gap: 14px;">
          <button class="btn ${isCompleted ? 'btn-emerald' : 'btn-secondary'} btn-sm" style="padding: 7px 14px;" onclick="window.app.toggleMeeting(${meeting.id})">
            ${isCompleted ? '✓ Selesai Dipelajari' : 'Tandai Selesai'}
          </button>
          ${meetingScore !== undefined ? `
            <span class="badge" style="background: var(--accent-emerald-subtle); color: var(--accent-emerald); font-weight: 700; padding: 7px 14px; border-radius: var(--radius-sm); font-size: 0.8rem; border: 1px solid rgba(5,150,105,0.2);">
              Skor Kuis: ${meetingScore}/100
            </span>
          ` : ''}
        </div>
      </div>

      <!-- Title Banner -->
      <div class="card" style="padding: 36px 40px; margin-bottom: 32px; background: linear-gradient(135deg, #fff7ed 0%, #ffffff 100%); border-color: var(--primary-subtle-border);">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 14px;">
          <span class="badge" style="background: var(--primary); color: white; font-weight: 800; padding: 5px 14px; border-radius: var(--radius-sm); font-size: 0.775rem; letter-spacing: 0.02em;">
            Pertemuan ${meeting.id} dari 14
          </span>
          <span style="font-size: 0.85rem; color: var(--text-dim); font-weight: 600;">Durasi: ${meeting.duration}</span>
        </div>
        <h1 style="font-size: 2.2rem; font-weight: 800; letter-spacing: -0.025em; margin-bottom: 10px; color: var(--text-main); line-height: 1.25;">${meeting.title}</h1>
        <p style="font-size: 1.05rem; color: var(--text-muted); line-height: 1.65; max-width: 860px;">${meeting.subtitle}</p>
      </div>

      <!-- Learning Objectives -->
      <div class="card" style="padding: 32px 36px; margin-bottom: 32px; border-left: 4px solid var(--primary);">
        <h3 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 18px; display: flex; align-items: center; gap: 10px; color: var(--text-main);">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2.2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
          Capaian Pembelajaran (Learning Objectives)
        </h3>
        <ul style="list-style: none; padding: 0; margin: 0;">
          ${objectivesHtml}
        </ul>
      </div>

      <!-- Main Lecture Content -->
      <div class="card" style="padding: 36px 40px; margin-bottom: 32px; line-height: 1.8;">
        <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 24px; border-bottom: 1.5px solid var(--border-base); padding-bottom: 12px; color: var(--text-main);">
          Modul & Materi Perkuliahan
        </h3>
        <div class="lecture-body" style="font-size: 0.975rem; color: #334155;">
          ${meeting.content}
        </div>
        ${erdHtml}
      </div>

      <!-- Code Example Box -->
      <div class="card" style="padding: 28px 32px; margin-bottom: 32px; background: #0f172a; border-color: #334155;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; border-bottom: 1px solid #1e293b; padding-bottom: 14px; flex-wrap: wrap; gap: 12px;">
          <span style="font-size: 0.85rem; font-weight: 700; color: #fb923c; font-family: 'JetBrains Mono', monospace;">
            // Contoh Sintaks SQL Perkuliahan
          </span>
          <div style="display: flex; gap: 10px;">
            <button class="btn btn-secondary btn-sm" style="background: #1e293b; color: #f8fafc; border-color: #334155; padding: 6px 14px;" onclick="navigator.clipboard.writeText(\`${meeting.codeSnippet.replace(/`/g, '\\`')}\`); alert('Kode berhasil disalin!');">
              Salin Kode
            </button>
            <button class="btn btn-primary btn-sm" style="padding: 6px 16px;" onclick="window.app.openQueryInPlayground(\`${(meeting.suggestedPlaygroundQuery || meeting.codeSnippet).replace(/`/g, '\\`')}\`)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              Coba di Simulator Visual →
            </button>
          </div>
        </div>
        <pre style="margin: 0; padding: 18px 20px; font-size: 0.9rem; color: #38bdf8; overflow-x: auto; font-family: 'JetBrains Mono', monospace; line-height: 1.7; background: #090d16; border-radius: var(--r-md); border: 1px solid #1e293b;"><code>${escapeHtml(meeting.codeSnippet)}</code></pre>
      </div>

      <!-- Actions: Quiz & Assignment Launcher -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-bottom: 48px;">
        <div class="card card-interactive" style="padding: 28px 32px; cursor: pointer;" onclick="window.app.openQuizModal(${meeting.id})">
          <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 18px;">
            <div style="width: 48px; height: 48px; border-radius: var(--radius-md); background: var(--primary-subtle); display: flex; align-items: center; justify-content: center; color: var(--primary); flex-shrink: 0;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            </div>
            <div>
              <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--text-main); margin-bottom: 4px;">Kuis Pertemuan ${meeting.id}</h4>
              <p style="font-size: 0.85rem; color: var(--text-muted);">${meeting.quiz.questions.length} Soal Evaluasi Konsep & Query</p>
            </div>
          </div>
          <button class="btn btn-primary" style="width: 100%; padding: 10px 16px; font-size: 0.875rem;">
            ${meetingScore !== undefined ? `Ulangi Kuis (Nilai: ${meetingScore})` : 'Mulai Evaluasi Kuis →'}
          </button>
        </div>

        <div class="card card-interactive" style="padding: 28px 32px; cursor: pointer;" onclick="window.app.openAssignmentModal('${meeting.assignment.id}')">
          <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 18px;">
            <div style="width: 48px; height: 48px; border-radius: var(--radius-md); background: var(--accent-amber-subtle); display: flex; align-items: center; justify-content: center; color: var(--accent-amber); flex-shrink: 0;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
            </div>
            <div>
              <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--text-main); margin-bottom: 4px;">${meeting.assignment.title}</h4>
              <p style="font-size: 0.85rem; color: var(--text-muted);">Batas Pengumpulan: ${meeting.assignment.deadline}</p>
            </div>
          </div>
          <button class="btn btn-secondary" style="width: 100%; padding: 10px 16px; font-size: 0.875rem;">
            Buka Instruksi Tugas →
          </button>
        </div>
      </div>
    </div>
  `;
}

function escapeHtml(str) {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
