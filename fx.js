(() => {
  const canvas = document.getElementById("fx");
  const ctx = canvas.getContext("2d", { alpha: true });
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let w = 0;
  let h = 0;
  let dpr = 1;
  const rain = [];
  let t = 0;
  let running = !reduce;
  let raf = 0;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seedRain();
  }

  function seedRain() {
    const count = reduce ? 18 : Math.min(90, Math.floor(w / 18));
    rain.length = 0;
    for (let i = 0; i < count; i += 1) {
      rain.push({
        x: Math.random() * w,
        y: Math.random() * h,
        z: 0.35 + Math.random() * 0.9,
        hue: Math.random() > 0.72 ? "amber" : "cyan",
      });
    }
  }

  function grid() {
    const vanishX = w * 0.5;
    const horizon = h * 0.42;
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, horizon, w, h - horizon);
    ctx.clip();

    ctx.strokeStyle = "rgba(62, 240, 232, 0.08)";
    ctx.lineWidth = 1;

    const rows = 18;
    for (let i = 1; i <= rows; i += 1) {
      const p = i / rows;
      const y = horizon + (h - horizon) * (p * p);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const cols = 16;
    for (let i = -cols; i <= cols; i += 1) {
      const edge = vanishX + i * (w / cols) * 1.6;
      ctx.beginPath();
      ctx.moveTo(vanishX, horizon);
      ctx.lineTo(edge, h + 40);
      ctx.stroke();
    }
    ctx.restore();

    ctx.strokeStyle = "rgba(224, 138, 60, 0.18)";
    ctx.beginPath();
    ctx.moveTo(0, horizon);
    ctx.lineTo(w, horizon);
    ctx.stroke();
  }

  function drawRain() {
    rain.forEach((drop) => {
      const len = 10 + drop.z * 18;
      ctx.strokeStyle = drop.hue === "amber"
        ? `rgba(224, 138, 60, ${0.12 + drop.z * 0.22})`
        : `rgba(62, 240, 232, ${0.1 + drop.z * 0.2})`;
      ctx.lineWidth = drop.z * 1.1;
      ctx.beginPath();
      ctx.moveTo(drop.x, drop.y);
      ctx.lineTo(drop.x, drop.y + len);
      ctx.stroke();

      if (!reduce) {
        drop.y += 1.4 + drop.z * 3.2;
        if (drop.y > h + 20) {
          drop.y = -20;
          drop.x = Math.random() * w;
        }
      }
    });
  }

  function frame() {
    ctx.clearRect(0, 0, w, h);

    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#090814");
    g.addColorStop(0.45, "#07060f");
    g.addColorStop(1, "#05040b");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = "rgba(224, 138, 60, 0.045)";
    ctx.beginPath();
    ctx.arc(w * 0.18, h * 0.16, 180, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(62, 240, 232, 0.04)";
    ctx.beginPath();
    ctx.arc(w * 0.84, h * 0.2, 200, 0, Math.PI * 2);
    ctx.fill();

    grid();
    drawRain();

    if (running) {
      t += 1;
      const scanY = ((t * 0.7) % (h + 80)) - 40;
      ctx.fillStyle = "rgba(62, 240, 232, 0.035)";
      ctx.fillRect(0, scanY, w, 18);
      raf = requestAnimationFrame(frame);
    }
  }

  const toggle = document.getElementById("fx-toggle");
  function setFxLabel() {
    const pack = (window.TiiI18n && window.TiiI18n.t) || {};
    toggle.setAttribute("aria-pressed", running ? "true" : "false");
    toggle.textContent = running ? (pack.fxOn || "FX an") : (pack.fxOff || "FX aus");
    if (pack.fxAria) toggle.setAttribute("aria-label", pack.fxAria);
  }

  function setFx(on) {
    running = on && !reduce;
    setFxLabel();
    if (running) {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    } else {
      cancelAnimationFrame(raf);
      frame();
    }
  }
  toggle.addEventListener("click", () => setFx(!running));
  document.addEventListener("tii-lang", setFxLabel);
  if (reduce) setFx(false);

  window.addEventListener("resize", () => {
    resize();
    if (reduce) frame();
  });

  resize();
  frame();

  const dialog = document.getElementById("lightbox");
  const dialogImg = dialog.querySelector("img");
  const closeBtn = dialog.querySelector(".lightbox-close");

  document.querySelectorAll(".shot").forEach((btn) => {
    btn.addEventListener("click", () => {
      dialogImg.src = btn.dataset.full;
      dialogImg.alt = btn.querySelector("img").alt;
      dialog.showModal();
    });
  });

  closeBtn.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
})();
