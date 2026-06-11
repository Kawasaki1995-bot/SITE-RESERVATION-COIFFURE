# Deploiement Alwaysdata - Cut&Go

Ce document prepare le deploiement du MVP Cut&Go sur Alwaysdata.

L'objectif est d'heberger :

- le frontend statique ;
- l'API Node.js / Express ;
- la base de donnees MySQL.

## 1. Cible de deploiement

Alwaysdata est retenu comme hebergeur principal pour centraliser le projet.

Architecture prevue :

- un site web statique pour le dossier `frontend/` ;
- un site Node.js pour le dossier `backend/` ;
- une base MySQL creee depuis l'administration Alwaysdata ;
- une configuration CORS entre le frontend public et l'API publique.

## 2. Elements a deployer

### Backend

Le backend est une API Node.js / Express situee dans `backend/`.

Commande de demarrage :

```bash
npm start
```

Le script utilise :

```bash
node server.js
```

Variables necessaires sur Alwaysdata :

```env
PORT=3000
FRONTEND_URL=https://url-du-frontend-alwaysdata
DB_HOST=mysql-host-alwaysdata
DB_USER=utilisateur_mysql
DB_PASSWORD=mot_de_passe_mysql
DB_NAME=nom_base_mysql
JWT_SECRET=valeur_longue_et_secrete
JWT_EXPIRES_IN=1d
```

Points importants :

- `JWT_SECRET` ne doit pas rester avec la valeur de developpement ;
- `FRONTEND_URL` doit correspondre a l'URL publique du frontend ;
- le backend utilise deja `cors`, donc le navigateur pourra appeler l'API si cette URL est correcte.

### Base de donnees

La base MySQL doit etre creee dans l'administration Alwaysdata.

Scripts a executer dans l'ordre :

1. `database/schema.sql`
2. `database/seed.sql`

Pour une vraie production, les donnees de demonstration devront etre remplacees par des donnees reelles.

### Frontend

Le frontend est statique et se trouve dans `frontend/`.

Point important : `frontend/assets/js/api.js` contient l'URL de l'API :

```js
const API_BASE_URL = 'http://localhost:3000/api';
```

Avant le deploiement, cette valeur devra pointer vers l'URL publique du backend Alwaysdata :

```js
const API_BASE_URL = 'https://url-du-backend-alwaysdata/api';
```

## 3. Etapes de deploiement Alwaysdata

### 1. Creer la base MySQL

Dans l'administration Alwaysdata :

1. creer une base MySQL ;
2. noter le nom de la base ;
3. noter l'utilisateur MySQL ;
4. noter le mot de passe ;
5. noter l'hote MySQL fourni par Alwaysdata.

Ensuite, importer :

1. `database/schema.sql`
2. `database/seed.sql`

### 2. Deployer le backend Node.js

Sur Alwaysdata :

1. creer un site de type Node.js ;
2. pointer le site vers le dossier `backend/` ;
3. installer les dependances avec `npm install` dans le dossier `backend/` ;
4. definir les variables d'environnement ;
5. utiliser `npm start` comme commande de lancement ;
6. redemarrer le site.

Test attendu :

```text
https://url-du-backend-alwaysdata/api/health
```

La reponse attendue est :

```json
{
  "success": true,
  "message": "API Cut&Go operationnelle"
}
```

### 3. Deployer le frontend statique

Sur Alwaysdata :

1. creer un site statique ;
2. pointer le site vers le dossier `frontend/` ;
3. verifier que `index.html` est accessible ;
4. modifier `frontend/assets/js/api.js` pour utiliser l'URL publique du backend ;
5. tester les pages principales.

### 4. Configurer CORS

Dans les variables du backend :

```env
FRONTEND_URL=https://url-du-frontend-alwaysdata
```

Cette valeur est utilisee dans `backend/server.js` :

```js
app.use(cors({
  origin: corsOrigin
}));
```

Si l'URL ne correspond pas exactement a l'origine du frontend, le navigateur peut bloquer les appels API.

## 4. Checklist production

- Definir un `JWT_SECRET` fort.
- Creer la base MySQL Alwaysdata.
- Importer `database/schema.sql`.
- Importer `database/seed.sql`.
- Configurer `DB_HOST`, `DB_USER`, `DB_PASSWORD` et `DB_NAME`.
- Configurer `FRONTEND_URL` avec l'URL du frontend.
- Modifier `API_BASE_URL` cote frontend.
- Verifier `/api/health`.
- Verifier la connexion client.
- Verifier la recherche salon.
- Verifier une reservation.
- Verifier le dashboard salon.
- Lancer un audit Lighthouse sur l'URL publique.
- Corriger les eventuels problemes critiques.

## 5. Tests apres deploiement

Tests a realiser depuis l'URL publique :

- ouverture de la page d'accueil ;
- recherche d'un salon ;
- affichage d'une fiche salon ;
- creation d'un compte ou connexion ;
- creation d'une reservation ;
- affichage des rendez-vous ;
- connexion salon ;
- affichage du dashboard salon ;
- controle des erreurs dans la console navigateur.

## 6. Phrase pour l'oral

```text
Pour le deploiement, j'ai choisi Alwaysdata afin de centraliser le frontend, l'API Node.js et la base MySQL sur le meme hebergeur. Le frontend statique appelle l'API Express via une URL publique, la base MySQL est configuree avec les variables d'environnement, et CORS limite les appels a l'URL du frontend.
```
