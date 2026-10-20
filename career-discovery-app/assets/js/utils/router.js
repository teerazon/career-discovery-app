/**
 * Career Discovery Platform - Router & Navigation Helper
 */

// Resolves relative path based on current location depth
export function getRelativePath(targetPath) {
  const path = window.location.pathname;
  let depth = 0;

  if (path.includes('/pages/auth') || path.includes('/pages/minigames') || path.includes('/pages/guidance')) {
    depth = 2;
  } else if (path.includes('/pages')) {
    depth = 1;
  }

  const prefix = depth === 2 ? '../../' : depth === 1 ? '../' : './';
  return prefix + targetPath.replace(/^\//, '');
}

export function navigateTo(targetPath) {
  window.location.href = getRelativePath(targetPath);
}

export function showToast(message, type = 'info', duration = 3500) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = 'fa-info-circle';
  if (type === 'success') icon = 'fa-circle-check';
  if (type === 'error') icon = 'fa-triangle-exclamation';

  toast.innerHTML = `
    <i class="fa-solid ${icon}" style="font-size: 1.25rem;"></i>
    <div style="flex: 1; font-size: 0.92rem;">${message}</div>
    <button style="background:none; border:none; color:var(--text-muted); cursor:pointer;" onclick="this.parentElement.remove()">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentElement) {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }
  }, duration);
}
