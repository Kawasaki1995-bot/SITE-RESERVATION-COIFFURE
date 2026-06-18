# User stories - Cut&Go

Ce document detaille les user stories du MVP Cut&Go avec leurs priorites et criteres d'acceptation.

## Priorites

- **Must** : indispensable pour livrer le MVP.
- **Should** : important, mais peut etre simplifie si le temps manque.
- **Could** : bonus ou amelioration apres le MVP.

## Parcours client

### US01 - Creation de compte client

**Priorite** : Must

En tant que client, je veux creer un compte afin de reserver un rendez-vous.

**Criteres d'acceptation**

- Le formulaire demande au minimum un nom, un email, un mot de passe et le role client.
- L'email doit etre unique.
- Le mot de passe est hashe avant d'etre stocke.
- Un message d'erreur s'affiche si un champ obligatoire est manquant.
- Un message d'erreur s'affiche si l'email existe deja.

### US02 - Connexion client

**Priorite** : Must

En tant que client, je veux me connecter afin d'acceder a mon espace personnel.

**Criteres d'acceptation**

- Le client peut se connecter avec son email et son mot de passe.
- Un JWT est genere si les identifiants sont corrects.
- Le role client est disponible cote front apres connexion.
- Un message d'erreur s'affiche si les identifiants sont incorrects.

### US03 - Recherche de salon par ville

**Priorite** : Must

En tant que client, je veux rechercher un salon par ville afin de trouver un salon proche de mon besoin.

**Criteres d'acceptation**

- Le client peut saisir une ville dans un champ de recherche.
- La page affiche uniquement les salons correspondant a la ville recherchee.
- Chaque resultat affiche au minimum le nom, la ville, la note fictive et une information de prix.
- Un message s'affiche si aucun salon n'est trouve.

### US04 - Filtres de recherche

**Priorite** : Should

En tant que client, je veux filtrer les salons par note, prix et prestation afin de comparer les offres.

**Criteres d'acceptation**

- Le client peut filtrer les resultats par note minimale.
- Le client peut filtrer les resultats par prix maximum.
- Le client peut filtrer les resultats par nom de prestation.
- Les filtres peuvent etre combines avec la recherche par ville.

### US05 - Consultation d'une fiche salon

**Priorite** : Must

En tant que client, je veux consulter la fiche d'un salon afin de voir ses informations et prestations.

**Criteres d'acceptation**

- La fiche affiche le nom du salon, la ville, l'adresse, la description, le telephone et une image.
- La fiche affiche les prestations disponibles avec leurs prix.
- La fiche affiche les creneaux disponibles.
- Un message clair s'affiche si le salon n'existe pas.

### US06 - Reservation d'un creneau

**Priorite** : Must

En tant que client, je veux reserver un creneau disponible afin d'obtenir un rendez-vous.

**Criteres d'acceptation**

- Le client doit etre connecte pour reserver.
- Le client choisit un salon, une prestation et un creneau disponible.
- La reservation est refusee si le creneau n'est plus disponible.
- Une reservation valide rend le creneau indisponible.
- Un message de confirmation s'affiche apres reservation.

### US07 - Consultation de mes rendez-vous

**Priorite** : Must

En tant que client, je veux consulter mes rendez-vous afin de suivre mes reservations.

**Criteres d'acceptation**

- Le client doit etre connecte pour acceder a ses rendez-vous.
- La page affiche les reservations du client connecte uniquement.
- Chaque reservation affiche le salon, la prestation, la date, l'heure, le prix et le statut.
- Les reservations annulees restent identifiables.

### US08 - Annulation d'un rendez-vous

**Priorite** : Must

En tant que client, je veux annuler un rendez-vous au moins 24 heures avant afin de liberer le creneau.

**Criteres d'acceptation**

- Le client peut annuler uniquement ses propres reservations.
- L'annulation est autorisee si le rendez-vous commence dans plus de 24 heures.
- L'annulation est refusee si le rendez-vous commence dans moins de 24 heures.
- Une reservation annulee libere le creneau associe.
- Un message explique la raison du refus si l'annulation est impossible.

## Parcours salon

### US09 - Creation de compte salon

**Priorite** : Must

En tant que salon, je veux creer un compte professionnel afin de presenter mon activite.

**Criteres d'acceptation**

- Le formulaire permet de choisir le role salon.
- L'email professionnel doit etre unique.
- Le mot de passe est hashe avant d'etre stocke.
- Un profil salon peut etre rattache au compte professionnel.

### US10 - Connexion salon

**Priorite** : Must

En tant que salon, je veux me connecter afin d'acceder a mon dashboard.

**Criteres d'acceptation**

- Le salon peut se connecter avec son email et son mot de passe.
- Un JWT est genere si les identifiants sont corrects.
- Le role salon est verifie avant l'acces au dashboard.
- Un client connecte ne peut pas acceder aux routes reservees au salon.

### US11 - Gestion des informations salon

**Priorite** : Must

En tant que salon, je veux modifier les informations de mon salon afin que les clients aient des donnees fiables.

**Criteres d'acceptation**

- Le salon peut modifier son nom, sa ville, son adresse, sa description, son telephone et son image.
- Les champs obligatoires sont controles.
- Un salon ne peut modifier que ses propres informations.
- Les informations modifiees sont visibles sur la fiche salon publique.

### US12 - Gestion des prestations

**Priorite** : Must

En tant que salon, je veux ajouter et modifier des prestations avec prix afin que les clients puissent choisir un service.

**Criteres d'acceptation**

- Le salon peut ajouter une prestation avec un nom et un prix.
- Le salon peut modifier une prestation existante.
- Le salon peut supprimer ou desactiver une prestation.
- Le prix doit etre un nombre positif.
- Un salon ne peut gerer que ses propres prestations.

### US13 - Gestion des horaires d'ouverture

**Priorite** : Should

En tant que salon, je veux gerer mes horaires d'ouverture afin de definir les creneaux possibles.

**Criteres d'acceptation**

- Le salon peut definir des horaires jour par jour.
- Un jour peut etre marque comme ferme.
- Les horaires servent de base a la creation des creneaux.
- Un salon ne peut gerer que ses propres horaires.

### US14 - Gestion des creneaux

**Priorite** : Must

En tant que salon, je veux rendre des creneaux disponibles ou indisponibles afin de gerer mon planning.

**Criteres d'acceptation**

- Les creneaux sont decoupes par tranche de 30 minutes.
- Le salon peut creer des creneaux disponibles.
- Le salon peut rendre un creneau indisponible.
- Un creneau reserve ne peut pas etre reserve une deuxieme fois.
- Un salon ne peut gerer que ses propres creneaux.

### US15 - Consultation des reservations salon

**Priorite** : Must

En tant que salon, je veux consulter mes reservations afin d'organiser mes journees.

**Criteres d'acceptation**

- Le dashboard affiche les reservations du salon connecte uniquement.
- Chaque reservation affiche le client, la prestation, la date, l'heure, le prix et le statut.
- Le salon peut distinguer les reservations confirmees et annulees.
- Une vue des reservations du jour est disponible.

### US16 - Chiffre d'affaires simple

**Priorite** : Should

En tant que salon, je veux voir un chiffre d'affaires simple afin de suivre mon activite.

**Criteres d'acceptation**

- Le dashboard affiche le chiffre d'affaires du jour.
- Le dashboard affiche le chiffre d'affaires de la semaine.
- Le dashboard affiche le chiffre d'affaires du mois.
- Les reservations annulees ne sont pas comptees dans le chiffre d'affaires.

## Administration

### US17 - Administration de la plateforme

**Priorite** : Could

En tant qu'administrateur, je veux gerer les utilisateurs et les salons afin de maintenir la qualite de la plateforme.

**Criteres d'acceptation**

- L'administrateur peut consulter la liste des comptes.
- L'administrateur peut modifier le nom, l'email, le role et le statut d'un compte.
- L'administrateur peut restreindre ou reactiver un compte.
- Un compte restreint ne peut pas se connecter.
- L'administrateur peut supprimer un compte.
- L'administrateur ne peut pas supprimer son propre compte ni retirer ses propres droits admin.

## Parametres du compte

### US18 - Modification du compte utilisateur

**Priorite** : Should

En tant qu'utilisateur connecte, je veux modifier mon nom, mon email et mon adresse personnelle afin de garder mon compte a jour.

**Criteres d'acceptation**

- L'utilisateur connecte peut ouvrir une page `Mon compte`.
- Le formulaire affiche le nom, l'email et l'adresse personnelle existants.
- L'utilisateur peut modifier ces informations.
- L'email reste unique.
- Apres modification, la session frontend est mise a jour.
- Pour un salon, l'adresse personnelle reste separee de l'adresse publique du salon.

## Synthese MVP

| ID | User story | Priorite |
| --- | --- | --- |
| US01 | Creation de compte client | Must |
| US02 | Connexion client | Must |
| US03 | Recherche de salon par ville | Must |
| US04 | Filtres de recherche | Should |
| US05 | Consultation d'une fiche salon | Must |
| US06 | Reservation d'un creneau | Must |
| US07 | Consultation de mes rendez-vous | Must |
| US08 | Annulation d'un rendez-vous | Must |
| US09 | Creation de compte salon | Must |
| US10 | Connexion salon | Must |
| US11 | Gestion des informations salon | Must |
| US12 | Gestion des prestations | Must |
| US13 | Gestion des horaires d'ouverture | Should |
| US14 | Gestion des creneaux | Must |
| US15 | Consultation des reservations salon | Must |
| US16 | Chiffre d'affaires simple | Should |
| US17 | Administration de la plateforme | Should |
| US18 | Modification du compte utilisateur | Should |
