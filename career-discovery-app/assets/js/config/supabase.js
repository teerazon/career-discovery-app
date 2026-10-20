/**
 * Supabase Client Configuration
 * Supports both Live Supabase and graceful LocalStorage fallback mode
 */

// Runtime environment overrides (if injected via window.__ENV__ or localStorage)
const runtimeConfig = (typeof window !== 'undefined' && window.__ENV__) || {};

export const SUPABASE_CONFIG = {
  // Supabase Project URL
  url: runtimeConfig.SUPABASE_URL || (typeof localStorage !== 'undefined' && localStorage.getItem('cda_supabase_url')) || 'https://zahfvdkaayaiwcaptsrm.supabase.co',
  // Supabase Publishable Key
  anonKey: runtimeConfig.SUPABASE_ANON_KEY || (typeof localStorage !== 'undefined' && localStorage.getItem('cda_supabase_anon_key')) || 'sb_publishable_jkiFQndCqyodcXjVIKNR4w_cBRFNWHr'
};

let client = null;
let isMock = false;

// Initialize Supabase or create a robust mock client if offline/demo
export function initSupabase() {
  if (client) return { client, isMock };

  try {
    if (window.supabase && SUPABASE_CONFIG.url && !SUPABASE_CONFIG.url.includes('YOUR_PROJECT_REF') && !SUPABASE_CONFIG.url.includes('xyzcompany')) {
      client = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
      isMock = false;
      console.log('⚡ Connected to Supabase Cloud Client');
      return { client, isMock };
    }
  } catch (err) {
    console.warn('Supabase initialization failed, falling back to LocalStorage engine:', err);
  }

  // LocalStorage Fallback Mock Client
  isMock = true;
  console.log('📦 Using LocalStorage Hybrid Engine (Mock Mode active)');

  client = {
    auth: {
      async signUp({ email, password, options }) {
        const users = JSON.parse(localStorage.getItem('cda_mock_users') || '[]');
        const existing = users.find(u => u.email === email);
        if (existing) {
          return { data: { user: null }, error: { message: 'อีเมลนี้ถูกใช้งานแล้วในระบบ' } };
        }
        const newUser = {
          id: 'user_' + Date.now(),
          email,
          user_metadata: options?.data || {},
          created_at: new Date().toISOString()
        };
        users.push({ ...newUser, password });
        localStorage.setItem('cda_mock_users', JSON.stringify(users));

        // Create initial profile
        const profiles = JSON.parse(localStorage.getItem('cda_mock_profiles') || '{}');
        profiles[newUser.id] = {
          id: newUser.id,
          username: options?.data?.username || email.split('@')[0],
          email,
          education_level: options?.data?.education_level || 'มัธยมศึกษาตอนปลาย',
          phone: options?.data?.phone || '',
          province: options?.data?.province || 'กรุงเทพมหานคร',
          interested_careers: [],
          interested_faculties: []
        };
        localStorage.setItem('cda_mock_profiles', JSON.stringify(profiles));

        // Set current session
        localStorage.setItem('cda_current_user', JSON.stringify(newUser));
        return { data: { user: newUser, session: { user: newUser } }, error: null };
      },

      async signInWithPassword({ email, password }) {
        const users = JSON.parse(localStorage.getItem('cda_mock_users') || '[]');
        const found = users.find(u => u.email === email && u.password === password);
        if (!found) {
          // If demo mode, allow quick demo login
          if (email.includes('demo') || users.length === 0) {
            const demoUser = {
              id: 'user_demo_101',
              email: email || 'student@career-discovery.th',
              user_metadata: { username: 'นักเรียนตัวอย่าง' }
            };
            localStorage.setItem('cda_current_user', JSON.stringify(demoUser));
            return { data: { user: demoUser, session: { user: demoUser } }, error: null };
          }
          return { data: { user: null }, error: { message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' } };
        }
        localStorage.setItem('cda_current_user', JSON.stringify(found));
        return { data: { user: found, session: { user: found } }, error: null };
      },

      async signOut() {
        localStorage.removeItem('cda_current_user');
        return { error: null };
      },

      async getUser() {
        const user = JSON.parse(localStorage.getItem('cda_current_user') || 'null');
        return { data: { user }, error: null };
      },

      async getSession() {
        const user = JSON.parse(localStorage.getItem('cda_current_user') || 'null');
        return { data: { session: user ? { user } : null }, error: null };
      }
    },

    from(table) {
      return {
        select(columns = '*') {
          return {
            eq(col, val) {
              return {
                async single() {
                  const data = JSON.parse(localStorage.getItem(`cda_mock_${table}`) || '[]');
                  if (table === 'profiles') {
                    const profiles = JSON.parse(localStorage.getItem('cda_mock_profiles') || '{}');
                    return { data: profiles[val] || null, error: null };
                  }
                  const item = Array.isArray(data) ? data.find(i => i[col] === val) : null;
                  return { data: item, error: null };
                },
                async order(orderCol, { ascending = false } = {}) {
                  const raw = JSON.parse(localStorage.getItem(`cda_mock_${table}`) || '[]');
                  const filtered = raw.filter(i => i[col] === val);
                  return { data: filtered, error: null };
                }
              };
            },
            async order(orderCol, { ascending = false } = {}) {
              const data = JSON.parse(localStorage.getItem(`cda_mock_${table}`) || '[]');
              return { data, error: null };
            }
          };
        },
        async insert(records) {
          const tableKey = `cda_mock_${table}`;
          let data = JSON.parse(localStorage.getItem(tableKey) || '[]');
          const toAdd = Array.isArray(records) ? records : [records];
          const stamped = toAdd.map(r => ({
            id: r.id || 'log_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
            created_at: new Date().toISOString(),
            ...r
          }));
          data = [...stamped, ...data];
          localStorage.setItem(tableKey, JSON.stringify(data));
          return { data: stamped, error: null };
        },
        async update(updates) {
          return {
            eq(col, val) {
              if (table === 'profiles') {
                const profiles = JSON.parse(localStorage.getItem('cda_mock_profiles') || '{}');
                profiles[val] = { ...(profiles[val] || {}), ...updates };
                localStorage.setItem('cda_mock_profiles', JSON.stringify(profiles));
                return { data: profiles[val], error: null };
              }
              return { data: updates, error: null };
            }
          };
        }
      };
    }
  };

  return { client, isMock: true };
}

const { client: supabaseClient, isMock: isMockMode } = initSupabase();
export const supabase = supabaseClient;
export { isMockMode };
export default supabase;
