function setAdminMessage(text, type = 'success') {
  const message = document.querySelector('[data-admin-message]');
  if (!message) return;

  message.textContent = text;
  message.className = `form-message form-message--${type}`;
}

function renderAdminError(message) {
  const container = document.querySelector('[data-users-admin]');
  if (container) {
    container.innerHTML = `<p class="empty-state">${escapeHtml(message)}</p>`;
  }
}

function roleLabel(role) {
  const labels = {
    admin: 'Administrateur',
    client: 'Client',
    salon: 'Salon'
  };

  return labels[role] || role;
}

function renderSummary(users) {
  const summary = document.querySelector('[data-admin-summary]');
  if (!summary) return;

  const activeCount = users.filter((user) => user.statut === 'actif').length;
  const restrictedCount = users.filter((user) => user.statut === 'restreint').length;
  summary.textContent = `${users.length} compte(s), ${activeCount} actif(s), ${restrictedCount} restreint(s).`;
}

function renderUsers(users) {
  const container = document.querySelector('[data-users-admin]');
  if (!container) return;

  renderSummary(users);

  container.innerHTML = users.length ? users.map((user) => `
    <form class="admin-user" data-user-form="${user.id}">
      <div class="admin-user__identity">
        <p class="eyebrow">#${user.id} - ${roleLabel(user.role)}</p>
        <h3>${escapeHtml(user.nom)}</h3>
        <p>${escapeHtml(user.email)}</p>
        <p>${user.adresse ? escapeHtml(user.adresse) : 'Adresse non renseignee'}</p>
        <p>${user.salon_nom ? `Salon : ${escapeHtml(user.salon_nom)}` : 'Aucun salon rattache'}</p>
        <span class="status">${escapeHtml(user.statut)}</span>
      </div>
      <div class="admin-user__fields">
        <div class="field">
          <label for="user-${user.id}-name">Nom</label>
          <input id="user-${user.id}-name" name="nom" value="${escapeHtml(user.nom)}" required>
        </div>
        <div class="field">
          <label for="user-${user.id}-email">Email</label>
          <input id="user-${user.id}-email" name="email" type="email" value="${escapeHtml(user.email)}" required>
        </div>
        <div class="field">
          <label for="user-${user.id}-address">Adresse</label>
          <input id="user-${user.id}-address" name="adresse" value="${escapeHtml(user.adresse || '')}">
        </div>
        <div class="field">
          <label for="user-${user.id}-role">Role</label>
          <select id="user-${user.id}-role" name="role" required>
            <option value="client" ${user.role === 'client' ? 'selected' : ''}>Client</option>
            <option value="salon" ${user.role === 'salon' ? 'selected' : ''}>Salon</option>
            <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
          </select>
        </div>
        <div class="field">
          <label for="user-${user.id}-status">Statut</label>
          <select id="user-${user.id}-status" name="statut" required>
            <option value="actif" ${user.statut === 'actif' ? 'selected' : ''}>Actif</option>
            <option value="restreint" ${user.statut === 'restreint' ? 'selected' : ''}>Restreint</option>
          </select>
        </div>
      </div>
      <div class="admin-user__actions">
        <button class="button button--gold" type="submit">Enregistrer</button>
        <button class="button button--danger" type="button" data-delete-user="${user.id}">Supprimer</button>
      </div>
    </form>
  `).join('') : '<p class="empty-state">Aucun compte utilisateur.</p>';

  bindUserForms();
  bindDeleteButtons();
}

async function loadUsers() {
  const container = document.querySelector('[data-users-admin]');
  if (container) {
    container.innerHTML = '<p class="empty-state">Chargement des comptes...</p>';
  }

  const users = await apiRequest('/admin/users');
  renderUsers(users);
}

function bindUserForms() {
  document.querySelectorAll('[data-user-form]').forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const submitButton = form.querySelector('button[type="submit"]');
      const formData = new FormData(form);

      submitButton.disabled = true;
      setAdminMessage('Mise a jour du compte...');

      try {
        await apiRequest(`/admin/users/${form.dataset.userForm}`, {
          method: 'PUT',
          body: JSON.stringify({
            nom: formData.get('nom'),
            email: formData.get('email'),
            adresse: formData.get('adresse'),
            role: formData.get('role'),
            statut: formData.get('statut')
          })
        });
        setAdminMessage('Compte mis a jour.');
        await loadUsers();
      } catch (error) {
        setAdminMessage(error.message, 'error');
      } finally {
        submitButton.disabled = false;
      }
    });
  });
}

function bindDeleteButtons() {
  document.querySelectorAll('[data-delete-user]').forEach((button) => {
    button.addEventListener('click', async () => {
      const confirmed = window.confirm('Supprimer ce compte et ses donnees liees ?');
      if (!confirmed) return;

      button.disabled = true;
      setAdminMessage('Suppression du compte...');

      try {
        await apiRequest(`/admin/users/${button.dataset.deleteUser}`, {
          method: 'DELETE'
        });
        setAdminMessage('Compte supprime.');
        await loadUsers();
      } catch (error) {
        button.disabled = false;
        setAdminMessage(error.message, 'error');
      }
    });
  });
}

function bindRefreshButton() {
  document.querySelector('[data-refresh-users]')?.addEventListener('click', async (event) => {
    const button = event.currentTarget;
    button.disabled = true;

    try {
      await loadUsers();
      setAdminMessage('Liste actualisee.');
    } catch (error) {
      setAdminMessage(error.message, 'error');
    } finally {
      button.disabled = false;
    }
  });
}

async function initAdminPage() {
  const user = getCurrentUser();

  if (!user) {
    renderAdminError('Connectez-vous avec un compte administrateur.');
    window.setTimeout(() => {
      window.location.href = 'auth.html';
    }, 900);
    return;
  }

  if (user.role !== 'admin') {
    renderAdminError('Cette page est reservee aux administrateurs.');
    return;
  }

  try {
    await loadUsers();
  } catch (error) {
    renderAdminError(error.message);
    setAdminMessage(error.message, 'error');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  bindRefreshButton();
  initAdminPage();
});
