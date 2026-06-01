function renderReservations(reservations) {
  const container = document.querySelector('[data-reservations]');
  if (!container) return;

  container.innerHTML = reservations.length ? reservations.map((reservation) => `
    <article class="list-row">
      <div>
        <p class="eyebrow">${formatDate(reservation.date_creneau)} a ${formatTime(reservation.heure_debut)}</p>
        <h3>${escapeHtml(reservation.salon)}</h3>
        <p>${escapeHtml(reservation.prestation)} - ${formatPrice(reservation.prix)}</p>
      </div>
      <button class="button button--ghost" type="button" data-cancel-id="${reservation.id}" ${reservation.statut === 'annulee' ? 'disabled' : ''}>
        ${reservation.statut === 'annulee' ? 'Annulee' : 'Annuler'}
      </button>
    </article>
  `).join('') : '<p class="empty-state">Aucune reservation pour le moment.</p>';

  container.querySelectorAll('[data-cancel-id]').forEach((button) => {
    button.addEventListener('click', async () => {
      const originalText = button.textContent;
      button.disabled = true;
      button.textContent = 'Annulation...';

      try {
        await apiRequest(`/reservations/${button.dataset.cancelId}/cancel`, {
          method: 'PATCH'
        });
        await loadReservations();
      } catch (error) {
        button.disabled = false;
        button.textContent = originalText;
        renderMessage(error.message, 'error');
      }
    });
  });
}

function renderMessage(text, type = 'success') {
  const container = document.querySelector('[data-reservations]');
  if (!container) return;

  const message = document.createElement('p');
  message.className = `form-message form-message--${type}`;
  message.textContent = text;
  container.prepend(message);
}

async function loadReservations() {
  const container = document.querySelector('[data-reservations]');
  const user = getCurrentUser();

  if (!container) return;

  if (!user) {
    container.innerHTML = '<p class="empty-state">Connectez-vous pour consulter vos reservations.</p>';
    window.setTimeout(() => {
      window.location.href = 'auth.html';
    }, 900);
    return;
  }

  if (user.role !== 'client') {
    container.innerHTML = '<p class="empty-state">Cette page est reservee aux comptes clients.</p>';
    return;
  }

  container.innerHTML = '<p class="empty-state">Chargement des reservations...</p>';

  try {
    const reservations = await apiRequest('/reservations/me');
    renderReservations(reservations);
  } catch (error) {
    container.innerHTML = `<p class="empty-state">${escapeHtml(error.message)}</p>`;
  }
}

document.addEventListener('DOMContentLoaded', loadReservations);
