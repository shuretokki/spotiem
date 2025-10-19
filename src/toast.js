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
    container.className =
      'fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-3 pointer-events-none';
    document.body.appendChild(container);
  }

  // Create toast element
  const toast = document.createElement('div');
  toast.className =
    'toast-item pointer-events-auto transform translate-y-[200px] opacity-0 transition-all duration-300 ease-out';

  // Get icon and color based on type
  const iconColors = {
    success: 'text-[#57B660]',
    error: 'text-red-500',
    info: 'text-blue-500',
    warning: 'text-yellow-500',
  };

  // Get icon based on type
  const icons = {
    success: `<svg class="w-5 h-5 flex-shrink-0 ${iconColors.success}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>`,
    error: `<svg class="w-5 h-5 flex-shrink-0 ${iconColors.error}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>`,
    info: `<svg class="w-5 h-5 flex-shrink-0 ${iconColors.info}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>`,
    warning: `<svg class="w-5 h-5 flex-shrink-0 ${iconColors.warning}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
    </svg>`,
  };

  toast.innerHTML = `
    <div class="bg-white text-black px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 min-w-[280px] max-w-[400px] border border-gray-200">
      ${icons[type]}
      <span class="text-sm font-medium flex-1">${message}</span>
      <button class="toast-close ml-2 text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close">
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
      toast.classList.remove('translate-y-[200px]', 'opacity-0');
    });
  });

  // Setup close button
  const closeBtn = toast.querySelector('.toast-close');
  const removeToast = () => {
    toast.classList.add('translate-y-[200px]', 'opacity-0');
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
  closeBtn.addEventListener('click', () => clearTimeout(autoRemoveTimeout), {
    once: true,
  });
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
