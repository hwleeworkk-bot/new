export function showToast(message, duration = 3000) {
    let toastContainer = document.getElementById("toastContainer");
    if (!toastContainer) {
      toastContainer = document.createElement("div");
      toastContainer.id = "toastContainer";
      document.body.appendChild(toastContainer);
    }
  
    // Create toast element
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = message;
  
    // Append and show toast
    toastContainer.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.opacity = "1";
    });
  
    // Hide and remove toast after duration
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => {
        toastContainer.removeChild(toast);
      }, 500);
    }, duration);
}

// 전역으로 등록
window.showToast = showToast;