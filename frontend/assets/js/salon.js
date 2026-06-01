function getSalonIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get('id') || 1);
}

function renderSalonDetails(salon) {
  document.querySelector('[data-salon-title]').textContent = salon.nom;
  document.querySelector('[data-salon-city]').textContent = salon.ville;
  document.querySelector('[data-salon-address]').textContent = salon.adresse;
  document.querySelector('[data-salon-description]').textContent = salon.description || 'Description a venir.';
  document.querySelector('[data-salon-phone]').textContent = salon.telephone || 'Non renseigne';
  document.querySelector('[data-salon-note]').textContent = `${salon.note}/5`;
  document.querySelector('[data-salon-image]').src = safeImageUrl(salon.image_url, 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80');
  document.querySelector('[data-salon-image]').alt = salon.nom;
}

function renderPrestations(prestations) {
  const container = document.querySelector('[data-prestations]');

  container.innerHTML = prestations.length ? prestations.map((item) => `
    <label class="choice-row">
      <input type="radio" name="prestation_id" value="${item.id}" required>
      <span>${escapeHtml(item.nom)}</span>
      <strong>${formatPrice(item.prix)}</strong>
    </label>
  `).join('') : '<p class="empty-state">Aucune prestation disponible.</p>';
}

function renderCreneaux(creneaux) {
  const container = document.querySelector('[data-creneaux]');

  container.innerHTML = creneaux.length ? creneaux.map((item) => `
    <label class="slot">
      <input type="radio" name="creneau_id" value="${item.id}" required>
      <span>${formatDate(item.date_creneau)}</span>
      <strong>${formatTime(item.heure_debut)}</strong>
    </label>
  `).join('') : '<p class="empty-state">Aucun creneau disponible.</p>';
}

function renderLoading() {
  document.querySelector('[data-salon-title]').textContent = 'Chargement...';
  document.querySelector('[data-salon-city]').textContent = '';
  document.querySelector('[data-salon-address]').textContent = '';
  document.querySelector('[data-salon-description]').textContent = 'Recuperation des informations du salon.';
  document.querySelector('[data-salon-phone]').textContent = '';
  document.querySelector('[data-salon-note]').textContent = '';
  document.querySelector('[data-prestations]').innerHTML = '<p class="empty-state">Chargement des prestations...</p>';
  document.querySelector('[data-creneaux]').innerHTML = '<p class="empty-state">Chargement des creneaux...</p>';
}

function renderError(message) {
  document.querySelector('[data-salon-title]').textContent = 'Salon indisponible';
  document.querySelector('[data-salon-description]').textContent = message;
  document.querySelector('[data-prestations]').innerHTML = '<p class="empty-state">Impossible de charger les prestations.</p>';
  document.querySelector('[data-creneaux]').innerHTML = '<p class="empty-state">Impossible de charger les creneaux.</p>';
}

async function loadSalonPage(salonId) {
  renderLoading();

  try {
    const [salon, prestations, creneaux] = await Promise.all([
      apiRequest(`/salons/${salonId}`),
      apiRequest(`/salons/${salonId}/prestations`),
      apiRequest(`/salons/${salonId}/creneaux`)
    ]);

    renderSalonDetails(salon);
    renderPrestations(prestations);
    renderCreneaux(creneaux);
  } catch (error) {
    renderError(error.message);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const salonId = getSalonIdFromUrl();
  const form = document.querySelector('[data-booking-form]');
  const message = document.querySelector('[data-booking-message]');
  const submitButton = form?.querySelector('button[type="submit"]');

  loadSalonPage(salonId);

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const user = getCurrentUser();
    const data = new FormData(form);

    if (!user) {
      message.textContent = 'Connectez-vous pour reserver un creneau.';
      message.className = 'form-message form-message--error';
      window.setTimeout(() => {
        window.location.href = 'auth.html';
      }, 900);
      return;
    }

    if (user.role !== 'client') {
      message.textContent = 'Seul un compte client peut reserver un creneau.';
      message.className = 'form-message form-message--error';
      return;
    }

    if (!data.get('prestation_id') || !data.get('creneau_id')) {
      message.textContent = 'Choisis une prestation et un creneau.';
      message.className = 'form-message form-message--error';
      return;
    }

    submitButton.disabled = true;
    message.textContent = 'Reservation en cours...';
    message.className = 'form-message';

    apiRequest('/reservations', {
      method: 'POST',
      body: JSON.stringify({
        salon_id: salonId,
        prestation_id: Number(data.get('prestation_id')),
        creneau_id: Number(data.get('creneau_id'))
      })
    })
      .then(() => {
        message.textContent = 'Reservation confirmee.';
        message.className = 'form-message form-message--success';
        form.reset();
        return apiRequest(`/salons/${salonId}/creneaux`);
      })
      .then((creneaux) => {
        renderCreneaux(creneaux);
      })
      .catch((error) => {
        message.textContent = error.message;
        message.className = 'form-message form-message--error';
      })
      .finally(() => {
        submitButton.disabled = false;
      });
  });
});
