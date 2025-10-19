/** @format */

/**
 * Toast Notification System
 * Minimal, clean toast notifications matching Spotiem design
 */

/**
 * Show a toast notification
 * @param {string} message - The message to display
 * @param {string} type - Type of toast: 'success', 'error', 'info', 'warning'
 * @param {number} duration - Duration in milliseconds (default: 3000)
 */
export function showToast(message, type = 'success', duration = 3000) {
  // Create toast container if it doesn't exist
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed top-20 right-4 md:right-8 z-[9999] flex flex-col gap-3 pointer-events-none';
    document.body.appendChild(container);
  }

  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'toast-item pointer-events-auto transform translate-x-[400px] opacity-0 transition-all duration-300 ease-out';
  
  // Set colors based on type
  const typeStyles = {
    success: 'bg-[#57B660] text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-500 text-black',
  };

  // Get icon based on type
  const icons = {
    success: `<svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
    </svg>`,
    error: `<svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>`,
    info: `<svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>`,
    warning: `<svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
    </svg>`,
  };

  toast.innerHTML = `
    <div class="${typeStyles[type]} px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[280px] max-w-[400px]">
      ${icons[type]}
      <span class="text-sm font-medium flex-1">${message}</span>
      <button class="toast-close ml-2 opacity-70 hover:opacity-100 transition-opacity" aria-label="Close">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  `;

  // Add to container
  container.appendChild(toast);

  // Trigger animation after a brief delay (for CSS transition)
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.classList.remove('translate-x-[400px]', 'opacity-0');
    });
  });

  // Setup close button
  const closeBtn = toast.querySelector('.toast-close');
  const removeToast = () => {
    toast.classList.add('translate-x-[400px]', 'opacity-0');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
      // Remove container if empty
      if (container.children.length === 0) {
        container.remove();
      }
    }, 300);
  };

  closeBtn.addEventListener('click', removeToast);

  // Auto-remove after duration
  const autoRemoveTimeout = setTimeout(removeToast, duration);

  // Clear timeout if manually closed
  closeBtn.addEventListener('click', () => clearTimeout(autoRemoveTimeout), { once: true });
}

/**
 * Convenience methods for different toast types
 */
export const toast = {
  success: (message, duration) => showToast(message, 'success', duration),
  error: (message, duration) => showToast(message, 'error', duration),
  info: (message, duration) => showToast(message, 'info', duration),
  warning: (message, duration) => showToast(message, 'warning', duration),
};
