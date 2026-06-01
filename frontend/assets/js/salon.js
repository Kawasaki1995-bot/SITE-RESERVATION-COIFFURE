function getSalonFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const salonId = Number(params.get('id') || 1);
  return MOCK_SALONS.find((salon) => salon.id === salonId) || MOCK_SALONS[0];
}

function renderSalonPage(salon) {
  document.querySelector('[data-salon-title]').textContent = salon.nom;
  document.querySelector('[data-salon-city]').textContent = salon.ville;
  document.querySelector('[data-salon-address]').textContent = salon.adresse;
  document.querySelector('[data-salon-description]').textContent = salon.description;
  document.querySelector('[data-salon-phone]').textContent = salon.telephone;
  document.querySelector('[data-salon-note]').textContent = `${salon.note}/5`;
  document.querySelector('[data-salon-image]').src = salon.image_url;
  document.querySelector('[data-salon-image]').alt = salon.nom;

  document.querySelector('[data-prestations]').innerHTML = salon.prestations.map((item) => `
    <label class="choice-row">
      <input type="radio" name="prestation_id" value="${item.id}" required>
      <span>${item.nom}</span>
      <strong>${formatPrice(item.prix)}</strong>
    </label>
  `).join('');

  document.querySelector('[data-creneaux]').innerHTML = salon.creneaux.map((item) => `
    <label class="slot">
      <input type="radio" name="creneau_id" value="${item.id}" required>
      <span>${formatDate(item.date_creneau)}</span>
      <strong>${formatTime(item.heure_debut)}</strong>
    </label>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const salon = getSalonFromUrl();
  const form = document.querySelector('[data-booking-form]');
  const message = document.querySelector('[data-booking-message]');

  renderSalonPage(salon);

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);

    if (!data.get('prestation_id') || !data.get('creneau_id')) {
      message.textContent = 'Choisis une prestation et un creneau.';
      message.className = 'form-message form-message--error';
      return;
    }

    message.textContent = 'Reservation prete a etre envoyee au backend.';
    message.className = 'form-message form-message--success';
  });
});
