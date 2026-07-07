/* ===== ui.js — Toast & Modal Notification System ===== */

// ============================================================
// TOAST NOTIFICATIONS
// ============================================================

let toastContainer = null;

function ensureToastContainer() {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    toastContainer.setAttribute('aria-live', 'polite');
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

/**
 * Show a toast notification
 * @param {string} message - The message text
 * @param {'success'|'error'|'info'|'warning'} type - Toast type
 * @param {number} duration - Auto-dismiss in ms (0 = sticky)
 */
function showToast(message, type = 'info', duration = 4000) {
  const container = ensureToastContainer();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️'
  };

  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || 'ℹ️'}</span>
    <span class="toast-message">${escapeHtml(message)}</span>
    <button class="toast-close" aria-label="Dismiss">&times;</button>
  `;

  toast.querySelector('.toast-close').addEventListener('click', function () {
    dismissToast(toast);
  });

  container.appendChild(toast);

  // Trigger entrance animation
  requestAnimationFrame(() => {
    toast.classList.add('toast-visible');
  });

  // Auto-dismiss
  if (duration > 0) {
    setTimeout(() => {
      dismissToast(toast);
    }, duration);
  }

  return toast;
}

function dismissToast(toast) {
  if (!toast || toast.classList.contains('toast-leaving')) return;
  toast.classList.remove('toast-visible');
  toast.classList.add('toast-leaving');
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 300);
}

// ============================================================
// MODAL NOTIFICATIONS
// ============================================================

let modalOverlay = null;

function ensureModalOverlay() {
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.setAttribute('role', 'dialog');
    modalOverlay.setAttribute('aria-modal', 'true');
    document.body.appendChild(modalOverlay);

    // Close on overlay click (unless dismissible=false)
    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) {
        const dismissible = modalOverlay.dataset.dismissible !== 'false';
        if (dismissible) closeModal();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('modal-open')) {
        const dismissible = modalOverlay.dataset.dismissible !== 'false';
        if (dismissible) closeModal();
      }
    });
  }
  return modalOverlay;
}

/**
 * Show a modal dialog
 * @param {object} options
 * @param {string} options.title - Modal title
 * @param {string} options.message - Escaped text message (used if messageHtml not provided)
 * @param {string} options.messageHtml - Raw HTML body content (overrides message if set)
 * @param {'info'|'success'|'error'|'warning'} options.type - Modal type
 * @param {Array<{label:string, type:'primary'|'secondary'|'danger', action:function, attrs?:object}>} options.buttons
 * @param {boolean} options.dismissible - Can close by clicking overlay / escape
 * @param {function} options.onOpen - Called after modal is rendered (for form focus etc.)
 */
function showModal(options = {}) {
  const {
    title = 'Notification',
    message = '',
    messageHtml = '',
    type = 'info',
    buttons = [{ label: 'OK', type: 'primary' }],
    dismissible = true,
    onOpen = null
  } = options;

  const overlay = ensureModalOverlay();

  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️'
  };

  const modalEl = document.createElement('div');
  modalEl.className = `modal-dialog modal-${type}`;

  let buttonsHtml = buttons.map((btn, idx) => {
    const btnClass = btn.type === 'primary' ? 'btn btn-primary' :
      btn.type === 'danger' ? 'btn btn-danger' : 'btn btn-secondary';
    const extraAttrs = btn.attrs ? Object.entries(btn.attrs).map(([k, v]) => `${k}="${escapeHtml(String(v))}"`).join(' ') : '';
    return `<button class="${btnClass} modal-btn" data-index="${idx}" ${extraAttrs}>${escapeHtml(btn.label)}</button>`;
  }).join('');

  // Build body content
  let bodyContent;
  if (messageHtml) {
    bodyContent = messageHtml;
  } else {
    bodyContent = `<p>${escapeHtml(message)}</p>`;
  }

  modalEl.innerHTML = `
    <div class="modal-header">
      <span class="modal-icon">${icons[type] || 'ℹ️'}</span>
      <h3 class="modal-title">${escapeHtml(title)}</h3>
      ${dismissible ? '<button class="modal-close" aria-label="Close">&times;</button>' : ''}
    </div>
    <div class="modal-body">
      ${bodyContent}
    </div>
    <div class="modal-footer">
      ${buttonsHtml}
    </div>
  `;

  // Clear previous content and append
  overlay.innerHTML = '';
  overlay.appendChild(modalEl);
  overlay.classList.add('modal-open');

  // Set dismissible
  overlay.dataset.dismissible = dismissible ? 'true' : 'false';

  // Button event listeners
  modalEl.querySelectorAll('.modal-btn').forEach(btn => {
    const idx = parseInt(btn.dataset.index);
    btn.addEventListener('click', function () {
      if (buttons[idx] && buttons[idx].action) {
        buttons[idx].action(modalEl, overlay);
      }
      // Only close if the button type isn't 'primary' with special handling
      // Actually, let the action decide — call closeModal from action if needed
    });
  });

  // Close button
  const closeBtn = modalEl.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Prevent body scroll
  document.body.style.overflow = 'hidden';

  // Callback after render
  if (typeof onOpen === 'function') {
    onOpen(modalEl, overlay);
  }
}

function closeModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.remove('modal-open');
  document.body.style.overflow = '';
  // Clear after animation
  setTimeout(() => {
    if (modalOverlay) {
      modalOverlay.innerHTML = '';
    }
  }, 300);
}

// ============================================================
// UTILITY
// ============================================================

function escapeHtml(str) {
  if (typeof str !== 'string') return String(str || '');
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ============================================================
// AUTO INIT
// ============================================================
document.addEventListener('DOMContentLoaded', function () {
  if (window.location.pathname.includes('calculator') || window.location.pathname.endsWith('/calculator.html')) {
    setTimeout(() => {
      showToast('Your data auto-saves in this browser. Refresh safely!', 'info', 5000);
    }, 1000);
  }

  if (window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html') || window.location.pathname === '' || window.location.pathname.endsWith('/index.html')) {
    setTimeout(() => {
      showToast('🎓 Welcome to GradePath! Pick a scale and start calculating.', 'success', 5000);
    }, 800);
  }
});
