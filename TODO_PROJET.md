# Todo projet - Cut&Go

Cette todo suit l'ordre de travail souhaite : conception, backend, frontend, puis integration front/back.

## Phase 1 - Cadrage, brief, wireframes et user stories

- [x] Choisir le nom du projet : Cut&Go.
- [x] Definir le public cible : clients et salons de coiffure.
- [x] Definir le perimetre MVP.
- [x] Identifier les fonctionnalites bonus.
- [x] Rediger un premier brief projet.
- [x] Rediger les premieres user stories.
- [x] Creer les premiers wireframes basse fidelite.
- [x] Corriger les textes encodes dans les fichiers existants si necessaire.
- [x] Completer les user stories avec des criteres d'acceptation.
- [x] Organiser les user stories par priorite : Must, Should, Could.
- [x] Finaliser le parcours client complet.
- [x] Finaliser le parcours salon complet.
- [ ] Creer ou finaliser les maquettes Figma desktop.
- [ ] Creer ou finaliser les maquettes Figma mobile.
- [x] Verifier la coherence entre brief, wireframes et MVP.

## Phase 2 - Backend et base de donnees

- [x] Creer le fichier `schema.sql`.
- [x] Creer la table `users`.
- [x] Creer la table `salons`.
- [x] Creer la table `prestations`.
- [x] Creer la table `horaires_ouverture`.
- [x] Creer la table `creneaux`.
- [x] Creer la table `reservations`.
- [x] Ajouter des contraintes SQL : cles primaires, cles etrangeres, NOT NULL, UNIQUE.
- [x] Ajouter des donnees de test realistes.
- [x] Creer le projet Node.js avec `package.json`.
- [x] Installer Express, mysql2, dotenv, bcrypt, jsonwebtoken et cors.
- [x] Mettre en place la structure backend : routes, controllers, middlewares, config.
- [x] Configurer la connexion MySQL avec un pool.
- [x] Creer les routes d'inscription et connexion.
- [x] Hasher les mots de passe avec bcrypt.
- [x] Generer un JWT a la connexion.
- [x] Creer un middleware d'authentification JWT.
- [x] Creer un middleware de role client/salon.
- [x] Creer les routes publiques de recherche salons.
- [x] Creer les routes de fiche salon.
- [x] Creer les routes salon pour les prestations.
- [x] Creer les routes salon pour les horaires et creneaux.
- [x] Creer les routes client pour les reservations.
- [x] Ajouter la regle d'annulation 24 heures avant.
- [x] Tester les routes avec Postman ou Thunder Client.
- [x] Documenter les endpoints API.

## Phase 3 - Frontend

- [x] Creer la structure frontend.
- [x] Creer `index.html` pour l'accueil et la recherche.
- [x] Creer `auth.html` pour connexion/inscription.
- [x] Creer `salon.html` pour la fiche salon.
- [x] Creer `mes-rdv.html` pour les rendez-vous client.
- [x] Creer `dashboard.html` pour l'espace salon.
- [x] Creer les pages mentions legales et confidentialite.
- [x] Creer le fichier CSS principal.
- [x] Definir les variables CSS : couleurs, espaces, typographies.
- [x] Integrer le style premium Cut&Go.
- [x] Rendre toutes les pages responsive mobile-first.
- [x] Ajouter la validation JS des formulaires.
- [x] Creer une navigation adaptee au role utilisateur.
- [x] Creer les composants visuels : cartes salon, boutons, formulaires, listes.
- [x] Tester l'accessibilite de base : labels, contrastes, navigation clavier.

## Phase 4 - Connexion front/back

- [x] Connecter l'inscription au backend.
- [x] Connecter la connexion au backend.
- [x] Stocker le JWT en `sessionStorage`.
- [x] Envoyer le JWT dans le header `Authorization`.
- [x] Verifier la syntaxe JavaScript apres branchement de l'authentification.
- [x] Gerer l'etat connecte/deconnecte.
- [x] Gerer l'affichage selon le role client ou salon.
- [x] Connecter la recherche salon a l'API.
- [x] Connecter les filtres note, prix et prestation.
- [x] Ajouter `image_url` dans la reponse API de recherche salons pour les cartes frontend.
- [x] Connecter la fiche salon aux donnees API.
- [x] Connecter les prestations salon aux donnees API.
- [x] Connecter les creneaux salon aux donnees API.
- [x] Connecter la reservation d'un creneau.
- [x] Gerer les messages de refus si le creneau est indisponible.
- [x] Recharger les creneaux disponibles apres une reservation.
- [x] Connecter l'affichage des rendez-vous client.
- [x] Connecter l'annulation de rendez-vous.
- [x] Connecter le dashboard salon.
- [x] Connecter les statistiques salon.
- [x] Connecter l'affichage des reservations salon.
- [x] Connecter la gestion des prestations.
- [x] Connecter la gestion des horaires et creneaux.
- [x] Ajouter les loaders et messages d'erreur.
- [x] Tester le parcours client complet.
- [x] Tester le parcours salon complet.

## Phase 5 - Finalisation jury

- [x] Ajouter dans `DIRECTIVES_IA.md` la regle de mise a jour systematique de `TODO_PROJET.md`.
- [x] Rediger le README d'installation.
- [x] Documenter les variables d'environnement.
- [x] Ajouter des comptes de test.
- [x] Faire un audit Lighthouse.
- [x] Corriger les problemes d'accessibilite principaux.
- [x] Verifier les mentions legales et la confidentialite.
- [x] Preparer le dossier de projet.
- [x] Preparer le support de presentation.
- [x] Preparer un scenario de demonstration.
- [x] Preparer les reponses aux questions techniques du jury.
- [x] Deployer l'application sur Alwaysdata.
- [x] Tester l'application en production sur Alwaysdata.
