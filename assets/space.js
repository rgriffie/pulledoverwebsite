/* The journey: one continuous scene behind the whole page.
   - WebGL (three.js): a pink aurora hanging from the top of the sky, a still far star field with a
     faint galactic band, and a near field that streams toward you as you scroll.
   - The Earth is a real photograph (NASA ISS030-E-10008, Iberian Peninsula at night, public domain),
     cut out and colour-graded (see README). It rises from the bottom as the story moves from
     the information gap toward Technologies, where sunrise breaks over the horizon. */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const earth = document.querySelector('.earth');
  const earthImg = earth && earth.querySelector('img');
  const flareEl = earth && earth.querySelector('.earth-flare');
  // horizon geometry of horizon.webp (3200 px wide): top of the limb sits 687.7 px from the top
  const EARTH = { w: 3200, limbTop: 687.7 };

  /* ---------- scroll stages: one value per [data-stage] section, in page order ----------
     hero, company, ecosystem, gap, house, technologies, support, question, footer */
  const KEYS = {
    // where the top of the horizon sits on screen: -1 = bottom edge, 0 = middle
    horizon: [-1.7, -1.7, -1.6, -1.04, -0.84, -0.6, -0.5, -0.62, -0.55],
    flare:   [0, 0, 0, 0, 0.1, 1, 0.7, 0.45, 0.5],
    sunX:    [0.1, 0.1, 0.1, 0.1, 0.12, 0.16, 0.18, 0.2, 0.2],
    aurora:  [1, 1, 0.95, 0.85, 0.8, 0.7, 0.85, 1, 1],
    bgTop:   [[5, 9, 28], [5, 9, 27], [4, 8, 24], [3, 6, 18], [3, 7, 20], [5, 11, 28], [6, 12, 30], [5, 9, 27], [5, 9, 27]],
  };
  const stages = [...document.querySelectorAll('[data-stage]')];
  const stageAt = () => {
    const mid = scrollY + innerHeight * 0.5;
    for (let i = 0; i < stages.length; i++) {
      const top = stages[i].offsetTop, h = stages[i].offsetHeight;
      if (mid < top + h || i === stages.length - 1) return Math.max(0, Math.min(stages.length - 1, i + Math.max(0, Math.min(1, (mid - top) / h)) - 0.5));
    }
    return 0;
  };
  const sample = (arr, s) => {
    const i = Math.max(0, Math.min(arr.length - 1, Math.floor(s))), j = Math.min(arr.length - 1, i + 1), f = s - Math.floor(s);
    const e = f * f * (3 - 2 * f), a = arr[i], b = arr[j];
    return Array.isArray(a) ? a.map((x, k) => x + (b[k] - x) * e) : a + (b - a) * e;
  };

  /* ---------- void: past the hero the sky (aurora, stars, Earth) is covered by solid #0b193a ---------- */
  const voidEl = document.querySelector('.void');
  const setVoid = () => {
    if (!voidEl) return;
    const x = Math.max(0, Math.min(1, stageAt() / 0.9));
    voidEl.style.opacity = (x * x * (3 - 2 * x)).toFixed(3);
  };
  addEventListener('scroll', setVoid, { passive: true }); addEventListener('resize', setVoid); setVoid();

  /* ---------- Earth layer (DOM, so the photo stays crisp) ---------- */
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  addEventListener('pointermove', (e) => { pointer.tx = (e.clientX / innerWidth) * 2 - 1; pointer.ty = (e.clientY / innerHeight) * 2 - 1; }, { passive: true });
  document.addEventListener('pointerleave', () => { pointer.tx = pointer.ty = 0; });
  const placeEarth = (s, t, dt) => {
    if (!earth) return;
    const W = innerWidth, H = innerHeight;
    const width = Math.max(W * 1.12, H * 1.5, 900);             // wide enough that the curve stays gentle
    const k = width / EARTH.w;
    const hz = sample(KEYS.horizon, s);
    const limbY = H * (0.5 - hz * 0.5);                           // screen y of the horizon's top
    const lean = reduce ? 0 : Math.min(1, dt * 2.5);
    pointer.x += (pointer.tx - pointer.x) * lean; pointer.y += (pointer.ty - pointer.y) * lean;
    const drift = reduce ? 0 : Math.sin(t * 0.07) * 0.25;
    const x = (W - width) / 2 - pointer.x * 14;
    const y = limbY - EARTH.limbTop * k + pointer.y * 6;
    earthImg.style.width = width + 'px';
    earth.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${(drift + pointer.x * 0.6).toFixed(3)}deg)`;
    earth.style.transformOrigin = `${width / 2}px ${EARTH.limbTop * k + width * 0.6}px`;
    earth.style.visibility = limbY > H + 40 ? 'hidden' : 'visible';
    // sunrise, sitting on the horizon slightly right of centre
    const f = sample(KEYS.flare, s);
    flareEl.style.left = (width * (0.5 + sample(KEYS.sunX, s))) + 'px';
    flareEl.style.top = (EARTH.limbTop * k + 4) + 'px';
    flareEl.style.opacity = (f * (reduce ? 1 : 0.92 + 0.08 * Math.sin(t * 0.8))).toFixed(3);
  };

  /* ---------- WebGL sky ---------- */
  const canvas = document.getElementById('space');
  let renderer = null;
  if (canvas && window.THREE) {
    try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' }); } catch (e) { renderer = null; }
  }
  if (!renderer) {
    document.documentElement.classList.add('no-webgl'); canvas && canvas.remove();
    // the Earth still rises with scroll
    let last = performance.now();
    const loop = (now) => { placeEarth(stageAt(), reduce ? 0 : now / 1000, Math.min(0.05, (now - last) / 1000)); last = now; requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 2000);
  camera.position.set(0, 0, 10);

  /* aurora: curtains hang from the top of the sky; their bright lower seam sits about a quarter
     of the way down and the rays rise toward the top edge */
  const NOISE2 = `
    float h2(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float n2(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
      return mix(mix(h2(i), h2(i + vec2(1, 0)), f.x), mix(h2(i + vec2(0, 1)), h2(i + vec2(1, 1)), f.x), f.y); }
    float f2(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 5; i++){ v += a * n2(p); p = p * 2.02 + 7.3; a *= 0.5; } return v; }`;
  const skyMat = new THREE.ShaderMaterial({
    depthWrite: false, depthTest: false, transparent: true, blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uAspect: { value: 1 }, uStrength: { value: 1 }, uDrift: { value: 0 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
    fragmentShader: `
      uniform float uTime, uAspect, uStrength, uDrift; varying vec2 vUv;
      ${NOISE2}
      // one ribbon of aurora: a bright lower edge along curve y = c, rays streaming up from it
      vec3 ribbon(vec2 uv, float x, float c, float t, float seed, float height, float bright){
        // ragged edge: the curve frays with small-scale noise so it never reads as a drawn line
        c += 0.07 * (f2(vec2(x * 3.5 + seed * 5.0 + t * 0.9, uv.y * 2.0 + seed)) - 0.5);
        float d = uv.y - c;                                   // > 0 above the edge
        // rays: fine striations that drift sideways and flicker in brightness
        float r = f2(vec2(x * 26.0 + t * 1.6 + seed * 13.0, uv.y * 0.25 + seed));
        float rays = 0.18 + 1.6 * r * r + 0.45 * n2(vec2(x * 70.0 + seed * 7.0, t * 3.0 + seed));
        float edge = smoothstep(-0.09, 0.03, d);               // very soft underside
        float fall = exp(-max(d, 0.0) / height);              // rays fade as they rise
        // patchy: the curtain brightens and fades in clumps along its length
        float clump = smoothstep(0.32, 0.78, f2(vec2(x * 1.4 + seed * 4.0 - t * 0.7, seed + t * 0.15)));
        float a = (edge * fall * rays + exp(-abs(d) * 30.0) * 0.18 * rays) * (0.25 + 0.75 * clump);
        // colour by height above the edge: magenta seam -> pink -> purple -> deep wine at the top
        float h = clamp(d / (height * 2.2), 0.0, 1.0);
        vec3 col = mix(vec3(1.0, 0.32, 0.78), vec3(0.92, 0.36, 0.9), smoothstep(0.0, 0.25, h));
        col = mix(col, vec3(0.55, 0.22, 0.85), smoothstep(0.2, 0.6, h));
        col = mix(col, vec3(0.5, 0.1, 0.32), smoothstep(0.55, 1.0, h));
        return col * a * bright;
      }
      void main(){
        vec2 uv = vUv; float x = uv.x * uAspect; float xn = uv.x; float t = uTime * 0.03 + uDrift;
        float wob = f2(vec2(xn * 2.0 + t * 0.4, t * 0.2)) - 0.5;
        // ribbon A: sweeps up from the left toward the top right, with a fold in the middle
        float cA = 0.63 + 0.24 * xn + 0.07 * sin(xn * 6.0 + t * 1.3) + 0.1 * wob;
        // ribbon B: arcs down from the top left and back up on the right
        float cB = 0.86 - 0.2 * exp(-pow((xn - 0.62 - 0.05 * sin(t)) * 2.6, 2.0)) + 0.04 * sin(xn * 9.0 - t * 1.7) + 0.06 * wob;
        // ribbon C: faint, high, thin
        float cC = 0.93 + 0.04 * sin(xn * 4.0 + t * 0.9 + 1.7);
        vec3 col = ribbon(uv, x, cA, t, 1.0, 0.16, 0.9)
                 + ribbon(uv, x, cB, t * 1.1, 2.7, 0.12, 0.7)
                 + ribbon(uv, x, cC, t * 0.8, 5.3, 0.08, 0.35);
        // broad purple-red haze high in the sky (the diffuse glow between the curtains)
        float haze = smoothstep(0.45, 1.0, uv.y) * (0.55 + 0.45 * f2(vec2(x * 0.9 - t * 0.5, uv.y * 1.5)));
        col += vec3(0.42, 0.08, 0.32) * haze * 0.35;
        // keep it concentrated toward the top of the screen
        col *= smoothstep(0.4, 0.78, uv.y);
        gl_FragColor = vec4(col * uStrength * 0.3, 1.0);
      }`,
  });
  const sky = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), skyMat);
  sky.frustumCulled = false; sky.renderOrder = -2;
  scene.add(sky);

  /* stars */
  const STAR_VS_COMMON = `
    attribute float seed; uniform float uTime; uniform float uPx;
    varying float vA; varying float vBright; varying vec3 vCol;
    vec3 starColor(float s){ return s < 0.33 ? vec3(0.75, 0.84, 1.0) : (s < 0.85 ? vec3(0.95, 0.96, 1.0) : vec3(1.0, 0.88, 0.8)); }`;
  const STAR_FS = `
    varying float vA; varying float vBright; varying vec3 vCol;
    void main(){
      vec2 c = gl_PointCoord - 0.5; float r = length(c);
      float core = smoothstep(0.5, 0.0, r); core *= core;
      float spike = vBright * (max(0.0, 1.0 - abs(c.x) * 26.0) + max(0.0, 1.0 - abs(c.y) * 26.0)) * smoothstep(0.5, 0.05, r);
      float a = (core + spike * 0.55) * vA;
      gl_FragColor = vec4(vCol * a, a);
    }`;
  const mkStars = (n, place) => {
    const pos = new Float32Array(n * 3), seed = new Float32Array(n);
    for (let i = 0; i < n; i++) { place(pos, i); seed[i] = Math.random(); }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('seed', new THREE.BufferAttribute(seed, 1));
    return g;
  };
  const farGeo = mkStars(9000, (pos, i) => {
    let x, y;
    if (Math.random() < 0.45) { const u = (Math.random() - 0.5) * 2.4, w = (Math.random() + Math.random() + Math.random() - 1.5) * 0.18; x = u; y = u * 0.32 + w + 0.12; }
    else { x = (Math.random() - 0.5) * 2.4; y = (Math.random() - 0.5) * 1.5; }
    const v = new THREE.Vector3(x, y, -1).normalize().multiplyScalar(900);
    pos[i * 3] = v.x; pos[i * 3 + 1] = v.y; pos[i * 3 + 2] = v.z;
  });
  const farMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uPx: { value: 1 } },
    vertexShader: STAR_VS_COMMON + `
      void main(){
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        float tw = 0.6 + 0.4 * sin(uTime * (0.4 + seed * 2.2) + seed * 60.0);
        vBright = seed > 0.993 ? 1.0 : 0.0;
        vCol = starColor(fract(seed * 7.13));
        vA = tw * (0.5 + 0.5 * seed);
        gl_PointSize = uPx * (vBright > 0.5 ? 11.0 : 1.3 + seed * seed * 2.4);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: STAR_FS,
  });
  const far = new THREE.Points(farGeo, farMat); far.renderOrder = -1; far.frustumCulled = false;
  scene.add(far);

  const nearGeo = mkStars(4200, (pos, i) => {
    pos[i * 3] = (Math.random() - 0.5) * 170; pos[i * 3 + 1] = (Math.random() - 0.5) * 110; pos[i * 3 + 2] = -Math.random() * 200;
  });
  const nearMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uTravel: { value: 0 }, uTime: { value: 0 }, uPx: { value: 1 } },
    vertexShader: STAR_VS_COMMON + `
      uniform float uTravel;
      void main(){
        vec3 p = position;
        p.z = mod(p.z + uTravel, 200.0) - 190.0;          // stream toward the camera and wrap
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        float d = -mv.z;
        float tw = 0.65 + 0.35 * sin(uTime * (0.6 + seed * 1.8) + seed * 40.0);
        vBright = seed > 0.992 ? 1.0 : 0.0;
        vCol = starColor(fract(seed * 3.71));
        vA = tw * smoothstep(190.0, 120.0, d) * smoothstep(0.5, 6.0, d);
        gl_PointSize = uPx * (vBright > 0.5 ? 10.0 : 1.4 + seed * 1.4) * clamp(60.0 / d, 0.6, 3.0);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: STAR_FS,
  });
  scene.add(new THREE.Points(nearGeo, nearMat));

  const resize = () => {
    const w = innerWidth, h = innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.fov = w / h < 1 ? 62 : 50; camera.updateProjectionMatrix();
    nearMat.uniforms.uPx.value = farMat.uniforms.uPx.value = renderer.getPixelRatio();
    skyMat.uniforms.uAspect.value = w / h;
  };
  addEventListener('resize', resize); resize();

  let s = stageAt(), travel = 0, lastScroll = scrollY, last = performance.now();
  const bg = new THREE.Color();
  const frame = (now) => {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    const t = reduce ? 0 : now / 1000;
    s += (stageAt() - s) * (reduce ? 1 : Math.min(1, dt * 3));
    const dy = scrollY - lastScroll; lastScroll = scrollY;
    if (!reduce) travel += dt * 1.2 + Math.max(-40, Math.min(40, dy)) * 0.045;
    nearMat.uniforms.uTravel.value = travel;
    nearMat.uniforms.uTime.value = farMat.uniforms.uTime.value = t;
    far.rotation.z = t * 0.0015;
    skyMat.uniforms.uTime.value = t; skyMat.uniforms.uDrift.value = travel * 0.004;
    skyMat.uniforms.uStrength.value = sample(KEYS.aurora, s);
    placeEarth(s, t, dt);
    const top = sample(KEYS.bgTop, s);
    bg.setRGB(top[0] / 255, top[1] / 255, top[2] / 255);
    renderer.setClearColor(bg);
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
})();
