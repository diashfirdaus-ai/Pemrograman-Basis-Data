// Landing Page Component for DBLearn — White & ITENAS Orange Theme
import { MEETINGS_DATA } from '../data/meetings.js';

export function renderLanding() {
  const meetingCards = MEETINGS_DATA.map(m => `
    <div class="card card-interactive" style="cursor: pointer; padding: 26px 28px;" onclick="window.router.navigate('meeting', ${m.id})">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
        <span class="badge" style="background: var(--primary-subtle); color: var(--primary); font-weight: 700; padding: 4px 12px; border-radius: var(--radius-sm); font-size: 0.775rem; border: 1px solid var(--primary-subtle-border);">
          Pertemuan ${m.id}
        </span>
        <span style="font-size: 0.8rem; color: var(--text-dim); font-weight: 600;">${m.duration}</span>
      </div>
      <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--text-main); margin-bottom: 8px; line-height: 1.35;">${m.title}</h4>
      <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 20px;">
        ${m.subtitle}
      </p>
      <div style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: var(--primary); font-weight: 700;">
        <span>Buka Modul Pertemuan</span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>
    </div>
  `).join('');

  return `
    <div class="landing-view">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-glow"></div>
        <div class="hero-badge">
          <img src="logo.png" alt="ITENAS" style="height: 18px; width: auto; object-fit: contain; vertical-align: middle;">
          <span>Institut Teknologi Nasional (ITENAS) Bandung • Pemrograman Basis Data</span>
        </div>
        <h1 class="hero-title">
          Laboratorium Basis Data dengan <span class="gradient-text">Simulator Visual Interaktif</span>
        </h1>
        <p class="hero-subtitle">
          Platform laboratorium virtual untuk mata kuliah Pemrograman Basis Data ITENAS. Visualisasikan alur eksekusi query SQL secara nyata: dari pemindaian tabel fisik, pemfilteran baris per klausa <code>WHERE</code>, penggabungan relasi lewat <code>JOIN</code>, hingga pembentukan tabel hasil akhir.
        </p>
        <div class="hero-cta">
          <button class="btn btn-primary" style="padding: 12px 24px; font-size: 0.95rem;" onclick="window.router.navigate('playground')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            Buka Simulator Visual
          </button>
          <button class="btn btn-secondary" style="padding: 12px 24px; font-size: 0.95rem;" onclick="document.getElementById('curriculum-section').scrollIntoView({ behavior: 'smooth' })">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Silabus 14 Pertemuan
          </button>
        </div>
      </section>

      <!-- Key Features Section -->
      <section style="margin-bottom: 64px;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h2 style="font-size: 2rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 12px; color: var(--text-main);">
            Fitur Pendukung Laboratorium Basis Data
          </h2>
          <p style="color: var(--text-muted); font-size: 1rem; max-width: 680px; margin: 0 auto; line-height: 1.6;">
            Dirancang untuk memberikan pemahaman menyeluruh terhadap konsep basis data relasional melalui eksplorasi visual dan latihan terstruktur.
          </p>
        </div>

        <div class="feature-grid">
          <div class="feature-card">
            <div class="feature-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            </div>
            <h3>Simulator Eksekusi SQL</h3>
            <p>Inspeksi alur kerja query secara step-by-step: pemindaian tabel fisik (FROM), evaluasi kondisi per baris (WHERE), pemetaan relasi (JOIN), hingga pembentukan proyeksi kolom.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon-wrapper" style="color: var(--accent-emerald); background: var(--accent-emerald-subtle);">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            </div>
            <h3>Latihan & Evaluasi Mandiri</h3>
            <p>Tersedia berbagai skenario query dari tingkat dasar hingga lanjutan dengan validasi hasil otomatis dan umpan balik kesalahan secara langsung.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon-wrapper" style="color: var(--accent-cyan); background: var(--accent-cyan-subtle);">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            </div>
            <h3>Silabus Terstruktur</h3>
            <p>Mencakup kompetensi semester penuh: pemodelan data konseptual, normalisasi 1NF-3NF, DDL/DML, fungsi agregasi, subquery, hingga pemrograman basis data (SP & Trigger).</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon-wrapper" style="color: var(--accent-amber); background: var(--accent-amber-subtle);">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            </div>
            <h3>Monitoring Capaian Pembelajaran</h3>
            <p>Rekapitulasi berkala untuk kuis mingguan, penugasan praktikum, dan proyek akhir sesuai standar dan rubrik akademik ITENAS.</p>
          </div>
        </div>
      </section>

      <!-- Learning Path Roadmap Section -->
      <section id="curriculum-section" style="margin-bottom: 80px;">
        <div style="display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 28px; flex-wrap: wrap; gap: 16px;">
          <div>
            <h2 style="font-size: 2rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 8px; color: var(--text-main);">
              Silabus Perkuliahan 14 Pertemuan
            </h2>
            <p style="color: var(--text-muted); font-size: 0.95rem;">
              Kurikulum standar program sarjana ITENAS dari fondasi hingga implementasi sistem nyata
            </p>
          </div>
          <button class="btn btn-primary btn-sm" style="padding: 8px 18px;" onclick="window.router.navigate('meeting', 1)">
            Mulai Pertemuan 1 →
          </button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px;">
          ${meetingCards}
        </div>
      </section>
    </div>
  `;
}
