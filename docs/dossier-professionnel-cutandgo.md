# Dossier professionnel (DP) - Cut&Go

## Page de garde

Nom de naissance : A completer

Nom d'usage : A completer

Prenom : A completer

Adresse : A completer

Titre professionnel vise : Developpeur web et web mobile

Modalite d'acces :

- [x] Parcours de formation
- [ ] Validation des Acquis de l'Experience (VAE)

Projet support : Cut&Go, application web de reservation de rendez-vous pour salons de coiffure

Organisme / centre de formation : Molengeek

Periode d'exercice : Du A completer au A completer

---

## Presentation du dossier

Le dossier professionnel constitue un element du systeme de validation du titre professionnel. Il presente des exemples de pratique professionnelle en lien avec les activites-types du titre vise.

Ce dossier presente les pratiques mises en oeuvre pendant la realisation du projet Cut&Go. Le projet consiste a developper un MVP de reservation de rendez-vous pour salons de coiffure, avec un parcours client, un parcours salon et une interface d'administration simple.

Le client peut creer un compte, se connecter, rechercher un salon par ville, filtrer les resultats, consulter une fiche salon, choisir une prestation, reserver un creneau disponible, consulter ses rendez-vous et annuler un rendez-vous si la regle des 24 heures est respectee.

Le salon peut creer un compte professionnel, se connecter, gerer ses informations, ses prestations, ses horaires d'ouverture, ses creneaux disponibles ou indisponibles, consulter ses reservations et suivre un chiffre d'affaires simple.

L'administrateur peut se connecter a une interface dediee pour consulter les comptes, modifier leurs informations principales, restreindre ou reactiver un compte, et supprimer un compte si necessaire.

Chaque utilisateur connecte peut egalement modifier ses informations personnelles depuis une page de parametrage du compte : nom, email et adresse personnelle.

La stack technique utilisee est alignee avec le programme DWWM et le referentiel REAC TP-01280 millesime 04 : HTML5, CSS3, JavaScript Vanilla, Node.js, Express.js, MySQL, mysql2, bcrypt, JWT, dotenv, Git, GitHub et Alwaysdata.

---

## Sommaire

### Exemples de pratique professionnelle

#### Activite-type 1 - Developper la partie front-end d'une application web ou web mobile securisee

- Exemple numero 1 : Installer et configurer son environnement de travail en fonction du projet web ou web mobile.
- Exemple numero 2 : Maquetter et realiser des interfaces utilisateur web ou web mobile.
- Exemple numero 3 : Developper la partie dynamique des interfaces utilisateur web ou web mobile.

#### Activite-type 2 - Developper la partie back-end d'une application web ou web mobile securisee

- Exemple numero 1 : Mettre en place une base de donnees relationnelle et developper des composants d'acces aux donnees SQL.
- Exemple numero 2 : Developper des composants metier cote serveur.
- Exemple numero 3 : Documenter le deploiement d'une application dynamique web ou web mobile.

### Rubriques complementaires

- Titres, diplomes, CQP, attestations de formation.
- Declaration sur l'honneur.
- Documents illustrant la pratique professionnelle.
- Annexes.

---

# Exemples de pratique professionnelle

## Activite-type 1 - Developper la partie front-end d'une application web ou web mobile securisee

## Exemple numero 1

### Competence visee

Installer et configurer son environnement de travail en fonction du projet web ou web mobile.

### Exemple issu du projet

Mise en place du depot Cut&Go, de l'arborescence du projet, de l'environnement Node.js, de la configuration MySQL locale et des documents de suivi.

### 1. Decrivez les taches ou operations que vous avez effectuees, et dans quelles conditions

Pour demarrer le projet Cut&Go, j'ai analyse le brief, le cadrage projet et le programme de formation afin d'identifier les attentes techniques du titre DWWM. L'objectif etait de mettre en place un environnement simple, reproductible et compatible avec un projet fullstack : frontend HTML/CSS/JavaScript, API Express, base MySQL et documentation.

J'ai organise le depot avec une separation claire des responsabilites :

- `frontend/` pour les pages HTML, le CSS, les scripts navigateur et les images ;
- `backend/` pour l'API Express, les routes, les controllers, les middlewares et la configuration MySQL ;
- `database/` pour le schema SQL, les donnees de demonstration et les migrations ;
- `docs/` pour les documents de conception, de tests, de deploiement et de preparation jury.

J'ai initialise l'environnement backend avec Node.js et npm. Le fichier `backend/package.json` declare les dependances necessaires : `express`, `cors`, `dotenv`, `mysql2`, `bcrypt` et `jsonwebtoken`. J'ai ajoute un script de verification syntaxique avec `npm run check`, afin de controler les principaux fichiers JavaScript backend avant la presentation.

J'ai separe les informations sensibles du code source avec un fichier `.env` local et un modele `backend/.env.example`. Les variables permettent de configurer le port, l'origine frontend autorisee, les identifiants MySQL, le secret JWT et la duree de validite du token. Le fichier `.gitignore` evite de versionner les fichiers locaux sensibles.

Cote frontend, j'ai centralise la configuration des appels API dans `frontend/assets/js/api.js`. Le script peut fonctionner en local, en ouverture directe de fichier ou en production, sans modifier les appels `fetch` dans toutes les pages.

J'ai enfin documente les commandes et les controles dans `README.md`, `STRUCTURE_PROJET.md`, `TODO_PROJET.md`, `docs/tests.md` et `docs/deploiement.md`.

### 2. Precisez les moyens utilises

- Visual Studio Code pour le developpement.
- Terminal PowerShell pour les commandes.
- Node.js et npm pour le backend.
- Express.js pour l'API.
- MySQL / MariaDB et mysql2 pour la base de donnees.
- dotenv pour les variables d'environnement.
- Git et GitHub pour le versionnement.
- Fichiers `README.md`, `STRUCTURE_PROJET.md`, `TODO_PROJET.md` et `docs/deploiement.md`.

### 3. Avec qui avez-vous travaille ?

J'ai travaille dans un cadre de formation, avec les consignes du projet, le programme DWWM et les attentes d'une soutenance jury. J'ai organise mon travail comme un projet professionnel : cadrage, priorisation du MVP, implementation, tests, documentation et preparation de demonstration.

### 4. Contexte

Nom de l'entreprise, organisme ou association : Molengeek

Chantier, atelier, service : Projet de fin de formation - Developpement web

Periode d'exercice : Du A completer au A completer

### 5. Informations complementaires

Cette phase m'a permis d'avoir un environnement de travail coherent entre le local et la production. Les commandes utiles sont documentees, les secrets ne sont pas dans le code source et l'arborescence du projet facilite la presentation devant le jury.

---

## Exemple numero 2

### Competences visees

Maquetter des interfaces utilisateur web ou web mobile.

Realiser des interfaces utilisateur statiques web ou web mobile.

### Exemple issu du projet

Conception et integration responsive des interfaces Cut&Go : accueil, authentification, fiche salon, espace client, dashboard salon, compte, administration et pages legales.

### 1. Decrivez les taches ou operations que vous avez effectuees, et dans quelles conditions

Avant de coder, j'ai defini le perimetre fonctionnel du MVP a partir de `brief.md`, `cadrage_projet.md` et `docs/user-stories.md`. L'objectif etait de produire une application proche d'un clone simplifie de Planity, mais limitee a des fonctions essentielles et realistes pour un projet DWWM.

J'ai identifie les utilisateurs principaux :

- le client, qui recherche un salon, consulte une fiche et reserve un rendez-vous ;
- le salon, qui gere ses prestations, ses horaires, ses creneaux et ses reservations ;
- l'administrateur, qui consulte et gere les comptes utilisateurs.

J'ai ensuite defini les ecrans necessaires :

- `index.html` : accueil, recherche par ville et resultats ;
- `auth.html` : connexion et inscription ;
- `compte.html` : parametrage du compte ;
- `salon.html` : fiche salon, prestations et creneaux ;
- `mes-rdv.html` : rendez-vous du client ;
- `dashboard.html` : espace professionnel du salon ;
- `admin.html` : administration des comptes ;
- `mentions-legales.html` et `confidentialite.html` : pages legales.

Les maquettes ont ete pensees autour des actions prioritaires. Pour le client, le chemin principal est : rechercher, comparer, choisir une prestation, selectionner un creneau et confirmer la reservation. Pour le salon, le chemin principal est : consulter les reservations, mettre a jour ses informations, gerer les prestations, gerer les horaires et ouvrir ou fermer des creneaux.

J'ai choisi une identite visuelle sobre et premium : noir profond, blanc casse, touches dorees, composants lisibles et formulaires simples. L'objectif etait d'evoquer l'univers des salons de coiffure tout en gardant une interface efficace.

J'ai ensuite integre les interfaces statiques du projet dans le dossier `frontend/` avec HTML5 et CSS3. Le fichier `frontend/assets/css/style.css` contient la mise en forme generale : navigation, formulaires, boutons, cartes de resultats, fiche salon, dashboard, tableaux, messages, pages legales et adaptations responsive.

J'ai travaille en mobile-first, puis j'ai ajoute des adaptations pour tablette et desktop. Les composants ont ete penses pour rester lisibles : formulaires avec labels, boutons visibles, zones de messages, cartes salon, tableaux simplifies et sections organisees.

J'ai utilise une structure HTML semantique avec `header`, `nav`, `main`, `section`, `form`, `label` et `button`. Les images dynamiques disposent d'un texte alternatif ou d'un contexte de lecture. Les pages legales ont ete integrees afin de couvrir les premiers besoins RGPD.

J'ai verifie le rendu avec le navigateur, les DevTools et un audit Lighthouse sur la page d'accueil. L'audit documente dans `docs/lighthouse.md` indique une accessibilite a 100 et un SEO a 100 sur la page auditee.

### 2. Precisez les moyens utilises

- Figma pour organiser les ecrans et les parcours.
- Papier/crayon pour les premiers enchainements d'ecrans.
- `brief.md`, `cadrage_projet.md` et `docs/user-stories.md` pour cadrer le besoin.
- HTML5 pour la structure des pages.
- CSS3 pour la mise en forme.
- Media queries pour le responsive.
- Chrome DevTools pour tester les largeurs d'ecran.
- Lighthouse pour controler performance, accessibilite, bonnes pratiques et SEO.
- `docs/rgpd-accessibilite.md` et `docs/lighthouse.md`.

### 3. Avec qui avez-vous travaille ?

J'ai travaille en autonomie dans le cadre de la formation. Les interfaces ont ete construites a partir des user stories et du cadrage, puis ajustees selon les parcours de demonstration prevus.

### 4. Contexte

Nom de l'entreprise, organisme ou association : Molengeek

Chantier, atelier, service : Projet Cut&Go - Conception et integration front-end

Periode d'exercice : Du A completer au A completer

### 5. Informations complementaires

Certaines fonctions ont volontairement ete sorties du perimetre : paiement en ligne, notifications email/SMS, vraie geolocalisation, upload reel de photos, workflow avance de validation professionnelle et gestion multi-employes. Ce choix m'a permis de concentrer les interfaces sur les parcours indispensables.

Le choix de rester en HTML/CSS sans framework CSS m'a permis de montrer les bases attendues du titre : structure semantique, formulaires, responsive, navigation, accessibilite et cohesion visuelle.

---

## Exemple numero 3

### Competence visee

Developper la partie dynamique des interfaces utilisateur web ou web mobile.

### Exemple issu du projet

Connexion du frontend Cut&Go a l'API : authentification, recherche de salons, affichage de la fiche salon, reservation, annulation, dashboard salon, compte utilisateur et administration.

### 1. Decrivez les taches ou operations que vous avez effectuees, et dans quelles conditions

Apres l'integration statique, j'ai developpe la partie dynamique avec JavaScript Vanilla. L'objectif etait de remplacer les contenus fixes par des donnees issues de l'API Express et de rendre les parcours client, salon et admin fonctionnels.

J'ai separe les scripts par domaine :

- `api.js` centralise l'URL API, les appels `fetch`, le token JWT, la session et les helpers communs ;
- `auth.js` gere l'inscription, la connexion et le choix du role ;
- `compte.js` gere la modification des informations personnelles ;
- `search.js` gere la recherche et les filtres ;
- `salon.js` affiche la fiche salon, les prestations et les creneaux disponibles ;
- `reservations.js` affiche les rendez-vous client et gere l'annulation ;
- `dashboard.js` gere l'espace salon ;
- `admin.js` gere la liste et la modification des comptes.

J'ai implemente les appels asynchrones avec `fetch`, `async/await` et une gestion des erreurs HTTP. Les pages affichent des messages de chargement, de succes ou d'erreur selon le resultat de l'API.

Le token JWT est stocke en `sessionStorage` pendant la session. Lorsqu'une route protegee est appelee, `api.js` ajoute automatiquement le header `Authorization: Bearer`. Les liens de navigation sont adaptes selon l'etat connecte/deconnecte et selon le role de l'utilisateur.

Pour limiter les risques d'injection dans l'affichage, j'ai utilise des helpers comme `escapeHtml` pour echapper les donnees inserees dans le DOM. J'ai aussi ajoute une fonction `safeImageUrl` afin de limiter les URLs d'images aux protocoles attendus.

J'ai teste les parcours principaux : inscription et connexion, recherche d'un salon par ville, filtrage par prestation, reservation d'un creneau, disparition du creneau reserve, consultation et annulation d'un rendez-vous, gestion des prestations et creneaux par le salon, administration simple des comptes.

### 2. Precisez les moyens utilises

- JavaScript Vanilla.
- API Fetch, promesses et `async/await`.
- `sessionStorage` pour la session utilisateur.
- DOM API pour l'affichage dynamique.
- Chrome DevTools, onglets Console et Network.
- `node --check` pour verifier la syntaxe des scripts JavaScript.
- `docs/tests.md` pour les scenarios de validation.

### 3. Avec qui avez-vous travaille ?

J'ai travaille en autonomie, avec une validation progressive : chaque page frontend a ete reliee a une ou plusieurs routes API, puis testee dans un scenario utilisateur complet.

### 4. Contexte

Nom de l'entreprise, organisme ou association : Molengeek

Chantier, atelier, service : Projet Cut&Go - JavaScript frontend

Periode d'exercice : Du A completer au A completer

### 5. Informations complementaires

Le choix de JavaScript Vanilla permet de montrer la comprehension des bases : evenements, DOM, modules de fichiers, appels HTTP, gestion des erreurs, stockage temporaire et adaptation de l'interface selon l'utilisateur connecte.

---

## Activite-type 2 - Developper la partie back-end d'une application web ou web mobile securisee

## Exemple numero 1

### Competences visees

Mettre en place une base de donnees relationnelle.

Developper des composants d'acces aux donnees SQL.

### Exemple issu du projet

Conception de la base MySQL Cut&Go et creation des requetes SQL dans les controllers Express pour rechercher les salons, gerer les prestations, les creneaux, les reservations et les comptes.

### 1. Decrivez les taches ou operations que vous avez effectuees, et dans quelles conditions

Pour Cut&Go, j'ai concu une base de donnees relationnelle MySQL adaptee aux besoins du MVP. Les donnees du projet sont fortement liees : un salon appartient a un utilisateur, un salon possede des prestations et des creneaux, et une reservation relie un client, un salon, une prestation et un creneau.

J'ai cree le fichier `database/schema.sql`, qui contient la creation de la base `cut_and_go` et des tables principales :

- `users` pour les comptes clients, salons et administrateurs ;
- `salons` pour les informations publiques des salons ;
- `prestations` pour les services proposes et leurs prix ;
- `horaires_ouverture` pour les horaires jour par jour ;
- `creneaux` pour les disponibilites ;
- `reservations` pour les rendez-vous confirmes ou annules.

J'ai defini les cles primaires, les cles etrangeres et les contraintes utiles pour garantir la coherence. Par exemple, l'email utilisateur est unique, un compte salon ne peut etre lie qu'a un seul salon, une prestation appartient a un salon, un creneau appartient a un salon et une reservation ne peut pas exister sans client, salon, prestation et creneau.

J'ai ajoute des contraintes de coherence : prix positif, jour de semaine compris entre 1 et 7, heures d'ouverture coherentes, unicite d'un creneau pour un salon a une date et une heure donnees.

J'ai aussi ajoute des index pour optimiser les recherches frequentes : role utilisateur, ville du salon, nom de prestation, creneaux par salon et date, reservations par client, salon et creneau.

Enfin, j'ai cree `database/seed.sql` pour disposer de donnees de demonstration : comptes de test, salons, prestations, horaires, creneaux et reservations. Ces donnees servent aux tests, a la demonstration et a la presentation jury.

Dans le backend, la connexion est centralisee dans `backend/config/db.js` avec `mysql2`, ce qui permet aux controllers d'utiliser le meme pool de connexions. Les routes suivent l'organisation suivante :

```text
route -> middleware -> controller -> requete SQL -> reponse JSON
```

J'ai utilise des requetes preparees avec des parametres `?` pour eviter de concatener directement les entrees utilisateur dans le SQL. Cette pratique reduit le risque d'injection SQL.

Pour les operations sensibles, j'ai utilise des transactions. Lors de la creation d'une reservation, le backend verrouille le creneau avec `FOR UPDATE`, verifie qu'il est disponible, verifie que la prestation appartient bien au salon, cree la reservation, puis rend le creneau indisponible. Si une etape echoue, la transaction est annulee avec `rollback`.

J'ai applique le meme principe pour l'annulation : verification de la reservation, controle de la regle des 24 heures, changement de statut en `annulee`, puis remise a disposition du creneau.

### 2. Precisez les moyens utilises

- MySQL / MariaDB.
- Script `database/schema.sql`.
- Script `database/seed.sql`.
- Contraintes SQL : cles primaires, cles etrangeres, `UNIQUE`, `CHECK`.
- Index SQL.
- Node.js et Express.js.
- mysql2 avec pool de connexions.
- Requetes SQL preparees.
- Transactions SQL avec `beginTransaction`, `commit` et `rollback`.
- Documentation API dans `docs/routes-api.md`.
- Tests manuels avec `docs/tests.md`.

### 3. Avec qui avez-vous travaille ?

J'ai travaille a partir des besoins fonctionnels definis dans le brief, le cadrage et les user stories. Les choix de base de donnees et les requetes SQL ont ete faits en fonction des parcours client, salon et admin.

### 4. Contexte

Nom de l'entreprise, organisme ou association : Molengeek

Chantier, atelier, service : Projet Cut&Go - Base de donnees et acces aux donnees

Periode d'exercice : Du A completer au A completer

### 5. Informations complementaires

Une base relationnelle etait adaptee au projet car elle permet de garantir les liens entre les entites. Une solution NoSQL n'etait pas necessaire pour ce MVP, car les donnees principales sont structurees et fortement relationnelles.

Les contraintes SQL, les requetes preparees et les transactions se completent. La base protege la coherence des donnees, tandis que les controllers appliquent les regles metier et renvoient des messages exploitables par le frontend.

---

## Exemple numero 2

### Competence visee

Developper des composants metier cote serveur.

### Exemple issu du projet

Developpement de l'API Express securisee : authentification JWT, roles client/salon/admin, reservation, annulation, dashboard salon et administration des comptes.

### 1. Decrivez les taches ou operations que vous avez effectuees, et dans quelles conditions

J'ai developpe l'API backend Cut&Go avec Node.js et Express. Le fichier `backend/server.js` configure l'application, active CORS, lit les variables d'environnement avec `dotenv`, parse le JSON, expose la route de sante `/api/health`, branche les routes fonctionnelles et gere les erreurs.

J'ai implemente plusieurs composants metier :

- authentification et inscription dans `auth.controller.js` ;
- recherche et modification des salons dans `salons.controller.js` ;
- gestion des prestations dans `prestations.controller.js` ;
- gestion des horaires dans `horaires.controller.js` ;
- gestion des creneaux dans `creneaux.controller.js` ;
- reservation, annulation et statistiques dans `reservations.controller.js` ;
- administration des comptes dans `admin.controller.js`.

Pour l'authentification, les mots de passe sont hashes avec `bcrypt` avant stockage. Lors de la connexion, le mot de passe fourni est compare au hash stocke. Si les identifiants sont corrects, l'API genere un token JWT contenant l'identite publique de l'utilisateur et son role.

J'ai protege les routes sensibles avec `auth.middleware.js`, qui verifie la presence et la validite du token JWT. J'ai utilise `role.middleware.js` pour limiter certaines actions aux roles attendus. Par exemple, un client peut reserver un creneau et consulter ses rendez-vous, tandis qu'un salon peut gerer ses propres prestations, horaires, creneaux et reservations.

J'ai implemente les regles metier principales :

- un utilisateur possede un role ;
- un compte restreint ne peut plus se connecter ;
- un client reserve uniquement un creneau disponible ;
- une reservation rend le creneau indisponible ;
- un creneau deja pris provoque une erreur `409` ;
- une annulation est impossible moins de 24 heures avant le rendez-vous ;
- une reservation annulee rend le creneau disponible ;
- un salon ne peut gerer que ses propres donnees ;
- les reservations annulees ne sont pas prises en compte dans le chiffre d'affaires ;
- un administrateur ne peut pas supprimer son propre compte ni retirer ses propres droits admin.

La gestion des erreurs est centralisee avec `error.middleware.js`. Les routes inconnues renvoient une reponse JSON `404`, et les erreurs applicatives gardent un format coherent pour faciliter le traitement cote frontend.

### 2. Precisez les moyens utilises

- Node.js et Express.js.
- bcrypt pour le hashage des mots de passe.
- JWT pour l'authentification.
- Middlewares Express pour l'authentification, les roles et les erreurs.
- MySQL et mysql2.
- `npm run check` et `node --check` pour les controles syntaxiques.
- `npm audit --omit=dev` pour le controle des dependances.
- Thunder Client ou Postman possible pour tester les endpoints.

### 3. Avec qui avez-vous travaille ?

J'ai travaille en autonomie sur le projet, en suivant une organisation proche d'un contexte professionnel : analyse du besoin, developpement, verification, documentation et deploiement.

### 4. Contexte

Nom de l'entreprise, organisme ou association : Molengeek

Chantier, atelier, service : Projet Cut&Go - Developpement backend

Periode d'exercice : Du A completer au A completer

### 5. Informations complementaires

Le backend a ete concu pour rester lisible devant un jury : les routes definissent les endpoints, les middlewares securisent les acces, les controllers portent la logique, et la base MySQL stocke les donnees persistantes.

---

## Exemple numero 3

### Competence visee

Documenter le deploiement d'une application dynamique web ou web mobile.

### Exemple issu du projet

Deploiement de Cut&Go sur Alwaysdata et redaction de la procedure de production pour le frontend, l'API Node.js et la base MySQL.

### 1. Decrivez les taches ou operations que vous avez effectuees, et dans quelles conditions

Pour finaliser le projet, j'ai deploye Cut&Go sur Alwaysdata afin de rendre l'application accessible en ligne. L'objectif etait d'heberger les trois parties du projet : le frontend statique, l'API Node.js/Express et la base MySQL.

J'ai documente l'architecture de production dans `docs/deploiement.md` :

- un site public pour le dossier `frontend/` ;
- une application Node.js pour le dossier `backend/` ;
- une base MySQL creee depuis l'administration Alwaysdata ;
- une configuration CORS entre le frontend public et l'API ;
- des variables d'environnement pour la base, le JWT et l'origine autorisee.

J'ai prepare le backend pour la production avec la commande de demarrage `npm start`, qui lance `node server.js`. Les variables sensibles sont configurees cote hebergeur et ne sont pas versionnees dans Git : `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `PORT` et `FRONTEND_URL`.

J'ai importe la structure de base avec `database/schema.sql`, puis les donnees de demonstration avec `database/seed.sql`. Pour les evolutions d'une base deja existante, j'ai prevu une migration `database/migrations/2026-06-18-admin-account-settings.sql`, afin d'eviter de supprimer les donnees de production.

Cote frontend, j'ai adapte `frontend/assets/js/api.js` pour que l'URL de l'API puisse fonctionner en local et en production. En production, le frontend appelle `/api` sur la meme origine, ce qui simplifie la configuration et limite les erreurs de domaine.

J'ai ajoute une checklist de verification production : route `/api/health`, connexion client, recherche de salon, reservation, annulation, dashboard salon, interface admin, page compte, console navigateur et audit Lighthouse a refaire en ligne si possible.

Les URLs documentees pour le projet sont :

- frontend : `https://cutandgo.alwaysdata.net` ;
- API backend : `https://cutandgo.alwaysdata.net/api` ;
- health check : `https://cutandgo.alwaysdata.net/api/health`.

### 2. Precisez les moyens utilises

- Alwaysdata pour l'hebergement.
- Node.js / Express pour l'API.
- MySQL Alwaysdata pour la base de donnees.
- Variables d'environnement pour les secrets et la configuration.
- `database/schema.sql`, `database/seed.sql` et migrations SQL.
- `docs/deploiement.md` pour la procedure.
- `README.md` pour l'installation, les comptes de test et la verification.

### 3. Avec qui avez-vous travaille ?

J'ai travaille dans le cadre du projet de formation, avec l'objectif de livrer une application demonstrable en ligne et une procedure de deploiement suffisamment claire pour etre relue ou reproduite.

### 4. Contexte

Nom de l'entreprise, organisme ou association : Molengeek

Chantier, atelier, service : Projet Cut&Go - Deploiement et documentation

Periode d'exercice : Du A completer au A completer

### 5. Informations complementaires

Le deploiement m'a permis de verifier les differences entre local et production : variables d'environnement, CORS, URL API, base MySQL distante, donnees de demonstration et redemarrage du serveur Node.js apres modification du backend.

---

# Titres, diplomes, CQP, attestations de formation

Rubrique facultative. A completer si vous souhaitez porter ces elements a la connaissance du jury.

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

Rubrique facultative. Les documents ci-dessous peuvent etre presentes au jury pour illustrer la pratique professionnelle.

| Intitule | Emplacement dans le projet |
| --- | --- |
| Brief projet Cut&Go | `brief.md` |
| Cadrage projet | `cadrage_projet.md` |
| Programme DWWM 24 semaines | `programme_DWWM_24_semaines.md` |
| Structure du projet | `STRUCTURE_PROJET.md` |
| User stories | `docs/user-stories.md` |
| Documentation API | `docs/routes-api.md` |
| Schema SQL | `database/schema.sql` |
| Donnees de demonstration | `database/seed.sql` |
| Migration admin et compte | `database/migrations/2026-06-18-admin-account-settings.sql` |
| Documentation RGPD et accessibilite | `docs/rgpd-accessibilite.md` |
| Checklist de tests | `docs/tests.md` |
| Deploiement Alwaysdata | `docs/deploiement.md` |
| Audit Lighthouse | `docs/lighthouse.md` et `docs/lighthouse-index.json` |
| Frontend HTML/CSS/JS | `frontend/` |
| Backend Express | `backend/` |
| Interface admin | `frontend/admin.html` et `frontend/assets/js/admin.js` |
| Parametres du compte | `frontend/compte.html` et `frontend/assets/js/compte.js` |

---

# Annexes

## Annexe 1 - Architecture du projet

```text
frontend HTML/CSS/JS -> API Express -> controllers -> MySQL
```

Structure principale :

```text
Cut&Go
|-- backend/
|   |-- config/
|   |-- controllers/
|   |-- middlewares/
|   |-- routes/
|   |-- server.js
|-- database/
|   |-- schema.sql
|   |-- seed.sql
|   |-- migrations/
|-- docs/
|-- frontend/
|   |-- assets/
|   |-- index.html
|   |-- auth.html
|   |-- compte.html
|   |-- salon.html
|   |-- mes-rdv.html
|   |-- dashboard.html
|   |-- admin.html
```

## Annexe 2 - Routes principales de l'API

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

## Annexe 3 - Securite et qualite

Mesures implementees :

- hashage des mots de passe avec `bcrypt` ;
- authentification par JWT ;
- verification des roles cote backend ;
- requetes SQL preparees ;
- transactions SQL pour reservation et annulation ;
- configuration sensible dans `.env` ;
- CORS configure par variable d'environnement ;
- pages mentions legales et confidentialite ;
- controle syntaxique avec `node --check` ;
- audit de dependances avec `npm audit --omit=dev` ;
- audit Lighthouse documente.

## Annexe 4 - URLs de deploiement

- Frontend : `https://cutandgo.alwaysdata.net`
- API backend : `https://cutandgo.alwaysdata.net/api`
- Health check : `https://cutandgo.alwaysdata.net/api/health`

## Annexe 5 - Scenarios de demonstration

### Parcours client

1. Se connecter avec `alice.client@cutandgo.test`.
2. Rechercher un salon a Lille ou Bruxelles.
3. Filtrer les resultats par note, prix ou prestation.
4. Ouvrir une fiche salon.
5. Choisir une prestation et un creneau.
6. Confirmer la reservation.
7. Verifier que le creneau n'est plus disponible.
8. Ouvrir `Mes RDV`.
9. Annuler le rendez-vous si la regle des 24 heures le permet.

### Parcours salon

1. Se connecter avec `contact@salon-elegance.test`.
2. Ouvrir le dashboard salon.
3. Consulter les reservations et les statistiques.
4. Modifier les informations du salon.
5. Ajouter ou desactiver une prestation.
6. Creer, bloquer ou rouvrir un creneau.
7. Modifier les horaires d'ouverture.

### Parcours administrateur

1. Se connecter avec `admin@cutandgo.test`.
2. Ouvrir `admin.html`.
3. Consulter la liste des comptes.
4. Modifier le statut d'un compte de test.
5. Reactiver le compte.
6. Verifier que l'administrateur ne peut pas supprimer son propre compte.
