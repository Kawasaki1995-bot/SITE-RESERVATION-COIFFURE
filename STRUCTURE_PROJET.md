# Structure projet - Cut&Go

Ce fichier decrit l'organisation cible du projet. Elle peut evoluer, mais doit rester simple et lisible.

## 1. Structure cible

```text
cut-and-go/
|-- README.md
|-- brief.md
|-- cadrage_projet.md
|-- DIRECTIVES_IA.md
|-- TODO_PROJET.md
|-- STRUCTURE_PROJET.md
|-- docs/
|   |-- user-stories.md
|   |-- routes-api.md
|   |-- mcd-mld.md
|   |-- tests.md
|   |-- rgpd-accessibilite.md
|-- database/
|   |-- schema.sql
|   |-- seed.sql
|   |-- queries.sql
|-- backend/
|   |-- package.json
|   |-- server.js
|   |-- .env.example
|   |-- config/
|   |   |-- db.js
|   |-- routes/
|   |   |-- auth.routes.js
|   |   |-- salons.routes.js
|   |   |-- prestations.routes.js
|   |   |-- creneaux.routes.js
|   |   |-- reservations.routes.js
|   |   |-- admin.routes.js
|   |-- controllers/
|   |   |-- auth.controller.js
|   |   |-- salons.controller.js
|   |   |-- prestations.controller.js
|   |   |-- creneaux.controller.js
|   |   |-- reservations.controller.js
|   |   |-- admin.controller.js
|   |-- middlewares/
|   |   |-- auth.middleware.js
|   |   |-- role.middleware.js
|   |   |-- error.middleware.js
|   |-- utils/
|       |-- date.js
|-- frontend/
|   |-- index.html
|   |-- auth.html
|   |-- salon.html
|   |-- mes-rdv.html
|   |-- dashboard.html
|   |-- admin.html
|   |-- compte.html
|   |-- mentions-legales.html
|   |-- confidentialite.html
|   |-- assets/
|   |   |-- css/
|   |   |   |-- style.css
|   |   |-- js/
|   |   |   |-- api.js
|   |   |   |-- auth.js
|   |   |   |-- search.js
|   |   |   |-- salon.js
|   |   |   |-- reservations.js
|   |   |   |-- dashboard.js
|   |   |   |-- admin.js
|   |   |   |-- compte.js
|   |   |-- images/
```

## 2. Role des dossiers

### `docs/`

Contient les documents utiles au dossier de projet :

- user stories detaillees ;
- routes API ;
- modele de donnees ;
- tests ;
- RGPD et accessibilite.

### `database/`

Contient les scripts SQL :

- creation des tables ;
- donnees de test ;
- requetes utiles pour expliquer le projet au jury.

### `backend/`

Contient l'API Express :

- routes ;
- controllers ;
- middlewares ;
- configuration MySQL ;
- logique metier.

### `frontend/`

Contient les pages HTML, le CSS, le JavaScript front et les images.

## 3. Conventions de nommage

- Fichiers HTML en kebab-case : `mes-rdv.html`.
- Fichiers JS backend avec role explicite : `auth.controller.js`, `auth.routes.js`.
- Tables SQL en minuscules et au pluriel : `users`, `salons`, `prestations`.
- Variables JavaScript en camelCase : `selectedSlot`, `currentUser`.
- Constantes en majuscules si elles sont globales : `API_BASE_URL`.

## 4. Architecture backend attendue

Le backend doit suivre le principe :

```text
route -> controller -> requete SQL -> reponse JSON
```

Les routes ne doivent pas contenir toute la logique. Les controllers gerent les traitements, les middlewares protegent les routes, et le fichier `db.js` centralise la connexion MySQL.

## 5. Architecture frontend attendue

Le frontend doit rester en JavaScript Vanilla.

Le fichier `api.js` doit centraliser les appels `fetch` afin d'eviter de repeter partout :

- l'URL de base ;
- les headers JSON ;
- le header Authorization ;
- la gestion simple des erreurs.

## 6. Ordre de creation conseille

1. Documents de cadrage.
2. SQL.
3. Backend auth.
4. Backend salons/prestations/creneaux/reservations.
5. Front statique.
6. Front dynamique avec mock data si besoin.
7. Connexion front/back.
8. Tests et documentation.
