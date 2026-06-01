# Questions techniques jury - Cut&Go

Ce document prepare des reponses courtes pour presenter les choix techniques du projet.

## Quelle est l'architecture du projet ?

Cut&Go est separe en deux parties :

- un frontend statique en HTML, CSS et JavaScript ;
- une API backend Express connectee a une base MySQL.

Le frontend appelle l'API avec `fetch`, et le backend centralise les regles metier : authentification, roles, reservations, annulations, prestations, horaires et creneaux.

## Pourquoi avoir choisi Express ?

Express permet de construire rapidement une API REST lisible, avec une structure simple en routes, controllers et middlewares. C'est adapte au perimetre MVP du projet et facile a expliquer pendant une soutenance.

## Comment fonctionne l'authentification ?

L'utilisateur se connecte avec son email et son mot de passe. Le mot de passe est compare avec un hash bcrypt stocke en base. Si les identifiants sont valides, l'API genere un JWT. Le frontend garde ce token en `sessionStorage` et l'envoie dans le header `Authorization`.

## Comment sont proteges les roles ?

Deux middlewares sont utilises :

- `auth.middleware.js` verifie le JWT et ajoute l'utilisateur a `req.user` ;
- `role.middleware.js` verifie que le role est autorise pour la route.

Par exemple, seul un compte `client` peut reserver un creneau, et seul un compte `salon` peut gerer les prestations, horaires et creneaux.

## Comment eviter une double reservation ?

La creation de reservation utilise une transaction SQL. Le creneau est selectionne avec `FOR UPDATE`, ce qui verrouille la ligne pendant la transaction. Si le creneau est disponible, la reservation est creee puis le creneau passe a `disponible = FALSE`.

## Quelle est la regle d'annulation ?

Un client peut annuler seulement si le rendez-vous commence dans plus de 24 heures. Si le delai est trop court, l'API renvoie une erreur `403`.

## Comment fonctionne la recherche ?

La route `GET /api/salons` accepte des filtres optionnels : ville, note minimale, prix maximum et prestation. Le filtre prestation cherche aussi dans le nom et la description du salon, ce qui permet une recherche naturelle comme `coiffeur` a `Lille`.

## Comment sont gerees les erreurs ?

Les controllers renvoient des erreurs metier avec un code HTTP adapte : `400`, `401`, `403`, `404` ou `409`. Les erreurs non prevues passent par le middleware d'erreur global, qui evite d'exposer des details techniques au frontend.

## Quelles protections contre les injections SQL ?

Les requetes utilisent `pool.execute` de `mysql2` avec des parametres `?`. Les valeurs utilisateur ne sont pas concatenees directement dans les requetes SQL.

## Quelles protections cote frontend ?

Les textes dynamiques affiches dans le HTML sont echappes avec `escapeHtml`. Les URLs d'images sont filtrees avec `safeImageUrl` pour n'accepter que `http` et `https`. Les messages d'erreur et les champs de formulaire utilisent `textContent` quand c'est possible.

## Quelles limites restent dans ce MVP ?

- Pas de paiement en ligne.
- Pas d'email de confirmation.
- Pas de vrai back-office admin.
- Pas de creation automatique de creneaux depuis les horaires.
- Pas encore de deploiement production.

Ces points sont hors MVP mais peuvent etre presentes comme evolutions futures.

## Comment lancer le projet ?

1. Importer `database/schema.sql`.
2. Importer `database/seed.sql`.
3. Configurer `backend/.env`.
4. Lancer `npm install` dans `backend`.
5. Lancer `npm run dev`.
6. Ouvrir `frontend/index.html` ou servir le dossier frontend avec un serveur statique.

## Quels tests ont ete faits ?

- Verification syntaxique backend avec `npm run check`.
- Verification syntaxique des fichiers JavaScript frontend avec `node --check`.
- Audit des dependances backend avec `npm audit --omit=dev`.
- Verification manuelle prevue des parcours client et salon.
