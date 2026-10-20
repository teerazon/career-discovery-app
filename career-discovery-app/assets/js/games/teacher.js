/**
 * Career Discovery Platform - Teacher Minigame Simulation
 * 24H Simulation: Classroom Attention Meter -> Rapid Homework Grading -> Psychological Counseling
 */
import { gameService } from '../services/gameService.js';
import { getRelativePath, showToast } from '../utils/router.js';

let state = {
  currentStage: 1,
  totalScore: 0,
  attentionMeter: 45, // 0 to 100
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

export function initTeacherGame() {
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

function updateAttentionMeter(newVal) {
  state.attentionMeter = Math.max(0, Math.min(100, newVal));
  const fill = document.getElementById('attention-fill');
  const text = document.getElementById('attention-text');
  if (fill) {
    fill.style.width = `${state.attentionMeter}%`;
    if (state.attentionMeter >= 75) fill.style.background = 'linear-gradient(90deg, #10b981, #34d399)';
    else if (state.attentionMeter >= 40) fill.style.background = 'linear-gradient(90deg, #f59e0b, #fbbf24)';
    else fill.style.background = 'linear-gradient(90deg, #f43f5e, #fb7185)';
  }
  if (text) text.textContent = `${state.attentionMeter}%`;
}

/**
 * Stage 1: 08:30 น. - ควบคุมหลอดความสนใจห้องเรียน (Attention Meter & Classroom Management)
 */
function renderStage1() {
  state.currentStage = 1;
  state.attentionMeter = 45;
  updateHUD('08:30 น. (คาบเรียนเช้า)', 0);

  const container = document.getElementById('game-stage-container');
  container.innerHTML = `
    <div class="stage-card animate-fade-in">
      <div class="scenario-badge-row">
        <span class="badge badge-cyan"><i class="fa-solid fa-chalkboard-user"></i> 08:30 น. ชั้นเรียน ม.2/1: วิชาบูรณาการวิทยาศาสตร์</span>
        <span class="badge badge-amber"><i class="fa-solid fa-gauge-high"></i> การควบคุมบรรยากาศชั้นเรียน</span>
      </div>

      <!-- Attention Meter -->
      <div class="dynamic-meter-box">
        <div class="meter-header">
          <span><i class="fa-solid fa-users-viewfinder"></i> หลอดความสนใจและสมาธิของนักเรียน (Attention Meter):</span>
          <span id="attention-text" style="color:var(--accent-amber); font-weight:800;">45%</span>
        </div>
        <div class="meter-track">
          <div id="attention-fill" class="meter-fill" style="width: 45%; background: linear-gradient(90deg, #f59e0b, #fbbf24);"></div>
        </div>
      </div>

      <div class="scenario-desc-box">
        <p>
          นักเรียนในห้องหลายคนเริ่มคุยเสียงดัง ปากระดาษ และบางคนแอบเล่นมือถือใต้โต๊ะ 
          ทำให้หลอดสมาธิของห้องตกมาอยู่ที่ <strong>45%</strong> 
          คุณจะเลือกใช้กลยุทธ์การสอน (Pedagogy) แบบใดเพื่อดึงสมาธิห้องเรียนกลับมาสู่ระดับสูงที่สุด?
        </p>
      </div>

      <div class="choices-grid">
        <button class="choice-btn" data-act="1">
          <span>A. ตะโกนด่านักเรียนด้วยความโมโหแล้วสั่งให้นั่งคุกเข่าหน้าห้องทุกคน</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-act="2">
          <span>B. เปลี่ยนเป็นการจัดกิจกรรมแบ่งกลุ่มย่อย (Active Learning) เล่นเกม Quiz แข่งขันตอบคำถามเชื่อมโยงชีวิตจริง พร้อมให้คะแนนดาวสะสม</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-act="3">
          <span>C. ปล่อยให้นักเรียนคุยกันไปตามสบายแล้วยืนอ่านสไลด์หน้าห้องให้จบตามเวลา</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-act="4">
          <span>D. สั่งการบ้านเพิ่ม 50 ข้อเพื่อเป็นการลงโทษทั้งห้อง</span>
          <i class="fa-regular fa-circle"></i>
        </button>
      </div>
    </div>
  `;

  container.querySelectorAll('.choice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const act = btn.dataset.act;
      container.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);

      if (act === '2') {
        btn.classList.add('selected-correct');
        updateAttentionMeter(95);
        showToast('นักเรียนตื่นตัวและมีส่วนร่วมอย่างกระตือรือร้น! Attention พุ่ง 95% (+35 คะแนน)', 'success');
        state.skills.communication += 35;
        state.skills.problemSolving += 35;
        state.strengths.push('ใช้กลยุทธ์ Active Learning ดึงความสนใจของชั้นเรียนได้ดีเยี่ยม');
        state.detailedAnswers.push({
          title: 'เคสที่ 1: การจัดการบรรยากาศห้องเรียนและ Attention Meter',
          score: '+35/35',
          status: 'correct',
          note: 'ปรับรูปแบบกิจกรรมให้ตอบโจทย์จิตวิทยาวัยรุ่น ฟื้นฟูสมาธิชั้นเรียนสู่ระดับยอดเยี่ยม'
        });
        updateHUD('08:30 น.', 35);
      } else {
        btn.classList.add('selected-wrong');
        updateAttentionMeter(20);
        showToast('บรรยากาศในห้องเรียนตึงเครียด นักเรียนต่อต้าน (+10 คะแนน)', 'error');
        state.skills.communication += 10;
        state.areasToImprove.push('หลีกเลี่ยงการใช้อารมณ์หรือการลงโทษเหมารวมทั้งห้อง');
        state.detailedAnswers.push({
          title: 'เคสที่ 1: การจัดการบรรยากาศห้องเรียนและ Attention Meter',
          score: '+10/35',
          status: 'wrong',
          note: 'การลงโทษเชิงลบทำให้ความสนใจและทัศนคติของนักเรียนลดลงอย่างรวดเร็ว'
        });
        updateHUD('08:30 น.', 10);
      }

      setTimeout(() => renderStage2(), 1800);
    });
  });
}

/**
 * Stage 2: 13:00 น. - ตรวจการบ้านจับจุดผิดแข่งกับเวลา (Speed Homework Grading)
 */
function renderStage2() {
  state.currentStage = 2;
  updateHUD('13:00 น. (ห้องพักครู)', 0);

  const container = document.getElementById('game-stage-container');
  container.innerHTML = `
    <div class="stage-card animate-fade-in">
      <div class="scenario-badge-row">
        <span class="badge badge-emerald"><i class="fa-solid fa-pen-nib"></i> 13:00 น. ตรวจสมุดการบ้าน: โจทย์คำนวณพื้นที่และร้อยละ</span>
        <span class="badge badge-amber"><i class="fa-solid fa-check-double"></i> ความรอบคอบและวิเคราะห์</span>
      </div>

      <div class="scenario-desc-box">
        <p>
          สมุดการบ้านของ ด.ช.แทน ระบุวิธีทำดังนี้:<br>
          <em>"พื้นที่สี่เหลี่ยมผืนผ้า = กว้าง × ยาว = 8 × 12 = 96 ตร.ซม. (ถูกต้อง)<br>
          จากนั้นลดราคาลง 20% จากราคา 500 บาท: คำนวณส่วนลด = 500 × 0.20 = 100 บาท (ถูกต้อง)<br>
          ดังนั้นราคาที่ต้องจ่ายจริง = 500 + 100 = 600 บาท (?!)"</em>
        </p>
      </div>

      <h3 style="margin-bottom: 1rem; font-size: 1.15rem;">ในฐานะครูผู้ตรวจ ข้อใดคือคอมเมนต์และคะแนนที่ถูกต้องที่สุด?</h3>

      <div class="choices-grid">
        <button class="choice-btn" data-grade="1">
          <span>A. ให้คะแนนเต็ม 10 เพราะตัวเลข 96 และ 100 คำนวณถูกต้อง</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-grade="2">
          <span>B. ชี้แนะด้วยปากกาแดง: บรรทัดสุดท้ายคิดผิดหลัก เพราะ 'ส่วนลด' ต้องนำไป 'ลบ' ออกจากราคาเดิม (500 - 100 = 400 บาท) พร้อมให้ 7/10 คะแนนและเขียนคำชมขั้นตอนแรก</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-grade="3">
          <span>C. กากบาททั้งหน้า ให้ 0 คะแนน และเขียนว่า 'ไร้ประโยชน์'</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-grade="4">
          <span>D. ให้เพื่อนข้างโต๊ะเป็นคนตรวจแทนโดยครูไม่ต้องดู</span>
          <i class="fa-regular fa-circle"></i>
        </button>
      </div>
    </div>
  `;

  container.querySelectorAll('.choice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const grade = btn.dataset.grade;
      container.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);

      if (grade === '2') {
        btn.classList.add('selected-correct');
        showToast('การให้ Feedback ที่สร้างสรรค์ ช่วยให้นักเรียนเข้าใจจุดบกพร่อง (+35 คะแนน)', 'success');
        state.skills.thoroughness += 35;
        state.skills.analytical += 30;
        state.strengths.push('ตรวจงานด้วยความละเอียดและให้คำแนะนำชี้แนะเชิงบวก (Constructive Feedback)');
        state.detailedAnswers.push({
          title: 'เคสที่ 2: การตรวจการบ้านและการประเมินผล',
          score: '+35/35',
          status: 'correct',
          note: 'จับจุดผิดเรื่องการลบส่วนลดได้ถูกต้อง และสร้างกำลังใจให้นักเรียนพัฒนาต่อ'
        });
        updateHUD('13:00 น.', 35);
      } else {
        btn.classList.add('selected-wrong');
        showToast('การประเมินผลคลาดเคลื่อนหรือไม่ส่งเสริมการเรียนรู้ (+10 คะแนน)', 'error');
        state.skills.thoroughness += 10;
        state.areasToImprove.push('ต้องตรวจทานขั้นตอนสุดท้ายของโจทย์คณิตศาสตร์อย่างถี่ถ้วน');
        state.detailedAnswers.push({
          title: 'เคสที่ 2: การตรวจการบ้านและการประเมินผล',
          score: '+10/35',
          status: 'wrong',
          note: 'ไม่สามารถชี้จุดผิดพลาดของการคำนวณส่วนลดได้อย่างเหมาะสม'
        });
        updateHUD('13:00 น.', 10);
      }

      setTimeout(() => renderStage3(), 1800);
    });
  });
}

/**
 * Stage 3: 15:30 น. - ให้คำปรึกษาเด็ก & รับมือผู้ปกครองเข้าข้างลูก (Psychological Counseling)
 */
function renderStage3() {
  state.currentStage = 3;
  updateHUD('15:30 น. (ห้องแนะแนวหลังเลิกเรียน)', 0);

  const container = document.getElementById('game-stage-container');
  container.innerHTML = `
    <div class="stage-card animate-fade-in">
      <div class="scenario-badge-row">
        <span class="badge badge-purple"><i class="fa-solid fa-heart"></i> 15:30 น. รับมือสถานการณ์ตึงเครียด: พูดคุยกับผู้ปกครอง</span>
        <span class="badge badge-cyan"><i class="fa-solid fa-hand-holding-hand"></i> จิตวิทยาการสื่อสารและการไกล่เกลี่ย</span>
      </div>

      <div class="scenario-desc-box">
        <p>
          คุณแม่ของน้องกอล์ฟเดินทางมาพบครูด้วยอารมณ์ฉุนเฉียว หลังทราบว่าน้องกอล์ฟทะเลาะกับเพื่อน:<br>
          <em>"ครูคะ ลูกฉันอยู่บ้านเป็นเด็กเรียบร้อยน่ารักมาก ไม่เคยมีเรื่องกับใคร! เพื่อนในห้องต้องเป็นคนแกล้งลูกฉันก่อนแน่ๆ ครูดูแลห้องเรียนยังไงถึงปล่อยให้ลูกฉันถูกรังแก?!"</em>
        </p>
      </div>

      <h3 style="margin-bottom: 1rem; font-size: 1.15rem;">ในฐานะครู คุณจะใช้จิตวิทยาการสื่อสารอย่างไรเพื่อคลี่คลายสถานการณ์?</h3>

      <div class="choices-grid">
        <button class="choice-btn" data-counsel="1">
          <span>A. เถียงกลับทันทีว่าลูกของคุณแม่เป็นฝ่ายเริ่มต่อยเพื่อนก่อน และให้ดูกล้องวงจรปิด</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-counsel="2">
          <span>B. รับฟังด้วยความเข้าอกเข้าใจ (Empathy) ให้คุณแม่ได้ระบาย จากนั้นชี้แจงข้อเท็จจริงอย่างนุ่มนวลร่วมกับพยานหลักฐาน และชวนผู้ปกครองร่วมมือกันวางแนวทางปรับพฤติกรรมเด็กเชิงบวก</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-counsel="3">
          <span>C. ก้มหน้ารับผิดทุกอย่างและยอมให้น้องกอล์ฟไม่ต้องเข้าเรียนวิชานั้นอีก</span>
          <i class="fa-regular fa-circle"></i>
        </button>

        <button class="choice-btn" data-counsel="4">
          <span>D. เชิญผู้อำนวยการและตำรวจมาร่วมตัดสินในห้องพักครูทันที</span>
          <i class="fa-regular fa-circle"></i>
        </button>
      </div>
    </div>
  `;

  container.querySelectorAll('.choice-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const counsel = btn.dataset.counsel;
      container.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);

      let stageScore = 0;
      if (counsel === '2') {
        btn.classList.add('selected-correct');
        stageScore = 30;
        state.skills.communication += 35;
        state.skills.problemSolving += 35;
        state.strengths.push('มีทักษะการรับฟังอย่างเข้าอกเข้าใจ (Active Listening) และร่วมมือกับผู้ปกครองแก้ปัญหาเด็กได้ยอดเยี่ยม');
        state.detailedAnswers.push({
          title: 'เคสที่ 3: จิตวิทยาการปรึกษาและรับมือผู้ปกครอง',
          score: '+30/30',
          status: 'correct',
          note: 'ใช้ Empathy สลายความโกรธของผู้ปกครองและแปรเปลี่ยนเป็นความร่วมมือเชิงบวก'
        });
        showToast('ผู้ปกครองเข้าใจและประทับใจในความเป็นมืออาชีพของครู (+30 คะแนน)', 'success');
      } else {
        btn.classList.add('selected-wrong');
        stageScore = 10;
        state.skills.communication += 10;
        state.areasToImprove.push('ฝึกทักษะการไกล่เกลี่ยความขัดแย้ง (Conflict Resolution) และการรับฟังอย่างมีสติ');
        state.detailedAnswers.push({
          title: 'เคสที่ 3: จิตวิทยาการปรึกษาและรับมือผู้ปกครอง',
          score: '+10/30',
          status: 'wrong',
          note: 'การโต้เถียงหรือการยอมแพ้ทำให้ความเชื่อมั่นระหว่างบ้านและโรงเรียนลดลง'
        });
        showToast('ความสัมพันธ์ระหว่างโรงเรียนและผู้ปกครองเกิดรอยร้าว (+10 คะแนน)', 'error');
      }

      updateHUD('17:00 น. หมดเวลาทำการสอน', stageScore);
      await finishTeacherGame();
    });
  });
}

async function finishTeacherGame() {
  const container = document.getElementById('game-stage-container');
  container.innerHTML = `
    <div class="stage-card text-center animate-fade-in" style="text-align:center; padding:3rem;">
      <i class="fa-solid fa-graduation-cap" style="font-size:3.5rem; color:#06b6d4; margin-bottom:1rem;"></i>
      <h2 style="margin-bottom:0.75rem;">จบการจำลองอาชีพครู (Classroom Day Complete)</h2>
      <p style="color:var(--text-muted); margin-bottom:2rem;">กำลังประมวลผลทักษะการจัดการชั้นเรียน จิตวิทยา และการสื่อสาร...</p>
      <div class="progress-container" style="max-width:300px; margin:0 auto;">
        <div class="progress-bar" style="width:100%;"></div>
      </div>
    </div>
  `;

  await gameService.saveGameLog({
    career_id: 'teacher',
    career_name: 'ครู / อาจารย์ (Educator)',
    total_score: state.totalScore,
    max_score: 100,
    skills_analytical: Math.min(100, state.skills.analytical),
    skills_problem_solving: Math.min(100, state.skills.problemSolving),
    skills_communication: Math.min(100, state.skills.communication),
    skills_thoroughness: Math.min(100, state.skills.thoroughness),
    strengths: state.strengths,
    areas_to_improve: state.areasToImprove,
    case_summary: 'บริหารสมาธิห้องเรียนด้วย Active Learning ตรวจงานคำนวณส่วนลด และให้คำปรึกษาผู้ปกครองด้วย Empathy',
    detailed_answers: state.detailedAnswers
  });

  setTimeout(() => {
    window.location.href = getRelativePath('pages/score-summary.html');
  }, 1800);
}
