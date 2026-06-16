# Cadrage projet - Cut&Go

## 1. Positionnement du projet

Cut&Go est une plateforme web premium de reservation de rendez-vous pour salons de coiffure. Elle s'inspire du fonctionnement de Planity, mais avec un perimetre volontairement reduit afin de rester realiste pour un projet de fin de formation DWWM.

L'application met en relation deux types d'utilisateurs :

- les clients, qui recherchent un salon de coiffure et reservent un creneau disponible ;
- les salons, qui gerent leurs informations, leurs prestations, leurs horaires et leurs reservations.

Le projet se limite aux salons de coiffure. Les services d'esthetique, onglerie, massage ou bien-etre ne font pas partie du MVP.

## 2. Identite du projet

Le nom retenu pour le projet est Cut&Go.

Ce nom evoque une experience rapide, moderne et simple : le client cherche un salon, choisit un creneau, reserve, puis se rend a son rendez-vous.

La direction graphique vise une ambiance premium et dynamique : noir profond, blanc casse, accents dores, typographies elegantes, boutons nets, interface sobre et lisible. L'objectif est de donner une impression professionnelle sans perdre le cote pratique et rapide du service.

## 3. Stack technique

La stack doit rester alignee avec le programme DWWM :

- HTML5
- CSS3
- JavaScript Vanilla
- Node.js
- Express.js
- MySQL
- bcrypt pour le hashage des mots de passe
- JWT pour l'authentification
- Git et GitHub
- Figma pour les maquettes
- Postman ou Thunder Client pour les tests API

Frameworks front-end non prioritaires : React, Vue, Angular, Tailwind, Bootstrap.

## 4. Perimetre MVP

### Parcours client

- Creer un compte client.
- Se connecter.
- Rechercher un salon par ville.
- Filtrer les resultats par note, prix et prestation.
- Consulter la fiche d'un salon.
- Voir les prestations avec leurs prix.
- Choisir un creneau disponible.
- Reserver un rendez-vous.
- Consulter ses rendez-vous.
- Annuler un rendez-vous au moins 24 heures avant.

### Parcours salon

- Creer un compte professionnel.
- Se connecter.
- Completer les informations du salon : nom, ville, adresse, description, telephone.
- Gerer les prestations proposees avec prix.
- Definir les horaires d'ouverture jour par jour.
- Rendre certains creneaux disponibles ou indisponibles.
- Consulter les reservations.
- Voir les reservations du jour.
- Suivre un chiffre d'affaires simple : jour, semaine et mois.

### Hors MVP ou bonus

- Paiement en ligne.
- Notifications email ou SMS.
- Upload reel de photos.
- Geolocalisation avancee.
- Interface administrateur complete.
- Avis clients avances.
- Gestion multi-employes dans un salon.
- Upload reel d'images.

## 5. Regles metier

- Un compte utilisateur possede un role : client ou salon.
- Un salon correspond a un compte professionnel.
- Un client peut reserver uniquement un creneau disponible.
- Si le creneau n'est plus disponible, l'application affiche un message de refus.
- Une reservation rend le creneau indisponible.
- Une annulation client est autorisee uniquement plus de 24 heures avant le rendez-vous.
- Les prix des prestations sont affiches au client.
- La duree des prestations n'est pas affichee dans le MVP.
- Les creneaux sont bases sur les horaires d'ouverture du salon.
- Le salon peut indiquer manuellement qu'un creneau est disponible ou non disponible.
- Les creneaux sont decoupes toutes les 30 minutes afin de proposer un planning precis.
- Les horaires d'ouverture sont configurables jour par jour.
- Les notes des salons sont des donnees fictives dans le MVP.
- Les salons utilisent une image de couverture par defaut ou une URL d'image, sans upload de fichier dans le MVP.
- Le chiffre d'affaires affiche dans le dashboard est calcule a partir des reservations non annulees.
- Une page mentions legales et une page confidentialite sont prevues afin de montrer la prise en compte du RGPD.

## 6. Pages principales

- Accueil avec recherche par ville.
- Resultats de recherche avec filtres.
- Fiche salon.
- Connexion / inscription avec choix du role.
- Mes rendez-vous client.
- Dashboard salon.
- Gestion des prestations.
- Gestion des horaires et creneaux.
- Liste des reservations salon.
- Mentions legales.
- Politique de confidentialite.

## 7. User stories prioritaires

### Client

- En tant que client, je veux creer un compte afin de reserver un rendez-vous.
- En tant que client, je veux me connecter afin d'acceder a mon espace personnel.
- En tant que client, je veux rechercher un salon par ville afin de trouver un salon proche de mon besoin.
- En tant que client, je veux filtrer les salons par note, prix et prestation afin de comparer les offres.
- En tant que client, je veux consulter la fiche d'un salon afin de voir ses informations et prestations.
- En tant que client, je veux reserver un creneau disponible afin d'obtenir un rendez-vous.
- En tant que client, je veux consulter mes rendez-vous afin de suivre mes reservations.
- En tant que client, je veux annuler un rendez-vous au moins 24 heures avant afin de liberer le creneau.

### Salon

- En tant que salon, je veux creer un compte professionnel afin de presenter mon activite.
- En tant que salon, je veux modifier les informations de mon salon afin que les clients aient des donnees fiables.
- En tant que salon, je veux ajouter des prestations avec prix afin que les clients puissent choisir un service.
- En tant que salon, je veux gerer mes horaires d'ouverture afin de definir les creneaux possibles.
- En tant que salon, je veux rendre des creneaux disponibles ou indisponibles afin de gerer mon planning.
- En tant que salon, je veux consulter mes reservations afin d'organiser mes journees.
- En tant que salon, je veux voir les reservations du jour afin d'avoir une vue rapide de mon activite.

## 8. Choix retenus pour le MVP

- Nom du projet : Cut&Go.
- Domaine fonctionnel : uniquement les salons de coiffure.
- Role professionnel : un compte salon represente un salon, pas un employe individuel.
- Recherche principale : ville.
- Filtres secondaires : note, prix, prestation.
- Notes : donnees fictives pour le MVP.
- Prestations : nom et prix visibles, duree non affichee.
- Creneaux : pas de generation complexe par duree de prestation, decoupage simple par tranche de 30 minutes.
- Horaires : configurables jour par jour.
- Annulation : autorisee uniquement plus de 24 heures avant le rendez-vous.
- Dashboard : reservations du jour, gestion des prestations, gestion des creneaux, chiffre d'affaires jour/semaine/mois.
- Images : image par defaut ou URL simple, pas d'upload reel dans le MVP.
- Conformite : mentions legales et confidentialite prevues.

## 9. Etat de finalisation

Les elements du MVP sont maintenant couverts :

- modele de base de donnees avec `users`, `salons`, `prestations`, `horaires_ouverture`, `creneaux` et `reservations` ;
- API Express avec routes publiques, routes protegees et verification des roles ;
- frontend HTML, CSS et JavaScript Vanilla ;
- parcours client complet ;
- parcours salon complet ;
- pages legales ;
- documentation technique et support de presentation.

Le MVP est maintenant deploye sur Alwaysdata. Les dernieres actions concernent surtout la verification finale de la documentation, les tests de demonstration, les captures pour le dossier professionnel et les revisions avant jury.
