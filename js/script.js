/* Feliz cumpleaños, Gaby — comportamiento de la página */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const rand = (a, b) => a + Math.random() * (b - a);
  const reduced = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const mobile = matchMedia('(max-width:700px)').matches;

  /* ============ Flores amarillas (SVG propio, viewBox -100 -100 200 200) ============ */
  const DEFS = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
    <linearGradient id="gFront" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#f2a100"/><stop offset="1" stop-color="#ffe066"/></linearGradient>
    <linearGradient id="gBack" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#d98200"/><stop offset="1" stop-color="#f6b81c"/></linearGradient>
    <linearGradient id="gPale" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#f6c21a"/><stop offset="1" stop-color="#fff0a0"/></linearGradient>
    <radialGradient id="gDisc"><stop offset="0" stop-color="#7a4a12"/><stop offset=".6" stop-color="#4a2a08"/><stop offset="1" stop-color="#2b1605"/></radialGradient>
    <radialGradient id="gPuff"><stop offset="0" stop-color="#fff07a"/><stop offset="1" stop-color="#f7b900"/></radialGradient>
    <radialGradient id="gCup"><stop offset="0" stop-color="#ffb52e"/><stop offset="1" stop-color="#e57f00"/></radialGradient>
  </defs></svg>`;
  document.body.insertAdjacentHTML('afterbegin', DEFS);

  const petalPath = (len, w) => `M0 0C${w} ${-len * .2} ${w * 1.15} ${-len * .72} 0 ${-len}C${-w * 1.15} ${-len * .72} ${-w} ${-len * .2} 0 0Z`;
  const ring = (n, len, w, fill, off = 0, d0 = 0) => Array.from({ length: n }, (_, i) =>
    `<g transform="rotate(${(i * 360 / n + off).toFixed(2)})"><path class="petal" style="--i:${i + d0}" fill="${fill}" stroke="rgba(150,80,0,.3)" stroke-width=".8" d="${petalPath(len, w)}"/></g>`).join('');

  const FLOWERS = {
    sunflower() {
      let seeds = '';
      for (let i = 1; i <= 80; i++) {
        const r = 3.6 * Math.sqrt(i), a = i * 2.399963;
        seeds += `<circle cx="${(r * Math.cos(a)).toFixed(1)}" cy="${(r * Math.sin(a)).toFixed(1)}" r="${(1 + i / 80).toFixed(2)}" fill="${i % 3 ? '#c98a2e' : '#8a5a1c'}" opacity=".85"/>`;
      }
      return ring(16, 90, 15, 'url(#gBack)', 0) + ring(16, 82, 14, 'url(#gFront)', 11.25, 16) +
        `<g class="core"><circle r="35" fill="url(#gDisc)"/>${seeds}</g>`;
    },
    daisy() {
      return ring(14, 84, 9, '#ffe680', 0) + ring(14, 76, 8, '#fff3b0', 12.8, 14) +
        `<g class="core"><circle r="19" fill="#f5b800"/><circle r="11" fill="#e08a00" opacity=".8"/></g>`;
    },
    daffodil() {
      return ring(6, 88, 26, 'url(#gPale)', 0) + ring(6, 72, 22, '#fff2a8', 30, 6) +
        `<g class="core"><circle r="30" fill="url(#gCup)" stroke="#c46e00" stroke-width="1.5"/><circle r="21" fill="#e48400"/><circle r="12" fill="#b85f00" opacity=".6"/></g>`;
    },
    tulip() {
      return `<g transform="translate(0 20)">
        <path class="petal" style="--i:0" fill="url(#gFront)" stroke="rgba(150,80,0,.3)" stroke-width=".8" d="M0 52C-52 40-58 -20-34 -66C-14 -44-6 -14 0 14Z"/>
        <path class="petal" style="--i:1" fill="url(#gFront)" stroke="rgba(150,80,0,.3)" stroke-width=".8" d="M0 52C52 40 58 -20 34 -66C14 -44 6 -14 0 14Z"/>
        <path class="petal" style="--i:2" fill="url(#gPale)" stroke="rgba(150,80,0,.3)" stroke-width=".8" d="M0 56C-40 42-38 -34 0 -78C38 -34 40 42 0 56Z"/></g>`;
    },
    mimosa() {
      let s = '';
      for (let i = 1; i <= 34; i++) {
        const r = 12.5 * Math.sqrt(i), a = i * 2.399963;
        s += `<circle cx="${(r * Math.cos(a)).toFixed(1)}" cy="${(r * Math.sin(a)).toFixed(1)}" r="${(10 + (i % 4)).toFixed(1)}" fill="url(#gPuff)" stroke="rgba(190,120,0,.35)" stroke-width=".6"/>`;
      }
      return `<g class="core" style="transition-delay:0s">${s}</g>`;
    }
  };
  const TYPES = Object.keys(FLOWERS);
  const svg = t => `<svg viewBox="-100 -100 200 200" aria-hidden="true">${FLOWERS[t]()}</svg>`;

  /* Montaje */
  $('#gateFlower').innerHTML = svg('sunflower');
  $('#heroFlower').innerHTML = svg('sunflower');
  $('#miniFlower').innerHTML = svg('daffodil');
  $('#rowFlowers').innerHTML = ['daisy', 'tulip', 'sunflower', 'mimosa', 'daffodil'].map(t => `<div>${svg(t)}</div>`).join('');

  /* Ramo: cinco flores con un deseo cada una */
  const WISHES = [
    { t: 'sunflower', x: 160, y: 94, s: .6, name: 'Girasol', text: 'Que siempre encuentres la luz, incluso en los días nublados.' },
    { t: 'tulip', x: 84, y: 150, s: .5, name: 'Tulipán', text: 'Que cada año nuevo te traiga algo que te haga mucha ilusión.' },
    { t: 'daffodil', x: 236, y: 150, s: .5, name: 'Narciso', text: 'Que todo lo que empieces este año florezca.' },
    { t: 'mimosa', x: 112, y: 216, s: .5, name: 'Mimosa', text: 'Que estés rodeada de gente que te cuide con ternura.' },
    { t: 'daisy', x: 210, y: 216, s: .5, name: 'Margarita', text: 'Que nunca te falten motivos para reírte.' }
  ];
  const leaf = (x, y, r) => `<path d="M0 0C12-12 34-8 40 0C30 10 10 10 0 0Z" fill="#6aa86f" stroke="#4a8654" stroke-width=".8" transform="translate(${x} ${y}) rotate(${r})"/>`;
  (function bouquet() {
    let stems = '', fl = '';
    WISHES.forEach((w, i) => {
      stems += `<path d="M160 330Q${(160 + w.x) / 2} ${(330 + w.y) / 2 + 18} ${w.x} ${w.y}" fill="none" stroke="#5f9a68" stroke-width="5" stroke-linecap="round"/>`;
      fl += `<g transform="translate(${w.x} ${w.y}) scale(${w.s})"><g class="bq" data-i="${i}" role="button" tabindex="0" aria-label="${w.name}"><circle r="92" fill="transparent"/>${FLOWERS[w.t]()}</g></g>`;
    });
    const wrap = `<path d="M92 262L228 262L160 374Z" fill="#ecc98e" stroke="#b98a45" stroke-width="2"/><path d="M92 262L160 308L228 262" fill="none" stroke="#b98a45" stroke-width="1.5"/><path d="M126 262L160 374L194 262" fill="#f3d9a6" opacity=".7"/>`;
    const bow = `<g transform="translate(160 304)"><path d="M0 0C-24-20-38-4-32 8C-24 15-8 6 0 0Z" fill="#e08a00" stroke="#b36b00"/><path d="M0 0C24-20 38-4 32 8C24 15 8 6 0 0Z" fill="#e08a00" stroke="#b36b00"/><circle r="6" fill="#c97a00" stroke="#b36b00"/></g>`;
    const greens = leaf(112, 250, -150) + leaf(208, 250, -30) + leaf(70, 190, -130) + leaf(252, 190, -50);
    $('#bouquet').innerHTML = `<svg viewBox="0 0 320 380" aria-hidden="false">${stems}${greens}${fl}${wrap}${bow}</svg>`;
  })();

  const wishCard = $('#wishCard'), wishName = $('#wishName'), wishText = $('#wishText');
  function pickWish(g) {
    const w = WISHES[+g.dataset.i];
    $$('.bq').forEach(b => b.classList.toggle('on', b === g));
    wishName.textContent = w.name; wishText.textContent = w.text;
    wishCard.classList.remove('pop'); void wishCard.offsetWidth; wishCard.classList.add('pop');
    const r = g.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2, 14);
  }
  $$('.bq').forEach(g => g.addEventListener('click', () => pickWish(g)));
  $('#bouquet').addEventListener('keydown', e => { const g = e.target.closest('.bq'); if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); pickWish(g); } });

  /* Pastel con velas */
  (function cake() {
    const candle = (x, d) => `<rect x="${x - 4}" y="62" width="8" height="40" rx="2" fill="#fffaf0" stroke="#e8cf86"/><rect x="${x - 4}" y="72" width="8" height="5" fill="#ffd84d"/><rect x="${x - 4}" y="86" width="8" height="5" fill="#ffd84d"/>
      <path class="smoke" d="M${x} 56c-6-8 6-14 0-24" fill="none" stroke="#bda46a" stroke-width="2" stroke-linecap="round"/>
      <g transform="translate(${x} 58)"><g class="flame" style="animation-delay:${d}s"><path d="M0-24C11-8 9 6 0 6C-9 6-11-8 0-24Z" fill="#ffb21e"/><path d="M0-12C5-4 4 4 0 4C-4 4-5-4 0-12Z" fill="#fff4a8"/></g></g>`;
    const tiny = (t, x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">${FLOWERS[t]()}</g>`;
    $('#cake').innerHTML = `<svg viewBox="0 0 300 280" aria-label="Pastel de cumpleaños con velas">
      <ellipse cx="150" cy="252" rx="132" ry="16" fill="#fffdf4" stroke="#f0d58a"/>
      <rect x="40" y="164" width="220" height="86" rx="14" fill="#ffefb8" stroke="#f0cf70"/>
      <path d="M40 176C40 160 52 158 62 158H238C248 158 260 160 260 176V182C250 182 250 202 240 202C230 202 232 184 220 184C208 184 210 206 198 206C186 206 188 186 176 186C164 186 166 200 154 200C142 200 144 184 132 184C120 184 122 204 110 204C98 204 100 184 88 184C76 184 78 200 66 200C56 200 58 182 40 182Z" fill="#fffaf0" stroke="#f0d98b"/>
      <rect x="86" y="104" width="128" height="62" rx="12" fill="#ffe38a" stroke="#f0c850"/>
      <rect x="86" y="104" width="128" height="20" rx="10" fill="#fffaf0" stroke="#f0d98b"/>
      ${candle(120, 0)}${candle(150, .15)}${candle(180, .3)}
      ${tiny('daisy', 78, 226, .16)}${tiny('sunflower', 150, 232, .18)}${tiny('daisy', 222, 226, .16)}${tiny('tulip', 114, 140, .1)}${tiny('daffodil', 186, 140, .11)}
    </svg>`;
  })();
  const cake = $('#cake'), blowBtn = $('#blowBtn'), wishDone = $('#wishDone');
  function toggleCandles() {
    const blown = cake.classList.toggle('blown');
    blowBtn.textContent = blown ? 'Encenderlas otra vez' : 'Soplar las velas';
    wishDone.classList.toggle('show', blown);
    wishDone.textContent = blown ? 'Deseo pedido. Que se cumpla todo lo bonito que guardaste en silencio. 🎂' : '';
    if (blown) { const r = cake.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height * .3, 70); }
  }
  blowBtn.addEventListener('click', toggleCandles);
  cake.addEventListener('click', () => { if (!cake.classList.contains('blown')) toggleCandles(); });

  /* ============ Confeti y pétalos (canvas) ============ */
  const cv = $('#confetti'), ctx = cv.getContext('2d');
  let W = 0, H = 0;
  const fit = () => { const r = devicePixelRatio || 1; W = innerWidth; H = innerHeight; cv.width = W * r; cv.height = H * r; ctx.setTransform(r, 0, 0, r, 0, 0); };
  fit(); addEventListener('resize', fit);
  const COLORS = ['#ffd84d', '#ffc21a', '#fff1a0', '#ffffff', '#f6a3b8', '#f5b800'];
  const parts = [], ambient = [];
  function burst(x, y, n = 40) {
    if (reduced) return;
    for (let i = 0; i < n; i++) {
      const a = rand(0, 6.283), v = rand(120, 380);
      parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 140, g: 520, r: rand(3, 6.5), rot: rand(0, 6.28), vr: rand(-8, 8), c: COLORS[Math.floor(Math.random() * COLORS.length)], life: rand(1.4, 2.4), t: 0, shape: Math.random() < .5 ? 'p' : 'c' });
    }
  }
  const AN = reduced ? 0 : (mobile ? 12 : 22);
  const spawnA = (p, top) => Object.assign(p, { x: rand(0, W), y: top ? rand(-40, -10) : rand(-H, H), r: rand(5, 9), vy: rand(24, 50), ph: rand(0, 6.28), rot: rand(0, 6.28), vr: rand(-1.2, 1.2), c: Math.random() < .7 ? 'rgba(255,208,50,.7)' : 'rgba(255,240,160,.8)' });
  for (let i = 0; i < AN; i++) ambient.push(spawnA({}, false));
  let last = performance.now();
  (function loop(now) {
    const dt = Math.min((now - last) / 1000, .05); last = now;
    if (!document.hidden) {
      ctx.clearRect(0, 0, W, H);
      ambient.forEach(p => {
        p.ph += dt * 1.5; p.rot += p.vr * dt; p.y += p.vy * dt; p.x += Math.sin(p.ph) * 26 * dt;
        if (p.y > H + 20) spawnA(p, true);
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.scale(1, .6 + .4 * Math.sin(p.ph));
        ctx.fillStyle = p.c; ctx.beginPath(); ctx.ellipse(0, 0, p.r * .55, p.r, 0, 0, 6.283); ctx.fill(); ctx.restore();
      });
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]; p.t += dt;
        if (p.t > p.life) { parts.splice(i, 1); continue; }
        p.vy += p.g * dt; p.vx *= .985; p.x += p.vx * dt; p.y += p.vy * dt; p.rot += p.vr * dt;
        ctx.save(); ctx.globalAlpha = Math.min(1, (p.life - p.t) * 1.6); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.c;
        ctx.beginPath();
        if (p.shape === 'c') ctx.arc(0, 0, p.r * .7, 0, 6.283); else ctx.ellipse(0, 0, p.r * .55, p.r, 0, 0, 6.283);
        ctx.fill(); ctx.restore();
      }
    }
    requestAnimationFrame(loop);
  })(last);

  /* ============ Tocar para plantar flores ============ */
  const sprouts = $('#sprouts');
  document.addEventListener('pointerdown', e => {
    if (document.body.classList.contains('locked') || reduced) return;
    if (e.target.closest('button,a,.bq,.gate,.letter')) return;
    if (sprouts.children.length > 12) return;
    const s = document.createElement('div');
    s.className = 'sprout';
    s.style.left = e.clientX + 'px'; s.style.top = e.clientY + 'px';
    s.innerHTML = svg(TYPES[Math.floor(Math.random() * TYPES.length)]);
    sprouts.appendChild(s);
    setTimeout(() => s.remove(), 2900);
  });

  /* ============ Aparición al bajar ============ */
  function startReveals() {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: .18, rootMargin: '0px 0px -6% 0px' });
    $$('.reveal, .bloom:not(.gate-flower)').forEach(el => io.observe(el));
  }

  /* ============ Música (reproductor oficial de YouTube) ============ */
  const VIDEO = 'nYrEL9ecAWA'; // Iris - Goo Goo Dolls
  const musicBtn = $('#music'), hint = $('#musicHint');
  let yt = null, ready = false, want = false;
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  tag.onerror = () => showHint('No se pudo cargar la música');
  document.head.appendChild(tag);
  window.onYouTubeIframeAPIReady = () => {
    const vars = { playsinline: 1, controls: 0, rel: 0, modestbranding: 1, disablekb: 1, fs: 0 };
    if (/^https?:$/.test(location.protocol)) vars.origin = location.origin;
    yt = new YT.Player('yt', {
      width: 200, height: 200, videoId: VIDEO, playerVars: vars,
      events: {
        onReady: () => { ready = true; if (want) yt.playVideo(); },
        onStateChange: e => {
          const S = YT.PlayerState;
          if (e.data === S.ENDED) { yt.seekTo(0); yt.playVideo(); }
          const on = e.data === S.PLAYING || e.data === S.BUFFERING;
          musicBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
          if (e.data === S.PLAYING) hint.hidden = true;
        },
        onError: () => showHint(location.protocol === 'file:' ? 'Abre la página desde un servidor para escuchar la música' : 'La canción no se pudo reproducir aquí')
      }
    });
  };
  function showHint(msg) { hint.textContent = msg || 'Toca aquí para activar la música ♪'; hint.hidden = false; }
  function startMusic() {
    want = true;
    if (ready) yt.playVideo();
    setTimeout(() => {
      if (!want) return;
      const st = ready ? yt.getPlayerState() : -2;
      if (st !== 1 && st !== 3) showHint();
    }, 2200);
  }
  musicBtn.addEventListener('click', () => {
    if (!ready) { want = true; showHint('Un momento, cargando la música…'); return; }
    const st = yt.getPlayerState();
    if (st === 1 || st === 3) { want = false; yt.pauseVideo(); }
    else { want = true; yt.playVideo(); hint.hidden = true; }
  });

  /* ============ Jardín eterno (canvas, infinito y con parallax) ============ */
  (function eternalGarden() {
    const sec = $('#jardin'), cvs = $('#gardenCanvas'), g = cvs.getContext('2d');
    let GW = 0, GH = 0, visible = false, started = false;
    const fitG = () => { const r = Math.min(devicePixelRatio || 1, 2); GW = cvs.clientWidth; GH = cvs.clientHeight; cvs.width = GW * r; cvs.height = GH * r; g.setTransform(r, 0, 0, r, 0, 0); };

    /* Flores como imágenes: las mismas ilustraciones, convertidas a sprites */
    const defsInner = DEFS.replace(/^[\s\S]*?<defs>/, '').replace(/<\/defs>[\s\S]*$/, '');
    const sprites = {};
    TYPES.forEach(t => {
      const img = new Image();
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-100 -100 200 200" width="240" height="240"><defs>${defsInner}</defs>${FLOWERS[t]()}</svg>`);
      sprites[t] = img;
    });

    /* Generación determinista por "trozos": el jardín nunca se acaba */
    const CHUNK = 420;
    const mulberry = a => () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const LAYERS = [
      { f: .3, base: .66, s: .34, a: .72, n: 6, hill: .6 },
      { f: .6, base: .79, s: .58, a: .9, n: 5, hill: .72 },
      { f: 1, base: .93, s: 1, a: 1, n: 3, hill: 0 }
    ];
    const chunks = new Map();
    function chunk(li, k) {
      const key = li * 1e7 + k;
      let c = chunks.get(key);
      if (!c) {
        const rnd = mulberry(k * 7919 + li * 104729 + 13), L = LAYERS[li]; c = [];
        for (let i = 0; i < L.n; i++) c.push({ x: k * CHUNK + rnd() * CHUNK, t: TYPES[Math.floor(rnd() * TYPES.length)], size: 74 + rnd() * 60, h: 90 + rnd() * 150, ph: rnd() * 6.28, born: 0 });
        chunks.set(key, c);
        if (chunks.size > 140) { const first = chunks.keys().next().value; chunks.delete(first); }
      }
      return c;
    }
    const mine = []; // flores plantadas por ella

    const ease = t => { t = Math.max(0, Math.min(1, t)); const c = 1.6; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };

    let cam = 0, vel = 0, dragging = false, lastX = 0, downX = 0, downY = 0, downT = 0, now = 0;
    const AUTO = reduced ? 0 : 16;

    function plant(p, L, bx, by, hx, hy, sway, sc) {
      if (!p.born) p.born = now;
      const k = (now - p.born) / 1900, grow = ease(k);
      if (grow <= 0.01) return;
      const stemEase = Math.min(1, grow * 1.15), headEase = Math.max(0, Math.min(1.08, (k - .35) / .65));
      const hyy = by - (by - hy) * stemEase, hxx = hx + sway * stemEase;
      g.strokeStyle = '#5f9a68'; g.lineWidth = Math.max(1.5, 4.2 * sc); g.lineCap = 'round';
      g.beginPath(); g.moveTo(bx, by); g.quadraticCurveTo(bx + sway * .1, (by + hyy) / 2, hxx, hyy); g.stroke();
      if (stemEase > .5) {
        g.fillStyle = '#6aa86f';
        const lx = bx + sway * .08, ly = by - (by - hyy) * .35;
        g.beginPath(); g.ellipse(lx + 14 * sc, ly, 15 * sc, 5.5 * sc, -.5, 0, 6.283); g.fill();
        g.beginPath(); g.ellipse(lx - 14 * sc, ly - 22 * sc, 13 * sc, 5 * sc, .5, 0, 6.283); g.fill();
      }
      const img = sprites[p.t];
      if (headEase > 0 && img.complete && img.naturalWidth) {
        const size = p.size * sc * Math.min(1.08, headEase);
        g.save(); g.translate(hxx, hyy); g.rotate(sway * .012 + (1 - headEase) * -1.2);
        g.drawImage(img, -size / 2, -size / 2, size, size); g.restore();
      }
    }

    const flies = Array.from({ length: mobile ? 3 : 5 }, () => ({ x: rand(0, 400), y: rand(.2, .6), sp: rand(.15, .35), ph: rand(0, 6.28), s: rand(.7, 1.1) }));
    const motes = Array.from({ length: mobile ? 26 : 46 }, () => ({ x: rand(0, 1), y: rand(0, 1), r: rand(1, 2.6), v: rand(4, 12), ph: rand(0, 6.28) }));

    function drawHill(L, tm) {
      const by = GH * L.base, amp = 26 * L.s + 6, off = cam * L.f;
      g.beginPath(); g.moveTo(0, GH);
      for (let x = 0; x <= GW + 12; x += 12) g.lineTo(x, by - GH * .05 + Math.sin((x + off) / (170 + L.f * 90)) * amp + Math.sin((x + off) / 61) * amp * .3);
      g.lineTo(GW, GH); g.closePath();
      const gr = g.createLinearGradient(0, by - 60, 0, GH);
      gr.addColorStop(0, L.f < .5 ? '#cfe7a6' : L.f < .9 ? '#a9d37f' : '#7fbe66'); gr.addColorStop(1, L.f < .5 ? '#bcdc90' : '#6aa850');
      g.fillStyle = gr; g.globalAlpha = L.a; g.fill(); g.globalAlpha = 1;
    }

    function frame(ts) {
      requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      const dt = Math.min((ts - (frame.last || ts)) / 1000, .05); frame.last = ts; now = ts;
      if (!dragging) { cam += (AUTO + vel) * dt; vel *= Math.pow(.04, dt); if (Math.abs(vel) < 1) vel = 0; }
      const tm = ts / 1000;
      g.clearRect(0, 0, GW, GH);

      /* sol suave */
      const sg = g.createRadialGradient(GW * .74, GH * .26, 0, GW * .74, GH * .26, GH * .5);
      sg.addColorStop(0, 'rgba(255,255,230,.95)'); sg.addColorStop(.18, 'rgba(255,238,150,.65)'); sg.addColorStop(1, 'rgba(255,230,140,0)');
      g.fillStyle = sg; g.fillRect(0, 0, GW, GH);

      LAYERS.forEach((L, li) => {
        if (li < 2) drawHill(L, tm);
        const off = cam * L.f, by = GH * L.base;
        const k0 = Math.floor((off - 160) / CHUNK), k1 = Math.floor((off + GW + 160) / CHUNK);
        const list = [];
        for (let k = k0; k <= k1; k++) chunk(li, k).forEach(p => list.push(p));
        list.sort((a, b) => a.h - b.h);
        g.globalAlpha = L.a;
        list.forEach(p => {
          const x = p.x - off, sway = Math.sin(tm * 1.1 + p.ph) * 9 * L.s;
          plant(p, L, x, by + (p.ph % 1) * 14 * L.s, x, by - p.h * L.s * 1.15 + 0, sway, L.s);
        });
        g.globalAlpha = 1;
        if (li === 2) {
          /* hierba cercana */
          g.lineCap = 'round'; g.lineWidth = 2.4;
          for (let x = -10; x < GW + 10; x += 8) {
            const wx = x + off, hsh = Math.abs(Math.sin(wx * 12.9898) * 43758.5453) % 1, h = 16 + hsh * 30, sw = Math.sin(tm * 1.6 + wx * .045) * 6;
            g.strokeStyle = hsh > .5 ? '#5da64c' : '#78bb5e';
            g.beginPath(); g.moveTo(x, GH); g.quadraticCurveTo(x + sw * .4, GH - h * .6, x + sw, GH - h - 4); g.stroke();
          }
          /* las que ella planta */
          for (let i = mine.length - 1; i >= 0; i--) {
            const p = mine[i], x = p.x - off, sway = Math.sin(tm * 1.1 + p.ph) * 8;
            if (x < -200 || x > GW + 200) continue;
            plant(p, L, x, GH * L.base + 6, x, p.hy, sway, .95);
          }
        }
      });

      /* mariposas amarillas */
      flies.forEach(f => {
        f.ph += dt * 6; f.x += f.sp * 60 * dt;
        const x = ((f.x - cam * .05) % (GW + 120) + GW + 120) % (GW + 120) - 60, y = GH * f.y + Math.sin(tm * f.sp * 5 + f.x * .02) * 40;
        const w = Math.abs(Math.sin(f.ph)) * 11 * f.s + 2;
        g.save(); g.translate(x, y); g.fillStyle = '#ffcf33'; g.strokeStyle = '#d98a00'; g.lineWidth = 1;
        [-1, 1].forEach(d => { g.beginPath(); g.ellipse(d * w * .55, -3 * f.s, w * .6, 8 * f.s, d * .5, 0, 6.283); g.fill(); g.stroke(); g.beginPath(); g.ellipse(d * w * .45, 5 * f.s, w * .42, 6 * f.s, -d * .5, 0, 6.283); g.fill(); });
        g.fillStyle = '#6a4a12'; g.fillRect(-1, -7 * f.s, 2, 14 * f.s); g.restore();
      });
      /* polen brillante */
      motes.forEach(m => {
        m.y -= m.v * dt / GH; m.x += Math.sin(tm + m.ph) * 8 * dt / GW;
        if (m.y < -.02) { m.y = 1.02; m.x = Math.random(); }
        const a = .35 + .4 * Math.sin(tm * 2 + m.ph);
        g.fillStyle = `rgba(255,228,120,${a * .35})`; g.beginPath(); g.arc(m.x * GW, m.y * GH, m.r * 3, 0, 6.283); g.fill();
        g.fillStyle = `rgba(255,250,200,${a})`; g.beginPath(); g.arc(m.x * GW, m.y * GH, m.r, 0, 6.283); g.fill();
      });
    }

    /* Arrastrar para recorrer; tocar para plantar */
    let moved = 0;
    cvs.addEventListener('pointerdown', e => {
      dragging = true; lastX = downX = e.clientX; downY = e.clientY; downT = performance.now(); moved = 0; vel = 0;
      cvs.setPointerCapture(e.pointerId); cvs.style.cursor = 'grabbing';
    });
    cvs.addEventListener('pointermove', e => {
      if (!dragging) return;
      const dx = e.clientX - lastX; lastX = e.clientX; moved += Math.abs(dx);
      cam -= dx; vel = -dx * 60 * .6;
    });
    const up = e => {
      if (!dragging) return; dragging = false; cvs.style.cursor = 'grab';
      const quick = performance.now() - downT < 320;
      if (moved < 8 && quick && e.type === 'pointerup') {
        const r = cvs.getBoundingClientRect(), x = e.clientX - r.left, y = Math.max(GH * .2, Math.min(GH * .8, e.clientY - r.top));
        mine.push({ x: x + cam, hy: y, t: TYPES[Math.floor(Math.random() * TYPES.length)], size: rand(96, 140), ph: rand(0, 6.28), born: 0 });
        if (mine.length > 300) mine.shift();
        burst(e.clientX, e.clientY, 12);
        $('#gardenHint').classList.add('gone');
        const c = $('#gardenCount'); c.textContent = mine.length === 1 ? 'Plantaste tu primera flor 🌱' : `Has plantado ${mine.length} flores 🌼`;
      }
    };
    cvs.addEventListener('pointerup', up); cvs.addEventListener('pointercancel', up);

    new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible && !started) { started = true; fitG(); } }, { threshold: .05 }).observe(sec);
    addEventListener('resize', () => { if (started) fitG(); });
    requestAnimationFrame(frame);
  })();

  /* ============ Abrir el regalo ============ */
  const gate = $('#gate');
  setTimeout(() => $('#gateFlower').classList.add('in'), 250);
  $('#openBtn').addEventListener('click', () => {
    gate.classList.add('out');
    document.body.classList.remove('locked');
    window.scrollTo(0, 0);
    musicBtn.hidden = false;
    startMusic();
    burst(innerWidth / 2, innerHeight * .45, 90);
    setTimeout(startReveals, 400);
  });
  $('#againBtn').addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
})();
