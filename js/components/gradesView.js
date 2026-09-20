// Gradebook / Sistem Nilai Component for DBLearn
import { state } from '../state.js';
import { MEETINGS_DATA } from '../data/meetings.js';
import { CLASS_STUDENTS } from '../data/mockData.js';

export function renderGradesView() {
  const role = state.getCurrentRole();
  const user = state.getCurrentUser();
  const quizScores = state.getQuizScores();
  const submissions = state.getSubmissions();

  // Student specific calculations
  const quizValues = Object.values(quizScores);
  const quizAvg = quizValues.length > 0 ? (quizValues.reduce((a, b) => a + b, 0) / quizValues.length).toFixed(1) : '0';

  const userSubs = submissions.filter(s => s.studentNim === user.identifier && s.status === 'graded');
  const asgAvg = userSubs.length > 0 ? (userSubs.reduce((a, b) => a + (b.score || 0), 0) / userSubs.length).toFixed(1) : '91.0';

  const praktikum = 90.0;
  const uts = 88.0;
  const finalProject = 92.0;

  // PRD Weights: Quiz 15%, Assignment 20%, Praktikum 20%, UTS 20%, Final Project 25%
  const finalWeightedScore = (
    (Number(quizAvg) * 0.15) +
    (Number(asgAvg) * 0.20) +
    (praktikum * 0.20) +
    (uts * 0.20) +
    (finalProject * 0.25)
  ).toFixed(2);

  let gradeLetter = 'E';
  let predicate = 'Tidak Lulus';
  if (finalWeightedScore >= 80) { gradeLetter = 'A'; predicate = 'Sangat Memuaskan (Cum Laude)'; }
  else if (finalWeightedScore >= 73) { gradeLetter = 'AB'; predicate = 'Memuaskan'; }
  else if (finalWeightedScore >= 65) { gradeLetter = 'B'; predicate = 'Baik'; }
  else if (finalWeightedScore >= 58) { gradeLetter = 'BC'; predicate = 'Cukup Baik'; }
  else if (finalWeightedScore >= 50) { gradeLetter = 'C'; predicate = 'Cukup'; }
  else if (finalWeightedScore >= 40) { gradeLetter = 'D'; predicate = 'Kurang'; }

  // Quiz details rows
  const quizRows = MEETINGS_DATA.map(m => {
    const score = quizScores[m.id];
    return `
      <tr>
        <td style="font-weight: 600;">Pertemuan ${m.id}</td>
        <td>${m.title}</td>
        <td style="font-family: 'JetBrains Mono', monospace;">
          ${score !== undefined ? `<span style="color: var(--accent-emerald); font-weight: 700;">${score}</span>` : '<span style="color: var(--text-dim);">Belum Dikerjakan</span>'}
        </td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="window.app.openQuizModal(${m.id})">
            ${score !== undefined ? 'Ulangi Kuis' : 'Kerjakan'}
          </button>
        </td>
      </tr>
    `;
  }).join('');

  // Assignment details rows
  const assignmentRows = MEETINGS_DATA.slice(0, 7).map(m => {
    const sub = submissions.find(s => s.assignmentId === m.assignment.id && s.studentNim === user.identifier);
    return `
      <tr>
        <td style="font-weight: 600;">${m.assignment.title}</td>
        <td style="font-size: 0.8rem; color: var(--text-muted);">${m.assignment.deadline}</td>
        <td>
          ${sub ? (sub.status === 'graded' ? `<span style="color: var(--accent-emerald); font-weight: 700;">${sub.score} / 100</span>` : '<span style="color: var(--accent-amber);">Menunggu Review</span>') : '<span style="color: var(--text-dim);">Belum Dikumpulkan</span>'}
        </td>
        <td style="font-size: 0.8rem; color: var(--text-muted);">${sub && sub.feedback ? sub.feedback : '-'}</td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="window.app.openAssignmentModal('${m.assignment.id}')">
            ${sub ? 'Lihat / Edit' : 'Kumpulkan'}
          </button>
        </td>
      </tr>
    `;
  }).join('');

  return `
    <div class="grades-view">
      <!-- Header -->
      <div style="margin-bottom: 24px;">
        <h2 style="font-size: 1.8rem; font-weight: 800; letter-spacing: -0.02em;">
          Sistem Nilai & Evaluasi Akademik
        </h2>
        <p style="color: var(--text-muted); font-size: 0.875rem;">
          Mata Kuliah: Pemrograman Basis Data (3 SKS) • Semester Ganjil 2026/2027
        </p>
      </div>

      <!-- Weightings & Final Grade Card -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
        <!-- Weights Info -->
        <div class="card">
          <h3 style="font-size: 1rem; font-weight: 700; margin-bottom: 12px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 8px;">
            Komposisi Bobot Nilai (PRD Standar)
          </h3>
          <table class="table-sql">
            <thead>
              <tr>
                <th>Komponen Evaluasi</th>
                <th style="text-align: right;">Bobot (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Quiz Interaktif</td><td style="text-align: right; font-weight: 700;">15%</td></tr>
              <tr><td>Tugas & Assignment</td><td style="text-align: right; font-weight: 700;">20%</td></tr>
              <tr><td>Praktikum Lab</td><td style="text-align: right; font-weight: 700;">20%</td></tr>
              <tr><td>Ujian Tengah Semester (UTS)</td><td style="text-align: right; font-weight: 700;">20%</td></tr>
              <tr><td>Final Project Terintegrasi</td><td style="text-align: right; font-weight: 700;">25%</td></tr>
              <tr style="background: rgba(99,102,241,0.1);"><td style="font-weight: 800;">Total Akumulasi</td><td style="text-align: right; font-weight: 800; color: var(--primary-light);">100%</td></tr>
            </tbody>
          </table>
        </div>

        <!-- Student Grade Card -->
        <div class="card" style="background: linear-gradient(135deg, rgba(79,70,229,0.15), rgba(16,185,129,0.08)); border-color: rgba(99,102,241,0.3); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <span style="font-size: 0.725rem; font-weight: 700; color: var(--primary-light); text-transform: uppercase;">Transkrip Sementara</span>
            <div style="display: flex; align-items: baseline; gap: 16px; margin: 12px 0;">
              <span style="font-size: 3.5rem; font-weight: 800; color: var(--text-main); line-height: 1;">${finalWeightedScore}</span>
              <span style="font-size: 2.2rem; font-weight: 800; color: var(--accent-emerald);">${gradeLetter}</span>
            </div>
            <div style="font-size: 0.9rem; font-weight: 600; color: var(--accent-emerald);">${predicate}</div>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 6px;">
              Mahasiswa: <strong>${user.name}</strong> (${user.identifier})
            </p>
          </div>

          <div style="background: var(--bg-secondary); padding: 12px; border-radius: var(--radius-md); font-size: 0.775rem; color: var(--text-muted); margin-top: 16px;">
            ℹ️ Nilai akhir dihitung secara otomatis berdasarkan rata-rata kuis (15%), tugas (20%), praktikum (20%), UTS (20%), dan proyek akhir (25%).
          </div>
        </div>
      </div>

      <!-- Quiz Breakdown -->
      <div class="card" style="margin-bottom: 24px;">
        <h3 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 16px;">
          📝 Rincian Nilai Kuis (14 Pertemuan)
        </h3>
        <div style="overflow-x: auto;">
          <table class="table-sql">
            <thead>
              <tr>
                <th>Pertemuan</th>
                <th>Materi Kuis</th>
                <th>Nilai (0-100)</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              ${quizRows}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Assignment Breakdown -->
      <div class="card">
        <h3 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 16px;">
          📋 Rincian Pengumpulan Tugas Perkuliahan
        </h3>
        <div style="overflow-x: auto;">
          <table class="table-sql">
            <thead>
              <tr>
                <th>Judul Tugas</th>
                <th>Deadline</th>
                <th>Status / Nilai</th>
                <th>Feedback Dosen</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              ${assignmentRows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}
