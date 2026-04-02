/* =============================================
   KUSUMAKAR ELLIPILLI PORTFOLIO — UPGRADED SCRIPT
   Volcano & Fire Theme Edition
   ============================================= */

/* ======== SPLASH SCREEN WITH ENTER BUTTON ======== */
(function () {
  const splash = document.getElementById('splashScreen');
  const enterBtn = document.getElementById('enterBtn');
  
  // Initialize cursor trail immediately for splash screen
  initCursorTrail();
  
  if (enterBtn) {
    enterBtn.addEventListener('click', function() {
      splash.classList.add('hidden');
      document.body.style.overflow = '';
      setTimeout(() => {
        initAll();
      }, 100);
    });
  }
  
  document.body.style.overflow = 'hidden';
})();

function initAll() {
  initStars();
  initSpaceUniverse();
  initTyped();
  initNavbar();
  initScrollReveal();
  initSkillBars();
  initHamburger();
  initThemeToggle();
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
        ? `rgba(255,183,0,${a})`
        : `rgba(255,107,157,${a})`;
      ctx.fill();

      s.y -= s.speed;
      if (s.y < -2) { s.y = H + 2; s.x = Math.random() * W; }
    });
    requestAnimationFrame(animate);
  }
  animate();
}

/* ======== VOLCANO ROCKS FALLING - BACKGROUND ANIMATION ======== */
function initSpaceUniverse() {
  const universeContainer = document.createElement('div');
  universeContainer.id = 'spaceUniverse';
  universeContainer.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    overflow: hidden;
  `;
  document.body.appendChild(universeContainer);

  class VolcanoRock {
    constructor() {
      this.x = Math.random() * window.innerWidth;
      this.y = -50;
      this.speedX = (Math.random() - 0.5) * 0.8; // Slight horizontal drift
      this.speedY = Math.random() * 1.5 + 2.5; // Falling speed
      this.opacity = Math.random() * 0.4 + 0.3;
      this.scale = Math.random() * 0.8 + 0.6;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = Math.random() * 4 - 2;
      this.element = this.create();
      this.fireTrail = [];
      this.fireCounter = 0;
    }

    create() {
      const el = document.createElement('div');
      el.innerHTML = '🪨';
      el.style.cssText = `
        position: absolute;
        left: ${this.x}px;
        top: ${this.y}px;
        font-size: ${28 * this.scale}px;
        opacity: ${this.opacity};
        transform: rotate(${this.rotation}deg);
        filter: drop-shadow(0 0 ${8 * this.scale}px rgba(255, 107, 53, 0.6));
        transition: opacity 0.3s;
        z-index: 1;
      `;
      universeContainer.appendChild(el);
      return el;
    }

    createFireParticle() {
      const fire = document.createElement('div');
      const fireEmojis = ['🔥', '🌪️', '✨'];
      fire.innerHTML = fireEmojis[Math.floor(Math.random() * fireEmojis.length)];
      const offsetX = (Math.random() - 0.5) * 30;
      const offsetY = Math.random() * 20;
      fire.style.cssText = `
        position: absolute;
        left: ${this.x + offsetX}px;
        top: ${this.y + 30 + offsetY}px;
        font-size: ${14 * this.scale}px;
        opacity: ${0.6 + Math.random() * 0.4};
        pointer-events: none;
        animation: fireFloat 0.8s ease-out forwards;
      `;
      universeContainer.appendChild(fire);
      return fire;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.rotation += this.rotationSpeed;
      this.fireCounter++;
      
      this.element.style.left = this.x + 'px';
      this.element.style.top = this.y + 'px';
      this.element.style.transform = `rotate(${this.rotation}deg)`;

      // Create fire trail every 2 frames
      if (this.fireCounter % 2 === 0) {
        this.createFireParticle();
      }

      // Remove when off-screen (below viewport)
      if (this.y > window.innerHeight + 100) {
        this.element.remove();
        return false;
      }
      return true;
    }
  }

  const rocks = [];

  function spawnRock() {
    if (rocks.length < 12) {
      rocks.push(new VolcanoRock());
    }
  }

  function animate() {
    for (let i = rocks.length - 1; i >= 0; i--) {
      if (!rocks[i].update()) {
        rocks.splice(i, 1);
      }
    }
    requestAnimationFrame(animate);
  }

  // Spawn rocks periodically
  setInterval(spawnRock, 1500);
  spawnRock();
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
      ctx.fillStyle = `rgba(255,183,0,${alpha})`;
      ctx.fill();

      // Teardrop glow on early trail points
      if (i < 8) {
        ctx.beginPath();
        ctx.arc(trail[i].x, trail[i].y, radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,183,0,${alpha * 0.15})`;
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
      grad.addColorStop(0, 'rgba(255,183,0,0.6)');
      grad.addColorStop(1, 'rgba(255,183,0,0)');
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
  const texts = ['Data Analyst', 'CSE Engineer', 'Python Developer', 'Dashboard Builder', 'Problem Solver', 'Code Wizard'];
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

/* ======== THEME TOGGLE ======== */
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  
  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    body.classList.add('light-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    body.classList.remove('light-mode');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
  
  // Toggle theme on button click
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    themeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    
    // Smooth transition
    body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => { body.style.transition = ''; }, 300);
  });
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
