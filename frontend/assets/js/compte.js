function setAccountMessage(text, type = 'success') {
  const message = document.querySelector('[data-account-message]');
  if (!message) return;

  message.textContent = text;
  message.className = `form-message form-message--${type}`;
}

function roleLabel(role) {
  const labels = {
    admin: 'Administrateur',
    client: 'Client',
    salon: 'Salon'
  };

  return labels[role] || role;
}

function renderAccount(user) {
  const form = document.querySelector('[data-account-form]');
  if (!form || !user) return;

  form.elements.nom.value = user.nom || '';
  form.elements.email.value = user.email || '';
  form.elements.adresse.value = user.adresse || '';
  document.querySelector('[data-account-role]').textContent = roleLabel(user.role);
  document.querySelector('[data-account-status]').textContent = user.statut || '-';
}

function renderAccountError(message) {
  const form = document.querySelector('[data-account-form]');
  if (!form) return;

  form.innerHTML = `<p class="empty-state">${escapeHtml(message)}</p>`;
}

async function loadAccount() {
  const user = getCurrentUser();

  if (!user) {
    renderAccountError('Connectez-vous pour acceder a vos parametres.');
    window.setTimeout(() => {
      window.location.href = 'auth.html';
    }, 900);
    return;
  }

  try {
    const freshUser = await apiRequest('/auth/me');
    saveSession(getToken(), freshUser);
    renderAccount(freshUser);
    hydrateNavigation();
  } catch (error) {
    renderAccountError(error.message);
  }
}

function bindAccountForm() {
  const form = document.querySelector('[data-account-form]');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);

    submitButton.disabled = true;
    setAccountMessage('Mise a jour du compte...');

    try {
      const { token, user } = await apiRequest('/auth/me', {
        method: 'PUT',
        body: JSON.stringify({
          nom: formData.get('nom'),
          email: formData.get('email'),
          adresse: formData.get('adresse')
        })
      });
      saveSession(token, user);
      renderAccount(user);
      hydrateNavigation();
      setAccountMessage('Compte mis a jour.');
    } catch (error) {
      setAccountMessage(error.message, 'error');
    } finally {
      submitButton.disabled = false;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  bindAccountForm();
  loadAccount();
});
