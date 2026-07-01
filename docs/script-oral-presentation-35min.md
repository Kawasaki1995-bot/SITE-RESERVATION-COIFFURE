# Script oral - Presentation Cut&Go 35 minutes

Ce script accompagne le diapo Gamma. L'objectif n'est pas de le lire mot a mot, mais de s'en servir comme fil conducteur. Les slides doivent rester visuelles et legeres ; le detail est porte par l'oral.

## Repartition du temps

| Slide | Sujet | Temps |
| --- | --- | --- |
| 1 | Introduction | 1 min |
| 2 | Besoin utilisateur | 2 min |
| 3 | MVP | 2 min |
| 4 | Architecture globale | 2 min |
| 5 | Les 8 competences | 2 min |
| 6 | CP1 Environnement | 2 min |
| 7 | CP2 Maquettage | 2 min |
| 8 | CP3 Interfaces statiques | 2 min |
| 9 | CP4 Interfaces dynamiques | 3 min |
| 10 | CP5 Base de donnees | 3 min |
| 11 | CP6 Acces aux donnees | 3 min |
| 12 | CP7 Securite serveur | 3 min |
| 13 | CP7 Reservation | 3 min |
| 14 | CP8 Deploiement | 2 min |
| 15 | Tests et qualite | 2 min |
| 16 | Scenario de demonstration | 2 min |
| 17 | Limites et evolutions | 2 min |
| 18 | Conclusion | 1 min |
| Total | | 35 min |

---

## Slide 1 - Cut&Go

Bonjour, je vais vous presenter Cut&Go, mon projet support pour le titre professionnel Developpeur web et web mobile.

Cut&Go est une application web de reservation de rendez-vous pour salons de coiffure. L'idee est de proposer une version MVP d'un service de prise de rendez-vous : un client peut chercher un salon, consulter ses prestations, choisir un creneau et reserver. De son cote, un salon peut gerer ses informations, ses prestations, ses horaires, ses creneaux et ses reservations.

J'ai construit cette presentation autour des 8 competences du dossier professionnel. Je vais donc presenter le projet, puis montrer comment chaque competence est mise en oeuvre dans Cut&Go, avec des exemples concrets du code, de la base de donnees, de la securite, des tests et du deploiement.

Transition : je commence par le besoin utilisateur qui a guide le projet.

## Slide 2 - Le besoin

Le probleme de depart est simple : la reservation chez un salon doit etre rapide, claire et accessible depuis un navigateur.

Cote client, le besoin principal est de trouver un salon, comparer les prestations, voir les creneaux disponibles et reserver sans devoir appeler. Le client doit aussi pouvoir retrouver ses rendez-vous et annuler lorsque la regle metier le permet.

Cote salon, le besoin est different : le salon doit pouvoir gerer son activite. Il doit modifier ses informations, ajouter ou desactiver des prestations, definir ses horaires, ouvrir ou bloquer des creneaux, puis consulter les reservations recues.

J'ai aussi ajoute un parcours administrateur, car il permet de montrer une gestion des comptes plus complete : consulter les utilisateurs, modifier certaines informations, restreindre ou reactiver un compte.

Transition : pour rester realiste, j'ai volontairement limite ce besoin a un MVP.

## Slide 3 - Le MVP

Cut&Go est pense comme un MVP, c'est-a-dire une version minimale mais fonctionnelle. L'objectif n'etait pas de copier toutes les fonctionnalites d'une grosse plateforme, mais de livrer une base stable, comprehensible et defendable.

Le MVP contient trois parcours principaux. Le parcours client couvre l'inscription, la connexion, la recherche, la fiche salon, la reservation et la consultation des rendez-vous. Le parcours salon couvre le dashboard, les prestations, les horaires, les creneaux, les reservations et quelques statistiques simples. Le parcours administrateur permet de gerer les comptes.

Certaines fonctionnalites ont ete volontairement sorties du perimetre : paiement en ligne, notifications SMS ou email, geolocalisation avancee, vrais avis clients, upload reel de photos et gestion multi-employes. Ce sont des evolutions possibles, mais elles auraient augmente le risque sans etre indispensables pour demontrer les competences DWWM.

Transition : techniquement, ce MVP repose sur une architecture fullstack simple.

## Slide 4 - Vue d'ensemble

L'application est organisee en trois grandes parties.

D'abord, le front-end, avec HTML5, CSS3 et JavaScript Vanilla. Il gere l'affichage, les formulaires, les interactions utilisateur et les appels vers l'API.

Ensuite, le back-end, avec Node.js et Express. Il expose une API REST, verifie les donnees, applique les regles metier, controle l'authentification et les roles, puis communique avec la base de donnees.

Enfin, la base MySQL ou MariaDB stocke les utilisateurs, les salons, les prestations, les horaires, les creneaux et les reservations.

Le chemin classique est donc : navigateur, front-end, API Express, controller, base MySQL, puis reponse JSON au front-end. Dans le back-end, j'ai suivi une organisation lisible : route, middleware, controller, requete SQL, reponse JSON.

Transition : cette architecture me permet de relier clairement le projet aux 8 competences.

## Slide 5 - Les 8 competences DWWM

Mon dossier professionnel est structure autour des 8 competences du titre DWWM.

Les quatre premieres concernent principalement la partie front-end : installer et configurer l'environnement, maquetter les interfaces, realiser les interfaces statiques, puis developper la partie dynamique des interfaces.

Les quatre suivantes concernent plutot le back-end et la mise en production : mettre en place la base de donnees relationnelle, developper les composants d'acces aux donnees, developper les composants metier cote serveur, puis documenter le deploiement.

Dans Cut&Go, ces competences ne sont pas separees artificiellement. Elles se completent. Par exemple, une reservation visible dans le front-end depend d'une maquette, d'une page HTML/CSS, d'un script JavaScript, d'une route API, d'une requete SQL et d'une regle metier cote serveur.

Transition : je commence par la premiere competence, l'environnement de travail.

## Slide 6 - CP1 - Installer et configurer son environnement

Pour CP1, j'ai mis en place un environnement de travail complet pour un projet fullstack.

Le depot est organise avec une separation claire : `frontend/` pour les pages et les scripts client, `backend/` pour l'API Express, `database/` pour le schema SQL et les donnees de demonstration, et `docs/` pour la documentation projet.

J'ai configure Node.js et npm dans le back-end. Le fichier `backend/package.json` declare les dependances principales : Express, cors, dotenv, mysql2, bcrypt et jsonwebtoken.

J'ai aussi separe la configuration sensible avec des variables d'environnement. Le fichier `.env` n'est pas versionne, et un modele `.env.example` sert a documenter les variables attendues. C'est important pour eviter d'exposer des secrets comme le mot de passe MySQL ou le secret JWT.

Enfin, j'ai documente l'installation dans le README et conserve des documents de suivi comme `STRUCTURE_PROJET.md`, `TODO_PROJET.md` et le journal de bord.

Transition : une fois l'environnement pret, j'ai travaille la conception des parcours.

## Slide 7 - CP2 - Maquetter les interfaces

Pour CP2, l'objectif etait de transformer le brief en parcours utilisateur.

J'ai identifie trois profils : le client, le salon et l'administrateur. Pour chacun, j'ai defini les actions principales. Le client cherche et reserve. Le salon gere son activite. L'administrateur gere les comptes.

A partir de ces profils, j'ai liste les ecrans necessaires : accueil et recherche, connexion et inscription, fiche salon, mes rendez-vous, dashboard salon, compte utilisateur, interface administrateur, mentions legales et confidentialite.

J'ai utilise les user stories pour garder le lien entre besoin et interface. Par exemple : en tant que client, je veux rechercher un salon par ville afin de trouver rapidement un rendez-vous. Cette formulation aide a prioriser ce qui doit vraiment exister dans le MVP.

Le choix visuel est reste sobre : interface claire, formulaires lisibles, boutons explicites et logique mobile-first.

Transition : ces maquettes et parcours ont ensuite ete integres en HTML et CSS.

## Slide 8 - CP3 - Realiser les interfaces statiques

Pour CP3, j'ai integre les pages principales dans le dossier `frontend/`.

Les pages importantes sont `index.html` pour la recherche, `auth.html` pour l'inscription et la connexion, `salon.html` pour la fiche salon, `mes-rdv.html` pour les rendez-vous client, `dashboard.html` pour l'espace salon, `admin.html` pour l'administration, ainsi que les pages legales.

J'ai utilise du HTML semantique avec des elements comme `header`, `nav`, `main`, `section`, `form`, `label` et `button`. Cela aide la lisibilite du code et l'accessibilite.

Le CSS est centralise dans `frontend/assets/css/style.css`. Il gere la navigation, les formulaires, les cartes salons, les tableaux, les messages, le dashboard et le responsive. J'ai travaille sans framework CSS afin de montrer les bases HTML/CSS attendues.

J'ai aussi documente les points RGPD et accessibilite, et realise un audit Lighthouse sur la page d'accueil.

Transition : une interface statique ne suffit pas, il faut ensuite la connecter aux donnees.

## Slide 9 - CP4 - Developper la partie dynamique

Pour CP4, j'ai developpe la partie dynamique avec JavaScript Vanilla.

Le fichier central est `frontend/assets/js/api.js`. Il contient la configuration de l'URL API, les appels `fetch`, la gestion du token JWT et des helpers communs. Ce choix evite de dupliquer la logique d'appel API dans toutes les pages.

Ensuite, chaque domaine a son script : `auth.js` pour l'inscription et la connexion, `search.js` pour la recherche, `salon.js` pour la fiche salon, `reservations.js` pour les rendez-vous client, `dashboard.js` pour l'espace salon, `admin.js` pour l'administration et `compte.js` pour les informations personnelles.

J'ai utilise `fetch`, les promesses et `async/await` pour appeler l'API Express. Les pages affichent les donnees recues, gerent les etats de chargement, les messages de succes et les erreurs HTTP.

Pour l'authentification cote front, le token JWT est stocke temporairement en `sessionStorage`, puis envoye dans le header `Authorization: Bearer token`. J'ai aussi prevu des protections d'affichage comme `escapeHtml` pour eviter d'inserer directement du contenu non controle dans le DOM.

Transition : ces donnees viennent d'une base relationnelle.

## Slide 10 - CP5 - Mettre en place une base de donnees relationnelle

Pour CP5, j'ai concu une base MySQL adaptee au domaine de la reservation.

Les tables principales sont `users`, `salons`, `prestations`, `horaires_ouverture`, `creneaux` et `reservations`. Chaque table a un role clair. `users` stocke les comptes client, salon et administrateur. `salons` contient les informations publiques des salons. `prestations` contient les services proposes. `creneaux` represente les disponibilites reservables. `reservations` relie un client, un salon, une prestation et un creneau.

La base est relationnelle parce que les donnees sont fortement liees. Une reservation n'a pas de sens sans client, sans salon, sans prestation et sans creneau. Les cles etrangeres permettent de garder cette coherence.

J'ai ajoute des contraintes utiles : unicite des emails, prix positifs, jours valides, unicite d'un creneau pour un salon a une date et une heure donnees. Le fichier `database/seed.sql` ajoute des donnees de demonstration pour tester rapidement les parcours.

Transition : une fois la base creee, le serveur doit y acceder proprement.

## Slide 11 - CP6 - Developper les composants d'acces aux donnees

Pour CP6, j'ai developpe les composants qui font le lien entre l'API Express et MySQL.

La connexion est centralisee dans `backend/config/db.js` avec `mysql2`. J'utilise un pool de connexions, ce qui evite d'ouvrir une nouvelle connexion manuellement a chaque requete.

Les controllers executent les requetes SQL. Ils gerent par exemple la recherche des salons, la lecture des prestations, la creation de creneaux, la reservation, l'annulation, la lecture des rendez-vous ou encore les statistiques du salon.

J'ai utilise des requetes preparees avec des placeholders `?`. C'est important pour eviter de concatener directement les entrees utilisateur dans le SQL, et donc pour limiter les risques d'injection SQL.

Pour les operations sensibles, j'utilise des transactions. Par exemple, lors d'une reservation, plusieurs actions doivent rester coherentes : verifier le creneau, creer la reservation et rendre le creneau indisponible. Si une etape echoue, la transaction est annulee.

Transition : au-dessus de l'acces aux donnees, il y a les regles metier et la securite serveur.

## Slide 12 - CP7 - Developper les composants metier cote serveur

Pour CP7, j'ai cree une API REST avec Node.js et Express.

Le fichier `backend/server.js` configure l'application : JSON, CORS, variables d'environnement, route de sante `/api/health`, routes fonctionnelles et middleware d'erreur.

L'authentification repose sur bcrypt et JWT. A l'inscription, le mot de passe est hashe avec bcrypt avant d'etre stocke. A la connexion, le serveur compare le mot de passe saisi avec le hash. Si les identifiants sont valides, il genere un token JWT.

Les routes sensibles sont protegees par `auth.middleware.js`. Ce middleware verifie la presence du header `Authorization`, controle le token avec `JWT_SECRET`, recherche l'utilisateur en base, puis refuse les comptes restreints.

Les droits sont ensuite controles par `role.middleware.js`. Par exemple, les routes de reservation sont reservees au role client, tandis que les routes de reservation salon et de statistiques sont reservees au role salon. Le controle est fait cote serveur, car un affichage masque cote front-end ne suffit jamais a securiser une action.

Transition : la reservation est l'exemple le plus parlant de cette logique metier.

## Slide 13 - CP7 - La reservation

La reservation est la regle metier centrale de Cut&Go.

Quand un client reserve, il envoie un `salon_id`, un `prestation_id` et un `creneau_id`. Le back-end commence une transaction SQL. Il verifie que le creneau existe pour ce salon, puis verrouille la ligne avec `FOR UPDATE`.

Ce verrou est important : il evite que deux clients reservent le meme creneau au meme moment. Ensuite, le serveur verifie que le creneau est encore disponible et que la prestation appartient bien au salon choisi.

Si tout est valide, la reservation est creee dans la table `reservations`, puis le creneau passe en indisponible. Enfin, la transaction est validee. Si une etape echoue, le serveur fait un rollback.

L'annulation suit aussi une regle metier : elle est refusee si le rendez-vous commence dans moins de 24 heures. Si l'annulation est acceptee, le creneau redevient disponible.

Transition : une application doit aussi pouvoir etre installee, configuree et deployee.

## Slide 14 - CP8 - Documenter le deploiement

Pour CP8, j'ai prepare et documente le deploiement de Cut&Go sur Alwaysdata.

Le deploiement regroupe trois elements : le front-end statique, l'API Node.js/Express et la base MySQL. L'URL de production documentee est `https://cutandgo.alwaysdata.net`, avec l'API accessible via `/api` et la route de test `/api/health`.

La documentation `docs/deploiement.md` explique l'architecture de production, les variables d'environnement, la configuration CORS, l'import du schema SQL, l'import des donnees de demonstration et la checklist de verification.

Les variables sensibles sont configurees cote hebergeur et ne sont pas versionnees. Par exemple, `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET` et `FRONTEND_URL` sont separees du code.

Cette competence montre que le projet n'est pas seulement pense pour fonctionner sur ma machine : il peut etre configure, deploye et verifie par une autre personne.

Transition : pour soutenir le projet, j'ai aussi prevu une demarche de tests et de qualite.

## Slide 15 - Tests et qualite

J'ai documente plusieurs niveaux de verification.

Cote back-end, j'ai utilise des controles syntaxiques comme `node --check` et `npm run check`. J'ai aussi documente `npm audit --omit=dev` pour verifier les vulnerabilites connues des dependances.

Cote API, les tests manuels valident les routes principales : `/api/health`, recherche des salons, connexion, recuperation du token JWT, route protegee, creation de reservation, annulation, dashboard salon et administration.

Cote front-end, les tests consistent a verifier les parcours utilisateur dans le navigateur : rechercher un salon, ouvrir une fiche, reserver, consulter mes rendez-vous, se connecter comme salon, gerer les prestations, puis se connecter comme admin.

J'ai aussi documente les points RGPD, les pages legales et l'accessibilite. L'audit Lighthouse permet d'avoir une trace objective sur la page d'accueil.

Transition : ces tests rejoignent le scenario que je peux montrer en demonstration.

## Slide 16 - Scenario de demonstration

Si je devais faire une demonstration guidee, je suivrais trois parcours.

D'abord, le parcours client : connexion avec un compte de test, recherche d'un salon, ouverture de la fiche salon, choix d'une prestation, choix d'un creneau, confirmation de la reservation, puis verification dans mes rendez-vous.

Ensuite, le parcours salon : connexion avec un compte salon, ouverture du dashboard, consultation des reservations, ajout ou desactivation d'une prestation, creation ou blocage d'un creneau, modification des horaires et consultation des statistiques.

Enfin, le parcours administrateur : connexion avec le compte admin, consultation des comptes, modification d'un compte, restriction puis reactivation.

Ce scenario permet de montrer que le projet n'est pas seulement une interface. Il traverse toute l'architecture : front-end, API, base de donnees, authentification, roles et regles metier.

Transition : comme tout MVP, Cut&Go a aussi des limites assumeees.

## Slide 17 - Limites et evolutions

Les limites de Cut&Go sont volontaires et liees au choix du MVP.

Le projet ne gere pas encore le paiement en ligne, les notifications SMS ou email, les vrais avis clients, la geolocalisation avancee, l'upload reel d'images ou la gestion fine de plusieurs employes par salon.

Ces limites ne sont pas des oublis : elles permettent de garder un projet realiste pour une soutenance DWWM. L'objectif principal etait de demontrer un parcours complet, une architecture fullstack, une base relationnelle, une API REST, une authentification securisee, des roles et des regles metier.

Les evolutions prioritaires seraient de consolider la version en ligne, ajouter des tests automatises, ameliorer l'experience mobile, ajouter les notifications de confirmation, puis enrichir le dashboard salon.

Transition : je termine avec ce que le projet demontre.

## Slide 18 - Conclusion

Pour conclure, Cut&Go est un MVP de reservation pour salons de coiffure construit autour des competences du titre DWWM.

Le projet montre un parcours client, un parcours salon et un parcours administrateur. Il montre aussi une architecture fullstack avec HTML, CSS, JavaScript Vanilla, Node.js, Express et MySQL.

Les points importants sont la separation front-end/back-end/base de donnees, l'utilisation de requetes preparees, les transactions SQL pour la reservation, le hashage des mots de passe avec bcrypt, l'authentification JWT, la verification des roles cote serveur et la documentation du deploiement.

Ce projet m'a permis de relier la conception, le developpement, la securite, la base de donnees, les tests, la documentation et le deploiement dans une application coherente.

Phrase finale possible :

Cut&Go est une base stable, comprehensible et defendable, qui montre ma capacite a construire une application web dynamique complete en suivant les 8 competences du titre Developpeur web et web mobile.

---

# Questions rapides a preparer apres la presentation

## Pourquoi MySQL ?

Parce que les donnees sont relationnelles. Une reservation depend d'un client, d'un salon, d'une prestation et d'un creneau. MySQL permet de garantir ces liens avec des cles etrangeres.

## Pourquoi JavaScript Vanilla ?

Pour rester aligne avec le programme DWWM et montrer la comprehension du DOM, des evenements, des formulaires et des appels API sans ajouter la complexite d'un framework.

## Pourquoi verifier les roles cote serveur ?

Parce que le front-end peut etre modifie par un utilisateur. Les vraies autorisations doivent donc etre controlees par le back-end.

## Pourquoi utiliser une transaction pour reserver ?

Parce qu'une reservation modifie plusieurs donnees. La transaction garantit que tout est valide ensemble, ou que rien n'est enregistre en cas d'erreur.

## Pourquoi `FOR UPDATE` ?

Pour verrouiller le creneau pendant la reservation et eviter que deux clients reservent le meme creneau au meme moment.

## Quelle est la principale amelioration future ?

Consolider la production, ajouter des tests automatises, puis ajouter des notifications et une gestion salon plus avancee.

