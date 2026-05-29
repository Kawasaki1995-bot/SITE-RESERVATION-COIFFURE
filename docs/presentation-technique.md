# Presentation technique - Cut&Go

Ce document sert a expliquer le projet Cut&Go a un groupe ou a un jury. Il reprend ce qui a ete fait jusqu'ici, les choix techniques, et les raisons de ces choix.

Il doit etre mis a jour a chaque avancee importante du projet, au meme titre que le journal de bord. Son objectif est de permettre d'expliquer clairement le projet sans devoir relire tout le code.

## 0. Comment utiliser ce document

Ce fichier est un document vivant.

Il sert maintenant a deux usages :

- **fiche de revision** : revoir rapidement les notions, les choix techniques, les routes importantes et les phrases a dire a l'oral ;
- **support de presentation technique detaillee** : expliquer ce qui a ete fait, pourquoi ces choix ont ete faits et comment les differentes parties du projet fonctionnent ensemble.

Pour reviser efficacement :

- lire d'abord les sections **0.1**, **0.2**, **0.3** et **0.4** ;
- ensuite relire les sections techniques detaillees a partir de la section **3** ;
- finir avec les questions possibles en section **15**.

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

### 0.1 Fiche de revision express

Cette partie sert a reviser rapidement avant une presentation ou une evaluation.

#### Idee principale du projet

Cut&Go est une application web de reservation pour salons de coiffure. Elle permet a un client de rechercher un salon, consulter ses prestations, reserver un creneau, puis gerer ses rendez-vous. Elle permet aussi a un salon de gerer ses informations, ses prestations, ses horaires, ses creneaux et ses reservations.

#### Stack technique a retenir

| Partie          | Technologie        | Role                                         |
| --------------- | ------------------ | -------------------------------------------- |
| Frontend        | HTML5              | structure des pages                          |
| Frontend        | CSS3               | design et responsive                         |
| Frontend        | JavaScript Vanilla | interaction, DOM, appels API avec `fetch`    |
| Backend         | Node.js            | execution JavaScript cote serveur            |
| Backend         | Express.js         | creation de l'API REST                       |
| Base de donnees | MySQL / MariaDB    | stockage relationnel                         |
| Securite        | bcrypt             | hashage des mots de passe                    |
| Securite        | JWT                | authentification des routes protegees        |
| Config          | dotenv             | variables d'environnement                    |
| Connexion DB    | mysql2             | requetes SQL preparees et pool de connexions |
| Navigateur/API  | cors               | autoriser le frontend a appeler le backend   |

#### Architecture a retenir

```text
frontend -> API Express -> controllers -> MySQL/MariaDB
```

Dans le backend :

```text
route -> middleware -> controller -> requete SQL -> reponse JSON
```

#### Tables principales

| Table                | Role                             |
| -------------------- | -------------------------------- |
| `users`              | comptes client, salon et admin   |
| `salons`             | informations des salons          |
| `prestations`        | services proposes par les salons |
| `horaires_ouverture` | horaires par jour                |
| `creneaux`           | disponibilites reservables       |
| `reservations`       | rendez-vous des clients          |

#### Routes importantes

| Route                           | Methode | Role                                        |
| ------------------------------- | ------- | ------------------------------------------- |
| `/api/health`                   | GET     | verifier que l'API fonctionne               |
| `/api/auth/register`            | POST    | creer un compte                             |
| `/api/auth/login`               | POST    | connecter un utilisateur et recevoir un JWT |
| `/api/auth/me`                  | GET     | recuperer l'utilisateur connecte            |
| `/api/salons`                   | GET     | rechercher des salons                       |
| `/api/salons/:id`               | GET     | consulter une fiche salon                   |
| `/api/salons/:id/prestations`   | GET     | voir les prestations d'un salon             |
| `/api/salons/:id/creneaux`      | GET     | voir les creneaux disponibles               |
| `/api/reservations`             | POST    | reserver un creneau                         |
| `/api/reservations/me`          | GET     | voir ses reservations client                |
| `/api/reservations/:id/cancel`  | PATCH   | annuler une reservation                     |
| `/api/reservations/salon`       | GET     | voir les reservations du salon connecte     |
| `/api/reservations/salon/stats` | GET     | voir le chiffre d'affaires simple           |

#### Regles metier a connaitre

- Un client peut reserver seulement un creneau disponible.
- Une prestation doit appartenir au salon choisi.
- Un creneau reserve devient indisponible.
- Une annulation est possible seulement plus de 24 heures avant le rendez-vous.
- Une reservation annulee rend le creneau a nouveau disponible.
- Un client ne peut pas gerer les prestations d'un salon.
- Un salon ne peut gerer que ses propres informations.
- Les reservations annulees ne comptent pas dans le chiffre d'affaires.

#### Securite a connaitre

- Les mots de passe ne sont jamais stockes en clair.
- `bcrypt` transforme le mot de passe en hash.
- `JWT_SECRET` sert au serveur pour signer et verifier les tokens.
- Le token JWT est renvoye apres connexion.
- Les routes protegees attendent le header `Authorization: Bearer token_jwt`.
- Les roles sont verifies cote serveur avec un middleware.
- Les requetes SQL preparees limitent les injections SQL.
- Les donnees sensibles sont placees dans `.env`.

#### Phrase resume a connaitre par coeur

```text
Cut&Go est un MVP de reservation pour salons de coiffure. Le client peut rechercher un salon et reserver un creneau, tandis que le salon peut gerer ses prestations, ses horaires, ses disponibilites et ses reservations. Le projet utilise une API Express, une base MySQL relationnelle, une authentification JWT et des mots de passe hashes avec bcrypt.
```

### 0.2 Parcours a savoir expliquer

#### Parcours client

1. Le client cree un compte ou se connecte.
2. Le backend verifie ses identifiants.
3. Si la connexion reussit, le backend renvoie un token JWT.
4. Le client recherche un salon avec des filtres.
5. Il consulte la fiche salon, les prestations et les creneaux.
6. Il choisit une prestation et un creneau.
7. Le backend verifie que le creneau est disponible.
8. La reservation est creee et le creneau devient indisponible.
9. Le client peut consulter ses rendez-vous.
10. Il peut annuler si le rendez-vous est dans plus de 24 heures.

#### Parcours salon

1. Le salon cree un compte professionnel ou se connecte.
2. Le backend verifie son role `salon`.
3. Le salon modifie ses informations.
4. Il ajoute ou modifie ses prestations.
5. Il configure ses horaires.
6. Il cree ou modifie ses creneaux.
7. Il consulte les reservations recues.
8. Il consulte un chiffre d'affaires simple jour, semaine et mois.

#### Parcours technique d'une requete protegee

1. L'utilisateur se connecte avec email et mot de passe.
2. Le backend compare le mot de passe avec le hash bcrypt.
3. Le backend genere un JWT contenant l'identite et le role.
4. Le frontend stocke temporairement ce token.
5. Pour une route protegee, le frontend envoie `Authorization: Bearer token_jwt`.
6. Le middleware d'authentification verifie le token.
7. Le middleware de role verifie si l'utilisateur a le droit d'acceder a la route.
8. Le controller execute la logique metier.

### 0.3 Notions techniques a savoir definir simplement

| Notion                   | Definition simple                                                            |
| ------------------------ | ---------------------------------------------------------------------------- |
| API REST                 | ensemble de routes HTTP permettant au frontend et au backend de communiquer  |
| Endpoint                 | URL precise d'une API, par exemple `POST /api/auth/login`                    |
| Middleware               | fonction executee avant le controller pour verifier ou preparer la requete   |
| Controller               | fichier qui contient la logique d'une fonctionnalite                         |
| JWT                      | token signe qui permet d'identifier un utilisateur connecte                  |
| Hash                     | transformation irreversible d'un mot de passe                                |
| Transaction SQL          | groupe d'operations SQL validees ensemble ou annulees ensemble               |
| `FOR UPDATE`             | verrou SQL qui empeche deux reservations simultanees sur le meme creneau     |
| CORS                     | regle navigateur qui autorise ou bloque les appels entre frontend et backend |
| Variable d'environnement | valeur de configuration separee du code, comme un mot de passe ou un secret  |
| Cle etrangere            | lien entre deux tables de base de donnees                                    |
| MVP                      | version minimale mais fonctionnelle d'un produit                             |

### 0.4 Plan oral conseille

Pour presenter le projet de facon claire, suivre cet ordre :

1. Presenter le probleme : simplifier la reservation chez un salon de coiffure.
2. Presenter les deux types d'utilisateurs : client et salon.
3. Expliquer le MVP : reservation, gestion salon, authentification.
4. Presenter la stack : HTML, CSS, JS, Node, Express, MySQL.
5. Expliquer l'architecture : frontend, API, base de donnees.
6. Montrer le modele de donnees : users, salons, prestations, creneaux, reservations.
7. Expliquer l'authentification : bcrypt et JWT.
8. Expliquer la reservation : verification, transaction, verrouillage, indisponibilite.
9. Expliquer l'annulation : regle des 24 heures.
10. Terminer par les tests, les limites actuelles et les ameliorations possibles.

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

- a l'inscription, le mot de passe est hashe avant l'insertion en base ;
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

## 13. Fichiers a savoir expliquer

Cette section sert de fiche de revision par fichier. L'objectif n'est pas de connaitre chaque ligne par coeur, mais de savoir expliquer le role des fichiers principaux.

### 13.1 Fichiers de base de donnees

| Fichier               | Role                         | Ce qu'il faut savoir dire                                                                                 |
| --------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------- |
| `database/schema.sql` | cree la structure de la base | il definit les tables, les cles primaires, les cles etrangeres, les contraintes et les index              |
| `database/seed.sql`   | ajoute des donnees de test   | il permet de tester rapidement les routes avec des clients, salons, prestations, creneaux et reservations |

Explication simple :

```text
Le schema SQL pose les fondations de la base de donnees, tandis que le seed permet d'avoir des donnees realistes pour tester l'application sans tout creer a la main.
```

### 13.2 Fichiers backend principaux

| Fichier ou dossier                        | Role                     | Ce qu'il faut savoir dire                                                                   |
| ----------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------- |
| `backend/server.js`                       | point d'entree de l'API  | il configure Express, CORS, JSON, les routes et les middlewares d'erreur                    |
| `backend/config/db.js`                    | connexion a MySQL        | il cree un pool de connexions reutilisable                                                  |
| `backend/routes/`                         | definition des endpoints | chaque fichier regroupe les routes d'une ressource                                          |
| `backend/controllers/`                    | logique metier           | les controllers verifient les donnees, executent les requetes SQL et renvoient les reponses |
| `backend/middlewares/auth.middleware.js`  | verification JWT         | il verifie si l'utilisateur est connecte                                                    |
| `backend/middlewares/role.middleware.js`  | verification des roles   | il verifie si l'utilisateur a le bon role                                                   |
| `backend/middlewares/error.middleware.js` | gestion des erreurs      | il centralise les erreurs pour renvoyer une reponse propre                                  |
| `backend/.env.example`                    | exemple de configuration | il liste les variables necessaires sans exposer les secrets reels                           |

Explication simple :

```text
Le backend est separe en routes, controllers et middlewares pour eviter d'avoir toute la logique dans un seul fichier. Cela rend le code plus lisible, plus testable et plus simple a presenter.
```

### 13.3 Documents projet

| Fichier                          | Role                                          |
| -------------------------------- | --------------------------------------------- |
| `brief.md`                       | vision globale du projet                      |
| `cadrage_projet.md`              | perimetre MVP, choix fonctionnels et limites  |
| `docs/user-stories.md`           | besoins utilisateur et criteres d'acceptation |
| `docs/routes-api.md`             | contrat des endpoints de l'API                |
| `journaldebord.md`               | suivi chronologique du travail                |
| `docs/presentation-technique.md` | support de revision et presentation technique |

Point a savoir expliquer :

```text
Les documents ne sont pas seulement administratifs : ils servent a garder une coherence entre le besoin utilisateur, la base de donnees, l'API et la presentation finale.
```

## 14. Questions possibles et reponses courtes

### Pourquoi avoir choisi MySQL ?

Parce que les donnees sont relationnelles. Une reservation depend d'un client, d'un salon, d'une prestation et d'un creneau. MySQL permet de garantir ces liens avec des cles etrangeres.

### Pourquoi avoir choisi Express ?

Express permet de creer rapidement une API REST claire. Il est leger, simple a comprendre et adapte a une architecture routes/controllers/middlewares.

### Pourquoi ne pas stocker les mots de passe en clair ?

Parce qu'en cas de fuite de base de donnees, les mots de passe seraient directement lisibles. Avec bcrypt, on stocke seulement un hash.

### Difference entre `JWT_SECRET` et token JWT ?

`JWT_SECRET` est la cle privee du serveur, stockee dans `.env`. Le token JWT est la valeur envoyee au client apres connexion. Le client utilise le token, mais ne connait jamais le secret.

### Pourquoi verifier les roles cote serveur ?

Parce que le frontend peut etre modifie par un utilisateur. Les vraies autorisations doivent donc etre controlees par le backend.

### Pourquoi utiliser une transaction pour reserver ?

Une reservation modifie plusieurs donnees : elle cree une reservation et rend un creneau indisponible. La transaction garantit que tout est valide ensemble, ou que rien n'est enregistre en cas d'erreur.

### Pourquoi utiliser `FOR UPDATE` ?

Pour verrouiller le creneau pendant la reservation. Cela evite que deux clients reservent le meme creneau au meme moment.

### Pourquoi desactiver une prestation au lieu de la supprimer ?

Parce qu'une prestation peut deja etre liee a une ancienne reservation. La desactivation garde l'historique sans afficher la prestation comme disponible.

### Comment fonctionne une route protegee ?

Le frontend envoie un token dans le header `Authorization`. Le middleware verifie le token, recupere l'utilisateur, puis le middleware de role verifie si l'action est autorisee.

### Qu'est-ce qui prouve que le backend fonctionne ?

Les tests avec MariaDB et Thunder Client ont valide `/api/health`, la recherche des salons, la connexion, le JWT, une route protegee et la creation d'une reservation.

### Quelles sont les limites actuelles du MVP ?

Le paiement, les emails, les SMS, les vrais avis clients, l'upload reel d'images, la geolocalisation avancee et une interface admin complete sont hors MVP.

### Quelle amelioration serait prioritaire ensuite ?

La priorite suivante est de creer le frontend HTML/CSS/JavaScript, puis de le connecter a l'API pour tester les parcours complets client et salon.

## 15. Deroule detaille pour presentation orale

Cette partie peut servir de script. Il ne faut pas la lire mot a mot, mais elle aide a structurer l'explication.

### Introduction

```text
Le projet s'appelle Cut&Go. C'est une plateforme de reservation pour salons de coiffure. L'objectif est de proposer une version MVP d'une application de prise de rendez-vous, avec un parcours client et un parcours salon.
```

### Besoin utilisateur

```text
Le client a besoin de trouver rapidement un salon, voir les prestations et reserver un creneau disponible. De son cote, le salon a besoin de gerer ses informations, ses prestations, ses disponibilites et ses reservations.
```

### Choix du MVP

```text
Nous avons volontairement limite le projet a un MVP. Le but est d'avoir une base stable et defendable avant d'ajouter des fonctionnalites plus avancees comme le paiement, les notifications ou les vrais avis clients.
```

### Architecture

```text
L'application est organisee avec un frontend HTML, CSS et JavaScript Vanilla, un backend Node.js avec Express, et une base de donnees MySQL. Le frontend communique avec le backend par des routes API, et le backend interroge la base de donnees.
```

### Base de donnees

```text
La base est relationnelle. Elle contient les utilisateurs, les salons, les prestations, les horaires, les creneaux et les reservations. Les cles etrangeres permettent de garder des liens coherents entre ces tables.
```

### Authentification

```text
Pour l'authentification, les mots de passe sont hashes avec bcrypt. Quand l'utilisateur se connecte, le backend genere un token JWT. Ce token est ensuite envoye dans les routes protegees pour identifier l'utilisateur.
```

### Reservation

```text
La reservation est une partie importante du projet. Le backend verifie que le creneau existe, qu'il est disponible et que la prestation appartient bien au salon. Ensuite il cree la reservation et rend le creneau indisponible.
```

### Annulation

```text
Pour l'annulation, une regle metier a ete ajoutee : le client peut annuler seulement si le rendez-vous commence dans plus de 24 heures. Si l'annulation est acceptee, la reservation passe en statut annulee et le creneau redevient disponible.
```

### Securite

```text
Les points de securite principaux sont le hashage des mots de passe, les routes protegees par JWT, la verification des roles, les requetes SQL preparees et l'utilisation de variables d'environnement pour les informations sensibles.
```

### Tests

```text
Le backend a ete teste avec une vraie base MariaDB et Thunder Client. Les tests ont valide les routes publiques, la connexion, la recuperation du token JWT, une route protegee et la creation d'une reservation.
```

### Conclusion

```text
Cut&Go est donc une base de MVP fonctionnelle pour la reservation de coiffure. Le backend est structure, la base de donnees est coherente, les principales regles metier sont presentes, et la prochaine etape logique est la finalisation du frontend.
```

## 16. Modele pour ajouter une nouvelle avancee

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

## 17. Phrase simple pour presenter le projet

Cut&Go est une application web de reservation pour salons de coiffure. J'ai choisi une stack simple et adaptee au programme : HTML, CSS et JavaScript Vanilla pour le frontend, Node.js et Express pour l'API, MySQL pour les donnees relationnelles, bcrypt pour securiser les mots de passe, JWT pour proteger les routes, et dotenv pour separer la configuration du code. L'objectif est de livrer un MVP stable, comprehensible et defendable devant un jury.
