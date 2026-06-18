# Tests fonctionnels - Cut&Go

Ce document sert de checklist pour verifier le MVP avant une demonstration ou une presentation jury.

## 1. Verifications techniques

| Test | Resultat attendu | Statut |
| --- | --- | --- |
| `npm run check` dans `backend` | Tous les fichiers backend passent la verification syntaxique | OK |
| `node --check` sur les fichiers JS frontend | Tous les fichiers JavaScript frontend passent la verification syntaxique | OK |
| `npm audit --omit=dev` | Pas de vulnerabilite bloquante connue | OK, 0 vulnerabilite |
| Audit Lighthouse accueil | Scores performance, accessibilite, bonnes pratiques et SEO | OK |
| Ouverture des pages HTML | Les pages principales se chargent sans erreur visible | A verifier dans le navigateur |

## 2. Parcours client complet

Compte conseille : `alice.client@cutandgo.test` avec le mot de passe `Password123!`.

1. Ouvrir `frontend/auth.html`.
2. Se connecter avec un compte client.
3. Verifier que la navigation affiche l'etat connecte.
4. Ouvrir `frontend/index.html`.
5. Rechercher une ville, par exemple `Lille`.
6. Tester les filtres note, prix maximum et prestation.
7. Ouvrir une fiche salon depuis les resultats.
8. Verifier l'affichage du salon, des prestations et des creneaux.
9. Choisir une prestation et un creneau.
10. Confirmer la reservation.
11. Verifier que le message de confirmation apparait.
12. Verifier que le creneau reserve disparait de la liste des disponibilites.
13. Ouvrir `frontend/mes-rdv.html`.
14. Verifier que le rendez-vous apparait avec salon, prestation, date, heure, prix et statut.
15. Tester l'annulation si le rendez-vous respecte la regle des 24 heures.

Resultat attendu : le client peut rechercher, filtrer, consulter une fiche salon, reserver, consulter ses rendez-vous et annuler quand la regle metier l'autorise.

## 3. Parametres du compte

1. Se connecter avec un compte client, salon ou admin.
2. Ouvrir `frontend/compte.html`.
3. Modifier le nom du compte.
4. Modifier l'adresse personnelle.
5. Enregistrer.
6. Verifier que le message de confirmation apparait.
7. Actualiser la page et verifier que les donnees modifiees sont conservees.

Resultat attendu : un utilisateur connecte peut mettre a jour son nom, son email et son adresse personnelle. Pour un salon, cette adresse reste separee de l'adresse publique du salon.

## 4. Parcours salon complet

Compte conseille : `contact@salon-elegance.test` avec le mot de passe `Password123!`.

1. Ouvrir `frontend/auth.html`.
2. Se connecter avec un compte salon.
3. Ouvrir `frontend/dashboard.html`.
4. Verifier que le dashboard refuse l'acces aux comptes non salon.
5. Verifier l'affichage des statistiques jour, semaine et mois.
6. Verifier l'affichage des reservations du salon.
7. Modifier les informations du salon.
8. Verifier que les nouvelles informations sont visibles sur la fiche publique.
9. Ajouter une prestation.
10. Verifier que la prestation apparait dans la liste.
11. Desactiver une prestation.
12. Verifier qu'elle n'apparait plus comme prestation active.
13. Ajouter un creneau.
14. Bloquer puis rouvrir un creneau.
15. Modifier les horaires d'ouverture et verifier le message de confirmation.

Resultat attendu : le salon peut gerer ses informations, ses prestations, ses horaires, ses creneaux, ses reservations et ses statistiques.

## 5. Parcours admin complet

Compte conseille : `admin@cutandgo.test` avec le mot de passe `Password123!`.

1. Ouvrir `frontend/auth.html`.
2. Se connecter avec le compte admin.
3. Verifier la redirection vers `frontend/admin.html`.
4. Verifier l'affichage de la liste des comptes.
5. Modifier le nom ou l'email d'un compte de test non critique, puis enregistrer.
6. Passer un compte client en statut `restreint`.
7. Tenter de se connecter avec ce compte et verifier que la connexion est refusee.
8. Reconnecter l'admin et remettre le compte en statut `actif`.
9. Verifier qu'un admin ne peut pas restreindre, retrograder ou supprimer son propre compte.
10. Tester la suppression uniquement sur un compte cree pour le test.

Resultat attendu : l'administrateur peut consulter, modifier, restreindre, reactiver et supprimer des comptes, tandis que son propre compte reste protege contre les actions dangereuses.

## 6. Tests de securite et roles

| Situation | Resultat attendu |
| --- | --- |
| Client sans token sur `mes-rdv.html` | Redirection ou message demandant de se connecter |
| Salon sur une action client de reservation | Refus cote frontend et cote backend |
| Client sur `dashboard.html` | Message indiquant que la page est reservee aux salons |
| Client ou salon sur `admin.html` | Message indiquant que la page est reservee aux administrateurs |
| Route protegee sans JWT | Reponse `401` |
| Role incorrect sur route protegee | Reponse `403` |
| Compte restreint | Connexion refusee avec reponse `403` |
| Reservation d'un creneau deja pris | Reponse `409` |
| Annulation moins de 24 heures avant | Reponse `403` |

## 7. Points a annoncer au jury

- Les tests syntaxiques backend et frontend sont automatisables avec les commandes du README.
- L'audit des dependances backend ne signale aucune vulnerabilite.
- L'audit Lighthouse de la page d'accueil donne 86 en performance, 100 en accessibilite, 96 en bonnes pratiques et 100 en SEO.
- Les parcours client, salon et admin ont ete prevus comme scenarios de demonstration.
- La page `Mon compte` permet de modifier les informations personnelles d'un utilisateur connecte.
- Les routes sensibles sont protegees par JWT et verification de role.
- L'admin peut restreindre un compte, ce qui bloque sa connexion.
- Les limites restantes sont normales pour le MVP : pas de paiement, pas d'emails, pas d'upload reel et pas de workflow avance de verification professionnelle. Le projet est deploye sur Alwaysdata, mais il reste une application pedagogique a presenter comme MVP.
