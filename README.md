# Portfolio — Modou Niane

Portfolio Développeur Frontend Junior (Thiès / Remote).

## 📌 Pages
- `index.html` → portfolio (accueil, projets, compétences, parcours, contact)
- `cv-fr.html` → CV français, mise en page A4 prête à imprimer
- `cv-en.html` → English resume, A4 print-ready
- `style.css` → style du portfolio (dark moderne, responsive)
- `cv-style.css` → style des pages CV (clair, print A4)
- `script.js` → menu mobile, lien actif, reveal, copier email

## ⬇ Télécharger le CV
Depuis le portfolio, section `#cv` :
- `Voir` → ouvre `cv-fr.html` / `cv-en.html`
- `Télécharger` → télécharge le fichier HTML (`download` attribute)
- Sur la page CV : bouton `Imprimer / Export PDF` → `window.print()` → choisir « Enregistrer en PDF »

## 🚀 Lancer en local
```bash
cd /home/modou-niane/sama_CV
python3 -m http.server 8080
# ouvrir http://localhost:8080
```

## ✅ Vérifié
- Liens Demo/Code des 4 projets
- Responsive mobile (menu burger)
- Print CV sans topbar ni bouton
