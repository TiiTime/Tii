(() => {
  const COPY = {
    de: {
      title: "Tii — BraveSaver, Glossa & TikTube",
      desc: "BraveSaver parkt tote Tabs. Glossa übersetzt per Hover. TikTube spielt YouTube Shorts und TikTok in einem Fenster. Von Tii.",
      skip: "Zum Inhalt",
      heroLine1: "Zwei Extensions.",
      heroLine2: "Ein Fenster für Shorts.",
      lede: "BraveSaver parkt tote Tabs. Glossa übersetzt, sobald die Maus stehen bleibt. TikTube hält YouTube Shorts und TikTok in einem kleinen Fenster.",
      bsPitch: "Parks inaktive Tabs. Der Tab bleibt in der Leiste — der Prozess ist weg. Klick lädt neu.",
      bsFact1: "Auto-Park nach Inaktivität, härter wenn RAM knapp ist",
      bsFact2: "Formulare, Pins und Ton-Tabs bleiben wach",
      bsFact3: "Stumme Hintergrund-Videos und Animationen werden gedrosselt",
      bsRamAria: "RAM-Vergleich vergrößern",
      bsRamAlt: "Task-Manager-Vergleich: ohne BraveSaver 3,7 GB, mit BraveSaver 2,2 GB RAM",
      bsPopupAria: "Popup-Screenshot vergrößern",
      bsPopupAlt: "BraveSaver Popup: geparkte Tabs, Last und Park-Modi",
      glPitch: "Maus eine Sekunde auf ein Wort — Übersetzung im Popup. Text markieren geht sofort.",
      glFact1: "Zielsprache oben, Original unten — Maus weg, Popup weg",
      glFact2: "80+ Sprachen, Shadow-DOM (Seiten-CSS kann es nicht zerlegen)",
      glFact3: "Kein eigener Server",
      glHoverAria: "Hover-Screenshot vergrößern",
      glHoverAlt: "Glossa Hover-Popup: Wort anhoveren, deutsche Übersetzung erscheint",
      glSelectAria: "Markierungs-Screenshot vergrößern",
      glSelectAlt: "Glossa: markierter Satz wird vollständig übersetzt",
      ttAsk: "Du willst Doomscrollen?",
      ttPitch: "Ein kleines Windows-Fenster für YouTube Shorts und TikTok. Rad nach unten: nächstes Video. Rad nach oben: zurück.",
      ttFact1: "YouTube als Shorts, TikTok als normale Seite",
      ttFact2: "Fenster bleibt groß genug, damit die Videos starten",
      ttFact3: "Keine fremden Videos werden heruntergeladen",
      ttYtAria: "YouTube-Ansicht vergrößern",
      ttYtAlt: "TikTube-Fenster mit einem YouTube-Short",
      ttTtAria: "TikTok-Ansicht vergrößern",
      ttTtAlt: "TikTube auf TikTok, ohne App-Aufforderung",
      footerMeta: "kostenlos · MIT",
      lightboxAria: "Bildansicht",
      closeAria: "Schließen",
      fxAria: "Animierten Hintergrund umschalten",
      fxOn: "FX an",
      fxOff: "FX aus",
      langGroup: "Sprache",
    },
    en: {
      title: "Tii — BraveSaver, Glossa & TikTube",
      desc: "BraveSaver parks idle tabs. Glossa translates on hover. TikTube plays YouTube Shorts and TikTok in one window. By Tii.",
      skip: "Skip to content",
      heroLine1: "Two extensions.",
      heroLine2: "A window for shorts.",
      lede: "BraveSaver parks idle tabs. Glossa translates when the mouse rests. TikTube keeps YouTube Shorts and TikTok in one small window.",
      bsPitch: "Parks idle tabs. The tab stays in the strip — the process is gone. Click to reload.",
      bsFact1: "Auto-park after idle time, sooner when RAM is tight",
      bsFact2: "Forms, pins, and audible tabs stay awake",
      bsFact3: "Muted background video and animations get throttled",
      bsRamAria: "Enlarge RAM comparison",
      bsRamAlt: "Task Manager comparison: 3.7 GB without BraveSaver, 2.2 GB with BraveSaver",
      bsPopupAria: "Enlarge popup screenshot",
      bsPopupAlt: "BraveSaver popup: parked tabs, load, and park modes",
      glPitch: "Hover a word for one second — translation in a popup. Selecting text is instant.",
      glFact1: "Target language on top, original below — mouse away, popup gone",
      glFact2: "80+ languages, Shadow DOM (page CSS cannot break it)",
      glFact3: "No separate server",
      glHoverAria: "Enlarge hover screenshot",
      glHoverAlt: "Glossa hover popup: hover a word, German translation appears",
      glSelectAria: "Enlarge selection screenshot",
      glSelectAlt: "Glossa: selected sentence is fully translated",
      ttAsk: "Want to doomscroll?",
      ttPitch: "A small Windows window for YouTube Shorts and TikTok. Wheel down: next video. Wheel up: back.",
      ttFact1: "YouTube as Shorts, TikTok as the normal site",
      ttFact2: "The window stays large enough for videos to start",
      ttFact3: "No downloading of other people's videos",
      ttYtAria: "Enlarge YouTube view",
      ttYtAlt: "TikTube window showing a YouTube Short",
      ttTtAria: "Enlarge TikTok view",
      ttTtAlt: "TikTube on TikTok, without an app prompt",
      footerMeta: "free · MIT",
      lightboxAria: "Image view",
      closeAria: "Close",
      fxAria: "Toggle animated background",
      fxOn: "FX on",
      fxOff: "FX off",
      langGroup: "Language",
    },
  };

  const meta = document.querySelector('meta[name="description"]');

  function readLang() {
    const q = new URLSearchParams(window.location.search).get("lang");
    if (q === "en" || q === "de") return q;
    const saved = localStorage.getItem("tii-lang");
    if (saved === "en" || saved === "de") return saved;
    return "de";
  }

  function apply(lang) {
    const pack = COPY[lang] || COPY.de;
    document.documentElement.lang = lang;
    document.title = pack.title;
    if (meta) meta.setAttribute("content", pack.desc);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (pack[key]) el.textContent = pack[key];
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      if (pack[key]) el.setAttribute("aria-label", pack[key]);
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      const key = el.getAttribute("data-i18n-alt");
      if (pack[key]) el.setAttribute("alt", pack[key]);
    });

    document.querySelectorAll("[data-set-lang]").forEach((btn) => {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-set-lang") === lang ? "true" : "false");
    });

    window.TiiI18n = { lang, t: pack };
    document.dispatchEvent(new CustomEvent("tii-lang", { detail: { lang, t: pack } }));
  }

  function setLang(lang) {
    const next = lang === "en" ? "en" : "de";
    localStorage.setItem("tii-lang", next);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    history.replaceState(null, "", url);
    apply(next);
  }

  document.querySelectorAll("[data-set-lang]").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.getAttribute("data-set-lang")));
  });

  apply(readLang());
  const url = new URL(window.location.href);
  if (!url.searchParams.get("lang")) {
    url.searchParams.set("lang", document.documentElement.lang);
    history.replaceState(null, "", url);
  }
})();
