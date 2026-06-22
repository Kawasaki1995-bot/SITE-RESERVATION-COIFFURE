const DEFAULT_API_PORT = '3000';
const API_BASE_URL = resolveApiBaseUrl();
const TOKEN_KEY = 'cutandgo_token';
const USER_KEY = 'cutandgo_user';

function resolveApiBaseUrl() {
  const configuredUrl = window.CUTANDGO_API_BASE_URL
    || document.querySelector('meta[name="api-base-url"]')?.content;

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, '');
  }

  const { hostname, origin, port, protocol } = window.location;
  const isLocalHost = ['localhost', '127.0.0.1'].includes(hostname);

  if (protocol === 'file:') {
    return `http://localhost:${DEFAULT_API_PORT}/api`;
  }

  if (isLocalHost && port && port !== DEFAULT_API_PORT) {
    return `${protocol}//${hostname}:${DEFAULT_API_PORT}/api`;
  }

  return `${origin}/api`;
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
}

function getCurrentUser() {
  const rawUser = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch (error) {
    clearSession();
    return null;
  }
}

function saveSession(token, user) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
}

async function apiRequest(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };
  const token = getToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok || payload.success === false) {
    throw new Error(payload.message || 'Une erreur est survenue');
  }

  return payload.data ?? payload;
}

function hydrateNavigation() {
  const user = getCurrentUser();
  document.querySelectorAll('[data-user-name]').forEach((item) => {
    item.textContent = user ? user.nom : 'Invite';
  });
  document.querySelectorAll('[data-auth-link]').forEach((link) => {
    link.textContent = user ? 'Deconnexion' : 'Connexion';
    link.href = user ? '#' : 'auth.html';
    link.addEventListener('click', (event) => {
      if (!user) return;
      event.preventDefault();
      clearSession();
      window.location.href = 'index.html';
    });
  });
  document.querySelectorAll('[data-role]').forEach((element) => {
    element.hidden = !user || user.role !== element.dataset.role;
  });
  document.querySelectorAll('[data-authenticated]').forEach((element) => {
    element.hidden = !user;
  });
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function safeImageUrl(value, fallback) {
  if (!value) return fallback;

  try {
    const url = new URL(value, window.location.href);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : fallback;
  } catch (error) {
    return fallback;
  }
}

function formatPrice(value) {
  return `${Number(value).toFixed(0)} EUR`;
}

function formatTime(value) {
  return value ? value.slice(0, 5) : '';
}

function formatDate(value) {
  const rawValue = String(value || '').trim();
  const datePart = rawValue.match(/^\d{4}-\d{2}-\d{2}/)?.[0];

  if (!datePart) {
    return rawValue || 'Date indisponible';
  }

  const date = new Date(`${datePart}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return datePart;
  }

  return new Intl.DateTimeFormat('fr-BE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date);
}

document.addEventListener('DOMContentLoaded', hydrateNavigation);
