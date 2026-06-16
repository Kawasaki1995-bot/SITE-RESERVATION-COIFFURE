# Reponses jury - base solide Cut&Go

Ce fichier contient des reponses courtes pour t'entrainer a l'oral.
L'objectif est de comprendre les idees, pas de reciter mot pour mot.

Conseil d'entrainement : lis une question, cache la reponse, reponds a voix
haute, puis compare avec la proposition.

## 1. Presentation du projet

### Peux-tu presenter Cut&Go ?

Cut&Go est une application web de reservation de rendez-vous pour salons de
coiffure. Elle permet a un client de chercher un salon, consulter ses
prestations, choisir un creneau disponible et reserver. Elle permet aussi a un
salon de gerer ses informations, ses prestations, ses horaires, ses creneaux et
ses reservations.

Phrase simple : Cut&Go met en relation des clients et des salons autour d'un
parcours de reservation simple.

### Quel probleme ton application resout-elle ?

Elle simplifie la prise de rendez-vous. Le client peut comparer des salons et
reserver sans appeler. Le salon peut centraliser ses reservations et mieux gerer
son planning.

Phrase simple : le projet evite les appels et donne une vue claire des creneaux
disponibles.

### Pourquoi avoir choisi un MVP ?

J'ai choisi un MVP pour garder un perimetre realiste et livrer une application
fonctionnelle de bout en bout. Le but etait de couvrir les besoins essentiels
sans ajouter des fonctionnalites trop complexes comme le paiement, les SMS ou la
gestion multi-employes.

Phrase simple : j'ai prefere faire moins de fonctionnalites, mais les faire de
maniere coherente et explicable.

### Quelles sont les limites du MVP ?

Le MVP ne gere pas le paiement en ligne, les notifications email ou SMS, l'upload
reel d'images, les avis clients avances, les employes multiples dans un salon ou
la generation automatique complexe de planning. Ces points peuvent etre ajoutes
plus tard.

Phrase simple : ces limites sont volontaires pour garder un projet adapte a la
formation et au temps disponible.

## 2. Architecture generale

### Comment est organise ton projet ?

Le projet est separe en quatre parties principales. Le dossier `frontend`
contient les pages HTML, le CSS et le JavaScript cote navigateur. Le dossier
`backend` contient l'API Express. Le dossier `database` contient le schema SQL et
les donnees de test. Le dossier `docs` contient la documentation du projet.

Phrase simple : j'ai separe l'affichage, la logique serveur, les donnees et la
documentation.

### Quelle est la difference entre frontend et backend ?

Le frontend est la partie visible par l'utilisateur : les pages, les formulaires
et les interactions. Le backend est la partie serveur : il verifie les donnees,
applique les regles metier, gere l'authentification et communique avec la base
de donnees.

Phrase simple : le frontend affiche, le backend controle.

### Pourquoi le frontend ne communique-t-il pas directement avec MySQL ?

Parce que ce serait dangereux et mal organise. La base de donnees doit rester
protegee cote serveur. Le frontend envoie des requetes a l'API, et l'API decide
ce qui est autorise ou non.

Phrase simple : le navigateur ne doit jamais avoir un acces direct a la base.

### Peux-tu expliquer le chemin d'une reservation ?

Le client choisit une prestation et un creneau dans le frontend. Le frontend
envoie une requete `POST /api/reservations` au backend avec le token JWT. Le
backend verifie que l'utilisateur est bien un client, que le creneau existe, que
la prestation appartient au bon salon et que le creneau est disponible. Ensuite
il cree la reservation et rend le creneau indisponible en base.

Phrase simple : clic client, requete API, verification serveur, insertion SQL,
mise a jour du creneau.

## 3. Stack technique

### Quelle stack as-tu utilisee ?

J'ai utilise HTML, CSS et JavaScript Vanilla pour le frontend. Pour le backend,
j'ai utilise Node.js avec Express. La base de donnees est en MySQL. J'utilise
aussi bcrypt pour les mots de passe, JWT pour l'authentification, dotenv pour les
variables d'environnement et mysql2 pour communiquer avec MySQL.

Phrase simple : c'est une stack simple, adaptee au programme DWWM.

### Pourquoi JavaScript Vanilla plutot que React ?

Le projet reste assez simple cote interface, donc JavaScript Vanilla suffit.
Cela me permet aussi de mieux montrer que je comprends le DOM, les evenements,
les formulaires et les appels API sans ajouter la complexite d'un framework.

Phrase simple : je voulais maitriser les bases avant d'ajouter un framework.

### Pourquoi Express ?

Express permet de creer une API rapidement avec des routes, des middlewares et
des controllers. C'est leger, lisible et adapte a un MVP comme Cut&Go.

Phrase simple : Express est simple, clair et efficace pour construire une API.

### Pourquoi MySQL ?

MySQL est adapte parce que les donnees du projet sont relationnelles. Un client,
un salon, des prestations, des creneaux et des reservations ont des relations
claires entre eux. MySQL permet de representer ces relations avec des cles
primaires et etrangeres.

Phrase simple : mes donnees sont structurees et liees, donc une base
relationnelle convient bien.

## 4. Base de donnees

### Quelles sont les tables principales ?

Les tables principales sont `users`, `salons`, `prestations`,
`horaires_ouverture`, `creneaux` et `reservations`.

Phrase simple : les tables representent les utilisateurs, les salons, les
services, les horaires, les disponibilites et les rendez-vous.

### Pourquoi avoir separe `users` et `salons` ?

La table `users` sert a l'authentification pour tous les comptes. La table
`salons` contient les informations propres a un salon, comme le nom commercial,
la ville, l'adresse, la description ou le telephone. Un utilisateur avec le role
`salon` peut donc avoir une fiche salon associee.

Phrase simple : `users` gere le compte, `salons` gere la fiche professionnelle.

### Quelles sont les relations importantes ?

Un utilisateur salon peut posseder un salon. Un salon peut avoir plusieurs
prestations, plusieurs horaires et plusieurs creneaux. Une reservation relie un
client, un salon, une prestation et un creneau.

Phrase simple : la reservation est le point central qui relie les autres donnees.

### A quoi servent les cles etrangeres ?

Les cles etrangeres garantissent que les relations entre les tables restent
coherentes. Par exemple, une reservation ne peut pas pointer vers un client ou un
creneau qui n'existe pas.

Phrase simple : elles protegent la coherence des donnees.

### Pourquoi avoir mis des index ?

Les index aident la base a retrouver plus rapidement certaines donnees, par
exemple les salons par ville, les creneaux par salon et date, ou les reservations
par client ou par salon.

Phrase simple : un index sert a accelerer certaines recherches.

## 5. Authentification

### Comment fonctionne l'inscription ?

L'utilisateur envoie son nom, son email, son mot de passe et son role. Le backend
verifie que les champs sont presents, que le role est autorise et que l'email
n'est pas deja utilise. Ensuite il hash le mot de passe avec bcrypt et cree le
compte en base.

Phrase simple : je verifie les donnees, je hash le mot de passe, puis je cree
l'utilisateur.

### Comment fonctionne la connexion ?

Le backend cherche l'utilisateur avec son email. S'il existe, bcrypt compare le
mot de passe saisi avec le hash stocke en base. Si la comparaison est correcte,
le backend renvoie un JWT et les informations publiques de l'utilisateur.

Phrase simple : on ne compare pas deux mots de passe en clair, on compare un mot
de passe avec un hash.

### Pourquoi utiliser bcrypt ?

bcrypt permet de stocker un hash du mot de passe au lieu du mot de passe en
clair. Si la base de donnees etait compromise, les mots de passe ne seraient pas
directement lisibles.

Phrase simple : bcrypt protege les mots de passe.

### Qu'est-ce qu'un JWT ?

Un JWT est un token signe par le serveur. Il permet au backend de reconnaitre un
utilisateur connecte sans redemander son email et son mot de passe a chaque
requete. Dans mon projet, il contient l'id, le nom, l'email et le role.

Phrase simple : le JWT sert de preuve de connexion.

### Ou est stocke le JWT ?

Le frontend stocke le JWT dans `sessionStorage`. Ensuite, la fonction
`apiRequest` l'ajoute automatiquement dans le header `Authorization` des requetes
API.

Phrase simple : le token est garde pendant la session du navigateur.

### Quelle difference entre authentification et autorisation ?

L'authentification verifie qui est l'utilisateur. L'autorisation verifie ce qu'il
a le droit de faire. Par exemple, un utilisateur connecte peut etre reconnu, mais
seul un role `salon` peut acceder au dashboard salon.

Phrase simple : authentification = qui tu es, autorisation = ce que tu peux
faire.

## 6. Roles et middlewares

### A quoi sert un middleware ?

Un middleware est une fonction qui s'execute avant le controller. Dans mon
projet, j'ai un middleware pour verifier le JWT et un middleware pour verifier le
role de l'utilisateur.

Phrase simple : un middleware filtre ou prepare la requete avant la logique
principale.

### Comment sont proteges les roles ?

Les routes protegees utilisent d'abord `auth.middleware.js`, qui verifie le JWT
et ajoute l'utilisateur dans `req.user`. Ensuite, `role.middleware.js` verifie
que le role de cet utilisateur fait partie des roles autorises pour la route.

Phrase simple : je verifie d'abord que l'utilisateur est connecte, puis qu'il a
le bon role.

### Que se passe-t-il si le token est absent ?

Le backend renvoie une erreur `401` avec un message indiquant que le token est
manquant. Cela veut dire que l'utilisateur n'est pas authentifie.

Phrase simple : sans token, pas d'acces aux routes protegees.

### Que se passe-t-il si le role n'est pas autorise ?

Le backend renvoie une erreur `403`. Cela veut dire que l'utilisateur est
connecte, mais qu'il n'a pas le droit d'effectuer cette action.

Phrase simple : connecte ne veut pas dire autorise a tout faire.

## 7. API REST

### Qu'est-ce qu'une API REST ?

Une API REST expose des endpoints accessibles avec des methodes HTTP comme
`GET`, `POST`, `PUT`, `PATCH` ou `DELETE`. Le frontend appelle ces endpoints pour
lire, creer, modifier ou supprimer des ressources.

Phrase simple : l'API est le contrat entre le frontend et le backend.

### Pourquoi utiliser des codes HTTP ?

Les codes HTTP indiquent clairement le resultat d'une requete. Par exemple,
`200` veut dire que tout s'est bien passe, `201` qu'une ressource a ete creee,
`400` que les donnees sont invalides, `401` que l'utilisateur n'est pas
connecte, `403` qu'il n'a pas le droit, `404` que la ressource n'existe pas et
`409` qu'il y a un conflit.

Phrase simple : les codes HTTP permettent au frontend de comprendre ce qui s'est
passe.

### A quoi sert `GET /api/health` ?

Cette route permet de verifier rapidement que l'API fonctionne. Elle est utile en
local, en production et pendant une demonstration.

Phrase simple : c'est une route de controle de sante de l'API.

### Pourquoi centraliser les appels API dans `apiRequest` ?

Cela evite de repeter le meme code partout. `apiRequest` construit la requete,
ajoute le token si besoin, lit la reponse JSON et transforme les erreurs en
messages utilisables par le frontend.

Phrase simple : une seule fonction gere la communication avec l'API.

## 8. Reservation et transaction

### Quelles sont les regles d'une reservation ?

Un client connecte peut reserver une prestation dans un salon sur un creneau
disponible. Le creneau doit exister, appartenir au bon salon et etre disponible.
La prestation doit aussi appartenir au salon et etre active.

Phrase simple : je verifie que tout correspond avant de reserver.

### Pourquoi utiliser une transaction ?

La reservation fait deux actions importantes : creer la reservation et rendre le
creneau indisponible. Une transaction garantit que les deux actions sont faites
ensemble. Si une erreur arrive, on annule tout avec un rollback.

Phrase simple : une transaction evite d'avoir une reservation sans creneau bloque
ou l'inverse.

### A quoi sert `FOR UPDATE` ?

`FOR UPDATE` verrouille la ligne du creneau pendant la transaction. Cela evite
que deux clients puissent reserver exactement le meme creneau au meme moment.

Phrase simple : je bloque temporairement le creneau pendant que je le reserve.

### Que se passe-t-il si le creneau est deja pris ?

Le backend renvoie une erreur `409`, car c'est un conflit : la demande est
valide, mais la ressource n'est plus disponible.

Phrase simple : le creneau existe, mais il n'est plus reservable.

### Comment fonctionne l'annulation ?

Le backend verifie que la reservation appartient bien au client connecte, qu'elle
n'est pas deja annulee et qu'elle commence dans plus de 24 heures. Si tout est
bon, la reservation passe au statut `annulee`, la date d'annulation est
enregistree et le creneau redevient disponible.

Phrase simple : annuler libere le creneau, mais seulement si le delai est
respecte.

## 9. Recherche et filtres

### Comment fonctionne la recherche de salons ?

Le frontend construit une query string avec `URLSearchParams`, puis appelle
`GET /api/salons`. Le backend applique les filtres disponibles : ville, note
minimale, prix maximum et prestation.

Phrase simple : le formulaire devient des parametres envoyes a l'API.

### Pourquoi utiliser `LIKE` ?

`LIKE` permet de faire une recherche partielle. Par exemple, si l'utilisateur
tape une partie d'une ville ou d'une prestation, la requete peut quand meme
trouver des resultats correspondants.

Phrase simple : `LIKE` rend la recherche plus souple.

### Pourquoi utiliser `MIN(p.prix)` ?

Cela permet d'afficher le prix minimum des prestations d'un salon. C'est utile
dans la liste des resultats pour donner au client une idee du prix d'entree.

Phrase simple : j'affiche "a partir de" pour chaque salon.

### Pourquoi utiliser `HAVING` pour le prix maximum ?

Le prix minimum est calcule avec une fonction d'agregation. Comme ce calcul se
fait apres le regroupement, le filtre sur ce resultat se fait avec `HAVING`.

Phrase simple : `WHERE` filtre les lignes, `HAVING` filtre les resultats
agreges.

## 10. Dashboard salon

### Que peut faire un salon dans son dashboard ?

Un salon peut modifier ses informations, ajouter ou desactiver des prestations,
gerer ses horaires, creer des creneaux, bloquer ou rouvrir des creneaux,
consulter ses reservations et voir un chiffre d'affaires simple.

Phrase simple : le dashboard est l'espace de gestion du professionnel.

### Pourquoi desactiver une prestation plutot que la supprimer ?

Desactiver une prestation permet de ne plus l'afficher aux clients tout en gardant
une trace dans les anciennes reservations. Si on supprimait vraiment la
prestation, on risquerait de casser l'historique.

Phrase simple : je garde l'historique propre.

### Comment sont gerees les horaires ?

Le salon envoie une liste d'horaires par jour. Le backend verifie les jours, les
heures, les doublons et l'ordre ouverture/fermeture. Ensuite il insere ou met a
jour les horaires avec `ON DUPLICATE KEY UPDATE`.

Phrase simple : un jour existe une seule fois par salon, et je le mets a jour si
necessaire.

### Comment est calcule le chiffre d'affaires ?

Le chiffre d'affaires est calcule avec les reservations confirmees uniquement.
Le backend additionne les prix des prestations pour le jour, la semaine et le
mois avec des conditions SQL.

Phrase simple : les reservations annulees ne comptent pas dans les statistiques.

## 11. Frontend

### Comment le frontend appelle-t-il l'API ?

Le frontend utilise `fetch`, principalement a travers la fonction `apiRequest`.
Cette fonction ajoute les headers, envoie le body JSON si besoin, ajoute le token
JWT et lit la reponse.

Phrase simple : `fetch` envoie les demandes du navigateur vers le serveur.

### Pourquoi utiliser `FormData` ?

`FormData` permet de recuperer facilement les valeurs d'un formulaire HTML. Cela
evite de selectionner chaque champ un par un manuellement.

Phrase simple : `FormData` transforme un formulaire en donnees exploitables.

### Pourquoi utiliser `DOMContentLoaded` ?

Cela garantit que le HTML est charge avant que le JavaScript cherche des elements
dans la page. Sinon, le script pourrait chercher un formulaire ou un bouton qui
n'existe pas encore dans le DOM.

Phrase simple : j'attends que la page soit prete avant d'y toucher.

### Comment evites-tu le XSS cote frontend ?

Quand j'affiche des donnees dynamiques dans du HTML, j'utilise `escapeHtml` pour
echapper les caracteres dangereux. Pour les images, `safeImageUrl` verifie que
l'URL utilise seulement `http` ou `https`.

Phrase simple : je ne fais pas confiance directement aux textes affiches dans la
page.

## 12. Validations et erreurs

### Pourquoi valider cote backend si le frontend valide deja ?

Parce que le frontend peut etre modifie ou contourne par l'utilisateur. Les
validations importantes doivent toujours etre faites cote serveur, car c'est le
backend qui protege vraiment les donnees.

Phrase simple : le frontend aide l'utilisateur, le backend securise.

### Quelles validations importantes as-tu ?

Je verifie les champs obligatoires, le role a l'inscription, les dates, les
heures, les prix, la disponibilite des creneaux, l'appartenance des ressources au
bon salon et les droits de l'utilisateur.

Phrase simple : je verifie les donnees et les droits avant d'ecrire en base.

### A quoi sert le middleware d'erreur ?

Il centralise les erreurs non prevues. Les controllers peuvent appeler
`next(error)`, et le middleware renvoie une reponse JSON propre au frontend.

Phrase simple : il evite de gerer les erreurs serveur partout de maniere
dispersee.

## 13. Securite

### Quelles protections principales as-tu mises ?

Les mots de passe sont hashes avec bcrypt. Les routes sensibles sont protegees
avec JWT. Les roles sont verifies par middleware. Les requetes SQL utilisent des
parametres prepares. Les variables sensibles sont dans `.env`. Le frontend
echappe les textes dynamiques.

Phrase simple : j'ai protege les mots de passe, les routes, les roles, les
requetes SQL et l'affichage.

### Comment evites-tu les injections SQL ?

J'utilise `pool.execute` avec des points d'interrogation dans les requetes SQL,
puis je passe les valeurs dans un tableau. Les donnees utilisateur ne sont donc
pas collees directement dans le texte SQL.

Phrase simple : les valeurs utilisateur sont separees de la requete.

### Pourquoi `.env` ne doit-il pas etre versionne ?

Le fichier `.env` contient des informations sensibles comme le secret JWT ou les
identifiants de base de donnees. Ces informations ne doivent pas etre envoyees
sur GitHub.

Phrase simple : `.env` contient des secrets.

### Que se passe-t-il si `JWT_SECRET` manque ?

Le serveur affiche une erreur et s'arrete. C'est volontaire, parce qu'une API qui
genere des tokens sans secret fiable ne doit pas demarrer.

Phrase simple : sans secret JWT, l'authentification n'est pas fiable.

## 14. RGPD et donnees personnelles

### Quelles donnees personnelles stockes-tu ?

Je stocke notamment le nom, l'email et le role de l'utilisateur. Pour les salons,
je stocke aussi des informations professionnelles comme le nom du salon,
l'adresse, la ville et le telephone.

Phrase simple : je stocke seulement les donnees utiles au fonctionnement du MVP.

### Pourquoi l'email est-il une donnee personnelle ?

Parce qu'il peut permettre d'identifier une personne ou de la contacter. Il doit
donc etre protege et traite avec attention.

Phrase simple : une donnee personnelle permet d'identifier quelqu'un.

### Comment prends-tu en compte le RGPD ?

Le projet limite les donnees collectees, ne stocke pas les mots de passe en
clair, ne gere pas de paiement, et contient des pages de mentions legales et de
confidentialite. Pour aller plus loin, il faudrait ajouter des mecanismes de
suppression ou d'export des donnees.

Phrase simple : j'ai pose une base, mais une vraie production demanderait encore
des completions.

## 15. Tests et lancement

### Comment lances-tu le projet en local ?

Il faut importer `database/schema.sql`, importer `database/seed.sql`, configurer
`backend/.env`, installer les dependances dans `backend` avec `npm install`, puis
lancer le backend avec `npm run dev` ou `npm start`. Ensuite, on ouvre le
frontend dans le navigateur ou avec un serveur statique.

Phrase simple : base de donnees, variables d'environnement, backend, frontend.

### Comment verifies-tu que l'API fonctionne ?

Je peux appeler `GET /api/health`. Si l'API repond avec un message de succes,
cela confirme que le serveur Express est demarre.

Phrase simple : `/api/health` me donne un controle rapide.

### Quels tests as-tu faits ?

J'ai verifie la syntaxe du backend avec `npm run check`, la syntaxe des fichiers
JavaScript frontend avec `node --check`, et l'audit des dependances avec
`npm audit --omit=dev`. J'ai aussi prevu des tests manuels des parcours client et
salon.

Phrase simple : j'ai combine des controles techniques et des tests de parcours.

### Que dois-tu tester juste avant la demo ?

Je dois tester la page d'accueil, la recherche, la connexion, la reservation, la
page mes rendez-vous, l'annulation, le dashboard salon, la creation de prestation
et la creation ou modification de creneaux.

Phrase simple : je dois rejouer le parcours client et le parcours salon.

## 16. Deploiement

### Ou le projet est-il deploye ?

Le projet est prevu pour etre deploye sur Alwaysdata, avec une URL frontend et
une URL API. En production, l'API utilise les variables d'environnement du
serveur et une base de donnees distante.

Phrase simple : le local sert au developpement, Alwaysdata sert a la demo en
ligne.

### Quelle difference entre local et production ?

En local, j'utilise mon ordinateur, une base locale et souvent
`localhost:3000`. En production, le backend, le frontend et la base sont sur un
serveur, avec des URL publiques et des variables d'environnement adaptees.

Phrase simple : ce n'est pas le meme environnement, donc la configuration change.

### Que faire si la demo en ligne ne fonctionne pas ?

Je peux montrer le projet en local, utiliser les captures ou la documentation,
et expliquer le scenario de demonstration. Le plus important est d'avoir prepare
un plan B avant le jury.

Phrase simple : je ne dois pas dependre d'une seule condition technique.

## 17. Git et methode projet

### A quoi sert Git dans ton projet ?

Git sert a suivre l'evolution du code et de la documentation. Il permet de garder
un historique des changements et de revenir comprendre ce qui a ete modifie.

Phrase simple : Git garde la memoire du projet.

### A quoi sert le README ?

Le README presente le projet, la stack, les principales fonctionnalites et les
instructions pour lancer l'application.

Phrase simple : c'est la porte d'entree du projet.

### A quoi sert le journal de bord ?

Le journal de bord garde une trace de l'avancement, des choix, des problemes et
des corrections. Il montre la demarche de travail, pas seulement le resultat
final.

Phrase simple : il prouve que le projet a ete construit progressivement.

### Comment as-tu utilise l'IA ?

J'ai utilise l'IA comme assistant pour structurer, verifier, documenter et
clarifier certaines parties. Je garde la responsabilite de comprendre le code,
les choix et les limites du projet. Le but n'etait pas d'avoir une boite noire,
mais un accompagnement de travail.

Phrase simple : l'IA m'a aide, mais je dois etre capable d'expliquer ce qui est
dans mon projet.

## 18. Questions pieges

### Est-ce que masquer un bouton cote frontend suffit a securiser une action ?

Non. Masquer un bouton ameliore l'interface, mais ce n'est pas une securite. La
vraie protection doit etre cote backend, avec le JWT, les roles et les
verifications en base.

Phrase simple : la securite ne doit jamais reposer uniquement sur l'affichage.

### Comment empeches-tu un salon de modifier les donnees d'un autre salon ?

Le backend recupere le salon associe a l'utilisateur connecte avec `req.user.id`.
Ensuite, les requetes de modification utilisent ce salonId. Donc un salon ne peut
modifier que ses propres prestations, creneaux ou horaires.

Phrase simple : je lie toujours l'action au compte connecte.

### Comment empeches-tu un client d'annuler la reservation d'un autre client ?

La requete d'annulation cherche la reservation avec son id, mais aussi avec
`client_id = req.user.id`. Si la reservation n'appartient pas au client connecte,
elle n'est pas trouvee.

Phrase simple : l'id de reservation ne suffit pas, je verifie aussi le
proprietaire.

### Pourquoi ne pas avoir utilise un ORM ?

Pour ce projet, j'ai prefere utiliser SQL directement avec `mysql2`. Cela me
permet de mieux comprendre les requetes, les jointures, les transactions et les
relations. Un ORM pourrait etre une evolution, mais il ajouterait une couche de
complexite.

Phrase simple : SQL direct est plus simple a defendre pour mon niveau et mon MVP.

### Pourquoi ne pas avoir de refresh token ?

Le projet utilise un systeme JWT simple, suffisant pour le MVP. Un refresh token
serait utile pour une application plus avancee, mais il demande une gestion plus
complexe de la securite, du stockage et de l'expiration.

Phrase simple : c'est une evolution possible, mais pas necessaire pour le MVP.

### Quelle est la plus grosse amelioration future ?

Je pense que la plus grosse amelioration serait d'automatiser davantage le
planning : prendre en compte la duree des prestations, generer les creneaux a
partir des horaires et gerer plusieurs employes dans un salon.

Phrase simple : le planning est la partie qui pourrait devenir beaucoup plus
intelligente.

## 19. Reponse de secours si tu bloques

Si tu ne sais pas repondre parfaitement, utilise cette structure :

1. Je reformule simplement la question.
2. J'explique ce que fait mon projet actuellement.
3. Je dis pourquoi ce choix est suffisant pour le MVP.
4. Je propose une amelioration future si besoin.

Exemple :

Question : pourquoi pas de paiement en ligne ?

Reponse : Dans mon projet actuel, le paiement est hors MVP. L'objectif principal
est de valider le parcours de reservation. Ajouter un paiement demanderait une
integration securisee avec un prestataire comme Stripe, une gestion plus stricte
des erreurs et des aspects legaux. C'est une evolution possible, mais je l'ai
volontairement gardee pour plus tard.

## 20. Mini fiche a apprendre par coeur

Cut&Go est une application web de reservation pour salons de coiffure. Le
frontend est fait en HTML, CSS et JavaScript Vanilla. Le backend est une API
Express connectee a MySQL. Les utilisateurs peuvent etre clients ou salons.

Les clients peuvent chercher un salon, choisir une prestation, reserver un
creneau et annuler plus de 24 heures avant. Les salons peuvent gerer leurs
informations, leurs prestations, leurs horaires, leurs creneaux et leurs
reservations.

La securite de base repose sur bcrypt pour les mots de passe, JWT pour les
routes protegees, des middlewares pour les roles, des requetes SQL preparees
contre les injections SQL et des variables sensibles stockees dans `.env`.

La partie la plus importante techniquement est la reservation : elle utilise une
transaction SQL et `FOR UPDATE` pour eviter qu'un meme creneau soit reserve deux
fois.

Le projet est volontairement limite a un MVP : pas de paiement, pas de SMS, pas
d'upload reel et pas de gestion multi-employes. Ces limites sont des evolutions
possibles, mais le parcours principal est complet et explicable.
