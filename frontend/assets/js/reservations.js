function renderReservations() {
  const container = document.querySelector('[data-reservations]');
  if (!container) return;

  container.innerHTML = MOCK_CLIENT_RESERVATIONS.map((reservation) => `
    <article class="list-row">
      <div>
        <p class="eyebrow">${formatDate(reservation.date_creneau)} a ${formatTime(reservation.heure_debut)}</p>
        <h3>${reservation.salon}</h3>
        <p>${reservation.prestation} - ${formatPrice(reservation.prix)}</p>
      </div>
      <button class="button button--ghost" type="button" data-cancel-id="${reservation.id}">Annuler</button>
    </article>
  `).join('');

  container.querySelectorAll('[data-cancel-id]').forEach((button) => {
    button.addEventListener('click', () => {
      button.textContent = 'Annulation demandee';
      button.disabled = true;
    });
  });
}

document.addEventListener('DOMContentLoaded', renderReservations);
