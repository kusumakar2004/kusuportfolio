/* =============================================
   VELAMALA RAHUL PORTFOLIO — UPGRADED SCRIPT
   ============================================= */

/* ======== SPLASH SCREEN ======== */
(function () {
  const splash = document.getElementById('splashScreen');
  const bar = document.getElementById('splashBar');
  const pct = document.getElementById('splashPct');
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 14 + 4;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        splash.classList.add('hidden');
        document.body.style.overflow = '';
        initAll();
      }, 350);
    }
    bar.style.width = progress + '%';
    pct.textContent = Math.floor(progress) + '%';
  }, 80);
  document.body.style.overflow = 'hidden';
})();

function initAll() {
  initStars();
  initCursorTrail();
  initTyped();
  initNavbar();
  initScrollReveal();
  initSkillBars();
  initHamburger();
}

/* ======== STAR CANVAS (REDUCED DENSITY) ======== */
function initStars() {
  const canvas = document.getElementById('starCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, stars = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Reduced star count significantly
  function createStars() {
    stars = [];
    const count = Math.floor((W * H) / 22000); // was ~5000, now ~250-350
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.2 + 0.2,
        alpha: Math.random() * 0.4 + 0.1,
        speed: Math.random() * 0.15 + 0.03,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.008 + 0.003,
        isBlue: Math.random() > 0.6
      });
    }
  }
  createStars();
  window.addEventListener('resize', createStars);

  function animate() {
    ctx.clearRect(0, 0, W, H);
    const now = Date.now() / 1000;
    stars.forEach(s => {
      s.pulse += s.pulseSpeed;
      const a = s.alpha * (0.7 + 0.3 * Math.sin(s.pulse));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.isBlue
        ? `rgba(56,189,248,${a})`
        : `rgba(200,220,255,${a})`;
      ctx.fill();

      s.y -= s.speed;
      if (s.y < -2) { s.y = H + 2; s.x = Math.random() * W; }
    });
    requestAnimationFrame(animate);
  }
  animate();
}

/* ======== TAIL-DROP CURSOR ======== */
function initCursorTrail() {
  const dot = document.getElementById('cursorDot');
  const canvas = document.getElementById('cursorTrail');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  const trail = [];
  const TRAIL_LEN = 28;

  for (let i = 0; i < TRAIL_LEN; i++) {
    trail.push({ x: mx, y: my, alpha: 0 });
  }

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  document.addEventListener('mousedown', () => { dot.style.transform = 'translate(-50%,-50%) scale(0.7)'; });
  document.addEventListener('mouseup', () => { dot.style.transform = 'translate(-50%,-50%) scale(1)'; });

  function lerp(a, b, t) { return a + (b - a) * t; }

  function animateTrail() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Shift trail
    for (let i = trail.length - 1; i > 0; i--) {
      trail[i].x = lerp(trail[i].x, trail[i - 1].x, 0.5);
      trail[i].y = lerp(trail[i].y, trail[i - 1].y, 0.5);
    }
    trail[0].x = mx;
    trail[0].y = my;

    // Draw teardrop trail
    for (let i = 1; i < trail.length; i++) {
      const t = 1 - i / trail.length;
      const alpha = t * t * 0.7;
      const radius = t * 5;

      ctx.beginPath();
      ctx.arc(trail[i].x, trail[i].y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(56,189,248,${alpha})`;
      ctx.fill();

      // Teardrop glow on early trail points
      if (i < 8) {
        ctx.beginPath();
        ctx.arc(trail[i].x, trail[i].y, radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56,189,248,${alpha * 0.15})`;
        ctx.fill();
      }
    }

    // Connect trail as a path for liquid effect
    if (trail.length > 2) {
      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);
      for (let i = 1; i < trail.length - 1; i++) {
        const mx2 = (trail[i].x + trail[i + 1].x) / 2;
        const my2 = (trail[i].y + trail[i + 1].y) / 2;
        ctx.quadraticCurveTo(trail[i].x, trail[i].y, mx2, my2);
      }
      const grad = ctx.createLinearGradient(
        trail[0].x, trail[0].y,
        trail[trail.length - 1].x, trail[trail.length - 1].y
      );
      grad.addColorStop(0, 'rgba(56,189,248,0.6)');
      grad.addColorStop(1, 'rgba(56,189,248,0)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    requestAnimationFrame(animateTrail);
  }
  animateTrail();
}

/* ======== TYPED TEXT ======== */
function initTyped() {
  const el = document.getElementById('typed');
  const texts = ['Data Analyst', 'CSE Engineer', 'Python Developer', 'Dashboard Builder', 'Problem Solver'];
  let ti = 0, ci = 0, deleting = false;

  function type() {
    const current = texts[ti];
    if (!deleting) {
      el.textContent = current.slice(0, ++ci);
      if (ci === current.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      el.textContent = current.slice(0, --ci);
      if (ci === 0) { deleting = false; ti = (ti + 1) % texts.length; }
    }
    setTimeout(type, deleting ? 55 : 90);
  }
  type();
}

/* ======== NAVBAR SCROLL ======== */
function initNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  // Active link highlighting
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => observer.observe(s));
}

/* ======== HAMBURGER ======== */
function initHamburger() {
  const ham = document.getElementById('hamburger');
  const links = document.querySelector('.nav-links');
  ham.addEventListener('click', () => { links.classList.toggle('open'); });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
}

/* ======== SCROLL REVEAL ======== */
function initScrollReveal() {
  const items = document.querySelectorAll('.glass-card, .project-card, .cert-card, .timeline-card, .extra-card, .stat-card, .skill-category, .training-card');
  items.forEach(el => el.classList.add('reveal'));
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  items.forEach(el => obs.observe(el));
}

/* ======== SKILL BARS ======== */
function initSkillBars() {
  const bars = document.querySelectorAll('.bar-fill');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.w + '%';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => obs.observe(b));
}

/* ======== CERTIFICATE MODAL ======== */
function openCertModalFile(pdfPath, name, org) {
  const modal = document.getElementById('certModal');
  document.getElementById('modalCertName').textContent = name;
  document.getElementById('modalCertOrg').textContent = org;
  document.getElementById('modalCertIframe').src = pdfPath + '#toolbar=0&navpanes=0';
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeCertModal() {
  const modal = document.getElementById('certModal');
  modal.classList.remove('active');
  document.getElementById('modalCertIframe').src = '';
  document.body.style.overflow = '';
}

/* ======== RESUME PREVIEW ======== */
function toggleResumePreview() {
  const panel = document.getElementById('resumePreview');
  const btn = document.getElementById('previewBtnText');
  const open = panel.classList.toggle('open');
  btn.textContent = open ? 'Close Preview' : 'Preview Resume';
}
let resumeZoom = 1;
function zoomIn() {
  resumeZoom = Math.min(resumeZoom + 0.15, 2);
  document.getElementById('resumeIframe').style.transform = `scale(${resumeZoom})`;
  document.getElementById('resumeIframe').style.transformOrigin = 'top left';
}
function zoomOut() {
  resumeZoom = Math.max(resumeZoom - 0.15, 0.5);
  document.getElementById('resumeIframe').style.transform = `scale(${resumeZoom})`;
}
function closePrev() {
  document.getElementById('resumePreview').classList.remove('open');
  document.getElementById('previewBtnText').textContent = 'Preview Resume';
}

/* ======== SEND VIA GMAIL ======== */
function sendViaGmail() {
  const name = document.getElementById('senderName').value.trim();
  const email = document.getElementById('senderEmail').value.trim();
  const subject = document.getElementById('msgSubject').value.trim();
  const body = document.getElementById('msgBody').value.trim();

  if (!name || !email || !subject) {
    alert('Please fill in Name, Email, and Subject fields.');
    return;
  }

  const fullBody = `Name: ${name}\nEmail: ${email}\n\n${body}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&to=velamalarahual@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullBody)}`;
  window.open(gmailUrl, '_blank');
}

/* ======== KEYBOARD CLOSE MODAL ======== */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCertModal();
});
