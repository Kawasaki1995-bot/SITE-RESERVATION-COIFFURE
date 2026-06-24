# Wireframes - Cut&Go

## Objectif du document

Ce document presente les wireframes basse fidelite de Cut&Go, une application web de reservation de rendez-vous pour salons de coiffure.

Les wireframes servent a visualiser les ecrans principaux avant ou pendant l'integration HTML/CSS. Ils ne representent pas le design final, mais l'organisation des zones, les contenus importants et les actions utilisateur.

## Principes generaux

- Interface simple et lisible.
- Parcours client rapide : rechercher, choisir, reserver.
- Parcours salon centre sur la gestion des prestations, horaires, creneaux et reservations.
- Parcours administrateur dedie a la gestion des comptes.
- Navigation claire entre les pages.
- Formulaires courts avec labels visibles.
- Version responsive prevue pour mobile, tablette et desktop.

## Arborescence des ecrans

```text
Accueil / Recherche
|-- Connexion / Inscription
|-- Fiche salon
|   |-- Choix prestation
|   |-- Choix creneau
|   `-- Confirmation reservation
|-- Mes rendez-vous
|-- Mon compte
|-- Dashboard salon
|   |-- Informations salon
|   |-- Prestations
|   |-- Horaires
|   |-- Creneaux
|   `-- Reservations
`-- Administration
    |-- Liste des comptes
    |-- Modification compte
    |-- Restriction / reactivation
    `-- Suppression compte
```

## Parcours utilisateur

### Parcours client

```text
Inscription / Connexion
        |
        v
Recherche de salon
        |
        v
Filtres + resultats
        |
        v
Fiche salon
        |
        v
Choix prestation
        |
        v
Choix creneau
        |
        v
Reservation confirmee
        |
        v
Mes rendez-vous
```

### Parcours salon

```text
Inscription professionnelle / Connexion
        |
        v
Dashboard salon
        |
        +-- Modifier les informations du salon
        +-- Gerer les prestations
        +-- Gerer les horaires
        +-- Creer / bloquer des creneaux
        `-- Consulter les reservations
```

### Parcours administrateur

```text
Connexion administrateur
        |
        v
Interface admin
        |
        +-- Consulter les comptes
        +-- Modifier un compte
        +-- Restreindre un compte
        +-- Reactiver un compte
        `-- Supprimer un compte
```

---

# Wireframes des ecrans

## 1. Accueil et recherche de salons

Objectif : permettre au client de rechercher rapidement un salon et d'acceder aux resultats.

```text
+------------------------------------------------------------------+
| LOGO Cut&Go        Accueil     Mes RDV     Connexion / Compte     |
+------------------------------------------------------------------+
|                                                                  |
|              Trouver un salon de coiffure                        |
|       [ Ville ou nom du salon ____________________ ] [Rechercher] |
|                                                                  |
+------------------------------------------------------------------+
| Filtres                                                          |
| [Ville] [Specialite] [Prix] [Disponibilite]                       |
+------------------------------------------------------------------+
| Resultats                                                        |
|                                                                  |
| +-------------------+  +-------------------+  +----------------+ |
| | Nom salon         |  | Nom salon         |  | Nom salon      | |
| | Ville             |  | Ville             |  | Ville          | |
| | Note / infos      |  | Note / infos      |  | Note / infos   | |
| | [Voir le salon]   |  | [Voir le salon]   |  | [Voir salon]   | |
| +-------------------+  +-------------------+  +----------------+ |
|                                                                  |
+------------------------------------------------------------------+
```

Elements importants :

- barre de navigation ;
- zone de recherche principale ;
- filtres ;
- cartes de salons ;
- bouton vers la fiche salon.

## 2. Connexion et inscription

Objectif : permettre a un utilisateur de se connecter ou de creer un compte client ou salon.

```text
+------------------------------------------------------------------+
| LOGO Cut&Go                              Retour accueil           |
+------------------------------------------------------------------+
|                                                                  |
|        +----------------------+   +----------------------+        |
|        | Connexion            |   | Inscription          |        |
|        |                      |   |                      |        |
|        | Email                |   | Nom                  |        |
|        | [______________]     |   | [______________]     |        |
|        | Mot de passe         |   | Email                |        |
|        | [______________]     |   | [______________]     |        |
|        |                      |   | Mot de passe         |        |
|        | [Se connecter]       |   | [______________]     |        |
|        |                      |   | Role: client/salon   |        |
|        | Message erreur/succes|   | [Creer un compte]    |        |
|        +----------------------+   +----------------------+        |
|                                                                  |
+------------------------------------------------------------------+
```

Elements importants :

- deux formulaires lisibles ;
- choix du role a l'inscription ;
- messages d'erreur ou de succes ;
- champs obligatoires clairement identifies.

## 3. Fiche salon

Objectif : presenter les informations du salon et guider le client vers la reservation.

```text
+------------------------------------------------------------------+
| LOGO Cut&Go        Accueil     Mes RDV     Compte                 |
+------------------------------------------------------------------+
|                                                                  |
| +--------------------------+  +--------------------------------+ |
| | Photo / image salon      |  | Nom du salon                   | |
| |                          |  | Ville, adresse                 | |
| |                          |  | Description courte             | |
| |                          |  | Horaires d'ouverture           | |
| +--------------------------+  +--------------------------------+ |
|                                                                  |
+------------------------------------------------------------------+
| Prestations                                                      |
| +------------------+ +------------------+ +------------------+   |
| | Coupe homme      | | Coupe femme      | | Barbe            |   |
| | Prix / duree     | | Prix / duree     | | Prix / duree     |   |
| | [Choisir]        | | [Choisir]        | | [Choisir]        |   |
| +------------------+ +------------------+ +------------------+   |
+------------------------------------------------------------------+
| Creneaux disponibles                                             |
| [10:00] [11:00] [14:00] [15:30] [17:00]                          |
|                                                                  |
|                         [Confirmer la reservation]               |
+------------------------------------------------------------------+
```

Elements importants :

- informations publiques du salon ;
- liste des prestations ;
- creneaux disponibles ;
- bouton de confirmation ;
- message si aucun creneau n'est disponible.

## 4. Mes rendez-vous

Objectif : permettre au client de consulter et annuler ses reservations.

```text
+------------------------------------------------------------------+
| LOGO Cut&Go        Accueil     Mes RDV     Compte                 |
+------------------------------------------------------------------+
| Mes rendez-vous                                                  |
+------------------------------------------------------------------+
| +--------------------------------------------------------------+ |
| | Salon        | Prestation     | Date       | Heure | Statut   | |
| |--------------|----------------|------------|-------|----------| |
| | Salon A      | Coupe homme    | 25/06/2026 | 10:00 | Confirme | |
| | Salon B      | Barbe          | 28/06/2026 | 14:00 | Confirme | |
| +--------------------------------------------------------------+ |
|                                                                  |
| [Annuler le rendez-vous selectionne]                             |
| Message : annulation possible selon la regle des 24 heures        |
+------------------------------------------------------------------+
```

Elements importants :

- liste des rendez-vous ;
- statut de reservation ;
- action d'annulation ;
- message de confirmation ou d'erreur.

## 5. Mon compte

Objectif : permettre a l'utilisateur connecte de modifier ses informations personnelles.

```text
+------------------------------------------------------------------+
| LOGO Cut&Go        Accueil     Mes RDV     Deconnexion            |
+------------------------------------------------------------------+
| Mon compte                                                       |
+------------------------------------------------------------------+
| +--------------------------------------------------------------+ |
| | Informations personnelles                                    | |
| |                                                              | |
| | Nom               [____________________]                     | |
| | Prenom            [____________________]                     | |
| | Email             [____________________]                     | |
| | Telephone         [____________________]                     | |
| |                                                              | |
| | [Enregistrer les modifications]                              | |
| | Message succes / erreur                                      | |
| +--------------------------------------------------------------+ |
+------------------------------------------------------------------+
```

Elements importants :

- formulaire simple ;
- donnees utilisateur ;
- bouton d'enregistrement ;
- retour visuel apres modification.

## 6. Dashboard salon

Objectif : centraliser la gestion du salon connecte.

```text
+------------------------------------------------------------------+
| LOGO Cut&Go        Dashboard     Reservations     Deconnexion     |
+------------------------------------------------------------------+
| Dashboard salon                                                  |
+------------------------------------------------------------------+
| +----------------+ +----------------+ +------------------------+ |
| | Reservations   | | Creneaux       | | Chiffre d'affaires     | |
| | Aujourd'hui    | | Disponibles    | | Statistique simple     | |
| +----------------+ +----------------+ +------------------------+ |
+------------------------------------------------------------------+
| +--------------------------+ +---------------------------------+ |
| | Informations salon       | | Reservations recentes           | |
| | Nom, ville, description  | | Client, prestation, date, heure | |
| | [Modifier]               | | Statut                          | |
| +--------------------------+ +---------------------------------+ |
+------------------------------------------------------------------+
| +--------------------------+ +---------------------------------+ |
| | Prestations              | | Creneaux                        | |
| | Liste + prix + duree     | | Date + heure + disponibilite    | |
| | [Ajouter] [Modifier]     | | [Creer] [Bloquer] [Rouvrir]     | |
| +--------------------------+ +---------------------------------+ |
+------------------------------------------------------------------+
```

Elements importants :

- statistiques simples ;
- gestion des informations du salon ;
- gestion des prestations ;
- gestion des creneaux ;
- suivi des reservations.

## 7. Gestion des prestations salon

Objectif : permettre au salon d'ajouter, modifier ou desactiver ses prestations.

```text
+------------------------------------------------------------------+
| Dashboard salon > Prestations                                    |
+------------------------------------------------------------------+
| +--------------------------------------------------------------+ |
| | Ajouter / modifier une prestation                            | |
| | Nom prestation      [____________________]                   | |
| | Prix                [________]                               | |
| | Duree               [________]                               | |
| | Description         [____________________]                   | |
| | [Enregistrer]                                                | |
| +--------------------------------------------------------------+ |
|                                                                  |
| +--------------------------------------------------------------+ |
| | Prestations existantes                                      | |
| | Coupe homme   25 EUR   30 min   [Modifier] [Desactiver]      | |
| | Coupe femme   40 EUR   45 min   [Modifier] [Desactiver]      | |
| | Barbe         15 EUR   20 min   [Modifier] [Desactiver]      | |
| +--------------------------------------------------------------+ |
+------------------------------------------------------------------+
```

Elements importants :

- formulaire d'ajout ou modification ;
- liste des prestations ;
- actions modifier et desactiver ;
- validation des champs.

## 8. Gestion des creneaux salon

Objectif : permettre au salon de creer, bloquer ou rouvrir des creneaux.

```text
+------------------------------------------------------------------+
| Dashboard salon > Creneaux                                       |
+------------------------------------------------------------------+
| +--------------------------------------------------------------+ |
| | Nouveau creneau                                              | |
| | Date             [____/____/______]                          | |
| | Heure            [____:____]                                 | |
| | Disponibilite    [Disponible / Bloque]                       | |
| | [Creer le creneau]                                           | |
| +--------------------------------------------------------------+ |
|                                                                  |
| +--------------------------------------------------------------+ |
| | Liste des creneaux                                           | |
| | Date        Heure     Statut        Actions                  | |
| | 25/06/2026  10:00     Disponible    [Bloquer]                | |
| | 25/06/2026  11:00     Reserve       [Voir reservation]       | |
| | 25/06/2026  14:00     Bloque        [Rouvrir]                | |
| +--------------------------------------------------------------+ |
+------------------------------------------------------------------+
```

Elements importants :

- creation de creneau ;
- statut disponible, reserve ou bloque ;
- actions selon le statut ;
- prevention des doubles reservations cote serveur.

## 9. Administration

Objectif : permettre a l'administrateur de gerer les comptes utilisateurs.

```text
+------------------------------------------------------------------+
| LOGO Cut&Go        Administration               Deconnexion       |
+------------------------------------------------------------------+
| Gestion des comptes                                              |
+------------------------------------------------------------------+
| Filtres : [Role] [Statut] [Recherche email]                       |
+------------------------------------------------------------------+
| +--------------------------------------------------------------+ |
| | Nom        Email              Role     Statut      Actions    | |
| |--------------------------------------------------------------| |
| | Client A   client@mail.com    client   actif      [Modifier]  | |
| | Salon B    salon@mail.com     salon    actif      [Restreindre]|
| | Admin C    admin@mail.com     admin    actif      [Modifier]  | |
| +--------------------------------------------------------------+ |
|                                                                  |
| Actions possibles : modifier, restreindre, reactiver, supprimer   |
+------------------------------------------------------------------+
```

Elements importants :

- tableau des comptes ;
- filtres ;
- controle du role ;
- restriction et reactivation ;
- protections sur le compte administrateur courant.

## 10. Pages legales

Objectif : afficher les informations obligatoires et rassurer l'utilisateur.

```text
+------------------------------------------------------------------+
| LOGO Cut&Go        Accueil     Mentions legales     Confidentialite|
+------------------------------------------------------------------+
| Titre de la page                                                 |
+------------------------------------------------------------------+
|                                                                  |
| Section 1                                                        |
| Texte court                                                      |
|                                                                  |
| Section 2                                                        |
| Texte court                                                      |
|                                                                  |
| Section 3                                                        |
| Texte court                                                      |
|                                                                  |
+------------------------------------------------------------------+
```

Elements importants :

- contenu lisible ;
- navigation retour accueil ;
- informations RGPD et confidentialite ;
- structure simple.

---

# Version mobile simplifiee

## Accueil mobile

```text
+----------------------+
| LOGO        Menu     |
+----------------------+
| Trouver un salon     |
| [Recherche_______]   |
| [Rechercher]         |
+----------------------+
| Filtres              |
| [Ville] [Prix]       |
+----------------------+
| Resultats            |
| +------------------+ |
| | Salon            | |
| | Ville            | |
| | [Voir]           | |
| +------------------+ |
| +------------------+ |
| | Salon            | |
| | Ville            | |
| | [Voir]           | |
| +------------------+ |
+----------------------+
```

## Fiche salon mobile

```text
+----------------------+
| LOGO        Menu     |
+----------------------+
| Photo salon          |
+----------------------+
| Nom salon            |
| Ville / adresse      |
| Description          |
+----------------------+
| Prestations          |
| [Coupe homme]        |
| [Coupe femme]        |
| [Barbe]              |
+----------------------+
| Creneaux             |
| [10:00] [11:00]      |
| [14:00] [15:30]      |
| [Reserver]           |
+----------------------+
```

## Dashboard salon mobile

```text
+----------------------+
| LOGO        Menu     |
+----------------------+
| Dashboard salon      |
+----------------------+
| Reservations du jour |
| [Statistique]        |
+----------------------+
| Informations salon   |
| [Modifier]           |
+----------------------+
| Prestations          |
| [Ajouter]            |
+----------------------+
| Creneaux             |
| [Creer]              |
+----------------------+
| Reservations         |
| [Voir la liste]      |
+----------------------+
```

---

# Priorites MVP

## Fonctionnalites indispensables

- Inscription et connexion.
- Recherche de salons.
- Consultation d'une fiche salon.
- Choix d'une prestation.
- Reservation d'un creneau.
- Consultation et annulation de rendez-vous.
- Gestion des prestations salon.
- Gestion des creneaux salon.
- Gestion des comptes administrateur.

## Fonctionnalites hors MVP

- Paiement en ligne.
- Notifications email ou SMS.
- Geolocalisation avancee.
- Upload reel de photos.
- Gestion multi-employes.
- Avis clients avances.
- Synchronisation calendrier externe.

## Liens avec les fichiers du projet

| Ecran | Fichier front-end associe |
| --- | --- |
| Accueil / recherche | `frontend/index.html` |
| Connexion / inscription | `frontend/auth.html` |
| Fiche salon | `frontend/salon.html` |
| Mes rendez-vous | `frontend/mes-rdv.html` |
| Mon compte | `frontend/compte.html` |
| Dashboard salon | `frontend/dashboard.html` |
| Administration | `frontend/admin.html` |
| Mentions legales | `frontend/mentions-legales.html` |
| Confidentialite | `frontend/confidentialite.html` |

---

# Synthese

Ces wireframes montrent l'organisation generale de Cut&Go avant le design final. Ils permettent de verifier que les parcours principaux sont couverts :

- le client peut rechercher un salon et reserver un rendez-vous ;
- le salon peut gerer son activite ;
- l'administrateur peut gerer les comptes ;
- les ecrans restent simples, lisibles et adaptes au responsive.
