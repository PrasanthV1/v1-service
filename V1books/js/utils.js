/**
 * V1 Services - Utility Functions
 * Password hashing, session management, tracking ID generation
 */

/**
 * Generate SHA-256 hash of password
 */
async function hashPassword(password) {
  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Generate unique tracking ID (V1-XXXXXX)
 */
function generateTrackingId() {
  const randomNum = Math.floor(Math.random() * 1000000);
  return `V1-${String(randomNum).padStart(6, '0')}`;
}

/**
 * Format date to readable format
 */
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Session management
 */
const Session = {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  get(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },

  getCurrentUser() {
    return this.get('current_user');
  },

  setCurrentUser(user) {
    this.set('current_user', user);
  },

  logout() {
    this.remove('current_user');
    this.remove('github_token');
    window.location.href = 'index.html';
  }
};

/**
 * Check if user is authenticated
 */
function isAuthenticated() {
  return Session.getCurrentUser() !== null;
}

/**
 * Redirect to login if not authenticated
 */
function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = 'login.html';
  }
}

/**
 * Redirect to appropriate dashboard based on role
 */
function redirectToDashboard(role) {
  switch(role) {
    case 'admin':
      window.location.href = 'pages/admin-dashboard.html';
      break;
    case 'auditor':
      window.location.href = 'pages/auditor-dashboard.html';
      break;
    case 'client':
      window.location.href = 'pages/client-dashboard.html';
      break;
    default:
      window.location.href = 'index.html';
  }
}

/**
 * Show notification/toast message
 */
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('show');
  }, 100);

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

/**
 * Show loading spinner
 */
function showLoading(show = true) {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.display = show ? 'flex' : 'none';
  }
}
