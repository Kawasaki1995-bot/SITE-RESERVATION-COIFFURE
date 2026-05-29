# Brief projet : Cut&Go

## 1. Vision du projet

Cut&Go est une plateforme web de reservation de rendez-vous pour salons de coiffure. Le projet s'inspire de services comme Planity, mais avec un perimetre volontairement simplifie pour rester realiste dans le cadre d'un projet DWWM.

L'objectif est de permettre aux clients de trouver rapidement un salon, consulter les prestations disponibles et reserver un creneau. Cote salon, l'application permet de gerer les informations du salon, les prestations, les creneaux et les reservations.

## 2. Public cible

### Clients

Personnes qui souhaitent rechercher un salon de coiffure par ville, comparer les prestations et reserver un rendez-vous simplement.

### Salons de coiffure

Salons ou coiffeurs independants qui veulent presenter leur activite en ligne et gerer leurs rendez-vous depuis un espace professionnel.

## 3. Objectifs du MVP

### Cote client

- Creer un compte client.
- Se connecter.
- Rechercher un salon par ville.
- Filtrer les salons par note, prix et prestation.
- Consulter la fiche d'un salon.
- Voir les prestations avec leurs prix.
- Reserver un creneau disponible.
- Consulter ses rendez-vous.
- Annuler un rendez-vous plus de 24 heures avant.

### Cote salon

- Creer un compte professionnel.
- Se connecter.
- Completer les informations du salon.
- Gerer les prestations.
- Gerer les horaires d'ouverture.
- Gerer les creneaux disponibles ou indisponibles.
- Consulter les reservations.
- Voir les reservations du jour.
- Suivre un chiffre d'affaires simple.

## 4. Hors MVP et bonus

Ces fonctionnalites sont identifiees comme bonus et ne doivent pas bloquer la livraison du MVP :

- Paiement en ligne.
- Notifications email ou SMS.
- Upload reel de photos.
- Geolocalisation avancee.
- Interface administrateur complete.
- Avis clients avances.
- Gestion de plusieurs employes dans un salon.

## 5. Regles metier principales

- Un utilisateur possede un role : client, salon ou admin.
- Un compte salon represente un salon complet, pas un employe individuel.
- Un client reserve uniquement un creneau disponible.
- Une reservation rend le creneau indisponible.
- Une reservation est refusee si le creneau est deja pris.
- Une annulation client est possible uniquement plus de 24 heures avant le rendez-vous.
- Les prestations affichent un nom et un prix.
- La duree des prestations n'est pas affichee dans le MVP.
- Les creneaux sont decoupes par tranche de 30 minutes.
- Les horaires d'ouverture sont configurables jour par jour.
- Les notes des salons sont fictives dans le MVP.
- Le chiffre d'affaires est calcule a partir des reservations non annulees.

## 6. Stack technique

Le projet doit rester aligne avec les competences DWWM :

- HTML5
- CSS3
- JavaScript Vanilla
- Node.js
- Express.js
- MySQL
- mysql2
- bcrypt
- JWT
- dotenv
- Git et GitHub

Frameworks et outils non prioritaires pour le MVP :

- React
- Vue
- Angular
- Tailwind CSS
- Bootstrap
- MongoDB
- Prisma
- TypeScript

## 7. Pages principales

- `index.html` : accueil, recherche par ville et resultats.
- `auth.html` : connexion et inscription.
- `salon.html` : fiche salon, prestations et creneaux.
- `mes-rdv.html` : rendez-vous du client connecte.
- `dashboard.html` : espace professionnel du salon.
- `mentions-legales.html` : mentions legales.
- `confidentialite.html` : politique de confidentialite.

## 8. Routes API prevues

### Authentification

- `POST /api/auth/register` : inscription client ou salon.
- `POST /api/auth/login` : connexion et generation du JWT.
- `GET /api/auth/me` : recuperation de l'utilisateur connecte.

### Salons

- `GET /api/salons` : recherche et filtres des salons.
- `GET /api/salons/:id` : detail d'un salon.
- `PUT /api/salons/me` : modification du salon connecte.

### Prestations

- `GET /api/salons/:id/prestations` : prestations publiques d'un salon.
- `POST /api/prestations` : creation d'une prestation par un salon.
- `PUT /api/prestations/:id` : modification d'une prestation.
- `DELETE /api/prestations/:id` : suppression ou desactivation d'une prestation.

### Creneaux

- `GET /api/salons/:id/creneaux` : creneaux disponibles d'un salon.
- `POST /api/creneaux` : creation d'un creneau par un salon.
- `PUT /api/creneaux/:id` : modification de disponibilite d'un creneau.

### Reservations

- `POST /api/reservations` : reservation d'un creneau par un client.
- `GET /api/reservations/me` : reservations du client connecte.
- `PATCH /api/reservations/:id/cancel` : annulation d'une reservation.
- `GET /api/reservations/salon` : reservations du salon connecte.

## 9. Base de donnees

Le modele de base de donnees du MVP contient les tables suivantes :

- `users`
- `salons`
- `prestations`
- `horaires_ouverture`
- `creneaux`
- `reservations`

Le schema SQL est defini dans `database/schema.sql`.

## 10. Design et identite

Cut&Go doit avoir une identite premium, moderne et claire.

- Couleur principale sombre : noir profond.
- Couleur de fond : blanc casse.
- Accent visuel : dore sobre.
- Interface : lisible, responsive, rapide a utiliser.
- Ambiance : professionnelle, elegante, simple.

Les choix visuels doivent rester au service de l'utilisation : recherche rapide, reservation claire et dashboard salon efficace.

## 11. Etat d'avancement

### Deja realise

- Nom du projet valide : Cut&Go.
- Perimetre MVP defini.
- Parcours client et salon clarifies.
- User stories detaillees avec criteres d'acceptation.
- Structure cible du projet definie.
- Schema SQL initial cree.

### Prochaines etapes

- Creer des donnees de test dans `database/seed.sql`.
- Documenter les routes API dans `docs/routes-api.md`.
- Creer la structure backend Express.
- Implementer l'authentification.
- Implementer les routes salons, prestations, creneaux et reservations.
