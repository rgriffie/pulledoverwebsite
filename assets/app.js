/* Page behaviour: section arrivals, the orbiting ecosystem, and the "Information" sequence. */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* A compact, keyboard-accessible menu on phones. */
  const navHeader = document.querySelector('.nav');
  const menuButton = document.querySelector('.nav-toggle');
  if (navHeader && menuButton) {
    const closeMenu = () => {
      navHeader.classList.remove('nav-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation menu');
    };
    menuButton.addEventListener('click', () => {
      const open = !navHeader.classList.contains('nav-open');
      navHeader.classList.toggle('nav-open', open);
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    });
    navHeader.querySelectorAll('nav a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('click', e => { if (!navHeader.contains(e.target)) closeMenu(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && navHeader.classList.contains('nav-open')) {
        closeMenu();
        menuButton.focus();
      }
    });
    addEventListener('resize', () => { if (innerWidth > 820) closeMenu(); });
  }


  /* Scroll cue stays on screen; each click moves to the next section. It steps aside at the very end. */
  const cue = document.querySelector('.scroll-cue');
  const sections = [...document.querySelectorAll('main > section')];
  const markEnd = () => document.documentElement.classList.toggle('at-end', innerHeight + scrollY >= document.documentElement.scrollHeight - 140);
  addEventListener('scroll', markEnd, { passive: true }); markEnd();
  cue && cue.addEventListener('click', (e) => {
    e.preventDefault();
    const next = sections.find((s) => s.getBoundingClientRect().top > 8);
    (next || document.querySelector('.footer')).scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  });

  /* Arrivals */
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  /* Ecosystem: a chakra wheel (lotus petals, spokes) with six nodes riding its rim clockwise.
     Each node keeps a fine thread back to the centre; labels stay upright. */
  const galaxy = document.querySelector('.galaxy');
  const nodes = galaxy ? [...galaxy.querySelectorAll('.gnode')] : [];
  const SVGNS = 'http://www.w3.org/2000/svg';
  const el = (tag, attrs, parent) => { const e = document.createElementNS(SVGNS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); parent.appendChild(e); return e; };
  let links = [];
  if (galaxy) {
    const wheel = galaxy.querySelector('.wheel');
    const petal = (r0, r1, w) => `M0 ${-r0} C ${w} ${-(r0 + r1) / 2}, ${w * 0.6} ${-r1 + 6}, 0 ${-r1} C ${-w * 0.6} ${-r1 + 6}, ${-w} ${-(r0 + r1) / 2}, 0 ${-r0} Z`;
    const outer = wheel.querySelector('.petals.outer'), inner = wheel.querySelector('.petals.inner'), spokes = wheel.querySelector('.spokes');
    for (let i = 0; i < 16; i++) el('path', { d: petal(60, 168, 30), transform: `rotate(${i * 22.5})` }, outer);
    for (let i = 0; i < 8; i++) el('path', { d: petal(46, 112, 26), transform: `rotate(${i * 45 + 22.5})` }, inner);
    for (let i = 0; i < 24; i++) el('line', { x1: 0, y1: -180, x2: 0, y2: -246, transform: `rotate(${i * 15})` }, spokes);
    links = nodes.map(() => el('line', { x1: 0, y1: 0, x2: 0, y2: 0 }, wheel.querySelector('.links')));
  }
  let galaxyVisible = false;
  if (galaxy) new IntersectionObserver(([e]) => { galaxyVisible = e.isIntersecting; }).observe(galaxy);
  const LAP = 180; // seconds per full turn
  const compactOrbit = matchMedia('(max-width:760px)');
  const placeNodes = (t) => {
    if (compactOrbit.matches) {
      // On small screens CSS presents the six names as readable cards below the wheel.
      nodes.forEach(n => n.style.removeProperty('transform'));
      return;
    }
    const w = galaxy.clientWidth;
    nodes.forEach((n, i) => {
      const a = -Math.PI / 2 + (i / nodes.length) * Math.PI * 2 + (t / LAP) * Math.PI * 2;
      const r = Math.min(w * 0.4167, w / 2 - n.offsetWidth / 2 - 4);   // the dashed rim (250 / 600)
      const x = w / 2 + Math.cos(a) * r - n.offsetWidth / 2;
      const y = w / 2 + Math.sin(a) * r - n.offsetWidth / 2;
      n.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      const k = 600 / w; // px -> wheel units
      links[i].setAttribute('x2', (Math.cos(a) * (r * k - 40)).toFixed(1));
      links[i].setAttribute('y2', (Math.sin(a) * (r * k - 40)).toFixed(1));
    });
  };
  if (galaxy) {
    placeNodes(0);
    addEventListener('resize', () => placeNodes(reduce ? 0 : performance.now() / 1000));
    if (!reduce) {
      const loop = (ms) => { if (galaxyVisible && !compactOrbit.matches) placeNodes(ms / 1000); requestAnimationFrame(loop); };
      requestAnimationFrame(loop);
    }
  }

  /* The information gap keeps every explanation readable while its progress thread advances. */
  const beatList = document.querySelector('.gap-beats');
  if (beatList) {
    const beats = [...beatList.children];
    const flow = () => {
      const mid = innerHeight * 0.5;
      beats.forEach((b) => {
        const r = b.getBoundingClientRect();
        b.classList.toggle('lit', r.top + r.height / 2 < mid + innerHeight * 0.12);
      });
      const lr = beatList.getBoundingClientRect();
      beatList.style.setProperty('--p', Math.max(0, Math.min(1, (mid - lr.top) / lr.height)).toFixed(3));
    };
    addEventListener('scroll', flow, { passive: true }); addEventListener('resize', flow); flow();
  }

  /* One continuous journey: the light behind the page changes colour and position from chapter to
     chapter, and each section dissolves into the next instead of scrolling off as a block. */
  const chapters = [...document.querySelectorAll('[data-chapter]')];
  const glowEl = document.querySelector('.void-glow');
  // where the light sits (x%, y%) and its colour in each chapter
  const LIGHT = {
    top:          ['50%', '0%',   '#0b193a'],
    company:      ['20%', '30%',  '#16306a'],
    ecosystem:    ['78%', '50%',  '#0f3a5a'],
    gap:          ['30%', '100%', '#241b55'],
    'use-cases':  ['50%', '45%',  '#0e4363'],
    house:        ['80%', '20%',  '#1a3a78'],
    technologies: ['50%', '65%',  '#0e4a63'],
    support:      ['50%', '0%',   '#2a3a6e'],
    question:     ['50%', '50%',  '#102552'],
    contact:      ['85%', '50%',  '#1d3f86'],
  };
  const fading = chapters.filter((c) => !['top', 'gap', 'use-cases'].includes(c.id));
  let current = -1;
  const journey = () => {
    const mid = scrollY + innerHeight * 0.5;
    let idx = 0;
    chapters.forEach((c, i) => { if (c.getBoundingClientRect().top + scrollY <= mid) idx = i; });
    if (idx !== current) {
      current = idx;
      const L = LIGHT[chapters[idx].id];
      if (L && glowEl) { glowEl.style.setProperty('--gx', L[0]); glowEl.style.setProperty('--gy', L[1]); glowEl.style.setProperty('--gc', L[2]); }
    }
    if (reduce) return;
    const vh = innerHeight, span = vh * 0.4;
    fading.forEach((sec) => {
      const r = sec.getBoundingClientRect();
      const o = Math.max(0, Math.min(1, (vh - r.top) / span, r.bottom / span));
      sec.style.opacity = o >= 0.999 ? '' : (o * o * (3 - 2 * o)).toFixed(3);
    });
  };
  addEventListener('scroll', journey, { passive: true }); addEventListener('resize', journey); journey();

  /* The thread: a point of light that tracks your place and can be dragged to scrub the page.
     Scrolling is set instantly (the page's smooth-scroll would lag behind the pointer). */
  const root = document.documentElement;
  const thread = document.querySelector('.thread');
  if (thread) {
    const TOP = 0.08, RANGE = 0.84;                       // the orb travels from 8% to 92% of the screen height
    const maxScroll = () => Math.max(1, root.scrollHeight - innerHeight);
    const sync = () => {
      const p = Math.max(0, Math.min(1, scrollY / maxScroll()));
      root.style.setProperty('--ty', ((TOP + p * RANGE) * 100).toFixed(2) + '%');
      thread.setAttribute('aria-valuenow', Math.round(p * 100));
    };
    addEventListener('scroll', sync, { passive: true }); addEventListener('resize', sync); sync();
    let pending = 0, dragging = false;
    const goTo = (clientY) => {
      pending = Math.max(0, Math.min(1, (clientY / innerHeight - TOP) / RANGE));
      if (goTo.raf) return;
      goTo.raf = requestAnimationFrame(() => { goTo.raf = 0; scrollTo({ top: pending * maxScroll(), behavior: 'instant' }); });
    };
    thread.addEventListener('pointerdown', (e) => { dragging = true; thread.classList.add('drag'); thread.setPointerCapture(e.pointerId); goTo(e.clientY); e.preventDefault(); });
    thread.addEventListener('pointermove', (e) => { if (dragging) goTo(e.clientY); });
    const end = () => { dragging = false; thread.classList.remove('drag'); };
    thread.addEventListener('pointerup', end); thread.addEventListener('pointercancel', end);
    thread.addEventListener('keydown', (e) => {
      const step = { ArrowDown: 0.1, ArrowUp: -0.1, PageDown: 0.25, PageUp: -0.25 }[e.key];
      if (e.key === 'Home') scrollTo({ top: 0, behavior: 'instant' });
      else if (e.key === 'End') scrollTo({ top: maxScroll(), behavior: 'instant' });
      else if (step) scrollTo({ top: scrollY + step * maxScroll(), behavior: 'instant' });
      else return;
      e.preventDefault();
    });
  }
})();
