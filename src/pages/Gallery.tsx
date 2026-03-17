import React, { useState, useEffect, useRef } from "react";

const images = [
  "/Images/img1.jpg", "/Images/img2.jpg", "/Images/img4.jpg",
  "/Images/img5.jpg", "/Images/img8.jpg", "/Images/img6.jpg",
  "/Images/img3.jpg", "/Images/img7.jpg", "/Images/img9.jpg",
  "/Images/img1.jpg", "/Images/img4.jpg", "/Images/img6.jpg",
  "/Images/img2.jpg", "/Images/img5.jpg", "/Images/img8.jpg",
  "/Images/img3.jpg", "/Images/img7.jpg", "/Images/img9.jpg",
  "/Images/img1.jpg", "/Images/img6.jpg", "/Images/img2.jpg",
  "/Images/img4.jpg", "/Images/img5.jpg", "/Images/img8.jpg",
];

const labels = [
  "Wedding Day",    "First Look",       "Bridal Portraits", "Golden Hour",
  "Ceremony",       "Reception",        "Candid Moments",   "Love Story",
  "Details",        "Vows",             "Family",           "The Couple",
  "Getting Ready",  "Sunset Kiss",      "Celebration",      "Emotions",
  "Together",       "Laughter",         "Rings",            "Dancing",
  "Night Lights",   "Forever",          "Bliss",            "Joy",
];

const col1 = [0, 3, 6, 9, 12, 15, 18, 21].map(i => images[i]);
const col2 = [1, 4, 7, 10, 13, 16, 19, 22].map(i => images[i]);
const col3 = [2, 5, 8, 11, 14, 17, 20, 23].map(i => images[i]);

const ViewPhotosPage = () => {
  const [lightbox, setLightbox]       = useState<number | null>(null);
  const [visible, setVisible]         = useState<Set<number>>(new Set());
  const [heroVisible, setHeroVisible] = useState(false);
  const [lbAnim, setLbAnim]           = useState(false);
  const [filter, setFilter]           = useState("All");
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filters = [ "Wedding", "Candid", "Portraits","Modaling","Baby-Shoot"];

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.index);
            setVisible((prev) => new Set([...prev, idx]));
          }
        });
      },
      { threshold: 0.08 }
    );
    itemRefs.current.forEach((r) => r && observer.observe(r));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")     setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((p) => p !== null ? (p + 1) % images.length : null);
      if (e.key === "ArrowLeft")  setLightbox((p) => p !== null ? (p - 1 + images.length) % images.length : null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  const openLightbox = (i: number) => {
    setLightbox(i);
    setLbAnim(true);
    setTimeout(() => setLbAnim(false), 400);
  };

  const navLightbox = (dir: 1 | -1, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLbAnim(true);
    setTimeout(() => {
      setLightbox((p) => p !== null ? (p + dir + images.length) % images.length : null);
      setLbAnim(false);
    }, 180);
  };

  return (
    <div className="vp-root">

      {/* ══ HERO: SPLIT LAYOUT — UNCHANGED ══ */}
      <section className={`vp-hero ${heroVisible ? "vp-hero--visible" : ""}`}>

        <div className="vp-hero-left">
          <div className="vp-studio-line">
            <span className="vp-sl-tick" />
            <span className="vp-sl-text">EAGLE-VIEW PHOTOGRAPHY</span>
            <span className="vp-sl-year">EST. 2013</span>
          </div>

          <div className="vp-title-block">
            <h1 className="vp-title-main">
              <span className="vp-tm-our">Our</span>
              <span className="vp-tm-gallery">Gallery</span>
            </h1>
            <span className="vp-title-accent">✦ Collection</span>
          </div>

          <blockquote className="vp-quote">
            <span className="vp-quote-mark">"</span>
            <p>Every frame tells a story.<br />Every moment, preserved forever.</p>
          </blockquote>

          <div className="vp-stats-wrap">
            <div className="vp-stats-rule" />
            <div className="vp-stats-row">
              {[
                { num: "500+", label: "Love Stories", sub: "documented"  },
                { num: "12",   label: "Years",         sub: "of crafting" },
                { num: "∞",    label: "Memories",      sub: "made"        },
              ].map(({ num, label, sub }) => (
                <div key={label} className="vp-stat">
                  <span className="vp-stat-num">{num}</span>
                  <div className="vp-stat-copy">
                    <span className="vp-stat-label">{label}</span>
                    <span className="vp-stat-sub">{sub}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="vp-stats-rule" />
          </div>

          <button
            className="vp-cta"
            onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
          >
            <div className="vp-cta-left">
              <span className="vp-cta-label">Explore Collection</span>
              <span className="vp-cta-sub">24 curated photographs</span>
            </div>
            <div className="vp-cta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>

          <div className="vp-page-index">
            <span className="vp-pi-num">01</span>
            <span className="vp-pi-sep" />
            <span className="vp-pi-label">GALLERY</span>
          </div>
        </div>

        <div className="vp-hero-right">
          <div className="vp-strips">
            <div className="vp-strip vp-strip--up">
              <div className="vp-strip-inner">
                {[...col1, ...col1].map((src, i) => (
                  <div key={i} className="vp-strip-card">
                    <img src={src} alt="" />
                    <div className="vp-strip-shimmer" />
                  </div>
                ))}
              </div>
            </div>
            <div className="vp-strip vp-strip--down">
              <div className="vp-strip-inner">
                {[...col2, ...col2].map((src, i) => (
                  <div key={i} className="vp-strip-card">
                    <img src={src} alt="" />
                    <div className="vp-strip-shimmer" />
                  </div>
                ))}
              </div>
            </div>
            <div className="vp-strip vp-strip--up-slow">
              <div className="vp-strip-inner">
                {[...col3, ...col3].map((src, i) => (
                  <div key={i} className="vp-strip-card">
                    <img src={src} alt="" />
                    <div className="vp-strip-shimmer" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="vp-fade-top" />
          <div className="vp-fade-bottom" />
          <div className="vp-strips-label">WEDDING PHOTOGRAPHY</div>
        </div>

        <div className="vp-split-line" />
      </section>

      {/* ══ MARQUEE TICKER ══ */}
      <div className="vp-ticker">
        <div className="vp-ticker-track">
          {Array(6).fill(null).map((_, i) => (
            <React.Fragment key={i}>
              <span>WEDDING DAY</span>
              <span className="vp-tick-gem">✦</span>
              <span>GOLDEN HOUR</span>
              <span className="vp-tick-gem">◆</span>
              <span>CANDID MOMENTS</span>
              <span className="vp-tick-gem">✦</span>
              <span>LOVE STORIES</span>
              <span className="vp-tick-gem">◆</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ══ GALLERY SECTION — REDESIGNED ══ */}
      <section id="gallery" className="vp-gallery">

        {/* Header */}
        <div className="vp-gallery-header">
          <div className="vp-gallery-header-left">
            <span className="vp-gallery-eyebrow">THE COLLECTION</span>
            <h2 className="vp-gallery-title">Moments <em>Frozen</em> in Time</h2>
          </div>
          {/* <div className="vp-gallery-header-right">
            <p className="vp-gallery-desc">
              A curated selection of our finest work — every image a doorway back to the day.
            </p>
            <div className="vp-gallery-count">
              {String(images.length).padStart(2, "0")} <span>IMAGES</span>
            </div>
          </div> */}
        </div>

        {/* Filter tabs */}
        <div className="vp-filters">
          {filters.map((f) => (
            <button
              key={f}
              className={`vp-filter-btn ${filter === f ? "vp-filter-btn--active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
              {filter === f && <span className="vp-filter-bar" />}
            </button>
          ))}
        </div>

        {/* ── EQUAL GRID ── */}
        <div className="vp-grid">
          {images.map((img, i) => (
            <div
              key={i}
              data-index={i}
              ref={(el) => { itemRefs.current[i] = el; }}
              className={`vp-card ${visible.has(i) ? "vp-card--visible" : ""}`}
              style={{ animationDelay: `${(i % 6) * 0.07}s` }}
              onClick={() => openLightbox(i)}
            >
              {/* Image */}
              <div className="vp-card-img-wrap">
                <img src={img} alt={labels[i]} className="vp-card-img" />

                {/* Shimmer on load */}
                <div className="vp-card-shimmer" />

                {/* Hover overlay */}
                <div className="vp-card-overlay">
                  {/* Top-left number */}
                  {/* <span className="vp-card-num">{String(i + 1).padStart(2, "0")}</span> */}

                  {/* Center content */}
                  <div className="vp-card-center">
                    <div className="vp-card-view-ring">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <circle cx="11" cy="11" r="7" />
                        <path d="M21 21l-3.5-3.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span className="vp-card-view-text">VIEW</span>
                  </div>

                  {/* Bottom caption */}
                  <div className="vp-card-caption">
                    <div className="vp-card-caption-line" />
                    <span className="vp-card-label">{labels[i]}</span>
                  </div>
                </div>

                {/* Corner accents — only TL and BR */}
                <span className="vp-corner vp-corner--tl" />
                <span className="vp-corner vp-corner--br" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ LIGHTBOX ══ */}
      {lightbox !== null && (
        <div className="vp-lightbox" onClick={() => setLightbox(null)}>
          <button className="vp-lb-close" onClick={() => setLightbox(null)}>
            <span className="vp-lb-close-line" />
            <span className="vp-lb-close-line" />
          </button>

          <div className="vp-lb-topbar">
            <span className="vp-lb-top-label">{labels[lightbox]}</span>
            <span className="vp-lb-top-count">
              {String(lightbox + 1).padStart(2, "0")}
              <span className="vp-lb-top-sep"> / </span>
              {String(images.length).padStart(2, "0")}
            </span>
          </div>

          <button className="vp-lb-nav vp-lb-prev" onClick={(e) => navLightbox(-1, e)}>
            <span>‹</span>
          </button>

          <div
            className={`vp-lb-frame ${lbAnim ? "vp-lb-frame--anim" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="vp-lb-img-wrap">
              <img src={images[lightbox]} alt={labels[lightbox]} className="vp-lb-img" />
              <span className="vp-lb-corner vp-lb-tl" />
              <span className="vp-lb-corner vp-lb-tr" />
              <span className="vp-lb-corner vp-lb-bl" />
              <span className="vp-lb-corner vp-lb-br" />
            </div>
            <div className="vp-lb-caption">
              <div className="vp-lb-cap-left">
                <span className="vp-lb-num">{String((lightbox % 9) + 1).padStart(2, "0")}</span>
                <div className="vp-lb-cap-divider" />
                <div className="vp-lb-cap-info">
                  <span className="vp-lb-label">{labels[lightbox]}</span>
                  <span className="vp-lb-sub">Eagle View Photography</span>
                </div>
              </div>
              <div className="vp-lb-dots">
                {images.map((_, di) => (
                  <button
                    key={di}
                    className={`vp-lb-dot ${di === lightbox ? "vp-lb-dot--active" : ""}`}
                    onClick={(e) => { e.stopPropagation(); openLightbox(di); }}
                  />
                ))}
              </div>
            </div>
          </div>

          <button className="vp-lb-nav vp-lb-next" onClick={(e) => navLightbox(1, e)}>
            <span>›</span>
          </button>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --gold:        #C9A84C;
          --gold-light:  #E8C96A;
          --gold-glow:   rgba(201,168,76,0.5);
          --gold-border: rgba(201,168,76,0.25);
          --bg:          #080604;
          --bg-card:     #0f0d0a;
          --text:        #f0ebe2;
          --muted:       rgba(240,235,226,0.45);
        }

        .vp-root {
          background: var(--bg);
          min-height: 100vh;
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
        }

        /* ══════════════ HERO (UNCHANGED) ══════════════ */
        .vp-hero {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transition: opacity 0.8s ease;
        }
        .vp-hero--visible { opacity: 1; }

        .vp-hero-left {
          display: flex; flex-direction: column; justify-content: center;
          padding: 7rem 5rem 7rem 6rem;
          position: relative; z-index: 2;
          animation: slideInLeft 1s cubic-bezier(0.16,1,0.3,1) 0.2s both;
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .vp-studio-line {
          display: flex; align-items: center; gap: 0.9rem; margin-bottom: 3rem;
        }
        .vp-sl-tick {
          display: block; width: 28px; height: 1px;
          background: var(--gold); box-shadow: 0 0 8px var(--gold-glow); flex-shrink: 0;
        }
        .vp-sl-text { font-size: 0.52rem; letter-spacing: 0.5em; color: var(--gold); font-weight: 600; }
        .vp-sl-year { margin-left: auto; font-size: 0.52rem; letter-spacing: 0.3em; color: rgba(240,235,226,0.2); }

        .vp-title-block { position: relative; margin-bottom: 2.8rem; }
        .vp-title-main  { display: flex; flex-direction: column; line-height: 0.92; }
        .vp-tm-our {
          font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 300;
          font-size: clamp(2rem, 4.5vw, 3.5rem); color: rgba(240,235,226,0.35);
          letter-spacing: 0.12em; padding-left: 0.15em;
        }
        .vp-tm-gallery {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(5.5rem, 10.5vw, 10rem); color: var(--text);
          letter-spacing: 0.03em; line-height: 0.88;
        }
        .vp-title-accent {
          position: absolute; bottom: -1.6rem; right: 0;
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: 0.85rem; color: var(--gold); letter-spacing: 0.18em; opacity: 0.65;
        }

        .vp-quote {
          position: relative; padding: 0 0 0 1.6rem; margin-bottom: 3rem;
          border-left: 1px solid rgba(201,168,76,0.25);
        }
        .vp-quote-mark {
          position: absolute; top: -1.8rem; left: 1rem;
          font-family: 'Cormorant Garamond', serif; font-size: 5rem;
          color: rgba(201,168,76,0.08); line-height: 1; pointer-events: none;
        }
        .vp-quote p {
          font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 300;
          font-size: clamp(1rem, 1.6vw, 1.2rem); line-height: 1.85;
          color: rgba(240,235,226,0.5); position: relative; z-index: 1;
        }

        .vp-stats-wrap { margin-bottom: 3rem; }
        .vp-stats-rule { height: 1px; background: linear-gradient(90deg, rgba(201,168,76,0.2), transparent); }
        .vp-stats-row  { display: flex; gap: 0; padding: 1.4rem 0; }
        .vp-stat {
          flex: 1; display: flex; align-items: center; gap: 0.7rem;
          padding-right: 1.5rem; border-right: 1px solid rgba(201,168,76,0.1); margin-right: 1.5rem;
        }
        .vp-stat:last-child { border-right: none; margin-right: 0; padding-right: 0; }
        .vp-stat-num { font-family: 'Bebas Neue', sans-serif; font-size: 2.4rem; color: var(--gold); letter-spacing: 0.03em; line-height: 1; flex-shrink: 0; }
        .vp-stat-copy { display: flex; flex-direction: column; gap: 0.1rem; }
        .vp-stat-label { font-size: 0.72rem; font-weight: 500; color: var(--text); letter-spacing: 0.05em; line-height: 1; }
        .vp-stat-sub   { font-size: 0.58rem; letter-spacing: 0.12em; color: var(--muted); }

        .vp-cta {
          position: relative; display: flex; align-items: center; justify-content: space-between;
          width: 100%; padding: 1.2rem 1.5rem;
          border: 1px solid rgba(201,168,76,0.25); background: transparent; color: var(--text);
          cursor: pointer; overflow: hidden;
          transition: border-color 0.4s ease, color 0.4s ease; margin-bottom: 3rem;
        }
        .vp-cta::before {
          content: ''; position: absolute; inset: 0; background: var(--gold);
          transform: translateX(-101%); transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); z-index: 0;
        }
        .vp-cta:hover::before { transform: translateX(0); }
        .vp-cta:hover { border-color: var(--gold); color: #080604; }
        .vp-cta-left { display: flex; flex-direction: column; gap: 0.25rem; position: relative; z-index: 1; text-align: left; }
        .vp-cta-label { font-size: 0.8rem; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; }
        .vp-cta-sub   { font-size: 0.58rem; letter-spacing: 0.15em; opacity: 0.55; }
        .vp-cta-icon {
          position: relative; z-index: 1;
          width: 40px; height: 40px; border: 1px solid currentColor; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          opacity: 0.7; transition: all 0.35s ease; flex-shrink: 0;
        }
        .vp-cta:hover .vp-cta-icon { opacity: 1; transform: rotate(45deg); }
        .vp-cta-icon svg { width: 16px; height: 16px; }

        .vp-page-index { display: flex; align-items: center; gap: 0.8rem; }
        .vp-pi-num { font-family: 'Bebas Neue', sans-serif; font-size: 1.1rem; color: rgba(201,168,76,0.35); letter-spacing: 0.1em; }
        .vp-pi-sep { display: block; width: 24px; height: 1px; background: rgba(201,168,76,0.2); }
        .vp-pi-label { font-size: 0.5rem; letter-spacing: 0.45em; color: rgba(240,235,226,0.2); }

        .vp-hero-right {
          position: relative; overflow: hidden;
          animation: slideInRight 1s cubic-bezier(0.16,1,0.3,1) 0.4s both;
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .vp-strips { display: flex; gap: 12px; padding: 0 20px 0 12px; height: 100vh; align-items: flex-start; }
        .vp-strip  { flex: 1; overflow: hidden; height: 100%; }
        .vp-strip-inner { display: flex; flex-direction: column; gap: 12px; }

        .vp-strip--up .vp-strip-inner      { animation: scrollUp   22s linear infinite; }
        .vp-strip--down .vp-strip-inner    { animation: scrollDown 28s linear infinite; margin-top: -120px; }
        .vp-strip--up-slow .vp-strip-inner { animation: scrollUp   35s linear infinite; margin-top: -60px; }

        @keyframes scrollUp   { 0%   { transform: translateY(0); }    100% { transform: translateY(-50%); } }
        @keyframes scrollDown { 0%   { transform: translateY(-50%); } 100% { transform: translateY(0); } }

        .vp-strip-card { position: relative; border-radius: 12px; overflow: hidden; aspect-ratio: 3/4; flex-shrink: 0; }
        .vp-strip-card img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.85) contrast(1.05); }
        .vp-strip-shimmer { position: absolute; inset: 0; background: linear-gradient(135deg, transparent 40%, rgba(201,168,76,0.08) 100%); pointer-events: none; }

        .vp-fade-top, .vp-fade-bottom { position: absolute; left: 0; right: 0; height: 160px; pointer-events: none; z-index: 2; }
        .vp-fade-top    { top: 0;    background: linear-gradient(to bottom, var(--bg), transparent); }
        .vp-fade-bottom { bottom: 0; background: linear-gradient(to top,    var(--bg), transparent); }
        .vp-strips-label { position: absolute; right: -30px; top: 50%; transform: translateY(-50%) rotate(90deg); font-size: 0.5rem; letter-spacing: 0.5em; color: rgba(201,168,76,0.2); white-space: nowrap; z-index: 3; }
        .vp-split-line   { position: absolute; left: 50%; top: 0; bottom: 0; width: 1px; background: linear-gradient(to bottom, transparent 0%, rgba(201,168,76,0.15) 30%, rgba(201,168,76,0.3) 50%, rgba(201,168,76,0.15) 70%, transparent 100%); z-index: 3; }

        /* ══════════════ TICKER ══════════════ */
        .vp-ticker { overflow: hidden; border-top: 1px solid rgba(201,168,76,0.1); border-bottom: 1px solid rgba(201,168,76,0.1); background: rgba(201,168,76,0.03); padding: 0.9rem 0; }
        .vp-ticker-track { display: flex; gap: 2rem; align-items: center; white-space: nowrap; animation: ticker 30s linear infinite; font-size: 0.6rem; letter-spacing: 0.4em; color: rgba(201,168,76,0.4); font-weight: 500; }
        .vp-tick-gem { color: var(--gold); font-size: 0.5rem; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        /* ══════════════ GALLERY ══════════════ */
        .vp-gallery { padding: 5rem 4rem 8rem; }

        .vp-gallery-header {
          display: flex; justify-content: space-between; align-items: flex-end;
          margin-bottom: 3rem; padding-bottom: 2rem;
          border-bottom: 1px solid rgba(201,168,76,0.1);
        }
        .vp-gallery-header-left  { display: flex; flex-direction: column; gap: 0.8rem; }
        .vp-gallery-eyebrow { font-size: 0.55rem; letter-spacing: 0.5em; color: var(--gold); font-weight: 500; }
        .vp-gallery-title   { font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 600; color: var(--text); line-height: 1.1; }
        .vp-gallery-title em { color: var(--gold); font-style: italic; }
        .vp-gallery-header-right { display: flex; flex-direction: column; align-items: flex-end; gap: 1rem; max-width: 280px; }
        .vp-gallery-desc  { font-size: 0.85rem; line-height: 1.7; color: var(--muted); text-align: right; }
        .vp-gallery-count { font-family: 'Bebas Neue', sans-serif; font-size: 2.5rem; color: var(--gold); letter-spacing: 0.05em; line-height: 1; }
        .vp-gallery-count span { font-family: 'DM Sans', sans-serif; font-size: 0.5rem; letter-spacing: 0.3em; color: var(--muted); display: block; text-align: right; margin-top: 0.2rem; }

        /* ── Filter tabs ── */
        .vp-filters {
          display: flex; align-items: center; gap: 0.5rem;
          margin-bottom: 3rem; flex-wrap: wrap;
        }
        .vp-filter-btn {
          position: relative;
          padding: 0.5rem 1.2rem;
          background: transparent;
          border: 1px solid rgba(201,168,76,0.15);
          color: var(--muted);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.65rem; letter-spacing: 0.2em;
          cursor: pointer;
          border-radius: 2px;
          transition: all 0.3s ease;
          overflow: hidden;
        }
        .vp-filter-btn:hover { color: var(--text); border-color: rgba(201,168,76,0.4); }
        .vp-filter-btn--active { color: var(--gold); border-color: var(--gold); background: rgba(201,168,76,0.05); }
        .vp-filter-bar {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 1px; background: var(--gold);
          box-shadow: 0 0 6px var(--gold-glow);
        }

        /* ══════════════ EQUAL GRID ══════════════ */
        .vp-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        /* Card — equal size, square-ish */
        .vp-card {
          cursor: pointer;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0s, transform 0s;
          border-radius: 8px;
          overflow: hidden;
        }
        .vp-card--visible {
          animation: cardReveal 0.65s cubic-bezier(0.16,1,0.3,1) both;
          animation-delay: inherit;
        }
        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(30px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Image wrapper — fixed aspect ratio = all same size */
        .vp-card-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;   /* portrait — looks great on mobile & desktop */
          overflow: hidden;
          background: var(--bg-card);
          border-radius: 8px;
        }

        .vp-card-img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: brightness(0.88) contrast(1.05) saturate(0.9);
          transition: transform 0.7s cubic-bezier(0.16,1,0.3,1),
                      filter 0.5s ease;
          display: block;
        }
        .vp-card:hover .vp-card-img {
          transform: scale(1.08);
          filter: brightness(0.55) contrast(1.1) saturate(1.2);
        }

        /* Gold shimmer sweep on load */
        .vp-card-shimmer {
          position: absolute; inset: 0;
          background: linear-gradient(105deg,
            transparent 40%,
            rgba(201,168,76,0.06) 50%,
            transparent 60%);
          background-size: 200% 100%;
          animation: shimmerSweep 2.5s ease forwards;
          pointer-events: none;
        }
        @keyframes shimmerSweep {
          0%   { background-position: 200% 0; opacity: 1; }
          100% { background-position: -200% 0; opacity: 0; }
        }

        /* Full overlay on hover */
        .vp-card-overlay {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          justify-content: space-between;
          padding: 1rem;
          background: linear-gradient(
            to top,
            rgba(6,4,2,0.92) 0%,
            rgba(6,4,2,0.3) 50%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .vp-card:hover .vp-card-overlay { opacity: 1; }

        /* Top-left number */
        .vp-card-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.2rem;
          color: rgba(201,168,76,0.7);
          letter-spacing: 0.08em;
          line-height: 1;
          transform: translateY(-6px);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .vp-card:hover .vp-card-num { transform: translateY(0); }

        /* Center view icon */
        .vp-card-center {
          display: flex; flex-direction: column; align-items: center;
          gap: 0.4rem; align-self: center; justify-self: center;
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%) scale(0.7);
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
        }
        .vp-card:hover .vp-card-center { transform: translate(-50%, -50%) scale(1); }

        .vp-card-view-ring {
          width: 44px; height: 44px; border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.6);
          display: flex; align-items: center; justify-content: center;
          color: var(--gold);
          animation: ringPulse 2s ease infinite;
        }
        @keyframes ringPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(201,168,76,0.3); }
          50%     { box-shadow: 0 0 0 8px rgba(201,168,76,0); }
        }
        .vp-card-view-ring svg { width: 18px; height: 18px; }
        .vp-card-view-text {
          font-size: 0.5rem; letter-spacing: 0.4em;
          color: rgba(201,168,76,0.8); font-weight: 600;
        }

        /* Bottom caption slides up */
        .vp-card-caption {
          display: flex; flex-direction: column; gap: 0.4rem;
          transform: translateY(8px);
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
        }
        .vp-card:hover .vp-card-caption { transform: translateY(0); }

        .vp-card-caption-line {
          width: 28px; height: 1px;
          background: linear-gradient(90deg, var(--gold), transparent);
        }
        .vp-card-label {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-weight: 300;
          font-size: 1rem; color: rgba(240,235,226,0.9);
          line-height: 1.2;
        }

        /* Corner accents */
        .vp-corner {
          position: absolute; width: 16px; height: 16px;
          pointer-events: none; opacity: 0;
          transition: opacity 0.35s ease; z-index: 3;
        }
        .vp-card:hover .vp-corner { opacity: 1; }
        .vp-corner--tl { top: 8px; left: 8px; border-top: 1px solid var(--gold); border-left: 1px solid var(--gold); }
        .vp-corner--br { bottom: 8px; right: 8px; border-bottom: 1px solid var(--gold); border-right: 1px solid var(--gold); }

        /* ══════════════ LIGHTBOX ══════════════ */
        .vp-lightbox {
          position: fixed; inset: 0; background: rgba(4,3,2,0.97); z-index: 9000;
          display: flex; align-items: center; justify-content: center;
          animation: lb-in 0.35s ease; backdrop-filter: blur(12px);
        }
        @keyframes lb-in { from { opacity: 0; } to { opacity: 1; } }
        .vp-lb-topbar {
          position: absolute; top: 0; left: 0; right: 0;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.2rem 2rem; border-bottom: 1px solid rgba(201,168,76,0.1); background: rgba(8,6,4,0.8);
        }
        .vp-lb-top-label { font-family: 'Cormorant Garamond', serif; font-size: 1rem; font-style: italic; font-weight: 300; color: rgba(255,255,255,0.6); }
        .vp-lb-top-count { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.2em; color: var(--gold); }
        .vp-lb-top-sep   { color: rgba(201,168,76,0.3); }
        .vp-lb-close {
          position: absolute; top: 1rem; right: 1.8rem;
          width: 36px; height: 36px; background: rgba(201,168,76,0.08); border: 1px solid rgba(201,168,76,0.25);
          cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px;
          transition: all 0.3s ease; border-radius: 6px; z-index: 2;
        }
        .vp-lb-close:hover { background: rgba(201,168,76,0.2); border-color: var(--gold); }
        .vp-lb-close-line { display: block; width: 16px; height: 1.5px; background: rgba(255,255,255,0.7); }
        .vp-lb-close-line:first-child { transform: rotate(45deg) translateY(2px); }
        .vp-lb-close-line:last-child  { transform: rotate(-45deg) translateY(-2px); }
        .vp-lb-nav {
          position: absolute; top: 50%; transform: translateY(-50%);
          background: rgba(8,6,4,0.7); border: 1px solid rgba(201,168,76,0.2);
          width: 52px; height: 80px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.3s ease; border-radius: 8px; font-size: 2.2rem; color: rgba(255,255,255,0.5);
        }
        .vp-lb-nav:hover { border-color: var(--gold); color: var(--gold-light); background: rgba(201,168,76,0.08); }
        .vp-lb-prev { left: 1rem; }
        .vp-lb-next { right: 1rem; }
        .vp-lb-frame {
          display: flex; flex-direction: column; align-items: center;
          max-width: 82vw; max-height: 88vh;
          animation: lb-scale 0.38s cubic-bezier(0.34,1.4,0.64,1);
        }
        .vp-lb-frame--anim { animation: lb-switch 0.22s ease; }
        @keyframes lb-scale  { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes lb-switch { 0% { opacity:1; transform:scale(1); } 50% { opacity:0; transform:scale(0.96); } 100% { opacity:1; transform:scale(1); } }
        .vp-lb-img-wrap { position: relative; display: flex; }
        .vp-lb-img { max-width: 100%; max-height: 72vh; object-fit: contain; border: 1px solid rgba(201,168,76,0.15); border-radius: 12px; }
        .vp-lb-corner { position: absolute; width: 20px; height: 20px; border-style: solid; border-color: var(--gold); opacity: 0.7; }
        .vp-lb-tl { top: -4px; left: -4px;    border-width: 1.5px 0 0 1.5px; }
        .vp-lb-tr { top: -4px; right: -4px;   border-width: 1.5px 1.5px 0 0; }
        .vp-lb-bl { bottom: -4px; left: -4px;  border-width: 0 0 1.5px 1.5px; }
        .vp-lb-br { bottom: -4px; right: -4px; border-width: 0 1.5px 1.5px 0; }
        .vp-lb-caption {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; margin-top: 1.4rem; gap: 1rem;
        }
        .vp-lb-cap-left { display: flex; align-items: center; gap: 1rem; }
        .vp-lb-num { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; color: rgba(201,168,76,0.2); }
        .vp-lb-cap-divider { width: 1px; height: 32px; background: linear-gradient(to bottom, transparent, rgba(201,168,76,0.3), transparent); }
        .vp-lb-cap-info { display: flex; flex-direction: column; gap: 0.2rem; }
        .vp-lb-label { font-family: 'Cormorant Garamond', serif; font-size: 1.05rem; font-style: italic; font-weight: 300; color: rgba(255,255,255,0.85); }
        .vp-lb-sub   { font-size: 0.55rem; letter-spacing: 0.3em; color: rgba(201,168,76,0.5); }
        .vp-lb-dots  { display: flex; gap: 0.3rem; flex-wrap: wrap; justify-content: flex-end; max-width: 300px; }
        .vp-lb-dot   { width: 7px; height: 7px; border-radius: 50%; background: rgba(255,255,255,0.15); border: none; cursor: pointer; transition: all 0.3s ease; }
        .vp-lb-dot--active { background: var(--gold); transform: scale(1.4); box-shadow: 0 0 8px var(--gold-glow); }

        /* ══════════════ RESPONSIVE ══════════════ */
        @media (max-width: 1100px) {
          .vp-hero { grid-template-columns: 1fr; min-height: auto; }
          .vp-hero-left { padding: 5rem 3rem; }
          .vp-hero-right { height: 60vw; }
          .vp-split-line { display: none; }
          .vp-gallery { padding: 4rem 2rem 6rem; }
          .vp-grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 768px) {
          .vp-hero-left { padding: 4rem 2rem; }
          .vp-studio-line { margin-bottom: 2rem; }
          .vp-gallery-header { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
          .vp-gallery-header-right { align-items: flex-start; }
          .vp-gallery-desc { text-align: left; }
          /* 2 columns on tablet */
          .vp-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .vp-gallery { padding: 3rem 1rem 5rem; }
          .vp-strips { gap: 8px; padding: 0 10px; }
          .vp-stat { padding-right: 1rem; margin-right: 1rem; }
          .vp-filters { gap: 0.4rem; }
          .vp-filter-btn { padding: 0.4rem 0.9rem; font-size: 0.6rem; }
        }

        @media (max-width: 480px) {
          /* 2 columns on mobile — equal, compact */
          .vp-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
          .vp-card-img-wrap { aspect-ratio: 1 / 1; }  /* square on very small screens */
          .vp-hero-right { height: 80vw; }
          .vp-hero-left { padding: 3rem 1.5rem; }
          .vp-title-accent { display: none; }
          .vp-gallery { padding: 2.5rem 0.8rem 4rem; }
          .vp-lb-nav { width: 36px; height: 60px; font-size: 1.6rem; }
        }
      `}</style>
    </div>
  );
};

export default ViewPhotosPage;