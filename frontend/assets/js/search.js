function createSalonCard(salon) {
  return `
    <article class="salon-card">
      <img src="${salon.image_url}" alt="${salon.nom}">
      <div class="salon-card__body">
        <div>
          <p class="eyebrow">${salon.ville}</p>
          <h3>${salon.nom}</h3>
          <p>${salon.adresse}</p>
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

function filterSalons(formData) {
  const ville = formData.get('ville').trim().toLowerCase();
  const prestation = formData.get('prestation').trim().toLowerCase();
  const noteMin = Number(formData.get('noteMin') || 0);
  const prixMax = Number(formData.get('prixMax') || 999);

  return MOCK_SALONS.filter((salon) => {
    const matchesVille = !ville || salon.ville.toLowerCase().includes(ville);
    const matchesNote = salon.note >= noteMin;
    const matchesPrix = salon.prix_min <= prixMax;
    const matchesPrestation = !prestation || salon.prestations.some((item) => (
      item.nom.toLowerCase().includes(prestation)
    ));

    return matchesVille && matchesNote && matchesPrix && matchesPrestation;
  });
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

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[data-search-form]');
  renderSalons(MOCK_SALONS);

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    renderSalons(filterSalons(new FormData(form)));
  });
});
