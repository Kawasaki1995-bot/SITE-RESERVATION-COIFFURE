# Dossier projet - Cut&Go

Ce document regroupe les informations essentielles a presenter pour le projet Cut&Go.

## 1. Presentation

Cut&Go est une application web de reservation pour salons de coiffure.

Le client peut rechercher un salon, consulter une fiche, choisir une prestation et reserver un creneau. Le salon peut gerer ses informations, ses prestations, ses horaires, ses creneaux et consulter ses reservations.

## 2. Objectif

L'objectif est de livrer un MVP clair, fonctionnel et defendable devant un jury DWWM.

Le projet s'inspire de plateformes comme Planity, mais avec un perimetre volontairement limite :

- pas de paiement en ligne ;
- pas de notifications email ou SMS ;
- pas de vraie geolocalisation ;
- pas d'interface admin avancee avec workflow de validation documentaire ;
- pas d'upload reel de photos.

## 3. Utilisateurs

### Client

Le client cherche un salon par ville, filtre les resultats, consulte une fiche salon, reserve un rendez-vous et peut annuler plus de 24 heures avant.

### Salon

Le salon gere ses informations, ses prestations, ses horaires, ses creneaux et ses reservations depuis un dashboard.

### Administrateur

L'administrateur gere les comptes utilisateurs depuis une page dediee. Il peut consulter les comptes, modifier le nom, l'email, le role et le statut, restreindre ou reactiver un compte, et supprimer un compte.

Chaque utilisateur connecte peut aussi modifier les informations personnelles de son compte : nom, email et adresse personnelle.

## 4. Stack technique

| Partie | Technologie |
| --- | --- |
| Frontend | HTML5, CSS3, JavaScript Vanilla |
| Backend | Node.js, Express.js |
| Base de donnees | MySQL / MariaDB |
| Securite | bcrypt, JWT |
| Configuration | dotenv |
| Connexion SQL | mysql2 |

## 5. Architecture

```text
frontend HTML/CSS/JS -> API Express -> controllers -> MySQL
```

Dans le backend :

```text
route -> middleware -> controller -> requete SQL -> reponse JSON
```

## 6. Fonctionnalites livrees

- inscription et connexion ;
- modification du compte utilisateur ;
- roles client, salon et admin ;
- recherche salon avec filtres ;
- fiche salon ;
- reservation d'un creneau ;
- annulation avec regle des 24 heures ;
- affichage des rendez-vous client ;
- dashboard salon ;
- gestion des informations salon ;
- gestion des prestations ;
- gestion des horaires ;
- gestion des creneaux ;
- statistiques simples ;
- administration des comptes ;
- pages mentions legales et confidentialite ;
- deploiement sur Alwaysdata ;
- documentation API et support oral.

## 7. Regles metier importantes

- Un client reserve uniquement un creneau disponible.
- Une reservation rend le creneau indisponible.
- Une reservation annulee rend le creneau disponible.
- L'annulation est autorisee uniquement plus de 24 heures avant le rendez-vous.
- Un salon ne peut gerer que ses propres donnees.
- Les reservations annulees ne comptent pas dans le chiffre d'affaires.
- Un compte restreint ne peut plus se connecter.
- Un utilisateur connecte peut modifier son nom, son email et son adresse personnelle.
- Un administrateur ne peut pas supprimer son propre compte ni retirer ses propres droits admin.

## 8. Securite

- Les mots de passe sont hashes avec `bcrypt`.
- Les routes privees utilisent un token JWT.
- Les roles sont verifies cote backend.
- Les routes admin sont reservees au role `admin`.
- Les comptes peuvent etre restreints par un administrateur.
- Les requetes SQL sont preparees.
- Les informations sensibles sont placees dans `.env`.

## 9. Documents utiles

- `README.md` : installation, comptes de test, scenario de demonstration.
- `brief.md` : vision et perimetre.
- `cadrage_projet.md` : choix fonctionnels.
- `docs/user-stories.md` : besoins utilisateur.
- `docs/routes-api.md` : documentation des endpoints.
- `docs/presentation-technique.md` : revision technique.
- `docs/questions-techniques-jury.md` : questions possibles.
- `docs/tests.md` : checklist de tests.
- `docs/rgpd-accessibilite.md` : RGPD et accessibilite.
- `docs/deploiement.md` : deploiement Alwaysdata et procedure de verification.
- `docs/lighthouse.md` : resultats de l'audit Lighthouse.

## 10. Conclusion

Cut&Go est un MVP complet pour une soutenance : le parcours client et le parcours salon sont couverts, l'API est structuree, la base de donnees est relationnelle, les principales regles metier sont implementees, et l'application est deployee sur Alwaysdata.
