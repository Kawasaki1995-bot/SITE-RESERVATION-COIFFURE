# Rapport d'analyse du projet Cut&Go

Date d'analyse : 16/06/2026

Ce rapport s'appuie sur `docs/contexte.md`. Le projet est analyse comme un projet
de fin de formation DWWM a presenter devant jury dans environ trois semaines.

L'objectif n'est pas d'ajouter de la complexite, mais d'identifier ce qui doit
etre corrige, clarifie ou prepare pour que le projet reste fonctionnel,
defendable et comprehensible a ton niveau.

## 1. Synthese generale

Cut&Go est un projet coherent pour une soutenance DWWM. Le perimetre est clair :
une application de reservation de rendez-vous pour salons de coiffure, avec deux
roles principaux :

- client ;
- salon.

La stack technique correspond bien a une formation DWWM :

- HTML ;
- CSS ;
- JavaScript Vanilla ;
- Node.js ;
- Express ;
- MySQL / MariaDB ;
- JWT ;
- bcrypt.

Le projet couvre les attendus principaux :

- authentification ;
- separation des roles ;
- recherche de salons ;
- fiche salon ;
- prestations ;
- creneaux ;
- reservation ;
- annulation ;
- dashboard salon ;
- base de donnees relationnelle ;
- documentation technique ;
- pages RGPD et mentions legales ;
- preparation de tests et de scenario de demonstration.
- deploiement sur Alwaysdata.

Le projet donne une impression globalement professionnelle, mais il faut faire
attention a un point important : comme indique dans `docs/contexte.md`, il faut
que tu puisses expliquer ce qui est fait sans donner l'impression que l'IA a
construit un projet trop avance pour toi.

La priorite n'est donc pas d'ajouter beaucoup de nouvelles fonctionnalites. La
priorite est de stabiliser, nettoyer et apprendre a expliquer.

## 2. Points forts du projet

### 2.1 Perimetre MVP bien defini

Le projet ne cherche pas a copier toute une plateforme comme Planity. Le MVP est
limite aux fonctionnalites essentielles :

- chercher un salon ;
- reserver un creneau ;
- gerer les rendez-vous ;
- gerer le salon cote professionnel.

C'est un bon choix pour le jury, car tu peux expliquer que tu as volontairement
limite le perimetre pour rester realiste.

### 2.2 Architecture backend claire

Le backend suit une organisation lisible :

```text
route -> middleware -> controller -> requete SQL -> reponse JSON
```

Les fichiers sont separes par responsabilite :

- `routes/` pour declarer les endpoints ;
- `controllers/` pour la logique ;
- `middlewares/` pour l'authentification et les roles ;
- `config/db.js` pour la connexion MySQL.

C'est une architecture classique et defendable devant un jury DWWM.

### 2.3 Securite de base presente

Le projet contient plusieurs mesures importantes :

- mots de passe hashes avec `bcrypt` ;
- JWT obligatoire pour les routes protegees ;
- verification du role client ou salon ;
- requetes SQL preparees avec `mysql2` ;
- fichier `.env` ignore par Git ;
- absence de `JWT_SECRET` par defaut dans le backend.

Ces points sont tres bons pour une soutenance.

### 2.4 Logique metier de reservation serieuse

La creation de reservation utilise une transaction SQL et un verrouillage du
creneau avec `FOR UPDATE`. Cela evite qu'un meme creneau soit reserve deux fois
en meme temps.

C'est un point un peu avance, mais il reste explicable simplement :

```text
Quand un client reserve, je bloque temporairement le creneau en base pendant la
verification. Si le creneau est disponible, je cree la reservation et je le rends
indisponible. Sinon, je renvoie une erreur.
```

### 2.5 Documentation deja bien avancee

Le projet contient beaucoup de documents utiles :

- `README.md` ;
- `cadrage_projet.md` ;
- `TODO_PROJET.md` ;
- `journaldebord.md` ;
- `docs/routes-api.md` ;
- `docs/tests.md` ;
- `docs/rgpd-accessibilite.md` ;
- `docs/questions-techniques-jury.md` ;
- `docs/presentation-technique.md` ;
- `docs/deploiement.md`.

Pour un jury, c'est positif : cela montre une demarche projet, pas seulement du
code.

## 3. Verifications realisees pendant l'analyse

### 3.1 Backend

Commande executee dans `backend/` :

```bash
npm run check
```

Resultat : OK. Les fichiers backend passent la verification syntaxique Node.js.

### 3.2 Audit des dependances

Commande executee dans `backend/` :

```bash
npm audit --omit=dev
```

Resultat : OK, 0 vulnerabilite signalee.

### 3.3 Frontend

Les fichiers JavaScript du frontend ont ete verifies avec `node --check`.

Resultat : OK. Aucun probleme de syntaxe detecte.

### 3.4 Etat Git a verifier avant rendu

Le projet contient des documents et fichiers modifies pendant la finalisation. Il
faudra verifier avant rendu que tout ce qui doit etre conserve est bien commit,
et que les fichiers sensibles ne sont pas ajoutes.

Points a controler :

- ne pas versionner `backend/.env` ;
- ne pas versionner `backend/node_modules` ;
- commit les documents ajoutes ou mis a jour ;
- garder une trace claire des changements lies au deploiement Alwaysdata.

## 4. Corrections prioritaires avant jury

### Priorite 1 - Verifier les URL de production dans la documentation

Le deploiement Alwaysdata a ete effectue. Il faut maintenant renseigner les URL
exactes dans les documents qui seront remis ou utilises pour l'oral :

- URL du frontend : `https://cutandgo.alwaysdata.net` ;
- URL de l'API backend : `https://cutandgo.alwaysdata.net/api` ;
- URL de test : `https://cutandgo.alwaysdata.net/api/health`.

Action conseillee :

- verifier que ces URL sont bien a jour dans `README.md`,
  `docs/deploiement.md` et `docs/routes-api.md` ;
- verifier que le frontend appelle bien l'API publique ;
- garder une phrase simple pour l'oral sur Alwaysdata.

Pourquoi c'est important :

- eviter une documentation incomplete ;
- montrer au jury que la documentation est a jour.

### Priorite 2 - Finaliser ou clarifier les maquettes Figma

Dans `TODO_PROJET.md`, les maquettes Figma desktop et mobile ne sont pas cochees.

Action conseillee :

- soit finaliser les maquettes ;
- soit expliquer clairement que les wireframes et l'integration HTML/CSS ont pris
  le relais ;
- soit ajouter des captures d'ecran propres dans le dossier professionnel.

Pourquoi c'est important :

- le programme DWWM valorise la phase de conception ;
- le jury peut demander comment tu es passe du besoin a l'interface.

### Priorite 3 - Consolider les tests de production

Le deploiement a ete effectue sur Alwaysdata. Il faut maintenant garder une trace
claire des tests realises en ligne.

Action conseillee :

- tester au minimum :
  - page d'accueil ;
  - connexion ;
  - recherche ;
  - reservation ;
  - dashboard salon.

Pourquoi c'est important :

- une application accessible en ligne rassure le jury ;
- cela montre que le projet a ete verifie hors environnement local.

### Priorite 4 - Retirer ou justifier le mot de passe pre-rempli

Dans `frontend/auth.html`, le champ de connexion contient une valeur de demo :

```text
Password123!
```

Action conseillee :

- pour une demo locale, tu peux le garder si tu assumes que c'est un confort de
  demonstration ;
- pour une version de rendu ou production, il vaut mieux l'enlever ;
- dans tous les cas, il faut savoir expliquer que les vrais mots de passe ne sont
  jamais stockes en clair, car ils sont hashes avec `bcrypt`.

Pourquoi c'est important :

- un mot de passe pre-rempli peut donner une impression moins professionnelle ;
- le jury peut poser une question de securite dessus.

### Priorite 5 - Supprimer ou expliquer `mock-data.js`

Le fichier `frontend/assets/js/mock-data.js` existe encore, mais il ne semble plus
etre utilise par les pages frontend.

Action conseillee :

- soit le supprimer si le frontend est totalement branche a l'API ;
- soit le garder en expliquant que c'etait un fichier de travail utilise pendant
  la phase front avant le backend.

Pourquoi c'est important :

- eviter que le jury pense que l'application fonctionne encore avec de fausses
  donnees cote front ;
- clarifier l'evolution du projet.

## 5. Ameliorations importantes mais non urgentes

### 5.1 Ajouter une verification simple du mot de passe a l'inscription

Actuellement, le backend verifie que le mot de passe existe, mais il ne semble pas
imposer une regle forte cote serveur.

Action possible, simple a expliquer :

- minimum 8 caracteres ;
- message d'erreur clair.

Phrase pour l'oral :

```text
J'ai ajoute une verification minimale cote serveur, car les controles frontend
peuvent etre contournes.
```

### 5.2 Limiter les creneaux reservables dans le passe

La creation d'un creneau salon verifie deja que le creneau est dans le futur.
Mais la route de reservation pourrait aussi verifier qu'un client ne reserve pas
un creneau passe si une ancienne donnee disponible existe en base.

Ce n'est pas forcement bloquant pour le MVP, mais c'est une bonne protection
metier.

### 5.3 Harmoniser les noms dans `dashboard.js`

Dans `frontend/assets/js/dashboard.js`, plusieurs fonctions utilisent le mot
`Admin` :

- `renderPrestationsAdmin` ;
- `renderCreneauxAdmin` ;
- `renderHorairesAdmin`.

Le projet n'a pas de vraie interface administrateur. Il s'agit plutot de gestion
cote salon.

Action possible :

- renommer progressivement en `renderPrestationsSalon`,
  `renderCreneauxSalon`, etc.

Pourquoi :

- eviter une confusion entre "admin de plateforme" et "salon professionnel" ;
- garder un vocabulaire coherent avec le MVP.

### 5.4 Ajouter une page ou section "schema de base de donnees"

Le fichier `database/schema.sql` est clair, mais pour le dossier professionnel il
faudra probablement un schema visuel ou une explication MCD/MLD.

Action conseillee :

- faire un schema simple avec les tables :
  - `users` ;
  - `salons` ;
  - `prestations` ;
  - `horaires_ouverture` ;
  - `creneaux` ;
  - `reservations`.

Il faut surtout savoir expliquer les relations :

- un user salon possede un salon ;
- un salon possede plusieurs prestations ;
- un salon possede plusieurs creneaux ;
- une reservation relie un client, un salon, une prestation et un creneau.

## 6. Points a ne pas complexifier maintenant

Conformement a `docs/contexte.md`, il faut eviter d'ajouter des choses trop
difficiles a comprendre ou a expliquer.

Je deconseille d'ajouter maintenant :

- un framework frontend comme React ;
- un ORM comme Sequelize ou Prisma ;
- une architecture en services/repositories trop abstraite ;
- un systeme complet de refresh token ;
- un paiement en ligne ;
- des emails automatiques ;
- un upload de fichiers ;
- une interface admin complete ;
- une gestion multi-employes ;
- une generation automatique complexe de planning.

Ces fonctionnalites peuvent etre citees comme evolutions futures, mais elles ne
sont pas necessaires pour valider le projet.

## 7. Ce que tu dois savoir expliquer au jury

### 7.1 Le role de JWT

A comprendre :

```text
Quand l'utilisateur se connecte, le backend verifie son email et son mot de
passe. Si tout est bon, il cree un token JWT. Le frontend garde ce token dans
sessionStorage et l'envoie dans le header Authorization pour les routes
protegees.
```

### 7.2 Le role de bcrypt

A comprendre :

```text
Je ne stocke pas le mot de passe en clair. Je stocke un hash genere avec bcrypt.
Lors de la connexion, bcrypt compare le mot de passe saisi avec le hash en base.
```

### 7.3 Les middlewares

A comprendre :

```text
Un middleware est une fonction qui passe avant le controller. Dans mon projet, il
y a un middleware pour verifier le JWT et un autre pour verifier le role de
l'utilisateur.
```

### 7.4 Les requetes SQL preparees

A comprendre :

```text
J'utilise des points d'interrogation dans mes requetes SQL et je passe les
valeurs dans un tableau. Cela evite de coller directement les donnees utilisateur
dans la requete et reduit le risque d'injection SQL.
```

### 7.5 La transaction de reservation

A comprendre :

```text
La reservation modifie deux choses : elle cree une reservation et elle rend le
creneau indisponible. J'utilise une transaction pour que les deux actions soient
faites ensemble. Si une erreur arrive, on annule tout.
```

### 7.6 La difference entre frontend et backend

A comprendre :

```text
Le frontend affiche les pages et envoie les demandes avec fetch. Le backend
verifie les donnees, applique les regles metier et communique avec MySQL.
```

### 7.7 Le role de `docs/contexte.md`

A comprendre :

```text
J'ai utilise l'IA comme assistant, mais j'ai cadre son utilisation : le projet
doit rester lisible, progressif et explicable a mon niveau. J'ai garde les choix
techniques alignes avec ma formation DWWM.
```

## 8. Risques principaux si rien n'est modifie

### Risque 1 - Documentation pas totalement a jour

Le plus gros risque n'est pas le code, mais quelques champs incomplets ou
anciennes mentions locales dans la documentation, notamment les URL Alwaysdata.

Impact :

- le jury peut penser que le projet manque de finition.

### Risque 2 - Projet percu comme trop assiste par IA

Le projet est assez complet et documente. C'est positif, mais il faut eviter de
reciter des explications trop parfaites.

Action :

- preparer des explications simples ;
- montrer les parties que tu comprends vraiment ;
- assumer que l'IA a aide a structurer, corriger et expliquer.

### Risque 3 - Demo fragile si la base ou le backend ne sont pas prets

Le frontend depend de l'API et de MySQL.

Action :

- preparer une checklist de lancement ;
- verifier les comptes de test ;
- tester le parcours complet juste avant la soutenance.

## 9. Plan d'action conseille sur trois semaines

### Semaine 1 - Stabilisation

- Completer les URL Alwaysdata dans la documentation.
- Decider quoi faire de `mock-data.js`.
- Retirer ou assumer le mot de passe pre-rempli.
- Verifier toutes les pages dans le navigateur.
- Rejouer le parcours client complet.
- Rejouer le parcours salon complet.

### Semaine 2 - Production et dossier

- Refaire les tests de production.
- Mettre a jour le README avec les URL si necessaire.
- Preparer le dossier professionnel.
- Ajouter des captures d'ecran propres.
- Preparer le schema de base de donnees.

### Semaine 3 - Oral et entrainement

- Repeter le scenario de demonstration.
- Repondre a voix haute aux questions de `docs/questions-techniques-jury.md`.
- Preparer une phrase honnete sur l'utilisation de l'IA.
- Revoir les notions :
  - JWT ;
  - bcrypt ;
  - middleware ;
  - routes ;
  - controller ;
  - requetes SQL preparees ;
  - transaction ;
  - RGPD ;
  - accessibilite.

## 10. Conclusion

Le projet est bien avance et correspond a un bon MVP de fin de formation DWWM.
Le code est globalement structure, la documentation est riche, les parcours
client et salon sont couverts, et les controles de base sont presents.

Les prochaines modifications doivent rester simples. Il ne faut pas chercher a
impressionner avec des fonctionnalites complexes. Il faut plutot rendre le projet
plus propre, mieux documente, deployable, et surtout parfaitement explicable.

La ligne directrice pour la suite :

```text
Je garde un projet simple, complet, coherent, et je suis capable d'expliquer
chaque choix important avec mes propres mots.
```
