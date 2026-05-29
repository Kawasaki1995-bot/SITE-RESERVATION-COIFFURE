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
- [ ] Finaliser le parcours client complet.
- [ ] Finaliser le parcours salon complet.
- [ ] Creer ou finaliser les maquettes Figma desktop.
- [ ] Creer ou finaliser les maquettes Figma mobile.
- [ ] Verifier la coherence entre brief, wireframes et MVP.

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

- [ ] Creer la structure frontend.
- [ ] Creer `index.html` pour l'accueil et la recherche.
- [ ] Creer `auth.html` pour connexion/inscription.
- [ ] Creer `salon.html` pour la fiche salon.
- [ ] Creer `mes-rdv.html` pour les rendez-vous client.
- [ ] Creer `dashboard.html` pour l'espace salon.
- [ ] Creer les pages mentions legales et confidentialite.
- [ ] Creer le fichier CSS principal.
- [ ] Definir les variables CSS : couleurs, espaces, typographies.
- [ ] Integrer le style premium Cut&Go.
- [ ] Rendre toutes les pages responsive mobile-first.
- [ ] Ajouter la validation JS des formulaires.
- [ ] Creer une navigation adaptee au role utilisateur.
- [ ] Creer les composants visuels : cartes salon, boutons, formulaires, listes.
- [ ] Tester l'accessibilite de base : labels, contrastes, navigation clavier.

## Phase 4 - Connexion front/back

- [ ] Connecter l'inscription au backend.
- [ ] Connecter la connexion au backend.
- [ ] Stocker le JWT en `sessionStorage`.
- [ ] Envoyer le JWT dans le header `Authorization`.
- [ ] Gerer l'etat connecte/deconnecte.
- [ ] Gerer l'affichage selon le role client ou salon.
- [ ] Connecter la recherche salon a l'API.
- [ ] Connecter les filtres note, prix et prestation.
- [ ] Connecter la fiche salon aux donnees API.
- [ ] Connecter la reservation d'un creneau.
- [ ] Gerer les messages de refus si le creneau est indisponible.
- [ ] Connecter l'annulation de rendez-vous.
- [ ] Connecter le dashboard salon.
- [ ] Connecter la gestion des prestations.
- [ ] Connecter la gestion des horaires et creneaux.
- [ ] Ajouter les loaders et messages d'erreur.
- [ ] Tester le parcours client complet.
- [ ] Tester le parcours salon complet.

## Phase 5 - Finalisation jury

- [ ] Rediger le README d'installation.
- [ ] Documenter les variables d'environnement.
- [ ] Ajouter des comptes de test.
- [ ] Faire un audit Lighthouse.
- [ ] Corriger les problemes d'accessibilite principaux.
- [ ] Verifier les mentions legales et la confidentialite.
- [ ] Preparer le dossier de projet.
- [ ] Preparer le support de presentation.
- [ ] Preparer un scenario de demonstration.
- [ ] Preparer les reponses aux questions techniques du jury.
- [ ] Deployer l'application.
- [ ] Tester l'application en production.
