# Journal de bord projet Cut&Go

## Mise a jour

- **Semaine** : 26/05
- **Date de creation** : 28/05/2026
- **Auteur** : equipe Cut&Go

## 1. Contexte general

- **Nom du projet** : Cut&Go
- **Objectif** : plateforme de reservation de coiffure pour clients et gestion professionnelle pour salons.
- **Stack technique** : HTML5, CSS3, JavaScript Vanilla, Node.js, Express.js, MySQL.
- **Livrables de base** : wireframes, brief projet, user stories, architecture frontend/backend, base de donnees.

## 2. Wireframes disponibles

Source principale : `wwindex.md`

### Pages principales

- **Accueil** : logo, appel a l'action, recherche par ville, salons populaires.
- **Recherche salons** : champ de recherche, filtres, liste de salons avec note et prestation.
- **Fiche salon** : informations du salon, prestations, calendrier de creneaux, bouton de reservation.
- **Connexion / Inscription** : formulaire avec choix du role client ou salon.
- **Dashboard salon** : reservations du jour, gestion des prestations, gestion des creneaux.

### Points cles issus des wireframes

- Priorite UX sur la recherche par ville et la reservation rapide.
- Presentation claire des salons et des creneaux horaires.
- Dashboard salon centre sur le suivi des reservations et la gestion des prestations.

## 3. User stories principales

### Cote client

- **US01** : creer un compte pour reserver.
- **US02** : se connecter pour acceder a l'espace personnel.
- **US03** : rechercher un salon par ville.
- **US04** : filtrer les salons par note, prix et prestation.
- **US05** : consulter les prestations d'un salon.
- **US06** : reserver un creneau disponible.
- **US07** : consulter ses reservations.
- **US08** : annuler un rendez-vous plus de 24 heures avant.

### Cote salon

- **US09** : creer un espace professionnel.
- **US10** : gerer les informations du salon.
- **US11** : ajouter et modifier des prestations.
- **US12** : gerer les horaires d'ouverture.
- **US13** : gerer les creneaux disponibles ou indisponibles.
- **US14** : consulter les reservations.
- **US15** : suivre un chiffre d'affaires simple.

## 4. Brief du projet

Source principale : `brief.md`

### Vision

- Plateforme de reservation pour simplifier la prise de rendez-vous chez un salon de coiffure.
- Service a destination des clients et des salons.
- Experience premium, moderne et rapide.

### Objectifs MVP

- Recherche et reservation pour les clients.
- Espace professionnel pour les salons.
- Authentification securisee.
- Gestion des prestations, horaires, creneaux et reservations.

### Priorites identifiees

- Inscription / Connexion.
- Recherche salon.
- Reservation.
- Dashboard salon.
- Gestion des rendez-vous.
- Responsive mobile.

## 5. Avancement actuel

### Ce qui est deja fait

- Redaction du brief projet initial.
- Realisation des wireframes pour l'accueil, la recherche, la fiche salon, la connexion et le dashboard salon.
- Identification des user stories principales.
- Clarification du MVP.
- Choix du nom Cut&Go.
- Creation d'un cadrage projet.
- Creation de directives IA.
- Creation d'une todo projet.
- Creation d'une structure cible du projet.

### Ce qui reste a faire

- Completer les user stories avec des criteres d'acceptation.
- Finaliser les maquettes.
- Creer le schema SQL.
- Construire le backend complet : auth, salons, prestations, creneaux, reservations.
- Implementer le frontend.
- Relier le frontend au backend.
- Tester les parcours client et salon.
- Preparer la documentation, le deploiement et la soutenance.

## 6. Journal de bord semaine du 26/05

### Objectifs de la semaine

- Consolider les wireframes et le brief.
- Traduire les user stories en priorites de developpement.
- Definir les pages cles de l'application.
- Definir une ligne directrice claire avant de coder.

### Realisations de la semaine

- Wireframes documentes.
- Brief initial finalise.
- Liste des user stories principales etablie.
- Perimetre MVP clarifie.
- Nom Cut&Go valide.
- Documents de pilotage crees.

### Indicateurs de progression

- **Documents disponibles** : brief, wireframes, cadrage, directives IA, todo, structure projet.
- **Fonctionnalites MVP definies** : parcours client et parcours salon.
- **Priorites MVP** : clairement identifiees.
- **Etat de production** : cadrage en cours de consolidation avant developpement.

## 7. Prochaines actions immediates

- Completer les user stories avec criteres d'acceptation.
- Finaliser le parcours client.
- Finaliser le parcours salon.
- Creer le schema SQL.
- Documenter les routes API.

## 8. Regle de suivi quotidien

Chaque jour de travail doit etre ajoute dans la section **Journal quotidien** avec le format :

```text
JJ/MM/AAAA
```

Chaque entree doit expliquer :

- les decisions prises ;
- les fichiers crees ou modifies ;
- les fonctionnalites travaillees ;
- les problemes rencontres ;
- les prochaines actions conseillees.

## 9. Journal quotidien

### 28/05/2026

#### Decisions prises

- Le nom du projet est maintenant **Cut&Go**.
- Le projet se limite aux salons de coiffure.
- Un compte professionnel represente un salon complet, pas un employe individuel.
- Le MVP reste centre sur deux parcours : client et salon.
- Les fonctionnalites bonus sont repoussees apres le MVP : paiement, notifications, upload reel, geolocalisation avancee, interface administrateur complete.
- Les notes des salons seront fictives dans le MVP.
- Les creneaux seront decoupes par tranche de 30 minutes.
- Les horaires d'ouverture seront configurables jour par jour.
- Le client pourra annuler un rendez-vous uniquement plus de 24 heures avant le creneau.
- Le dashboard salon affichera les reservations du jour, la gestion des prestations, la gestion des creneaux et le chiffre d'affaires jour/semaine/mois.

#### Fichiers crees ou modifies

- `cadrage_projet.md` : cadrage complet du projet Cut&Go, perimetre MVP, regles metier, pages principales et choix retenus.
- `DIRECTIVES_IA.md` : consignes a faire lire a l'IA pour garder une ligne directrice coherente.
- `TODO_PROJET.md` : todo list organisee par phases : cadrage, backend, frontend, connexion front/back, finalisation jury.
- `STRUCTURE_PROJET.md` : structure cible du projet avec dossiers `docs`, `database`, `backend` et `frontend`.
- `journaldebord` : ajout du suivi quotidien et mise au propre du journal de bord.

#### Travail realise

- Analyse du programme DWWM pour aligner le projet avec les competences attendues.
- Relecture du brief, des wireframes et du journal de bord existant.
- Clarification des choix fonctionnels du projet.
- Definition d'une ligne directrice pour travailler avec l'IA.
- Mise en place d'une todo globale pour suivre l'avancement du projet.
- Ajout d'une regle de suivi quotidien dans `DIRECTIVES_IA.md`.

#### Problemes rencontres

- Le fichier `schema.sql` est ouvert dans l'IDE mais n'existe pas encore dans le dossier du projet.
- Certains anciens fichiers contiennent des caracteres mal encodes.

#### Prochaines actions conseillees

- Completer les user stories avec des criteres d'acceptation.
- Corriger les textes encodes dans les anciens fichiers si necessaire.
- Finaliser le parcours client et le parcours salon.
- Preparer ensuite le modele de base de donnees et le fichier `schema.sql`.

### 28/05/2026 - Suite du cadrage et debut SQL

#### Decisions prises

- Les documents `cadrage_projet.md`, `DIRECTIVES_IA.md`, `TODO_PROJET.md`, `STRUCTURE_PROJET.md`, `brief.md`, `wwindex.md` et `journaldebord` ont ete relus avant de continuer.
- `cadrage_projet.md` reste la reference principale car il contient le nom actuel Cut&Go et le perimetre MVP le plus propre.
- `brief.md` et `wwindex.md` sont conserves comme sources historiques, mais ils contiennent encore l'ancien nom CoiffRDV et des caracteres mal encodes.
- La suite prioritaire retenue est : user stories detaillees, puis modele de base de donnees.

#### Fichiers crees ou modifies

- `docs/user-stories.md` : ajout des user stories detaillees avec priorites Must, Should, Could et criteres d'acceptation.
- `database/schema.sql` : creation du schema MySQL initial avec les tables principales du MVP.
- `TODO_PROJET.md` : mise a jour des taches terminees pour les user stories et le schema SQL.

#### Travail realise

- Formalisation du parcours client : compte, connexion, recherche, filtres, fiche salon, reservation, consultation et annulation.
- Formalisation du parcours salon : compte professionnel, connexion, informations salon, prestations, horaires, creneaux, reservations et chiffre d'affaires.
- Creation des tables `users`, `salons`, `prestations`, `horaires_ouverture`, `creneaux` et `reservations`.
- Ajout des cles primaires, cles etrangeres, contraintes `UNIQUE`, contraintes `NOT NULL` et index utiles.

#### Problemes rencontres

- Les anciens documents `brief.md` et `wwindex.md` contiennent encore des textes mal encodes.
- Les donnees de test ne sont pas encore creees.
- Le schema SQL n'a pas encore ete execute dans MySQL.

#### Prochaines actions conseillees

- Creer `database/seed.sql` avec des donnees de test realistes.
- Verifier le schema dans MySQL.
- Documenter les premieres routes API dans `docs/routes-api.md`.
- Demarrer ensuite la structure backend Express.

### 28/05/2026 - Correction du brief projet

#### Decisions prises

- Le brief doit utiliser le nom actuel Cut&Go partout.
- Les anciennes references a CoiffRDV et aux pages `coiffeur.html` ne doivent plus servir de base.
- Le brief doit etre coherent avec `cadrage_projet.md`, `docs/user-stories.md` et `database/schema.sql`.

#### Fichiers crees ou modifies

- `brief.md` : reecriture complete du brief avec le bon nom, le perimetre MVP actuel, les pages prevues, les routes API prevues, les regles metier et les prochaines etapes.

#### Travail realise

- Suppression des incoherences liees a l'ancien nom du projet.
- Alignement des pages principales avec la structure cible : `index.html`, `auth.html`, `salon.html`, `mes-rdv.html`, `dashboard.html`, `mentions-legales.html`, `confidentialite.html`.
- Clarification des fonctionnalites hors MVP pour eviter de bloquer le developpement.

#### Problemes rencontres

- Le brief initial contenait encore des caracteres mal encodes et des informations anciennes.

#### Prochaines actions conseillees

- Corriger ensuite `wwindex.md` si besoin pour supprimer les anciens encodages.
- Continuer avec `database/seed.sql` puis `docs/routes-api.md`.

### 28/05/2026 - Correction des wireframes documentes

#### Decisions prises

- `wwindex.md` doit devenir le document de reference pour les wireframes basse fidelite.
- Les elements d'administration complete restent hors MVP.
- Les pages et parcours doivent utiliser le nom Cut&Go et les fichiers prevus dans la structure cible.

#### Fichiers crees ou modifies

- `wwindex.md` : reecriture complete avec arborescence, wireframes texte, parcours client, parcours salon, priorites MVP et fonctionnalites hors MVP.
- `TODO_PROJET.md` : validation de la tache de correction des textes encodes.

#### Travail realise

- Suppression des anciens caracteres mal encodes.
- Suppression des references incoherentes a l'ancien nom du projet.
- Alignement des wireframes avec `brief.md`, `cadrage_projet.md` et `docs/user-stories.md`.
- Clarification des pages : accueil, recherche, fiche salon, auth, mes rendez-vous, dashboard salon, mentions legales et confidentialite.

#### Problemes rencontres

- Aucun probleme bloquant.

#### Prochaines actions conseillees

- Creer `database/seed.sql` avec des donnees de test realistes.
- Documenter les routes API dans `docs/routes-api.md`.
- Demarrer ensuite la structure backend Express.

### 28/05/2026 - Donnees de test SQL

#### Decisions prises

- Les donnees de test doivent rester simples et realistes pour faciliter les tests API et la demonstration jury.
- Tous les comptes de test utilisent le meme mot de passe : `Password123!`.
- Les salons de test couvrent plusieurs villes afin de tester la recherche par ville et les filtres.

#### Fichiers crees ou modifies

- `database/seed.sql` : creation des donnees de test.
- `TODO_PROJET.md` : validation de la tache d'ajout des donnees de test.

#### Travail realise

- Ajout de deux comptes clients.
- Ajout de trois comptes salons.
- Ajout de trois fiches salons avec ville, adresse, description, telephone, image et note fictive.
- Ajout de prestations avec prix.
- Ajout d'horaires d'ouverture jour par jour.
- Ajout de creneaux disponibles et indisponibles.
- Ajout de reservations confirmees et annulees.

#### Problemes rencontres

- Le script n'a pas encore ete execute dans MySQL.

#### Prochaines actions conseillees

- Documenter les routes API dans `docs/routes-api.md`.
- Creer ensuite la structure backend Express.
- Executer `database/schema.sql` puis `database/seed.sql` dans MySQL quand l'environnement base de donnees sera pret.

### 28/05/2026 - Documentation des routes API

#### Decisions prises

- Les routes API sont documentees avant le codage du backend afin de garder un contrat clair entre frontend et backend.
- Les reponses JSON utilisent un format simple avec `success`, `data` et `message`.
- Les routes sensibles seront protegees par JWT et par role.

#### Fichiers crees ou modifies

- `docs/routes-api.md` : documentation des endpoints du MVP.
- `TODO_PROJET.md` : validation de la tache de documentation des endpoints API.

#### Travail realise

- Documentation des routes d'authentification.
- Documentation des routes publiques de recherche et fiche salon.
- Documentation des routes prestations, creneaux et reservations.
- Documentation de la route de statistiques salon.
- Ajout des principaux codes HTTP attendus.

#### Problemes rencontres

- Aucun probleme bloquant.

#### Prochaines actions conseillees

- Creer le projet Node.js avec `package.json`.
- Installer Express, mysql2, dotenv, bcrypt, jsonwebtoken et cors.
- Mettre en place la structure backend : routes, controllers, middlewares et config.

### 28/05/2026 - Creation du backend Express

#### Decisions prises

- Le backend suit l'architecture prevue : routes, controllers, middlewares et config.
- Les requetes SQL sont preparees avec `mysql2/promise`.
- Les routes sensibles utilisent un JWT et une verification de role.
- La disponibilite d'un creneau est geree par la colonne `creneaux.disponible`, afin de permettre une nouvelle reservation apres annulation.

#### Fichiers crees ou modifies

- `.gitignore` : exclusion de `node_modules` et des fichiers `.env`.
- `backend/package.json` et `backend/package-lock.json` : creation du projet Node.js et installation des dependances.
- `backend/.env.example` : exemple de variables d'environnement.
- `backend/server.js` : serveur Express et montage des routes.
- `backend/config/db.js` : pool de connexion MySQL.
- `backend/middlewares/auth.middleware.js` : verification du JWT.
- `backend/middlewares/role.middleware.js` : verification des roles.
- `backend/middlewares/error.middleware.js` : gestion centralisee des erreurs.
- `backend/routes/*.routes.js` : routes auth, salons, prestations, creneaux et reservations.
- `backend/controllers/*.controller.js` : logique metier du backend.
- `database/schema.sql` : ajustement de la contrainte sur `reservations.creneau_id`.
- `TODO_PROJET.md` : mise a jour des taches backend terminees.

#### Travail realise

- Creation des routes d'inscription, connexion et recuperation utilisateur connecte.
- Hashage des mots de passe avec bcrypt.
- Generation d'un JWT a la connexion.
- Creation des routes publiques de recherche salons et fiche salon.
- Creation des routes de gestion des prestations.
- Creation des routes de gestion des creneaux.
- Creation des routes de reservation client.
- Ajout de la regle d'annulation plus de 24 heures avant le rendez-vous.
- Ajout des routes de reservations salon et de chiffre d'affaires simple.

#### Problemes rencontres

- Les routes n'ont pas encore ete testees avec une vraie base MySQL lancee.
- Les routes dediees aux horaires d'ouverture ne sont pas encore implementees.

#### Prochaines actions conseillees

- Ajouter les routes salon pour les horaires d'ouverture.
- Executer `database/schema.sql` et `database/seed.sql` dans MySQL.
- Tester les routes avec Postman ou Thunder Client.

### 29/05/2026 - Audit et corrections backend

#### Decisions prises

- Le backend ne doit plus utiliser de secret JWT par defaut.
- Les validations d'entree sont renforcees sans ajouter de dependance externe.
- La configuration CORS passe par une variable d'environnement.

#### Fichiers crees ou modifies

- `backend/.env.example` : ajout des variables d'environnement attendues.
- `backend/server.js` : controle obligatoire de `JWT_SECRET` et configuration CORS.
- `backend/controllers/auth.controller.js` : suppression du secret JWT de secours.
- `backend/middlewares/auth.middleware.js` : verification JWT avec le secret configure.
- `backend/controllers/reservations.controller.js` : correction de la liberation de connexion MySQL.
- `backend/controllers/salons.controller.js` : validation des filtres de recherche.
- `backend/controllers/prestations.controller.js` : validation stricte des prix.
- `backend/controllers/creneaux.controller.js` : validation des dates, heures et disponibilites.

#### Travail realise

- Correction des quatre points remontes par l'audit backend.
- Verification syntaxique des fichiers JavaScript avec `node --check`.
- Verification des dependances avec `npm audit --omit=dev`.

#### Problemes rencontres

- Le dossier local n'est pas initialise comme depot Git, donc `git status` et `git diff` ne sont pas disponibles.

#### Prochaines actions conseillees

- Creer un fichier `.env` local a partir de `backend/.env.example`.
- Tester les routes avec Postman ou Thunder Client.
- Continuer ensuite avec la structure frontend.

---

_Ce journal de bord evoluera au fur et a mesure de l'avancement du projet._
