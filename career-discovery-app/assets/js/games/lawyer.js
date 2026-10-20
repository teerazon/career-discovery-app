/**
 * Career Discovery Platform - Lawyer Minigame Simulation (Ace Attorney Style)
 * 24H Simulation: Witness Contradiction -> Objection! -> Law Article Search
 */
import { gameService } from '../services/gameService.js';
import { getRelativePath, showToast } from '../utils/router.js';

let state = {
  currentStage: 1,
  totalScore: 0,
  skills: {
    analytical: 0,
    problemSolving: 0,
    communication: 0,
    thoroughness: 0
  },
  strengths: [],
  areasToImprove: [],
  detailedAnswers: []
};

export function initLawyerGame() {
  renderStage1();
}

function updateHUD(timeStr, scoreDelta = 0) {
  state.totalScore += scoreDelta;
  const timeEl = document.getElementById('hud-time');
  const scoreEl = document.getElementById('hud-score');
  if (timeEl) timeEl.textContent = timeStr;
  if (scoreEl) scoreEl.textContent = `${state.totalScore} / 100`;

  document.querySelectorAll('.timeline-checkpoint').forEach((cp, idx) => {
    if (idx + 1 < state.currentStage) {
      cp.className = 'timeline-checkpoint done';
    } else if (idx + 1 === state.currentStage) {
      cp.className = 'timeline-checkpoint active';
    } else {
      cp.className = 'timeline-checkpoint';
    }
  });
}

function triggerScreenShake() {
  const container = document.getElementById('game-stage-container');
  if (container) {
    container.classList.add('shake-animation');
    setTimeout(() => container.classList.remove('shake-animation'), 400);
  }
}

/**
 * Stage 1: 09:30 น. - สืบพยานจับโกหกคำพูดพยาน (Witness Contradiction)
 */
function renderStage1() {
  state.currentStage = 1;
  updateHUD('09:30 น. (เริ่มการพิจารณาคดี)', 0);

  const container = document.getElementById('game-stage-container');
  container.innerHTML = `
    <div class="stage-card animate-fade-in">
      <div class="scenario-badge-row">
        <span class="badge badge-amber"><i class="fa-solid fa-gavel"></i> บัลลังก์ศาลคดีอาญา: สืบพยานฝ่ายโจทก์</span>
        <span class="badge badge-rose"><i class="fa-solid fa-eye"></i> จับพิรุธและคำให้การเท็จ</span>
      </div>

      <div class="courtroom-banner">
        <span style="font-size:0.9rem; color:#f59e0b; text-transform:uppercase; letter-spacing:0.1em; font-weight:700;">
          คดีลักทรัพย์ในโรงแรมหรู (จำเลยยืนยันความบริสุทธิ์)
        </span>
      </div>

      <div class="witness-box">
        <div style="font-weight:700; color:#f59e0b; margin-bottom:6px;">
          <i class="fa-solid fa-user-tie"></i> นายวิโรจน์ (พยานนักธุรกิจสายเทา ให้การบนศาล):
        </div>
        <p>
          "ในคืนเกิดเหตุเวลา 21.00 น. ผมยืนสูบบุหรี่อยู่ที่ระเบียงชั้น 3 ที่มืดสนิทไม่มีแสงไฟ 
          ผมเห็นจำเลยคนนี้ชัดเจนกำลังงัดตู้เซฟในห้องฝั่งตรงข้ามห่างออกไป 100 เมตร และใส่เสื้อแจ็กเก็ตสีเขียวสะท้อนแสง 
          ทั้งที่ในรายงานกล้องวงจรปิดของโรงแรมบันทึกว่าไฟดับทั่วอาคารตั้งแต่ 20.30 น. และจำเลยใส่เสื้อเชิ้ตขาว!"
        </p>
      </div>

      <h3 style="margin-bottom: 1rem; font-size: 1.15rem;">ในฐานะทนายจำเลย ข้อใดคือ "จุดขัดแย้งสำคัญ" ที่ใช้ทำลายน้ำหนักคำพยาน?</h3>

      <div class="choices-grid">
        <button class="choice-btn" data-choice="1">
          <span>A. ชี้ให้ศาลเห็นว่า ระยะห่าง 100 เมตรในที่มืดสนิทไฟดับ ย่อมเป็นไปไม่ได้ที่จะมองเห็นหน้าจำเลยชัดเจน และสีเสื้อขัดแย้งกับหลักฐานกล้องวงจรปิด</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-choice="2">
          <span>B. ตะโกนด่าพยานว่าใส่ร้ายจำเลย และขอให้ศาลลงโทษพยานทันที</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-choice="3">
          <span>C. ยอมรับคำให้การพยานแต่ขอความเมตตาลดโทษกึ่งหนึ่งเพราะจำเลยยากจน</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-choice="4">
          <span>D. ถามพยานว่าบุหรี่ที่สูบเป็นยี่ห้ออะไรและซื้อมาจากร้านไหน</span>
          <i class="fa-regular fa-circle"></i>
        </button>
      </div>
    </div>
  `;

  container.querySelectorAll('.choice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const choice = btn.dataset.choice;
      container.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);

      if (choice === '1') {
        btn.classList.add('selected-correct');
        showToast('จับโกหกพยานสำเร็จ! ศาลบันทึกข้อพิรุธลงสำนวน (+35 คะแนน)', 'success');
        state.skills.analytical += 35;
        state.skills.communication += 30;
        state.skills.thoroughness += 30;
        state.strengths.push('จับจุดขัดแย้งของพยานหลักฐานเชิงกายภาพในศาลได้อย่างเฉียบคม');
        state.detailedAnswers.push({
          title: 'เคสที่ 1: การซักค้านพยานโจทก์ (Cross-Examination)',
          score: '+35/35',
          status: 'correct',
          note: 'ชี้ข้อจำกัดด้านทัศนวิสัย 100 เมตรในความมืดและข้อขัดแย้งของภาพกล้องวงจรปิดได้สมบูรณ์'
        });
        updateHUD('09:30 น.', 35);
      } else {
        btn.classList.add('selected-wrong');
        showToast('ข้อโต้แย้งไม่มีน้ำหนักในทางพิจารณาคดี (+10 คะแนน)', 'error');
        state.skills.thoroughness += 10;
        state.areasToImprove.push('ต้องจับใจความข้อขัดแย้งเชิงพยานหลักฐานมากกว่าการใช้อารมณ์');
        state.detailedAnswers.push({
          title: 'เคสที่ 1: การซักค้านพยานโจทก์ (Cross-Examination)',
          score: '+10/35',
          status: 'wrong',
          note: 'ไม่สามารถชี้จุดพิรุธสำคัญของพยานเพื่อหักล้างข้อกล่าวหาได้'
        });
        updateHUD('09:30 น.', 10);
      }

      setTimeout(() => renderStage2(), 1800);
    });
  });
}

/**
 * Stage 2: 13:30 น. - ปุ่ม "คัดค้าน!" OBJECTION! จังหวะที่อัยการถามชี้นำนอกเรื่อง
 */
function renderStage2() {
  state.currentStage = 2;
  updateHUD('13:30 น. (ช่วงซักถามของอัยการ)', 0);

  const container = document.getElementById('game-stage-container');
  container.innerHTML = `
    <div class="stage-card animate-fade-in">
      <div class="scenario-badge-row">
        <span class="badge badge-rose"><i class="fa-solid fa-bolt"></i> 13:30 น. จังหวะสำคัญ: อัยการถามคำถามชี้นำ</span>
        <span class="badge badge-amber"><i class="fa-solid fa-stopwatch"></i> ไหวพริบและสมาธิ</span>
      </div>

      <div class="scenario-desc-box" style="border-left-color: #ef4444;">
        <p>
          <strong>พนักงานอัยการกำลังถามจำเลย:</strong><br>
          <em>"จำเลยยอมรับใช่ไหมว่า เมื่อ 5 ปีก่อนเคยทำแก้วน้ำตกแตกที่ร้านอาหาร แสดงว่าจำเลยเป็นคนมีนิสัยก้าวร้าวชอบทำลายทรัพย์สินและมีแนวโน้มขโมยเงินคดีนี้ใช่หรือไม่?!"</em>
        </p>
      </div>

      <div style="text-align:center; padding:1.5rem 0;">
        <p style="color:var(--text-muted); margin-bottom:1.5rem; font-size:1.05rem;">
          คำถามนี้เป็นคำถามชี้นำและนำเรื่องในอดีตที่ไม่เกี่ยวกับข้อเท็จจริงในคดีมาปรักปรำจำเลย!
        </p>
        
        <button id="objection-button" class="objection-btn">
          <i class="fa-solid fa-hand"></i> คัดค้านครับท่าน! (OBJECTION!)
        </button>

        <div style="margin-top:1.5rem;">
          <button id="pass-objection-btn" class="btn btn-ghost btn-sm" style="color:var(--text-dim);">
            ปล่อยให้อัยการถามต่อไป (ไม่คัดค้าน)
          </button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('objection-button').addEventListener('click', () => {
    triggerScreenShake();
    showToast('คัดค้านสำเร็จ! ผู้พิพากษา: "คำคัดค้านของทนายจำเลยฟังขึ้น ห้ามอัยการถามชี้นำนอกประเด็น" (+35 คะแนน)', 'success');
    state.skills.problemSolving += 35;
    state.skills.analytical += 30;
    state.skills.communication += 35;
    state.strengths.push('ใช้สิทธิคัดค้านคำถามชี้นำ (Leading Question) ได้ถูกจังหวะตาม ป.วิ.อ.');
    state.detailedAnswers.push({
      title: 'เคสที่ 2: สิทธิการคัดค้านในชั้นศาล (Objection)',
      score: '+35/35',
      status: 'correct',
      note: 'คัดค้านคำถามชี้นำและข้อเท็จจริงนอกประเด็นเพื่อปกป้องสิทธิของจำเลยได้ทันท่วงที'
    });
    updateHUD('13:30 น.', 35);

    setTimeout(() => renderStage3(), 2000);
  });

  document.getElementById('pass-objection-btn').addEventListener('click', () => {
    showToast('คุณปล่อยให้อัยการใส่ร้ายจำเลยจนศาลบันทึกข้อเสียเปรียบ (+10 คะแนน)', 'error');
    state.skills.thoroughness += 10;
    state.areasToImprove.push('ต้องกล้าลุกขึ้นคัดค้านเมื่อฝ่ายตรงข้ามถามนอกประเด็น');
    state.detailedAnswers.push({
      title: 'เคสที่ 2: สิทธิการคัดค้านในชั้นศาล (Objection)',
      score: '+10/35',
      status: 'wrong',
      note: 'นิ่งเฉยต่อคำถามชี้นำที่สร้างความเสียหายต่อลูกความ'
    });
    updateHUD('13:30 น.', 10);

    setTimeout(() => renderStage3(), 1800);
  });
}

/**
 * Stage 3: 15:30 น. - ค้นหามาตรากฎหมายอ้างอิงปิดคดี (Legal Code Lookup)
 */
function renderStage3() {
  state.currentStage = 3;
  updateHUD('15:30 น. (ค้นตัวบทแถลงการณ์)', 0);

  const container = document.getElementById('game-stage-container');
  container.innerHTML = `
    <div class="stage-card animate-fade-in">
      <div class="scenario-badge-row">
        <span class="badge badge-purple"><i class="fa-solid fa-book-bookmark"></i> 15:30 น. แถลงการณ์ปิดคดี: ป.วิ.อ. ยกประโยชน์แห่งความสงสัย</span>
        <span class="badge badge-cyan"><i class="fa-solid fa-scale-balanced"></i> กฎหมายวิธีพิจารณาความอาญา</span>
      </div>

      <div class="scenario-desc-box">
        <p>
          พยานหลักฐานของโจทก์มีข้อสงสัยตามสมควรว่าจำเลยได้กระทำความผิดจริงหรือไม่ 
          ในการทำคำแถลงการณ์ปิดคดีเพื่อขอให้ศาล <strong>"พิพากษายกฟ้อง"</strong> ตามหลักสากล Presumption of Innocence 
          คุณต้องอ้างอิงหลักการใดตาม <strong>ประมวลกฎหมายวิธีพิจารณาความอาญา มาตรา 227 วรรคสอง</strong>?
        </p>
      </div>

      <div class="choices-grid">
        <button class="choice-btn" data-law="1">
          <span>A. "เมื่อมีความสงสัยตามสมควรว่าจำเลยได้กระทำผิดหรือไม่ ให้ยกประโยชน์แห่งความสงสัยนั้นให้จำเลย" (มาตรา 227 วรรคสอง)</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-law="2">
          <span>B. "หากจำเลยไม่มีพยานแก้ต่าง ให้สันนิษฐานไว้ก่อนว่าจำเลยมีความผิดตามฟ้อง"</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-law="3">
          <span>C. "ให้ศาลส่งตัวจำเลยไปกักขังจนกว่าจะหาหลักฐานพิสูจน์ความบริสุทธิ์ได้"</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-law="4">
          <span>D. "ให้จำเลยและโจทก์เป่ายิ้งฉุบเพื่อยุติข้อพิพาทในศาล"</span>
          <i class="fa-regular fa-circle"></i>
        </button>
      </div>
    </div>
  `;

  container.querySelectorAll('.choice-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const choice = btn.dataset.law;
      container.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);

      let stageScore = 0;
      if (choice === '1') {
        btn.classList.add('selected-correct');
        stageScore = 30;
        state.skills.analytical += 30;
        state.skills.problemSolving += 35;
        state.skills.thoroughness += 35;
        state.strengths.push('แม่นยำในหลักการยกประโยชน์แห่งความสงสัยตาม ป.วิ.อ. ม.227');
        state.detailedAnswers.push({
          title: 'เคสที่ 3: แถลงการณ์ปิดคดียกฟ้องตาม ป.วิ.อ.',
          score: '+30/30',
          status: 'correct',
          note: 'อ้างอิง ม.227 วรรคสอง เพื่อคุ้มครองสิทธิมนุษยชนของจำเลยผู้บริสุทธิ์ได้สำเร็จ ศาลพิพากษายกฟ้อง!'
        });
        showToast('ศาลพิพากษายกฟ้อง! ลูกความพ้นมลทินอย่างสมเกียรติ (+30 คะแนน)', 'success');
      } else {
        btn.classList.add('selected-wrong');
        stageScore = 10;
        state.areasToImprove.push('ทบทวนหลักการพื้นฐานคดีอาญาและ Presumption of Innocence');
        state.detailedAnswers.push({
          title: 'เคสที่ 3: แถลงการณ์ปิดคดียกฟ้องตาม ป.วิ.อ.',
          score: '+10/30',
          status: 'wrong',
          note: 'อ้างอิงหลักกฎหมายไม่ถูกต้องตามประมวลกฎหมายวิธีพิจารณาความอาญา'
        });
        showToast('หลักกฎหมายไม่ถูกต้อง (+10 คะแนน)', 'error');
      }

      updateHUD('17:00 น. คำพิพากษาเสร็จสิ้น', stageScore);
      await finishLawyerGame();
    });
  });
}

async function finishLawyerGame() {
  const container = document.getElementById('game-stage-container');
  container.innerHTML = `
    <div class="stage-card text-center animate-fade-in" style="text-align:center; padding:3rem;">
      <i class="fa-solid fa-scale-balanced" style="font-size:3.5rem; color:#f59e0b; margin-bottom:1rem;"></i>
      <h2 style="margin-bottom:0.75rem;">จบการจำลองอาชีพทนายความ (Trial Concluded)</h2>
      <p style="color:var(--text-muted); margin-bottom:2rem;">กำลังประมวลผลทักษะการว่าความ การคิดวิเคราะห์ และการคัดค้าน...</p>
      <div class="progress-container" style="max-width:300px; margin:0 auto;">
        <div class="progress-bar" style="width:100%;"></div>
      </div>
    </div>
  `;

  await gameService.saveGameLog({
    career_id: 'lawyer',
    career_name: 'ทนายความ (Lawyer & Counsel)',
    total_score: state.totalScore,
    max_score: 100,
    skills_analytical: Math.min(100, state.skills.analytical),
    skills_problem_solving: Math.min(100, state.skills.problemSolving),
    skills_communication: Math.min(100, state.skills.communication),
    skills_thoroughness: Math.min(100, state.skills.thoroughness),
    strengths: state.strengths,
    areas_to_improve: state.areasToImprove,
    case_summary: 'ว่าความคดีลักทรัพย์ ซักค้านพยานนักธุรกิจสายเทา คัดค้านคำถามชี้นำ และอ้างอิง ป.วิ.อ. ม.227 วรรคสอง',
    detailed_answers: state.detailedAnswers
  });

  setTimeout(() => {
    window.location.href = getRelativePath('pages/score-summary.html');
  }, 1800);
}
