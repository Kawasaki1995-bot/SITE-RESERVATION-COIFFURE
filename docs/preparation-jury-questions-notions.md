# Preparation jury - questions et notions Cut&Go

Ce document sert a verifier que tu comprends ton projet avant la presentation.
L'objectif n'est pas d'apprendre des phrases par coeur, mais de savoir expliquer
simplement ce que fait l'application, pourquoi les choix ont ete faits, et ou
sont les limites du MVP.

## 1. Presentation generale du projet

### Questions possibles

- Peux-tu presenter Cut&Go en une minute ?
- Quel probleme ton application resout-elle ?
- A quels utilisateurs s'adresse le projet ?
- Pourquoi avoir choisi le domaine des salons de coiffure ?
- Quelle est la difference entre Cut&Go et une plateforme complete comme Planity ?
- Qu'est-ce qu'un MVP ?
- Quelles fonctionnalites as-tu volontairement laissees hors MVP ?
- Pourquoi avoir limite le projet aux salons de coiffure ?
- Quelles sont les deux grandes parties de l'application ?
- Quel est le parcours principal d'un client ?
- Quel est le parcours principal d'un salon ?
- Qu'est-ce qui montre que ton projet est utilisable de bout en bout ?
- Quelles evolutions futures seraient les plus logiques ?

### Notions a maitriser

- MVP.
- Parcours utilisateur.
- Role client.
- Role salon.
- Besoin utilisateur.
- Perimetre fonctionnel.
- User stories.
- Fonctionnalites hors perimetre.
- Application web de reservation.

## 2. Architecture du projet

### Questions possibles

- Comment est organise ton projet dans les dossiers ?
- Pourquoi avoir separe `frontend`, `backend`, `database` et `docs` ?
- Quelle est la responsabilite du frontend ?
- Quelle est la responsabilite du backend ?
- Quelle est la responsabilite de la base de donnees ?
- Qu'est-ce qu'une API ?
- Qu'est-ce qu'une API REST ?
- Pourquoi le frontend ne communique-t-il pas directement avec MySQL ?
- Peux-tu expliquer le chemin complet d'une reservation, du clic utilisateur a la base de donnees ?
- Que contient le dossier `routes` ?
- Que contient le dossier `controllers` ?
- Que contient le dossier `middlewares` ?
- A quoi sert `config/db.js` ?
- Pourquoi cette architecture est-elle lisible pour un projet DWWM ?

### Notions a maitriser

- Frontend statique HTML/CSS/JavaScript.
- Backend Node.js.
- Express.js.
- API REST.
- Route.
- Controller.
- Middleware.
- Reponse JSON.
- Code HTTP.
- Separation des responsabilites.
- Architecture client-serveur.
- Connexion a une base MySQL.

## 3. Stack technique

### Questions possibles

- Quelle stack as-tu utilisee ?
- Pourquoi avoir choisi JavaScript Vanilla cote frontend ?
- Pourquoi ne pas avoir utilise React, Vue ou Angular ?
- Pourquoi avoir choisi Node.js et Express ?
- Pourquoi avoir choisi MySQL ?
- A quoi sert `mysql2` ?
- A quoi sert `dotenv` ?
- A quoi sert `cors` ?
- A quoi sert `bcrypt` ?
- A quoi sert `jsonwebtoken` ?
- Comment lances-tu le backend ?
- Comment verifies-tu la syntaxe du backend ?
- Comment sais-tu que tes dependances n'ont pas de vulnerabilite connue ?

### Notions a maitriser

- HTML5.
- CSS3.
- JavaScript Vanilla.
- Node.js.
- Express.
- MySQL / MariaDB.
- npm.
- `package.json`.
- Dependances.
- Script npm.
- `node --check`.
- `npm audit`.
- Variables d'environnement.
- `dotenv`.
- CORS.
- bcrypt.
- JWT.

## 4. Base de donnees

### Questions possibles

- Quelles tables contient ta base de donnees ?
- Pourquoi as-tu une table `users` ?
- Pourquoi as-tu une table `salons` separee de `users` ?
- Quelle relation existe entre `users` et `salons` ?
- Quelle relation existe entre `salons` et `prestations` ?
- Quelle relation existe entre `salons` et `creneaux` ?
- Quelle relation existe entre `reservations`, `users`, `salons`, `prestations` et `creneaux` ?
- Pourquoi utiliser des cles etrangeres ?
- A quoi sert `ON DELETE CASCADE` ?
- Pourquoi certaines suppressions utilisent `ON DELETE RESTRICT` ?
- Pourquoi l'email est-il unique ?
- Pourquoi le champ `role` est-il un `ENUM` ?
- Pourquoi le prix utilise-t-il `DECIMAL` plutot qu'un texte ?
- Pourquoi les notes sont-elles en `DECIMAL(2,1)` ?
- Pourquoi avoir ajoute des index ?
- A quoi servent les contraintes `CHECK` ?
- Pourquoi le couple salon/date/heure d'un creneau est-il unique ?
- Comment expliques-tu le schema de base de donnees au jury ?

### Notions a maitriser

- Base relationnelle.
- Table.
- Colonne.
- Cle primaire.
- Cle etrangere.
- Relation un-a-un.
- Relation un-a-plusieurs.
- Contrainte d'unicite.
- Contrainte `CHECK`.
- Index.
- `AUTO_INCREMENT`.
- `VARCHAR`.
- `TEXT`.
- `DECIMAL`.
- `BOOLEAN`.
- `DATE`.
- `TIME`.
- `DATETIME`.
- `ENUM`.
- `CURRENT_TIMESTAMP`.
- `ON UPDATE CURRENT_TIMESTAMP`.
- Integrite referentielle.
- MCD / MLD.

## 5. Authentification et securite

### Questions possibles

- Comment fonctionne l'inscription ?
- Comment fonctionne la connexion ?
- Pourquoi ne faut-il jamais stocker un mot de passe en clair ?
- Qu'est-ce qu'un hash ?
- Pourquoi utiliser bcrypt ?
- Qu'est-ce qu'un salt ?
- Comment verifies-tu un mot de passe lors du login ?
- Qu'est-ce qu'un JWT ?
- Que contient le JWT dans ton projet ?
- A quel moment le JWT est-il cree ?
- Ou le frontend stocke-t-il le JWT ?
- Pourquoi le frontend envoie-t-il le token dans le header `Authorization` ?
- A quoi ressemble le header d'authentification ?
- Que se passe-t-il si le token est absent ?
- Que se passe-t-il si le token est invalide ?
- Pourquoi `JWT_SECRET` doit-il rester secret ?
- Pourquoi `.env` ne doit-il pas etre versionne ?
- Quelle difference fais-tu entre authentification et autorisation ?
- Quelles routes sont publiques ?
- Quelles routes sont protegees ?
- Comment empeches-tu un client d'acceder au dashboard salon ?
- Comment empeches-tu un salon de reserver comme un client ?
- Quelles protections as-tu contre les injections SQL ?
- Quelles protections as-tu contre le XSS cote frontend ?
- Quelles limites de securite restent dans le MVP ?

### Notions a maitriser

- Authentification.
- Autorisation.
- Hash de mot de passe.
- bcrypt.
- JWT.
- Secret JWT.
- Expiration de token.
- Header HTTP `Authorization`.
- Bearer token.
- `sessionStorage`.
- Middleware d'authentification.
- Middleware de role.
- Code HTTP `401`.
- Code HTTP `403`.
- Requetes preparees.
- Injection SQL.
- XSS.
- Echappement HTML.
- Variables d'environnement.
- Fichier `.env`.

## 6. API et routes

### Questions possibles

- Quelle est l'URL de base de l'API en local ?
- Quelle est l'URL de base de l'API en production ?
- Comment sont formatees les reponses JSON ?
- Comment sont formatees les erreurs JSON ?
- Pourquoi utiliser des codes HTTP adaptes ?
- Quand utilises-tu `200` ?
- Quand utilises-tu `201` ?
- Quand utilises-tu `400` ?
- Quand utilises-tu `401` ?
- Quand utilises-tu `403` ?
- Quand utilises-tu `404` ?
- Quand utilises-tu `409` ?
- Que fait `GET /api/health` ?
- Que fait `POST /api/auth/register` ?
- Que fait `POST /api/auth/login` ?
- Que fait `GET /api/auth/me` ?
- Que fait `GET /api/salons` ?
- Que fait `GET /api/salons/:id` ?
- Que fait `GET /api/salons/me` ?
- Que fait `PUT /api/salons/me` ?
- Que fait `GET /api/salons/:id/prestations` ?
- Que fait `GET /api/prestations/me` ?
- Que fait `POST /api/prestations` ?
- Que fait `PUT /api/prestations/:id` ?
- Que fait `DELETE /api/prestations/:id` ?
- Que fait `GET /api/salons/:id/horaires` ?
- Que fait `PUT /api/horaires/me` ?
- Que fait `GET /api/salons/:id/creneaux` ?
- Que fait `GET /api/creneaux/me` ?
- Que fait `POST /api/creneaux` ?
- Que fait `PUT /api/creneaux/:id` ?
- Que fait `POST /api/reservations` ?
- Que fait `GET /api/reservations/me` ?
- Que fait `PATCH /api/reservations/:id/cancel` ?
- Que fait `GET /api/reservations/salon` ?
- Que fait `GET /api/reservations/salon/stats` ?

### Notions a maitriser

- Endpoint.
- Methode HTTP `GET`.
- Methode HTTP `POST`.
- Methode HTTP `PUT`.
- Methode HTTP `PATCH`.
- Methode HTTP `DELETE`.
- Body JSON.
- Query params.
- Params d'URL.
- Statut HTTP.
- Format de reponse.
- Route publique.
- Route protegee.
- Route reservee a un role.

## 7. Logique metier de reservation

### Questions possibles

- Quelles sont les regles metier d'une reservation ?
- Pourquoi un client doit-il etre connecte pour reserver ?
- Pourquoi seul le role `client` peut-il reserver ?
- Comment verifies-tu qu'un creneau existe ?
- Comment verifies-tu que le creneau appartient bien au salon choisi ?
- Comment verifies-tu qu'une prestation appartient bien au salon choisi ?
- Comment verifies-tu qu'une prestation est active ?
- Pourquoi une reservation rend-elle le creneau indisponible ?
- Comment evites-tu une double reservation ?
- Qu'est-ce qu'une transaction SQL ?
- Pourquoi utiliser `beginTransaction`, `commit` et `rollback` ?
- A quoi sert `FOR UPDATE` ?
- Que se passe-t-il si deux clients reservent le meme creneau en meme temps ?
- Pourquoi liberer le creneau quand une reservation est annulee ?
- Pourquoi l'annulation est-elle interdite moins de 24 heures avant ?
- Comment calcules-tu la limite des 24 heures ?
- Que se passe-t-il si une reservation est deja annulee ?
- Pourquoi les reservations annulees ne comptent-elles pas dans le chiffre d'affaires ?

### Notions a maitriser

- Regle metier.
- Creneau disponible.
- Statut de reservation.
- Transaction.
- Verrouillage de ligne.
- `FOR UPDATE`.
- Commit.
- Rollback.
- Concurrence.
- Conflit `409`.
- Annulation.
- Calcul de date.
- Chiffre d'affaires.

## 8. Recherche, filtres et affichage client

### Questions possibles

- Comment fonctionne la recherche de salons ?
- Quels filtres sont disponibles ?
- Comment filtres-tu par ville ?
- Comment filtres-tu par note minimale ?
- Comment filtres-tu par prix maximum ?
- Comment filtres-tu par prestation ?
- Pourquoi utiliser `LIKE` dans certaines recherches ?
- Pourquoi utiliser `MIN(p.prix)` pour afficher un prix minimum ?
- Pourquoi utiliser `GROUP BY` ?
- Pourquoi utiliser `HAVING` pour le prix maximum ?
- Comment le frontend construit-il les parametres de recherche ?
- Comment les resultats sont-ils affiches ?
- Comment evites-tu d'afficher du HTML dangereux venant de la base ?
- Que se passe-t-il si aucun salon ne correspond ?

### Notions a maitriser

- Formulaire de recherche.
- `URLSearchParams`.
- Query string.
- `fetch`.
- Rendu dynamique.
- `innerHTML`.
- `textContent`.
- `escapeHtml`.
- `LIKE`.
- `LEFT JOIN`.
- `EXISTS`.
- `MIN`.
- `GROUP BY`.
- `HAVING`.
- Tri SQL.

## 9. Dashboard salon

### Questions possibles

- Que peut faire un compte salon dans le dashboard ?
- Comment verifies-tu que l'utilisateur est bien un salon ?
- Comment un salon modifie-t-il ses informations ?
- Que se passe-t-il si le salon n'existe pas encore pour ce compte ?
- Comment un salon ajoute-t-il une prestation ?
- Pourquoi une prestation est-elle desactivee plutot que supprimee ?
- Comment un salon cree-t-il un creneau ?
- Pourquoi imposer des creneaux toutes les 30 minutes ?
- Pourquoi interdire la creation d'un creneau dans le passe ?
- Comment un salon bloque ou rouvre un creneau ?
- Comment les horaires d'ouverture sont-ils sauvegardes ?
- Comment evites-tu deux horaires pour le meme jour ?
- Comment calcules-tu le chiffre d'affaires jour/semaine/mois ?
- Pourquoi les reservations annulees sont-elles ignorees dans les statistiques ?

### Notions a maitriser

- Dashboard.
- Gestion CRUD.
- Soft delete / desactivation.
- Validation de formulaire.
- Heure au format `HH:mm`.
- Creneau de 30 minutes.
- Horaires d'ouverture.
- Jour de semaine.
- `ON DUPLICATE KEY UPDATE`.
- Statistiques SQL.
- `SUM`.
- `CASE WHEN`.
- `COALESCE`.
- `CURDATE`.
- `YEARWEEK`.

## 10. Frontend HTML, CSS et JavaScript

### Questions possibles

- Quelles pages HTML composent le frontend ?
- Comment le frontend sait-il quelle URL d'API utiliser ?
- Pourquoi avoir une fonction `apiRequest` centralisee ?
- Comment le token est-il ajoute automatiquement aux requetes ?
- Pourquoi utiliser `DOMContentLoaded` ?
- Pourquoi utiliser `FormData` ?
- Comment affiches-tu les messages d'erreur ?
- Comment desactives-tu un bouton pendant une requete ?
- Comment geres-tu une image invalide ou absente ?
- Comment formates-tu les prix ?
- Comment formates-tu les dates ?
- Comment formates-tu les heures ?
- Pourquoi utiliser `data-*` dans le HTML ?
- Quelle difference entre `innerHTML` et `textContent` ?
- Quels risques existent quand on utilise `innerHTML` ?
- Comment la navigation change-t-elle selon le role connecte ?

### Notions a maitriser

- HTML semantique.
- CSS responsive.
- JavaScript Vanilla.
- DOM.
- Selecteurs CSS.
- Attributs `data-*`.
- Evenement `submit`.
- `preventDefault`.
- `FormData`.
- `fetch`.
- Promise.
- `async/await`.
- `Promise.all`.
- Gestion d'erreur avec `try/catch` et `.catch`.
- `sessionStorage`.
- Rendu conditionnel.
- Accessibilite de base.
- Responsive design.

## 11. Gestion des erreurs et validations

### Questions possibles

- Quelles validations fais-tu cote backend ?
- Pourquoi ne pas se contenter des validations frontend ?
- Comment verifies-tu une date ?
- Comment verifies-tu une heure ?
- Comment verifies-tu un prix ?
- Comment verifies-tu le role a l'inscription ?
- Comment geres-tu un email deja utilise ?
- Comment geres-tu un creneau deja existant ?
- Comment geres-tu une route introuvable ?
- A quoi sert le middleware d'erreur global ?
- Pourquoi utiliser `next(error)` dans les controllers ?
- Comment le frontend affiche-t-il une erreur renvoyee par l'API ?
- Quelle difference fais-tu entre une erreur utilisateur et une erreur serveur ?

### Notions a maitriser

- Validation cote client.
- Validation cote serveur.
- Message d'erreur.
- Middleware d'erreur.
- `try/catch`.
- `next(error)`.
- Route 404.
- Erreur 500.
- Donnees invalides.
- Conflit.
- `ER_DUP_ENTRY`.

## 12. RGPD, donnees et legal

### Questions possibles

- Quelles donnees personnelles stockes-tu ?
- Pourquoi l'email est-il une donnee personnelle ?
- Pourquoi le nom est-il une donnee personnelle ?
- Quelles pages legales as-tu ajoutees ?
- Que dit ta page de confidentialite ?
- Que dit ta page de mentions legales ?
- Comment limites-tu les donnees collectees ?
- Est-ce que tu stockes des donnees de paiement ?
- Est-ce que tu envoies des emails ou SMS ?
- Comment pourrais-tu ameliorer la conformite RGPD plus tard ?
- Pourquoi le mot de passe n'est-il pas une donnee lisible en base ?

### Notions a maitriser

- RGPD.
- Donnee personnelle.
- Minimisation des donnees.
- Mentions legales.
- Politique de confidentialite.
- Mot de passe hashe.
- Donnees sensibles.
- Droit d'acces.
- Droit de suppression.

## 13. Tests, verification et deploiement

### Questions possibles

- Comment as-tu teste ton backend ?
- Comment as-tu teste ton frontend ?
- Quels parcours manuels as-tu verifies ?
- Comment testerais-tu l'inscription ?
- Comment testerais-tu la connexion ?
- Comment testerais-tu la recherche ?
- Comment testerais-tu la reservation ?
- Comment testerais-tu l'annulation ?
- Comment testerais-tu le dashboard salon ?
- Pourquoi utiliser Postman ou Thunder Client ?
- Comment verifier que l'API repond ?
- A quoi sert `/api/health` ?
- Comment as-tu prepare la base de donnees ?
- A quoi servent `schema.sql` et `seed.sql` ?
- Quelles commandes faut-il lancer pour demarrer le projet en local ?
- Comment as-tu deploye le projet ?
- Pourquoi avoir choisi Alwaysdata ?
- Quelles differences entre local et production ?
- Quelles variables d'environnement sont necessaires en production ?
- Que ferais-tu si la demo ne marche pas le jour du jury ?

### Notions a maitriser

- Test manuel.
- Test API.
- Postman / Thunder Client.
- Endpoint de health check.
- Seed de base de donnees.
- Environnement local.
- Environnement production.
- Deploiement Alwaysdata.
- URL frontend.
- URL API.
- Variables d'environnement.
- Scenario de demonstration.
- Plan B de demonstration.

## 14. Git, documentation et methode projet

### Questions possibles

- Comment as-tu organise ton travail ?
- A quoi sert Git dans ton projet ?
- A quoi sert GitHub ?
- Pourquoi avoir un README ?
- A quoi sert le journal de bord ?
- A quoi sert le cadrage projet ?
- A quoi sert la documentation des routes API ?
- A quoi sert la documentation des tests ?
- Comment as-tu garde une trace de tes choix ?
- Comment as-tu utilise l'IA dans ton projet ?
- Comment peux-tu prouver que tu comprends le code ?
- Si tu devais recommencer, que ferais-tu differemment ?
- Quelle partie t'a le plus appris ?
- Quelle partie a ete la plus difficile ?

### Notions a maitriser

- Git.
- Commit.
- Depot GitHub.
- README.
- Journal de bord.
- Documentation API.
- Cahier de cadrage.
- User stories.
- Scenario de demo.
- Utilisation responsable de l'IA.

## 15. Questions pieges ou de recul

### Questions possibles

- Pourquoi le projet n'utilise-t-il pas un framework frontend moderne ?
- Pourquoi ne pas avoir utilise un ORM comme Prisma ou Sequelize ?
- Pourquoi ne pas avoir implemente de refresh token ?
- Pourquoi stocker le token en `sessionStorage` et non en cookie HTTP-only ?
- Que se passe-t-il si un utilisateur modifie le HTML dans son navigateur ?
- Est-ce grave si le frontend cache un bouton mais que la route backend n'est pas protegee ?
- Comment evites-tu qu'un salon modifie la prestation d'un autre salon ?
- Comment evites-tu qu'un client annule la reservation d'un autre client ?
- Comment evites-tu qu'un salon voie les reservations d'un autre salon ?
- Est-ce que tes controles frontend suffisent pour securiser l'application ?
- Que se passe-t-il si la base de donnees est indisponible ?
- Que se passe-t-il si `JWT_SECRET` manque ?
- Pourquoi le serveur s'arrete si `JWT_SECRET` est absent ?
- Quelles limites vois-tu dans ton systeme de creneaux ?
- Est-ce que les horaires generent automatiquement les creneaux ?
- Pourquoi les notes sont-elles fictives ?
- Pourquoi il n'y a pas d'upload reel d'image ?
- Pourquoi il n'y a pas de paiement ?
- Comment gererais-tu plusieurs employes dans un salon ?
- Comment gererais-tu la duree variable des prestations ?
- Comment rendrais-tu l'application plus accessible ?
- Comment ameliorerais-tu les tests ?
- Quelle est la dette technique principale du projet ?

### Notions a maitriser

- Defense en profondeur.
- Securite cote serveur.
- Limites du MVP.
- Dette technique.
- Arbitrage technique.
- Evolution future.
- Robustesse.
- Scalabilite simple.
- Accessibilite.
- UX.

## 16. Reponses courtes a savoir formuler

### Architecture

Cut&Go est compose d'un frontend statique en HTML, CSS et JavaScript, d'une API
Express et d'une base MySQL. Le frontend affiche les pages et appelle l'API avec
`fetch`. Le backend verifie les donnees, applique les regles metier et dialogue
avec la base.

### Authentification

Quand l'utilisateur se connecte, le backend compare le mot de passe saisi avec le
hash bcrypt en base. Si les identifiants sont bons, il renvoie un JWT. Le
frontend stocke ce token en `sessionStorage` et l'envoie dans le header
`Authorization` pour les routes protegees.

### Roles

Le projet utilise deux roles principaux : `client` et `salon`. Les routes
protegees passent d'abord par un middleware qui verifie le token, puis par un
middleware qui verifie que le role est autorise.

### Reservation

Une reservation cree une ligne dans `reservations` et rend le creneau
indisponible. Ces deux actions sont faites dans une transaction pour eviter un
etat incoherent. Le `FOR UPDATE` verrouille le creneau pendant la verification.

### Annulation

Un client peut annuler seulement si le rendez-vous commence dans plus de 24
heures. L'annulation passe le statut a `annulee`, enregistre `cancelled_at`, et
rend le creneau disponible a nouveau.

### Securite SQL

Les requetes utilisent `pool.execute` avec des `?` et un tableau de valeurs. Cela
evite d'injecter directement les donnees utilisateur dans le SQL.

### Frontend

Le frontend utilise du JavaScript Vanilla. Une fonction `apiRequest` centralise
les appels API, ajoute le token si l'utilisateur est connecte, lit les erreurs et
renvoie les donnees au reste du code.

### Limites du MVP

Le MVP ne gere pas le paiement, les notifications, l'upload reel d'image, les
avis avances, la gestion multi-employes ou la generation automatique complexe de
planning. Ces sujets sont gardes comme evolutions futures.

## 17. Checklist d'auto-evaluation

Coche mentalement chaque ligne. Si tu bloques, reviens au fichier concerne.

- Je sais presenter le projet en moins d'une minute.
- Je sais expliquer le parcours client complet.
- Je sais expliquer le parcours salon complet.
- Je sais expliquer la difference frontend/backend/base de donnees.
- Je sais citer les principales tables SQL.
- Je sais expliquer les relations entre les tables.
- Je sais expliquer bcrypt.
- Je sais expliquer JWT.
- Je sais expliquer un middleware.
- Je sais expliquer les roles client/salon.
- Je sais expliquer une route publique et une route protegee.
- Je sais expliquer `fetch`.
- Je sais expliquer `sessionStorage`.
- Je sais expliquer une requete SQL preparee.
- Je sais expliquer une transaction.
- Je sais expliquer `FOR UPDATE`.
- Je sais expliquer l'annulation a plus de 24 heures.
- Je sais expliquer les codes HTTP principaux.
- Je sais expliquer les validations cote serveur.
- Je sais expliquer les protections XSS simples cote frontend.
- Je sais expliquer les pages legales et le RGPD de base.
- Je sais lancer le projet en local.
- Je sais verifier que l'API fonctionne.
- Je sais faire une demo sans improviser tout le parcours.
- Je sais citer les limites du MVP sans me justifier trop longtemps.
- Je sais expliquer comment j'ai utilise l'IA comme aide et pas comme boite noire.

## 18. Fichiers a relire avant la soutenance

- `README.md` pour le lancement et la vue generale.
- `cadrage_projet.md` pour le perimetre et les choix MVP.
- `database/schema.sql` pour la base de donnees.
- `docs/routes-api.md` pour les endpoints.
- `docs/questions-techniques-jury.md` pour les reponses courtes.
- `docs/tests.md` pour les tests.
- `docs/rgpd-accessibilite.md` pour les points legal/accessibilite.
- `frontend/assets/js/api.js` pour comprendre les appels API.
- `backend/server.js` pour comprendre le point d'entree backend.
- `backend/controllers/reservations.controller.js` pour la logique metier la plus importante.
