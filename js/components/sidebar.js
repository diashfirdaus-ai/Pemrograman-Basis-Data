// Sidebar Component for DBLearn — White & ITENAS Orange Theme
import { state } from '../state.js';
import { MEETINGS_DATA } from '../data/meetings.js';

export function renderSidebar(currentRoute, currentMeetingId) {
  const completedMeetings = state.getCompletedMeetings();
  const currentRole = state.getCurrentRole();

  const meetingItemsHtml = MEETINGS_DATA.map(m => {
    const isCompleted = completedMeetings.includes(m.id);
    const isActive = currentRoute === 'meeting' && currentMeetingId === m.id;
    return `
      <li class="nav-item ${isActive ? 'active' : ''}">
        <a href="#/meeting/${m.id}" onclick="window.router.navigate('meeting', ${m.id}); return false;" style="font-size: 0.8rem; padding: 7px 10px;">
          <span style="font-size: 0.725rem; font-weight: 800; color: ${isCompleted ? 'var(--accent-emerald)' : (isActive ? 'var(--primary)' : 'var(--text-dim)')}; width: 24px;">
            ${isCompleted ? '✓' : `P${m.id}`}
          </span>
          <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${m.title}">
            ${m.id}. ${m.title}
          </span>
        </a>
      </li>
    `;
  }).join('');

  return `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-section">
        <span class="sidebar-title">Menu Utama</span>
        <ul class="nav-menu">
          <li class="nav-item ${currentRoute === 'landing' ? 'active' : ''}">
            <a href="#/landing" onclick="window.router.navigate('landing'); return false;">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
              Beranda
            </a>
          </li>
          <li class="nav-item ${currentRoute === 'dashboard' ? 'active' : ''}">
            <a href="#/dashboard" onclick="window.router.navigate('dashboard'); return false;">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              Dashboard ${currentRole === 'dosen' ? 'Dosen' : 'Mahasiswa'}
            </a>
          </li>
          <li class="nav-item ${currentRoute === 'playground' ? 'active' : ''}">
            <a href="#/playground" onclick="window.router.navigate('playground'); return false;">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              Simulator Visual SQL
              <span class="badge-counter">Interaktif</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="sidebar-section" style="flex: 1; overflow-y: auto;">
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 0 10px 8px;">
          <span class="sidebar-title" style="margin-bottom: 0; padding-left: 0;">14 Pertemuan</span>
          <span style="font-size: 0.725rem; font-weight: 800; color: var(--primary);">
            ${completedMeetings.length}/14
          </span>
        </div>
        <ul class="nav-menu" style="gap: 2px;">
          ${meetingItemsHtml}
        </ul>
      </div>

      <div class="sidebar-section" style="border-top: 1px solid var(--border-subtle); padding-top: 12px;">
        <span class="sidebar-title">Evaluasi & Proyek</span>
        <ul class="nav-menu">
          <li class="nav-item ${currentRoute === 'assignments' ? 'active' : ''}">
            <a href="#/assignments" onclick="window.router.navigate('assignments'); return false;">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
              ${currentRole === 'dosen' ? 'Kelola Tugas' : 'Tugas Perkuliahan'}
            </a>
          </li>
          <li class="nav-item ${currentRoute === 'grades' ? 'active' : ''}">
            <a href="#/grades" onclick="window.router.navigate('grades'); return false;">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              Sistem Nilai
            </a>
          </li>
          <li class="nav-item ${currentRoute === 'final_project' ? 'active' : ''}">
            <a href="#/final_project" onclick="window.router.navigate('final_project'); return false;">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              Final Project
            </a>
          </li>
        </ul>
      </div>
    </aside>
  `;
}
