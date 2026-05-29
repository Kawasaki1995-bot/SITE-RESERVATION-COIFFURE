# Presentation technique - Cut&Go

Ce document sert a expliquer le projet Cut&Go a un groupe ou a un jury. Il reprend ce qui a ete fait jusqu'ici, les choix techniques, et les raisons de ces choix.

Il doit etre mis a jour a chaque avancee importante du projet, au meme titre que le journal de bord. Son objectif est de permettre d'expliquer clairement le projet sans devoir relire tout le code.

## 0. Comment utiliser ce document

Ce fichier est un document vivant.

A chaque nouvelle etape du projet, il faut l'alimenter avec :

- les nouvelles fonctionnalites developpees ;
- les fichiers importants crees ou modifies ;
- les choix techniques faits ;
- les raisons de ces choix ;
- les problemes rencontres ;
- les solutions choisies ;
- les points qu'il faudra savoir expliquer a l'oral.

Il ne remplace pas le journal de bord :

- `journaldebord.md` sert a suivre le travail jour par jour ;
- `docs/presentation-technique.md` sert a comprendre et presenter le projet.

Quand une fonctionnalite est terminee, il faut pouvoir repondre a ces questions :

- Qu'est-ce que cette fonctionnalite fait ?
- Pourquoi l'a-t-on faite ?
- Quels fichiers sont concernes ?
- Quelle technologie est utilisee ?
- Quelle regle metier est appliquee ?
- Comment expliquer cette partie simplement a quelqu'un qui ne connait pas le code ?

## 1. Resume du projet

Cut&Go est une plateforme web de reservation pour salons de coiffure.

L'objectif est de proposer une version simplifiee d'une application comme Planity :

- un client peut chercher un salon ;
- consulter les prestations et les creneaux disponibles ;
- reserver un rendez-vous ;
- annuler un rendez-vous si le delai est superieur a 24 heures ;
- un salon peut gerer ses informations, ses prestations, ses horaires, ses creneaux et consulter ses reservations.

Le projet est construit comme un MVP, c'est-a-dire une premiere version fonctionnelle, simple et defendable.

## 2. Pourquoi un MVP ?

Un MVP permet de se concentrer sur les fonctionnalites essentielles avant d'ajouter des options avancees.

Pour Cut&Go, les priorites sont :

- inscription et connexion ;
- roles client et salon ;
- recherche de salons ;
- gestion des prestations ;
- gestion des creneaux ;
- reservation ;
- annulation avec regle metier ;
- tableau de bord salon simple.

Les fonctionnalites comme le paiement en ligne, les emails, les SMS, les vrais avis clients ou la geolocalisation avancee sont gardees en bonus. Cela evite de rendre le projet trop complexe avant d'avoir une base stable.

## 3. Technologies utilisees

### HTML5

HTML5 sera utilise pour construire les pages du frontend.

Raison du choix :

- c'est la base standard d'une page web ;
- c'est adapte au programme DWWM ;
- cela permet de structurer proprement les pages : accueil, connexion, fiche salon, reservations, dashboard.

### CSS3

CSS3 sera utilise pour le design et le responsive.

Raison du choix :

- permet de creer une interface claire et moderne ;
- permet d'adapter l'application aux mobiles, tablettes et ordinateurs ;
- evite d'utiliser un framework comme Bootstrap ou Tailwind pour garder le projet simple et personnel.

### JavaScript Vanilla

JavaScript Vanilla sera utilise cote frontend pour rendre les pages interactives.

Raison du choix :

- respecte le cadre du projet DWWM ;
- evite d'ajouter React, Vue ou Angular pour le MVP ;
- permet de bien montrer la comprehension du DOM, des evenements, des formulaires et des appels API avec `fetch`.

### Node.js

Node.js est utilise pour executer JavaScript cote serveur.

Raison du choix :

- permet d'utiliser JavaScript pour le frontend et le backend ;
- tres utilise pour creer des API web ;
- fonctionne bien avec Express et MySQL ;
- adapte a une architecture simple de type API REST.

### Express.js

Express.js est le framework backend utilise pour creer l'API.

Raison du choix :

- simplifie la creation des routes HTTP ;
- permet de separer proprement les routes, les controllers et les middlewares ;
- convient bien a un projet DWWM ;
- permet de construire une API REST lisible.

Dans le projet, Express gere par exemple :

- `POST /api/auth/register` pour l'inscription ;
- `POST /api/auth/login` pour la connexion ;
- `GET /api/salons` pour rechercher des salons ;
- `POST /api/reservations` pour reserver un creneau.

### MySQL

MySQL est utilise comme base de donnees relationnelle.

Raison du choix :

- les donnees du projet sont relationnelles : users, salons, prestations, creneaux, reservations ;
- les relations entre tables sont importantes ;
- MySQL permet d'utiliser des cles etrangeres, des contraintes et des index ;
- c'est une technologie attendue dans le programme.

Exemples de relations :

- un utilisateur salon possede un salon ;
- un salon possede plusieurs prestations ;
- un salon possede plusieurs creneaux ;
- une reservation relie un client, un salon, une prestation et un creneau.

### mysql2

`mysql2` est utilise pour connecter Node.js a MySQL.

Raison du choix :

- permet d'utiliser des requetes SQL preparees ;
- fonctionne avec les promesses JavaScript ;
- permet de creer un pool de connexions pour eviter d'ouvrir une connexion manuellement a chaque requete.

Les requetes preparees sont importantes car elles limitent les risques d'injection SQL.

### bcrypt

`bcrypt` est utilise pour hasher les mots de passe.

Raison du choix :

- on ne doit jamais stocker un mot de passe en clair ;
- bcrypt transforme le mot de passe en hash securise ;
- lors de la connexion, on compare le mot de passe saisi avec le hash stocke.

Dans le projet :

- a l'inscription, le mot de passe est hashé avant l'insertion en base ;
- a la connexion, bcrypt verifie si le mot de passe correspond.

### JWT

JWT signifie JSON Web Token. Il est utilise pour gerer l'authentification.

Raison du choix :

- apres connexion, le serveur genere un token ;
- le frontend pourra envoyer ce token dans le header `Authorization` ;
- le backend peut verifier le token pour savoir qui fait la requete ;
- cela permet de proteger les routes sensibles.

Exemple :

```text
Authorization: Bearer token_jwt
```

Dans le projet, JWT sert a proteger :

- les reservations client ;
- la gestion des prestations salon ;
- la gestion des horaires ;
- la gestion des creneaux ;
- les statistiques du salon.

### dotenv

`dotenv` permet de lire les variables d'environnement depuis un fichier `.env`.

Raison du choix :

- evite de mettre les informations sensibles dans le code ;
- permet de configurer la base de donnees, le port, le secret JWT et l'URL du frontend ;
- facilite le passage entre developpement local et production.

Exemples de variables :

```text
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=cut_and_go
JWT_SECRET=cle_secrete
FRONTEND_URL=http://localhost:5500
```

### cors

`cors` permet d'autoriser le frontend a communiquer avec le backend.

Raison du choix :

- le frontend et le backend peuvent tourner sur deux ports differents ;
- le navigateur bloque certaines requetes si CORS n'est pas configure ;
- la variable `FRONTEND_URL` permet de limiter l'origine autorisee.

## 4. Architecture du projet

Le projet est organise en plusieurs parties :

```text
database/
backend/
docs/
```

Le frontend sera ajoute ensuite.

### database/

Ce dossier contient :

- `schema.sql` : creation de la base et des tables ;
- `seed.sql` : donnees de test.

La base contient les tables principales :

- `users` ;
- `salons` ;
- `prestations` ;
- `horaires_ouverture` ;
- `creneaux` ;
- `reservations`.

### backend/

Le backend contient l'API Express.

Organisation :

- `server.js` : point d'entree du serveur ;
- `config/db.js` : connexion MySQL ;
- `routes/` : definition des endpoints ;
- `controllers/` : logique metier ;
- `middlewares/` : verification JWT, roles et erreurs.

Le principe suivi est :

```text
route -> controller -> requete SQL -> reponse JSON
```

Cette separation rend le code plus lisible et plus simple a expliquer.

### docs/

Ce dossier contient la documentation projet :

- user stories ;
- routes API ;
- presentation technique.

Ces fichiers servent a garder une trace des choix et a preparer la presentation.

## 5. Ce qui a ete fait

### Cadrage

Le projet a ete defini avec :

- le nom Cut&Go ;
- le public cible ;
- le perimetre MVP ;
- les fonctionnalites principales ;
- les fonctionnalites bonus ;
- les user stories ;
- les wireframes basse fidelite ;
- la structure cible du projet.

### Base de donnees

La base MySQL a ete preparee avec :

- les tables principales ;
- les cles primaires ;
- les cles etrangeres ;
- les contraintes `UNIQUE` ;
- les contraintes `CHECK` ;
- les index ;
- des donnees de test.

L'objectif est d'avoir une base coherente et relationnelle.

### Backend

Le backend Express a ete mis en place avec :

- inscription ;
- connexion ;
- generation de JWT ;
- middleware d'authentification ;
- middleware de verification des roles ;
- routes publiques pour les salons ;
- routes de gestion des prestations ;
- routes de gestion des horaires ;
- routes de gestion des creneaux ;
- routes de reservation ;
- regle d'annulation plus de 24 heures avant ;
- statistiques simples du salon.

### Securite de base

Plusieurs points de securite ont ete integres :

- mots de passe hashes avec bcrypt ;
- routes sensibles protegees par JWT ;
- verification des roles client et salon ;
- requetes SQL preparees ;
- secret JWT obligatoire ;
- variables sensibles dans `.env` ;
- validations d'entree renforcees ;
- CORS configurable.

## 6. Fonctionnement d'une reservation

Quand un client reserve :

1. Le client envoie `salon_id`, `prestation_id` et `creneau_id`.
2. Le backend verifie que le creneau existe.
3. Le backend verrouille le creneau avec `FOR UPDATE`.
4. Le backend verifie que le creneau est disponible.
5. Le backend verifie que la prestation appartient bien au salon.
6. La reservation est creee.
7. Le creneau passe en `disponible = FALSE`.
8. La transaction est validee.

La transaction est importante pour eviter que deux clients reservent le meme creneau en meme temps.

## 7. Regle d'annulation

Un client peut annuler seulement si le rendez-vous commence dans plus de 24 heures.

Si l'annulation est acceptee :

- la reservation passe au statut `annulee` ;
- la date d'annulation est enregistree ;
- le creneau redevient disponible.

Cette regle correspond a une contrainte metier realiste pour un salon.

## 8. Pourquoi ne pas utiliser React ou un autre framework ?

Pour ce MVP, le choix est de rester en JavaScript Vanilla.

Raisons :

- le projet doit rester adapte au niveau DWWM ;
- cela permet de montrer les bases : HTML, CSS, JS, DOM, fetch ;
- un framework ajouterait de la complexite ;
- le besoin actuel ne justifie pas encore React, Vue ou Angular.

Un framework pourrait etre envisage plus tard si l'application devient plus grande.

## 9. Pourquoi ne pas utiliser MongoDB ?

MongoDB est une base NoSQL, mais Cut&Go contient beaucoup de relations.

Exemples :

- une reservation depend d'un client ;
- une reservation depend d'un salon ;
- une reservation depend d'une prestation ;
- une reservation depend d'un creneau.

MySQL est donc plus adapte car il permet de garantir les relations avec des cles etrangeres.

## 10. Points verifies

Des controles ont ete faits sur le backend :

- verification syntaxique avec `node --check` ;
- audit des dependances avec `npm audit --omit=dev` ;
- aucune vulnerabilite detectee au moment de l'audit ;
- correction des points principaux de securite et de validation.
- tests fonctionnels avec MariaDB et Thunder Client ;
- validation de la connexion a la base ;
- validation de la connexion utilisateur avec JWT ;
- validation d'une route protegee ;
- validation de la creation d'une reservation.

## 11. Ce qui reste a faire

Avant une version complete, il reste a :

- tester les routes salon restantes avec Thunder Client ;
- tester l'annulation de reservation ;
- creer le frontend HTML/CSS/JS ;
- connecter le frontend au backend ;
- ajouter les pages legales ;
- documenter les tests ;
- preparer le README d'installation ;
- preparer la presentation finale ;
- deployer le projet.

## 12. Avancement technique detaille

Cette partie doit etre completee au fur et a mesure de l'avancement du projet.

### 12.1 Cadrage du projet

Ce qui a ete fait :

- choix du nom Cut&Go ;
- definition du public cible ;
- definition du MVP ;
- separation entre fonctionnalites principales et bonus ;
- creation des documents de cadrage ;
- creation des user stories ;
- creation des premiers wireframes basse fidelite ;
- creation de la structure cible du projet.

Pourquoi c'est important :

- le cadrage evite de partir dans trop de directions ;
- le MVP permet de livrer une version realiste ;
- les user stories permettent de penser aux besoins utilisateur avant de coder ;
- la structure cible aide a garder un projet organise.

Phrase pour l'oral :

```text
Avant de coder, nous avons cadre le projet pour definir les utilisateurs, les fonctionnalites essentielles et les limites du MVP. Cela permet d'avoir une application realiste et defendable.
```

### 12.2 Base de donnees

Ce qui a ete fait :

- creation de `database/schema.sql` ;
- creation de `database/seed.sql` ;
- creation des tables principales ;
- ajout des cles primaires ;
- ajout des cles etrangeres ;
- ajout de contraintes ;
- ajout de donnees de test.

Tables principales :

- `users` : comptes client, salon et admin ;
- `salons` : informations des salons ;
- `prestations` : services proposes par les salons ;
- `horaires_ouverture` : horaires configurables par jour ;
- `creneaux` : disponibilites de reservation ;
- `reservations` : rendez-vous pris par les clients.

Pourquoi MySQL est adapte :

- les donnees sont fortement liees entre elles ;
- les cles etrangeres securisent les relations ;
- les contraintes limitent les incoherences ;
- les index ameliorent les recherches.

Phrase pour l'oral :

```text
Nous avons choisi MySQL car le projet repose sur des relations fortes entre les utilisateurs, les salons, les prestations, les creneaux et les reservations.
```

### 12.3 Backend Express

Ce qui a ete fait :

- creation du serveur Express ;
- configuration du JSON ;
- configuration CORS ;
- creation du pool MySQL ;
- separation en routes, controllers et middlewares ;
- creation d'une route de verification `/api/health`.

Pourquoi cette architecture :

- les routes definissent les URL ;
- les controllers contiennent la logique metier ;
- les middlewares gerent les controles communs ;
- la configuration de la base est centralisee ;
- le code est plus simple a lire et a presenter.

Phrase pour l'oral :

```text
Le backend est organise avec une architecture simple : les routes recoivent les requetes, les controllers executent la logique, puis la base MySQL renvoie les donnees.
```

### 12.4 Authentification

Ce qui a ete fait :

- inscription utilisateur ;
- connexion utilisateur ;
- hashage des mots de passe avec bcrypt ;
- generation d'un JWT ;
- route `/auth/me` pour recuperer l'utilisateur connecte.

Pourquoi bcrypt :

- un mot de passe ne doit jamais etre stocke en clair ;
- bcrypt ajoute une protection adaptee aux mots de passe ;
- meme si la base est lue, les mots de passe reels ne sont pas visibles.

Pourquoi JWT :

- le token permet d'identifier l'utilisateur apres connexion ;
- le frontend pourra envoyer le token a chaque requete protegee ;
- le backend peut verifier le role et l'identite de l'utilisateur.

Phrase pour l'oral :

```text
Pour la securite, les mots de passe sont hashes avec bcrypt et les routes privees sont protegees avec un token JWT.
```

### 12.5 Roles client et salon

Ce qui a ete fait :

- ajout d'un role dans la table `users` ;
- middleware de verification des roles ;
- protection des routes client ;
- protection des routes salon.

Pourquoi c'est important :

- un client ne doit pas pouvoir gerer les prestations d'un salon ;
- un salon ne doit pas pouvoir reserver comme un client depuis les routes client ;
- les droits sont controles cote serveur, pas seulement cote frontend.

Phrase pour l'oral :

```text
Les roles permettent de separer les actions autorisees : un client reserve, tandis qu'un salon gere ses prestations, ses creneaux et ses reservations.
```

### 12.6 Recherche et fiche salon

Ce qui a ete fait :

- route publique de recherche de salons ;
- filtres par ville, note minimale, prix maximum et prestation ;
- route publique de fiche salon ;
- route publique pour les prestations d'un salon ;
- route publique pour les horaires ;
- route publique pour les creneaux disponibles.

Pourquoi c'est utile :

- le client peut trouver rapidement un salon ;
- les filtres correspondent aux besoins principaux ;
- la fiche salon centralise les informations avant reservation.

Phrase pour l'oral :

```text
La recherche permet au client de trouver un salon selon sa ville, son budget, la note et le type de prestation recherche.
```

### 12.7 Gestion salon

Ce qui a ete fait :

- modification des informations du salon connecte ;
- creation, modification et desactivation des prestations ;
- mise a jour des horaires d'ouverture ;
- creation et modification des creneaux.

Pourquoi desactiver une prestation au lieu de la supprimer :

- une prestation peut deja etre liee a une reservation ;
- la desactivation evite de casser l'historique ;
- le salon peut retirer une prestation de l'affichage sans perdre les anciennes donnees.

Phrase pour l'oral :

```text
Le salon peut gerer son offre depuis son espace : ses informations, ses prestations, ses horaires et ses creneaux disponibles.
```

### 12.8 Reservation

Ce qui a ete fait :

- reservation d'un creneau disponible par un client ;
- verification de la prestation ;
- verification du creneau ;
- transaction SQL ;
- verrouillage du creneau avec `FOR UPDATE` ;
- passage du creneau en indisponible.

Pourquoi une transaction :

- une reservation touche plusieurs actions ;
- soit tout est valide, soit rien n'est enregistre ;
- cela evite les incoherences.

Pourquoi `FOR UPDATE` :

- il verrouille le creneau pendant la reservation ;
- il evite que deux clients reservent le meme creneau au meme moment.

Phrase pour l'oral :

```text
La reservation utilise une transaction afin de garantir qu'un creneau ne puisse pas etre reserve deux fois.
```

### 12.9 Annulation

Ce qui a ete fait :

- un client peut annuler une reservation ;
- l'annulation est refusee si le rendez-vous commence dans moins de 24 heures ;
- la reservation passe en statut `annulee` ;
- le creneau redevient disponible.

Pourquoi cette regle :

- elle correspond a une contrainte metier realiste ;
- elle protege le salon contre les annulations trop tardives ;
- elle garde une experience claire pour le client.

Phrase pour l'oral :

```text
L'annulation est possible seulement plus de 24 heures avant le rendez-vous, ce qui represente une vraie regle metier.
```

### 12.10 Statistiques salon

Ce qui a ete fait :

- route de chiffre d'affaires du jour ;
- route de chiffre d'affaires de la semaine ;
- route de chiffre d'affaires du mois ;
- exclusion des reservations annulees.

Pourquoi c'est utile :

- le salon peut suivre son activite simplement ;
- cela apporte une premiere valeur au dashboard salon ;
- cela reste simple pour le MVP.

Phrase pour l'oral :

```text
Le dashboard salon inclut des statistiques simples pour suivre le chiffre d'affaires confirme sur la journee, la semaine et le mois.
```

### 12.11 Corrections issues de l'audit

Ce qui a ete corrige :

- suppression du secret JWT par defaut ;
- obligation de definir `JWT_SECRET` ;
- ajout d'un fichier `.env.example` ;
- configuration CORS via `FRONTEND_URL` ;
- correction de la liberation de connexion MySQL ;
- validation renforcee des filtres ;
- validation renforcee des prix ;
- validation des dates, heures et disponibilites des creneaux.

Pourquoi c'est important :

- le projet est plus fiable ;
- les erreurs sont mieux controlees ;
- la configuration est plus propre ;
- les donnees invalides sont refusees plus tot.

Phrase pour l'oral :

```text
Apres audit, nous avons renforce la securite et les validations pour rendre le backend plus propre et plus fiable.
```

### 12.12 Tests backend avec MariaDB et Thunder Client

Ce qui a ete fait :

- lancement de MariaDB en local ;
- execution de `database/schema.sql` pour creer la base et les tables ;
- execution de `database/seed.sql` pour ajouter les donnees de test ;
- test de l'API avec Thunder Client ;
- verification de la route publique `/api/health` ;
- verification de la route publique `/api/salons` ;
- connexion avec le compte client de test ;
- recuperation d'un token JWT ;
- test de la route protegee `/api/auth/me` ;
- creation d'une reservation avec `POST /api/reservations`.

Problemes rencontres :

- l'URL dans Thunder Client ne doit pas contenir le mot `GET` ou `POST` ;
- `npm run dev` doit etre lance dans le dossier `backend` ;
- MariaDB a renvoye une erreur `auth_gssapi_client`, liee au plugin d'authentification de l'utilisateur SQL ;
- la solution a ete de creer un utilisateur SQL dedie au projet : `cutgo_user` ;
- le `JWT_SECRET` a ete confondu avec le token JWT ;
- le token a utiliser est celui renvoye par `/api/auth/login`.

Pourquoi c'est important :

- ces tests prouvent que le backend communique avec une vraie base MariaDB ;
- ils prouvent que l'authentification fonctionne ;
- ils prouvent que les routes protegees refusent les requetes sans token ;
- ils prouvent qu'un client peut reserver un creneau.

Point technique a savoir expliquer :

- `JWT_SECRET` est la cle du serveur pour signer les tokens ;
- le token JWT est genere a la connexion et envoye ensuite dans le header `Authorization` ;
- le header attendu est `Authorization: Bearer token_jwt`.

Phrase pour l'oral :

```text
Nous avons teste le backend avec MariaDB et Thunder Client. Les routes publiques, la connexion, le JWT, une route protegee et la creation d'une reservation fonctionnent avec les donnees de test.
```

## 13. Modele pour ajouter une nouvelle avancee

A chaque nouvelle fonctionnalite importante, ajouter une sous-section avec ce modele :

```text
### X.X Nom de la fonctionnalite

Ce qui a ete fait :

- ...

Fichiers concernes :

- ...

Pourquoi ce choix :

- ...

Point technique a savoir expliquer :

- ...

Phrase pour l'oral :

`...`
```

## 14. Phrase simple pour presenter le projet

Cut&Go est une application web de reservation pour salons de coiffure. J'ai choisi une stack simple et adaptee au programme : HTML, CSS et JavaScript Vanilla pour le frontend, Node.js et Express pour l'API, MySQL pour les donnees relationnelles, bcrypt pour securiser les mots de passe, JWT pour proteger les routes, et dotenv pour separer la configuration du code. L'objectif est de livrer un MVP stable, comprehensible et defendable devant un jury.
