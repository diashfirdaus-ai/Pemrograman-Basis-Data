// Navbar Component for DBLearn — White & ITENAS Orange Theme
import { state } from '../state.js';

export function renderNavbar() {
  const currentUser = state.getCurrentUser();
  const currentRole = state.getCurrentRole();

  return `
    <header class="navbar">
      <div class="nav-brand" onclick="window.router.navigate('landing')">
        <div class="brand-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
          </svg>
        </div>
        <div class="brand-text">
          <h1>DBLearn <span class="brand-orange">ITENAS</span> <span class="badge">PBD</span></h1>
          <p>Pemrograman Basis Data — 14 Pertemuan & Simulator Visual</p>
        </div>
      </div>

      <div class="nav-actions">
        <!-- Role Switcher -->
        <div class="role-switcher" title="Beralih peran untuk melihat tampilan Mahasiswa atau Dosen">
          <button class="role-btn ${currentRole === 'mahasiswa' ? 'active' : ''}" onclick="window.app.switchRole('mahasiswa')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
            Mahasiswa
          </button>
          <button class="role-btn ${currentRole === 'dosen' ? 'active' : ''}" onclick="window.app.switchRole('dosen')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Dosen
          </button>
        </div>

        <!-- SQL Simulator Shortcut -->
        <button class="btn btn-primary btn-sm" onclick="window.router.navigate('playground')" title="Buka Simulator Visual SQL">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
          Simulator Visual
        </button>

        <!-- Profile Badge -->
        <div class="user-profile-badge" onclick="window.router.navigate('dashboard')">
          <div class="avatar">${currentUser.avatar}</div>
          <div class="user-info">
            <span class="user-name">${currentUser.name}</span>
            <span class="user-role-label">${currentRole === 'dosen' ? 'Dosen Pengampu' : `NIM: ${currentUser.identifier}`}</span>
          </div>
        </div>
      </div>
    </header>
  `;
}
