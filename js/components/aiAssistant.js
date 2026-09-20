// AI DB Learning Assistant Component for DBLearn
// Provides contextual hints, SQL debugging, JOIN explainers, and concept explanations.

export class AiAssistant {
  constructor() {
    this.isOpen = false;
    this.messages = [
      {
        role: 'assistant',
        text: 'Halo! Saya **DB Assistant**, asisten cerdas mata kuliah Pemrograman Basis Data. Ada kesulitan memahami konsep SQL, pesan error, atau perancangan database?'
      }
    ];
  }

  toggle() {
    this.isOpen = !this.isOpen;
    const drawer = document.getElementById('aiDrawer');
    if (drawer) {
      if (this.isOpen) {
        drawer.classList.remove('closed');
      } else {
        drawer.classList.add('closed');
      }
    }
  }

  askQuick(questionText) {
    this.sendMessage(questionText);
  }

  sendMessage(userText) {
    if (!userText || !userText.trim()) return;

    this.messages.push({ role: 'user', text: userText });
    this.renderMessages();

    // Generate intelligent AI response based on database domain knowledge
    setTimeout(() => {
      const responseText = this.generateKnowledgeResponse(userText);
      this.messages.push({ role: 'assistant', text: responseText });
      this.renderMessages();
    }, 400);
  }

  generateKnowledgeResponse(input) {
    const lower = input.toLowerCase();

    // 1. Error / Bug Analysis
    if (lower.includes('error') || lower.includes('kenapa query') || lower.includes('salah')) {
      return `### 🔍 Analisis Error SQL
Penyebab error paling sering terjadi pada pemula:
1. **String Literal tanpa Tanda Petik:** Pada SQL, nilai teks wajib diapit tanda petik tunggal:
   \`\`\`sql
   -- SALAH: WHERE nama = Budi;
   -- BENAR: WHERE nama = 'Budi';
   \`\`\`
2. **Ambiguitas Nama Kolom pada JOIN:** Jika kedua tabel memiliki kolom bernama sama (misal \`id\` atau \`nim\`), tentukan nama tabelnya: \`mahasiswa.nim = krs.nim\`.
3. **Koma Terakhir:** Menaruh koma sebelum kurung tutup \`)\` pada CREATE TABLE atau klausa SELECT.`;
    }

    // 2. JOIN differences
    if (lower.includes('join') || lower.includes('left join') || lower.includes('inner join')) {
      return `### 🤝 Perbedaan INNER JOIN vs LEFT JOIN
* **INNER JOIN:** Hanya menampilkan baris jika ada nilai kecocokan di **kedua** tabel. Baris yang tidak memiliki relasi akan diabaikan.
* **LEFT JOIN:** Menampilkan **seluruh** baris dari tabel kiri (tabel pertama), dan mencocokkan data dari tabel kanan. Jika tidak ada kecocokan, kolom tabel kanan akan berisi nilai **NULL**.
* **Kapan Menggunakannya?** Gunakan LEFT JOIN saat Anda ingin melihat data induk yang mungkin belum memiliki data anak (contoh: menampilkan semua mahasiswa, termasuk mahasiswa baru yang belum mengambil KRS).`;
    }

    // 3. Normalization / 3NF
    if (lower.includes('normalisasi') || lower.includes('1nf') || lower.includes('2nf') || lower.includes('3nf')) {
      return `### 📐 Langkah Normalisasi Basis Data
1. **1NF (First Normal Form):** Hilangkan grup berulang dan pastikan semua kolom bernilai *atomik* (tunggal), serta tentukan Primary Key unik.
2. **2NF (Second Normal Form):** Sudah 1NF, dan hilangkan *Partial Dependency* (semua atribut non-kunci harus bergantung penuh pada seluruh Primary Key, bukan hanya sebagian dari composite key).
3. **3NF (Third Normal Form):** Sudah 2NF, dan hilangkan *Transitive Dependency* (atribut non-kunci tidak boleh bergantung pada atribut non-kunci lainnya).`;
    }

    // 4. ACID
    if (lower.includes('acid') || lower.includes('transaksi') || lower.includes('commit') || lower.includes('rollback')) {
      return `### 🛡️ Prinsip ACID dalam Transaksi Database
* **Atomicity (All or Nothing):** Semua query dalam satu transaksi berhasil seluruhnya, atau jika satu gagal maka dibatalkan (*ROLLBACK*).
* **Consistency:** Database selalu berada dalam keadaan valid dan mematuhi semua constraint (PK, FK, CHECK).
* **Isolation:** Transaksi yang berjalan bersamaan tidak saling mengganggu sebelum di-*COMMIT*.
* **Durability:** Data yang sudah di-*COMMIT* tersimpan permanen dan tidak akan hilang meskipun sistem padam.`;
    }

    // 5. Stored Procedure & Trigger
    if (lower.includes('procedure') || lower.includes('trigger') || lower.includes('function')) {
      return `### ⚙️ Database Programming: Procedure & Trigger
* **Stored Procedure:** Blok kode SQL yang tersimpan di server database. Dapat menerima parameter \`IN\`, \`OUT\`, dan mengeksekusi logika bisnis kompleks.
* **Trigger:** Blok kode yang berjalan otomatis (*event-driven*) saat terjadi operasi \`INSERT\`, \`UPDATE\`, atau \`DELETE\` pada suatu tabel (sangat ideal untuk *audit trail* log aktivitas).`;
    }

    // Default concept response
    return `Pertanyaan yang bagus tentang konsep basis data! Anda dapat mempraktikkan langsung query terkait di menu **SQL Playground**, atau meninjau modul pertemuan terkait di sidebar. Apakah Anda ingin contoh sintaks spesifik untuk topik ini?`;
  }

  render() {
    return `
      <!-- AI FAB Button -->
      <button class="ai-toggle-fab" onclick="window.aiAssistant.toggle()" title="Buka DB Assistant">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"></path><rect x="4" y="8" width="16" height="12" rx="2"></rect><circle cx="9" cy="13" r="1.5"></circle><circle cx="15" cy="13" r="1.5"></circle><path d="M9 17h6"></path></svg>
      </button>

      <!-- AI Drawer Panel -->
      <div class="ai-drawer closed" id="aiDrawer">
        <!-- Drawer Header -->
        <div style="padding: 14px 18px; background: var(--bg-tertiary); border-bottom: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 32px; height: 32px; border-radius: var(--radius-full); background: linear-gradient(135deg, var(--primary), var(--accent-cyan)); display: flex; align-items: center; justify-content: center; color: white;">
              🤖
            </div>
            <div>
              <div style="font-size: 0.85rem; font-weight: 700;">DB Assistant</div>
              <div style="font-size: 0.675rem; color: var(--accent-emerald);">● Online (ITENAS Knowledge)</div>
            </div>
          </div>
          <button class="btn btn-secondary btn-icon" style="width: 28px; height: 28px;" onclick="window.aiAssistant.toggle()">✕</button>
        </div>

        <!-- Quick Prompts Chips -->
        <div style="padding: 10px 14px; background: var(--bg-secondary); border-bottom: 1px solid var(--border-subtle); display: flex; gap: 6px; overflow-x: auto;">
          <button class="btn btn-secondary btn-sm" style="font-size: 0.7rem; white-space: nowrap; padding: 4px 8px;" onclick="window.aiAssistant.askQuick('Kenapa query saya error?')">
            🐛 Analisis Error
          </button>
          <button class="btn btn-secondary btn-sm" style="font-size: 0.7rem; white-space: nowrap; padding: 4px 8px;" onclick="window.aiAssistant.askQuick('Jelaskan perbedaan LEFT JOIN dan INNER JOIN')">
            🤝 Beda JOIN
          </button>
          <button class="btn btn-secondary btn-sm" style="font-size: 0.7rem; white-space: nowrap; padding: 4px 8px;" onclick="window.aiAssistant.askQuick('Bagaimana cara kerja 3NF?')">
            📐 3NF Normalisasi
          </button>
          <button class="btn btn-secondary btn-sm" style="font-size: 0.7rem; white-space: nowrap; padding: 4px 8px;" onclick="window.aiAssistant.askQuick('Apa itu prinsip ACID transaksi?')">
            🛡️ ACID Transaksi
          </button>
        </div>

        <!-- Messages Body -->
        <div id="aiMessagesContainer" style="flex: 1; overflow-y: auto; padding: 14px; display: flex; flex-direction: column; gap: 12px;">
          <!-- Rendered dynamically -->
        </div>

        <!-- Input Area -->
        <form onsubmit="event.preventDefault(); const inp = document.getElementById('aiInput'); window.aiAssistant.sendMessage(inp.value); inp.value = '';" style="padding: 10px 14px; background: var(--bg-tertiary); border-top: 1px solid var(--border-subtle); display: flex; gap: 8px;">
          <input
            type="text"
            id="aiInput"
            placeholder="Tanyakan konsep SQL atau error..."
            style="flex: 1; background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 8px 12px; color: var(--text-main); font-size: 0.8rem; outline: none;"
          >
          <button type="submit" class="btn btn-primary btn-sm" style="padding: 0 14px;">
            Kirim
          </button>
        </form>
      </div>
    `;
  }

  renderMessages() {
    const container = document.getElementById('aiMessagesContainer');
    if (!container) return;

    container.innerHTML = this.messages.map(m => {
      const isAssistant = m.role === 'assistant';
      return `
        <div style="display: flex; gap: 8px; align-self: ${isAssistant ? 'flex-start' : 'flex-end'}; max-width: 88%;">
          ${isAssistant ? `<div style="font-size: 1.1rem; line-height: 1;">🤖</div>` : ''}
          <div style="background: ${isAssistant ? 'var(--bg-tertiary)' : 'var(--primary)'}; color: ${isAssistant ? 'var(--text-main)' : 'white'}; padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.8rem; line-height: 1.5; box-shadow: var(--shadow-sm);">
            ${this.formatMarkdown(m.text)}
          </div>
        </div>
      `;
    }).join('');

    container.scrollTop = container.scrollHeight;
  }

  formatMarkdown(text) {
    return text
      .replace(/```sql([\s\S]*?)```/g, '<pre style="background: #0d1117; color: #58a6ff; padding: 8px; border-radius: 4px; font-family: monospace; font-size: 0.75rem; overflow-x: auto; margin: 6px 0;"><code>$1</code></pre>')
      .replace(/`([^`]+)`/g, '<code style="background: rgba(0,0,0,0.3); padding: 2px 4px; border-radius: 3px; font-family: monospace;">$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\* ([^\n]+)/g, '• $1<br>')
      .replace(/### ([^\n]+)/g, '<div style="font-weight: 700; font-size: 0.85rem; margin-bottom: 4px; color: var(--accent-cyan);">$1</div>');
  }
}

export const aiAssistant = new AiAssistant();
