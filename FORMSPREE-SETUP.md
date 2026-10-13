# 📌 Activer Formspree Free (0$, 50 envois/mois)

## 🚀 Étapes (2 min)
1. Créez un compte : https://formspree.io/register
2. Cliquez **New Form**, nommez-le `portfolio-contact`
3. Email cible : `modounianemodou@gmail.com` → vérifiez l'email de confirmation Formspree
4. Copiez l'ID du formulaire (ex : `xyzabcde` dans `https://formspree.io/f/xyzabcde`)
5. Ouvrez `script.js` et remplacez :
   ```js
   const FORMSPREE_ID = "YOUR_FORM_ID";
   ```
   par :
   ```js
   const FORMSPREE_ID = "xyzabcde";
   ```
6. Rechargez `index.html` et testez le formulaire avec votre propre email

## ✅ Comportement du code
- 📌 Si `FORMSPREE_ID` configuré → `fetch POST JSON` vers `https://formspree.io/f/ID`, message ✅, `form.reset()`
- ⚠️ Si non configuré ou échec réseau → secours auto via `mailto:` pré-rempli, message ⚠️
- 📌 Anti-spam : champ honeypot `company` + validation email regex

## 🧪 Test local
```bash
cd /home/modou-niane/sama_CV
python3 -m http.server 8080
# http://localhost:8080 → section Contact → envoyer un test
```
⚠️ `fetch` vers Formspree exige `http://` ou `https://`, pas `file://`.
