// Final Project Hub Component for DBLearn
import { state } from '../state.js';

export function renderFinalProjectView() {
  const user = state.getCurrentUser();

  return `
    <div class="final-project-view">
      <!-- Header -->
      <div style="margin-bottom: 24px;">
        <span class="badge" style="background: rgba(99,102,241,0.2); color: var(--primary-light); font-weight: 700; padding: 4px 10px; border-radius: var(--radius-sm); font-size: 0.75rem;">
          Tugas Besar Akhir Semester (Bobot: 25%)
        </span>
        <h1 style="font-size: 2.2rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px; margin-bottom: 6px;">
          Final Project: Pengembangan Aplikasi Berbasis Database
        </h1>
        <p style="color: var(--text-muted); font-size: 0.95rem;">
          Membangun solusi perangkat lunak terpadu yang memadukan perancangan skema relasional, SQL lanjut, pemrograman database (Stored Procedure & Trigger), serta antarmuka CRUD.
        </p>
      </div>

      <!-- 4 Domain Options Cards -->
      <div style="margin-bottom: 32px;">
        <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 16px;">
          🎯 4 Pilihan Domain Studi Kasus
        </h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
          <!-- Domain 1: Akademik -->
          <div class="card card-interactive">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--primary-light); margin-bottom: 4px;">PILIHAN 1</div>
            <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 8px;">Sistem Akademik Terpadu</h4>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
              Pengelolaan data mahasiswa, dosen, mata kuliah, pengisian KRS, dan input nilai akademik.
            </p>
            <div style="background: var(--bg-tertiary); padding: 8px 12px; border-radius: var(--radius-sm); font-family: 'JetBrains Mono', monospace; font-size: 0.725rem; color: var(--accent-cyan);">
              Entitas: Mahasiswa, Dosen, Mata Kuliah, KRS, Nilai
            </div>
          </div>

          <!-- Domain 2: Perpustakaan -->
          <div class="card card-interactive">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--accent-emerald); margin-bottom: 4px;">PILIHAN 2</div>
            <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 8px;">Sistem Informasi Perpustakaan</h4>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
              Sirkulasi peminjaman buku, katalog pustaka, manajemen anggota, denda keterlambatan, dan stok buku.
            </p>
            <div style="background: var(--bg-tertiary); padding: 8px 12px; border-radius: var(--radius-sm); font-family: 'JetBrains Mono', monospace; font-size: 0.725rem; color: var(--accent-cyan);">
              Entitas: Anggota, Buku, Peminjaman, Pengembalian, Denda
            </div>
          </div>

          <!-- Domain 3: Inventori -->
          <div class="card card-interactive">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--accent-amber); margin-bottom: 4px;">PILIHAN 3</div>
            <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 8px;">Sistem Inventori & Toko</h4>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
              Manajemen stok barang, kategori produk, supplier pengadaan, dan pencatatan transaksi kasir.
            </p>
            <div style="background: var(--bg-tertiary); padding: 8px 12px; border-radius: var(--radius-sm); font-family: 'JetBrains Mono', monospace; font-size: 0.725rem; color: var(--accent-cyan);">
              Entitas: Produk, Kategori, Supplier, Transaksi, Stok
            </div>
          </div>

          <!-- Domain 4: Rumah Sakit -->
          <div class="card card-interactive">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--accent-rose); margin-bottom: 4px;">PILIHAN 4</div>
            <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 8px;">Sistem Rumah Sakit</h4>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
              Rekam medis pasien, jadwal dokter jaga, poliklinik, resep obat farmasi, dan pembayaran kasir medis.
            </p>
            <div style="background: var(--bg-tertiary); padding: 8px 12px; border-radius: var(--radius-sm); font-family: 'JetBrains Mono', monospace; font-size: 0.725rem; color: var(--accent-cyan);">
              Entitas: Pasien, Dokter, Pemeriksaan, Obat, Pembayaran
            </div>
          </div>
        </div>
      </div>

      <!-- Requirements Checklist Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 32px;">
        <!-- Technical Requirements -->
        <div class="card">
          <h3 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 14px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 8px;">
            📋 Persyaratan Teknis Wajib (PRD Bagian 9)
          </h3>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px; font-size: 0.85rem;">
            <li style="display: flex; align-items: center; gap: 10px;">
              <span style="color: var(--accent-emerald); font-weight: 800;">✓</span>
              <span><strong>Database:</strong> Minimal 5 tabel berelasi (PK, FK, ternormalisasi hingga 3NF)</span>
            </li>
            <li style="display: flex; align-items: center; gap: 10px;">
              <span style="color: var(--accent-emerald); font-weight: 800;">✓</span>
              <span><strong>SQL Queries:</strong> Implementasi CRUD, multi-table JOIN, Aggregate, dan Subquery</span>
            </li>
            <li style="display: flex; align-items: center; gap: 10px;">
              <span style="color: var(--accent-emerald); font-weight: 800;">✓</span>
              <span><strong>Database Programming:</strong> Minimal 1 Stored Procedure, 1 Function, & 1 Trigger</span>
            </li>
            <li style="display: flex; align-items: center; gap: 10px;">
              <span style="color: var(--accent-emerald); font-weight: 800;">✓</span>
              <span><strong>Application Interface:</strong> Otentikasi login, dashboard, CRUD, pencarian/filter, & laporan</span>
            </li>
            <li style="display: flex; align-items: center; gap: 10px;">
              <span style="color: var(--accent-emerald); font-weight: 800;">✓</span>
              <span><strong>Database Security:</strong> Prepared statement anti-SQL Injection & transaksi ACID</span>
            </li>
          </ul>
        </div>

        <!-- Submission Form -->
        <div class="card" style="background: linear-gradient(135deg, rgba(17,24,39,0.9), rgba(79,70,229,0.1)); border-color: rgba(99,102,241,0.3);">
          <h3 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 14px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 8px;">
            🚀 Form Pengumpulan Proyek Akhir
          </h3>
          <form onsubmit="event.preventDefault(); alert('Proyek Akhir berhasil dikumpulkan! Dosen akan melakukan review dan penilaian.');">
            <div style="margin-bottom: 12px;">
              <label style="font-size: 0.775rem; font-weight: 600; display: block; margin-bottom: 4px;">Pilihan Domain Proyek:</label>
              <select style="width: 100%; padding: 8px 12px; background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); color: var(--text-main); font-size: 0.85rem;" required>
                <option value="akademik">1. Sistem Informasi Akademik</option>
                <option value="perpustakaan">2. Sistem Informasi Perpustakaan</option>
                <option value="inventori">3. Sistem Inventori & Toko</option>
                <option value="rumah_sakit">4. Sistem Rekam Medis Rumah Sakit</option>
              </select>
            </div>

            <div style="margin-bottom: 12px;">
              <label style="font-size: 0.775rem; font-weight: 600; display: block; margin-bottom: 4px;">Tautan Repositori GitHub:</label>
              <input type="url" placeholder="https://github.com/username/project-pbd-itenas" value="https://github.com/diashfirdaus/itenas-dblearn-project" style="width: 100%; padding: 8px 12px; background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); color: var(--text-main); font-size: 0.85rem;" required>
            </div>

            <div style="margin-bottom: 16px;">
              <label style="font-size: 0.775rem; font-weight: 600; display: block; margin-bottom: 4px;">Script SQL Lengkap (DDL, DML, SP, Trigger):</label>
              <textarea rows="3" class="sql-textarea" style="height: 90px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);" placeholder="Paste script SQL dump proyek Anda di sini...">-- DDL & Stored Procedure Final Project
CREATE TABLE mahasiswa (nim VARCHAR(20) PRIMARY KEY, nama VARCHAR(100));
CREATE PROCEDURE getNilai() BEGIN SELECT * FROM krs; END;</textarea>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              Kumpulkan Final Project
            </button>
          </form>
        </div>
      </div>
    </div>
  `;
}
