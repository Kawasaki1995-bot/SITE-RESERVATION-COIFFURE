# Routes API - Cut&Go

Ce document decrit les endpoints prevus pour l'API Express du MVP Cut&Go.

## 1. Conventions generales

URL de base locale :

```text
http://localhost:3000/api
```

Format des reponses :

```json
{
  "success": true,
  "data": {}
}
```

Format des erreurs :

```json
{
  "success": false,
  "message": "Message d'erreur"
}
```

Les routes protegees attendent un JWT dans le header :

```text
Authorization: Bearer token_jwt
```

## 2. Authentification

### POST /auth/register

Inscrit un utilisateur client ou salon.

**Acces** : public

**Body**

```json
{
  "nom": "Alice Martin",
  "email": "alice@example.com",
  "password": "Password123!",
  "role": "client"
}
```

Pour un compte salon, le role vaut `salon`. Les informations detaillees du salon pourront ensuite etre completees depuis le dashboard.

**Reponse 201**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "nom": "Alice Martin",
    "email": "alice@example.com",
    "role": "client"
  }
}
```

### POST /auth/login

Connecte un utilisateur et renvoie un JWT.

**Acces** : public

**Body**

```json
{
  "email": "alice@example.com",
  "password": "Password123!"
}
```

**Reponse 200**

```json
{
  "success": true,
  "data": {
    "token": "jwt",
    "user": {
      "id": 1,
      "nom": "Alice Martin",
      "email": "alice@example.com",
      "role": "client"
    }
  }
}
```

### GET /auth/me

Retourne l'utilisateur connecte.

**Acces** : utilisateur connecte

**Reponse 200**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "nom": "Alice Martin",
    "email": "alice@example.com",
    "role": "client"
  }
}
```

## 3. Salons

### GET /salons

Recherche les salons avec filtres optionnels.

**Acces** : public

**Query params**

- `ville` : ville recherchee.
- `noteMin` : note minimale.
- `prixMax` : prix maximum d'une prestation.
- `prestation` : nom ou partie du nom de prestation.

**Exemple**

```text
GET /api/salons?ville=Bruxelles&noteMin=4&prixMax=40&prestation=barbe
```

**Reponse 200**

```json
{
  "success": true,
  "data": [
    {
      "id": 2,
      "nom": "Studio Barber",
      "ville": "Bruxelles",
      "adresse": "42 Avenue Louise, 1050 Bruxelles",
      "note": 4.6,
      "prix_min": 18
    }
  ]
}
```

### GET /salons/:id

Retourne la fiche detaillee d'un salon.

**Acces** : public

**Reponse 200**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "nom": "Salon Elegance",
    "ville": "Bruxelles",
    "adresse": "18 Rue Royale, 1000 Bruxelles",
    "description": "Salon moderne specialise dans les coupes classiques.",
    "telephone": "+32 2 100 20 30",
    "image_url": "https://example.com/image.jpg",
    "note": 4.8
  }
}
```

### PUT /salons/me

Modifie les informations du salon connecte.

**Acces** : salon connecte

**Body**

```json
{
  "nom": "Salon Elegance",
  "ville": "Bruxelles",
  "adresse": "18 Rue Royale, 1000 Bruxelles",
  "description": "Description du salon",
  "telephone": "+32 2 100 20 30",
  "image_url": "https://example.com/image.jpg"
}
```

**Reponse 200**

```json
{
  "success": true,
  "message": "Salon mis a jour"
}
```

## 4. Prestations

### GET /salons/:id/prestations

Liste les prestations actives d'un salon.

**Acces** : public

**Reponse 200**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nom": "Coupe homme",
      "prix": 25
    }
  ]
}
```

### POST /prestations

Cree une prestation pour le salon connecte.

**Acces** : salon connecte

**Body**

```json
{
  "nom": "Coupe homme",
  "prix": 25
}
```

**Reponse 201**

```json
{
  "success": true,
  "message": "Prestation creee"
}
```

### PUT /prestations/:id

Modifie une prestation du salon connecte.

**Acces** : salon connecte

**Body**

```json
{
  "nom": "Coupe homme premium",
  "prix": 30,
  "active": true
}
```

**Reponse 200**

```json
{
  "success": true,
  "message": "Prestation mise a jour"
}
```

### DELETE /prestations/:id

Desactive une prestation du salon connecte.

**Acces** : salon connecte

**Reponse 200**

```json
{
  "success": true,
  "message": "Prestation desactivee"
}
```

## 5. Horaires d'ouverture

### GET /salons/:id/horaires

Liste les horaires d'ouverture d'un salon.

**Acces** : public

**Reponse 200**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "jour_semaine": 1,
      "heure_ouverture": "09:00:00",
      "heure_fermeture": "18:00:00",
      "ferme": false
    }
  ]
}
```

### PUT /horaires/me

Met a jour les horaires du salon connecte.

**Acces** : salon connecte

**Body**

```json
{
  "horaires": [
    {
      "jour_semaine": 1,
      "heure_ouverture": "09:00:00",
      "heure_fermeture": "18:00:00",
      "ferme": false
    },
    {
      "jour_semaine": 7,
      "heure_ouverture": null,
      "heure_fermeture": null,
      "ferme": true
    }
  ]
}
```

**Reponse 200**

```json
{
  "success": true,
  "message": "Horaires mis a jour"
}
```

## 6. Creneaux

### GET /salons/:id/creneaux

Liste les creneaux disponibles d'un salon.

**Acces** : public

**Query params**

- `date` : date au format `YYYY-MM-DD`.

**Reponse 200**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "date_creneau": "2026-06-02",
      "heure_debut": "09:00:00",
      "disponible": true
    }
  ]
}
```

### POST /creneaux

Cree un creneau pour le salon connecte.

**Acces** : salon connecte

**Body**

```json
{
  "date_creneau": "2026-06-02",
  "heure_debut": "09:00:00",
  "disponible": true
}
```

**Reponse 201**

```json
{
  "success": true,
  "message": "Creneau cree"
}
```

### PUT /creneaux/:id

Modifie la disponibilite d'un creneau du salon connecte.

**Acces** : salon connecte

**Body**

```json
{
  "disponible": false
}
```

**Reponse 200**

```json
{
  "success": true,
  "message": "Creneau mis a jour"
}
```

## 7. Reservations

### POST /reservations

Reserve un creneau disponible.

**Acces** : client connecte

**Body**

```json
{
  "salon_id": 1,
  "prestation_id": 1,
  "creneau_id": 1
}
```

**Regles**

- Le creneau doit exister.
- Le creneau doit etre disponible.
- La reservation rend le creneau indisponible.
- Si le creneau est deja reserve, l'API retourne une erreur.

**Reponse 201**

```json
{
  "success": true,
  "message": "Reservation confirmee"
}
```

### GET /reservations/me

Liste les reservations du client connecte.

**Acces** : client connecte

**Reponse 200**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "salon": "Salon Elegance",
      "prestation": "Coupe homme",
      "prix": 25,
      "date_creneau": "2026-06-02",
      "heure_debut": "09:30:00",
      "statut": "confirmee"
    }
  ]
}
```

### PATCH /reservations/:id/cancel

Annule une reservation client si elle commence dans plus de 24 heures.

**Acces** : client connecte

**Reponse 200**

```json
{
  "success": true,
  "message": "Reservation annulee"
}
```

### GET /reservations/salon

Liste les reservations du salon connecte.

**Acces** : salon connecte

**Query params**

- `date` : filtre optionnel au format `YYYY-MM-DD`.

**Reponse 200**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "client": "Alice Martin",
      "prestation": "Coupe homme",
      "prix": 25,
      "date_creneau": "2026-06-02",
      "heure_debut": "09:30:00",
      "statut": "confirmee"
    }
  ]
}
```

## 8. Statistiques salon

### GET /reservations/salon/stats

Retourne un chiffre d'affaires simple pour le salon connecte.

**Acces** : salon connecte

**Reponse 200**

```json
{
  "success": true,
  "data": {
    "jour": 25,
    "semaine": 130,
    "mois": 420
  }
}
```

Les reservations annulees ne sont pas prises en compte.

## 9. Codes HTTP principaux

| Code | Usage |
| --- | --- |
| 200 | Requete reussie |
| 201 | Ressource creee |
| 400 | Donnees invalides |
| 401 | Utilisateur non authentifie |
| 403 | Role non autorise |
| 404 | Ressource introuvable |
| 409 | Conflit, par exemple email deja utilise ou creneau deja pris |
| 500 | Erreur serveur |
