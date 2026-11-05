/* The adventure. A small state machine: title → office → cases, one command
   menu on the right, one text box underneath, everything else in the picture. */
(() => {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const KEY = "ran98";
  const store = {
    get() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } },
    set(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch { /* private window */ } },
  };
  const saved = store.get();
  const browserZh = (navigator.language || "").toLowerCase().startsWith("zh");
  const S = {
    lang: saved.lang || (browserZh ? "zh" : "en"),
    sound: false,
    crt: saved.crt !== false,
    found: saved.found || {},   // case id → list of found clue spots
    closed: new Set((saved.closed || []).filter((id) => CASES.some((c) => c.id === id))),
    egg: new Set(saved.egg || []),
    seenPrologue: !!saved.seenPrologue,
    screen: null,
    caseId: null,
    mode: "cmds",
    tab: "ml",
  };
  const persist = () => store.set({ lang: S.lang, crt: S.crt, found: S.found, closed: [...S.closed], egg: [...S.egg], seenPrologue: S.seenPrologue });
  const L = (o) => (o == null ? "" : typeof o === "string" ? o : (o[S.lang] ?? o.en));
  const UI = (k) => L(SCRIPT.ui[k]);
  const ITEM = Object.fromEntries(ITEMS.map((i) => [i.id, i]));
  const CASE = Object.fromEntries(CASES.map((c) => [c.id, c]));
  const NUM = Object.fromEntries(ITEMS.map((i, n) => [i.id, String(n + 1).padStart(2, "0")]));
  const EGG_SCENES = { office: "m", fortune: "i", gacha: "a1", writing_desk: "t", phone_booth: "a2" };
  const EGG_ORDER = ["m", "i", "a1", "t", "a2"];

  /* ── screen unit ── */
  const stage = $("#stage");
  const fit = () => {
    const w = innerWidth, h = innerHeight;
    const tall = w / h < 1.05;
    stage.classList.toggle("tall", tall);
    /* The cover fills the window, not the game's screen. Only narrow windows get the upright version. */
    const phone = w / h < .72;
    $("#front").classList.toggle("phone", phone);
    const cw = Math.min(w, h * 4 / 3);
    $("#cover").style.width = phone ? "" : cw + "px";
    $("#cover").style.height = phone ? "" : cw * 3 / 4 + "px";
    if (tall) { document.documentElement.style.setProperty("--u", "1px"); return; }
    const dpr = devicePixelRatio || 1;
    const raw = Math.min(w / 640, h / 400);
    const u = Math.max(Math.floor(raw * dpr) / dpr, 0.5);
    document.documentElement.style.setProperty("--u", u + "px");
  };
  addEventListener("resize", fit);
  fit();

  /* ── sound: square blips, plus a little two-operator FM loop if you ask ── */
  let ac = null, bgm = null;
  const audio = () => { if (!ac) { const C = window.AudioContext || window.webkitAudioContext; if (C) ac = new C(); } if (ac && ac.state === "suspended") ac.resume(); return ac; };
  const beep = (freq, dur = .05, vol = .03, type = "square", when = 0) => {
    if (!S.sound || !audio()) return;
    const t = ac.currentTime + when, o = ac.createOscillator(), g = ac.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(vol, t); g.gain.linearRampToValueAtTime(0, t + dur);
    o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + dur + .01);
  };
  const SFX = {
    tick: () => beep(1320, .012, .012),
    pick: () => beep(880, .04, .025),
    open: () => { beep(660, .05); beep(990, .07, .03, "square", .05); },
    found: () => { beep(784, .05); beep(1047, .05, .03, "square", .05); beep(1319, .1, .03, "square", .1); },
    stamp: () => { beep(110, .2, .08, "sawtooth"); beep(82, .24, .08, "square", .03); },
    egg: () => [523, 659, 784, 1047, 1319, 1568].forEach((f, i) => beep(f, .08, .03, "square", i * .08)),
  };
  /* An original loop in A minor. Melody and bass share one FM voice. */
  const LOOP = { chords: [[57, 60, 64, 67], [53, 57, 60, 64], [50, 53, 57, 60], [52, 56, 59, 62]], bass: [33, 29, 26, 28], tune: [76, 74, 72, null, 69, null, 72, 74, 72, 69, 65, null, 64, null, 62, 64] };
  const fmNote = (midi, t, dur, vol, ratio = 2, depth = 120) => {
    const f = 440 * 2 ** ((midi - 69) / 12);
    const car = ac.createOscillator(), mod = ac.createOscillator(), mg = ac.createGain(), g = ac.createGain();
    car.frequency.value = f; mod.frequency.value = f * ratio;
    mg.gain.setValueAtTime(depth, t); mg.gain.exponentialRampToValueAtTime(1, t + dur);
    g.gain.setValueAtTime(vol, t); g.gain.linearRampToValueAtTime(vol * .6, t + dur * .3); g.gain.linearRampToValueAtTime(0, t + dur);
    mod.connect(mg); mg.connect(car.frequency); car.connect(g); g.connect(ac.destination);
    car.start(t); mod.start(t); car.stop(t + dur + .02); mod.stop(t + dur + .02);
  };
  const startBgm = () => {
    if (!audio() || bgm) return;
    const step = .24; let bar = 0, next = ac.currentTime + .05;
    const sched = () => {
      while (next < ac.currentTime + .6) {
        const i = bar % 16, ch = Math.floor((bar % 64) / 16);
        const c = LOOP.chords[ch];
        fmNote(c[i % 4] + 12, next, step * 1.6, .012, 1, 60);
        if (i % 8 === 0) fmNote(LOOP.bass[ch] + 12, next, step * 7, .03, 1, 90);
        const n = bar % 64 >= 32 ? LOOP.tune[i] : null;
        if (n) fmNote(n, next, step * 2.6, .02, 3, 180);
        bar += 1; next += step;
      }
    };
    sched(); bgm = setInterval(sched, 150);
  };
  const stopBgm = () => { clearInterval(bgm); bgm = null; };

  /* ── pictures: PNGs decoded to palette indices, so the screen can flicker neon
        by changing a colour, exactly as the old machines did ── */
  const loaded = {};
  const loadImg = (src) => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
  const decode = async (name) => {
    if (loaded[name]) return loaded[name];
    const img = await loadImg(`assets/scenes/${name}.png`);
    const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
    const x = c.getContext("2d", { willReadFrequently: true });
    x.drawImage(img, 0, 0);
    let out = { name, w: img.width, h: img.height, img };
    try {
      const d = x.getImageData(0, 0, img.width, img.height);
      const px = new Uint32Array(d.data.buffer);
      const map = new Map(), pal = [];
      const idx = new Uint8Array(px.length);
      for (let i = 0; i < px.length; i++) {
        let k = map.get(px[i]);
        if (k === undefined) { k = pal.length; map.set(px[i], k); pal.push(px[i]); }
        idx[i] = k;
      }
      out = { ...out, idx, pal: Uint32Array.from(pal), map, data: d };
    } catch { /* canvas tainted (file://): keep the still image */ }
    loaded[name] = out;
    return out;
  };

  const rgb = (r, g, b) => (255 << 24 | b << 16 | g << 8 | r) >>> 0;
  const NEON = [rgb(255, 85, 170), rgb(68, 238, 238)];
  const RAIN_A = rgb(68, 85, 136), RAIN_B = rgb(102, 119, 170);

  class Screen {
    constructor(canvas) { this.c = canvas; this.x = canvas.getContext("2d"); this.pic = null; this.drops = []; this.fade = null; this.dim = -1; this.dimUntil = 0; }
    async show(name, wipe = true) {
      const pic = await decode(name);
      const meta = ART.scenes[name];
      const prev = this.pic && this.pic.data ? this.x.getImageData(0, 0, this.c.width, this.c.height) : null;
      this.pic = pic;
      this.c.width = pic.w; this.c.height = pic.h;
      this.seedRain(meta.rain || 0);
      if (wipe && prev && prev.width === pic.w && !REDUCED && pic.data) this.fade = { from: new Uint32Array(prev.data.buffer.slice(0)), t: 0 };
      else this.fade = null;
      this.draw();
    }
    seedRain(n) {
      const w = this.c.width, h = this.c.height;
      this.drops = Array.from({ length: n }, () => ({ x: Math.random() * w | 0, y: Math.random() * h | 0, l: 4 + (Math.random() * 7 | 0), v: 9 + (Math.random() * 7 | 0), c: Math.random() < .25 ? RAIN_B : RAIN_A }));
    }
    tick(now) {
      if (!this.pic) return;
      if (now > this.dimUntil) {
        this.dim = -1;
        if (Math.random() < .018) { this.dim = Math.random() < .5 ? 0 : 1; this.dimUntil = now + 60 + Math.random() * 180; }
      }
      for (const d of this.drops) { d.y += d.v; d.x -= d.v >> 2; if (d.y > this.c.height) { d.y = -d.l; d.x = Math.random() * this.c.width * 1.2 | 0; } }
      if (this.fade) this.fade.t += 1 / 8;
      this.draw();
    }
    draw() {
      const p = this.pic;
      if (!p) return;
      if (!p.data) { this.x.drawImage(p.img, 0, 0); return; }
      const out = new Uint32Array(p.data.data.buffer);
      const pal = p.pal.slice();
      if (this.dim >= 0) {
        const i = p.map.get(NEON[this.dim]);
        if (i !== undefined) pal[i] = this.dim === 0 ? rgb(153, 34, 102) : rgb(0, 119, 136);
      }
      for (let i = 0; i < out.length; i++) out[i] = pal[p.idx[i]];
      const w = p.w, h = p.h;
      for (const d of this.drops) {
        for (let j = 0; j < d.l; j++) {
          const yy = d.y + j, xx = d.x - (j >> 2);
          if (yy >= 0 && yy < h && xx >= 0 && xx < w) out[yy * w + xx] = d.c;
        }
      }
      if (this.fade) {
        /* dissolve through a 4x4 ordered pattern, old frame to new */
        const B = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
        const t = this.fade.t * 16, from = this.fade.from;
        for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (B[(y & 3) * 4 + (x & 3)] >= t) out[y * w + x] = from[y * w + x];
        if (this.fade.t >= 1) this.fade = null;
      }
      this.x.putImageData(p.data, 0, 0);
    }
  }
  const scene = new Screen($("#scene"));
  /* twelve frames a second, as it should be */
  const loop = () => {
    const now = performance.now();
    if (!REDUCED && $("#front").hidden) scene.tick(now);
    busts.forEach((b) => b.tick(now));
  };

  /* ── Rosana's bust: a base, plus eye and mouth frames from one sheet ── */
  class Bust {
    constructor(canvas) { this.c = canvas; this.x = canvas.getContext("2d"); this.eye = "open"; this.face = "open"; this.mouth = "closed"; this.talk = false; this.nextBlink = 0; this.blinkTill = 0; }
    paint() {
      if (!sheetImg) return;
      const a = ART.portrait, x = this.x;
      x.clearRect(0, 0, a.w, a.h);
      x.drawImage(sheetImg, 0, 0, a.w, a.h, 0, 0, a.w, a.h);
      const e = a.eye, m = a.mouth;
      const ei = e.names.indexOf(this.eye), mi = m.names.indexOf(this.mouth);
      if (ei > 0) { x.clearRect(e.x, e.y, e.w, e.h); x.drawImage(sheetImg, e.sx, ei * e.h, e.w, e.h, e.x, e.y, e.w, e.h); }
      if (mi > 0) { x.clearRect(m.x, m.y, m.w, m.h); x.drawImage(sheetImg, m.sx, mi * m.h, m.w, m.h, m.x, m.y, m.w, m.h); }
    }
    tick(now) {
      let eye = this.face;
      if (!REDUCED) {
        if (now > this.nextBlink) { this.blinkTill = now + 110; this.nextBlink = now + 2200 + Math.random() * 3600; }
        if (now < this.blinkTill) eye = "closed";
      }
      const mouth = this.talk && !REDUCED ? (Math.floor(now / 140) % 2 ? "talk" : "closed") : (this.face === "smile" ? "smile" : "closed");
      if (eye !== this.eye || mouth !== this.mouth) { this.eye = eye; this.mouth = mouth; this.paint(); }
    }
    setFace(f) { this.face = f || "open"; this.eye = this.face; this.paint(); }
  }
  let sheetImg = null;
  const bust = new Bust($("#bust"));
  const busts = [bust];

  /* ── text box ── */
  const line = $("#line"), who = $("#who"), more = $("#more"), sr = $("#sr"), box = $("#box");
  const Q = { list: [], cur: null, i: 0, timer: 0, done: null };
  const pageLimit = () => (S.lang === "zh" ? 110 : 250);
  /* Long passages turn the page at a sentence end rather than overflow the box. */
  const pages = (t) => {
    const lim = pageLimit();
    if (t.length <= lim) return [t];
    const parts = t.match(S.lang === "zh" ? /[^。！？]+[。！？]*/g : /[^.!?]+[.!?]+\s*|[^.!?]+$/g) || [t];
    const out = []; let cur = "";
    for (const s of parts) { if (cur && (cur + s).length > lim) { out.push(cur.trim()); cur = ""; } cur += s; }
    if (cur.trim()) out.push(cur.trim());
    return out;
  };
  const say = (list, done) => {
    if (!$("#front").hidden) return;   // a scene still dissolving when the player went back to the title
    const flat = [];
    for (const m of list) for (const p of pages(m.t)) flat.push({ ...m, t: p });
    Q.list = flat; Q.done = done || null; S.mode = "text"; renderCmds(); clearSpots(); nextLine();
  };
  const nextLine = () => {
    clearTimeout(Q.timer);
    if (!Q.list.length) {
      Q.cur = null; bust.talk = false; more.hidden = true;
      const d = Q.done; Q.done = null;
      S.mode = "cmds";
      if (d) d(); else idle();
      return;
    }
    const m = Q.cur = Q.list.shift();
    Q.i = 0;
    who.hidden = !m.who; who.textContent = m.who || "";
    const isR = m.who === "Rosana";
    $("#bust").classList.toggle("off", !isR);
    if (isR) { bust.setFace(m.face); bust.talk = true; }
    sr.textContent = (m.who ? m.who + ": " : "") + m.t;
    more.hidden = true;
    type();
  };
  const type = () => {
    const m = Q.cur; if (!m) return;
    if (REDUCED) Q.i = m.t.length;
    /* the unrevealed tail stays in the layout, so words never jump lines */
    line.innerHTML = esc(m.t.slice(0, Q.i)) + "<span>" + esc(m.t.slice(Q.i)) + "</span>";
    if (Q.i >= m.t.length) { bust.talk = false; more.hidden = false; return; }
    Q.i += S.lang === "zh" ? 1 : 2;
    if (Q.i % 4 === 0) SFX.tick();
    Q.timer = setTimeout(type, S.lang === "zh" ? 30 : 18);
  };
  const advance = () => {
    if (!Q.cur) return;
    if (Q.i < Q.cur.t.length) { clearTimeout(Q.timer); Q.i = Q.cur.t.length; type(); return; }
    SFX.pick();
    nextLine();
  };
  box.addEventListener("click", advance);
  $("#view").addEventListener("click", (e) => { if (S.mode === "text" && !e.target.closest(".spot,#sheet")) advance(); });
  const silent = (text) => {
    Q.cur = null; who.hidden = true; more.hidden = true; bust.talk = false;
    $("#bust").classList.add("off");
    line.textContent = text; sr.textContent = text;
  };

  /* ── commands ── */
  const cmdsEl = $("#cmds");
  const cmdBtn = (label, jp, fn, cls) => {
    const b = el("button", "cmd" + (cls ? " " + cls : ""), `<span>${esc(label)}</span>${jp ? `<i>${esc(jp)}</i>` : ""}`);
    b.type = "button";
    b.addEventListener("click", () => { SFX.pick(); fn(); });
    return b;
  };
  const linkCmd = (label, url) => {
    const a = el("a", "cmd", `<span>${esc(label)}</span><i>↗</i>`);
    a.href = url;
    if (!url.startsWith("mailto")) { a.target = "_blank"; a.rel = "noopener"; }
    return a;
  };
  const verb = (k, fn) => cmdBtn(UI(k), SCRIPT.ui[k].jp, fn);
  let cmdSpec = () => [];
  const renderCmds = () => {
    cmdsEl.textContent = "";
    const items = cmdSpec();
    if (S.mode === "text") items.forEach((b) => { if (b.tagName === "BUTTON") { b.disabled = true; b.classList.add("wait"); } });
    cmdsEl.append(...items);
    tagFooter();
  };
  const tagFooter = () => {
    const c = S.caseId && S.screen === "case" ? ITEM[S.caseId] : null;
    if (c) cmdsEl.append(el("div", "gap"), caseTag(c));
  };
  const caseTag = (c) => {
    const closed = S.closed.has(c.id);
    const r = SITE.rarities[c.rarity];
    return el("div", "case-tag", `${esc(UI("case"))} ${NUM[c.id]} <em>${esc(closed ? UI("closed") : UI("open"))}</em><b>${esc(L(c.title))}</b>${esc(SITE.zones[c.zone].label[S.lang] || SITE.zones[c.zone].label.en)} · ${esc(L(r.label))}`);
  };
  const focusFirst = () => { const b = cmdsEl.querySelector("button, a"); if (b && !stage.classList.contains("tall")) b.focus({ preventScroll: true }); };
  const idle = () => { S.mode = "cmds"; renderCmds(); silent(idleText()); focusFirst(); };
  const idleText = () => {
    if (S.screen === "office") return L(SCRIPT.office.idle);
    if (S.screen === "case") return L(ITEM[S.caseId].flavor);
    if (S.screen === "about") return L(SCRIPT.about.place);
    if (S.screen === "contact") return L(SCRIPT.contact.place);
    if (S.screen === "garage") return "";
    return "";
  };

  /* ── hot spots ── */
  const spotsEl = $("#spots");
  const clearSpots = () => { spotsEl.textContent = ""; };
  const SCENE_W = 448, SCENE_H = 272;
  const addSpot = (rect, label, fn, cls) => {
    const b = el("button", "spot" + (cls ? " " + cls : ""), `<b>${esc(label)}</b>`);
    b.type = "button";
    b.setAttribute("aria-label", label);
    const [x, y, w, h] = rect;
    Object.assign(b.style, { left: x / SCENE_W * 100 + "%", top: y / SCENE_H * 100 + "%", width: w / SCENE_W * 100 + "%", height: h / SCENE_H * 100 + "%" });
    b.addEventListener("click", (e) => { e.stopPropagation(); fn(); });
    spotsEl.append(b);
    return b;
  };
  /* Hidden letters answer to a click in any mode; they are never outlined. */
  const eggSpot = (sceneName) => {
    const key = EGG_SCENES[sceneName], meta = ART.scenes[sceneName];
    if (!key || !meta.spots.egg || S.egg.has(key)) return;
    addSpot(meta.spots.egg, "?", () => {
      S.egg.add(key); persist(); SFX.egg(); renderBar();
      say([{ t: letterLine(key) }], () => { if (S.screen === "office") idle(); else idle(); paintSpots(); });
    }, "quiet");
  };
  const letterLine = (key) => {
    const ch = key[0];
    const got = EGG_ORDER.map((k) => (S.egg.has(k) ? k[0] : "_")).join(" ");
    return S.lang === "zh" ? `角落里有个粉色的小字母：${ch}。    ${got}` : `A small pink letter in the corner: ${ch}.    ${got}`;
  };
  let paintSpots = () => {};

  /* ── status bar ── */
  const renderBar = () => {
    let where = "";
    if (S.screen === "office") where = L(SCRIPT.office.place);
    if (S.screen === "about") where = L(SCRIPT.about.place);
    if (S.screen === "contact") where = L(SCRIPT.contact.place);
    if (S.screen === "garage") where = L(SCRIPT.garage.place);
    if (S.screen === "case") { const c = CASE[S.caseId]; where = `${c.time}  ${L(c.place)}`; }
    $("#where").textContent = where;
    const egg = S.egg.size ? "  " + EGG_ORDER.map((k) => (S.egg.has(k) ? k[0] : "·")).join("") : "";
    $("#tally").textContent = `${UI("closed")} ${S.closed.size}/${CASES.length}${egg}`;
  };

  /* ── sheet (a window over the picture) ── */
  const sheet = $("#sheet");
  const openSheet = (node) => { sheet.textContent = ""; sheet.append(node); sheet.hidden = false; stage.classList.add("sheeted"); $("#bust").classList.add("off"); clearSpots(); sheet.scrollTop = 0; };
  const closeSheet = () => { sheet.hidden = true; stage.classList.remove("sheeted"); };

  /* ── places ── */
  const go = async (screen, name) => { S.screen = screen; closeSheet(); clearSpots(); $("#stamp").hidden = true; await scene.show(name); renderBar(); };

  const office = async (opts = {}) => {
    S.caseId = null;
    await go("office", "office");
    setHash("");
    cmdSpec = () => {
      const list = [
        el("div", "hd", esc(L(SCRIPT.office.place))),
        verb("cases", () => caseList()),
        verb("about", () => about()),
        verb("contact", () => contact()),
        verb("look", () => say(L(SCRIPT.office.look))),
      ];
      if (EGG_ORDER.every((k) => S.egg.has(k))) list.push(verb("garage", () => garage()));
      return list;
    };
    const paint = () => {
      clearSpots();
      const s = ART.scenes.office.spots, T = SCRIPT.office.spots;
      addSpot(s.board, L(T.board), () => caseList(), "quiet");
      addSpot(s.files, L(T.files), () => caseList(), "quiet");
      addSpot(s.crt, L(T.crt), () => caseList(), "quiet");
      addSpot(s.cabinet, L(T.cabinet), () => about(), "quiet");
      addSpot(s.phone, L(T.phone), () => contact(), "quiet");
      addSpot(s.seal, L(T.seal), () => say(L(SCRIPT.office.seal)), "quiet");
      eggSpot("office");
    };
    paintSpots = paint;
    const after = () => { idle(); paint(); };
    if (opts.prologue) { S.seenPrologue = true; persist(); say(L(SCRIPT.prologue), after); return; }
    if (opts.list) { after(); caseList(opts.list); return; }
    if (S.closed.size === CASES.length && !S.endingSeen) { S.endingSeen = true; say(L(SCRIPT.ui.allClosed), after); return; }
    after();
  };

  const caseList = (tab) => {
    if (tab) S.tab = tab;
    const zones = ["ml", "aesthetic", "writing"];
    const wrap = el("div");
    wrap.append(el("div", "sheet-h", `<b>${esc(UI("cases"))}</b><span>${SCRIPT.zoneTag[S.tab]}</span>`));
    const tabs = el("div", "tabs");
    zones.forEach((z) => {
      const b = el("button", "", esc(SITE.zones[z].label[S.lang] || SITE.zones[z].label.en));
      b.type = "button"; b.setAttribute("aria-pressed", String(S.tab === z));
      b.addEventListener("click", () => { SFX.pick(); caseList(z); sheet.querySelector(`.tabs button[aria-pressed="true"]`)?.focus(); });
      tabs.append(b);
    });
    wrap.append(tabs);
    ITEMS.filter((i) => i.zone === S.tab).forEach((i) => {
      const done = S.closed.has(i.id);
      const r = el("button", "row", `<span class="no">${NUM[i.id]}</span><span>${esc(L(i.title))}</span><span class="st${done ? " done" : ""}">${esc(done ? UI("closed") : L(SITE.rarities[i.rarity].label))}</span>`);
      r.type = "button";
      r.addEventListener("click", () => { SFX.open(); openCase(i.id); });
      r.addEventListener("focus", () => silent(L(i.flavor)));
      r.addEventListener("mouseenter", () => silent(L(i.flavor)));
      r.addEventListener("mouseleave", () => silent(L(SITE.zones[S.tab].blurb)));
      wrap.append(r);
    });
    openSheet(wrap);
    S.mode = "sub";
    cmdSpec = () => [el("div", "hd", esc(UI("casesHint"))), cmdBtn(UI("back"), SCRIPT.ui.back.jp, () => { closeSheet(); office(); })];
    renderCmds();
    silent(L(SITE.zones[S.tab].blurb));
    const f = sheet.querySelector(".row");
    if (f && !tab && !stage.classList.contains("tall")) f.focus({ preventScroll: true });
    setHash(S.tab);
  };

  const openCase = async (id) => {
    const c = CASE[id], item = ITEM[id];
    S.caseId = id;
    await go("case", c.scene);
    setHash(id);
    const found = () => (S.found[id] = S.found[id] || []);
    const cmds = () => [
      el("div", "hd", `${esc(UI("case"))} ${NUM[id]}`),
      verb("look", look),
      verb("search", search),
      verb("ask", ask),
      verb("evidence", evidence),
      verb("leave", () => { office(); }),
    ];
    cmdSpec = cmds;
    const look = () => { closeSheet(); say([...L(c.open).map((t) => ({ t })), { who: "Rosana", face: "open", t: L(item.summary) }], () => { idle(); paint(); }); };
    const clueOf = (spot) => c.clues.find((k) => k.spot === spot);
    const examine = (spot) => {
      const k = clueOf(spot);
      const list = [{ t: L(k.line) }];
      if (k.did != null) list.push({ who: "Rosana", face: "half", t: L(item.did)[k.did] });
      const fresh = !found().includes(spot);
      if (fresh) { found().push(spot); persist(); SFX.found(); }
      say(list, () => {
        if (found().length >= c.clues.length && !S.closed.has(id)) return closeCase();
        search();
      });
    };
    const closeCase = () => {
      S.closed.add(id); persist(); renderBar();
      const st = $("#stamp"); st.textContent = UI("closedStamp"); st.hidden = false; SFX.stamp();
      cmdSpec = cmds;
      say([{ who: "Rosana", face: "smile", t: L(item.flavor) }], () => { st.hidden = true; idle(); paint(); });
    };
    const search = () => {
      closeSheet();
      S.mode = "sub";
      cmdSpec = () => [
        el("div", "hd", esc(UI("searchHint"))),
        ...c.clues.map((k) => cmdBtn(L(k.label), found().includes(k.spot) ? "✓" : "", () => examine(k.spot), found().includes(k.spot) ? "got" : "")),
        cmdBtn(UI("back"), SCRIPT.ui.back.jp, () => { cmdSpec = cmds; idle(); paint(); }),
      ];
      renderCmds();
      silent(UI("searchHint"));
      clearSpots();
      c.clues.forEach((k) => addSpot(ART.scenes[c.scene].spots[k.spot], L(k.label), () => { SFX.pick(); examine(k.spot); }, found().includes(k.spot) ? "found" : ""));
      eggSpot(c.scene);
      focusFirst();
    };
    const ask = () => {
      closeSheet();
      S.mode = "sub";
      const back = () => { ask(); };
      cmdSpec = () => [
        el("div", "hd", esc(UI("askHint"))),
        cmdBtn(UI("what"), "", () => say([{ who: "Rosana", face: "open", t: L(item.summary) }], back)),
        cmdBtn(UI("stack"), "", () => say([{ who: "Rosana", face: "half", t: item.stack.join(", ") + (S.lang === "zh" ? "。" : ".") }], back)),
        cmdBtn(UI("status"), "", () => say([{ who: "Rosana", face: "open", t: L(SCRIPT.status[item.rarity]) }], back)),
        cmdBtn(UI("back"), SCRIPT.ui.back.jp, () => { cmdSpec = cmds; idle(); paint(); }),
      ];
      renderCmds();
      silent(UI("askHint"));
      focusFirst();
    };
    const evidence = () => {
      const wrap = el("div", "exhibit");
      wrap.append(el("div", "sheet-h", `<b>${esc(UI("exhibitTitle"))} · ${esc(L(item.title))}</b><span>${esc(L(SITE.rarities[item.rarity].label))}</span>`));
      /* The exhibit itself is the link to the work, when the work has somewhere to go. */
      const main = item.links[0];
      const img = c.exhibit ? el("img", "exhibit-img") : null;
      if (img) { img.src = `assets/exhibits/${c.exhibit}.png`; img.alt = L(item.title); }
      else wrap.append(el("p", "", esc(L(item.summary))));
      if (main) {
        const a = el("a", "exhibit-link" + (img ? "" : " bare"));
        a.href = main.url; a.target = "_blank"; a.rel = "noopener";
        a.addEventListener("click", () => SFX.pick());
        if (img) a.append(img);
        a.append(el("span", "exhibit-go", `↗ ${esc(UI("openExhibit"))} ${esc(main.label)}`));
        wrap.append(a);
      } else {
        if (img) wrap.append(img);
        wrap.append(el("p", "sheet-note", esc(UI(img ? "noLink" : "noExhibit"))));
      }
      openSheet(wrap);
      S.mode = "sub";
      cmdSpec = () => [
        el("div", "hd", esc(UI("evidence"))),
        ...item.links.map((l) => linkCmd(l.label, l.url)),
        cmdBtn(UI("back"), SCRIPT.ui.back.jp, () => { closeSheet(); cmdSpec = cmds; idle(); paint(); }),
      ];
      renderCmds();
      silent(L(item.flavor));
      focusFirst();
    };
    const paint = () => { clearSpots(); eggSpot(c.scene); };
    paintSpots = paint;
    say([...L(c.open).map((t) => ({ t })), { who: "Rosana", face: "open", t: L(item.summary) }], () => { idle(); paint(); });
  };

  const about = async () => {
    S.caseId = null;
    await go("about", "dossier");
    setHash("about");
    const A = SITE.about, D = SCRIPT.about;
    const back = () => { idle(); paint(); };
    const also = () => {
      const wrap = el("div");
      wrap.append(el("div", "sheet-h", `<b>${esc(UI("other"))}</b>`));
      const list = el("div", "also");
      A.also.forEach((x) => {
        const row = el("div");
        const name = x.url ? `<a href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.name)} ↗</a>` : esc(x.name);
        row.innerHTML = `${name}<br><span>${esc(L(x.note))}</span>`;
        list.append(row);
      });
      wrap.append(list);
      openSheet(wrap);
      S.mode = "sub";
      cmdSpec = () => [
        el("div", "hd", esc(UI("other"))),
        linkCmd("GitHub", SITE.links.github),
        linkCmd("LinkedIn", SITE.links.linkedin),
        cmdBtn(UI("back"), SCRIPT.ui.back.jp, () => { closeSheet(); cmdSpec = main; idle(); paint(); }),
      ];
      renderCmds();
      silent(UI("other"));
      focusFirst();
    };
    const main = () => [
      el("div", "hd", esc(L(D.place))),
      verb("look", () => say([...L(D.open), { who: "Rosana", face: "open", t: L(A.body) }], back)),
      cmdBtn(UI("other"), "他", also),
      verb("leave", () => office()),
    ];
    cmdSpec = main;
    const paint = () => {
      clearSpots();
      const s = ART.scenes.dossier.spots;
      addSpot(s.redact, S.lang === "zh" ? "黑杠" : "Black bars", () => say(L(D.redact), back), "quiet");
      addSpot(s.photo, S.lang === "zh" ? "照片" : "Photo", () => say(L(D.photo), back), "quiet");
      addSpot(s.stamp, S.lang === "zh" ? "印章" : "Stamp", () => say(L(D.stamp), back), "quiet");
    };
    paintSpots = paint;
    say([...L(D.open), { who: "Rosana", face: "open", t: L(A.body) }], back);
  };

  const contact = async () => {
    S.caseId = null;
    await go("contact", "phone_booth");
    setHash("contact");
    const D = SCRIPT.contact;
    /* The address stays in the text box, so the booth stays in the picture. */
    const card = () => {
      S.mode = "sub";
      const copy = cmdBtn(UI("copy"), "", async () => {
        const t = copy.querySelector("span");
        try { await navigator.clipboard.writeText(SITE.links.email); t.textContent = UI("copied"); }
        catch { const r = document.createRange(); r.selectNodeContents(line); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }
      });
      cmdSpec = () => [
        el("div", "hd", esc(UI("contact"))),
        copy,
        linkCmd("Email", "mailto:" + SITE.links.email),
        linkCmd("GitHub", SITE.links.github),
        linkCmd("LinkedIn", SITE.links.linkedin),
        cmdBtn(UI("back"), SCRIPT.ui.back.jp, () => { cmdSpec = main; idle(); paint(); }),
      ];
      renderCmds();
      silent(SITE.links.email);
      focusFirst();
    };
    const main = () => [
      el("div", "hd", esc(L(D.place))),
      verb("contact", () => say(L(D.phone), card)),
      verb("leave", () => office()),
    ];
    cmdSpec = main;
    const paint = () => {
      clearSpots();
      const s = ART.scenes.phone_booth.spots;
      addSpot(s.phone, UI("contact"), () => say(L(D.phone), card), "quiet");
      addSpot(s.card, UI("contact"), card, "quiet");
      eggSpot("phone_booth");
    };
    paintSpots = paint;
    say(L(D.open), () => { idle(); paint(); });
  };

  const garage = async () => {
    await go("garage", "garage");
    const D = SCRIPT.garage;
    cmdSpec = () => [el("div", "hd", esc(L(D.place))), verb("leave", () => office())];
    let on = false;
    const flip = async () => { on = true; SFX.egg(); await scene.show("garage_on"); say(L(D.car), () => { idle(); paint(); }); };
    const paint = () => { clearSpots(); if (!on) addSpot(ART.scenes.garage.spots.car, S.lang === "zh" ? "红色小车" : "The red car", flip); };
    paintSpots = paint;
    say(L(D.open), () => { idle(); paint(); });
  };

  /* ── title ── */
  const showFront = () => { $("#front").hidden = false; coverSel = 0; optionsOpen = false; renderMenu(); };
  /* The buttons sit over the picture's own: hovering or focusing one moves its painted highlight. */
  let coverSel = 0, optionsOpen = false;
  const renderMenu = () => {
    const m = $("#menu"); m.textContent = "";
    const hasSave = S.seenPrologue || S.closed.size > 0;
    const enter = (fn) => () => { $("#front").hidden = true; fn(); };
    const setOptions = (on) => { optionsOpen = on; renderMenu(); };
    const items = [
      cmdBtn(L(SCRIPT.menu.begin), "開始", enter(() => office({ prologue: true })), "m0"),
      cmdBtn(L(SCRIPT.menu.resume), "再開", enter(() => office()), "m1" + (hasSave ? "" : " off")),
      cmdBtn(L(SCRIPT.menu.index), "目次", enter(() => office({ list: "ml" })), "m2"),
      cmdBtn(L(SCRIPT.menu.options), "設定", () => setOptions(true), "m3"),
    ];
    items[1].disabled = !hasSave;
    const select = (i) => { coverSel = i; m.dataset.sel = i; };
    items.forEach((b, i) => { b.addEventListener("mouseenter", () => { if (!b.disabled) select(i); }); b.addEventListener("focus", () => select(i)); });
    select(coverSel);
    const foot = el("div", "foot");
    const back = el("button", "back", L(SCRIPT.menu.back)); back.type = "button"; back.addEventListener("click", () => setOptions(false));
    foot.append(btnLang(), btnSound(), btnCrt(), back);
    m.classList.toggle("opts", optionsOpen);
    m.append(...items, foot);
    if ($("#front").classList.contains("phone")) return;
    (optionsOpen ? foot.firstChild : items[coverSel]).focus({ preventScroll: true });
  };
  const btnLang = () => { const b = el("button", "", S.lang === "zh" ? "EN" : "中文"); b.type = "button"; b.setAttribute("aria-label", "Language"); b.addEventListener("click", () => { S.lang = S.lang === "zh" ? "en" : "zh"; persist(); relabel(); }); return b; };
  const btnSound = () => { const b = el("button", "", `♪ ${UI("sound")} ${S.sound ? UI("on") : UI("off")}`); b.type = "button"; b.addEventListener("click", () => { S.sound = !S.sound; if (S.sound) { startBgm(); SFX.open(); } else stopBgm(); relabel(); }); return b; };
  const btnCrt = () => { const b = el("button", "", `${UI("crt")} ${S.crt ? UI("on") : UI("off")}`); b.type = "button"; b.addEventListener("click", () => { S.crt = !S.crt; stage.classList.toggle("scan", S.crt); persist(); relabel(); }); return b; };
  const goFront = () => {
    clearTimeout(Q.timer);
    Q.list = []; Q.cur = null; Q.done = null;
    S.mode = "cmds"; bust.talk = false; more.hidden = true; who.hidden = true;
    closeSheet(); clearSpots(); $("#bust").classList.add("off");
    setHash(""); persist();
    SFX.pick();
    showFront();
  };
  const renderSys = () => {
    const y = $("#sys"); y.textContent = "";
    const home = el("button", "", UI("title")); home.type = "button"; home.addEventListener("click", goFront);
    const lang = btnLang(), snd = el("button", "", S.sound ? "♪" : "♪×");
    snd.type = "button"; snd.setAttribute("aria-label", UI("sound"));
    snd.addEventListener("click", () => { S.sound = !S.sound; if (S.sound) { startBgm(); SFX.open(); } else stopBgm(); renderSys(); });
    y.append(home, lang, snd);
  };
  const relabel = () => {
    document.documentElement.lang = S.lang === "zh" ? "zh-CN" : "en";
    renderBar(); renderSys();
    if (!$("#front").hidden) { renderMenu(); return; }
    if (S.mode === "cmds") { idle(); paintSpots(); return; }
    renderCmds();
    if (!sheet.hidden && sheet.querySelector(".tabs")) caseList(S.tab);
  };

  /* ── boot: a memory count, for anyone who misses it ── */
  const boot = () => new Promise((res) => {
    const b = $("#boot");
    if (REDUCED) return res();
    b.hidden = false;
    const lines = ["RAN-98 BIOS  v1.0", "", "Memory check   640 KB OK", "Extended       ", "Video          640x400  16 colours", "Sound          FM 2-op", "", "A:\\> CASES.EXE"];
    let n = 0, mem = 0, t = 0, closed = false;
    const finish = () => { if (closed) return; closed = true; clearTimeout(t); b.hidden = true; b.removeEventListener("click", finish); removeEventListener("keydown", finish); res(); };
    b.addEventListener("click", finish); addEventListener("keydown", finish);
    const step = () => {
      if (closed) return;
      if (n === 3 && mem < 16384) { mem += 2048; b.textContent = lines.slice(0, 3).join("\n") + "\n" + lines[3] + mem + " KB"; t = setTimeout(step, 28); return; }
      if (n === 3) { lines[3] = lines[3] + mem + " KB OK"; }
      n += 1;
      b.textContent = lines.slice(0, n).join("\n");
      if (n >= lines.length) { t = setTimeout(finish, 420); return; }
      t = setTimeout(step, n < 3 ? 90 : 170);
    };
    step();
  });

  /* ── keyboard ── */
  addEventListener("keydown", (e) => {
    const k = e.key;
    if (S.mode === "text" && (k === "Enter" || k === " ")) { e.preventDefault(); advance(); return; }
    if (k === "Escape" && !$("#front").hidden && optionsOpen) { optionsOpen = false; renderMenu(); return; }
    if (k === "Escape" && !sheet.hidden) { const b = [...cmdsEl.querySelectorAll("button.cmd")].pop(); b && b.click(); return; }
    if (k === "ArrowDown" || k === "ArrowUp") {
      const scope = !sheet.hidden && sheet.querySelector(".row") ? sheet : $("#front").hidden ? cmdsEl : $("#menu");
      const list = [...scope.querySelectorAll("button.row, .cmd")].filter((b) => !b.disabled && b.offsetParent !== null);
      if (!list.length) return;
      e.preventDefault();
      const i = list.indexOf(document.activeElement);
      const n = i < 0 ? 0 : (i + (k === "ArrowDown" ? 1 : -1) + list.length) % list.length;
      list[n].focus();
    }
  });

  /* ── routing ── */
  let quietHash = false;
  const setHash = (h) => { if (!$("#front").hidden) h = ""; quietHash = true; try { history.replaceState(null, "", h ? "#" + h : location.pathname); } catch { /* sandboxed */ } quietHash = false; };
  const route = (h) => {
    if (CASE[h]) { $("#front").hidden = true; S.seenPrologue = true; openCase(h); return true; }
    if (["ml", "aesthetic", "writing"].includes(h)) { $("#front").hidden = true; office({ list: h }); return true; }
    if (h === "work") { $("#front").hidden = true; office({ list: "ml" }); return true; }
    if (h === "about") { $("#front").hidden = true; about(); return true; }
    if (h === "contact") { $("#front").hidden = true; contact(); return true; }
    return false;
  };
  addEventListener("hashchange", () => { if (!quietHash) route(location.hash.slice(1)); });

  /* ── start ── */
  (async () => {
    document.documentElement.lang = S.lang === "zh" ? "zh-CN" : "en";
    stage.classList.toggle("scan", S.crt);
    renderSys();
    try { sheetImg = await loadImg("assets/rosana.png"); } catch { sheetImg = null; }
    bust.setFace("open");
    $("#bust").classList.add("off");
    setInterval(loop, 83);
    if (document.fonts && document.fonts.load) { try { await Promise.race([document.fonts.load('16px "DotGothic16"', "案件"), new Promise((r) => setTimeout(r, 1200))]); } catch { /* fine */ } }
    const hash = location.hash.slice(1);
    if (hash && route(hash)) return;
    showFront();
    await boot();
    renderMenu();
  })();

  /* for the test harness and the curious */
  window.__ran98 = { S, say, advance, openCase, office, about, contact, caseList, garage };
})();
