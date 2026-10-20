/**
 * Career Discovery Platform - Auth Guard & Header State Manager
 */
import { authService } from '../services/authService.js';
import { getRelativePath } from './router.js';

export async function initNavbarAuth() {
  const authContainer = document.getElementById('navbar-auth-section');
  if (!authContainer) return;

  const profile = await authService.getCurrentProfile();
  const user = await authService.getCurrentUser();

  if (user && profile) {
    const initials = (profile.username || 'U').charAt(0).toUpperCase();
    authContainer.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px;">
        <a href="${getRelativePath('pages/profile.html')}" class="user-menu-badge" title="ดูโปรไฟล์และสถิติทักษะ">
          <div class="user-avatar-mini">${initials}</div>
          <span class="user-name-mini">${profile.username || 'สมาชิก'}</span>
        </a>
        <button id="logout-btn" class="btn btn-ghost btn-sm" title="ออกจากระบบ" style="padding:6px 10px;">
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
      </div>
    `;

    document.getElementById('logout-btn')?.addEventListener('click', async () => {
      await authService.logout();
      window.location.reload();
    });
  } else {
    authContainer.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px;">
        <a href="${getRelativePath('pages/auth/login.html')}" class="btn btn-ghost btn-sm">เข้าสู่ระบบ</a>
        <a href="${getRelativePath('pages/auth/register.html')}" class="btn btn-primary btn-sm">สมัครสมาชิก</a>
      </div>
    `;
  }

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }
}

export async function requireAuth() {
  const user = await authService.getCurrentUser();
  if (!user) {
    window.location.href = getRelativePath('pages/auth/login.html');
  }
}

// Auto-run when DOM is ready
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initNavbarAuth();
  });
}
