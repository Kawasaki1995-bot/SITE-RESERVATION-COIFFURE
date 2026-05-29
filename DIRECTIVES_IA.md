# Directives IA - Projet Cut&Go

Ce fichier doit etre lu avant toute demande d'aide a une IA sur le projet Cut&Go. Il sert a garder une ligne directrice coherente pendant toute la conception et le developpement.

## 1. Identite du projet

- Nom du projet : Cut&Go.
- Type de projet : plateforme web de reservation pour salons de coiffure.
- Inspiration : Planity, mais en version simplifiee et adaptee a un projet DWWM.
- Public cible : clients qui veulent reserver rapidement et salons qui veulent gerer leurs rendez-vous.
- Style souhaite : premium, moderne, clair, rapide a utiliser.

## 2. Stack obligatoire

Le projet doit respecter les technologies vues dans le programme DWWM :

- HTML5
- CSS3
- JavaScript Vanilla
- Node.js
- Express.js
- MySQL
- bcrypt
- JWT
- dotenv
- mysql2
- Git / GitHub

## 3. Technologies a eviter pour le MVP

Ne pas proposer ces technologies pour le MVP, sauf demande explicite :

- React
- Vue
- Angular
- Next.js
- Tailwind CSS
- Bootstrap
- MongoDB
- Prisma
- TypeScript
- Paiement en ligne
- Upload avance de fichiers

## 4. Perimetre fonctionnel du MVP

Le MVP doit rester centre sur :

- inscription et connexion ;
- roles client et salon ;
- recherche de salon par ville ;
- filtres par note, prix et prestation ;
- fiche salon ;
- reservation d'un creneau disponible ;
- annulation possible uniquement plus de 24 heures avant ;
- dashboard salon ;
- gestion des prestations ;
- gestion des horaires et creneaux ;
- consultation des reservations ;
- chiffre d'affaires simple.

## 5. Fonctionnalites bonus

Ces fonctionnalites sont des bonus et ne doivent pas bloquer le MVP :

- vrais avis clients ;
- notifications email ou SMS ;
- paiement en ligne ;
- upload reel de photos ;
- geolocalisation avancee ;
- interface administrateur complete ;
- gestion de plusieurs employes dans un salon.

## 6. Regles metier importantes

- Un utilisateur a un role : client ou salon.
- Un compte salon represente un salon complet, pas un employe individuel.
- Un client reserve uniquement un creneau disponible.
- Une reservation rend le creneau indisponible.
- Si un creneau est deja pris, la reservation est refusee.
- Une annulation client est possible uniquement plus de 24 heures avant le rendez-vous.
- Les prestations affichent un nom et un prix.
- La duree des prestations n'est pas affichee dans le MVP.
- Les creneaux sont decoupes par tranche de 30 minutes.
- Les horaires d'ouverture sont configurables jour par jour.
- Les notes des salons sont fictives dans le MVP.

## 7. Attentes de qualite

Toute proposition de code doit :

- rester simple et lisible ;
- etre adaptee a un niveau DWWM ;
- separer les responsabilites ;
- utiliser des noms de fichiers et variables clairs ;
- utiliser des requetes SQL preparees ;
- ne jamais stocker de mot de passe en clair ;
- proteger les routes sensibles avec JWT ;
- verifier les roles avant les actions reservees aux salons ;
- gerer les erreurs HTTP proprement ;
- rester responsive mobile-first ;
- prendre en compte l'accessibilite de base.

## 8. Ordre de travail a respecter

L'ordre general du projet est :

1. cadrage, brief, wireframes et user stories ;
2. base de donnees et backend ;
3. frontend statique et dynamique ;
4. connexion front/back ;
5. tests, accessibilite, RGPD, documentation et deploiement.

## 9. Documents a consulter avant de coder

Avant de proposer du code, lire si possible :

- `cadrage_projet.md`
- `DIRECTIVES_IA.md`
- `TODO_PROJET.md`
- `STRUCTURE_PROJET.md`
- `brief.md`
- `wwindex.md`
- `journaldebord`

## 10. Suivi quotidien

Chaque jour de travail sur le projet doit etre inscrit dans le fichier `journaldebord`.

La mise a jour doit utiliser le format de date :

```text
JJ/MM/AAAA
```

Chaque entree quotidienne doit expliquer clairement :

- les decisions prises ;
- les fichiers crees ou modifies ;
- les fonctionnalites travaillees ;
- les problemes rencontres ;
- les prochaines actions conseillees.

Le journal de bord sert de journal de progression pour le dossier de projet et la soutenance DWWM.

## 11. Principe principal

Le projet doit etre complet, comprehensible et defendable devant un jury DWWM. Il vaut mieux livrer un MVP stable, securise et bien documente qu'une plateforme trop large avec des fonctionnalites inachevees.
