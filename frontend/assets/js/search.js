function createSalonCard(salon) {
  const imageUrl = safeImageUrl(salon.image_url, 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80');

  return `
    <article class="salon-card">
      <img src="${imageUrl}" alt="${escapeHtml(salon.nom)}">
      <div class="salon-card__body">
        <div>
          <p class="eyebrow">${escapeHtml(salon.ville)}</p>
          <h3>${escapeHtml(salon.nom)}</h3>
          <p>${escapeHtml(salon.adresse)}</p>
        </div>
        <div class="salon-card__meta">
          <span>Note ${salon.note}/5</span>
          <span>des ${formatPrice(salon.prix_min)}</span>
        </div>
        <a class="button button--dark" href="salon.html?id=${salon.id}">Voir les creneaux</a>
      </div>
    </article>
  `;
}

function buildSearchQuery(formData) {
  const params = new URLSearchParams();
  const ville = formData.get('ville').trim();
  const prestation = formData.get('prestation').trim();
  const noteMin = formData.get('noteMin');
  const prixMax = formData.get('prixMax');

  if (ville) params.set('ville', ville);
  if (prestation) params.set('prestation', prestation);
  if (noteMin && noteMin !== '0') params.set('noteMin', noteMin);
  if (prixMax && prixMax !== '999') params.set('prixMax', prixMax);

  return params.toString();
}

function renderSalons(salons) {
  const container = document.querySelector('[data-salon-results]');
  const count = document.querySelector('[data-result-count]');

  if (!container) return;

  count.textContent = `${salons.length} salon${salons.length > 1 ? 's' : ''} trouve${salons.length > 1 ? 's' : ''}`;
  container.innerHTML = salons.length
    ? salons.map(createSalonCard).join('')
    : '<p class="empty-state">Aucun salon ne correspond a cette recherche.</p>';
}

function renderSearchError(message) {
  const container = document.querySelector('[data-salon-results]');
  const count = document.querySelector('[data-result-count]');

  if (count) count.textContent = 'Recherche indisponible';
  if (container) {
    container.innerHTML = `<p class="empty-state">${escapeHtml(message)}</p>`;
  }
}

async function loadSalons(formData = new FormData()) {
  const container = document.querySelector('[data-salon-results]');
  const count = document.querySelector('[data-result-count]');
  const query = buildSearchQuery(formData);

  if (count) count.textContent = 'Recherche en cours...';
  if (container) {
    container.innerHTML = '<p class="empty-state">Chargement des salons...</p>';
  }

  try {
    const salons = await apiRequest(`/salons${query ? `?${query}` : ''}`);
    renderSalons(salons);
  } catch (error) {
    renderSearchError(error.message);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[data-search-form]');
  loadSalons();

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    loadSalons(new FormData(form));
  });
});
