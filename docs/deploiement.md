# Deploiement - Cut&Go

Ce document prepare le deploiement du MVP Cut&Go.

## 1. Etat actuel

Le projet est pret pour une presentation locale.

Le deploiement production n'est pas encore realise. Les cases suivantes restent donc a faire dans `TODO_PROJET.md` :

- faire un audit Lighthouse complet ;
- deployer l'application ;
- tester l'application en production.

## 2. Elements a deployer

### Backend

Le backend est une API Node.js / Express situee dans `backend/`.

Variables necessaires :

```env
PORT=3000
FRONTEND_URL=https://url-du-frontend
DB_HOST=host_mysql
DB_USER=utilisateur_mysql
DB_PASSWORD=mot_de_passe_mysql
DB_NAME=cut_and_go
JWT_SECRET=valeur_longue_et_secrete
JWT_EXPIRES_IN=1d
```

### Base de donnees

Scripts a executer dans l'ordre :

1. `database/schema.sql`
2. `database/seed.sql`

Pour une vraie production, il faudra remplacer les donnees de demonstration par des donnees reelles.

### Frontend

Le frontend est statique et se trouve dans `frontend/`.

Point important : `frontend/assets/js/api.js` contient l'URL de l'API :

```js
const API_BASE_URL = 'http://localhost:3000/api';
```

Avant de deployer le frontend, cette valeur devra pointer vers l'URL publique du backend.

## 3. Options simples de deploiement

Pour un MVP DWWM, une option simple serait :

- backend Node.js sur Render, Railway ou un VPS ;
- base MySQL sur un service compatible MySQL ;
- frontend statique sur Netlify, Vercel, GitHub Pages ou l'hebergeur du backend.

## 4. Checklist production

- Definir un `JWT_SECRET` fort.
- Configurer `FRONTEND_URL` avec l'URL du frontend.
- Importer le schema SQL.
- Importer ou creer les donnees utiles.
- Modifier `API_BASE_URL` cote frontend.
- Verifier la connexion client.
- Verifier la recherche salon.
- Verifier une reservation.
- Verifier le dashboard salon.
- Lancer un audit Lighthouse.
- Corriger les eventuels problemes critiques.

## 5. Phrase pour l'oral

```text
Le MVP est pret et teste localement. Le deploiement est identifie comme derniere etape externe : il faudra configurer une base MySQL distante, heberger l'API Node.js, mettre a jour l'URL de l'API cote frontend, puis refaire les tests sur l'URL de production.
```
