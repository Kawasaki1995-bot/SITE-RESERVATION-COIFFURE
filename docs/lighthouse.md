# Audit Lighthouse - Cut&Go

Audit realise le 08/06/2026 sur la page d'accueil locale :

```text
http://localhost:5500/index.html
```

Rapport detaille :

```text
docs/lighthouse-index.json
```

Le projet etant maintenant deploye sur Alwaysdata, un audit complementaire sur
l'URL publique peut etre ajoute avant la remise finale.

## Scores

| Categorie | Score |
| --- | --- |
| Performance | 86 |
| Accessibilite | 100 |
| Best Practices | 96 |
| SEO | 100 |

Lighthouse 13 affiche aussi une categorie `Agentic Browsing`, scoree a 81. Cette categorie est recente et n'est pas centrale pour le rendu DWWM.

## Correction appliquee

L'audit initial indiquait que la page d'accueil n'avait pas de meta description.

Correction ajoutee dans `frontend/index.html` :

```html
<meta name="description" content="Cut&Go est un MVP de reservation coiffure pour rechercher un salon, comparer les prestations et reserver un creneau disponible.">
```

Apres correction, le score SEO est passe de 90 a 100.

## Points restants

- La performance est correcte mais perfectible. Le LCP mesure environ 2.8 secondes.
- L'audit actuel est local ; il faudra idealement refaire Lighthouse sur l'URL Alwaysdata.

Pour aller plus loin, il faudrait optimiser davantage les images ou prioriser l'image principale.

## Note technique

Sur cette machine, Lighthouse peut afficher une erreur `EPERM` au moment de nettoyer son dossier temporaire Chrome. Le rapport JSON est tout de meme genere et lisible dans `docs/lighthouse-index.json`.

## Phrase pour l'oral

```text
J'ai lance un audit Lighthouse sur la page d'accueil. Les scores sont bons : 100 en accessibilite, 100 en SEO apres correction de la meta description, 96 en bonnes pratiques et 86 en performance. Cela montre que le frontend a ete verifie au-dela du simple fonctionnement visuel.
```
