# Deploiement Alwaysdata - Cut&Go

Ce document decrit le deploiement du MVP Cut&Go sur Alwaysdata.

Etat actuel : le deploiement a ete effectue sur Alwaysdata.

URL a renseigner dans le dossier final :

- frontend : `https://cutandgo.alwaysdata.net`
- backend API : `https://cutandgo.alwaysdata.net/api`
- test API health : `https://cutandgo.alwaysdata.net/api/health`

L'objectif du deploiement est d'heberger :

- le frontend statique ;
- l'API Node.js / Express ;
- la base de donnees MySQL.

## 1. Architecture de production

Alwaysdata est utilise comme hebergeur principal pour centraliser le projet.

Architecture retenue :

- un site web statique pour le dossier `frontend/` ;
- un site Node.js pour le dossier `backend/` ;
- une base MySQL creee depuis l'administration Alwaysdata ;
- une configuration CORS entre le frontend public et l'API publique.

Le frontend appelle l'API Express. L'API communique avec la base MySQL avec les
variables d'environnement configurees sur Alwaysdata.

## 2. Backend

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
FRONTEND_URL=https://cutandgo.alwaysdata.net
DB_HOST=mysql-host-alwaysdata
DB_USER=utilisateur_mysql
DB_PASSWORD=mot_de_passe_mysql
DB_NAME=nom_base_mysql
JWT_SECRET=valeur_longue-et-secrete
JWT_EXPIRES_IN=1d
```

Points importants :

- `JWT_SECRET` doit etre une valeur forte et differente de la valeur locale ;
- `FRONTEND_URL` doit correspondre exactement a l'origine publique du frontend ;
- les identifiants MySQL sont configures cote hebergeur, pas dans le code source ;
- le fichier `.env` local ne doit pas etre envoye dans Git.

Test attendu :

```text
GET https://cutandgo.alwaysdata.net/api/health
```

Reponse attendue :

```json
{
  "success": true,
  "message": "API Cut&Go operationnelle"
}
```

## 3. Base de donnees

La base MySQL a ete creee depuis l'administration Alwaysdata.

Scripts utilises :

1. `database/schema.sql`
2. `database/seed.sql`

Pour une base deja existante, ne pas reimporter `schema.sql` sans sauvegarde car il supprime et recree les tables. Utiliser plutot les migrations :

```bash
mysql -u utilisateur_mysql -p nom_base_mysql < database/migrations/2026-06-18-admin-account-settings.sql
```

Cette migration ajoute les champs `adresse` et `statut` dans `users`, ajoute l'index du statut si besoin, et cree le compte `admin@cutandgo.test` s'il n'existe pas.

Le fichier `schema.sql` cree les tables principales :

- `users` ;
- `salons` ;
- `prestations` ;
- `horaires_ouverture` ;
- `creneaux` ;
- `reservations`.

Le fichier `seed.sql` ajoute des donnees de demonstration pour tester les parcours
client et salon.

Pour une vraie application commerciale, ces donnees de demonstration devraient
etre remplacees par des donnees reelles.

## 4. Frontend

Le frontend est statique et se trouve dans `frontend/`.

Le fichier `frontend/assets/js/api.js` ne contient plus une URL API locale codee
en dur. Il utilise une fonction de resolution :

- si une URL est configuree via `window.CUTANDGO_API_BASE_URL`, elle est utilisee ;
- sinon, une balise meta `api-base-url` peut fournir l'URL ;
- si la page est ouverte en local, l'API locale `http://localhost:3000/api` est utilisee ;
- en production, le frontend appelle `/api` sur la meme origine :
  `https://cutandgo.alwaysdata.net/api`.

Exemple de configuration possible dans une page HTML si le frontend et le backend
sont sur deux domaines differents :

```html
<meta name="api-base-url" content="https://cutandgo.alwaysdata.net/api">
```

Cette solution evite de modifier directement le JavaScript a chaque changement
d'environnement.

## 5. CORS

Le backend lit l'origine autorisee depuis la variable :

```env
FRONTEND_URL=https://cutandgo.alwaysdata.net
```

Cette valeur est utilisee dans `backend/server.js` avec `cors`.

Si l'URL ne correspond pas exactement a l'origine du frontend, le navigateur peut
bloquer les appels API.

## 6. Checklist de verification production

- `JWT_SECRET` fort configure sur Alwaysdata.
- Base MySQL creee.
- `database/schema.sql` importe.
- `database/seed.sql` importe.
- `DB_HOST`, `DB_USER`, `DB_PASSWORD` et `DB_NAME` configures.
- `FRONTEND_URL` configure avec l'URL publique du frontend.
- URL API configuree via meme origine, variable globale ou balise meta.
- `/api/health` verifie.
- Connexion client verifiee.
- Recherche salon verifiee.
- Reservation verifiee.
- Annulation verifiee si la regle des 24 heures le permet.
- Dashboard salon verifie.
- Page admin verifiee avec `admin@cutandgo.test`.
- Restriction/reactivation d'un compte verifiee.
- Page `Mon compte` verifiee avec modification du nom et de l'adresse.
- Console navigateur controlee.
- Audit Lighthouse a refaire sur l'URL publique si possible.

## 7. Tests apres deploiement

Tests a realiser ou a confirmer depuis l'URL publique :

- ouverture de la page d'accueil ;
- recherche d'un salon ;
- affichage d'une fiche salon ;
- connexion avec un compte client ;
- creation d'une reservation ;
- affichage des rendez-vous ;
- connexion avec un compte salon ;
- affichage du dashboard salon ;
- creation ou modification d'une prestation ;
- creation ou blocage d'un creneau ;
- connexion avec un compte admin ;
- affichage de la liste des comptes ;
- restriction puis reactivation d'un compte de test ;
- modification du nom ou de l'adresse depuis `compte.html` ;
- controle des erreurs dans la console navigateur.

## 9. Pourquoi une modification locale n'apparait pas en ligne

Le site de production Alwaysdata utilise ses propres fichiers et sa propre base MySQL. Une modification faite en local ne se voit en ligne que si :

- les fichiers frontend sont redeployes dans le dossier public ;
- les fichiers backend sont redeployes dans le dossier Node.js ;
- les dependances sont installees si `package.json` a change ;
- l'application Node.js est redemarree ;
- les migrations SQL sont appliquees sur la base de production.

Pour les ajouts admin et compte, il faut donc deployer le code et executer `database/migrations/2026-06-18-admin-account-settings.sql` sur la base Alwaysdata.

## 10. Phrase pour l'oral

```text
J'ai deploye Cut&Go sur Alwaysdata afin d'avoir le frontend, l'API Node.js et la
base MySQL accessibles en ligne. Le backend utilise des variables
d'environnement pour la base de donnees, le JWT et CORS. Le frontend appelle
l'API publique, et j'ai conserve une configuration compatible avec le
developpement local.
```
