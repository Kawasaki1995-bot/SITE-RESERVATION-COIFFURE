const DAYS = [
  { value: 1, label: 'Lundi' },
  { value: 2, label: 'Mardi' },
  { value: 3, label: 'Mercredi' },
  { value: 4, label: 'Jeudi' },
  { value: 5, label: 'Vendredi' },
  { value: 6, label: 'Samedi' },
  { value: 7, label: 'Dimanche' }
];

let currentSalon = null;

function setPanelMessage(selector, text, type = 'success') {
  const message = document.querySelector(selector);
  if (!message) return;

  message.textContent = text;
  message.className = `form-message form-message--${type}`;
}

function renderStats(stats) {
  document.querySelector('[data-stat-day]').textContent = formatPrice(stats.jour);
  document.querySelector('[data-stat-week]').textContent = formatPrice(stats.semaine);
  document.querySelector('[data-stat-month]').textContent = formatPrice(stats.mois);
}

function renderSalonForm(salon) {
  const form = document.querySelector('[data-salon-form]');
  if (!form || !salon) return;

  form.elements.nom.value = salon.nom || '';
  form.elements.ville.value = salon.ville || '';
  form.elements.adresse.value = salon.adresse || '';
  form.elements.description.value = salon.description || '';
  form.elements.telephone.value = salon.telephone || '';
  form.elements.image_url.value = salon.image_url || '';
}

function renderSalonReservations(reservations) {
  const container = document.querySelector('[data-salon-reservations]');
  if (!container) return;

  container.innerHTML = reservations.length ? reservations.map((reservation) => `
    <article class="list-row">
      <div>
        <p class="eyebrow">${formatDate(reservation.date_creneau)} a ${formatTime(reservation.heure_debut)}</p>
        <h3>${escapeHtml(reservation.client)}</h3>
        <p>${escapeHtml(reservation.prestation)} - ${formatPrice(reservation.prix)}</p>
      </div>
      <span class="status">${escapeHtml(reservation.statut)}</span>
    </article>
  `).join('') : '<p class="empty-state">Aucune reservation pour le moment.</p>';
}

function renderPrestationsAdmin(prestations) {
  const container = document.querySelector('[data-prestations-admin]');
  if (!container) return;

  const activePrestations = prestations.filter((prestation) => Boolean(prestation.active));

  container.innerHTML = activePrestations.length ? activePrestations.map((prestation) => `
    <article class="list-row">
      <div>
        <h3>${escapeHtml(prestation.nom)}</h3>
        <p>${formatPrice(prestation.prix)}</p>
      </div>
      <button class="button button--ghost" type="button" data-delete-prestation="${prestation.id}">Desactiver</button>
    </article>
  `).join('') : '<p class="empty-state">Aucune prestation active.</p>';

  container.querySelectorAll('[data-delete-prestation]').forEach((button) => {
    button.addEventListener('click', async () => {
      button.disabled = true;

      try {
        await apiRequest(`/prestations/${button.dataset.deletePrestation}`, {
          method: 'DELETE'
        });
        setPanelMessage('[data-prestation-message]', 'Prestation desactivee.');
        await loadPrestationsAdmin();
      } catch (error) {
        button.disabled = false;
        setPanelMessage('[data-prestation-message]', error.message, 'error');
      }
    });
  });
}

function renderCreneauxAdmin(creneaux) {
  const container = document.querySelector('[data-creneaux-admin]');
  if (!container) return;

  container.innerHTML = creneaux.length ? creneaux.map((creneau) => `
    <article class="list-row">
      <div>
        <p class="eyebrow">${formatDate(creneau.date_creneau)}</p>
        <h3>${formatTime(creneau.heure_debut)}</h3>
        <p>${creneau.disponible ? 'Disponible' : 'Bloque'}</p>
      </div>
      <button class="button button--ghost" type="button" data-toggle-creneau="${creneau.id}" data-next-state="${creneau.disponible ? 'false' : 'true'}">
        ${creneau.disponible ? 'Bloquer' : 'Rouvrir'}
      </button>
    </article>
  `).join('') : '<p class="empty-state">Aucun creneau cree.</p>';

  container.querySelectorAll('[data-toggle-creneau]').forEach((button) => {
    button.addEventListener('click', async () => {
      button.disabled = true;

      try {
        await apiRequest(`/creneaux/${button.dataset.toggleCreneau}`, {
          method: 'PUT',
          body: JSON.stringify({
            disponible: button.dataset.nextState === 'true'
          })
        });
        setPanelMessage('[data-creneau-message]', 'Creneau mis a jour.');
        await loadCreneauxAdmin();
      } catch (error) {
        button.disabled = false;
        setPanelMessage('[data-creneau-message]', error.message, 'error');
      }
    });
  });
}

function renderHorairesAdmin(horaires) {
  const container = document.querySelector('[data-horaires-admin]');
  if (!container) return;

  const horairesByDay = new Map(horaires.map((horaire) => [Number(horaire.jour_semaine), horaire]));

  container.innerHTML = DAYS.map((day) => {
    const horaire = horairesByDay.get(day.value);
    const ferme = horaire ? Boolean(horaire.ferme) : day.value === 7;

    return `
      <div class="schedule-row" data-day="${day.value}">
        <label class="schedule-row__closed">
          <input type="checkbox" data-closed ${ferme ? 'checked' : ''}>
          <span>${day.label}</span>
        </label>
        <input type="time" data-open value="${horaire && horaire.heure_ouverture ? formatTime(horaire.heure_ouverture) : '09:00'}" ${ferme ? 'disabled' : ''}>
        <input type="time" data-close value="${horaire && horaire.heure_fermeture ? formatTime(horaire.heure_fermeture) : '18:00'}" ${ferme ? 'disabled' : ''}>
      </div>
    `;
  }).join('');

  container.querySelectorAll('[data-closed]').forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const row = checkbox.closest('[data-day]');
      row.querySelector('[data-open]').disabled = checkbox.checked;
      row.querySelector('[data-close]').disabled = checkbox.checked;
    });
  });
}

function renderDashboardError(message) {
  const container = document.querySelector('[data-salon-reservations]');
  if (container) {
    container.innerHTML = `<p class="empty-state">${escapeHtml(message)}</p>`;
  }
}

async function loadPrestationsAdmin() {
  const container = document.querySelector('[data-prestations-admin]');
  if (container) {
    container.innerHTML = '<p class="empty-state">Chargement des prestations...</p>';
  }

  const prestations = await apiRequest('/prestations/me');
  renderPrestationsAdmin(prestations);
}

async function loadCreneauxAdmin() {
  const container = document.querySelector('[data-creneaux-admin]');
  if (container) {
    container.innerHTML = '<p class="empty-state">Chargement des creneaux...</p>';
  }

  const creneaux = await apiRequest('/creneaux/me');
  renderCreneauxAdmin(creneaux);
}

async function loadHorairesAdmin() {
  const container = document.querySelector('[data-horaires-admin]');
  if (container) {
    container.innerHTML = '<p class="empty-state">Chargement des horaires...</p>';
  }

  const horaires = currentSalon ? await apiRequest(`/salons/${currentSalon.id}/horaires`) : [];
  renderHorairesAdmin(horaires);
}

async function loadDashboard() {
  const user = getCurrentUser();
  const container = document.querySelector('[data-salon-reservations]');

  if (!user) {
    renderDashboardError('Connectez-vous avec un compte salon pour acceder au dashboard.');
    window.setTimeout(() => {
      window.location.href = 'auth.html';
    }, 900);
    return;
  }

  if (user.role !== 'salon') {
    renderDashboardError('Cette page est reservee aux comptes salon.');
    return;
  }

  if (container) {
    container.innerHTML = '<p class="empty-state">Chargement des reservations...</p>';
  }

  try {
    currentSalon = await apiRequest('/salons/me');
    renderSalonForm(currentSalon);

    const [stats, reservations] = await Promise.all([
      apiRequest('/reservations/salon/stats'),
      apiRequest('/reservations/salon')
    ]);

    renderStats(stats);
    renderSalonReservations(reservations);
    await Promise.all([
      loadPrestationsAdmin(),
      loadCreneauxAdmin(),
      loadHorairesAdmin()
    ]);
  } catch (error) {
    renderDashboardError(error.message);
    setPanelMessage('[data-salon-message]', error.message, 'error');
  }
}

function bindSalonForm() {
  const form = document.querySelector('[data-salon-form]');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);

    submitButton.disabled = true;
    setPanelMessage('[data-salon-message]', 'Mise a jour en cours...');

    try {
      await apiRequest('/salons/me', {
        method: 'PUT',
        body: JSON.stringify({
          nom: formData.get('nom'),
          ville: formData.get('ville'),
          adresse: formData.get('adresse'),
          description: formData.get('description'),
          telephone: formData.get('telephone'),
          image_url: formData.get('image_url')
        })
      });
      currentSalon = await apiRequest('/salons/me');
      renderSalonForm(currentSalon);
      setPanelMessage('[data-salon-message]', 'Salon mis a jour.');
    } catch (error) {
      setPanelMessage('[data-salon-message]', error.message, 'error');
    } finally {
      submitButton.disabled = false;
    }
  });
}

function bindPrestationForm() {
  const form = document.querySelector('[data-prestation-form]');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);

    submitButton.disabled = true;
    setPanelMessage('[data-prestation-message]', 'Creation en cours...');

    try {
      await apiRequest('/prestations', {
        method: 'POST',
        body: JSON.stringify({
          nom: formData.get('nom'),
          prix: Number(formData.get('prix'))
        })
      });
      form.reset();
      setPanelMessage('[data-prestation-message]', 'Prestation ajoutee.');
      await loadPrestationsAdmin();
    } catch (error) {
      setPanelMessage('[data-prestation-message]', error.message, 'error');
    } finally {
      submitButton.disabled = false;
    }
  });
}

function bindCreneauForm() {
  const form = document.querySelector('[data-creneau-form]');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);

    submitButton.disabled = true;
    setPanelMessage('[data-creneau-message]', 'Creation en cours...');

    try {
      await apiRequest('/creneaux', {
        method: 'POST',
        body: JSON.stringify({
          date_creneau: formData.get('date_creneau'),
          heure_debut: formData.get('heure_debut')
        })
      });
      form.reset();
      setPanelMessage('[data-creneau-message]', 'Creneau ajoute.');
      await loadCreneauxAdmin();
    } catch (error) {
      setPanelMessage('[data-creneau-message]', error.message, 'error');
    } finally {
      submitButton.disabled = false;
    }
  });
}

function bindHorairesForm() {
  const form = document.querySelector('[data-horaires-form]');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitButton = form.querySelector('button[type="submit"]');
    const rows = Array.from(form.querySelectorAll('[data-day]'));
    const horaires = rows.map((row) => {
      const ferme = row.querySelector('[data-closed]').checked;

      return {
        jour_semaine: Number(row.dataset.day),
        ferme,
        heure_ouverture: ferme ? null : row.querySelector('[data-open]').value,
        heure_fermeture: ferme ? null : row.querySelector('[data-close]').value
      };
    });

    submitButton.disabled = true;
    setPanelMessage('[data-horaires-message]', 'Enregistrement en cours...');

    try {
      await apiRequest('/horaires/me', {
        method: 'PUT',
        body: JSON.stringify({ horaires })
      });
      setPanelMessage('[data-horaires-message]', 'Horaires mis a jour.');
      await loadHorairesAdmin();
    } catch (error) {
      setPanelMessage('[data-horaires-message]', error.message, 'error');
    } finally {
      submitButton.disabled = false;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  bindSalonForm();
  bindPrestationForm();
  bindCreneauForm();
  bindHorairesForm();
  loadDashboard();
});
