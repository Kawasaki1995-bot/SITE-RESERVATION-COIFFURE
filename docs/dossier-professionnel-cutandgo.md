# Dossier professionnel - Cut&Go

## Informations candidat

Nom de naissance : A completer

Nom d'usage : A completer

Prenom : A completer

Adresse : A completer

Titre professionnel vise : Developpeur web et web mobile

Modalite d'acces : Parcours de formation

Projet support : Cut&Go, application web de reservation de rendez-vous pour salons de coiffure

Periode d'exercice : A completer

Organisme / centre de formation : Molengeek

## Presentation du dossier

Ce dossier professionnel presente les pratiques mises en oeuvre pendant la realisation du projet Cut&Go. Le projet consiste a developper un MVP de reservation de rendez-vous pour salons de coiffure, avec un parcours client et un parcours salon.

Le client peut creer un compte, se connecter, rechercher un salon par ville, filtrer les resultats, consulter une fiche salon, choisir une prestation, reserver un creneau disponible, consulter ses rendez-vous et annuler un rendez-vous si la regle des 24 heures est respectee.

Le salon peut creer un compte professionnel, se connecter, gerer ses informations, ses prestations, ses horaires d'ouverture, ses creneaux disponibles ou indisponibles, consulter ses reservations et suivre un chiffre d'affaires simple.

La stack technique utilisee est volontairement alignee avec le titre DWWM : HTML5, CSS3, JavaScript Vanilla, Node.js, Express.js, MySQL, mysql2, bcrypt, JWT, dotenv, Git et GitHub.

## Sommaire

### Activite-type 1 - Developper la partie front-end d'une application web ou web mobile securisee

- Exemple 1 : Installer et configurer son environnement de travail en fonction du projet web ou web mobile.
- Exemple 2 : Maquetter des interfaces utilisateur web ou web mobile.
- Exemple 3 : Realiser des interfaces utilisateur statiques, responsives et dynamiques avec JavaScript Vanilla.

### Activite-type 2 - Developper la partie back-end d'une application web ou web mobile securisee

- Exemple 1 : Mettre en place une base de donnees relationnelle.
- Exemple 2 : Developper des composants d'acces aux donnees SQL.
- Exemple 3 : Developper des composants metier cote serveur.

### Elements complementaires

- Titres, diplomes, CQP, attestations de formation.
- Declaration sur l'honneur.
- Documents illustrant la pratique professionnelle.
- Annexes.

---

# Exemples de pratique professionnelle

## Activite-type 1 - Developper la partie front-end d'une application web ou web mobile securisee

## Exemple 1 - Installer et configurer son environnement de travail

### 1. Decrivez les taches ou operations que vous avez effectuees, et dans quelles conditions

Pour demarrer le projet Cut&Go, j'ai d'abord analyse le brief, le cadrage projet et la structure attendue du depot. L'objectif etait de produire une application web complete mais realiste pour un MVP DWWM : un frontend statique en HTML, CSS et JavaScript Vanilla, un backend Express, une base MySQL et une documentation exploitable pour la soutenance.

J'ai organise le projet en plusieurs dossiers afin de separer clairement les responsabilites :

- `frontend/` pour les pages HTML, le CSS et le JavaScript navigateur ;
- `backend/` pour l'API Express, les routes, les controllers, les middlewares et la configuration MySQL ;
- `database/` pour le schema SQL et les donnees de demonstration ;
- `docs/` pour les documents de conception, de tests, de deploiement et de preparation jury.

J'ai configure l'environnement backend avec Node.js et npm. Le fichier `backend/package.json` declare les dependances necessaires : `express`, `cors`, `dotenv`, `mysql2`, `bcrypt` et `jsonwebtoken`. J'ai aussi ajoute un script `npm run check` pour verifier la syntaxe des principaux fichiers JavaScript backend avec `node --check`.

La configuration sensible a ete isolee dans un fichier `.env`, avec un modele fourni dans `backend/.env.example`. Cela permet de ne pas coder en dur les informations de connexion MySQL, le port, l'origine frontend autorisee et le secret JWT. Le fichier `.gitignore` evite de versionner les fichiers locaux sensibles.

Cote frontend, j'ai centralise la configuration des appels API dans `frontend/assets/js/api.js`. Ce fichier determine automatiquement l'URL de l'API selon le contexte : ouverture locale en `file:`, serveur local ou production Alwaysdata. Cette approche m'a permis de garder le meme code JavaScript entre le developpement local et le deploiement.

J'ai ensuite verifie que l'environnement fonctionnait correctement :

- creation de la base avec `database/schema.sql` ;
- insertion de donnees de demonstration avec `database/seed.sql` ;
- lancement de l'API Express avec `npm run dev` ;
- test de la route `/api/health` ;
- verification des pages frontend principales ;
- controle syntaxique du backend et du frontend.

Le projet a ensuite ete deploye sur Alwaysdata avec un frontend public, une API Node.js et une base MySQL.

### 2. Precisez les moyens utilises

- Visual Studio Code pour le developpement.
- Node.js et npm pour le backend.
- Express.js pour l'API.
- MySQL et mysql2 pour la base de donnees.
- dotenv pour la configuration d'environnement.
- Git et GitHub pour le versionnement.
- Fichiers `README.md`, `STRUCTURE_PROJET.md`, `docs/deploiement.md` et `docs/tests.md` pour documenter l'installation, les controles et le deploiement.
- Alwaysdata pour l'hebergement.

### 3. Avec qui avez-vous travaille ?

J'ai travaille dans un cadre de formation, avec l'appui des consignes du projet et des retours attendus pour une presentation jury. J'ai structure le travail comme un projet professionnel : cadrage, priorisation du MVP, implementation, tests, documentation et preparation de demonstration.

### 4. Contexte

Nom de l'entreprise, organisme ou association : Molengeek

Chantier, atelier, service : Projet de fin de formation - Developpement web

Periode d'exercice : A completer

### 5. Informations complementaires

Cette phase m'a permis de mettre en place un environnement reproductible. Les commandes importantes sont documentees dans le `README.md`, les variables sensibles sont separees du code, et la configuration frontend permet de passer plus facilement du local a la production.

## Exemple 2 - Maquetter des interfaces utilisateur web ou web mobile

### 1. Decrivez les taches ou operations que vous avez effectuees, et dans quelles conditions

Avant de coder les interfaces, j'ai defini le perimetre fonctionnel et les parcours utilisateurs dans `brief.md`, `cadrage_projet.md` et `docs/user-stories.md`. L'objectif etait d'avoir une application simple a comprendre, rapide a utiliser et adaptee a deux profils : le client et le salon.

J'ai identifie les pages principales du MVP :

- `index.html` : accueil, recherche par ville et resultats ;
- `auth.html` : connexion et inscription ;
- `salon.html` : fiche salon, prestations et creneaux ;
- `mes-rdv.html` : rendez-vous du client ;
- `dashboard.html` : espace professionnel du salon ;
- `mentions-legales.html` et `confidentialite.html` : pages legales et RGPD.

J'ai concu les ecrans autour des taches principales plutot qu'autour d'un contenu decoratif. Pour le client, le parcours prioritaire est : rechercher un salon, comparer les resultats, ouvrir une fiche, choisir une prestation et reserver un creneau. Pour le salon, le parcours prioritaire est : consulter le dashboard, gerer les informations du salon, gerer les prestations, les horaires, les creneaux et les reservations.

L'identite visuelle retenue est une ambiance premium et lisible : noir profond, blanc casse, accents dores, boutons nets et composants simples. Le but etait de rappeler l'univers des salons de coiffure tout en conservant une interface efficace.

J'ai egalement pris en compte l'accessibilite des la conception :

- structure semantique avec `header`, `nav`, `main` et `section` ;
- formulaires avec labels ;
- boutons explicites ;
- messages d'erreur visibles ;
- contrastes renforces ;
- interface responsive ;
- textes alternatifs sur les images dynamiques.

Ces choix sont documentes dans `docs/rgpd-accessibilite.md`.

### 2. Precisez les moyens utilises

- Figma pour la preparation et l'organisation visuelle.
- `brief.md` et `cadrage_projet.md` pour cadrer les besoins.
- `docs/user-stories.md` pour relier les interfaces aux besoins client et salon.
- HTML5 et CSS3 pour transformer les maquettes en pages.
- Audit Lighthouse pour verifier notamment l'accessibilite et le SEO de la page d'accueil.

### 3. Avec qui avez-vous travaille ?

J'ai travaille dans le contexte de formation et j'ai confronte mes choix aux attentes d'un jury DWWM : lisibilite du parcours, coherence fonctionnelle, prise en compte de la securite, du responsive et des contraintes RGPD.

### 4. Contexte

Nom de l'entreprise, organisme ou association : Molengeek

Chantier, atelier, service : Projet Cut&Go - Conception front-end

Periode d'exercice : A completer

### 5. Informations complementaires

La conception a ete volontairement orientee MVP. Certaines fonctions ont ete sorties du perimetre : paiement en ligne, notifications email ou SMS, geolocalisation avancee, interface administrateur complete, upload reel de photos et gestion multi-employes.

## Exemple 3 - Realiser des interfaces utilisateur statiques, responsives et dynamiques

### 1. Decrivez les taches ou operations que vous avez effectuees, et dans quelles conditions

J'ai realise les interfaces du projet dans le dossier `frontend/` avec HTML5, CSS3 et JavaScript Vanilla. Le choix de ne pas utiliser React, Vue, Angular, Bootstrap ou Tailwind permet de rester proche des competences fondamentales du titre DWWM.

J'ai cree les pages necessaires au parcours complet :

- page d'accueil et recherche dans `index.html` ;
- authentification dans `auth.html` ;
- fiche detaillee d'un salon dans `salon.html` ;
- espace client dans `mes-rdv.html` ;
- dashboard salon dans `dashboard.html` ;
- pages legales dans `mentions-legales.html` et `confidentialite.html`.

Le fichier `frontend/assets/css/style.css` contient la mise en forme generale : navigation, formulaires, cartes de resultats, fiche salon, dashboard, et adaptation responsive. Les interfaces sont concues pour etre lisibles et utilisables sur desktop comme sur mobile.

J'ai ensuite ajoute la partie dynamique avec plusieurs fichiers JavaScript specialises :

- `api.js` centralise les appels `fetch`, le token JWT, la session et les fonctions communes ;
- `auth.js` gere l'inscription, la connexion et le choix du role ;
- `search.js` gere la recherche et les filtres de salons ;
- `salon.js` affiche la fiche salon, les prestations et les creneaux ;
- `reservations.js` gere l'affichage et l'annulation des rendez-vous client ;
- `dashboard.js` gere l'espace salon, les prestations, horaires, creneaux, reservations et statistiques.

Pour securiser l'affichage, j'ai utilise des fonctions comme `escapeHtml` dans `api.js` afin d'eviter d'injecter directement du HTML non maitrise dans la page. J'ai aussi ajoute une fonction `safeImageUrl` pour limiter les URLs d'images aux protocoles `http` et `https`.

La navigation est adaptee au role de l'utilisateur. Les elements reserves aux clients ou aux salons sont affiches ou masques selon les informations stockees dans la session apres connexion.

Enfin, j'ai effectue des controles de qualite :

- verification syntaxique des fichiers JavaScript frontend avec `node --check` ;
- audit Lighthouse de la page d'accueil ;
- correction de la meta description pour ameliorer le SEO ;
- verification des parcours client et salon dans `docs/tests.md`.

### 2. Precisez les moyens utilises

- HTML5, CSS3, JavaScript Vanilla.
- API Fetch pour les appels HTTP.
- `sessionStorage` pour stocker le token JWT et l'utilisateur courant pendant la session.
- Lighthouse pour mesurer la performance, l'accessibilite, les bonnes pratiques et le SEO.
- Documentation de tests dans `docs/tests.md`.

### 3. Avec qui avez-vous travaille ?

J'ai travaille en autonomie dans le cadre du projet de formation, avec une logique de validation progressive : chaque interface a ete reliee a une route API, puis integree dans un scenario de demonstration.

### 4. Contexte

Nom de l'entreprise, organisme ou association : Molengeek

Chantier, atelier, service : Projet Cut&Go - Integration front-end

Periode d'exercice : A completer

### 5. Informations complementaires

L'audit Lighthouse local documente dans `docs/lighthouse.md` indique les scores suivants pour la page d'accueil : performance 86, accessibilite 100, bonnes pratiques 96 et SEO 100. Un point d'amelioration reste l'optimisation de certaines images pour ameliorer le LCP.

---

## Activite-type 2 - Developper la partie back-end d'une application web ou web mobile securisee

## Exemple 1 - Mettre en place une base de donnees relationnelle

### 1. Decrivez les taches ou operations que vous avez effectuees, et dans quelles conditions

Pour le projet Cut&Go, j'ai concu une base de donnees relationnelle MySQL adaptee aux besoins du MVP. Le modele devait permettre de gerer les utilisateurs, les salons, les prestations, les horaires, les creneaux et les reservations.

J'ai cree le fichier `database/schema.sql`, qui contient la creation de la base `cut_and_go` et des tables principales :

- `users` pour les comptes clients, salons et administrateurs ;
- `salons` pour les informations publiques des salons ;
- `prestations` pour les services proposes et leurs prix ;
- `horaires_ouverture` pour les horaires jour par jour ;
- `creneaux` pour les disponibilites ;
- `reservations` pour les rendez-vous confirmes ou annules.

J'ai defini les relations avec des cles etrangeres afin de garantir la coherence des donnees. Par exemple, un salon est lie a un utilisateur, une prestation est liee a un salon, un creneau est lie a un salon, et une reservation relie un client, un salon, une prestation et un creneau.

J'ai ajoute des contraintes pour eviter les incoherences :

- email unique dans `users` ;
- relation unique entre un compte salon et un salon ;
- prix positif dans `prestations` ;
- jour de semaine compris entre 1 et 7 ;
- heure d'ouverture inferieure a l'heure de fermeture si le salon n'est pas ferme ;
- unicite d'un creneau pour un salon a une date et une heure donnees.

J'ai aussi cree des index pour optimiser les recherches les plus importantes : role utilisateur, ville du salon, nom de prestation, creneaux par salon et date, reservations par client, salon et creneau.

Le fichier `database/seed.sql` permet d'ajouter des donnees de demonstration. Ces donnees servent aux tests, a la demonstration jury et aux parcours documentes dans le `README.md`.

### 2. Precisez les moyens utilises

- MySQL / MariaDB.
- Script `database/schema.sql`.
- Script `database/seed.sql`.
- Contraintes SQL : cles primaires, cles etrangeres, `UNIQUE`, `CHECK`.
- Index SQL pour les recherches frequentes.
- Documentation dans `docs/dossier-projet.md` et `docs/routes-api.md`.

### 3. Avec qui avez-vous travaille ?

J'ai travaille en lien avec les besoins fonctionnels definis dans le cadrage projet. Les choix de base de donnees ont ete faits en fonction des parcours client et salon, et des regles metier a respecter.

### 4. Contexte

Nom de l'entreprise, organisme ou association : Molengeek

Chantier, atelier, service : Projet Cut&Go - Base de donnees

Periode d'exercice : A completer

### 5. Informations complementaires

J'ai retenu une base relationnelle parce que les donnees du projet ont des relations fortes : un salon possede des prestations et des creneaux, une reservation depend d'un client, d'un salon, d'une prestation et d'un creneau. Une solution NoSQL n'etait pas necessaire pour ce MVP.

## Exemple 2 - Developper des composants d'acces aux donnees SQL

### 1. Decrivez les taches ou operations que vous avez effectuees, et dans quelles conditions

Dans le backend, j'ai developpe les composants qui dialoguent avec la base MySQL. La connexion est centralisee dans `backend/config/db.js` avec `mysql2`, ce qui permet aux controllers d'utiliser le meme pool de connexions.

J'ai organise le backend selon une structure simple :

```text
route -> middleware -> controller -> requete SQL -> reponse JSON
```

Les routes sont regroupees par domaine fonctionnel :

- `auth.routes.js` pour l'inscription, la connexion et l'utilisateur courant ;
- `salons.routes.js` pour la recherche, la fiche salon et la modification du salon connecte ;
- `prestations.routes.js` pour la gestion des prestations ;
- `horaires.routes.js` pour les horaires ;
- `creneaux.routes.js` pour les disponibilites ;
- `reservations.routes.js` pour les reservations et statistiques.

Les requetes SQL sont executees dans les controllers. J'ai utilise des requetes preparees avec des parametres `?` afin de reduire le risque d'injection SQL. Par exemple, l'inscription verifie si l'email existe deja avant d'inserer l'utilisateur, et la recherche de salons utilise des filtres controles.

Pour les operations critiques, j'ai utilise des transactions. La creation d'une reservation dans `reservations.controller.js` verrouille le creneau avec `FOR UPDATE`, verifie qu'il est disponible, verifie que la prestation appartient bien au salon, cree la reservation puis rend le creneau indisponible. Si une etape echoue, la transaction est annulee avec `rollback`.

J'ai aussi implemente la logique d'annulation d'une reservation dans une transaction : la reservation est verifiee, la regle des 24 heures est appliquee, le statut passe a `annulee`, puis le creneau redevient disponible.

Les endpoints sont documentes dans `docs/routes-api.md`, avec les methodes HTTP, les corps attendus, les reponses et les codes d'erreur principaux.

### 2. Precisez les moyens utilises

- Node.js et Express.js.
- mysql2 avec pool de connexions.
- Requetes SQL preparees.
- Transactions SQL avec `beginTransaction`, `commit` et `rollback`.
- Documentation API dans `docs/routes-api.md`.
- Tests manuels avec les scenarios de `docs/tests.md`.

### 3. Avec qui avez-vous travaille ?

J'ai travaille en m'appuyant sur les besoins fonctionnels du projet et sur les parcours de demonstration. Les composants d'acces aux donnees ont ete penses pour servir directement les interfaces frontend.

### 4. Contexte

Nom de l'entreprise, organisme ou association : Molengeek

Chantier, atelier, service : Projet Cut&Go - Acces aux donnees

Periode d'exercice : A completer

### 5. Informations complementaires

Les requetes preparees, les transactions et les contraintes SQL se completent. Les contraintes protegent la coherence au niveau de la base, tandis que les controllers gerent les regles metier et les messages d'erreur destines au frontend.

## Exemple 3 - Developper des composants metier cote serveur

### 1. Decrivez les taches ou operations que vous avez effectuees, et dans quelles conditions

J'ai developpe l'API backend Cut&Go avec Node.js et Express. Le fichier `backend/server.js` configure l'application, active CORS, lit les variables d'environnement avec `dotenv`, parse le JSON, expose la route de sante `/api/health`, branche les routes fonctionnelles et gere les erreurs.

J'ai implemente plusieurs composants metier :

- authentification et inscription dans `auth.controller.js` ;
- recherche et modification des salons dans `salons.controller.js` ;
- gestion des prestations dans `prestations.controller.js` ;
- gestion des horaires dans `horaires.controller.js` ;
- gestion des creneaux dans `creneaux.controller.js` ;
- reservation, annulation et statistiques dans `reservations.controller.js`.

Pour l'authentification, les mots de passe sont hashes avec `bcrypt` avant stockage. Lors de la connexion, le mot de passe fourni est compare au hash stocke. Si les identifiants sont corrects, l'API genere un token JWT contenant l'identite publique de l'utilisateur et son role.

J'ai protege les routes sensibles avec `auth.middleware.js`, qui verifie la presence et la validite du token JWT. J'ai aussi utilise `role.middleware.js` pour limiter certaines actions aux clients ou aux salons. Par exemple, un client peut reserver un creneau et consulter ses rendez-vous, tandis qu'un salon peut gerer ses prestations, ses horaires, ses creneaux et ses reservations.

J'ai implemente les regles metier principales :

- un utilisateur possede un role ;
- un client reserve uniquement un creneau disponible ;
- une reservation rend le creneau indisponible ;
- un creneau deja pris provoque une erreur `409` ;
- une annulation est impossible moins de 24 heures avant le rendez-vous ;
- une reservation annulee rend le creneau disponible ;
- un salon ne peut gerer que ses propres donnees ;
- les reservations annulees ne sont pas prises en compte dans le chiffre d'affaires.

La gestion des erreurs est centralisee avec `error.middleware.js`. Les routes inconnues renvoient une reponse JSON `404`, et les erreurs applicatives sont renvoyees avec un format coherent.

J'ai enfin documente les tests fonctionnels et techniques dans `docs/tests.md`, avec les parcours client, salon, securite et roles.

### 2. Precisez les moyens utilises

- Node.js, Express.js.
- bcrypt pour le hashage des mots de passe.
- JWT pour l'authentification.
- Middlewares Express pour l'authentification, les roles et les erreurs.
- MySQL et mysql2 pour les donnees.
- `npm run check` et `node --check` pour les controles syntaxiques.
- `npm audit --omit=dev` pour le controle des dependances.
- Postman ou Thunder Client possible pour tester les endpoints.

### 3. Avec qui avez-vous travaille ?

J'ai travaille en autonomie sur le projet, en suivant une organisation proche d'un contexte professionnel : analyse du besoin, developpement, verification, documentation et deploiement. Les composants backend ont ete developpes en relation directe avec les pages frontend et les user stories.

### 4. Contexte

Nom de l'entreprise, organisme ou association : Molengeek

Chantier, atelier, service : Projet Cut&Go - Developpement backend

Periode d'exercice : A completer

### 5. Informations complementaires

Le backend a ete deploye sur Alwaysdata. Les variables d'environnement de production permettent de configurer la base MySQL, l'origine CORS, le secret JWT et la duree de validite des tokens sans modifier le code source.

---

# Titres, diplomes, CQP, attestations de formation

| Intitule | Autorite ou organisme | Date |
| --- | --- | --- |
| A completer | A completer | A completer |

# Declaration sur l'honneur

Je soussigne(e) A completer, declare sur l'honneur que les renseignements fournis dans ce dossier sont exacts et que je suis l'auteur(e) des realisations jointes.

Fait a : A completer

Le : A completer

Signature :

# Documents illustrant la pratique professionnelle

| Intitule | Emplacement dans le projet |
| --- | --- |
| Brief projet Cut&Go | `brief.md` |
| Cadrage projet | `cadrage_projet.md` |
| Structure du projet | `STRUCTURE_PROJET.md` |
| Documentation API | `docs/routes-api.md` |
| Schema SQL | `database/schema.sql` |
| Donnees de demonstration | `database/seed.sql` |
| Documentation RGPD et accessibilite | `docs/rgpd-accessibilite.md` |
| Checklist de tests | `docs/tests.md` |
| Deploiement Alwaysdata | `docs/deploiement.md` |
| Audit Lighthouse | `docs/lighthouse.md` et `docs/lighthouse-index.json` |
| Frontend HTML/CSS/JS | `frontend/` |
| Backend Express | `backend/` |

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
|-- docs/
|-- frontend/
|   |-- assets/
|   |-- index.html
|   |-- auth.html
|   |-- salon.html
|   |-- mes-rdv.html
|   |-- dashboard.html
```

## Annexe 2 - Routes principales de l'API

- `POST /api/auth/register` : inscription.
- `POST /api/auth/login` : connexion.
- `GET /api/auth/me` : utilisateur connecte.
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
