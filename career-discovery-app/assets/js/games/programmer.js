/**
 * Career Discovery Platform - Programmer Minigame Simulation
 * 24H Simulation: Sprint Board Planning -> Interactive Bug Hunting -> Urgent Hotfix Rush
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

export function initProgrammerGame() {
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

/**
 * Stage 1: 10:00 น. - วางแผน Sprint Board (Kanban & Agile Prioritization)
 */
function renderStage1() {
  state.currentStage = 1;
  updateHUD('10:00 น. (Daily Standup & Sprint Planning)', 0);

  const container = document.getElementById('game-stage-container');
  container.innerHTML = `
    <div class="stage-card animate-fade-in">
      <div class="scenario-badge-row">
        <span class="badge badge-primary"><i class="fa-solid fa-code"></i> 10:00 น. Agile Sprint Planning (2 สัปดาห์ข้างหน้า)</span>
        <span class="badge badge-cyan"><i class="fa-solid fa-layer-group"></i> การจัดลำดับความสำคัญ (Prioritization)</span>
      </div>

      <div class="scenario-desc-box">
        <p>
          ในที่ประชุมเช้าวันนี้ มีการ์ดงานค้างอยู่ใน Backlog 4 ใบ โดยทีมมี Story Points จำกัด<br>
          <strong>งานใดคือ "P0 - Highest Priority" ที่ต้องดึงเข้า Sprint ทันทีในฐานะ Lead Developer?</strong>
        </p>
      </div>

      <div class="choices-grid">
        <button class="choice-btn" data-sprint="1">
          <span>A. [P0 Critical] ระบบชำระเงินตัดบัตรเครดิตพัง Error 500 ทำให้ผู้ใช้ไม่สามารถสั่งซื้อสินค้าได้ และเกิดรายได้สูญหาย</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-sprint="2">
          <span>B. [P3 Low] เปลี่ยนเฉดสีของปุ่ม 'ยกเลิก' ให้เข้มขึ้น 5% ในโหมดกลางคืน</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-sprint="3">
          <span>C. [P2 Medium] เขียนโค้ดจัดระเบียบคอมเมนต์ในไฟล์เก่าที่ไม่เคยมีใครเข้าไปแก้นาน 3 ปี</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-sprint="4">
          <span>D. [P3 Low] นั่งหาไอคอนใหม่มาแทนไอคอนเดิมในหน้าเกี่ยวกับเรา</span>
          <i class="fa-regular fa-circle"></i>
        </button>
      </div>
    </div>
  `;

  container.querySelectorAll('.choice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sprint = btn.dataset.sprint;
      container.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);

      if (sprint === '1') {
        btn.classList.add('selected-correct');
        showToast('การตัดสินใจยอดเยี่ยม! ป้องกันรายได้ทางธุรกิจของบริษัทได้อย่างทันท่วงที (+35 คะแนน)', 'success');
        state.skills.analytical += 35;
        state.skills.problemSolving += 35;
        state.strengths.push('จัดลำดับความสำคัญของระบบตามผลกระทบทางธุรกิจ (Business Impact) ได้แม่นยำ');
        state.detailedAnswers.push({
          title: 'เคสที่ 1: วางแผน Sprint Prioritization',
          score: '+35/35',
          status: 'correct',
          note: 'จัดให้ Bug ระบบชำระเงิน Error 500 เป็น P0 เพื่อลดความเสียหายของธุรกิจ'
        });
        updateHUD('10:00 น.', 35);
      } else {
        btn.classList.add('selected-wrong');
        showToast('เลือกลำดับงานผิด ทำให้ระบบ Core ทางธุรกิจล่ม (+10 คะแนน)', 'error');
        state.skills.thoroughness += 10;
        state.areasToImprove.push('แยกแยะความแตกต่างระหว่าง Critical Bug กับ Cosmetic UI Tweak');
        state.detailedAnswers.push({
          title: 'เคสที่ 1: วางแผน Sprint Prioritization',
          score: '+10/35',
          status: 'wrong',
          note: 'จัดงานที่มี Impact ต่ำแซงหน้าระบบชำระเงินที่กระทบผู้ใช้จริง'
        });
        updateHUD('10:00 น.', 10);
      }

      setTimeout(() => renderStage2(), 1800);
    });
  });
}

/**
 * Stage 2: 14:00 น. - แกะบั๊กโค้ดพัง (Interactive Bug Hunting Puzzle)
 */
function renderStage2() {
  state.currentStage = 2;
  updateHUD('14:00 น. (ช่วงเขียนโค้ดและ Debug)', 0);

  const container = document.getElementById('game-stage-container');
  container.innerHTML = `
    <div class="stage-card animate-fade-in">
      <div class="scenario-badge-row">
        <span class="badge badge-rose"><i class="fa-solid fa-bug"></i> 14:00 น. Code Review: พบ Exception ในฟังก์ชันคำนวณส่วนลด</span>
        <span class="badge badge-amber"><i class="fa-solid fa-laptop-code"></i> ตรรกะโปรแกรมมิ่ง (Logic Debug)</span>
      </div>

      <div class="scenario-desc-box">
        <p>
          ระบบแจ้งเตือนว่าเกิด <strong>TypeError: Cannot read properties of undefined (reading 'tier')</strong> ในฟังก์ชันคำนวณคะแนนลูกค้า:<br>
          โปรดพิจารณาบล็อกโค้ดด้านล่าง และเลือกวิธีแก้บั๊กที่ปลอดภัยที่สุด (Defensive Programming)
        </p>
      </div>

      <!-- Code Snippet -->
      <div class="code-editor-box">
        <span style="color:#7ee787;">function</span> <span style="color:#79c0ff;">calculateBonus</span>(user) {<br>
        &nbsp;&nbsp;<span style="color:#8b949e;">// บรรทัดที่ทำให้ระบบแครช เมื่อ user เป็น null หรือไม่มี membership:</span><br>
        &nbsp;&nbsp;<span style="color:#ff7b72;">const</span> discount = <span class="code-bug-token">user.membership.tier === 'VIP' ? 0.2 : 0.05</span>;<br>
        &nbsp;&nbsp;<span style="color:#ff7b72;">return</span> user.cartTotal * (1 - discount);<br>
        }
      </div>

      <h3 style="margin-bottom: 1rem; font-size: 1.15rem;">ข้อใดคือโค้ดที่ถูกต้องและปลอดภัยที่สุด?</h3>

      <div class="choices-grid">
        <button class="choice-btn" data-bug="1">
          <span>A. ใช้ Optional Chaining: const discount = user?.membership?.tier === 'VIP' ? 0.2 : 0.05;</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-bug="2">
          <span>B. ลบฟังก์ชันนี้ทิ้งและให้ลูกค้าทุกคนจ่ายเงินราคาเต็มเสมอ</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-bug="3">
          <span>C. ใส่ try...catch ไว้ด้านนอกแล้วไม่ต้องทำอะไรปล่อยให้เงียบไป</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-bug="4">
          <span>D. เปลี่ยนภาษาเขียนโปรแกรมใหม่ทั้งระบบเป็นภาษา C++</span>
          <i class="fa-regular fa-circle"></i>
        </button>
      </div>
    </div>
  `;

  container.querySelectorAll('.choice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const bug = btn.dataset.bug;
      container.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);

      if (bug === '1') {
        btn.classList.add('selected-correct');
        document.querySelector('.code-bug-token')?.classList.add('fixed');
        showToast('แก้บั๊กสำเร็จด้วย Optional Chaining อย่างสง่างาม (+35 คะแนน)', 'success');
        state.skills.analytical += 35;
        state.skills.problemSolving += 35;
        state.skills.thoroughness += 35;
        state.strengths.push('เข้าใจการป้องกัน Null Pointer / Undefined Exception ด้วยเทคนิคสมัยใหม่');
        state.detailedAnswers.push({
          title: 'เคสที่ 2: แกะบั๊ก TypeError ด้วย Optional Chaining',
          score: '+35/35',
          status: 'correct',
          note: 'ใช้ user?.membership?.tier ป้องกันระบบพังเมื่อส่ง Object ว่างเข้ามา'
        });
        updateHUD('14:00 น.', 35);
      } else {
        btn.classList.add('selected-wrong');
        showToast('วิธีแก้บั๊กไม่เป็นไปตามมาตรฐานการพัฒนาซอฟต์แวร์ (+10 คะแนน)', 'error');
        state.skills.problemSolving += 10;
        state.areasToImprove.push('ศึกษาเรื่อง Defensive Programming และ Null Safety ใน JavaScript/TypeScript');
        state.detailedAnswers.push({
          title: 'เคสที่ 2: แกะบั๊ก TypeError ด้วย Optional Chaining',
          score: '+10/35',
          status: 'wrong',
          note: 'ไม่สามารถเลือกวิธีแก้ไขบั๊กที่ปลอดภัยและตรงตามสาเหตุได้'
        });
        updateHUD('14:00 น.', 10);
      }

      setTimeout(() => renderStage3(), 1800);
    });
  });
}

/**
 * Stage 3: 17:00 น. - รับมือลูกค้าเปลี่ยนบรีฟด่วน ASAP & Hotfix
 */
function renderStage3() {
  state.currentStage = 3;
  updateHUD('17:00 น. (1 ชั่วโมงก่อน Deploy Production)', 0);

  const container = document.getElementById('game-stage-container');
  container.innerHTML = `
    <div class="stage-card animate-fade-in">
      <div class="scenario-badge-row">
        <span class="badge badge-rose"><i class="fa-solid fa-fire"></i> 17:00 น. วิกฤตลูกค้าระบุเปลี่ยนฟีเจอร์ ASAP!</span>
        <span class="badge badge-cyan"><i class="fa-solid fa-comments"></i> การสื่อสารและบริหารจัดการความเสี่ยง</span>
      </div>

      <div class="scenario-desc-box">
        <p>
          ลูกค้าทักไลน์กลุ่มด่วนที่สุด: <em>"คุณโปรแกรมเมอร์ครับ ช่วยรื้อระบบล็อกอินเดิมทิ้ง แล้วเปลี่ยนมาใช้ Face Scan ผ่าน AI ให้เสร็จภายใน 30 นาทีก่อนเปิดตัวได้ไหมครับ ด่วนที่สุด ASAP!!"</em>
        </p>
      </div>

      <h3 style="margin-bottom: 1rem; font-size: 1.15rem;">ในฐานะวิศวกรซอฟต์แวร์มืออาชีพ คุณจะรับมือสถานการณ์นี้อย่างไร?</h3>

      <div class="choices-grid">
        <button class="choice-btn" data-asap="1">
          <span>A. รีบแก้โค้ดสดบน Production ทันทีโดยไม่ต้องเขียน Test และไม่ต้องปรึกษาทีม</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-asap="2">
          <span>B. สื่อสารอย่างมืออาชีพ: ชี้แจงว่าระบบ Face Scan ต้องใช้เวลาทดสอบความปลอดภัยและการรองรับ PDPA อย่างน้อย 2 สัปดาห์ จึงเสนอให้ปล่อยเวอร์ชันปัจจุบันที่เสถียรและผ่าน QA แล้วก่อน จากนั้นนำ Face Scan เป็นเฟส 2 ใน Sprint ถัดไป</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-asap="3">
          <span>C. ปิดมือถือหนีและบล็อกการติดต่อลูกค้าทั้งหมด</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-asap="4">
          <span>D. ตอบตกลงแต่ไม่ทำ แล้วปล่อยให้เปิดตัวระบบพัง</span>
          <i class="fa-regular fa-circle"></i>
        </button>
      </div>
    </div>
  `;

  container.querySelectorAll('.choice-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const asap = btn.dataset.asap;
      container.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);

      let stageScore = 0;
      if (asap === '2') {
        btn.classList.add('selected-correct');
        stageScore = 30;
        state.skills.communication += 35;
        state.skills.problemSolving += 35;
        state.strengths.push('สื่อสารบริหารจัดการความคาดหวังของลูกค้า (Expectation Management) และความเสี่ยงซอฟต์แวร์ได้ยอดเยี่ยม');
        state.detailedAnswers.push({
          title: 'เคสที่ 3: รับมือลูกค้าเปลี่ยนบรีฟเร่งด่วน ASAP',
          score: '+30/30',
          status: 'correct',
          note: 'ยึดมั่นในคุณภาพและความปลอดภัยของระบบ นำเสนอทางออกแบบ Phase-based Deployment'
        });
        showToast('ลูกค้ายอมรับแนวทางอย่างเข้าใจ และการเปิดตัวระบบผ่านฉลุย (+30 คะแนน)', 'success');
      } else {
        btn.classList.add('selected-wrong');
        stageScore = 10;
        state.areasToImprove.push('ห้ามแก้โค้ดสดบน Production โดยขาดกระบวนการ CI/CD และการทดสอบ');
        state.detailedAnswers.push({
          title: 'เคสที่ 3: รับมือลูกค้าเปลี่ยนบรีฟเร่งด่วน ASAP',
          score: '+10/30',
          status: 'wrong',
          note: 'การตัดสินใจเสี่ยงทำให้ระบบ Production ล่มหรือสูญเสียความน่าเชื่อถือ'
        });
        showToast('ความเสี่ยงทางเทคนิคสูงเกินมาตรฐาน (+10 คะแนน)', 'error');
      }

      updateHUD('18:00 น. สิ้นสุดวันทำงาน', stageScore);
      await finishProgrammerGame();
    });
  });
}

async function finishProgrammerGame() {
  const container = document.getElementById('game-stage-container');
  container.innerHTML = `
    <div class="stage-card text-center animate-fade-in" style="text-align:center; padding:3rem;">
      <i class="fa-solid fa-code" style="font-size:3.5rem; color:#6366f1; margin-bottom:1rem;"></i>
      <h2 style="margin-bottom:0.75rem;">จบการจำลองอาชีพโปรแกรมเมอร์ (Sprint Complete)</h2>
      <p style="color:var(--text-muted); margin-bottom:2rem;">กำลังประมวลผลทักษะการแก้บั๊ก การจัดลำดับความสำคัญ และการรับมือลูกค้า...</p>
      <div class="progress-container" style="max-width:300px; margin:0 auto;">
        <div class="progress-bar" style="width:100%;"></div>
      </div>
    </div>
  `;

  await gameService.saveGameLog({
    career_id: 'programmer',
    career_name: 'โปรแกรมเมอร์ (Software Engineer)',
    total_score: state.totalScore,
    max_score: 100,
    skills_analytical: Math.min(100, state.skills.analytical),
    skills_problem_solving: Math.min(100, state.skills.problemSolving),
    skills_communication: Math.min(100, state.skills.communication),
    skills_thoroughness: Math.min(100, state.skills.thoroughness),
    strengths: state.strengths,
    areas_to_improve: state.areasToImprove,
    case_summary: 'จัดลำดับ Sprint P0 ระบบชำระเงิน แก้ไขบั๊ก TypeError ด้วย Optional Chaining และรับมือ Scope Creep',
    detailed_answers: state.detailedAnswers
  });

  setTimeout(() => {
    window.location.href = getRelativePath('pages/score-summary.html');
  }, 1800);
}
