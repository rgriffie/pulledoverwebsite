/* Hero statement: when the page opens, "Information Becomes." condenses out of drifting vapour, left to right,
   then settles into the real text and stays.
   Ported to plain canvas from the 21st.dev "vapour-text-effect" component. The real <h1> text stays in the
   page (for readers, search and selection) and is only hidden visually while the canvas draws it.
   Pixels are written straight into an ImageData buffer, so each frame is one putImageData, not thousands of fills. */
(() => {
  const h1 = document.querySelector('.statement');
  const root = document.documentElement;
  const release = () => root.classList.remove('vapour-pending');
  if (!h1 || !root.classList.contains('vapour-pending')) return release();
  const lines = [...h1.querySelectorAll('span')];

  const T = { stagger: 1.3, travel: 1.5 };              // seconds: sweep across the words, each particle's flight
  const SPREAD = 3.5;                                    // how far the vapour travels (the component's `spread`)
  const DENSITY = 0.8;                                   // share of particles that drift rather than blink out
  const PAD = 140;                                       // room around the words for the vapour to travel into

  const canvas = document.createElement('canvas');
  canvas.className = 'statement-vapour';
  canvas.setAttribute('aria-hidden', 'true');
  h1.after(canvas);
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  let dpr = 1, W = 0, H = 0, img = null, P = null, N = 0, left = 0, right = 0, mult = 1;
  // particle arrays: origin, position, alpha
  let ox, oy, px, py, a0, a;

  const spreadFor = (size) => size <= 20 ? 0.2 : size >= 100 ? 1.5 : size < 50 ? 0.2 + (size - 20) * 0.01 : 0.5 + (size - 50) * 0.02;

  const build = () => {
    dpr = Math.min(devicePixelRatio || 1, 1.5);
    const box = h1.getBoundingClientRect();
    const cssW = box.width + PAD * 2, cssH = box.height + PAD * 2;
    Object.assign(canvas.style, { width: cssW + 'px', height: cssH + 'px', left: (h1.offsetLeft - PAD) + 'px', top: (h1.offsetTop - PAD) + 'px', transform: getComputedStyle(h1).transform });
    W = canvas.width = Math.round(cssW * dpr); H = canvas.height = Math.round(cssH * dpr);

    // draw each line exactly where the page lays it out, in its own font
    ctx.clearRect(0, 0, W, H);
    // the real text is hidden while we run; read its colours with the hiding switched off (no paint happens in between)
    const hidden = [root.classList.contains('vapour-pending'), h1.classList.contains('vapour-on')];
    root.classList.remove('vapour-pending'); h1.classList.remove('vapour-on');
    let biggest = 0;
    for (const el of lines) {
      const cs = getComputedStyle(el), r = el.getBoundingClientRect();
      const size = parseFloat(cs.fontSize); biggest = Math.max(biggest, size);
      ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${size * dpr}px ${cs.fontFamily}`;
      if ('letterSpacing' in ctx) ctx.letterSpacing = (parseFloat(cs.letterSpacing) || 0) * dpr + 'px';
      ctx.fillStyle = cs.color; ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
      const m = ctx.measureText(el.textContent);
      const asc = m.fontBoundingBoxAscent, desc = m.fontBoundingBoxDescent;
      const x = (r.left - box.left + PAD) * dpr;
      const y = (r.top - box.top + PAD) * dpr + ((r.height * dpr) - (asc + desc)) / 2 + asc;
      ctx.fillText(el.textContent, x, y);
    }
    if (hidden[0]) root.classList.add('vapour-pending');
    if (hidden[1]) h1.classList.add('vapour-on');
    mult = spreadFor(biggest) * SPREAD * dpr;

    // sample every lit pixel into a particle
    const data = ctx.getImageData(0, 0, W, H).data;
    const list = [];
    left = W; right = 0;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4;
      if (data[i + 3] > 8) { list.push(x, y, data[i], data[i + 1], data[i + 2], data[i + 3]); if (x < left) left = x; if (x > right) right = x; }
    }
    N = list.length / 6;
    ox = new Float32Array(N); oy = new Float32Array(N); px = new Float32Array(N); py = new Float32Array(N);
    a0 = new Float32Array(N); a = new Float32Array(N);
    P = new Uint8ClampedArray(N * 3);
    for (let k = 0; k < N; k++) {
      ox[k] = px[k] = list[k * 6]; oy[k] = py[k] = list[k * 6 + 1];
      P[k * 3] = list[k * 6 + 2]; P[k * 3 + 1] = list[k * 6 + 3]; P[k * 3 + 2] = list[k * 6 + 4];
      a0[k] = a[k] = list[k * 6 + 5] / 255;
    }
    img = ctx.createImageData(W, H);
  };

  const paint = (fade) => {
    const d = img.data; d.fill(0);
    for (let k = 0; k < N; k++) {
      const al = a[k] * fade; if (al <= 0.004) continue;
      const x = px[k] | 0, y = py[k] | 0;
      if (x < 0 || y < 0 || x >= W || y >= H) continue;
      const i = (y * W + x) * 4;
      const na = Math.min(255, d[i + 3] + al * 255);     // overlapping vapour adds up
      d[i] = P[k * 3]; d[i + 1] = P[k * 3 + 1]; d[i + 2] = P[k * 3 + 2]; d[i + 3] = na;
    }
    ctx.putImageData(img, 0, 0);
  };

  // reverse of the component's dissolve: each particle starts out where the vapour would have carried it
  // (a wide, mostly sideways drift, faint) and flies home; the sweep reaches the left letters first
  const randn = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
  let sx, sy, delay;
  const scatter = () => {
    sx = new Float32Array(N); sy = new Float32Array(N); delay = new Float32Array(N);
    const span = Math.max(1, right - left);
    for (let k = 0; k < N; k++) {
      const drifter = Math.random() < DENSITY;
      sx[k] = ox[k] + randn() * mult * (drifter ? 26 : 6);
      sy[k] = oy[k] + randn() * mult * (drifter ? 10 : 3);
      delay[k] = ((ox[k] - left) / span) * T.stagger + Math.random() * 0.25;
    }
  };
  const ease = (x) => 1 - Math.pow(1 - x, 3);
  const pose = (t) => {
    let done = true;
    for (let k = 0; k < N; k++) {
      const f = Math.min(1, Math.max(0, (t - delay[k]) / T.travel));
      if (f < 1) done = false;
      const e = ease(f);
      px[k] = sx[k] + (ox[k] - sx[k]) * e; py[k] = sy[k] + (oy[k] - sy[k]) * e;
      a[k] = a0[k] * Math.min(1, f * 1.6);
    }
    return done;
  };

  let t = 0, last = 0;
  const finish = () => {
    // hand over to the real, crisp text
    h1.classList.remove('vapour-on');
    canvas.style.transition = 'opacity .5s ease'; canvas.style.opacity = 0;
    setTimeout(() => canvas.remove(), 600);
  };
  const frame = (now) => {
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 0; last = now;
    t += dt;
    const done = pose(t);
    paint(1);
    if (done) return finish();
    requestAnimationFrame(frame);
  };

  const start = () => {
    build(); scatter(); pose(0); paint(1);
    h1.classList.add('vapour-on');
    release();
    requestAnimationFrame(frame);
  };
  // wait for Outfit and Instrument Serif so the particles are sampled from the real letterforms
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(start, release);
})();
