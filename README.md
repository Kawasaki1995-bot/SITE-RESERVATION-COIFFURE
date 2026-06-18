# Cut&Go

Application MVP de reservation de rendez-vous coiffure pour clients et salons.

## Prerequis

- Node.js 18 ou plus
- MySQL 8 ou compatible
- Un navigateur moderne

## Installation

1. Creer la base de donnees et les tables :

```bash
mysql -u root -p < database/schema.sql
```

2. Ajouter les donnees de demonstration :

```bash
mysql -u root -p < database/seed.sql
```

3. Installer les dependances backend :

```bash
cd backend
npm install
```

4. Copier `backend/.env.example` vers `backend/.env`, puis adapter les valeurs MySQL et JWT.

5. Lancer l'API :

```bash
cd backend
npm run dev
```

6. Ouvrir le frontend depuis `frontend/index.html` ou via un serveur statique local.

## Deploiement

Le projet a ete deploye sur Alwaysdata.

URL de production :

- Frontend : `https://cutandgo.alwaysdata.net`
- API backend : `https://cutandgo.alwaysdata.net/api`
- Test API : `https://cutandgo.alwaysdata.net/api/health`

La procedure et les points de verification sont documentes dans `docs/deploiement.md`.

## Variables d'environnement

```env
PORT=3000
FRONTEND_URL=http://localhost:5500
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=cut_and_go
JWT_SECRET=une_valeur_longue_et_secrete
JWT_EXPIRES_IN=1d
```

## Comptes de test

Mot de passe commun : `Password123!`

| Role | Email |
| --- | --- |
| Admin | `admin@cutandgo.test` |
| Client | `alice.client@cutandgo.test` |
| Client | `nadia.client@cutandgo.test` |
| Salon | `contact@salon-elegance.test` |
| Salon | `contact@studio-barber.test` |
| Salon | `contact@maison-boucles.test` |
| Salon | `contact@lille-coiffure.test` |
| Salon | `contact@barbier-vieux-lille.test` |

## Scenario de demonstration

1. Se connecter avec `alice.client@cutandgo.test`.
2. Rechercher un salon a Lille avec le mot `coiffeur`, ou un salon a Bruxelles.
3. Ouvrir une fiche salon, choisir une prestation et un creneau.
4. Confirmer la reservation, puis verifier la disparition du creneau reserve.
5. Aller dans `Mes RDV` et tester l'annulation si le rendez-vous respecte la regle des 24 heures.
6. Se connecter avec `contact@salon-elegance.test`.
7. Ouvrir le dashboard salon, consulter les reservations, ajouter une prestation, creer un creneau et modifier les horaires.
8. Se connecter avec `admin@cutandgo.test`.
9. Ouvrir `admin.html`, verifier la liste des comptes, modifier un statut puis le retablir.
10. Ouvrir `compte.html` et modifier le nom ou l'adresse du compte connecte.

## Mise a jour de la base existante

Si une base existe deja, appliquer la migration avant de tester l'admin et la page compte :

```bash
mysql -u root -p cut_and_go < database/migrations/2026-06-18-admin-account-settings.sql
```

## Verification

```bash
cd backend
npm run check
npm audit --omit=dev
```

Pour le frontend, les fichiers JavaScript peuvent etre verifies avec :

```bash
Get-ChildItem -Recurse -File frontend\assets\js -Include *.js | ForEach-Object { node --check $_.FullName }
```
