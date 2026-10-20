/**
 * Career Discovery Platform - Accountant Minigame Simulation
 * 24H Simulation: Debit/Credit Ledger Sorting -> Balance Sheet Discrepancy -> Tax Deduction & Ethics
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

export function initAccountantGame() {
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
 * Stage 1: 09:00 น. - แยกใบเสร็จเดบิต / เครดิต (Debit / Credit Ledger Sorting)
 */
function renderStage1() {
  state.currentStage = 1;
  updateHUD('09:00 น. (ช่วงลงบัญชีประจำวัน)', 0);

  const container = document.getElementById('game-stage-container');
  container.innerHTML = `
    <div class="stage-card animate-fade-in">
      <div class="scenario-badge-row">
        <span class="badge badge-purple"><i class="fa-solid fa-calculator"></i> 09:00 น. การบันทึกสมุดรายวันทั่วไป (General Journal)</span>
        <span class="badge badge-cyan"><i class="fa-solid fa-list-check"></i> บัญชีคู่ Debit & Credit</span>
      </div>

      <div class="scenario-desc-box">
        <p>
          บริษัทได้รับ <strong>ใบแจ้งหนี้ค่าเช่าสำนักงานเดือนปัจจุบัน 45,000 บาท (ยังไม่ได้จ่ายเงินสด)</strong><br>
          ตามหลักการบัญชีคู่ (Double-entry Bookkeeping) คุณต้องบันทึกรายการบัญชีอย่างไรให้ถูกต้อง?
        </p>
      </div>

      <div class="choices-grid">
        <button class="choice-btn" data-ledger="1">
          <span>A. Dr. ค่าเช่าสำนักงาน (ค่าใช้จ่ายเพิ่ม) 45,000 | Cr. ค่าเช่าค้างจ่าย (หนี้สินเพิ่ม) 45,000</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-ledger="2">
          <span>B. Dr. เงินสด (สินทรัพย์เพิ่ม) 45,000 | Cr. รายได้ค่าเช่า (รายได้เพิ่ม) 45,000</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-ledger="3">
          <span>C. Dr. ค่าเช่าค้างจ่าย 45,000 | Cr. ทุนของเจ้าของ 45,000</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-ledger="4">
          <span>D. ไม่ต้องลงบันทึกใดๆ รอจนกว่าจะมีการจ่ายเงินสดจริงในปีถัดไป</span>
          <i class="fa-regular fa-circle"></i>
        </button>
      </div>
    </div>
  `;

  container.querySelectorAll('.choice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const ledger = btn.dataset.ledger;
      container.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);

      if (ledger === '1') {
        btn.classList.add('selected-correct');
        showToast('ถูกต้องตามเกณฑ์คงค้าง (Accrual Basis) สมบูรณ์แบบ! (+35 คะแนน)', 'success');
        state.skills.analytical += 35;
        state.skills.thoroughness += 35;
        state.strengths.push('บันทึกสมุดรายวันทั่วไปตามเกณฑ์คงค้าง (Accrual Basis) ได้แม่นยำ');
        state.detailedAnswers.push({
          title: 'เคสที่ 1: บันทึกบัญชีค่าเช่าค้างจ่าย Dr/Cr',
          score: '+35/35',
          status: 'correct',
          note: 'จัดหมวดหมู่ค่าใช้จ่ายและหนี้สินตามมาตรฐานรายงานทางการเงินได้อย่างถูกต้อง'
        });
        updateHUD('09:00 น.', 35);
      } else {
        btn.classList.add('selected-wrong');
        showToast('บันทึกบัญชีผิดหมวด ทำให้งบการเงินคลาดเคลื่อน (+10 คะแนน)', 'error');
        state.skills.thoroughness += 10;
        state.areasToImprove.push('ทบทวนกฎการเพิ่มลดของหมวดสินทรัพย์ หนี้สิน และค่าใช้จ่าย');
        state.detailedAnswers.push({
          title: 'เคสที่ 1: บันทึกบัญชีค่าเช่าค้างจ่าย Dr/Cr',
          score: '+10/35',
          status: 'wrong',
          note: 'จับคู่บัญชีผิดพลาด ขัดกับเกณฑ์คงค้าง'
        });
        updateHUD('09:00 น.', 10);
      }

      setTimeout(() => renderStage2(), 1800);
    });
  });
}

/**
 * Stage 2: 11:30 น. - หานัยสำคัญงบไม่ดุล (Balance Sheet Discrepancy Audit)
 */
function renderStage2() {
  state.currentStage = 2;
  updateHUD('11:30 น. (ตรวจสอบงบทดลอง)', 0);

  const container = document.getElementById('game-stage-container');
  container.innerHTML = `
    <div class="stage-card animate-fade-in">
      <div class="scenario-badge-row">
        <span class="badge badge-amber"><i class="fa-solid fa-scale-unbalanced"></i> 11:30 น. ตรวจสอบงบแสดงฐานะการเงิน (Balance Sheet)</span>
        <span class="badge badge-rose"><i class="fa-solid fa-magnifying-glass-dollar"></i> หาสาเหตุด่วน!</span>
      </div>

      <div class="scenario-desc-box">
        <p>
          ระบบแจ้งเตือน <strong>งบไม่ดุล (Out of Balance)!</strong><br>
          • ฝั่งสินทรัพย์รวม (Assets) = <strong>1,200,000 บาท</strong><br>
          • ฝั่งหนี้สินรวม (400,000) + ส่วนของเจ้าของ (750,000) = <strong>1,150,000 บาท</strong><br>
          <em>ผลต่างหายไป 50,000 บาท!</em> เมื่อสืบค้นพบว่ามีรายการหนึ่งตกค้างอยู่ในกล่องเอกสาร
        </p>
      </div>

      <h3 style="margin-bottom: 1rem; font-size: 1.15rem;">ข้อใดคือรายการตกค้าง 50,000 บาท ที่ทำให้งบกลับมาดุลพอดี?</h3>

      <div class="choices-grid">
        <button class="choice-btn" data-diff="1">
          <span>A. รายการซื้อคอมพิวเตอร์ตั้งโต๊ะ 50,000 บาท บันทึกสินทรัพย์เพิ่มแล้ว แต่ลืมบันทึก 'เจ้าหนี้การค้า' 50,000 บาท เข้าฝั่งหนี้สิน</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-diff="2">
          <span>B. นำเงิน 50,000 บาทไปแอบซ่อนไว้ในบัญชีค่ารับรองเพื่อหลบตัวเลข</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-diff="3">
          <span>C. ปรับลดตัวเลขสินทรัพย์ลง 50,000 บาท โดยไม่ต้องสืบหาที่มา</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-diff="4">
          <span>D. ประกาศปิดงบการเงินทั้งที่ไม่ดุลเพราะถือเป็นยอดเงินเล็กน้อย</span>
          <i class="fa-regular fa-circle"></i>
        </button>
      </div>
    </div>
  `;

  container.querySelectorAll('.choice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const diff = btn.dataset.diff;
      container.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);

      if (diff === '1') {
        btn.classList.add('selected-correct');
        showToast('ปิดงบดุลสมบูรณ์แบบ! สินทรัพย์ 1.2M = หนี้สินและทุน 1.2M (+35 คะแนน)', 'success');
        state.skills.problemSolving += 35;
        state.skills.analytical += 35;
        state.strengths.push('ตรวจสอบกระทบยอดงบการเงินและหาสาเหตุตัวเลขตกหล่นได้อย่างมืออาชีพ');
        state.detailedAnswers.push({
          title: 'เคสที่ 2: หาสาเหตุงบแสดงฐานะการเงินไม่ดุล',
          score: '+35/35',
          status: 'correct',
          note: 'ค้นพบรายการเจ้าหนี้การค้าคอมพิวเตอร์ 50,000 บาท ปรับปรุงงบดุลได้ถูกต้อง 100%'
        });
        updateHUD('11:30 น.', 35);
      } else {
        btn.classList.add('selected-wrong');
        showToast('การปรับแต่งตัวเลขโดยไร้เอกสารหลักฐานขัดต่อจรรยาบรรณวิชาชีพ (+10 คะแนน)', 'error');
        state.skills.thoroughness += 10;
        state.areasToImprove.push('ต้องกระทบยอดรายการตกหล่นตามเอกสารจริงเสมอ ห้ามตกแต่งตัวเลข');
        state.detailedAnswers.push({
          title: 'เคสที่ 2: หาสาเหตุงบแสดงฐานะการเงินไม่ดุล',
          score: '+10/35',
          status: 'wrong',
          note: 'ใช้วิธีการปรับปรุงตัวเลขที่ไม่สอดคล้องกับมาตรฐานการบัญชี'
        });
        updateHUD('11:30 น.', 10);
      }

      setTimeout(() => renderStage3(), 1800);
    });
  });
}

/**
 * Stage 3: 15:00 น. - รับมือลูกค้ายับยู่ยี่ & สายเลี่ยงภาษี (Tax Ethics & Deduction)
 */
function renderStage3() {
  state.currentStage = 3;
  updateHUD('15:00 น. (วางแผนภาษีและจรรยาบรรณ)', 0);

  const container = document.getElementById('game-stage-container');
  container.innerHTML = `
    <div class="stage-card animate-fade-in">
      <div class="scenario-badge-row">
        <span class="badge badge-emerald"><i class="fa-solid fa-file-invoice-dollar"></i> 15:00 น. ให้คำปรึกษาลูกค้าภาษี</span>
        <span class="badge badge-rose"><i class="fa-solid fa-shield-halved"></i> จรรยาบรรณวิชาชีพบัญชี</span>
      </div>

      <div class="scenario-desc-box">
        <p>
          ลูกค้านำกองใบเสร็จค่าน้ำมันรถยนต์และใบเสร็จร้านอาหารของครอบครัวช่วงวันหยุดสุดสัปดาห์ที่ยับยู่ยี่ 
          มายื่นให้คุณพร้อมกระซิบว่า: <em>"ช่วยลงเป็นค่าใช้จ่ายบริษัทเพื่อลดหย่อนภาษีให้หน่อยนะ จะได้เสียภาษีน้อยๆ ใครๆ เขาก็ทำกัน!"</em>
        </p>
      </div>

      <h3 style="margin-bottom: 1rem; font-size: 1.15rem;">ในฐานะนักบัญชี / ผู้สอบบัญชี คุณควรปฏิบัติตนอย่างไร?</h3>

      <div class="choices-grid">
        <button class="choice-btn" data-ethics="1">
          <span>A. ยินยอมลงให้ทั้งหมดและคิดค่าบริการพิเศษใต้โต๊ะ</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-ethics="2">
          <span>B. ปฏิเสธการลงรายจ่ายส่วนตัวเป็นค่าใช้จ่ายต้องห้ามตามประมวลรัษฎากรอย่างสุภาพ พร้อมอธิบายความเสี่ยงเรื่องเบี้ยปรับเงินเพิ่มจากสรรพากร และแนะนำวิธีลดหย่อนภาษีที่ถูกต้องตามกฎหมายแทน</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-ethics="3">
          <span>C. ฉีกใบเสร็จของลูกค้าทิ้งต่อหน้าทันทีด้วยความโมโห</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-ethics="4">
          <span>D. นำใบเสร็จไปปลอมแปลงชื่อบริษัทอื่นเพื่อกระจายความเสี่ยง</span>
          <i class="fa-regular fa-circle"></i>
        </button>
      </div>
    </div>
  `;

  container.querySelectorAll('.choice-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const ethics = btn.dataset.ethics;
      container.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);

      let stageScore = 0;
      if (ethics === '2') {
        btn.classList.add('selected-correct');
        stageScore = 30;
        state.skills.communication += 35;
        state.skills.thoroughness += 35;
        state.strengths.push('ยึดมั่นในจรรยาบรรณวิชาชีพและกฎหมายภาษีสรรพากร ไม่เอื้อประโยชน์การทุจริต');
        state.detailedAnswers.push({
          title: 'เคสที่ 3: จรรยาบรรณวิชาชีพและการให้คำปรึกษาภาษี',
          score: '+30/30',
          status: 'correct',
          note: 'ปกป้องลูกค้าจากเบี้ยปรับเงินเพิ่มของสรรพากร และรักษาวินัยทางการเงินของบริษัท'
        });
        showToast('ยอดเยี่ยม! รักษากฎหมายและจรรยาบรรณนักบัญชีระดับสากล (+30 คะแนน)', 'success');
      } else {
        btn.classList.add('selected-wrong');
        stageScore = 10;
        state.areasToImprove.push('ยึดมั่นในข้อกำหนดของสภาวิชาชีพบัญชีและมาตรา 65 ตรี แห่งประมวลรัษฎากร');
        state.detailedAnswers.push({
          title: 'เคสที่ 3: จรรยาบรรณวิชาชีพและการให้คำปรึกษาภาษี',
          score: '+10/30',
          status: 'wrong',
          note: 'การยอมรับรายจ่ายส่วนตัวเสี่ยงต่อการถูกเพิกถอนใบอนุญาตวิชาชีพ'
        });
        showToast('การลงรายจ่ายต้องห้ามมีความผิดทางอาญาและภาษี (+10 คะแนน)', 'error');
      }

      updateHUD('17:00 น. ปิดงบประจำวันเรียบร้อย', stageScore);
      await finishAccountantGame();
    });
  });
}

async function finishAccountantGame() {
  const container = document.getElementById('game-stage-container');
  container.innerHTML = `
    <div class="stage-card text-center animate-fade-in" style="text-align:center; padding:3rem;">
      <i class="fa-solid fa-calculator" style="font-size:3.5rem; color:#8b5cf6; margin-bottom:1rem;"></i>
      <h2 style="margin-bottom:0.75rem;">จบการจำลองอาชีพนักบัญชี (Accounting Day Concluded)</h2>
      <p style="color:var(--text-muted); margin-bottom:2rem;">กำลังประมวลผลความละเอียดรอบคอบ การวิเคราะห์งบ และจรรยาบรรณ...</p>
      <div class="progress-container" style="max-width:300px; margin:0 auto;">
        <div class="progress-bar" style="width:100%;"></div>
      </div>
    </div>
  `;

  await gameService.saveGameLog({
    career_id: 'accountant',
    career_name: 'นักบัญชี / ผู้สอบบัญชี (Accountant)',
    total_score: state.totalScore,
    max_score: 100,
    skills_analytical: Math.min(100, state.skills.analytical),
    skills_problem_solving: Math.min(100, state.skills.problemSolving),
    skills_communication: Math.min(100, state.skills.communication),
    skills_thoroughness: Math.min(100, state.skills.thoroughness),
    strengths: state.strengths,
    areas_to_improve: state.areasToImprove,
    case_summary: 'ลงสมุดรายวันค่าเช่าค้างจ่าย ตรวจสอบงบไม่ดุล 50k และยึดมั่นจรรยาบรรณภาษีค่าใช้จ่ายต้องห้าม',
    detailed_answers: state.detailedAnswers
  });

  setTimeout(() => {
    window.location.href = getRelativePath('pages/score-summary.html');
  }, 1800);
}
