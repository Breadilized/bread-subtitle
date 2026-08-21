/**
 * Bread Subtitle Studio Landing Page Interactions
 */

// One-click clipboard copy with toast feedback
function copyToClipboard(text, successMessage) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMessage || '已成功複製！');
    }).catch(err => {
      fallbackCopyTextToClipboard(text, successMessage);
    });
  } else {
    fallbackCopyTextToClipboard(text, successMessage);
  }
}

function fallbackCopyTextToClipboard(text, successMessage) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    if (successful) {
      showToast(successMessage || '已成功複製！');
    } else {
      showToast('複製失敗，請手動複製。');
    }
  } catch (err) {
    showToast('複製失敗，請手動複製。');
  }

  document.body.removeChild(textArea);
}

// Toast notification helper
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');

  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  
  // Show toast
  toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
  toast.classList.add('translate-y-0', 'opacity-100');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
  }, 2500);
}

// Initialize on DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Bread Subtitle Studio Landing Page Ready.');
});
