function renderDashboard() {
  const stats = {
    jour: MOCK_SALON_RESERVATIONS.reduce((sum, item) => sum + item.prix, 0),
    semaine: 130,
    mois: 420
  };

  document.querySelector('[data-stat-day]').textContent = formatPrice(stats.jour);
  document.querySelector('[data-stat-week]').textContent = formatPrice(stats.semaine);
  document.querySelector('[data-stat-month]').textContent = formatPrice(stats.mois);

  document.querySelector('[data-salon-reservations]').innerHTML = MOCK_SALON_RESERVATIONS.map((reservation) => `
    <article class="list-row">
      <div>
        <p class="eyebrow">${formatDate(reservation.date_creneau)} a ${formatTime(reservation.heure_debut)}</p>
        <h3>${reservation.client}</h3>
        <p>${reservation.prestation} - ${formatPrice(reservation.prix)}</p>
      </div>
      <span class="status">${reservation.statut}</span>
    </article>
  `).join('');
}

document.addEventListener('DOMContentLoaded', renderDashboard);
