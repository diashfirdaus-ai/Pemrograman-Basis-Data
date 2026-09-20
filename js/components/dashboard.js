// Dashboard Component for Student & Lecturer — White & ITENAS Orange Theme
import { state } from '../state.js';
import { MEETINGS_DATA } from '../data/meetings.js';
import { ANNOUNCEMENTS, CLASS_STUDENTS } from '../data/mockData.js';

export function renderDashboard() {
  const role = state.getCurrentRole();
  const user = state.getCurrentUser();
  const completedMeetings = state.getCompletedMeetings();
  const currentMeetingId = state.getCurrentMeetingId();
  const currentMeeting = MEETINGS_DATA.find(m => m.id === currentMeetingId) || MEETINGS_DATA[0];
  const progressPercent = Math.round((completedMeetings.length / 14) * 100);

  if (role === 'dosen') {
    return renderLecturerDashboard(user);
  }

  // Student Dashboard
  const announcementsHtml = ANNOUNCEMENTS.map(ann => `
    <div style="padding: 14px; background: var(--bg-tertiary); border-radius: var(--radius-md); border-left: 4px solid var(--primary); margin-bottom: 12px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
        <h5 style="font-size: 0.875rem; font-weight: 700; color: var(--text-main);">${ann.title}</h5>
        <span style="font-size: 0.7rem; color: var(--text-dim); font-weight: 600;">${ann.date}</span>
      </div>
      <p style="font-size: 0.825rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 6px;">${ann.content}</p>
      <span style="font-size: 0.725rem; color: var(--primary); font-weight: 700;">Pengampu: ${ann.author}</span>
    </div>
  `).join('');

  return `
    <div class="dashboard-view">
      <!-- Welcome & Continue Learning Card -->
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px; margin-bottom: 24px;">
        <div class="card" style="background: linear-gradient(135deg, #fff7ed 0%, #ffffff 100%); border-color: var(--primary-subtle-border);">
          <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 12px;">
            <div class="avatar" style="width: 46px; height: 46px; font-size: 1.15rem;">${user.avatar}</div>
            <div>
              <h2 style="font-size: 1.4rem; font-weight: 800; letter-spacing: -0.02em; color: var(--text-main);">
                Halo, ${user.name}! 👋
              </h2>
              <p style="font-size: 0.85rem; color: var(--text-muted);">
                Mata Kuliah: <strong>Pemrograman Basis Data</strong> (${user.prodi} — ITENAS)
              </p>
            </div>
          </div>

          <!-- Progress Bar -->
          <div style="margin: 20px 0 16px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700; margin-bottom: 8px;">
              <span style="color: var(--text-main);">Progres Belajar 14 Pertemuan</span>
              <span style="color: var(--primary);">${progressPercent}% (${completedMeetings.length}/14 Selesai)</span>
            </div>
            <div style="width: 100%; height: 10px; background: #e2e8f0; border-radius: var(--radius-full); overflow: hidden;">
              <div style="width: ${progressPercent}%; height: 100%; background: linear-gradient(90deg, var(--primary), #fb923c); border-radius: var(--radius-full); transition: width 0.5s ease;"></div>
            </div>
          </div>

          <!-- Current Meeting Highlight -->
          <div style="background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 16px; display: flex; align-items: center; justify-content: space-between; margin-top: 16px; box-shadow: var(--shadow-sm);">
            <div>
              <span style="font-size: 0.725rem; font-weight: 800; color: var(--primary); text-transform: uppercase; letter-spacing: 0.05em;">Pertemuan Lanjutan</span>
              <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--text-main); margin-top: 2px;">Pertemuan ${currentMeeting.id}: ${currentMeeting.title}</h4>
              <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">${currentMeeting.subtitle}</p>
            </div>
            <button class="btn btn-primary btn-sm" onclick="window.router.navigate('meeting', ${currentMeeting.id})">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Lanjutkan Belajar
            </button>
          </div>
        </div>

        <!-- Quick Stats Card -->
        <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
          <h3 style="font-size: 1rem; font-weight: 800; color: var(--text-main); margin-bottom: 12px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 8px;">
            Statistik Pembelajaran
          </h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; flex: 1;">
            <div style="background: var(--bg-tertiary); padding: 12px; border-radius: var(--radius-md); text-align: center;">
              <div style="font-size: 1.6rem; font-weight: 800; color: var(--primary);">${completedMeetings.length} / 14</div>
              <div style="font-size: 0.725rem; color: var(--text-muted); font-weight: 600;">Pertemuan Selesai</div>
            </div>
            <div style="background: var(--bg-tertiary); padding: 12px; border-radius: var(--radius-md); text-align: center;">
              <div style="font-size: 1.6rem; font-weight: 800; color: var(--accent-emerald);">95.8</div>
              <div style="font-size: 0.725rem; color: var(--text-muted); font-weight: 600;">Rata-rata Kuis</div>
            </div>
            <div style="background: var(--bg-tertiary); padding: 12px; border-radius: var(--radius-md); text-align: center;">
              <div style="font-size: 1.6rem; font-weight: 800; color: var(--accent-cyan);">4</div>
              <div style="font-size: 0.725rem; color: var(--text-muted); font-weight: 600;">Tugas Terkumpul</div>
            </div>
            <div style="background: var(--bg-tertiary); padding: 12px; border-radius: var(--radius-md); text-align: center;">
              <div style="font-size: 1.6rem; font-weight: 800; color: var(--accent-amber);">1</div>
              <div style="font-size: 0.725rem; color: var(--text-muted); font-weight: 600;">Final Project</div>
            </div>
          </div>
          <button class="btn btn-orange-outline btn-sm" style="width: 100%; margin-top: 14px;" onclick="window.router.navigate('playground')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            Buka Simulator Visual SQL
          </button>
        </div>
      </div>

      <!-- Announcements & Activity -->
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3 style="font-size: 1.1rem; font-weight: 800; color: var(--text-main);">📢 Pengumuman Perkuliahan Terkini</h3>
          <span style="font-size: 0.75rem; color: var(--text-dim); font-weight: 600;">Semester Ganjil 2026/2027 • ITENAS</span>
        </div>
        ${announcementsHtml}
      </div>
    </div>
  `;
}

function renderLecturerDashboard(user) {
  const submissions = state.getSubmissions();
  const pendingSubmissions = submissions.filter(s => s.status === 'pending');

  const pendingHtml = pendingSubmissions.length === 0 ? `
    <p style="color: var(--text-muted); font-size: 0.85rem; padding: 12px 0;">Tidak ada tugas yang menunggu penilaian.</p>
  ` : pendingSubmissions.map(s => `
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: var(--bg-tertiary); border-radius: var(--radius-md); margin-bottom: 8px;">
      <div>
        <div style="font-size: 0.875rem; font-weight: 700; color: var(--text-main);">${s.studentName} (${s.studentNim})</div>
        <div style="font-size: 0.75rem; color: var(--text-muted);">Tugas: ${s.assignmentId.toUpperCase()} • Dikirim: ${s.submittedAt}</div>
      </div>
      <button class="btn btn-emerald btn-sm" onclick="window.app.openGradingModal('${s.id}')">
        Beri Nilai & Feedback
      </button>
    </div>
  `).join('');

  const studentRows = CLASS_STUDENTS.map(s => {
    const finalScore = (
      (s.quizAvg * 0.15) +
      (s.asgAvg * 0.20) +
      (s.praktikum * 0.20) +
      (s.uts * 0.20) +
      (s.finalProject * 0.25)
    ).toFixed(1);

    let gradeLetter = 'E';
    if (finalScore >= 80) gradeLetter = 'A';
    else if (finalScore >= 73) gradeLetter = 'AB';
    else if (finalScore >= 65) gradeLetter = 'B';
    else if (finalScore >= 58) gradeLetter = 'BC';
    else if (finalScore >= 50) gradeLetter = 'C';
    else if (finalScore >= 40) gradeLetter = 'D';

    return `
      <tr>
        <td style="font-weight: 700; font-family: 'JetBrains Mono', monospace; color: var(--text-main);">${s.nim}</td>
        <td style="font-weight: 600; color: var(--text-main);">${s.name}</td>
        <td>${s.prodi}</td>
        <td>${s.quizAvg}</td>
        <td>${s.asgAvg}</td>
        <td>${s.praktikum}</td>
        <td>${s.uts}</td>
        <td>${s.finalProject}</td>
        <td style="font-weight: 800; color: var(--primary);">${finalScore}</td>
        <td><span class="badge" style="background: var(--accent-emerald-subtle); color: var(--accent-emerald); font-weight: 700; padding: 2px 8px; border-radius: 4px;">${gradeLetter}</span></td>
      </tr>
    `;
  }).join('');

  return `
    <div class="lecturer-dashboard-view">
      <!-- Lecturer Header -->
      <div style="margin-bottom: 24px;">
        <h2 style="font-size: 1.6rem; font-weight: 800; color: var(--text-main);">Dashboard Dosen — Pemrograman Basis Data</h2>
        <p style="color: var(--text-muted); font-size: 0.85rem;">Pengampu: <strong>${user.name} (${user.identifier})</strong> • Program Studi ${user.prodi} ITENAS</p>
      </div>

      <!-- Stats Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 24px;">
        <div class="card">
          <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600; margin-bottom: 4px;">Total Mahasiswa Terdaftar</div>
          <div style="font-size: 2rem; font-weight: 800; color: var(--text-main);">42</div>
          <div style="font-size: 0.75rem; color: var(--accent-emerald); font-weight: 700; margin-top: 4px;">✓ 100% Terdaftar di Sistem</div>
        </div>
        <div class="card">
          <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600; margin-bottom: 4px;">Mahasiswa Aktif Minggu Ini</div>
          <div style="font-size: 2rem; font-weight: 800; color: var(--primary);">38</div>
          <div style="font-size: 0.75rem; color: var(--text-dim); margin-top: 4px;">90.4% Tingkat Partisipasi</div>
        </div>
        <div class="card">
          <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600; margin-bottom: 4px;">Rata-rata Nilai Kelas</div>
          <div style="font-size: 2rem; font-weight: 800; color: var(--accent-cyan);">82.4</div>
          <div style="font-size: 0.75rem; color: var(--accent-emerald); font-weight: 700; margin-top: 4px;">Predikat: A / AB</div>
        </div>
        <div class="card">
          <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600; margin-bottom: 4px;">Assignment Pending Review</div>
          <div style="font-size: 2rem; font-weight: 800; color: var(--accent-rose);">${pendingSubmissions.length}</div>
          <div style="font-size: 0.75rem; color: var(--text-dim); margin-top: 4px;">Memerlukan Penilaian Dosen</div>
        </div>
      </div>

      <!-- Pending Reviews -->
      <div class="card" style="margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h3 style="font-size: 1rem; font-weight: 800; color: var(--text-main);">📝 Tugas Mahasiswa Menunggu Penilaian</h3>
          <span class="badge" style="background: var(--accent-rose-subtle); color: var(--accent-rose); font-weight: 700; padding: 3px 10px; border-radius: 4px;">
            ${pendingSubmissions.length} Tugas
          </span>
        </div>
        ${pendingHtml}
      </div>

      <!-- Class Gradebook Overview -->
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3 style="font-size: 1rem; font-weight: 800; color: var(--text-main);">📊 Rekap Nilai Mahasiswa (Bobot Kurikulum ITENAS)</h3>
          <span style="font-size: 0.75rem; color: var(--text-dim); font-weight: 600;">Kuis 15% | Tugas 20% | Praktikum 20% | UTS 20% | Project 25%</span>
        </div>
        <div style="overflow-x: auto;">
          <table class="table-sql">
            <thead>
              <tr>
                <th>NIM</th>
                <th>Nama Mahasiswa</th>
                <th>Prodi</th>
                <th>Kuis (15%)</th>
                <th>Tugas (20%)</th>
                <th>Praktikum (20%)</th>
                <th>UTS (20%)</th>
                <th>Project (25%)</th>
                <th>Nilai Akhir</th>
                <th>Mutu</th>
              </tr>
            </thead>
            <tbody>
              ${studentRows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}
