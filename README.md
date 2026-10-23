# Sonara

Interface de streaming musical immersive avec un vrai lecteur audio : accueil, recherche par titres/artistes/genres, bibliothèque (titres aimés, playlists personnelles), pages playlist, file d'attente, lecteur plein écran avec vinyle animé.

**Stack** : React 18, Vite 5, Tailwind CSS 3, Framer Motion, React Router. Audio : 8 morceaux libres de droit (SoundHelix, nécessite Internet).

```bash
npm install
npm run dev
npm run build
```

Raccourcis : `Espace` lecture/pause, `←` `→` ±5 s, `↑` `↓` volume, `N` suivant, `P` précédent, `M` muet, `Échap` ferme les panneaux. Les contrôles des écrans verrouillés fonctionnent via l'API Media Session.
