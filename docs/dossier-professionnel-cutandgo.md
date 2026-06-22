# Dossier professionnel - Cut&Go

## Informations candidat

Nom de naissance : A completer

Nom d'usage : A completer

Prenom : A completer

Adresse : A completer

Titre professionnel vise : Developpeur web et web mobile

Modalite d'acces : Parcours de formation

Organisme de formation : Molengeek

Periode d'exercice : Du A completer au A completer

Projet support : Cut&Go, application web de reservation de rendez-vous pour salons de coiffure

---

# Presentation du projet support

Cut&Go est une application web de reservation de rendez-vous pour salons de coiffure. Le projet a ete construit comme projet fil rouge DWWM, en suivant la progression du programme de formation sur 24 semaines et les 8 competences REAC du titre professionnel Developpeur web et web mobile.

L'application comporte trois parcours principaux :

- un parcours client : inscription, connexion, recherche de salons, filtres, consultation d'une fiche salon, choix d'une prestation, reservation d'un creneau, consultation et annulation de rendez-vous ;
- un parcours salon : inscription professionnelle, connexion, gestion du salon, prestations, horaires, creneaux, reservations et statistiques simples ;
- un parcours administrateur : connexion dediee, consultation des comptes, modification, restriction, reactivation et suppression de comptes.

La stack technique utilisee est volontairement alignee avec le programme DWWM :

- HTML5, CSS3 et JavaScript Vanilla pour le front-end ;
- Node.js et Express.js pour le back-end ;
- MySQL / MariaDB et mysql2 pour la base de donnees ;
- bcrypt et JWT pour l'authentification ;
- dotenv pour les variables d'environnement ;
- Git, GitHub, README et documentation projet pour le suivi ;
- Alwaysdata pour le deploiement.

Ce dossier est structure selon les 8 competences du programme DWWM. Pour chaque competence, j'indique le lien avec le programme, les taches effectuees sur Cut&Go, les moyens utilises, le contexte de travail, les preuves disponibles et les elements que je pourrai completer plus tard.

---

# Sommaire

## Activite-type 1 - Developper la partie front-end d'une application web ou web mobile securisee

- CP1 - Installer et configurer son environnement de travail.
- CP2 - Maquetter des interfaces utilisateur.
- CP3 - Realiser des interfaces utilisateur statiques.
- CP4 - Developper la partie dynamique des interfaces utilisateur.

## Activite-type 2 - Developper la partie back-end d'une application web ou web mobile securisee

- CP5 - Mettre en place une base de donnees relationnelle.
- CP6 - Developper des composants d'acces aux donnees SQL et NoSQL.
- CP7 - Developper des composants metier cote serveur.
- CP8 - Documenter le deploiement d'une application dynamique.

## Rubriques complementaires

- Titres, diplomes, CQP et attestations de formation.
- Declaration sur l'honneur.
- Documents illustrant la pratique professionnelle.
- Annexes.

---

# Activite-type 1 - Developper la partie front-end d'une application web ou web mobile securisee

## CP1 - Installer et configurer son environnement de travail

### Reference programme DWWM

Cette competence correspond notamment a la semaine 2 du programme : outils de base, terminal, Git, GitHub, Visual Studio Code, Chrome DevTools et Markdown.

Elle est egalement mobilisee tout au long du projet, car l'environnement doit rester exploitable pendant le developpement front-end, back-end, base de donnees, tests et deploiement.

### Mise en oeuvre dans Cut&Go

Pour demarrer Cut&Go, j'ai mis en place un environnement de travail complet pour un projet fullstack. J'ai organise le depot avec une separation claire entre le front-end, le back-end, la base de donnees et la documentation.

L'arborescence principale est la suivante :

```text
Cut&Go
|-- frontend/
|-- backend/
|-- database/
|-- docs/
|-- README.md
|-- STRUCTURE_PROJET.md
|-- TODO_PROJET.md
```

J'ai prepare le back-end avec Node.js et npm. Le fichier `backend/package.json` declare les dependances principales du projet : `express`, `cors`, `dotenv`, `mysql2`, `bcrypt` et `jsonwebtoken`.

J'ai separe la configuration sensible avec des variables d'environnement et un fichier modele `backend/.env.example`. Le fichier `.gitignore` evite de versionner les fichiers sensibles comme `.env`.

J'ai egalement centralise la configuration front-end des appels API dans `frontend/assets/js/api.js`, afin d'eviter de modifier toutes les pages lorsque l'URL de l'API change entre local et production.

### Taches effectuees

- Creation et organisation de l'arborescence du projet.
- Configuration du projet Node.js avec npm.
- Installation des dependances back-end.
- Mise en place des variables d'environnement.
- Creation d'un modele `.env.example`.
- Ajout ou verification du `.gitignore`.
- Mise en place de scripts de verification syntaxique.
- Redaction du README et de documents de suivi.
- Utilisation de Git et GitHub pour conserver l'historique du projet.

### Moyens utilises

- Visual Studio Code.
- Terminal PowerShell.
- Git et GitHub.
- Node.js et npm.
- Chrome DevTools.
- Markdown pour la documentation.
- Fichiers `README.md`, `STRUCTURE_PROJET.md`, `TODO_PROJET.md`.

### Contexte

Nom de l'entreprise, organisme ou association : Molengeek

Chantier, atelier, service : Projet de fin de formation - Developpement web

Periode d'exercice : Du A completer au A completer

### Preuves et documents associes

- `README.md`
- `STRUCTURE_PROJET.md`
- `TODO_PROJET.md`
- `backend/package.json`
- `backend/.env.example`
- `.gitignore`

### Informations complementaires

Cette competence m'a permis de travailler dans un environnement reproductible, lisible et presentable. Elle sert de base a toutes les autres competences du dossier.

---

## CP2 - Maquetter des interfaces utilisateur web ou web mobile

### Reference programme DWWM

Cette competence correspond aux semaines 1 et 17 du programme : analyse du brief, user stories, wireframes, maquette haute fidelite et preparation des ecrans du projet fil rouge.

### Mise en oeuvre dans Cut&Go

Avant de coder, j'ai defini le perimetre fonctionnel du MVP a partir du brief, du cadrage projet et des user stories. L'objectif etait de creer une application de reservation de rendez-vous proche dans son intention d'un service comme Planity, mais limitee aux fonctions essentielles pour un projet DWWM.

J'ai identifie trois profils :

- le client ;
- le salon ;
- l'administrateur.

J'ai ensuite defini les ecrans necessaires :

- accueil et recherche de salons ;
- connexion et inscription ;
- fiche salon ;
- espace client et liste des rendez-vous ;
- dashboard salon ;
- page de compte ;
- interface administrateur ;
- pages legales.

Les parcours ont ete penses autour des actions principales. Le client doit pouvoir chercher, comparer, choisir une prestation, selectionner un creneau et reserver. Le salon doit pouvoir gerer son activite. L'administrateur doit pouvoir gerer les comptes.

J'ai choisi une identite visuelle sobre : fond clair, contrastes lisibles, touches premium, formulaires simples et boutons explicites. Les interfaces ont ete pensees en mobile-first pour rester utilisables sur petit ecran.

### Taches effectuees

- Analyse du brief et reformulation du besoin.
- Identification des profils utilisateurs.
- Redaction et exploitation des user stories.
- Definition des ecrans principaux.
- Organisation des parcours client, salon et administrateur.
- Conception d'une hierarchie visuelle simple.
- Prise en compte du responsive, de l'accessibilite et des obligations legales.
- Limitation volontaire du perimetre MVP.

### Moyens utilises

- Figma pour organiser les ecrans.
- Papier/crayon pour les premiers enchainements.
- `brief.md`.
- `cadrage_projet.md`.
- `docs/user-stories.md`.
- `docs/rgpd-accessibilite.md`.

### Contexte

Nom de l'entreprise, organisme ou association : Molengeek

Chantier, atelier, service : Projet Cut&Go - Conception des interfaces

Periode d'exercice : Du A completer au A completer

### Preuves et documents associes

- `brief.md`
- `cadrage_projet.md`
- `docs/user-stories.md`
- `docs/rgpd-accessibilite.md`
- `frontend/index.html`
- `frontend/salon.html`
- `frontend/dashboard.html`
- `frontend/admin.html`

### Informations complementaires

Certaines fonctions ont ete sorties du perimetre pour rester realiste : paiement en ligne, notifications email/SMS, geolocalisation avancee, upload reel de photos, gestion multi-employes et workflow avance de validation professionnelle.

---

## CP3 - Realiser des interfaces utilisateur statiques web ou web mobile

### Reference programme DWWM

Cette competence correspond aux semaines 3, 4, 18 et 22 du programme : responsive design, formulaires, Flexbox, integration HTML/CSS, accessibilite, RGPD et bonnes pratiques front-end.

### Mise en oeuvre dans Cut&Go

J'ai integre les interfaces statiques dans le dossier `frontend/`. Les pages ont ete construites en HTML5 et CSS3, sans framework CSS, afin de montrer les bases attendues du titre.

Les principales pages integrees sont :

- `index.html` pour la recherche de salons ;
- `auth.html` pour l'inscription et la connexion ;
- `compte.html` pour les parametres du compte ;
- `salon.html` pour la fiche d'un salon ;
- `mes-rdv.html` pour les rendez-vous client ;
- `dashboard.html` pour l'espace salon ;
- `admin.html` pour l'administration ;
- `mentions-legales.html` et `confidentialite.html` pour les pages legales.

Le fichier `frontend/assets/css/style.css` regroupe les styles principaux : navigation, formulaires, cartes, boutons, tableaux, dashboard, messages, responsive et pages legales.

J'ai utilise une structure HTML semantique avec `header`, `nav`, `main`, `section`, `form`, `label` et `button`. Les formulaires ont des labels et les messages d'erreur ou de succes disposent de zones visibles.

J'ai travaille en mobile-first, puis j'ai adapte l'affichage aux tablettes et ordinateurs avec des media queries. J'ai egalement documente les points RGPD et accessibilite.

### Taches effectuees

- Creation des pages HTML principales.
- Integration des formulaires d'inscription, connexion et modification de compte.
- Mise en place d'une navigation coherente.
- Creation des cartes salons et des sections de contenu.
- Integration du dashboard salon.
- Integration de l'interface administrateur.
- Integration des pages legales.
- Mise en place du responsive.
- Verification de l'affichage avec Chrome DevTools.
- Audit Lighthouse de la page d'accueil.

### Moyens utilises

- HTML5.
- CSS3.
- Media queries.
- Chrome DevTools.
- Lighthouse.
- `frontend/assets/css/style.css`.
- `docs/lighthouse.md`.
- `docs/lighthouse-index.json`.

### Contexte

Nom de l'entreprise, organisme ou association : Molengeek

Chantier, atelier, service : Projet Cut&Go - Integration HTML/CSS

Periode d'exercice : Du A completer au A completer

### Preuves et documents associes

- `frontend/index.html`
- `frontend/auth.html`
- `frontend/compte.html`
- `frontend/salon.html`
- `frontend/mes-rdv.html`
- `frontend/dashboard.html`
- `frontend/admin.html`
- `frontend/assets/css/style.css`
- `docs/lighthouse.md`
- `docs/rgpd-accessibilite.md`

### Informations complementaires

L'audit Lighthouse documente indique une accessibilite et un SEO solides sur la page auditee. La mise en page reste simple afin de privilegier la lisibilite, le responsive et la demonstration fonctionnelle.

---

## CP4 - Developper la partie dynamique des interfaces utilisateur web ou web mobile

### Reference programme DWWM

Cette competence correspond aux semaines 5 a 9, 16, 18 et 20 du programme : JavaScript, DOM, evenements, fetch, promesses, async/await, modules, validation de formulaires, sessionStorage et connexion front/back.

### Mise en oeuvre dans Cut&Go

Apres l'integration statique, j'ai developpe la partie dynamique avec JavaScript Vanilla. L'objectif etait de connecter les pages HTML a l'API Express et de rendre les parcours utilisateur fonctionnels.

Les scripts sont separes par domaine :

- `api.js` centralise l'URL API, les appels `fetch`, le token JWT, la session et les helpers communs ;
- `auth.js` gere l'inscription, la connexion et le choix du role ;
- `compte.js` gere la modification des informations personnelles ;
- `search.js` gere la recherche et les filtres ;
- `salon.js` affiche la fiche salon, les prestations et les creneaux disponibles ;
- `reservations.js` affiche les rendez-vous client et gere l'annulation ;
- `dashboard.js` gere l'espace salon ;
- `admin.js` gere la liste et la modification des comptes.

J'ai utilise `fetch`, `async/await` et la DOM API pour afficher les donnees de l'API. Les pages gerent les etats de chargement, de succes et d'erreur. Le token JWT est stocke en `sessionStorage` et ajoute automatiquement aux requetes protegees avec le header `Authorization: Bearer`.

J'ai egalement ajoute des protections cote affichage, notamment avec `escapeHtml` pour echapper les donnees inserees dans le DOM et `safeImageUrl` pour limiter les URLs d'images.

### Taches effectuees

- Connexion du front-end a l'API Express.
- Gestion de l'inscription et de la connexion.
- Stockage temporaire du token JWT.
- Adaptation de la navigation selon l'etat connecte/deconnecte.
- Recherche de salons et filtres.
- Affichage dynamique des fiches salons.
- Affichage des prestations et creneaux.
- Reservation d'un creneau.
- Consultation et annulation des rendez-vous.
- Gestion dynamique du dashboard salon.
- Gestion dynamique de l'administration.
- Gestion des erreurs HTTP cote interface.

### Moyens utilises

- JavaScript Vanilla.
- DOM API.
- API Fetch.
- Promesses et `async/await`.
- `sessionStorage`.
- Chrome DevTools : Console, Network, Application.
- `docs/tests.md`.

### Contexte

Nom de l'entreprise, organisme ou association : Molengeek

Chantier, atelier, service : Projet Cut&Go - JavaScript front-end

Periode d'exercice : Du A completer au A completer

### Preuves et documents associes

- `frontend/assets/js/api.js`
- `frontend/assets/js/auth.js`
- `frontend/assets/js/search.js`
- `frontend/assets/js/salon.js`
- `frontend/assets/js/reservations.js`
- `frontend/assets/js/dashboard.js`
- `frontend/assets/js/admin.js`
- `frontend/assets/js/compte.js`
- `docs/tests.md`

### Informations complementaires

Cette competence montre la liaison entre le front-end et le back-end : appels HTTP, gestion du JWT, affichage conditionnel, messages utilisateur et parcours complet de reservation.

---

# Activite-type 2 - Developper la partie back-end d'une application web ou web mobile securisee

## CP5 - Mettre en place une base de donnees relationnelle

### Reference programme DWWM

Cette competence correspond aux semaines 12 et 19 du programme : modelisation, base de donnees MySQL, MCD/MLD, script SQL, contraintes et donnees de test.

### Mise en oeuvre dans Cut&Go

J'ai concu une base de donnees relationnelle MySQL adaptee aux besoins de Cut&Go. Les donnees sont structurees autour des utilisateurs, salons, prestations, horaires, creneaux et reservations.

Le fichier `database/schema.sql` contient la creation de la base et des tables principales :

- `users` pour les comptes clients, salons et administrateurs ;
- `salons` pour les informations publiques des salons ;
- `prestations` pour les services proposes ;
- `horaires_ouverture` pour les horaires ;
- `creneaux` pour les disponibilites ;
- `reservations` pour les rendez-vous.

J'ai defini les cles primaires, les cles etrangeres et les contraintes utiles. Par exemple, une prestation appartient a un salon, un creneau appartient a un salon, une reservation relie un client, un salon, une prestation et un creneau.

J'ai ajoute des contraintes de coherence comme l'unicite des emails, des prix positifs, des jours de semaine valides et l'unicite d'un creneau pour un salon a une date et une heure donnees.

J'ai egalement cree un fichier `database/seed.sql` pour disposer de donnees de demonstration pendant les tests et la soutenance.

### Taches effectuees

- Analyse des entites du projet.
- Definition des relations entre utilisateurs, salons, prestations, creneaux et reservations.
- Creation du schema SQL.
- Creation des cles primaires et cles etrangeres.
- Ajout de contraintes SQL.
- Ajout d'index pour les recherches frequentes.
- Creation de donnees de demonstration.
- Ajout d'une migration pour faire evoluer une base existante.

### Moyens utilises

- MySQL / MariaDB.
- SQL.
- `database/schema.sql`.
- `database/seed.sql`.
- `database/migrations/2026-06-18-admin-account-settings.sql`.
- Documentation projet.

### Contexte

Nom de l'entreprise, organisme ou association : Molengeek

Chantier, atelier, service : Projet Cut&Go - Base de donnees

Periode d'exercice : Du A completer au A completer

### Preuves et documents associes

- `database/schema.sql`
- `database/seed.sql`
- `database/migrations/2026-06-18-admin-account-settings.sql`
- `docs/dossier-projet.md`
- `docs/routes-api.md`

### Informations complementaires

Une base relationnelle etait adaptee au projet car les donnees sont fortement liees et doivent rester coherentes. Une solution NoSQL n'etait pas necessaire pour ce MVP.

---

## CP6 - Developper des composants d'acces aux donnees SQL et NoSQL

### Reference programme DWWM

Cette competence correspond aux semaines 13, 14, 19 et 20 du programme : SQL CRUD, jointures, acces aux donnees avec Node.js et MySQL, routes qui exploitent la base et integration fullstack.

### Mise en oeuvre dans Cut&Go

Dans le back-end, j'ai developpe les composants qui communiquent avec MySQL. La connexion est centralisee dans `backend/config/db.js` avec `mysql2`, ce qui permet aux controllers d'utiliser le meme pool de connexions.

L'organisation generale suit ce schema :

```text
route -> middleware -> controller -> requete SQL -> reponse JSON
```

Les requetes SQL sont placees dans les controllers et executent les operations necessaires : recherche, lecture, creation, modification, suppression logique ou annulation selon les cas.

J'ai utilise des requetes preparees avec des parametres `?` pour eviter de concatener directement les entrees utilisateur dans les requetes. Cela reduit le risque d'injection SQL.

J'ai aussi utilise des transactions pour les operations sensibles. Par exemple, lors d'une reservation, le serveur verifie le creneau, verrouille la ligne avec `FOR UPDATE`, cree la reservation et rend le creneau indisponible. Si une etape echoue, la transaction est annulee.

Le projet n'utilise pas de base NoSQL. J'ai donc concentre cette competence sur SQL, les jointures, les transactions, les requetes preparees et l'acces aux donnees depuis Node.js.

### Taches effectuees

- Configuration de la connexion MySQL.
- Creation de requetes SQL preparees.
- Recherche de salons avec filtres.
- Lecture des prestations, creneaux et horaires.
- Creation et modification de prestations.
- Creation, blocage et reouverture de creneaux.
- Creation de reservations.
- Annulation de reservations.
- Lecture des reservations client et salon.
- Calcul de statistiques simples pour le salon.
- Gestion des comptes dans l'interface administrateur.

### Moyens utilises

- Node.js.
- Express.js.
- mysql2.
- Pool de connexions.
- Requetes SQL preparees.
- Transactions SQL.
- Documentation API.
- Tests manuels.

### Contexte

Nom de l'entreprise, organisme ou association : Molengeek

Chantier, atelier, service : Projet Cut&Go - Acces aux donnees

Periode d'exercice : Du A completer au A completer

### Preuves et documents associes

- `backend/config/db.js`
- `backend/controllers/`
- `backend/routes/`
- `docs/routes-api.md`
- `docs/tests.md`

### Informations complementaires

Les composants d'acces aux donnees font le lien entre la base MySQL et les besoins fonctionnels du front-end. Les transactions sont importantes pour eviter qu'un meme creneau soit reserve plusieurs fois.

---

## CP7 - Developper des composants metier cote serveur

### Reference programme DWWM

Cette competence correspond aux semaines 10, 11, 15, 16, 19, 20 et 22 du programme : Node.js, Express, API REST, middlewares, authentification, securite, roles, validation et integration fullstack.

### Mise en oeuvre dans Cut&Go

J'ai developpe une API REST avec Node.js et Express. Le fichier `backend/server.js` configure l'application, active CORS, lit les variables d'environnement, parse le JSON, expose une route de sante `/api/health`, branche les routes fonctionnelles et gere les erreurs.

Les composants metier principaux sont organises dans les controllers :

- `auth.controller.js` pour l'inscription, la connexion et le compte courant ;
- `salons.controller.js` pour la recherche et la gestion du salon connecte ;
- `prestations.controller.js` pour la gestion des prestations ;
- `horaires.controller.js` pour la gestion des horaires ;
- `creneaux.controller.js` pour la gestion des disponibilites ;
- `reservations.controller.js` pour la reservation, l'annulation et les statistiques ;
- `admin.controller.js` pour la gestion des comptes.

J'ai implemente l'authentification avec `bcrypt` et JWT. Les mots de passe sont hashes avant stockage. Lors de la connexion, le mot de passe est compare au hash. Si les identifiants sont corrects, l'API genere un token JWT contenant les informations utiles de l'utilisateur.

Les routes sensibles sont protegees par `auth.middleware.js`, qui verifie le token JWT. Les droits sont controles avec `role.middleware.js`, afin de limiter certaines actions aux clients, salons ou administrateurs.

J'ai implemente plusieurs regles metier :

- un utilisateur possede un role ;
- un compte restreint ne peut plus se connecter ;
- un client reserve uniquement un creneau disponible ;
- une reservation rend le creneau indisponible ;
- un creneau deja reserve renvoie une erreur ;
- une annulation est impossible moins de 24 heures avant le rendez-vous ;
- une reservation annulee rend le creneau disponible ;
- un salon ne peut gerer que ses propres donnees ;
- les reservations annulees ne sont pas comptees dans le chiffre d'affaires ;
- un administrateur ne peut pas supprimer son propre compte ni retirer ses propres droits.

### Taches effectuees

- Creation du serveur Express.
- Organisation routes/controllers/middlewares.
- Creation des routes d'authentification.
- Hashage des mots de passe.
- Generation et verification des JWT.
- Protection des routes.
- Controle des roles.
- Gestion des reservations.
- Gestion des annulations.
- Gestion du dashboard salon.
- Gestion de l'administration.
- Gestion centralisee des erreurs.
- Documentation des endpoints.

### Moyens utilises

- Node.js.
- Express.js.
- bcrypt.
- jsonwebtoken.
- dotenv.
- CORS.
- Middlewares Express.
- MySQL et mysql2.
- `node --check`.
- `npm audit --omit=dev`.

### Contexte

Nom de l'entreprise, organisme ou association : Molengeek

Chantier, atelier, service : Projet Cut&Go - Developpement back-end

Periode d'exercice : Du A completer au A completer

### Preuves et documents associes

- `backend/server.js`
- `backend/controllers/`
- `backend/routes/`
- `backend/middlewares/auth.middleware.js`
- `backend/middlewares/role.middleware.js`
- `backend/middlewares/error.middleware.js`
- `docs/routes-api.md`
- `docs/tests.md`

### Informations complementaires

Cette competence concentre la logique metier du projet. Le back-end applique les regles qui ne doivent pas dependre uniquement du front-end : authentification, roles, disponibilites, annulation et droits d'administration.

---

## CP8 - Documenter le deploiement d'une application dynamique web ou web mobile

### Reference programme DWWM

Cette competence correspond a la semaine 21 du programme : deploiement de l'application, configuration de la base de donnees en production, variables d'environnement, URL publique et procedure reproductible.

### Mise en oeuvre dans Cut&Go

J'ai prepare le deploiement de Cut&Go sur Alwaysdata. L'objectif etait de rendre l'application accessible en ligne avec un front-end public, une API Node.js/Express et une base MySQL distante.

La documentation `docs/deploiement.md` decrit :

- l'architecture de production ;
- la configuration du front-end ;
- la configuration de l'API Node.js ;
- la creation et l'import de la base MySQL ;
- les variables d'environnement ;
- la configuration CORS ;
- les commandes utiles ;
- les tests a effectuer apres deploiement.

Les variables sensibles sont configurees cote hebergeur et ne sont pas versionnees dans le depot. Le fichier `.env.example` sert seulement de modele.

J'ai egalement prevu une migration SQL pour faire evoluer une base existante sans supprimer toutes les donnees.

### Taches effectuees

- Redaction de la procedure de deploiement.
- Preparation du front-end pour la production.
- Preparation du back-end avec `npm start`.
- Configuration des variables d'environnement.
- Import du schema SQL.
- Import des donnees de demonstration.
- Documentation des URLs de production.
- Ajout d'une checklist de verification apres deploiement.
- Documentation des differences entre local et production.

### Moyens utilises

- Alwaysdata.
- Node.js / Express.
- MySQL Alwaysdata.
- Variables d'environnement.
- GitHub.
- `docs/deploiement.md`.
- `README.md`.
- `database/schema.sql`.
- `database/seed.sql`.
- Migration SQL.

### Contexte

Nom de l'entreprise, organisme ou association : Molengeek

Chantier, atelier, service : Projet Cut&Go - Deploiement et documentation

Periode d'exercice : Du A completer au A completer

### Preuves et documents associes

- `docs/deploiement.md`
- `README.md`
- `backend/.env.example`
- `database/schema.sql`
- `database/seed.sql`
- `database/migrations/2026-06-18-admin-account-settings.sql`

### Informations complementaires

Cette competence sert a montrer que l'application n'est pas seulement developpee en local. Elle doit pouvoir etre installee, configuree, deployee et verifiee par une autre personne.

---

# Synthese des liens entre programme DWWM et projet Cut&Go

| Competence | Programme DWWM | Implementation dans Cut&Go |
| --- | --- | --- |
| CP1 | Outils de base, terminal, Git, GitHub, VS Code, Markdown | Depot structure, README, configuration Node.js, `.env.example`, scripts de controle |
| CP2 | Brief, user stories, wireframes, maquette haute fidelite | Parcours client/salon/admin, ecrans principaux, cadrage MVP |
| CP3 | Responsive design, formulaires, integration HTML/CSS, accessibilite | Pages HTML/CSS, responsive, pages legales, audit Lighthouse |
| CP4 | JavaScript, DOM, fetch, modules, validation, sessionStorage | Scripts front-end, appels API, JWT cote client, affichage dynamique |
| CP5 | Modelisation et base MySQL | Schema SQL, contraintes, relations, seed |
| CP6 | SQL CRUD, jointures, acces Node.js + MySQL | Controllers, requetes preparees, transactions, statistiques |
| CP7 | Node.js, Express, API REST, auth, securite, roles | API Express, bcrypt, JWT, middlewares, regles metier |
| CP8 | Deploiement, variables d'environnement, procedure | Documentation Alwaysdata, URLs, migration, checklist |

---

# Titres, diplomes, CQP, attestations de formation

Rubrique facultative.

| Intitule | Autorite ou organisme | Date |
| --- | --- | --- |
| A completer | A completer | A completer |
| A completer | A completer | A completer |

---

# Declaration sur l'honneur

Je soussigne(e) A completer, declare sur l'honneur que les renseignements fournis dans ce dossier sont exacts et que je suis l'auteur(e) des realisations jointes.

Fait a : A completer

Le : A completer

Signature :

---

# Documents illustrant la pratique professionnelle

| Document | Emplacement |
| --- | --- |
| Brief projet | `brief.md` |
| Cadrage projet | `cadrage_projet.md` |
| Programme DWWM | `programme_DWWM_24_semaines.md` |
| Structure projet | `STRUCTURE_PROJET.md` |
| README | `README.md` |
| User stories | `docs/user-stories.md` |
| Documentation API | `docs/routes-api.md` |
| Documentation RGPD et accessibilite | `docs/rgpd-accessibilite.md` |
| Checklist de tests | `docs/tests.md` |
| Documentation de deploiement | `docs/deploiement.md` |
| Audit Lighthouse | `docs/lighthouse.md` et `docs/lighthouse-index.json` |
| Schema SQL | `database/schema.sql` |
| Donnees de demonstration | `database/seed.sql` |
| Migration SQL | `database/migrations/2026-06-18-admin-account-settings.sql` |
| Front-end | `frontend/` |
| Back-end | `backend/` |

---

# Annexes

## Annexe 1 - Architecture simplifiee

```text
Navigateur
  -> Front-end HTML/CSS/JavaScript
  -> API Express
  -> Controllers
  -> MySQL
```

## Annexe 2 - Routes principales

- `GET /api/health` : verification de l'API.
- `POST /api/auth/register` : inscription.
- `POST /api/auth/login` : connexion.
- `GET /api/auth/me` : utilisateur connecte.
- `PUT /api/auth/me` : modification du compte connecte.
- `GET /api/salons` : recherche des salons.
- `GET /api/salons/:id` : fiche salon.
- `PUT /api/salons/me` : modification du salon connecte.
- `GET /api/salons/:id/prestations` : prestations publiques.
- `POST /api/prestations` : creation d'une prestation.
- `PUT /api/prestations/:id` : modification d'une prestation.
- `DELETE /api/prestations/:id` : desactivation d'une prestation.
- `GET /api/salons/:id/creneaux` : creneaux disponibles.
- `POST /api/creneaux` : creation d'un creneau.
- `PUT /api/creneaux/:id` : modification de disponibilite.
- `POST /api/reservations` : reservation.
- `GET /api/reservations/me` : rendez-vous client.
- `PATCH /api/reservations/:id/cancel` : annulation.
- `GET /api/reservations/salon` : reservations du salon.
- `GET /api/reservations/salon/stats` : statistiques salon.
- `GET /api/admin/users` : liste des comptes.
- `PUT /api/admin/users/:id` : modification d'un compte.
- `DELETE /api/admin/users/:id` : suppression d'un compte.

## Annexe 3 - Scenarios de demonstration

### Parcours client

1. Se connecter avec un compte client de test.
2. Rechercher un salon par ville.
3. Filtrer les resultats.
4. Ouvrir une fiche salon.
5. Choisir une prestation.
6. Choisir un creneau.
7. Confirmer la reservation.
8. Consulter mes rendez-vous.
9. Annuler si la regle des 24 heures le permet.

### Parcours salon

1. Se connecter avec un compte salon.
2. Ouvrir le dashboard.
3. Consulter les reservations.
4. Modifier les informations du salon.
5. Ajouter ou desactiver une prestation.
6. Creer, bloquer ou rouvrir un creneau.
7. Modifier les horaires.

### Parcours administrateur

1. Se connecter avec un compte administrateur.
2. Ouvrir l'interface admin.
3. Consulter la liste des comptes.
4. Modifier un compte.
5. Restreindre puis reactiver un compte.
6. Verifier les protections sur le compte administrateur courant.
