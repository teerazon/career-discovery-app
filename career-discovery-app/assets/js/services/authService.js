/**
 * Career Discovery Platform - Authentication & Onboarding Service
 */
import { supabase, isMockMode } from '../config/supabase.js';

export const authService = {
  /**
   * Register Step 1: User basic account details
   */
  async register({ username, email, password, education_level, phone, province }) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username, education_level, phone, province }
        }
      });

      if (error) throw error;
      const user = data.user;

      // In real Supabase mode, insert profile record into public.profiles
      if (!isMockMode && user) {
        const { error: profileErr } = await supabase.from('profiles').insert([
          {
            id: user.id,
            username,
            email,
            education_level,
            phone,
            province,
            interested_careers: [],
            interested_faculties: []
          }
        ]);
        if (profileErr) console.warn('Supabase profile creation notice:', profileErr);
      }

      // Store pending profile data for session persistence
      const activeProfile = {
        id: user?.id || 'demo_user',
        username,
        email,
        education_level,
        phone,
        province,
        interested_careers: [],
        interested_faculties: []
      };
      localStorage.setItem('cda_active_profile', JSON.stringify(activeProfile));

      return { success: true, user, profile: activeProfile };
    } catch (err) {
      console.error('Registration error:', err);
      return { success: false, error: err.message || 'เกิดข้อผิดพลาดในการลงทะเบียน' };
    }
  },

  /**
   * Login with email and password
   */
  async login(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      const user = data.user;
      let profile = null;

      if (!isMockMode && user) {
        const { data: profData } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        profile = profData;
      }

      if (!profile) {
        profile = JSON.parse(localStorage.getItem('cda_active_profile') || 'null') || {
          id: user?.id || 'demo_user',
          username: user?.user_metadata?.username || email.split('@')[0],
          email,
          education_level: 'มัธยมศึกษาตอนปลาย',
          phone: '',
          province: 'กรุงเทพมหานคร',
          interested_careers: ['pharmacist', 'programmer'],
          interested_faculties: ['pharmacy', 'tech']
        };
      }

      localStorage.setItem('cda_active_profile', JSON.stringify(profile));
      return { success: true, user, profile };
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, error: err.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' };
    }
  },

  /**
   * Log out current user
   */
  async logout() {
    await supabase.auth.signOut();
    localStorage.removeItem('cda_current_user');
    localStorage.removeItem('cda_active_profile');
    return { success: true };
  },

  /**
   * Get current authenticated user
   */
  async getCurrentUser() {
    const { data } = await supabase.auth.getUser();
    if (data?.user) return data.user;
    return JSON.parse(localStorage.getItem('cda_current_user') || 'null');
  },

  /**
   * Get current profile details
   */
  async getCurrentProfile() {
    const user = await this.getCurrentUser();
    let profile = JSON.parse(localStorage.getItem('cda_active_profile') || 'null');

    if (user && !isMockMode) {
      try {
        const { data: remoteProfile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        if (remoteProfile) {
          profile = remoteProfile;
          localStorage.setItem('cda_active_profile', JSON.stringify(profile));
        }
      } catch (e) {
        console.warn('Could not fetch remote profile:', e);
      }
    }

    // Default mock guest profile if none exists
    if (!profile) {
      profile = {
        id: 'guest_user',
        username: 'ผู้สำรวจอาชีพ',
        email: 'explorer@career-discovery.th',
        education_level: 'มัธยมศึกษาปีที่ 5',
        phone: '0812345678',
        province: 'กรุงเทพมหานคร',
        interested_careers: ['programmer', 'pharmacist'],
        interested_faculties: ['tech', 'pharmacy']
      };
      localStorage.setItem('cda_active_profile', JSON.stringify(profile));
    }

    return profile;
  },

  /**
   * Update Onboarding Step 2: Interested Careers
   */
  async updateCareers(careersArray) {
    const profile = await this.getCurrentProfile();
    profile.interested_careers = careersArray;
    localStorage.setItem('cda_active_profile', JSON.stringify(profile));

    const user = await this.getCurrentUser();
    if (user && !isMockMode) {
      try {
        await supabase.from('profiles').update({ interested_careers: careersArray }).eq('id', user.id);
      } catch (e) {
        console.warn('Update remote careers notice:', e);
      }
    }
    return { success: true, profile };
  },

  /**
   * Update Onboarding Step 3: Interested Faculties
   */
  async updateFaculties(facultiesArray) {
    const profile = await this.getCurrentProfile();
    profile.interested_faculties = facultiesArray;
    localStorage.setItem('cda_active_profile', JSON.stringify(profile));

    const user = await this.getCurrentUser();
    if (user && !isMockMode) {
      try {
        await supabase.from('profiles').update({ interested_faculties: facultiesArray }).eq('id', user.id);
      } catch (e) {
        console.warn('Update remote faculties notice:', e);
      }
    }
    return { success: true, profile };
  }
};

export default authService;
