/**
 * Career Discovery Platform - Game Service
 * Records gameplay logs, skill breakdown, strengths and development areas
 */
import { supabase, isMockMode } from '../config/supabase.js';
import { authService } from './authService.js';

export const gameService = {
  /**
   * Save a completed game run
   */
  async saveGameLog({
    career_id,
    career_name,
    total_score,
    max_score = 100,
    skills_analytical,
    skills_problem_solving,
    skills_communication,
    skills_thoroughness,
    strengths = [],
    areas_to_improve = [],
    case_summary = '',
    detailed_answers = []
  }) {
    const profile = await authService.getCurrentProfile();
    const user_id = profile?.id || 'guest_user';

    const logRecord = {
      id: 'log_' + Date.now(),
      user_id,
      career_id,
      career_name,
      total_score,
      max_score,
      skills_analytical: Math.min(100, Math.max(0, skills_analytical)),
      skills_problem_solving: Math.min(100, Math.max(0, skills_problem_solving)),
      skills_communication: Math.min(100, Math.max(0, skills_communication)),
      skills_thoroughness: Math.min(100, Math.max(0, skills_thoroughness)),
      strengths,
      areas_to_improve,
      case_summary,
      detailed_answers,
      created_at: new Date().toISOString()
    };

    // Store as latest score for immediate retrieval by score-summary.html
    localStorage.setItem('cda_latest_game_log', JSON.stringify(logRecord));

    // Store in all user logs
    const existingLogs = JSON.parse(localStorage.getItem('cda_mock_game_logs') || '[]');
    existingLogs.unshift(logRecord);
    localStorage.setItem('cda_mock_game_logs', JSON.stringify(existingLogs));

    // Sync to Supabase if connected
    if (!isMockMode && user_id !== 'guest_user') {
      try {
        await supabase.from('game_logs').insert([
          {
            user_id,
            career_id,
            total_score,
            skills_analytical: logRecord.skills_analytical,
            skills_problem_solving: logRecord.skills_problem_solving,
            skills_communication: logRecord.skills_communication,
            skills_thoroughness: logRecord.skills_thoroughness,
            strengths,
            areas_to_improve
          }
        ]);
      } catch (err) {
        console.warn('Game log sync to Supabase notice:', err);
      }
    }

    return { success: true, log: logRecord };
  },

  /**
   * Retrieve the most recent game log for score-summary.html
   */
  getLatestScore() {
    const raw = localStorage.getItem('cda_latest_game_log');
    if (!raw) {
      // Default demo score for immediate preview if accessed directly
      return {
        career_id: 'pharmacist',
        career_name: 'เภสัชกร (Pharmacist)',
        total_score: 88,
        max_score: 100,
        skills_analytical: 85,
        skills_problem_solving: 90,
        skills_communication: 82,
        skills_thoroughness: 94,
        strengths: [
          'สังเกตการแพ้ยาของผู้ป่วยได้อย่างแม่นยำ',
          'นับเม็ดยาและจ่ายเวชภัณฑ์ด้วยความระมัดระวังรอบคอบสูง',
          'อธิบายคำเตือนการใช้ยาปฏิชีวนะได้เข้าใจง่ายและกระชับ'
        ],
        areas_to_improve: [
          'ควรระวังการซักถามประวัติผู้ป่วยเรื้อรังที่ใช้ยาหลายชนิดร่วมกัน (Polypharmacy)',
          'ปรับปรุงความเร็วในการคัดกรองเคสจ่ายยาด่วนช่วง Rush Hour'
        ],
        detailed_answers: [
          { title: 'วิเคราะห์อาการและประวัติแพ้ยา', score: '+30/30', status: 'correct', note: 'เลือกยาถูกต้อง ไม่เกิดปฏิกิริยาแพ้ยาซ้ำ' },
          { title: 'นับเม็ดยาลงถาดปัดจำนวน', score: '+28/30', status: 'correct', note: 'ปัดเม็ดยาได้ครบถ้วนตามใบสั่งยา' },
          { title: 'ให้คำแนะนำเตือนการใช้ยาเคสผู้สูงอายุ', score: '+30/40', status: 'partial', note: 'เน้นย้ำเวลาทานยา แต่ลืมเตือนเรื่องการดื่มน้ำตามมากๆ' }
        ]
      };
    }
    return JSON.parse(raw);
  },

  /**
   * Get all past game history for profile
   */
  async getUserGameLogs(userId) {
    const allLogs = JSON.parse(localStorage.getItem('cda_mock_game_logs') || '[]');
    if (allLogs.length > 0) return allLogs;

    // Seed initial mock logs if empty so profile page has beautiful stats
    const seeded = [
      {
        id: 'log_seed_1',
        career_id: 'pharmacist',
        career_name: 'เภสัชกร (Pharmacist)',
        total_score: 92,
        skills_analytical: 88,
        skills_problem_solving: 90,
        skills_communication: 85,
        skills_thoroughness: 96,
        created_at: new Date(Date.now() - 86400000 * 2).toISOString()
      },
      {
        id: 'log_seed_2',
        career_id: 'programmer',
        career_name: 'โปรแกรมเมอร์ (Software Engineer)',
        total_score: 85,
        skills_analytical: 92,
        skills_problem_solving: 94,
        skills_communication: 72,
        skills_thoroughness: 80,
        created_at: new Date(Date.now() - 86400000 * 5).toISOString()
      }
    ];
    localStorage.setItem('cda_mock_game_logs', JSON.stringify(seeded));
    return seeded;
  },

  /**
   * Compute aggregated 4-skills development averages
   */
  async getSkillAverages(userId) {
    const logs = await this.getUserGameLogs(userId);
    if (!logs.length) {
      return { analytical: 80, problemSolving: 85, communication: 78, thoroughness: 88 };
    }

    const totals = logs.reduce(
      (acc, curr) => {
        acc.analytical += curr.skills_analytical || 0;
        acc.problemSolving += curr.skills_problem_solving || 0;
        acc.communication += curr.skills_communication || 0;
        acc.thoroughness += curr.skills_thoroughness || 0;
        return acc;
      },
      { analytical: 0, problemSolving: 0, communication: 0, thoroughness: 0 }
    );

    const count = logs.length;
    return {
      analytical: Math.round(totals.analytical / count),
      problemSolving: Math.round(totals.problemSolving / count),
      communication: Math.round(totals.communication / count),
      thoroughness: Math.round(totals.thoroughness / count)
    };
  }
};

export default gameService;
