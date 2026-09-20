// DBLearn State Management with LocalStorage persistence
import { MOCK_USERS, INITIAL_SUBMISSIONS, INITIAL_QUIZ_SCORES } from './data/mockData.js';
import { SAMPLE_SCHEMAS } from './data/schemas.js';

const STORAGE_KEYS = {
  CURRENT_ROLE: 'dblearn_current_role',
  COMPLETED_MEETINGS: 'dblearn_completed_meetings',
  CURRENT_MEETING: 'dblearn_current_meeting',
  QUIZ_SCORES: 'dblearn_quiz_scores',
  SUBMISSIONS: 'dblearn_submissions',
  QUERY_HISTORY: 'dblearn_query_history',
  DATABASES: 'dblearn_databases',
  ACTIVE_DB: 'dblearn_active_db'
};

class AppState {
  constructor() {
    this.listeners = [];
    this.init();
  }

  init() {
    // Current role: 'mahasiswa' or 'dosen'
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_ROLE)) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_ROLE, 'mahasiswa');
    }

    // Completed meetings: [1, 2, 3, 4, 5, 6] by default for student
    if (!localStorage.getItem(STORAGE_KEYS.COMPLETED_MEETINGS)) {
      localStorage.setItem(STORAGE_KEYS.COMPLETED_MEETINGS, JSON.stringify([1, 2, 3, 4, 5, 6]));
    }

    // Current meeting ID
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_MEETING)) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_MEETING, '7');
    }

    // Quiz scores
    if (!localStorage.getItem(STORAGE_KEYS.QUIZ_SCORES)) {
      localStorage.setItem(STORAGE_KEYS.QUIZ_SCORES, JSON.stringify(INITIAL_QUIZ_SCORES));
    }

    // Submissions
    if (!localStorage.getItem(STORAGE_KEYS.SUBMISSIONS)) {
      localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(INITIAL_SUBMISSIONS));
    }

    // Query history
    if (!localStorage.getItem(STORAGE_KEYS.QUERY_HISTORY)) {
      const initialHistory = [
        'SELECT * FROM mahasiswa;',
        'SELECT prodi, COUNT(*) FROM mahasiswa GROUP BY prodi;',
        'SELECT m.nama, mk.nama_mk FROM mahasiswa m JOIN krs k ON m.nim = k.nim JOIN mata_kuliah mk ON k.kode_mk = mk.kode_mk;'
      ];
      localStorage.setItem(STORAGE_KEYS.QUERY_HISTORY, JSON.stringify(initialHistory));
    }

    // Active Database
    if (!localStorage.getItem(STORAGE_KEYS.ACTIVE_DB)) {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_DB, 'akademik');
    }

    // In-memory or persisted working databases
    if (!localStorage.getItem(STORAGE_KEYS.DATABASES)) {
      this.resetDatabases();
    }
  }

  // Event Subscription
  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notify() {
    this.listeners.forEach(cb => cb(this));
  }

  // Role Management
  getCurrentRole() {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_ROLE) || 'mahasiswa';
  }

  setRole(role) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_ROLE, role);
    this.notify();
  }

  getCurrentUser() {
    const role = this.getCurrentRole();
    return role === 'dosen' ? MOCK_USERS.lecturer : MOCK_USERS.student;
  }

  // Meetings Progress
  getCompletedMeetings() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.COMPLETED_MEETINGS)) || [];
    } catch {
      return [];
    }
  }

  toggleMeetingCompleted(meetingId) {
    const id = parseInt(meetingId, 10);
    let list = this.getCompletedMeetings();
    if (list.includes(id)) {
      list = list.filter(m => m !== id);
    } else {
      list.push(id);
      list.sort((a, b) => a - b);
    }
    localStorage.setItem(STORAGE_KEYS.COMPLETED_MEETINGS, JSON.stringify(list));
    this.notify();
  }

  isMeetingCompleted(meetingId) {
    return this.getCompletedMeetings().includes(parseInt(meetingId, 10));
  }

  getCurrentMeetingId() {
    return parseInt(localStorage.getItem(STORAGE_KEYS.CURRENT_MEETING) || '7', 10);
  }

  setCurrentMeetingId(meetingId) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_MEETING, meetingId.toString());
    this.notify();
  }

  // Quiz Scores
  getQuizScores() {
    try {
      const allScores = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZ_SCORES)) || {};
      const user = this.getCurrentUser();
      return allScores[user.identifier] || {};
    } catch {
      return {};
    }
  }

  saveQuizScore(meetingId, score) {
    const allScores = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZ_SCORES)) || {};
    const user = this.getCurrentUser();
    if (!allScores[user.identifier]) {
      allScores[user.identifier] = {};
    }
    allScores[user.identifier][meetingId] = score;
    localStorage.setItem(STORAGE_KEYS.QUIZ_SCORES, JSON.stringify(allScores));
    
    // Auto complete meeting if score >= 70
    if (score >= 70 && !this.isMeetingCompleted(meetingId)) {
      this.toggleMeetingCompleted(meetingId);
    } else {
      this.notify();
    }
  }

  // Submissions
  getSubmissions() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBMISSIONS)) || [];
    } catch {
      return [];
    }
  }

  addSubmission(assignmentId, content) {
    const submissions = this.getSubmissions();
    const user = this.getCurrentUser();
    const newSub = {
      id: 'sub_' + Date.now(),
      assignmentId,
      studentNim: user.identifier,
      studentName: user.name,
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      content,
      status: 'pending',
      score: null,
      feedback: null
    };
    submissions.push(newSub);
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
    this.notify();
    return newSub;
  }

  gradeSubmission(submissionId, score, feedback) {
    const submissions = this.getSubmissions();
    const index = submissions.findIndex(s => s.id === submissionId);
    if (index !== -1) {
      submissions[index].score = parseFloat(score);
      submissions[index].feedback = feedback;
      submissions[index].status = 'graded';
      localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
      this.notify();
    }
  }

  // Query History
  getQueryHistory() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.QUERY_HISTORY)) || [];
    } catch {
      return [];
    }
  }

  addQueryHistory(query) {
    if (!query || !query.trim()) return;
    const history = this.getQueryHistory().filter(q => q.trim() !== query.trim());
    history.unshift(query.trim());
    if (history.length > 30) history.pop();
    localStorage.setItem(STORAGE_KEYS.QUERY_HISTORY, JSON.stringify(history));
    this.notify();
  }

  // Active Database
  getActiveDb() {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_DB) || 'akademik';
  }

  setActiveDb(dbName) {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_DB, dbName);
    this.notify();
  }

  getDatabases() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.DATABASES)) || SAMPLE_SCHEMAS;
    } catch {
      return SAMPLE_SCHEMAS;
    }
  }

  saveDatabases(dbs) {
    localStorage.setItem(STORAGE_KEYS.DATABASES, JSON.stringify(dbs));
    this.notify();
  }

  resetDatabases() {
    // Deep clone sample schemas
    const cloned = JSON.parse(JSON.stringify(SAMPLE_SCHEMAS));
    localStorage.setItem(STORAGE_KEYS.DATABASES, JSON.stringify(cloned));
    this.notify();
  }
}

export const state = new AppState();
