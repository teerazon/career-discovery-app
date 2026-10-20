# 🚀 Career Discovery & Minigame Platform

แพลตฟอร์มค้นหาตัวตนและแนะแนวการศึกษาด้วยระบบเกมจำลองสถานการณ์อาชีพ 24 ชั่วโมง (24 Hours Roleplay Simulation) พัฒนาด้วย **Vanilla HTML5, CSS3, JavaScript (ES6 Modules)** เชื่อมต่อฐานข้อมูล **Supabase** และพร้อมสำหรับการ Deploy บน **Vercel**

---

## 📁 1. โครงสร้างโฟลเดอร์ของโปรเจกต์ (Project Directory Structure)

```text
career-discovery-app/
├── index.html                       # หน้าแรก (Career Discovery & Hero Showcase)
├── pages/
│   ├── auth/
│   │   ├── login.html               # เข้าสู่ระบบ + Quick Demo Login
│   │   ├── register.html            # สมัครสมาชิก Step 1 (ข้อมูลทั่วไป + 77 จังหวัด)
│   │   ├── onboarding-careers.html   # Onboarding Step 2 (อาชีพที่สนใจ + ปุ่ม Skip ขวาล่าง)
│   │   └── onboarding-faculties.html # Onboarding Step 3 (คณะที่สนใจ + ปุ่ม Skip ขวาล่าง)
│   ├── explore.html                 # คลังค้นหาและกรองข้อมูลอาชีพ (Search & Filter)
│   ├── minigames/
│   │   ├── index.html               # ศูนย์รวมเลือกรอบการเล่น minigame (24h simulation)
│   │   ├── pharmacist.html          # เกมจำลองเภสัชกร
│   │   ├── lawyer.html              # เกมจำลองทนายความ
│   │   ├── teacher.html             # เกมจำลองครู
│   │   ├── accountant.html          # เกมจำลองนักบัญชี
│   │   └── programmer.html          # เกมจำลองโปรแกรมเมอร์
│   ├── guidance/
│   │   ├── faculties.html           # แนะแนวคณะ หลักสูตร และใบประกอบวิชาชีพ
│   │   └── universities.html        # แนะนำมหาวิทยาลัย + เกณฑ์คะแนน TCAS + ลิงก์ทางการ
│   ├── profile.html                 # โปรไฟล์ผู้ใช้ + สถิติพัฒนาการทักษะสะสม
│   └── score-summary.html           # สรุปคะแนนหลังเล่นจบเกม (Radar Chart & Feedback)
├── assets/
│   ├── css/
│   │   ├── main.css                 # Global Theme, Layout, Tokens, Typography
│   │   ├── components.css           # Buttons, Cards, Modals, Badges, Progress Bars
│   │   ├── auth.css                 # Style สำหรับหน้า Auth, Steps & Floating Skip Button
│   │   └── games.css                # Style สำหรับ Minigame HUD, 24h Timeline & Dynamic Meter
│   └── js/
│       ├── config/
│       │   └── supabase.js          # Supabase Client Configuration + LocalStorage Fallback
│       ├── services/
│       │   ├── authService.js       # จัดการ Register, Login, Session, Onboarding
│       │   ├── gameService.js       # บันทึกคะแนน 4 ทักษะ, คำนวณค่าเฉลี่ย
│       │   └── dataService.js       # ข้อมูลอาชีพ คณะ มหาวิทยาลัย 77 จังหวัด
│       ├── games/                   # Logic ระบบจำลอง 5 อาชีพ
│       │   ├── pharmacist.js        # วินิจฉัยยา, ถาดนับยา, คำแนะนำยาเด็ก
│       │   ├── lawyer.js            # สืบพยาน, ปุ่มคัดค้าน Objection!, ป.วิ.อ. ม.227
│       │   ├── teacher.js           # Attention Meter, ตรวจการบ้าน, จิตวิทยาผู้ปกครอง
│       │   ├── accountant.js        # Dr/Cr, หานัยสำคัญงบไม่ดุล 50k, จรรยาบรรณภาษี
│       │   └── programmer.js        # Sprint P0, บั๊ก TypeError, รับมือลูกค้า ASAP
│       └── utils/
│           ├── authCheck.js         # Header Auth state manager & Guard
│           └── router.js            # Path resolution & Toast notifications
├── vercel.json                      # Vercel Clean URLs & Route Headers
└── README.md                        # รายละเอียดโปรเจกต์และ SQL Migration
```

---

## 🗄️ 2. Supabase Database Schema (SQL Migration)

นำคำสั่ง SQL ด้านล่างนี้ไปรันใน **Supabase SQL Editor** เพื่อสร้างตารางและ Row Level Security (RLS) ที่สมบูรณ์:

```sql
-- 1. สร้างตาราง profiles เก็บข้อมูลผู้ใช้งานและการ Onboarding
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    education_level TEXT,
    phone TEXT,
    province TEXT,
    interested_careers TEXT[] DEFAULT '{}',
    interested_faculties TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- เปิดใช้งาน RLS สำหรับ profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone." 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." 
ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile." 
ON public.profiles FOR UPDATE USING (auth.uid() = id);


-- 2. สร้างตาราง game_logs เก็บคะแนนและสถิติ 4 ทักษะ
CREATE TABLE IF NOT EXISTS public.game_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    career_id TEXT NOT NULL,
    career_name TEXT,
    total_score INT NOT NULL,
    max_score INT DEFAULT 100,
    skills_analytical INT DEFAULT 0,
    skills_problem_solving INT DEFAULT 0,
    skills_communication INT DEFAULT 0,
    skills_thoroughness INT DEFAULT 0,
    strengths TEXT[] DEFAULT '{}',
    areas_to_improve TEXT[] DEFAULT '{}',
    case_summary TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- เปิดใช้งาน RLS สำหรับ game_logs
ALTER TABLE public.game_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own game logs." 
ON public.game_logs FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can insert their own game logs." 
ON public.game_logs FOR INSERT WITH CHECK (true);


-- 3. ตารางเสริมสำหรับ Careers และ Universities (กรณีต้องการ Sync จาก Database เพิ่มเติม)
CREATE TABLE IF NOT EXISTS public.careers (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    salary_range TEXT,
    description TEXT,
    licenses TEXT,
    minigame_ready BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS public.universities (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    province TEXT,
    tcas_criteria TEXT,
    tuition_fee TEXT,
    website TEXT
);
```

---

## 🎮 3. ฟีเจอร์หลักของระบบเกมจำลอง 24 ชั่วโมง (Simulation Highlights)

| อาชีพ | จุดเด่นการจำลอง 24 ชั่วโมง | ทักษะหลักที่ประเมิน |
| :--- | :--- | :--- |
| **เภสัชกร (Pharmacist)** | • วิเคราะห์การแพ้ยาและโรคประจำตัวไตวายเรื้อรัง<br>• ถาดนับเม็ดยาแบบ Interactive นับให้ตรงจำนวนเป้าหมาย 20 เม็ด<br>• ให้คำแนะนำเรื่องยาปฏิชีวนะและการป้องกันเชื้อดื้อยาในเด็ก | ความรอบคอบ, คิดวิเคราะห์, การสื่อสาร |
| **ทนายความ (Lawyer)** | • สไตล์ Ace Attorney สืบพยานจับโกหกคำให้การขัดแย้งกับ CCTV<br>• ปุ่ม "คัดค้าน!" (Objection!) พร้อมเอฟเฟกต์สั่นจอ<br>• ค้นตัวบท ป.วิ.อ. ม.227 วรรคสอง (ยกประโยชน์แห่งความสงสัย) | คิดวิเคราะห์, ไหวพริบแก้ปัญหา, สื่อสาร |
| **ครู (Teacher)** | • บริหารหลอดสมาธิห้องเรียน (Attention Meter) ด้วย Active Learning<br>• ตรวจการบ้านคณิตศาสตร์จับจุดผิดและให้ Constructive Feedback<br>• จิตวิทยาการรับฟัง (Empathy) รับมือผู้ปกครองเข้าข้างลูก | การสื่อสาร, จิตวิทยา, ความรอบคอบ |
| **นักบัญชี (Accountant)** | • แยกบัญชีคู่ Debit / Credit ค่าเช่าค้างจ่ายตามเกณฑ์คงค้าง<br>• หานัยสำคัญงบแสดงฐานะการเงินไม่ดุล 50,000 บาท<br>• ยึดมั่นจรรยาบรรณปฏิเสธบิลยับยู่ยี่สายเลี่ยงภาษี | ความละเอียดรอบคอบ, วิเคราะห์ตัวเลข, จริยธรรม |
| **โปรแกรมเมอร์ (Programmer)** | • Agile Sprint Planning จัดลำดับงาน P0 ระบบชำระเงิน<br>• Interactive Code Debugger แก้บั๊ก TypeError ด้วย Optional Chaining<br>• สื่อสารบริหารจัดการ Scope Creep เมื่อลูกค้าระบุเปลี่ยนฟีเจอร์ด่วน ASAP | การแก้ปัญหา, Logical Thinking, สื่อสาร |

---

## ⚡ 4. การเชื่อมต่อ Supabase & LocalStorage Fallback

ระบบถูกออกแบบด้วยสถาปัตยกรรม **Hybrid Resilient Engine**:
- หากใส่ Supabase URL และ Anon Key ใน `assets/js/config/supabase.js` ระบบจะซิงก์ข้อมูลขึ้น Supabase Cloud ทันที
- หากไม่ได้ใส่ Key หรือเปิดใช้งานแบบ Offline / Localhost ระบบจะสลับไปใช้ **LocalStorage Engine อัตโนมัติ 100%** ทำให้สามารถทดลองใช้งาน สมัครสมาชิก ล็อกอิน เล่นเกม บันทึกคะแนน และดู Radar Chart ได้ทันทีโดยไม่เกิด Error

---

## 🌐 5. คู่มือการ Deploy ใช้งานจริง (Production Deployment Guide)

โปรเจกต์ได้เตรียม Configuration Files สำหรับผู้ให้บริการชั้นนำไว้เรียบร้อยแล้ว:

### ทางเลือกที่ 1: Deploy บน Vercel (แนะนำ ⭐⭐⭐⭐⭐)
1. Push โปรเจกต์ขึ้น **GitHub**
2. ไปที่ [Vercel Dashboard](https://vercel.com/new) -> กด **Add New Project** -> เลือก Repository นี้
3. **ตั้งค่า Root Directory**: สามารถปล่อยเป็น Default (`./`) ได้ทันที หรือเลือก `career-discovery-app`
   *(ระบบมี `vercel.json` รองรับทั้งสองแบบ พร้อม Caching และ Security Headers)*
4. กด **Deploy** ใช้งานได้ทันที

หรือผ่าน Vercel CLI ในเครื่อง:
```bash
npm install -g vercel
vercel deploy --prod
```

---

### ทางเลือกที่ 2: Deploy บน Netlify (⭐⭐⭐⭐)
1. เชื่อมต่อ Git Repository บน [Netlify Dashboard](https://app.netlify.com/)
2. ระบบจะตรวจพบไฟล์ `netlify.toml` และตั้งค่า Build Directory ให้อัตโนมัติ (`career-discovery-app`)
3. กด **Deploy Site**

---

### ทางเลือกที่ 3: Deploy ด้วย GitHub Pages (ฟรี 100% ⭐⭐⭐⭐)
โปรเจกต์มี **GitHub Actions Workflow** พร้อมใช้งานที่ `.github/workflows/deploy.yml`:
1. ไปที่แท็บ **Settings** ของ GitHub Repository
2. เมนูด้านซ้ายเลือก **Pages**
3. หัวข้อ **Source** ให้เลือก **GitHub Actions**
4. เมื่อใดก็ตามที่มีการ `git push` เข้ากิ่ง `main` หรือ `master` ระบบจะ Build และ Deploy ขึ้น GitHub Pages ให้โดยอัตโนมัติ

---

### ทางเลือกที่ 4: Deploy ด้วย Docker / VPS / Cloud Run (⭐⭐⭐⭐)
มี `Dockerfile` (Nginx Alpine) และ `docker-compose.yml` เตรียมไว้แล้ว:
```bash
# รัน Container ผ่าน Docker Compose
docker compose up -d --build
```
ระบบจะเปิดบริการผ่านพอร์ต `8080` (สามารถเข้าใช้งานได้ที่ `http://localhost:8080` หรือชี้ Domain ผ่าน Reverse Proxy เช่น Traefik / Nginx Proxy Manager)

---

### 🗄️ การเชื่อมต่อ Database สำหรับ Production (Supabase)
1. สมัครใช้งานที่ [supabase.com](https://supabase.com) และสร้างโปรเจกต์ใหม่
2. ไปที่เมนู **SQL Editor** ใน Supabase Dashboard
3. คัดลอกเนื้อหาทั้งหมดในไฟล์ [`supabase/schema.sql`](../supabase/schema.sql) ไปวางและกด **Run**
   *(ระบบจะสร้างตาราง `profiles`, `game_logs`, `careers`, `universities`, ตั้งค่า RLS Policies และสร้าง Database Trigger ให้โดยอัตโนมัติ)*
4. นำ **Project URL** และ **Anon Key** จากแท็บ `Project Settings` > `API` ไปใส่ใน:
   - ไฟล์ `assets/js/config/supabase.js`
   - หรือตั้งค่าผ่าน `window.__ENV__` / `.env`
