const MOCK_SALONS = [
  {
    id: 1,
    nom: 'Salon Elegance',
    ville: 'Bruxelles',
    adresse: '18 Rue Royale, 1000 Bruxelles',
    description: 'Salon moderne specialise dans les coupes classiques et les brushings soignes.',
    telephone: '+32 2 100 20 30',
    image_url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
    note: 4.8,
    prix_min: 25,
    prestations: [
      { id: 1, nom: 'Coupe homme', prix: 25 },
      { id: 2, nom: 'Coupe femme', prix: 45 },
      { id: 3, nom: 'Brushing', prix: 35 }
    ],
    creneaux: [
      { id: 1, date_creneau: '2026-06-24', heure_debut: '09:00:00', disponible: true },
      { id: 3, date_creneau: '2026-06-24', heure_debut: '10:00:00', disponible: true },
      { id: 5, date_creneau: '2026-06-25', heure_debut: '14:00:00', disponible: true }
    ]
  },
  {
    id: 2,
    nom: 'Studio Barber',
    ville: 'Bruxelles',
    adresse: '42 Avenue Louise, 1050 Bruxelles',
    description: 'Barbier urbain pour coupe homme, barbe et entretien rapide.',
    telephone: '+32 2 200 30 40',
    image_url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1200&q=80',
    note: 4.6,
    prix_min: 18,
    prestations: [
      { id: 4, nom: 'Coupe homme', prix: 22 },
      { id: 5, nom: 'Barbe', prix: 18 },
      { id: 6, nom: 'Coupe et barbe', prix: 38 }
    ],
    creneaux: [
      { id: 7, date_creneau: '2026-06-24', heure_debut: '10:00:00', disponible: true },
      { id: 8, date_creneau: '2026-06-24', heure_debut: '10:30:00', disponible: true },
      { id: 10, date_creneau: '2026-06-26', heure_debut: '15:00:00', disponible: true }
    ]
  },
  {
    id: 3,
    nom: 'Maison Boucles',
    ville: 'Namur',
    adresse: '7 Rue de Fer, 5000 Namur',
    description: 'Salon chaleureux pour coupes femme, soins et coiffures naturelles.',
    telephone: '+32 81 300 40 50',
    image_url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    note: 4.7,
    prix_min: 30,
    prestations: [
      { id: 7, nom: 'Coupe femme', prix: 42 },
      { id: 8, nom: 'Soin cheveux', prix: 30 },
      { id: 9, nom: 'Coiffage naturel', prix: 36 }
    ],
    creneaux: [
      { id: 12, date_creneau: '2026-06-25', heure_debut: '09:30:00', disponible: true },
      { id: 13, date_creneau: '2026-06-25', heure_debut: '10:00:00', disponible: true },
      { id: 14, date_creneau: '2026-06-27', heure_debut: '13:30:00', disponible: true }
    ]
  }
];

const MOCK_CLIENT_RESERVATIONS = [
  {
    id: 1,
    salon: 'Salon Elegance',
    prestation: 'Coupe homme',
    prix: 25,
    date_creneau: '2026-06-24',
    heure_debut: '09:30:00',
    statut: 'confirmee'
  },
  {
    id: 2,
    salon: 'Maison Boucles',
    prestation: 'Soin cheveux',
    prix: 30,
    date_creneau: '2026-06-27',
    heure_debut: '13:30:00',
    statut: 'confirmee'
  }
];

const MOCK_SALON_RESERVATIONS = [
  {
    id: 1,
    client: 'Alice Martin',
    prestation: 'Coupe homme',
    prix: 25,
    date_creneau: '2026-06-24',
    heure_debut: '09:30:00',
    statut: 'confirmee'
  },
  {
    id: 2,
    client: 'Nadia Benali',
    prestation: 'Brushing',
    prix: 35,
    date_creneau: '2026-06-25',
    heure_debut: '14:00:00',
    statut: 'confirmee'
  }
];
