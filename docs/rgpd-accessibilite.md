# RGPD et accessibilite - Cut&Go

Ce document explique les mesures prevues dans le MVP Cut&Go pour les donnees personnelles et l'accessibilite de base.

## 1. Donnees collectees

Le MVP collecte uniquement les donnees utiles au fonctionnement de la reservation :

- nom de l'utilisateur ;
- email ;
- role : client ou salon ;
- informations du salon : nom, ville, adresse, description, telephone, image ;
- prestations ;
- creneaux ;
- reservations.

Le projet ne collecte pas de donnees de paiement, pas de piece d'identite, pas de geolocalisation precise et pas de donnees de sante.

## 2. Finalite des donnees

Les donnees sont utilisees pour :

- creer un compte ;
- connecter l'utilisateur ;
- rechercher un salon ;
- afficher une fiche salon ;
- reserver un creneau ;
- consulter ou annuler un rendez-vous ;
- permettre au salon de gerer son activite.

## 3. Securite

Mesures integrees dans le MVP :

- mots de passe hashes avec `bcrypt` ;
- routes sensibles protegees par JWT ;
- verification des roles cote backend ;
- requetes SQL preparees avec `mysql2` ;
- configuration sensible separee dans `.env` ;
- messages d'erreur controles.

## 4. Mentions legales et confidentialite

Deux pages existent dans le frontend :

- `frontend/mentions-legales.html` ;
- `frontend/confidentialite.html`.

Elles expliquent que Cut&Go est un projet pedagogique, que les donnees du MVP servent a la demonstration, et que les mots de passe sont proteges par hash.

Pour une vraie mise en production, il faudrait completer :

- l'identite exacte de l'editeur ;
- l'hebergeur ;
- l'adresse de contact ;
- la duree de conservation des donnees ;
- la procedure de suppression ou rectification des donnees.

## 5. Accessibilite de base

Mesures presentes dans le projet :

- structure HTML semantique avec `header`, `nav`, `main`, `section` ;
- labels sur les formulaires ;
- textes de boutons explicites ;
- contrastes visuels renforces ;
- navigation responsive ;
- messages d'erreur visibles dans les formulaires ;
- attributs `alt` sur les images dynamiques ;
- utilisation de `textContent` ou echappement HTML pour les contenus dynamiques.

## 6. Limites connues

- Un audit Lighthouse a ete realise sur la page d'accueil et documente dans `docs/lighthouse.md`.
- Aucun test avec lecteur d'ecran n'a encore ete documente.
- Le projet reste un MVP pedagogique, meme s'il est deploye en ligne sur Alwaysdata.

## 7. Phrase simple pour l'oral

```text
Pour le MVP, j'ai limite les donnees collectees au strict necessaire, protege les mots de passe avec bcrypt, protege les routes avec JWT, et ajoute des pages mentions legales et confidentialite pour montrer la prise en compte du RGPD.
```
