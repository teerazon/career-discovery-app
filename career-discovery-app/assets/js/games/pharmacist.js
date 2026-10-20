/**
 * Career Discovery Platform - Pharmacist Minigame Simulation
 * 24H Simulation: Triage -> Pill Counting Tray -> Medication Counseling
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
  detailedAnswers: [],
  pillCount: 0,
  targetPillCount: 20,
  timerSeconds: 45,
  timerInterval: null
};

export function initPharmacistGame() {
  renderStage1();
}

function updateHUD(timeStr, scoreDelta = 0) {
  state.totalScore += scoreDelta;
  const timeEl = document.getElementById('hud-time');
  const scoreEl = document.getElementById('hud-score');
  if (timeEl) timeEl.textContent = timeStr;
  if (scoreEl) scoreEl.textContent = `${state.totalScore} / 100`;

  // Update timeline checkpoints
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

/**
 * Stage 1: 08:30 น. - ซักประวัติ & ตรวจสอบการแพ้ยา (Triage & Allergy Check)
 */
function renderStage1() {
  state.currentStage = 1;
  updateHUD('08:30 น. (เช้า)', 0);

  const container = document.getElementById('game-stage-container');
  container.innerHTML = `
    <div class="stage-card animate-fade-in">
      <div class="scenario-badge-row">
        <span class="badge badge-emerald"><i class="fa-solid fa-clock"></i> 08:30 น. เคสที่ 1: แผนกจ่ายยาผู้ป่วยนอก</span>
        <span class="badge badge-amber"><i class="fa-solid fa-triangle-exclamation"></i> ความรอบคอบระดับสูง</span>
      </div>

      <div class="scenario-desc-box">
        <p>
          <strong>คุณลุงสมศักดิ์ อายุ 68 ปี</strong> มีโรคประจำตัวคือ <em>โรคไตเรื้อรังระดับ 3</em> และ <em>โรคความดันโลหิตสูง</em> 
          เดินเข้ามาพร้อมใบสั่งยาจากคลินิกภายนอกระบุขอซื้อ <strong>ยาแก้ปวดข้ออักเสบ NSAIDs (Diclofenac)</strong> ชนิดแรงร่วมกับยาปฏิชีวนะ 
          โดยประวัติของคุณลุงเคยระบุว่า <strong>มีประวัติแพ้ยาตระกูล Sulfa</strong>
        </p>
      </div>

      <h3 style="margin-bottom: 1rem; font-size: 1.15rem;">ในฐานะเภสัชกร คุณควรดำเนินการอย่างไรเป็นอันดับแรก?</h3>

      <div class="choices-grid">
        <button class="choice-btn" data-choice="1">
          <span>A. จ่ายยา Diclofenac ตามใบสั่งยาทันที เพราะแพทย์ภายนอกเป็นผู้วินิจฉัยแล้ว</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-choice="2">
          <span>B. ตรวจสอบและระงับการจ่าย Diclofenac ทันที เพราะมีพิษต่อไตของผู้ป่วยโรคไตเรื้อรัง พร้อมเสนอปรึกษาแพทย์เปลี่ยนเป็น Paracetamol หรือยาทาภายนอก และเช็คสารประกอบกลุ่มซัลฟา</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-choice="3">
          <span>C. เพิ่มขนาดยาแก้ปวดเป็นสองเท่าเพื่อให้หายปวดเร็วขึ้น และเตือนให้ดื่มน้ำตามมากๆ</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-choice="4">
          <span>D. จ่ายยา Diclofenac แต่แถมยาลดกรดเคลือบกระเพาะให้ทานร่วมด้วย</span>
          <i class="fa-regular fa-circle"></i>
        </button>
      </div>
    </div>
  `;

  container.querySelectorAll('.choice-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const choice = btn.dataset.choice;
      container.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);

      if (choice === '2') {
        btn.classList.add('selected-correct');
        showToast('ยอดเยี่ยม! ป้องกันอันตรายจากภาวะไตวายเฉียบพลันได้สำเร็จ (+35 คะแนน)', 'success');
        state.skills.analytical += 30;
        state.skills.thoroughness += 35;
        state.skills.problemSolving += 30;
        state.strengths.push('วิเคราะห์ข้อห้ามใช้ยาในผู้ป่วยโรคไตได้อย่างแม่นยำ');
        state.detailedAnswers.push({
          title: 'เคสที่ 1: ตรวจสอบความปลอดภัยของยากับโรคประจำตัว',
          score: '+35/35',
          status: 'correct',
          note: 'ยับยั้งการใช้ยา NSAIDs ในผู้ป่วยไตวายเรื้อรังได้ถูกต้องตามหลักเภสัชกรรมคลินิก'
        });
        updateHUD('08:30 น.', 35);
      } else {
        btn.classList.add('selected-wrong');
        showToast('คำเตือน! ยา NSAIDs ส่งผลให้ไตวายเฉียบพลันในผู้ป่วยโรคไต (+10 คะแนน)', 'error');
        state.skills.thoroughness += 10;
        state.areasToImprove.push('ต้องสังเกตโรคประจำตัวของผู้ป่วยก่อนจ่ายยาทุกครั้ง');
        state.detailedAnswers.push({
          title: 'เคสที่ 1: ตรวจสอบความปลอดภัยของยากับโรคประจำตัว',
          score: '+10/35',
          status: 'partial',
          note: 'ละเลยข้อควรระวังสำคัญของยา NSAIDs ต่อภาวะไตเสื่อม'
        });
        updateHUD('08:30 น.', 10);
      }

      setTimeout(() => renderStage2(), 1800);
    });
  });
}

/**
 * Stage 2: 11:30 น. - นับเม็ดยาลงถาดปัดจำนวน (Pill Counting Tray Simulation)
 */
function renderStage2() {
  state.currentStage = 2;
  state.pillCount = 0;
  state.targetPillCount = 20;
  state.timerSeconds = 25;
  updateHUD('11:30 น. (ช่วงเร่งด่วน)', 0);

  const container = document.getElementById('game-stage-container');
  container.innerHTML = `
    <div class="stage-card animate-fade-in">
      <div class="scenario-badge-row">
        <span class="badge badge-cyan"><i class="fa-solid fa-pills"></i> 11:30 น. มินิเกมถาดนับยา: จัดเตรียมยาความดัน (Amlodipine 5mg)</span>
        <span class="badge badge-rose" id="tray-timer"><i class="fa-solid fa-stopwatch"></i> เวลา: 25 วินาที</span>
      </div>

      <div class="scenario-desc-box">
        <p>
          ใบสั่งยาต้องการ <strong>Amlodipine 5mg จำนวน 20 เม็ด</strong> 
          ให้คลิกที่เม็ดยาบนถาดด้านล่างเพื่อปัดเม็ดยาเข้าช่องนับให้ครบตามจำนวนเป้าหมายอย่างแม่นยำ! 
          <em>(ห้ามเกินและห้ามขาด)</em>
        </p>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
        <div style="font-size:1.15rem; font-weight:700;">
          จำนวนที่นับได้: <span id="count-display" style="color:var(--accent-emerald); font-size:1.5rem;">0</span> / ${state.targetPillCount} เม็ด
        </div>
        <div style="display:flex; gap:8px;">
          <button id="reset-pills-btn" class="btn btn-secondary btn-sm"><i class="fa-solid fa-rotate-left"></i> เทกลับ</button>
          <button id="submit-pills-btn" class="btn btn-success btn-sm"><i class="fa-solid fa-check"></i> ยืนยันบรรจุซอง</button>
        </div>
      </div>

      <!-- Pill Tray UI -->
      <div class="pill-tray-container">
        <div class="pill-tray-surface" id="pill-surface">
          <!-- Pills generated dynamically -->
        </div>
      </div>
    </div>
  `;

  // Generate interactive pills
  const surface = document.getElementById('pill-surface');
  for (let i = 0; i < 28; i++) {
    const pill = document.createElement('div');
    pill.className = 'pill-item';
    pill.innerHTML = `<span style="font-size:9px; color:#64748b; font-weight:700;">AML</span>`;
    pill.addEventListener('click', () => {
      if (!pill.classList.contains('counted')) {
        pill.classList.add('counted');
        state.pillCount++;
        document.getElementById('count-display').textContent = state.pillCount;
        if (state.pillCount === state.targetPillCount) {
          showToast('นับครบ 20 เม็ดพอดี! กดยืนยันบรรจุซองได้เลย', 'success');
        }
      }
    });
    surface.appendChild(pill);
  }

  // Reset button
  document.getElementById('reset-pills-btn').addEventListener('click', () => {
    state.pillCount = 0;
    document.getElementById('count-display').textContent = '0';
    surface.querySelectorAll('.pill-item').forEach(p => p.classList.remove('counted'));
  });

  // Timer countdown
  const timerEl = document.getElementById('tray-timer');
  clearInterval(state.timerInterval);
  state.timerInterval = setInterval(() => {
    state.timerSeconds--;
    if (timerEl) timerEl.innerHTML = `<i class="fa-solid fa-stopwatch"></i> เวลา: ${state.timerSeconds} วินาที`;
    if (state.timerSeconds <= 0) {
      clearInterval(state.timerInterval);
      evaluatePillStage();
    }
  }, 1000);

  // Submit button
  document.getElementById('submit-pills-btn').addEventListener('click', () => {
    clearInterval(state.timerInterval);
    evaluatePillStage();
  });
}

function evaluatePillStage() {
  const diff = Math.abs(state.pillCount - state.targetPillCount);
  let stageScore = 0;

  if (diff === 0) {
    stageScore = 35;
    state.skills.thoroughness += 35;
    state.skills.problemSolving += 30;
    state.strengths.push('ความแม่นยำและความละเอียดรอบคอบในการจ่ายยานับเม็ด 100%');
    state.detailedAnswers.push({
      title: 'เคสที่ 2: ถาดนับยาความดันช่วง Rush Hour',
      score: '+35/35',
      status: 'correct',
      note: 'นับเม็ดยาถูกต้องตรงตามใบสั่ง 20 เม็ด ไม่คลาดเคลื่อน'
    });
    showToast('ยอดเยี่ยมมาก! จำนวนยาถูกต้อง 100% (+35 คะแนน)', 'success');
  } else if (diff <= 2) {
    stageScore = 20;
    state.skills.thoroughness += 20;
    state.areasToImprove.push('ยังมีข้อผิดพลาดในการนับจำนวนยาคลาดเคลื่อนเล็กน้อย');
    state.detailedAnswers.push({
      title: 'เคสที่ 2: ถาดนับยาความดันช่วง Rush Hour',
      score: '+20/35',
      status: 'partial',
      note: `จำนวนคลาดเคลื่อนไป ${diff} เม็ด (นับได้ ${state.pillCount})`
    });
    showToast(`ยาคลาดเคลื่อนไป ${diff} เม็ด ได้คะแนนตามสัดส่วน (+20 คะแนน)`, 'info');
  } else {
    stageScore = 10;
    state.skills.thoroughness += 10;
    state.areasToImprove.push('ต้องฝึกสมาธิในการนับยาเพื่อไม่ให้จ่ายยาเกินหรือขาด');
    state.detailedAnswers.push({
      title: 'เคสที่ 2: ถาดนับยาความดันช่วง Rush Hour',
      score: '+10/35',
      status: 'wrong',
      note: `จำนวนคลาดเคลื่อนมากเกินเกณฑ์ความปลอดภัย (${state.pillCount} เม็ด)`
    });
    showToast('จำนวนยาคลาดเคลื่อนเกินเกณฑ์ (+10 คะแนน)', 'error');
  }

  updateHUD('11:30 น.', stageScore);
  setTimeout(() => renderStage3(), 1500);
}

/**
 * Stage 3: 15:00 น. - คำแนะนำการใช้ยาและการสื่อสารกับผู้ปกครอง/เด็ก (Counseling)
 */
function renderStage3() {
  state.currentStage = 3;
  updateHUD('15:00 น. (บ่าย)', 0);

  const container = document.getElementById('game-stage-container');
  container.innerHTML = `
    <div class="stage-card animate-fade-in">
      <div class="scenario-badge-row">
        <span class="badge badge-purple"><i class="fa-solid fa-comments"></i> 15:00 น. เคสที่ 3: ให้คำปรึกษาการใช้ยาปฏิชีวนะในเด็ก</span>
        <span class="badge badge-cyan"><i class="fa-solid fa-heart-pulse"></i> ทักษะการสื่อสารและจิตวิทยา</span>
      </div>

      <div class="scenario-desc-box">
        <p>
          คุณแม่พาน้องฟ้า วัย 5 ขวบ มารับยา <strong>Amoxicillin ชนิดผงแห้งผสมน้ำ</strong> สำหรับรักษาต่อมทอนซิลอักเสบ 
          คุณแม่ถามด้วยความกังวลว่า: <em>"เภสัชคะ ถ้าน้องทานไป 2-3 วันแล้วไข้ลดและไม่เจ็บคอแล้ว หยุดยาได้เลยไหมคะ กลัวน้องทานยาเยอะเกินไปไตจะพัง?"</em>
        </p>
      </div>

      <h3 style="margin-bottom: 1rem; font-size: 1.15rem;">คุณควรให้คำแนะนำแก่คุณแม่อย่างไรตามหลักวิชาชีพ?</h3>

      <div class="choices-grid">
        <button class="choice-btn" data-counsel="1">
          <span>A. "หยุดได้เลยค่ะ ยาปฏิชีวนะทานเยอะไม่ดี ถ้าหายแล้วเก็บยาแช่ตู้เย็นไว้ใช้วันหลังได้ค่ะ"</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-counsel="2">
          <span>B. "ต้องทานติดต่อกันจนหมดตามแพทย์สั่งอย่างเคร่งครัดค่ะ แม้อาการจะดีขึ้น เพราะหากหยุดยากลางคัน เชื้อแบคทีเรียอาจกลับมากำเริบและกลายเป็นเชื้อดื้อยาได้ พร้อมอธิบายวิธีผสมน้ำต้มสุกและอายุยาหลังผสม"</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-counsel="3">
          <span>C. "ถ้ากลัวน้องไตพัง ให้ลดขนาดยาลงครึ่งหนึ่งในวันที่ 3 แล้วค่อยหยุดทานค่ะ"</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-counsel="4">
          <span>D. "เปลี่ยนไปทานวิตามินซีแทนยาปฏิชีวนะจะปลอดภัยกว่าสำหรับเด็กค่ะ"</span>
          <i class="fa-regular fa-circle"></i>
        </button>
      </div>
    </div>
  `;

  container.querySelectorAll('.choice-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const choice = btn.dataset.counsel;
      container.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);

      let stageScore = 0;
      if (choice === '2') {
        btn.classList.add('selected-correct');
        stageScore = 30;
        state.skills.communication += 35;
        state.skills.analytical += 30;
        state.strengths.push('อธิบายกลไกเชื้อดื้อยาและสร้างความเข้าใจให้ผู้ปกครองได้อย่างชัดเจน');
        state.detailedAnswers.push({
          title: 'เคสที่ 3: การให้คำแนะนำยาปฏิชีวนะในเด็ก',
          score: '+30/30',
          status: 'correct',
          note: 'ย้ำเตือนความสำคัญของการทานยาครบ Course เพื่อป้องกันเชื้อดื้อยาได้ถูกต้อง'
        });
        showToast('ยอดเยี่ยม! ให้คำแนะนำการใช้ยาปฏิชีวนะได้อย่างมืออาชีพ (+30 คะแนน)', 'success');
      } else {
        btn.classList.add('selected-wrong');
        stageScore = 10;
        state.skills.communication += 10;
        state.areasToImprove.push('เน้นย้ำเรื่องอันตรายของเชื้อดื้อยา (Antimicrobial Resistance) ให้แม่นยำ');
        state.detailedAnswers.push({
          title: 'เคสที่ 3: การให้คำแนะนำยาปฏิชีวนะในเด็ก',
          score: '+10/30',
          status: 'wrong',
          note: 'คำแนะนำอาจก่อให้เกิดปัญหาเชื้อดื้อยาในผู้ป่วยเด็ก'
        });
        showToast('คำแนะนำไม่ถูกต้อง อาจทำให้เชื้อดื้อยา (+10 คะแนน)', 'error');
      }

      updateHUD('17:00 น. สิ้นสุดรอบการจำลอง', stageScore);

      // Save game log and redirect to score summary
      await finishPharmacistGame();
    });
  });
}

async function finishPharmacistGame() {
  const container = document.getElementById('game-stage-container');
  container.innerHTML = `
    <div class="stage-card text-center animate-fade-in" style="text-align:center; padding:3rem;">
      <i class="fa-solid fa-circle-check" style="font-size:3.5rem; color:var(--accent-emerald); margin-bottom:1rem;"></i>
      <h2 style="margin-bottom:0.75rem;">จบการจำลองอาชีพเภสัชกร (24h Simulation Complete)</h2>
      <p style="color:var(--text-muted); margin-bottom:2rem;">กำลังประมวลผลคะแนน 4 ด้าน และข้อเสนอแนะเชิงลึก...</p>
      <div class="progress-container" style="max-width:300px; margin:0 auto;">
        <div class="progress-bar" style="width:100%;"></div>
      </div>
    </div>
  `;

  await gameService.saveGameLog({
    career_id: 'pharmacist',
    career_name: 'เภสัชกร (Pharmacist)',
    total_score: state.totalScore,
    max_score: 100,
    skills_analytical: Math.min(100, state.skills.analytical),
    skills_problem_solving: Math.min(100, state.skills.problemSolving),
    skills_communication: Math.min(100, state.skills.communication),
    skills_thoroughness: Math.min(100, state.skills.thoroughness),
    strengths: state.strengths,
    areas_to_improve: state.areasToImprove,
    case_summary: 'ผ่านการจำลองตรวจโรคประจำตัวไตเสื่อม, ถาดนับยาความดัน Amlodipine และให้คำปรึกษายาปฏิชีวนะเด็ก',
    detailed_answers: state.detailedAnswers
  });

  setTimeout(() => {
    window.location.href = getRelativePath('pages/score-summary.html');
  }, 1800);
}
