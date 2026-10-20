# 🚀 Career Discovery & Minigame Platform

แพลตฟอร์มค้นหาตัวตนและแนะแนวการศึกษาด้วยระบบเกมจำลองสถานการณ์อาชีพ 24 ชั่วโมง (24-Hour Roleplay Simulation) พัฒนาด้วยเทคโนโลยี Vanilla Web Stack (HTML5, CSS3, JavaScript ES6 Modules) พร้อมฐานข้อมูล Supabase และรองรับการ Deploy ครบทุกแพลตฟอร์ม

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```text
thamasart/
├── career-discovery-app/      # ซอร์สโค้ดและแอสเซททั้งหมดของแอปพลิเคชัน
│   ├── index.html            # หน้าหลักของแพลตฟอร์ม
│   ├── pages/                # หน้ามินิเกม, ค้นหาอาชีพ, คณะ, มหาวิทยาลัย, Auth
│   ├── assets/               # CSS, JavaScript (Services, Games, Utils)
│   ├── vercel.json           # Vercel Configuration (ซับโฟลเดอร์)
│   └── netlify.toml          # Netlify Configuration (ซับโฟลเดอร์)
├── supabase/
│   └── schema.sql            # สคริปต์ SQL Migration พร้อม RLS และ Auth Trigger
├── .github/workflows/
│   └── deploy.yml            # GitHub Actions สำหรับ GitHub Pages อัตโนมัติ
├── vercel.json               # Vercel Configuration สำหรับ Root Repository
├── netlify.toml              # Netlify Configuration สำหรับ Root Repository
├── Dockerfile                # Docker Image พร้อม Nginx สำหรับ VPS / Cloud
├── docker-compose.yml        # Docker Compose configuration
├── nginx.conf                # Nginx production configuration
├── package.json              # NPM scripts สำหรับการรันในเครื่องและ Node hosts
└── README.md
```

## ⚡ การรันโปรเจกต์ในเครื่อง (Local Development)

```bash
# 1. ติดตั้ง serve หรือรันผ่าน npx ทันที
npm start
# หรือ
npx serve career-discovery-app -l 3000
```
เปิดบราวเซอร์ที่: `http://localhost:3000`

---

## 🌐 คู่มือการ Deploy ใช้งานจริง (Production Deployment)

### 1. Vercel (แนะนำ)
- Import Git Repository เข้าสู่ Vercel Dashboard
- ระบบมี `vercel.json` ทั้งที่ Root และโฟลเดอร์ย่อย จึงสามารถกด **Deploy** ได้ทันทีโดยไม่ต้องเปลี่ยนการตั้งค่า

### 2. Netlify
- เชื่อมต่อ Git Repository บน Netlify
- ไฟล์ `netlify.toml` จะกำหนด Build Target ไปที่ `career-discovery-app` ให้อัตโนมัติ

### 3. GitHub Pages
- เข้าที่ **Settings** > **Pages** > เปลี่ยน Source เป็น **GitHub Actions**
- เมื่อ Push โค้ดขึ้นกิ่ง `main` ระบบจะ Deploy ให้ทันที

### 4. Docker / VPS
```bash
docker compose up -d --build
```
ระบบจะเปิดให้บริการที่พอร์ต `8080` (หรือสามารถแก้ไขใน `docker-compose.yml`)

---

## 🗄️ การตั้งค่าฐานข้อมูล Supabase
1. นำไฟล์ [`supabase/schema.sql`](file:///c:/Users/nntak/Desktop/thamasart/supabase/schema.sql) ไปรันใน **SQL Editor** ของ Supabase
2. นำ `SUPABASE_URL` และ `SUPABASE_ANON_KEY` ไปใส่ใน [`career-discovery-app/assets/js/config/supabase.js`](file:///c:/Users/nntak/Desktop/thamasart/career-discovery-app/assets/js/config/supabase.js)
