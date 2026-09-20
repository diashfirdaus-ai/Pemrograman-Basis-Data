// In-Browser Relational SQL Execution Engine for DBLearn ITENAS
// Supports: SELECT, DISTINCT, WHERE (AND, OR, BETWEEN, IN, LIKE, =, !=, >, <, >=, <=, IS NULL),
// JOINs (INNER, LEFT, RIGHT), Aggregates (COUNT, SUM, AVG, MIN, MAX),
// GROUP BY, HAVING, ORDER BY, LIMIT, UNION, INSERT, UPDATE, DELETE, CREATE TABLE, DROP TABLE.
// Also generates visual query pipeline (Tabel A + Query X = Output Z).

import { state } from './state.js';

export class SqlEngine {
  getActiveDatabase() {
    const dbs = state.getDatabases();
    const activeName = state.getActiveDb() || 'akademik';
    if (!dbs[activeName]) {
      dbs[activeName] = { name: activeName, description: 'Custom DB', tables: {} };
    }
    return { name: activeName, db: dbs[activeName] };
  }

  saveDatabase(name, dbData) {
    const dbs = state.getDatabases();
    dbs[name] = dbData;
    state.saveDatabases(dbs);
  }

  // Clone tables deeply
  cloneTables(tables) {
    const cloned = {};
    Object.keys(tables).forEach(t => {
      cloned[t] = {
        name: tables[t].name || t,
        schema: (tables[t].columns || tables[t].schema || []).map(c => ({ ...c })),
        columns: (tables[t].columns || tables[t].schema || []).map(c => ({ ...c })),
        rows: tables[t].rows.map(r => ({ ...r }))
      };
    });
    return cloned;
  }

  // Main entry point for query execution
  execute(rawSql) {
    const startTime = performance.now();
    const cleaned = (rawSql || '').trim().replace(/;+\s*$/, '');

    if (!cleaned) {
      return {
        success: false,
        error: 'Query kosong. Tuliskan instruksi SQL Anda.'
      };
    }

    const { name: dbName, db } = this.getActiveDatabase();
    const currentTables = this.cloneTables(db.tables);

    try {
      const res = this.runSql(cleaned, currentTables);
      const durationMs = (performance.now() - startTime).toFixed(2);

      // If database structure or rows modified, persist to state
      if (res.newTables) {
        db.tables = res.newTables;
        this.saveDatabase(dbName, db);
      }

      return {
        success: true,
        type: res.result.type,
        data: res.result.rows || [],
        columns: res.result.columns || [],
        affectedRows: res.result.affected !== undefined ? res.result.affected : (res.result.rows ? res.result.rows.length : 0),
        message: res.result.message || `Query dieksekusi dengan sukses dalam ${durationMs} ms.`,
        durationMs,
        viz: res.viz || []
      };
    } catch (err) {
      return {
        success: false,
        error: err.message || 'Terjadi kesalahan sintaks saat mengeksekusi query SQL.'
      };
    }
  }

  // Core parser & evaluator
  runSql(sql, tables) {
    const rawUpper = sql.toUpperCase();

    // Check for UNION
    if (/\bUNION\b/i.test(sql) && rawUpper.startsWith('SELECT')) {
      const parts = this.splitUnion(sql);
      if (parts.length > 1) {
        let allRows = [];
        let firstCols = [];
        for (let i = 0; i < parts.length; i++) {
          const subRes = this.runSelect(parts[i], tables);
          if (i === 0) firstCols = subRes.columns;
          else if (subRes.columns.length !== firstCols.length) {
            throw new Error(`UNION gagal: jumlah kolom tidak sama (${firstCols.length} vs ${subRes.columns.length})`);
          }
          allRows = allRows.concat(subRes.rows);
        }
        // Deduplicate rows for UNION
        const seen = new Set();
        const uniq = [];
        for (const r of allRows) {
          const s = JSON.stringify(r);
          if (!seen.has(s)) {
            seen.add(s);
            uniq.push(r);
          }
        }
        return {
          result: { type: 'SELECT', rows: uniq, columns: firstCols },
          viz: [
            { title: 'UNION', desc: `${parts.length} query digabung`, type: 'filter' },
            { title: 'Output Z', desc: 'Hasil akhir penggabungan UNION', type: 'output', count: `${uniq.length} baris` }
          ]
        };
      }
    }

    if (rawUpper.startsWith('SELECT')) {
      const selRes = this.runSelect(sql, tables);
      return {
        result: { type: 'SELECT', rows: selRes.rows, columns: selRes.columns },
        viz: selRes.viz
      };
    }

    if (rawUpper.startsWith('INSERT')) {
      return this.runInsert(sql, tables);
    }

    if (rawUpper.startsWith('UPDATE')) {
      return this.runUpdate(sql, tables);
    }

    if (rawUpper.startsWith('DELETE')) {
      return this.runDelete(sql, tables);
    }

    if (rawUpper.startsWith('CREATE TABLE')) {
      return this.runCreateTable(sql, tables);
    }

    if (rawUpper.startsWith('DROP TABLE')) {
      return this.runDropTable(sql, tables);
    }

    throw new Error(`Perintah '${sql.split(/\s+/)[0]}' belum didukung. Gunakan SELECT, INSERT, UPDATE, DELETE, CREATE TABLE, atau DROP TABLE.`);
  }

  // --- SELECT Implementation ---
  runSelect(sql, tables) {
    const isDistinct = !!sql.match(/^\s*SELECT\s+(DISTINCT)\s+/i);
    const selMatch = sql.match(/^\s*SELECT\s+(?:DISTINCT\s+)?([\s\S]+?)\s+FROM\s+([\s\S]+)$/i);
    if (!selMatch) throw new Error("Sintaks SELECT tidak valid. Contoh: SELECT * FROM mahasiswa");

    const selColsStr = selMatch[1].trim();
    const fromRest = selMatch[2].trim();

    const { fromClause, where, groupBy, having, orderBy, limit } = this.parseClauses(fromRest);
    if (!fromClause) throw new Error("Klausul FROM tidak ditemukan");

    const joinDef = this.parseJoins(fromClause);
    const { combined } = this.buildCombinedRows(tables, joinDef);

    let rows = combined;
    const viz = [];

    const baseTableNames = [joinDef.base.name, ...joinDef.joins.map(j => j.table)]
      .map(t => {
        const found = this.findTable(tables, t);
        return `${t} (${found ? found.rows.length : 0} baris)`;
      }).join(", ");

    viz.push({
      title: "Tabel Sumber",
      desc: baseTableNames,
      type: "table",
      count: `${rows.length} baris dibaca`
    });

    if (joinDef.joins.length > 0) {
      viz.push({
        title: "JOIN",
        desc: joinDef.joins.map(j => `${j.type} ${j.table} ON ${j.condition}`).join(" | "),
        type: "join",
        count: `${rows.length} baris terhubung`
      });
    }

    // WHERE Filter
    if (where) {
      rows = rows.filter(row => {
        try {
          return this.evalCondition(row, where, tables);
        } catch (e) {
          throw new Error(`Error pada klausa WHERE: ${e.message}`);
        }
      });
      viz.push({
        title: "Filter WHERE",
        desc: `WHERE ${where}`,
        type: "filter",
        count: `${rows.length} baris lolos filter`
      });
    }

    const projCols = this.parseSelectColumns(selColsStr);
    const hasAgg = projCols.some(c => c.type === 'agg');
    let finalRows = [];
    let finalCols = [];

    // GROUP BY
    if (groupBy) {
      const groupCols = this.splitByComma(groupBy).map(c => c.trim());
      viz.push({
        title: "GROUP BY",
        desc: `GROUP BY ${groupCols.join(", ")}${having ? ` HAVING ${having}` : ''}`,
        type: "group"
      });

      const groups = new Map();
      for (const r of rows) {
        const keyVals = {};
        const keyArr = [];
        for (const gc of groupCols) {
          const val = this.resolveValue(r, gc);
          keyVals[gc] = val;
          keyArr.push(val);
        }
        const keyJson = JSON.stringify(keyArr);
        if (!groups.has(keyJson)) {
          groups.set(keyJson, { keyVals, rowList: [] });
        }
        groups.get(keyJson).rowList.push(r);
      }

      for (const [, grp] of groups) {
        const outRow = {};
        for (const pc of projCols) {
          if (pc.type === 'agg') {
            outRow[pc.alias] = this.evalAggregate(pc.func, pc.col, grp.rowList);
          } else if (pc.type === 'col') {
            if (groupCols.some(gc => gc.toLowerCase() === pc.ref.toLowerCase() || gc.toLowerCase().endsWith('.' + pc.ref.toLowerCase()))) {
              const matchedKey = Object.keys(grp.keyVals).find(k => k.toLowerCase() === pc.ref.toLowerCase() || k.toLowerCase().endsWith('.' + pc.ref.toLowerCase()));
              outRow[pc.alias] = matchedKey ? grp.keyVals[matchedKey] : grp.keyVals[Object.keys(grp.keyVals)[0]];
            } else {
              outRow[pc.alias] = this.resolveValue(grp.rowList[0], pc.ref);
            }
          } else if (pc.type === 'star') {
            Object.assign(outRow, grp.keyVals);
          }
        }
        finalRows.push(outRow);
      }
      finalCols = projCols.map(c => c.alias);
    } else if (hasAgg) {
      // Aggregate without GROUP BY (e.g. SELECT COUNT(*), AVG(ipk) FROM mahasiswa)
      const outRow = {};
      for (const pc of projCols) {
        if (pc.type === 'agg') {
          outRow[pc.alias] = this.evalAggregate(pc.func, pc.col, rows);
        } else if (pc.type === 'col') {
          outRow[pc.alias] = rows.length ? this.resolveValue(rows[0], pc.ref) : null;
        }
      }
      finalRows = [outRow];
      finalCols = Object.keys(outRow);
      viz.push({
        title: "Agregasi",
        desc: `Hitung ${projCols.filter(c => c.type === 'agg').map(c => c.raw).join(", ")}`,
        type: "group"
      });
    } else {
      // Normal projection
      for (const r of rows) {
        const outRow = {};
        for (const pc of projCols) {
          if (pc.type === 'star') {
            if (pc.table) {
              const matchedTbl = Object.keys(r.tables).find(t => t.toLowerCase() === pc.table.toLowerCase());
              if (matchedTbl && r.tables[matchedTbl]) {
                Object.entries(r.tables[matchedTbl]).forEach(([k, v]) => {
                  outRow[`${matchedTbl}.${k}`] = v;
                });
              }
            } else {
              for (const tbl of Object.keys(r.tables)) {
                if (!r.tables[tbl]) continue;
                for (const [k, v] of Object.entries(r.tables[tbl])) {
                  const outKey = Object.keys(r.tables).length === 1 ? k : `${tbl}.${k}`;
                  outRow[outKey] = v;
                }
              }
            }
          } else if (pc.type === 'col') {
            outRow[pc.alias] = this.resolveValue(r, pc.ref);
          }
        }
        finalRows.push(outRow);
      }
      finalCols = finalRows.length ? Object.keys(finalRows[0]) : projCols.map(c => c.alias);
    }

    // DISTINCT
    if (isDistinct) {
      const seen = new Set();
      const uniq = [];
      for (const r of finalRows) {
        const s = JSON.stringify(r);
        if (!seen.has(s)) {
          seen.add(s);
          uniq.push(r);
        }
      }
      finalRows = uniq;
      viz.push({ title: "DISTINCT", desc: "Hapus baris duplikat", type: "filter", count: `${finalRows.length} baris unik` });
    }

    // ORDER BY
    if (orderBy) {
      const orderDirectives = this.splitByComma(orderBy).map(item => {
        const m = item.trim().match(/^(.*?)\s+(ASC|DESC)\s*$/i);
        return m ? { col: m[1].trim(), dir: m[2].toUpperCase() } : { col: item.trim(), dir: 'ASC' };
      });

      finalRows.sort((a, b) => {
        for (const ord of orderDirectives) {
          const valA = a[ord.col] ?? a[Object.keys(a).find(k => k.toLowerCase() === ord.col.toLowerCase()) || ''] ?? null;
          const valB = b[ord.col] ?? b[Object.keys(b).find(k => k.toLowerCase() === ord.col.toLowerCase()) || ''] ?? null;
          if (valA === valB) continue;
          if (valA === null) return 1;
          if (valB === null) return -1;
          let diff = 0;
          if (typeof valA === 'number' && typeof valB === 'number') diff = valA - valB;
          else diff = String(valA).localeCompare(String(valB));
          if (diff !== 0) return ord.dir === 'ASC' ? diff : -diff;
        }
        return 0;
      });
      viz.push({ title: "Pengurutan", desc: `ORDER BY ${orderBy}`, type: "sort" });
    }

    // LIMIT
    if (limit) {
      const limNum = parseInt(limit.trim(), 10);
      if (!isNaN(limNum)) {
        finalRows = finalRows.slice(0, limNum);
        viz.push({ title: "Batasan Baris", desc: `LIMIT ${limNum}`, type: "filter", count: `${finalRows.length} baris` });
      }
    }

    if (finalCols.length === 0 && finalRows.length > 0) {
      finalCols = Object.keys(finalRows[0]);
    }

    viz.push({
      title: "Output Z",
      desc: "Tabel hasil akhir yang disajikan",
      type: "output",
      count: `${finalRows.length} baris x ${finalCols.length} kolom`
    });

    return { rows: finalRows, columns: finalCols, viz };
  }

  // --- INSERT Implementation ---
  runInsert(sql, tables) {
    const m = sql.match(/INSERT\s+INTO\s+(\w+)\s*(?:\(([^)]+)\))?\s+VALUES\s*([\s\S]+)$/i);
    if (!m) throw new Error("Sintaks INSERT tidak valid. Contoh: INSERT INTO mahasiswa (nim, nama) VALUES ('2024001', 'Budi')");

    const tblName = m[1];
    const colListStr = m[2];
    const valuesPart = m[3].trim();

    const targetTbl = this.findTable(tables, tblName);
    if (!targetTbl) throw new Error(`Tabel '${tblName}' tidak ditemukan`);

    const colNames = colListStr
      ? this.splitByComma(colListStr).map(c => c.trim())
      : (targetTbl.schema || targetTbl.columns).map(c => c.name);

    // Extract tuples from VALUES (...), (...)
    const tuples = [];
    let depth = 0, inSingle = false, inDouble = false, startIdx = -1;
    for (let i = 0; i < valuesPart.length; i++) {
      const char = valuesPart[i];
      if (char === "'" && !inDouble) { inSingle = !inSingle; continue; }
      if (char === '"' && !inSingle) { inDouble = !inDouble; continue; }
      if (inSingle || inDouble) continue;
      if (char === '(') {
        if (depth === 0) startIdx = i + 1;
        depth++;
      } else if (char === ')') {
        depth--;
        if (depth === 0 && startIdx !== -1) {
          tuples.push(valuesPart.slice(startIdx, i));
          startIdx = -1;
        }
      }
    }

    if (tuples.length === 0) throw new Error("Klausa VALUES tidak valid atau kosong");

    const newRows = [];
    for (const tup of tuples) {
      const vals = this.splitByComma(tup);
      if (vals.length !== colNames.length) {
        throw new Error(`Jumlah kolom (${colNames.length}) tidak sesuai dengan jumlah nilai (${vals.length})`);
      }

      const rowObj = {};
      (targetTbl.schema || targetTbl.columns).forEach(c => { rowObj[c.name] = null; });

      for (let i = 0; i < colNames.length; i++) {
        const col = colNames[i];
        const rawVal = vals[i].trim();
        let parsedVal;
        if (rawVal.toUpperCase() === 'NULL') parsedVal = null;
        else if ((rawVal.startsWith("'") && rawVal.endsWith("'")) || (rawVal.startsWith('"') && rawVal.endsWith('"'))) {
          parsedVal = rawVal.slice(1, -1).replace(/''/g, "'");
        } else if (/^-?\d+(\.\d+)?$/.test(rawVal)) {
          parsedVal = Number(rawVal);
        } else {
          parsedVal = rawVal;
        }

        const schemaCol = (targetTbl.schema || targetTbl.columns).find(c => c.name.toLowerCase() === col.toLowerCase());
        if (!schemaCol) throw new Error(`Kolom '${col}' tidak ditemukan di tabel '${tblName}'`);
        rowObj[schemaCol.name] = parsedVal;
      }

      // Auto-increment id if present and null
      const idCol = (targetTbl.schema || targetTbl.columns).find(c => c.name.toLowerCase() === 'id');
      if (idCol && (rowObj[idCol.name] === null || rowObj[idCol.name] === undefined)) {
        const maxId = Math.max(0, ...targetTbl.rows.map(r => Number(r[idCol.name]) || 0));
        rowObj[idCol.name] = maxId + 1 + newRows.length;
      }

      newRows.push(rowObj);
    }

    const matchedKey = Object.keys(tables).find(k => k.toLowerCase() === tblName.toLowerCase());
    tables[matchedKey].rows = [...tables[matchedKey].rows, ...newRows];

    return {
      result: {
        type: 'INSERT',
        affected: newRows.length,
        message: `Berhasil! ${newRows.length} baris ditambahkan ke tabel '${tblName}'.`
      },
      newTables: tables
    };
  }

  // --- UPDATE Implementation ---
  runUpdate(sql, tables) {
    const m = sql.match(/UPDATE\s+(\w+)\s+SET\s+([\s\S]+?)(?:\s+WHERE\s+([\s\S]+))?$/i);
    if (!m) throw new Error("Sintaks UPDATE tidak valid. Contoh: UPDATE mahasiswa SET ipk=3.9 WHERE nim='2021001'");

    const tblName = m[1];
    const setClause = m[2];
    const whereClause = m[3];

    const targetTbl = this.findTable(tables, tblName);
    if (!targetTbl) throw new Error(`Tabel '${tblName}' tidak ditemukan`);

    const setPairs = this.splitByComma(setClause).map(item => {
      const eqIdx = item.indexOf('=');
      if (eqIdx === -1) throw new Error(`Format klausa SET harus kolom=nilai, salah pada "${item}"`);
      return {
        col: item.slice(0, eqIdx).trim(),
        valRaw: item.slice(eqIdx + 1).trim()
      };
    });

    const tblKey = Object.keys(tables).find(k => k.toLowerCase() === tblName.toLowerCase());
    let affectedCount = 0;

    tables[tblKey].rows = tables[tblKey].rows.map(row => {
      const ctx = { tables: { [tblKey]: row } };
      let match = true;
      if (whereClause) {
        try {
          match = this.evalCondition(ctx, whereClause, tables);
        } catch (e) {
          throw new Error(`Error pada klausa WHERE: ${e.message}`);
        }
      }

      if (match) {
        affectedCount++;
        const updated = { ...row };
        for (const pair of setPairs) {
          const schemaCol = (targetTbl.schema || targetTbl.columns).find(c => c.name.toLowerCase() === pair.col.toLowerCase());
          if (!schemaCol) throw new Error(`Kolom '${pair.col}' tidak ditemukan pada tabel '${tblName}'`);
          let val;
          const k = pair.valRaw;
          if (k.toUpperCase() === 'NULL') val = null;
          else if ((k.startsWith("'") && k.endsWith("'")) || (k.startsWith('"') && k.endsWith('"'))) {
            val = k.slice(1, -1).replace(/''/g, "'");
          } else if (/^-?\d+(\.\d+)?$/.test(k)) {
            val = Number(k);
          } else {
            const resolved = this.resolveValue(ctx, k);
            val = resolved !== undefined ? resolved : k;
          }
          updated[schemaCol.name] = val;
        }
        return updated;
      }
      return row;
    });

    return {
      result: {
        type: 'UPDATE',
        affected: affectedCount,
        message: `Berhasil! ${affectedCount} baris diperbarui pada tabel '${tblName}'.`
      },
      newTables: tables
    };
  }

  // --- DELETE Implementation ---
  runDelete(sql, tables) {
    const m = sql.match(/DELETE\s+FROM\s+(\w+)(?:\s+WHERE\s+([\s\S]+))?$/i);
    if (!m) throw new Error("Sintaks DELETE tidak valid. Contoh: DELETE FROM nilai WHERE id=1");

    const tblName = m[1];
    const whereClause = m[2];

    const targetTbl = this.findTable(tables, tblName);
    if (!targetTbl) throw new Error(`Tabel '${tblName}' tidak ditemukan`);

    const tblKey = Object.keys(tables).find(k => k.toLowerCase() === tblName.toLowerCase());
    const initialLen = tables[tblKey].rows.length;

    if (!whereClause) {
      tables[tblKey].rows = [];
      return {
        result: {
          type: 'DELETE',
          affected: initialLen,
          message: `Berhasil! Semua ${initialLen} baris dihapus dari tabel '${tblName}'.`
        },
        newTables: tables
      };
    }

    tables[tblKey].rows = tables[tblKey].rows.filter(row => {
      const ctx = { tables: { [tblKey]: row } };
      try {
        return !this.evalCondition(ctx, whereClause, tables);
      } catch (e) {
        throw new Error(`Error pada klausa WHERE: ${e.message}`);
      }
    });

    const deletedCount = initialLen - tables[tblKey].rows.length;
    return {
      result: {
        type: 'DELETE',
        affected: deletedCount,
        message: `Berhasil! ${deletedCount} baris dihapus dari tabel '${tblName}'.`
      },
      newTables: tables
    };
  }

  // --- CREATE TABLE Implementation ---
  runCreateTable(sql, tables) {
    const m = sql.match(/CREATE\s+TABLE\s+(\w+)\s*\(([\s\S]+)\)\s*$/i);
    if (!m) throw new Error("Sintaks CREATE TABLE tidak valid. Contoh: CREATE TABLE presensi (id INT, nim VARCHAR)");

    const tblName = m[1];
    const colDefsStr = m[2];

    if (this.findTable(tables, tblName)) throw new Error(`Tabel '${tblName}' sudah ada di database.`);

    const cols = this.splitByComma(colDefsStr).map(item => {
      const parts = item.trim().split(/\s+/);
      const name = parts[0];
      const type = (parts[1] || 'VARCHAR').toUpperCase();
      const isPk = /PRIMARY\s+KEY/i.test(item);
      return { name, type, pk: isPk };
    });

    tables[tblName.toLowerCase()] = {
      name: tblName,
      schema: cols,
      columns: cols,
      rows: []
    };

    return {
      result: {
        type: 'CREATE',
        message: `Tabel '${tblName}' berhasil dibuat dengan ${cols.length} kolom.`
      },
      newTables: tables
    };
  }

  // --- DROP TABLE Implementation ---
  runDropTable(sql, tables) {
    const m = sql.match(/DROP\s+TABLE\s+(\w+)/i);
    if (!m) throw new Error("Sintaks DROP TABLE tidak valid");

    const tblName = m[1];
    const tblKey = Object.keys(tables).find(k => k.toLowerCase() === tblName.toLowerCase());
    if (!tblKey) throw new Error(`Tabel '${tblName}' tidak ditemukan`);

    delete tables[tblKey];
    return {
      result: {
        type: 'DROP',
        message: `Tabel '${tblName}' berhasil dihapus dari database.`
      },
      newTables: tables
    };
  }

  // ==========================================
  // Parsing & Evaluator Helpers
  // ==========================================
  findTable(tables, name) {
    const lower = name.toLowerCase();
    const key = Object.keys(tables).find(k => k.toLowerCase() === lower);
    return key ? tables[key] : undefined;
  }

  parseClauses(str) {
    const regex = /\b(WHERE|GROUP\s+BY|HAVING|ORDER\s+BY|LIMIT)\b/gi;
    const matches = [];
    let match;
    while ((match = regex.exec(str)) !== null) {
      matches.push({
        name: match[0].toUpperCase().replace(/\s+/g, ' '),
        index: match.index,
        len: match[0].length
      });
    }

    matches.sort((a, b) => a.index - b.index);
    let fromClause = str;
    let where = null, groupBy = null, having = null, orderBy = null, limit = null;

    if (matches.length > 0) {
      fromClause = str.slice(0, matches[0].index).trim();
      for (let i = 0; i < matches.length; i++) {
        const cur = matches[i];
        const nextIdx = (i + 1 < matches.length) ? matches[i + 1].index : str.length;
        const val = str.slice(cur.index + cur.len, nextIdx).trim();
        if (cur.name === 'WHERE') where = val;
        else if (cur.name === 'GROUP BY') groupBy = val;
        else if (cur.name === 'HAVING') having = val;
        else if (cur.name === 'ORDER BY') orderBy = val;
        else if (cur.name === 'LIMIT') limit = val;
      }
    }

    return { fromClause: fromClause.trim(), where, groupBy, having, orderBy, limit };
  }

  parseTableRef(str) {
    const s = str.trim();
    const asMatch = s.match(/^(\S+)\s+AS\s+(\S+)$/i);
    if (asMatch) return { name: asMatch[1], alias: asMatch[2] };
    const parts = s.split(/\s+/);
    if (parts.length === 1) return { name: parts[0], alias: parts[0] };
    return { name: parts[0], alias: parts[parts.length - 1] };
  }

  parseJoins(fromStr) {
    const joins = [];
    const joinRegex = /\b(INNER\s+JOIN|LEFT\s+JOIN|RIGHT\s+JOIN|JOIN)\b/i;
    const firstJoinIdx = fromStr.search(joinRegex);

    let baseStr = '';
    if (firstJoinIdx === -1) {
      baseStr = fromStr.trim();
    } else {
      baseStr = fromStr.slice(0, firstJoinIdx).trim();
      let rest = fromStr.slice(firstJoinIdx).trim();

      while (rest) {
        const match = rest.match(/^\s*(INNER\s+JOIN|LEFT\s+JOIN|RIGHT\s+JOIN|JOIN)\s+/i);
        if (!match) break;
        const joinType = match[1].toUpperCase().replace(/\s+/g, ' ');
        rest = rest.slice(match[0].length).trim();

        const onIdx = rest.search(/\bON\b/i);
        if (onIdx === -1) throw new Error(`JOIN tanpa ON: ${rest}`);

        const tblPart = rest.slice(0, onIdx).trim();
        const afterOn = rest.slice(onIdx).replace(/^\bON\b/i, '').trim();

        const nextJoinIdx = afterOn.search(/\b(INNER\s+JOIN|LEFT\s+JOIN|RIGHT\s+JOIN|JOIN)\b/i);
        let condition = '';
        if (nextJoinIdx === -1) {
          condition = afterOn.trim();
          rest = '';
        } else {
          condition = afterOn.slice(0, nextJoinIdx).trim();
          rest = afterOn.slice(nextJoinIdx).trim();
        }

        const tblRef = this.parseTableRef(tblPart);
        joins.push({
          type: joinType,
          table: tblRef.name,
          alias: tblRef.alias,
          condition
        });
      }
    }

    return { base: this.parseTableRef(baseStr), joins };
  }

  buildCombinedRows(tables, joinDef) {
    const baseTbl = this.findTable(tables, joinDef.base.name);
    if (!baseTbl) {
      throw new Error(`Tabel '${joinDef.base.name}' tidak ditemukan. Daftar tabel: ${Object.keys(tables).join(", ")}`);
    }

    const baseAlias = joinDef.base.alias;
    let combined = baseTbl.rows.map(r => ({ tables: { [baseAlias]: r } }));

    for (const j of joinDef.joins) {
      const joinTbl = this.findTable(tables, j.table);
      if (!joinTbl) throw new Error(`Tabel '${j.table}' tidak ditemukan pada JOIN`);
      const jAlias = j.alias;
      const nextCombined = [];

      if (j.type.includes('LEFT')) {
        for (const leftRow of combined) {
          let matched = false;
          for (const rightRow of joinTbl.rows) {
            const testCtx = { tables: { ...leftRow.tables, [jAlias]: rightRow } };
            if (this.evalCondition(testCtx, j.condition, tables)) {
              nextCombined.push(testCtx);
              matched = true;
            }
          }
          if (!matched) {
            const nullRow = {};
            (joinTbl.schema || joinTbl.columns).forEach(c => { nullRow[c.name] = null; });
            nextCombined.push({ tables: { ...leftRow.tables, [jAlias]: nullRow } });
          }
        }
      } else if (j.type.includes('RIGHT')) {
        const rightMatched = new Set();
        for (const leftRow of combined) {
          for (let rIdx = 0; rIdx < joinTbl.rows.length; rIdx++) {
            const rightRow = joinTbl.rows[rIdx];
            const testCtx = { tables: { ...leftRow.tables, [jAlias]: rightRow } };
            if (this.evalCondition(testCtx, j.condition, tables)) {
              nextCombined.push(testCtx);
              rightMatched.add(rIdx);
            }
          }
        }
        for (let rIdx = 0; rIdx < joinTbl.rows.length; rIdx++) {
          if (!rightMatched.has(rIdx)) {
            const nullTables = {};
            Object.keys(combined[0]?.tables || {}).forEach(k => {
              nullTables[k] = null;
            });
            nextCombined.push({ tables: { ...nullTables, [jAlias]: joinTbl.rows[rIdx] } });
          }
        }
      } else {
        // INNER JOIN
        for (const leftRow of combined) {
          for (const rightRow of joinTbl.rows) {
            const testCtx = { tables: { ...leftRow.tables, [jAlias]: rightRow } };
            if (this.evalCondition(testCtx, j.condition, tables)) {
              nextCombined.push(testCtx);
            }
          }
        }
      }
      combined = nextCombined;
    }

    return { combined };
  }

  parseSelectColumns(str) {
    return this.splitByComma(str).map(item => {
      const s = item.trim();
      const aggMatch = s.match(/^(COUNT|SUM|AVG|MIN|MAX)\s*\(\s*(.+?)\s*\)(?:\s+AS\s+(\w+)|\s+(\w+))?$/i);
      if (aggMatch) {
        const func = aggMatch[1].toUpperCase();
        const col = aggMatch[2];
        const alias = aggMatch[3] || aggMatch[4] || `${func}(${col})`;
        return { type: 'agg', func, col, alias, raw: s };
      }

      if (s === '*') return { type: 'star', table: null, raw: s, alias: '*' };
      const starMatch = s.match(/^(\w+)\.\*$/);
      if (starMatch) return { type: 'star', table: starMatch[1], raw: s, alias: s };

      const asMatch = s.match(/^(.*?)\s+AS\s+(\w+)$/i);
      if (asMatch) return { type: 'col', ref: asMatch[1].trim(), alias: asMatch[2], raw: s };

      const spaceMatch = s.match(/^(\S+(?:\.\S+)?)\s+(\w+)$/);
      if (spaceMatch && !/^(ASC|DESC)$/i.test(spaceMatch[2])) {
        return { type: 'col', ref: spaceMatch[1], alias: spaceMatch[2], raw: s };
      }

      return { type: 'col', ref: s, alias: s, raw: s };
    });
  }

  evalAggregate(func, colStr, rowList) {
    const isDistinct = /^DISTINCT\s+/i.test(colStr.trim());
    let cleanCol = colStr.trim().replace(/^DISTINCT\s+/i, '').trim();

    if (cleanCol === '*') {
      return func === 'COUNT' ? rowList.length : null;
    }

    let vals = rowList.map(r => this.resolveValue(r, cleanCol)).filter(v => v !== null && v !== undefined);

    if (isDistinct) {
      const seen = new Set();
      const uniq = [];
      for (const v of vals) {
        const s = JSON.stringify(v);
        if (!seen.has(s)) {
          seen.add(s);
          uniq.push(v);
        }
      }
      vals = uniq;
    }

    if (vals.length === 0) return func === 'COUNT' ? 0 : null;

    switch (func) {
      case 'COUNT': return vals.length;
      case 'SUM': return vals.reduce((a, b) => a + (Number(b) || 0), 0);
      case 'AVG': return vals.reduce((a, b) => a + (Number(b) || 0), 0) / vals.length;
      case 'MIN': return Math.min(...vals.map(Number));
      case 'MAX': return Math.max(...vals.map(Number));
      default: return null;
    }
  }

  resolveValue(ctx, ref) {
    const cleanRef = ref.trim().replace(/["'`]/g, '');
    if (cleanRef.includes('.')) {
      const [tbl, col] = cleanRef.split('.');
      const tLower = tbl.trim().toLowerCase();
      const cLower = col.trim().toLowerCase();
      const matchedTbl = Object.keys(ctx.tables).find(t => t.toLowerCase() === tLower);
      if (matchedTbl && ctx.tables[matchedTbl]) {
        const matchedCol = Object.keys(ctx.tables[matchedTbl]).find(c => c.toLowerCase() === cLower);
        return matchedCol ? ctx.tables[matchedTbl][matchedCol] : undefined;
      }
    }

    const cLower = cleanRef.toLowerCase();
    for (const tbl of Object.keys(ctx.tables)) {
      const obj = ctx.tables[tbl];
      if (!obj) continue;
      const matchedCol = Object.keys(obj).find(c => c.toLowerCase() === cLower);
      if (matchedCol) return obj[matchedCol];
    }
    return undefined;
  }

  evalCondition(ctx, condStr, tables) {
    const s = this.stripOuterParens(condStr.trim());
    if (!s) return true;

    // Handle OR
    const orParts = this.splitOr(s);
    if (orParts.length > 1) {
      return orParts.some(p => this.evalCondition(ctx, p, tables));
    }

    // Handle AND
    const andParts = this.splitAnd(s);
    if (andParts.length > 1) {
      return andParts.every(p => this.evalCondition(ctx, p, tables));
    }

    return this.evalSingleCondition(ctx, s, tables);
  }

  evalSingleCondition(ctx, condStr, tables) {
    const s = condStr.trim();

    // IS NOT NULL / IS NULL
    const notNullMatch = s.match(/^(.*)\s+IS\s+NOT\s+NULL\s*$/i);
    if (notNullMatch) {
      const val = this.resolveValue(ctx, notNullMatch[1].trim());
      return val !== null && val !== undefined;
    }
    const isNullMatch = s.match(/^(.*)\s+IS\s+NULL\s*$/i);
    if (isNullMatch) {
      const val = this.resolveValue(ctx, isNullMatch[1].trim());
      return val === null || val === undefined;
    }

    // BETWEEN
    const betweenMatch = s.match(/^(.*?)\s+BETWEEN\s+(.+)\s+AND\s+(.+)$/i);
    if (betweenMatch) {
      const val = this.resolveValue(ctx, betweenMatch[1].trim());
      if (val === null || val === undefined) return false;
      const low = this.parseLiteral(betweenMatch[2].trim(), ctx);
      const high = this.parseLiteral(betweenMatch[3].trim(), ctx);
      return Number(val) >= Number(low) && Number(val) <= Number(high);
    }

    // IN (val1, val2) or IN (SELECT ...)
    const inMatch = s.match(/^(.*?)\s+IN\s*\(\s*([\s\S]+)\s*\)\s*$/i);
    if (inMatch) {
      const val = this.resolveValue(ctx, inMatch[1].trim());
      const inner = inMatch[2].trim();
      if (inner.toUpperCase().startsWith('SELECT')) {
        const subRes = this.runSelect(inner, tables);
        const firstCol = subRes.columns[0];
        return subRes.rows.some(r => String(r[firstCol]) === String(val) || r[firstCol] === val);
      } else {
        const list = this.splitByComma(inner).map(item => this.parseLiteral(item.trim(), ctx));
        return list.some(item => String(item).toLowerCase() === String(val).toLowerCase() || item === val);
      }
    }

    // LIKE
    const likeMatch = s.match(/^(.*?)\s+LIKE\s+(.+)$/i);
    if (likeMatch) {
      const val = this.resolveValue(ctx, likeMatch[1].trim());
      if (val === null || val === undefined) return false;
      let pattern = likeMatch[2].trim();
      if ((pattern.startsWith("'") && pattern.endsWith("'")) || (pattern.startsWith('"') && pattern.endsWith('"'))) {
        pattern = pattern.slice(1, -1);
      }
      const regPattern = "^" + pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/%/g, ".*").replace(/_/g, ".") + "$";
      return new RegExp(regPattern, "i").test(String(val));
    }

    // Operators: =, !=, <>, >=, <=, >, <
    const compMatch = s.match(/^(.*?)\s*(=|!=|<>|>=|<=|>|<)\s*(.+)$/i);
    if (compMatch) {
      const leftKey = compMatch[1].trim();
      const op = compMatch[2];
      const rightKey = compMatch[3].trim();

      const leftVal = this.resolveValue(ctx, leftKey);
      let rightVal;

      const strippedRight = this.stripOuterParens(rightKey);
      if (strippedRight.toUpperCase().startsWith('SELECT')) {
        const subRes = this.runSelect(strippedRight, tables);
        rightVal = subRes.rows.length ? subRes.rows[0][subRes.columns[0]] : null;
      } else {
        rightVal = this.parseLiteral(rightKey, ctx);
      }

      if (leftVal === null || leftVal === undefined) {
        if (op === '=') return rightVal === null || rightVal === undefined;
        if (op === '!=' || op === '<>') return !(rightVal === null || rightVal === undefined);
        return false;
      }
      if (rightVal === null || rightVal === undefined) {
        if (op === '=') return false;
        if (op === '!=' || op === '<>') return true;
        return false;
      }

      const numLeft = Number(leftVal);
      const numRight = Number(rightVal);
      const isNum = !isNaN(numLeft) && !isNaN(numRight) && typeof leftVal !== 'boolean' && typeof rightVal !== 'boolean';

      const a = isNum ? numLeft : String(leftVal).toLowerCase();
      const b = isNum ? numRight : String(rightVal).toLowerCase();

      switch (op) {
        case '=': return a === b;
        case '!=':
        case '<>': return a !== b;
        case '>': return a > b;
        case '<': return a < b;
        case '>=': return a >= b;
        case '<=': return a <= b;
        default: return false;
      }
    }

    throw new Error(`Kondisi tidak dikenali: "${s}"`);
  }

  parseLiteral(str, ctx) {
    const s = str.trim();
    if (s.toUpperCase() === 'NULL') return null;
    if ((s.startsWith("'") && s.endsWith("'")) || (s.startsWith('"') && s.endsWith('"'))) {
      return s.slice(1, -1).replace(/''/g, "'");
    }
    if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s);
    if (ctx) {
      const resolved = this.resolveValue(ctx, s);
      if (resolved !== undefined) return resolved;
    }
    return s;
  }

  splitUnion(sql) {
    const parts = [];
    let depth = 0, inSingle = false, inDouble = false, startIdx = 0;
    for (let i = 0; i < sql.length; i++) {
      const c = sql[i];
      if (c === "'" && !inDouble) { inSingle = !inSingle; continue; }
      if (c === '"' && !inSingle) { inDouble = !inDouble; continue; }
      if (inSingle || inDouble) continue;
      if (c === '(') depth++;
      else if (c === ')') depth--;
      else if (depth === 0) {
        const slice = sql.slice(i);
        const m = slice.match(/^\s*UNION\s+/i);
        if (m) {
          parts.push(sql.slice(startIdx, i).trim());
          i += m[0].length - 1;
          startIdx = i + 1;
        }
      }
    }
    parts.push(sql.slice(startIdx).trim());
    return parts.filter(p => p);
  }

  splitByComma(str) {
    const parts = [];
    let depth = 0, inSingle = false, inDouble = false, startIdx = 0;
    for (let i = 0; i < str.length; i++) {
      const c = str[i];
      if (c === "'" && !inDouble) { inSingle = !inSingle; continue; }
      if (c === '"' && !inSingle) { inDouble = !inDouble; continue; }
      if (inSingle || inDouble) continue;
      if (c === '(') depth++;
      else if (c === ')') depth--;
      else if (c === ',' && depth === 0) {
        parts.push(str.slice(startIdx, i).trim());
        startIdx = i + 1;
      }
    }
    parts.push(str.slice(startIdx).trim());
    return parts.filter(p => p);
  }

  splitOr(str) {
    const parts = [];
    let depth = 0, inSingle = false, inDouble = false, startIdx = 0;
    for (let i = 0; i < str.length; i++) {
      const c = str[i];
      if (c === "'" && !inDouble) { inSingle = !inSingle; continue; }
      if (c === '"' && !inSingle) { inDouble = !inDouble; continue; }
      if (inSingle || inDouble) continue;
      if (c === '(') depth++;
      else if (c === ')') depth--;
      else if (depth === 0) {
        const slice = str.slice(i);
        const m = slice.match(/^\s*OR\s+/i);
        if (m) {
          parts.push(str.slice(startIdx, i).trim());
          i += m[0].length - 1;
          startIdx = i + 1;
        }
      }
    }
    parts.push(str.slice(startIdx).trim());
    return parts.filter(p => p);
  }

  splitAnd(str) {
    const parts = [];
    let depth = 0, inSingle = false, inDouble = false, startIdx = 0;
    for (let i = 0; i < str.length; i++) {
      const c = str[i];
      if (c === "'" && !inDouble) { inSingle = !inSingle; continue; }
      if (c === '"' && !inSingle) { inDouble = !inDouble; continue; }
      if (inSingle || inDouble) continue;
      if (c === '(') depth++;
      else if (c === ')') depth--;
      else if (depth === 0) {
        const slice = str.slice(i);
        const m = slice.match(/^\s*AND\s+/i);
        if (m) {
          parts.push(str.slice(startIdx, i).trim());
          i += m[0].length - 1;
          startIdx = i + 1;
        }
      }
    }
    parts.push(str.slice(startIdx).trim());
    return parts.filter(p => p);
  }

  stripOuterParens(str) {
    let s = str.trim();
    while (s.startsWith('(') && s.endsWith(')')) {
      let depth = 0, wrapsEntire = true;
      for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') depth++;
        else if (s[i] === ')') depth--;
        if (depth === 0 && i < s.length - 1) {
          wrapsEntire = false;
          break;
        }
      }
      if (wrapsEntire) s = s.slice(1, -1).trim();
      else break;
    }
    return s;
  }
}

export const sqlEngine = new SqlEngine();
