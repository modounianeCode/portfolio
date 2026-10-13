// Menu mobile + liens actifs + reveal + copier email + année + Formspree
(function () {
  // 📌 Collez votre ID Formspree ici après création du formulaire (ex: "xyzabcde")
  // Étapes : https://formspree.io/register → New Form → copier l'ID → mettre ci-dessous
  const FORMSPREE_ID = "xdeawznr";
  const FORMSPREE_ENDPOINT = FORMSPREE_ID && FORMSPREE_ID !== "YOUR_FORM_ID"
    ? "https://formspree.io/f/" + FORMSPREE_ID
    : "";
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // Lien actif au scroll
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  const onScroll = () => {
    let current = '';
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    links.forEach((l) => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.card, .timeline-item').forEach((el) => {
    el.classList.add('reveal');
    io.observe(el);
  });

  // Copier email
  const copyBtn = document.getElementById('copyEmail');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = 'modounianemodou@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        copyBtn.textContent = '✅ Email copié !';
      } catch {
        copyBtn.textContent = '✉ ' + email;
      }
      setTimeout(() => { copyBtn.textContent = '📋 Copier l\'email'; }, 2000);
    });
  }

  // Formulaire contact -> Formspree (si configuré) sinon mailto de secours
  const form = document.getElementById('contactForm');
  if (form) {
    const status = document.getElementById('formStatus');
    const submitBtn = form.querySelector('button[type="submit"]');
    const setStatus = (msg, cls) => {
      status.textContent = msg;
      status.className = 'hint ' + (cls || '');
    };
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('fName').value.trim();
      const email = document.getElementById('fEmail').value.trim();
      const subject = document.getElementById('fSubject').value;
      const message = document.getElementById('fMessage').value.trim();
      const honey = document.getElementById('fCompany').value;
      if (honey) return; // anti-spam
      if (!name || !email || !message) {
        setStatus('⚠️ Nom, email et message sont requis.', 'err');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setStatus('⚠️ Email invalide.', 'err');
        return;
      }
      // Mode secours : Formspree non configuré → ouvre la messagerie
      if (!FORMSPREE_ENDPOINT) {
        const to = 'modounianemodou@gmail.com';
        const mailSubject = encodeURIComponent('[Portfolio] ' + subject + ' — ' + name);
        const mailBody = encodeURIComponent('Nom: ' + name + '\nEmail: ' + email + '\n\n' + message);
        window.location.href = 'mailto:' + to + '?subject=' + mailSubject + '&body=' + mailBody;
        setStatus('⚠️ Formspree non configuré : messagerie ouverte en secours. Ajoutez votre ID dans script.js.', 'err');
        return;
      }
      submitBtn.disabled = true;
      setStatus('🚀 Envoi en cours...', '');
      try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ name, email, subject, message })
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        form.reset();
        setStatus('✅ Message envoyé ! Je vous réponds vite.', 'ok');
      } catch (err) {
        const to = 'modounianemodou@gmail.com';
        const mailSubject = encodeURIComponent('[Portfolio] ' + subject + ' — ' + name);
        const mailBody = encodeURIComponent('Nom: ' + name + '\nEmail: ' + email + '\n\n' + message);
        window.location.href = 'mailto:' + to + '?subject=' + mailSubject + '&body=' + mailBody;
        setStatus('⚠️ Envoi direct échoué, messagerie ouverte en secours.', 'err');
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  // Année auto
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
