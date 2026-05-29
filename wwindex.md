# Wireframes et parcours - Cut&Go

Ce document decrit les wireframes basse fidelite et les parcours principaux de Cut&Go. Il sert de base pour les maquettes Figma et l'integration frontend.

## 1. Arborescence du site

```text
Accueil / Recherche
|-- Connexion / Inscription
|-- Resultats de recherche
|   |-- Fiche salon
|       |-- Reservation d'un creneau
|-- Mes rendez-vous
|-- Dashboard salon
|   |-- Informations du salon
|   |-- Prestations
|   |-- Horaires et creneaux
|   |-- Reservations
|-- Mentions legales
|-- Politique de confidentialite
```

## 2. Pages principales

### Accueil et recherche

Objectif : permettre au client de rechercher rapidement un salon par ville.

```text
------------------------------------------------
Cut&Go                         Connexion
------------------------------------------------

      Reservez votre coiffeur en quelques clics

      [ Rechercher un salon par ville       ]
      [ Rechercher ]

------------------------------------------------
 Salons populaires
------------------------------------------------

[ Carte salon ]
[ Carte salon ]
[ Carte salon ]

------------------------------------------------
 Footer : mentions legales | confidentialite
------------------------------------------------
```

Elements attendus :

- logo Cut&Go ;
- lien connexion / inscription ;
- champ de recherche par ville ;
- bouton de recherche ;
- liste de salons mis en avant ;
- footer simple.

### Resultats de recherche

Objectif : afficher les salons correspondant a la ville et permettre une comparaison rapide.

```text
------------------------------------------------
Cut&Go                         Mes RDV | Compte
------------------------------------------------

Recherche : [ Bruxelles               ] [ OK ]

Filtres :
[ Note minimale ] [ Prix max ] [ Prestation ]

------------------------------------------------
[ Salon Elegance                         4.8 ]
  Bruxelles
  Coupe homme des 25 EUR
  [ Voir le salon ]
------------------------------------------------
[ Studio Barber                          4.6 ]
  Bruxelles
  Barbe des 18 EUR
  [ Voir le salon ]
------------------------------------------------
```

Elements attendus :

- champ de ville modifiable ;
- filtres note, prix et prestation ;
- cartes salon ;
- message si aucun resultat n'est trouve.

### Fiche salon

Objectif : presenter les informations du salon et permettre la reservation.

```text
------------------------------------------------
Image / couverture du salon
------------------------------------------------

Salon Elegance                         Note 4.8
Adresse, ville
Telephone

Description courte du salon.

------------------------------------------------
Prestations
------------------------------------------------

- Coupe homme                         25 EUR
- Coupe femme                         45 EUR
- Barbe                               18 EUR

------------------------------------------------
Creneaux disponibles
------------------------------------------------

[ 09:00 ] [ 09:30 ] [ 10:00 ] [ 10:30 ]
[ 11:00 ] [ 11:30 ] [ 14:00 ] [ 14:30 ]

[ Reserver ]
```

Elements attendus :

- nom du salon ;
- ville, adresse, telephone ;
- image ou image par defaut ;
- description ;
- prestations avec prix ;
- creneaux disponibles ;
- bouton de reservation.

### Connexion et inscription

Objectif : permettre aux clients et salons de creer un compte ou de se connecter.

```text
------------------------------------------------
Cut&Go
------------------------------------------------

[ Connexion ] [ Inscription ]

Email
[________________________________]

Mot de passe
[________________________________]

[ Se connecter ]

------------------------------------------------
Inscription
------------------------------------------------

Nom
[________________________________]

Email
[________________________________]

Mot de passe
[________________________________]

Role
( ) Client    ( ) Salon

[ Creer mon compte ]
```

Elements attendus :

- formulaire de connexion ;
- formulaire d'inscription ;
- choix du role client ou salon ;
- messages d'erreur ;
- redirection selon le role apres connexion.

### Mes rendez-vous

Objectif : permettre au client de consulter et annuler ses reservations.

```text
------------------------------------------------
Mes rendez-vous
------------------------------------------------

[ Reservation ]
Salon Elegance
Coupe homme - 25 EUR
12/06/2026 a 10:00
Statut : confirmee
[ Annuler ]

[ Reservation ]
Studio Barber
Barbe - 18 EUR
15/06/2026 a 14:30
Statut : annulee
```

Elements attendus :

- liste des reservations du client connecte ;
- informations principales du rendez-vous ;
- statut ;
- bouton d'annulation si la regle des 24 heures le permet ;
- message si aucune reservation n'existe.

### Dashboard salon

Objectif : donner au salon une vue rapide de son activite et de sa gestion.

```text
------------------------------------------------
Dashboard salon
------------------------------------------------

Chiffre d'affaires
[ Aujourd'hui ] [ Semaine ] [ Mois ]

------------------------------------------------
Reservations du jour
------------------------------------------------

10:00 - Client Martin - Coupe homme - 25 EUR
11:30 - Client Durand - Barbe - 18 EUR

------------------------------------------------
Prestations
------------------------------------------------

Coupe homme - 25 EUR        [ Modifier ]
Barbe - 18 EUR              [ Modifier ]

[ Ajouter une prestation ]

------------------------------------------------
Creneaux
------------------------------------------------

12/06/2026
[ 09:00 disponible ] [ 09:30 indisponible ]
[ Ajouter un creneau ]
```

Elements attendus :

- resume du chiffre d'affaires ;
- reservations du jour ;
- gestion des prestations ;
- gestion des creneaux ;
- acces reserve aux comptes salon.

## 3. Parcours client

```text
Accueil
-> Recherche par ville
-> Resultats de recherche
-> Fiche salon
-> Choix prestation et creneau
-> Connexion si necessaire
-> Confirmation reservation
-> Mes rendez-vous
```

Etapes principales :

1. Le client recherche une ville.
2. Il compare les salons.
3. Il ouvre une fiche salon.
4. Il choisit une prestation et un creneau.
5. Il se connecte ou cree un compte si necessaire.
6. Il confirme la reservation.
7. Il retrouve son rendez-vous dans son espace.

## 4. Parcours salon

```text
Inscription salon
-> Connexion
-> Dashboard salon
-> Modification des informations du salon
-> Ajout des prestations
-> Creation des creneaux
-> Consultation des reservations
```

Etapes principales :

1. Le salon cree un compte professionnel.
2. Il complete ses informations.
3. Il ajoute ses prestations.
4. Il configure ses horaires et ses creneaux.
5. Il consulte ses reservations.
6. Il suit un chiffre d'affaires simple.

## 5. Fonctionnalites MVP

| Fonctionnalite | Priorite |
| --- | --- |
| Inscription et connexion | Haute |
| Roles client et salon | Haute |
| Recherche salon par ville | Haute |
| Filtres note, prix et prestation | Moyenne |
| Fiche salon | Haute |
| Reservation de creneau | Haute |
| Mes rendez-vous client | Haute |
| Annulation plus de 24 heures avant | Haute |
| Dashboard salon | Haute |
| Gestion des prestations | Haute |
| Gestion horaires et creneaux | Haute |
| Chiffre d'affaires simple | Moyenne |
| Responsive mobile | Haute |

## 6. Fonctionnalites hors MVP

| Fonctionnalite | Priorite |
| --- | --- |
| Paiement en ligne | Basse |
| Notifications email ou SMS | Basse |
| Upload reel de photos | Basse |
| Geolocalisation avancee | Basse |
| Avis clients avances | Basse |
| Interface administrateur complete | Basse |
| Gestion multi-employes | Basse |

## 7. Notes de design

- Interface premium, claire et rapide a utiliser.
- Priorite mobile-first.
- Navigation simple : recherche, fiche salon, reservation, espace personnel.
- Dashboard salon dense mais lisible.
- Pas de fonctionnalites decoratives qui ralentissent le MVP.
- Les pages doivent rester accessibles : labels, contrastes suffisants, boutons explicites.
