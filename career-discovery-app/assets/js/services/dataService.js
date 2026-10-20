/**
 * Career Discovery Platform - Data Service
 * Comprehensive datasets for Careers, Faculties, and Universities
 */

export const CAREERS_DATA = [
  {
    id: 'pharmacist',
    title: 'เภสัชกร (Pharmacist)',
    title_en: 'Pharmacist',
    category: 'วิทยาศาสตร์สุขภาพ',
    faculty_id: 'pharmacy',
    faculty: 'คณะเภสัชศาสตร์',
    salary_range: '32,000 - 65,000+ บาท/เดือน',
    salary_min: 32000,
    salary_max: 65000,
    demand: 'สูงมาก',
    demand_level: 90,
    icon: 'fa-prescription-bottle-medical',
    color: '#10b981',
    description: 'ผู้เชี่ยวชาญด้านยาและเวชภัณฑ์ วินิจฉัยความเหมาะสมของยา ตรวจสอบการแพ้ยา และให้คำแนะนำการใช้ยาอย่างปลอดภัยแก่ผู้ป่วย',
    tags: ['ความรอบคอบสูง', 'วิทยาศาสตร์เคมี', 'ใส่ใจผู้ป่วย', 'มีใบประกอบวิชาชีพ'],
    licenses: 'ใบประกอบวิชาชีพเภสัชกรรม (สภาเภสัชกรรม)',
    minigame_ready: true,
    minigame_url: 'minigames/pharmacist.html'
  },
  {
    id: 'lawyer',
    title: 'ทนายความ / นิติกร (Lawyer & Legal Counsel)',
    title_en: 'Lawyer & Legal Counsel',
    category: 'สังคมศาสตร์และกฎหมาย',
    faculty_id: 'law',
    faculty: 'คณะนิติศาสตร์',
    salary_range: '28,000 - 85,000+ บาท/เดือน',
    salary_min: 28000,
    salary_max: 85000,
    demand: 'สูง',
    demand_level: 85,
    icon: 'fa-scale-balanced',
    color: '#f59e0b',
    description: 'ผู้แทนทางกฎหมาย ให้คำปรึกษา ว่าความ ตรวจสอบสัญญา และพิทักษ์สิทธิความยุติธรรมตามตัวบทกฎหมาย',
    tags: ['การคิดวิเคราะห์', 'ทักษะการเจรจา', 'การจับใจความ', 'มีตั๋วทนาย'],
    licenses: 'ใบอนุญาตให้เป็นทนายความ (สภาทนายความ) หรือ เนติบัณฑิตไทย',
    minigame_ready: true,
    minigame_url: 'minigames/lawyer.html'
  },
  {
    id: 'teacher',
    title: 'ครู / อาจารย์ (Teacher & Educator)',
    title_en: 'Teacher & Educator',
    category: 'การศึกษาและพัฒนามนุษย์',
    faculty_id: 'education',
    faculty: 'คณะครุศาสตร์ / ศึกษาศาสตร์',
    salary_range: '20,000 - 55,000+ บาท/เดือน',
    salary_min: 20000,
    salary_max: 55000,
    demand: 'ปานกลาง-สูง',
    demand_level: 75,
    icon: 'fa-chalkboard-user',
    color: '#06b6d4',
    description: 'ผู้ออกแบบประสบการณ์การเรียนรู้ ถ่ายทอดความรู้ ให้คำปรึกษา และดูแลการเจริญเติบโตทางจิตวิทยาของเยาวชน',
    tags: ['การสื่อสาร', 'ความอดทนและเมตตา', 'จิตวิทยาการสอน', 'การควบคุมห้อง'],
    licenses: 'ใบอนุญาตประกอบวิชาชีพครู (คุรุสภา)',
    minigame_ready: true,
    minigame_url: 'minigames/teacher.html'
  },
  {
    id: 'accountant',
    title: 'นักบัญชี / ผู้สอบบัญชี (Accountant & Auditor)',
    title_en: 'Accountant & Auditor',
    category: 'การเงินและบริหารธุรกิจ',
    faculty_id: 'commerce',
    faculty: 'คณะพาณิชยศาสตร์และการบัญชี / บริหารธุรกิจ',
    salary_range: '25,000 - 90,000+ บาท/เดือน',
    salary_min: 25000,
    salary_max: 90000,
    demand: 'สูงมาก',
    demand_level: 95,
    icon: 'fa-calculator',
    color: '#8b5cf6',
    description: 'ผู้จัดการระบบตัวเลขทางการเงิน แยกเดบิต-เครดิต ทำงบดุล วางแผนภาษี และตรวจสอบบัญชีเพื่อความโปร่งใสขององค์กร',
    tags: ['ความละเอียดรอบคอบ', 'วิเคราะห์ตัวเลข', 'ความซื่อสัตย์', 'CPA/TA'],
    licenses: 'ผู้สอบบัญชีรับอนุญาต (CPA) หรือ ผู้สอบบัญชีภาษีอากร (TA)',
    minigame_ready: true,
    minigame_url: 'minigames/accountant.html'
  },
  {
    id: 'programmer',
    title: 'โปรแกรมเมอร์ / ซอฟต์แวร์เอนจิเนียร์ (Software Engineer)',
    title_en: 'Software Engineer',
    category: 'เทคโนโลยีและคอมพิวเตอร์',
    faculty_id: 'tech',
    faculty: 'คณะวิทยาศาสตร์ (วิทยาการคอมพิวเตอร์) / คณะวิศวกรรมศาสตร์',
    salary_range: '35,000 - 120,000+ บาท/เดือน',
    salary_min: 35000,
    salary_max: 120000,
    demand: 'สูงที่สุด',
    demand_level: 98,
    icon: 'fa-code',
    color: '#6366f1',
    description: 'ผู้เขียนโค้ด พัฒนาระบบ ซอฟต์แวร์ แอปพลิเคชัน และแก้บั๊กปัญหาทางเทคโนโลยีด้วยตรรกะและกระบวนการคิดเชิงคำนวณ',
    tags: ['Logical Thinking', 'แก้ปัญหาซับซ้อน', 'เรียนรู้ตลอดชีวิต', 'Agile/Scrum'],
    licenses: 'ไม่จำเป็นต้องมีใบอนุญาต (พิจารณาจากผลงาน Portfolio / GitHub)',
    minigame_ready: true,
    minigame_url: 'minigames/programmer.html'
  },
  {
    id: 'doctor',
    title: 'แพทย์เวชปฏิบัติทั่วไป (Medical Doctor)',
    title_en: 'Medical Doctor',
    category: 'วิทยาศาสตร์สุขภาพ',
    faculty_id: 'medicine',
    faculty: 'คณะแพทยศาสตร์',
    salary_range: '50,000 - 150,000+ บาท/เดือน',
    salary_min: 50000,
    salary_max: 150000,
    demand: 'สูงที่สุด',
    demand_level: 99,
    icon: 'fa-user-doctor',
    color: '#e11d48',
    description: 'วินิจฉัยโรค บำบัดรักษา วางแผนฟื้นฟูสุขภาพ และดูแลความปลอดภัยของชีวิตมนุษย์ด้วยมาตรฐานการแพทย์',
    tags: ['ความรับผิดชอบสูงสุด', 'วิทยาศาสตร์ชีวภาพ', 'การตัดสินใจฉับไว', 'ใบประกอบวิชาชีพเวชกรรม'],
    licenses: 'ใบประกอบวิชาชีพเวชกรรม (แพทยสภา)',
    minigame_ready: false,
    minigame_url: '#'
  },
  {
    id: 'data_scientist',
    title: 'นักวิทยาศาสตร์ข้อมูล (Data Scientist)',
    title_en: 'Data Scientist',
    category: 'เทคโนโลยีและคอมพิวเตอร์',
    faculty_id: 'tech',
    faculty: 'คณะวิทยาการสารสนเทศ / วิทยาศาสตร์สถิติ',
    salary_range: '40,000 - 110,000+ บาท/เดือน',
    salary_min: 40000,
    salary_max: 110000,
    demand: 'สูงมาก',
    demand_level: 92,
    icon: 'fa-chart-network',
    color: '#0284c7',
    description: 'วิเคราะห์ข้อมูลขนาดใหญ่ สร้างโมเดล Machine Learning และค้นหา Insight ทางธุรกิจจากชุดข้อมูล',
    tags: ['สถิติและคณิตศาสตร์', 'Python/R', 'AI/ML', 'Business Sense'],
    licenses: 'ไม่มีใบอนุญาตบังคับ (เน้น Certificate และผลงาน)',
    minigame_ready: false,
    minigame_url: '#'
  },
  {
    id: 'architect',
    title: 'สถาปนิก (Architect)',
    title_en: 'Architect',
    category: 'การออกแบบและสถาปัตยกรรม',
    faculty_id: 'architecture',
    faculty: 'คณะสถาปัตยกรรมศาสตร์',
    salary_range: '26,000 - 80,000+ บาท/เดือน',
    salary_min: 26000,
    salary_max: 80000,
    demand: 'ปานกลาง',
    demand_level: 70,
    icon: 'fa-compass-drafting',
    color: '#ea580c',
    description: 'ออกแบบสิ่งปลูกสร้าง คำนึงถึงสุนทรียภาพ โครงสร้าง การใช้สอย และสิ่งแวดล้อม',
    tags: ['ความคิดสร้างสรรค์', 'แบบแปลน 3D', 'ความเข้าใจวัสดุ', 'มีใบ ก.ส.'],
    licenses: 'ใบประกอบวิชาชีพสถาปัตยกรรมควบคุม (สภาสถาปนิก)',
    minigame_ready: false,
    minigame_url: '#'
  }
];

export const FACULTIES_DATA = [
  {
    id: 'pharmacy',
    name: 'คณะเภสัชศาสตร์',
    name_en: 'Faculty of Pharmacy',
    icon: 'fa-pills',
    color: '#10b981',
    branches: ['สาขาการบริบาลทางเภสัชกรรม (Pharm Care)', 'สาขาวิทยาศาสตร์เภสัชกรรม (Pharm Sci)'],
    sample_courses: ['เคมีอินทรีย์ทางการแพทย์', 'เภสัชวิทยา (Pharmacology)', 'สรีรวิทยาของมนุษย์', 'พิษวิทยาและเภสัชพันธุศาสตร์', 'การจัดการร้านยา'],
    career_paths: ['เภสัชกรโรงพยาบาล', 'เภสัชกรชุมชน (ร้านยา)', 'เภสัชกรฝ่ายผลิต/ควบคุมคุณภาพโรงงานยา', 'ผู้เชี่ยวชาญการขึ้นทะเบียนยา (RA)', 'เภสัชกรการตลาด (Med Rep)'],
    license_info: 'ต้องสอบผ่านเกณฑ์ประเมินความรู้ผู้ขอขึ้นทะเบียนและรับใบอนุญาตเป็นผู้ประกอบวิชาชีพเภสัชกรรม (สภาเภสัชกรรม)'
  },
  {
    id: 'law',
    name: 'คณะนิติศาสตร์',
    name_en: 'Faculty of Law',
    icon: 'fa-gavel',
    color: '#f59e0b',
    branches: ['สาขากฎหมายแพ่งและพาณิชย์', 'สาขากฎหมายอาญา', 'สาขากฎหมายมหาชน', 'สาขากฎหมายระหว่างประเทศ', 'สาขากฎหมายธุรกิจ'],
    sample_courses: ['หลักกฎหมายนิติกรรมและสัญญา', 'กฎหมายวิธีพิจารณาความแพ่ง/อาญา', 'กฎหมายภาษีอากร', 'กฎหมายทรัพย์สินทางปัญญา', 'ศาลจำลอง (Moot Court)'],
    career_paths: ['ทนายความ', 'นิติกรองค์กร/หน่วยงานรัฐ', 'ผู้พิพากษา', 'พนักงานอัยการ', 'ที่ปรึกษากฎหมายธุรกิจข้ามชาติ'],
    license_info: 'ใบอนุญาตว่าความจากสภาทนายความ หรือ สอบไล่ได้ตามหลักสูตรของสำนักอบรมศึกษากฎหมายแห่งเนติบัณฑิตยสภา'
  },
  {
    id: 'education',
    name: 'คณะครุศาสตร์ / ศึกษาศาสตร์',
    name_en: 'Faculty of Education',
    icon: 'fa-graduation-cap',
    color: '#06b6d4',
    branches: ['สาขาวิชาคณิตศาสตร์ศึกษา', 'สาขาวิทยาศาสตร์', 'สาขาการสอนภาษาอังกฤษ', 'สาขาปฐมวัย', 'สาขาจิตวิทยาการแนะแนว'],
    sample_courses: ['จิตวิทยาสำหรับครู', 'การออกแบบนวัตกรรมการเรียนรู้', 'การวัดและประเมินผลการศึกษา', 'การวิจัยในชั้นเรียน', 'การฝึกปฏิบัติวิชาชีพระหว่างเรียน'],
    career_paths: ['ครูผู้สอนในโรงเรียนรัฐบาล/เอกชน', 'นักวิชาการศึกษา', 'นักออกแบบเนื้อหาการเรียนรู้ (Instructional Designer)', 'นักจิตวิทยาแนะแนว'],
    license_info: 'ต้องมีใบอนุญาตประกอบวิชาชีพครูออกโดยคุรุสภา (ผ่านการประเมินสมรรถนะตามมาตรฐานวิชาชีพ)'
  },
  {
    id: 'commerce',
    name: 'คณะพาณิชยศาสตร์และการบัญชี / คณะบริหารธุรกิจ',
    name_en: 'Faculty of Commerce and Accountancy',
    icon: 'fa-chart-pie',
    color: '#8b5cf6',
    branches: ['สาขาการบัญชี (Accounting)', 'สาขาการเงินและการธนาคาร (Finance)', 'สาขาการตลาด (Marketing)', 'สาขาการจัดการโลจิสติกส์'],
    sample_courses: ['การบัญชีการเงินขั้นต้นและขั้นสูง', 'การสอบบัญชีและการให้ความเชื่อมั่น', 'ระบบสารสนเทศทางการบัญชี (AIS)', 'การวางแผนภาษีอากร', 'การวิเคราะห์งบการเงิน'],
    career_paths: ['นักบัญชีองค์กร', 'ผู้สอบบัญชีรับอนุญาต (CPA) ใน Big 4', 'ที่ปรึกษาทางการเงินและภาษี', 'ผู้จัดการฝ่ายการเงิน (CFO)'],
    license_info: 'ผู้ประกอบวิชาชีพบัญชีต้องขึ้นทะเบียนกับสภาวิชาชีพบัญชี ในพระบรมราชูปถัมภ์ และสอบเก็บชั่วโมงเพื่อขอรับใบอนุญาต CPA'
  },
  {
    id: 'tech',
    name: 'คณะวิทยาการคอมพิวเตอร์และเทคโนโลยีสารสนเทศ',
    name_en: 'Faculty of Computer Science and IT',
    icon: 'fa-laptop-code',
    color: '#6366f1',
    branches: ['สาขาวิทยาการคอมพิวเตอร์ (CS)', 'สาขาวิศวกรรมซอฟต์แวร์ (SE)', 'สาขาปัญญาประดิษฐ์ (AI/Data)', 'สาขาความปลอดภัยไซเบอร์ (Cybersecurity)'],
    sample_courses: ['Data Structures & Algorithms', 'Web & Mobile Development', 'Database Systems & SQL', 'Cloud Computing & DevOps', 'Software Architecture'],
    career_paths: ['Software Engineer / Developer', 'Full-stack Web Developer', 'DevOps & Cloud Engineer', 'Data Engineer / Scientist', 'Cybersecurity Specialist'],
    license_info: 'ไม่มีใบอนุญาตบังคับในประเทศไทย เน้นการทดสอบ Coding Assessment และแฟ้มผลงานโปรเจกต์จริง'
  },
  {
    id: 'medicine',
    name: 'คณะแพทยศาสตร์',
    name_en: 'Faculty of Medicine',
    icon: 'fa-stethoscope',
    color: '#e11d48',
    branches: ['หลักสูตรแพทยศาสตรบัณฑิต 6 ปี', 'แพทย์เฉพาะทาง (ศัลยกรรม, อายุรกรรม, กุมารเวช, ฯลฯ)'],
    sample_courses: ['กายวิภาคศาสตร์ (Gross Anatomy)', 'พยาธิวิทยา (Pathology)', 'อายุรศาสตร์คลินิก', 'สูติ-นรีเวชวิทยา', 'เวชศาสตร์ฉุกเฉิน'],
    career_paths: ['แพทย์ทั่วไปในโรงพยาบาลรัฐ/เอกชน', 'แพทย์เฉพาะทาง', 'อาจารย์แพทย์', 'แพทย์นักวิจัยทางคลินิก'],
    license_info: 'ต้องสอบผ่านขั้นตอนการประเมินความรู้ความสามารถเพื่อขอขึ้นทะเบียนรับใบอนุญาตประกอบวิชาชีพเวชกรรม (NL ขั้น 1, 2, 3) โดยแพทยสภา'
  }
];

export const UNIVERSITIES_DATA = [
  {
    id: 'chula',
    name: 'จุฬาลงกรณ์มหาวิทยาลัย',
    name_en: 'Chulalongkorn University',
    province: 'กรุงเทพมหานคร',
    type: 'มหาวิทยาลัยในกำกับของรัฐ',
    ranking: 'อันดับ 1 ของประเทศไทย (QS World Ranking)',
    badge_color: '#f43f5e',
    highlights: 'สถาบันอุดมศึกษาแห่งแรกของไทย โดดเด่นด้านวิชาการ เครือข่ายศิษย์เก่าที่แข็งแกร่ง และศูนย์กลางนวัตกรรมใจกลางสยามสแควร์',
    tcas_criteria: 'TCAS รอบ 1 แฟ้มสะสมผลงาน (Portfolio), รอบ 2 โควตา, รอบ 3 แอดมิชชัน (ใช้คะแนน A-Level + TGAT/TPAT 1-3 ตามสาย)',
    tuition_fee: 'ประมาณ 17,000 - 35,000 บาท/ภาคเรียน (หลักสูตรปกติ)',
    website: 'https://www.chula.ac.th',
    faculties: ['คณะเภสัชศาสตร์', 'คณะนิติศาสตร์', 'คณะครุศาสตร์', 'คณะพาณิชยศาสตร์และการบัญชี', 'คณะแพทยศาสตร์', 'คณะวิศวกรรมศาสตร์']
  },
  {
    id: 'thammasat',
    name: 'มหาวิทยาลัยธรรมศาสตร์',
    name_en: 'Thammasat University',
    province: 'กรุงเทพฯ / ปทุมธานี',
    type: 'มหาวิทยาลัยในกำกับของรัฐ',
    ranking: 'อันดับต้นด้านนิติศาสตร์ บริหารธุรกิจ และสังคมศาสตร์',
    badge_color: '#f59e0b',
    highlights: 'ดินแดนแห่งเสรีภาพและประชาธิปไตย โดดเด่นเลื่องชื่อด้านนิติศาสตร์ พาณิชยศาสตร์และการบัญชี วิทยาศาสตร์และเทคโนโลยี และหลักสูตรสองภาษา',
    tcas_criteria: 'TCAS รอบ 1 TU Portfolio, รอบ 2 โควตานักเรียนพื้นที่, รอบ 3 Admission (เกณฑ์ TGAT/TPAT และวิชาสามัญตามคณะ)',
    tuition_fee: 'ประมาณ 15,000 - 32,000 บาท/ภาคเรียน (หลักสูตรปกติ)',
    website: 'https://www.tu.ac.th',
    faculties: ['คณะนิติศาสตร์', 'คณะพาณิชยศาสตร์และการบัญชี', 'คณะเภสัชศาสตร์', 'คณะวิทยาการเรียนรู้และศึกษาศาสตร์', 'คณะแพทยศาสตร์', 'คณะวิทยาศาสตร์และเทคโนโลยี']
  },
  {
    id: 'mahidol',
    name: 'มหาวิทยาลัยมหิดล',
    name_en: 'Mahidol University',
    province: 'นครปฐม / กรุงเทพมหานคร',
    type: 'มหาวิทยาลัยในกำกับของรัฐ',
    ranking: 'อันดับ 1 ด้านวิทยาศาสตร์สุขภาพและการแพทย์ของไทย',
    badge_color: '#0284c7',
    highlights: 'ความเป็นเลิศด้านแพทยศาสตร์ เภสัชศาสตร์ วิทยาศาสตร์สุขภาพ และดนตรีระดับสากล มีสิ่งแวดล้อมสีเขียวร่มรื่นในวิทยาเขตศาลายา',
    tcas_criteria: 'TCAS รอบ 1 Portfolio (ผลงานวิจัย/โอลิมปิกวิชาการ), รอบ 2 โควตา, รอบ 3 กสพท. และ Admission',
    tuition_fee: 'ประมาณ 18,000 - 40,000 บาท/ภาคเรียน',
    website: 'https://www.mahidol.ac.th',
    faculties: ['คณะแพทยศาสตร์ศิริราชพยาบาล', 'คณะแพทยศาสตร์โรงพยาบาลรามาธิบดี', 'คณะเภสัชศาสตร์', 'คณะเทคโนโลยีสารสนเทศและการสื่อสาร (ICT)']
  },
  {
    id: 'kasetsart',
    name: 'มหาวิทยาลัยเกษตรศาสตร์',
    name_en: 'Kasetsart University',
    province: 'กรุงเทพมหานคร',
    type: 'มหาวิทยาลัยในกำกับของรัฐ',
    ranking: 'ชั้นนำด้านวิศวกรรมศาสตร์ การเกษตร วิทยาศาสตร์และบริหารธุรกิจ',
    badge_color: '#10b981',
    highlights: 'มหาวิทยาลัยสีเขียวขนาดใหญ่ มีสาขาวิชาหลากหลาย ชุมชนอบอุ่น โดดเด่นทั้งสายเทคโนโลยี คอมพิวเตอร์ และเศรษฐศาสตร์การบริหาร',
    tcas_criteria: 'TCAS รอบ 1 KU Portfolio, รอบ 2 โควตาภาคกลาง/เรียนดี, รอบ 3 Admission กลาง',
    tuition_fee: 'ประมาณ 13,000 - 28,000 บาท/ภาคเรียน',
    website: 'https://www.ku.ac.th',
    faculties: ['คณะวิศวกรรมศาสตร์', 'คณะศึกษาศาสตร์', 'คณะบริหารธุรกิจ', 'คณะวิทยาศาสตร์ (วิทยาการคอมฯ)']
  },
  {
    id: 'kmutt',
    name: 'มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี (บางมด)',
    name_en: 'KMUTT',
    province: 'กรุงเทพมหานคร',
    type: 'มหาวิทยาลัยในกำกับของรัฐ',
    ranking: 'แถวหน้าด้านวิศวกรรมศาสตร์ หุ่นยนต์ AI และสถาปัตยกรรม',
    badge_color: '#ea580c',
    highlights: 'มุ่งเน้นการลงมือปฏิบัติจริง โครงงานนวัตกรรม การเขียนโปรแกรม และความร่วมมือกับภาคอุตสาหกรรมเทคโนโลยีระดับโลก',
    tcas_criteria: 'TCAS รอบ 1 Active Recruitment, รอบ 2 โควตาวิชาการ, รอบ 3 Admission',
    tuition_fee: 'ประมาณ 19,000 - 38,000 บาท/ภาคเรียน',
    website: 'https://www.kmutt.ac.th',
    faculties: ['คณะวิศวกรรมศาสตร์', 'คณะเทคโนโลยีสารสนเทศ (SIT)', 'คณะครุศาสตร์อุตสาหกรรมและเทคโนโลยี', 'คณะสถาปัตยกรรมศาสตร์และการออกแบบ']
  },
  {
    id: 'cmu',
    name: 'มหาวิทยาลัยเชียงใหม่',
    name_en: 'Chiang Mai University',
    province: 'เชียงใหม่',
    type: 'มหาวิทยาลัยในกำกับของรัฐ',
    ranking: 'มหาวิทยาลัยชั้นนำอันดับ 1 ของภาคเหนือ',
    badge_color: '#8b5cf6',
    highlights: 'บรรยากาศน่าเรียนท่ามกลางธรรมชาติเชิงดอยสุเทพ ครบครันทั้งสายสุขภาพ กฎหมาย การศึกษา และเทคโนโลยีสารสนเทศ',
    tcas_criteria: 'TCAS รอบ 1 โควตานักเรียนเรียนดี, รอบ 2 โควตาภาคเหนือ 17 จังหวัด, รอบ 3 Admission ทั่วประเทศ',
    tuition_fee: 'ประมาณ 15,000 - 30,000 บาท/ภาคเรียน',
    website: 'https://www.cmu.ac.th',
    faculties: ['คณะเภสัชศาสตร์', 'คณะนิติศาสตร์', 'คณะศึกษาศาสตร์', 'คณะบริหารธุรกิจ', 'คณะแพทยศาสตร์']
  }
];

export const PROVINCES_TH = [
  'กรุงเทพมหานคร', 'กระบี่', 'กาญจนบุรี', 'กาฬสินธุ์', 'กำแพงเพชร', 'ขอนแก่น', 'จันทบุรี', 'ฉะเชิงเทรา', 
  'ชลบุรี', 'ชัยนาท', 'ชัยภูมิ', 'ชุมพร', 'เชียงราย', 'เชียงใหม่', 'ตรัง', 'ตราด', 'ตาก', 'นครนายก', 
  'นครปฐม', 'นครพนม', 'นครราชสีมา', 'นครศรีธรรมราช', 'นครสวรรค์', 'นนทบุรี', 'นราธิวาส', 'น่าน', 
  'บึงกาฬ', 'บุรีรัมย์', 'ปทุมธานี', 'ประจวบคีรีขันธ์', 'ปราจีนบุรี', 'ปัตตานี', 'พระนครศรีอยุธยา', 
  'พะเยา', 'พังงา', 'พัทลุง', 'พิจิตร', 'พิษณุโลก', 'เพชรบุรี', 'เพชรบูรณ์', 'แพร่', 'ภูเก็ต', 
  'มหาสารคาม', 'มุกดาหาร', 'แม่ฮ่องสอน', 'ยโสธร', 'ยะลา', 'ร้อยเอ็ด', 'ระนอง', 'ระยอง', 'ราชบุรี', 
  'ลพบุรี', 'ลำปาง', 'ลำพูน', 'เลย', 'ศรีสะเกษ', 'สกลนคร', 'สงขลา', 'สตูล', 'สมุทรปราการ', 
  'สมุทรสงคราม', 'สมุทรสาคร', 'สระแก้ว', 'สระบุรี', 'สิงห์บุรี', 'สุโขทัย', 'สุพรรณบุรี', 'สุราษฎร์ธานี', 
  'สุรินทร์', 'หนองคาย', 'หนองบัวลำภู', 'อ่างทอง', 'อำนาจเจริญ', 'อุดรธานี', 'อุตรดิตถ์', 'อุทัยธานี', 
  'อุบลราชธานี'
];

export function getCareerById(id) {
  return CAREERS_DATA.find(c => c.id === id) || null;
}

export function getFacultyById(id) {
  return FACULTIES_DATA.find(f => f.id === id) || null;
}

export function getUniversityById(id) {
  return UNIVERSITIES_DATA.find(u => u.id === id) || null;
}
