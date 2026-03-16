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

// Split images into 3 columns for the scrolling strips
const col1 = [0, 3, 6, 9, 12, 15, 18, 21].map(i => images[i]);
const col2 = [1, 4, 7, 10, 13, 16, 19, 22].map(i => images[i]);
const col3 = [2, 5, 8, 11, 14, 17, 20, 23].map(i => images[i]);

const ViewPhotosPage = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [visible, setVisible] = useState<Set<number>>(new Set());
  const [heroVisible, setHeroVisible] = useState(false);
  const [lbAnim, setLbAnim] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
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
      { threshold: 0.1 }
    );
    itemRefs.current.forEach((r) => r && observer.observe(r));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((p) => p !== null ? (p + 1) % images.length : null);
      if (e.key === "ArrowLeft") setLightbox((p) => p !== null ? (p - 1 + images.length) % images.length : null);
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
      {/* Custom cursor glow */}
      <div
        className="vp-cursor-glow"
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />

      {/* ── HERO: SPLIT LAYOUT ── */}
      <section className={`vp-hero ${heroVisible ? "vp-hero--visible" : ""}`}>

        {/* LEFT: Editorial Content */}
        <div className="vp-hero-left">
          <div className="vp-hero-badge">
            <span className="vp-badge-dot" />
            <span>EAGLE-VIEW PICTURES</span>
            <span className="vp-badge-dot" />
          </div>

          <h1 className="vp-hero-title">
            <span className="vp-title-line vp-title-line--1">Our</span>
            <span className="vp-title-line vp-title-line--2">Gallery</span>
          </h1>

          <div className="vp-hero-verse">
            <div className="vp-verse-bar" />
            <p>
              Every frame tells a story.<br />
              Every moment, preserved forever.
            </p>
          </div>

          <div className="vp-hero-stats">
            {[["500+", "Love Stories"], ["12", "Years Crafting"], ["∞", "Memories Made"]].map(([num, label]) => (
              <div key={label} className="vp-stat">
                <span className="vp-stat-num">{num}</span>
                <span className="vp-stat-label">{label}</span>
              </div>
            ))}
          </div>

          <button className="vp-hero-cta" onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}>
            <span className="vp-cta-text">Explore Collection</span>
            <span className="vp-cta-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
            <span className="vp-cta-shine" />
          </button>

          {/* Decorative index number */}
          <div className="vp-hero-index">01 / GALLERY</div>
        </div>

        {/* RIGHT: 3 Auto-scrolling Photo Strips */}
        <div className="vp-hero-right">
          <div className="vp-strips">

            {/* Strip 1 — scrolls UP */}
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

            {/* Strip 2 — scrolls DOWN (offset) */}
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

            {/* Strip 3 — scrolls UP (slower) */}
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

          {/* Fade masks top & bottom */}
          <div className="vp-fade-top" />
          <div className="vp-fade-bottom" />

          {/* Vertical label */}
          <div className="vp-strips-label">WEDDING PHOTOGRAPHY</div>
        </div>

        {/* Diagonal split accent line */}
        <div className="vp-split-line" />
      </section>

      {/* ── MARQUEE TICKER ── */}
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

      {/* ── GALLERY SECTION ── */}
      <section id="gallery" className="vp-gallery">

        {/* Section header */}
        <div className="vp-gallery-header">
          <div className="vp-gallery-header-left">
            <span className="vp-gallery-eyebrow">THE COLLECTION</span>
            <h2 className="vp-gallery-title">Moments <em>Frozen</em> in Time</h2>
          </div>
          <div className="vp-gallery-header-right">
            <p className="vp-gallery-desc">
              A curated selection of our finest work — every image a doorway back to the day.
            </p>
            <div className="vp-gallery-count">{String(images.length).padStart(2, "0")} <span>IMAGES</span></div>
          </div>
        </div>

        {/* Masonry-style creative grid */}
        <div className="vp-masonry">
          {images.map((img, i) => (
            <div
              key={i}
              data-index={i}
              ref={(el) => { itemRefs.current[i] = el; }}
              className={`vp-card vp-card--${(i % 5) + 1} ${visible.has(i) ? "vp-card--visible" : ""}`}
              style={{ transitionDelay: `${(i % 8) * 0.07}s` }}
              onClick={() => openLightbox(i)}
              onMouseEnter={() => setHoveredItem(i)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="vp-card-inner">
                <img src={img} alt={labels[i]} className="vp-card-img" />

                {/* Number tag */}
                <div className="vp-card-num">{String(i + 1).padStart(2, "0")}</div>

                {/* Hover overlay */}
                <div className="vp-card-overlay">
                  <div className="vp-card-content">
                    <div className="vp-card-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                      </svg>
                    </div>
                    <h3 className="vp-card-label">{labels[i]}</h3>
                    <span className="vp-card-cta">VIEW MOMENT →</span>
                  </div>
                </div>

                {/* Corner accents */}
                <span className="vp-corner vp-corner--tl" />
                <span className="vp-corner vp-corner--br" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --gold:        #C9A84C;
          --gold-light:  #E8C96A;
          --gold-pale:   #F5DFA0;
          --gold-deep:   #9A7228;
          --gold-glow:   rgba(201,168,76,0.5);
          --gold-border: rgba(201,168,76,0.25);
          --bg:          #080604;
          --bg-card:     #0f0d0a;
          --text:        #f0ebe2;
          --text-muted:  rgba(240,235,226,0.45);
        }

        .vp-root {
          background: var(--bg);
          min-height: 100vh;
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
          cursor: none;
        }

        /* ── CUSTOM CURSOR ── */
        .vp-cursor-glow {
          pointer-events: none;
          position: fixed;
          width: 380px; height: 380px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
          transform: translate(-50%, -50%);
          z-index: 0;
          transition: left 0.08s, top 0.08s;
        }

        /* ══════════════════════════════════════════
           HERO — SPLIT LAYOUT
        ══════════════════════════════════════════ */
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

        /* ── LEFT ── */
        .vp-hero-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 7rem 5rem 7rem 6rem;
          position: relative;
          z-index: 2;
          animation: slideInLeft 1s cubic-bezier(0.16,1,0.3,1) 0.2s both;
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .vp-hero-badge {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.55rem;
          letter-spacing: 0.5em;
          color: var(--gold);
          margin-bottom: 2.5rem;
          font-weight: 500;
        }
        .vp-badge-dot {
          display: block;
          width: 4px; height: 4px;
          border-radius: 50%;
          background: var(--gold);
          box-shadow: 0 0 8px var(--gold-glow);
        }

        .vp-hero-title {
          display: flex;
          flex-direction: column;
          line-height: 0.95;
          margin-bottom: 2.5rem;
        }
        .vp-title-line {
          display: block;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(5rem, 9vw, 10rem);
          color: var(--text);
          letter-spacing: 0.02em;
        }
        .vp-title-line--2 {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-weight: 400;
          color: transparent;
          -webkit-text-stroke: 1px var(--gold);
          letter-spacing: 0.05em;
        }

        .vp-hero-verse {
          display: flex;
          gap: 1.2rem;
          margin-bottom: 3rem;
          max-width: 340px;
        }
        .vp-verse-bar {
          flex-shrink: 0;
          width: 3px;
          border-radius: 2px;
          background: linear-gradient(to bottom, var(--gold), transparent);
        }
        .vp-hero-verse p {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 1rem;
          line-height: 1.75;
          color: var(--text-muted);
        }

        .vp-hero-stats {
          display: flex;
          gap: 2.5rem;
          margin-bottom: 3.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(201,168,76,0.1);
        }
        .vp-stat { display: flex; flex-direction: column; gap: 0.3rem; }
        .vp-stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.2rem;
          color: var(--gold);
          line-height: 1;
          letter-spacing: 0.04em;
        }
        .vp-stat-label {
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .vp-hero-cta {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 2.2rem;
          border: 1px solid var(--gold);
          background: transparent;
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.4s ease;
          width: fit-content;
        }
        .vp-hero-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--gold);
          transform: translateX(-101%);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
          z-index: 0;
        }
        .vp-hero-cta:hover::before { transform: translateX(0); }
        .vp-hero-cta:hover { color: var(--bg); }
        .vp-cta-text { position: relative; z-index: 1; font-weight: 500; }
        .vp-cta-arrow {
          position: relative;
          z-index: 1;
          width: 18px; height: 18px;
          display: flex; align-items: center;
        }
        .vp-cta-arrow svg { width: 100%; height: 100%; }

        .vp-hero-index {
          position: absolute;
          bottom: 3rem;
          left: 6rem;
          font-size: 0.55rem;
          letter-spacing: 0.35em;
          color: rgba(201,168,76,0.3);
        }

        /* ── RIGHT: SCROLLING STRIPS ── */
        .vp-hero-right {
          position: relative;
          overflow: hidden;
          animation: slideInRight 1s cubic-bezier(0.16,1,0.3,1) 0.4s both;
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .vp-strips {
          display: flex;
          gap: 12px;
          padding: 0 20px 0 12px;
          height: 100vh;
          align-items: flex-start;
        }

        .vp-strip {
          flex: 1;
          overflow: hidden;
          height: 100%;
        }

        .vp-strip-inner {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* Scroll UP */
        .vp-strip--up .vp-strip-inner {
          animation: scrollUp 22s linear infinite;
        }
        /* Scroll DOWN */
        .vp-strip--down .vp-strip-inner {
          animation: scrollDown 28s linear infinite;
          margin-top: -120px;
        }
        /* Scroll UP slower */
        .vp-strip--up-slow .vp-strip-inner {
          animation: scrollUp 35s linear infinite;
          margin-top: -60px;
        }

        @keyframes scrollUp {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scrollDown {
          0%   { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }

        .vp-strip-card {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          aspect-ratio: 3/4;
          flex-shrink: 0;
        }
        .vp-strip-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.85) contrast(1.05);
          transition: filter 0.4s ease;
        }
        .vp-strip-card:hover img { filter: brightness(1) contrast(1.1); }

        .vp-strip-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 40%, rgba(201,168,76,0.08) 100%);
          pointer-events: none;
        }

        /* Fade edges */
        .vp-fade-top, .vp-fade-bottom {
          position: absolute;
          left: 0; right: 0;
          height: 160px;
          pointer-events: none;
          z-index: 2;
        }
        .vp-fade-top {
          top: 0;
          background: linear-gradient(to bottom, var(--bg) 0%, transparent 100%);
        }
        .vp-fade-bottom {
          bottom: 0;
          background: linear-gradient(to top, var(--bg) 0%, transparent 100%);
        }

        /* Vertical label */
        .vp-strips-label {
          position: absolute;
          right: -30px;
          top: 50%;
          transform: translateY(-50%) rotate(90deg);
          font-size: 0.5rem;
          letter-spacing: 0.5em;
          color: rgba(201,168,76,0.2);
          white-space: nowrap;
          z-index: 3;
        }

        /* Diagonal split line */
        .vp-split-line {
          position: absolute;
          left: 50%;
          top: 0; bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, transparent 0%, rgba(201,168,76,0.15) 30%, rgba(201,168,76,0.3) 50%, rgba(201,168,76,0.15) 70%, transparent 100%);
          z-index: 3;
        }

        /* ══════════════════════════════════════════
           MARQUEE TICKER
        ══════════════════════════════════════════ */
        .vp-ticker {
          overflow: hidden;
          border-top: 1px solid rgba(201,168,76,0.1);
          border-bottom: 1px solid rgba(201,168,76,0.1);
          background: rgba(201,168,76,0.03);
          padding: 0.9rem 0;
        }
        .vp-ticker-track {
          display: flex;
          gap: 2rem;
          align-items: center;
          white-space: nowrap;
          animation: ticker 30s linear infinite;
          font-size: 0.6rem;
          letter-spacing: 0.4em;
          color: rgba(201,168,76,0.4);
          font-weight: 500;
        }
        .vp-tick-gem { color: var(--gold); font-size: 0.5rem; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        /* ══════════════════════════════════════════
           GALLERY SECTION
        ══════════════════════════════════════════ */
        .vp-gallery {
          padding: 6rem 5rem 8rem;
          position: relative;
        }

        /* Header */
        .vp-gallery-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 4rem;
          padding-bottom: 2.5rem;
          border-bottom: 1px solid rgba(201,168,76,0.1);
        }
        .vp-gallery-header-left { display: flex; flex-direction: column; gap: 0.8rem; }
        .vp-gallery-eyebrow {
          font-size: 0.55rem;
          letter-spacing: 0.5em;
          color: var(--gold);
          font-weight: 500;
        }
        .vp-gallery-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 700;
          color: var(--text);
          line-height: 1.1;
        }
        .vp-gallery-title em { color: var(--gold); font-style: italic; }
        .vp-gallery-header-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1rem;
          max-width: 280px;
        }
        .vp-gallery-desc {
          font-size: 0.85rem;
          line-height: 1.7;
          color: var(--text-muted);
          text-align: right;
        }
        .vp-gallery-count {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.5rem;
          color: var(--gold);
          letter-spacing: 0.05em;
          line-height: 1;
        }
        .vp-gallery-count span {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.5rem;
          letter-spacing: 0.3em;
          color: var(--text-muted);
          display: block;
          text-align: right;
          margin-top: 0.2rem;
        }

        /* ── MASONRY GRID ── */
        .vp-masonry {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 180px;
          gap: 14px;
        }

        .vp-card {
          cursor: pointer;
          opacity: 0;
          transform: translateY(30px) scale(0.97);
          transition: opacity 0.7s ease, transform 0.7s ease;
          position: relative;
        }
        .vp-card--visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* Span variations for visual rhythm */
        .vp-card--1 { grid-row: span 2; }
        .vp-card--2 { grid-column: span 2; grid-row: span 2; }
        .vp-card--3 { grid-row: span 2; }
        .vp-card--4 { grid-row: span 1; }
        .vp-card--5 { grid-row: span 1; }

        .vp-card-inner {
          position: relative;
          width: 100%; height: 100%;
          border-radius: 10px;
          overflow: hidden;
          background: var(--bg-card);
          transition: all 0.5s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        .vp-card-inner:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 35px 60px rgba(0,0,0,0.6), 0 0 0 1px var(--gold-border);
        }

        .vp-card-img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: brightness(0.85) contrast(1.05) saturate(0.95);
          transition: all 0.7s ease;
        }
        .vp-card-inner:hover .vp-card-img {
          filter: brightness(0.55) contrast(1.1) saturate(1.2);
          transform: scale(1.06);
        }

        /* Number tag */
        .vp-card-num {
          position: absolute;
          top: 12px; left: 12px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.4rem;
          color: rgba(201,168,76,0.5);
          letter-spacing: 0.05em;
          line-height: 1;
          transition: opacity 0.3s ease;
          z-index: 2;
        }
        .vp-card-inner:hover .vp-card-num { opacity: 0; }

        /* Overlay */
        .vp-card-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(to top, rgba(8,6,4,0.92) 0%, rgba(8,6,4,0.4) 50%, transparent 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .vp-card-inner:hover .vp-card-overlay { opacity: 1; }

        .vp-card-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.8rem;
          text-align: center;
          padding: 1.5rem;
          transform: translateY(15px);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .vp-card-inner:hover .vp-card-content { transform: translateY(0); }

        .vp-card-icon {
          width: 36px; height: 36px;
          border: 1px solid var(--gold-border);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: var(--gold);
        }
        .vp-card-icon svg { width: 16px; height: 16px; }

        .vp-card-label {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          font-weight: 400;
          font-style: italic;
          color: var(--text);
        }

        .vp-card-cta {
          font-size: 0.55rem;
          letter-spacing: 0.3em;
          color: var(--gold);
          font-weight: 500;
        }

        /* Corner accents */
        .vp-corner {
          position: absolute;
          width: 18px; height: 18px;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 3;
        }
        .vp-card-inner:hover .vp-corner { opacity: 1; }
        .vp-corner--tl {
          top: 8px; left: 8px;
          border-top: 1px solid var(--gold);
          border-left: 1px solid var(--gold);
        }
        .vp-corner--br {
          bottom: 8px; right: 8px;
          border-bottom: 1px solid var(--gold);
          border-right: 1px solid var(--gold);
        }

        /* ══════════════════════════════════════════
           LIGHTBOX
        ══════════════════════════════════════════ */
        .vp-lightbox {
          position: fixed; inset: 0;
          background: rgba(4,3,2,0.97);
          z-index: 9000;
          display: flex; align-items: center; justify-content: center;
          animation: lb-in 0.35s ease;
          backdrop-filter: blur(12px);
        }
        @keyframes lb-in { from { opacity: 0; } to { opacity: 1; } }

        .vp-lb-topbar {
          position: absolute; top: 0; left: 0; right: 0;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.2rem 2rem;
          border-bottom: 1px solid rgba(201,168,76,0.1);
          background: rgba(8,6,4,0.8);
        }
        .vp-lb-top-label {
          font-family: 'Playfair Display', serif;
          font-size: 1rem; font-style: italic; font-weight: 300;
          color: rgba(255,255,255,0.6);
        }
        .vp-lb-top-count {
          font-size: 0.7rem; font-weight: 600;
          letter-spacing: 0.2em; color: var(--gold);
        }
        .vp-lb-top-sep { color: rgba(201,168,76,0.3); }

        .vp-lb-close {
          position: absolute; top: 1rem; right: 1.8rem;
          width: 36px; height: 36px;
          background: rgba(201,168,76,0.08);
          border: 1px solid rgba(201,168,76,0.25);
          cursor: pointer;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 2px;
          transition: all 0.3s ease;
          border-radius: 6px;
          z-index: 2;
        }
        .vp-lb-close:hover { background: rgba(201,168,76,0.2); border-color: var(--gold); }
        .vp-lb-close-line {
          display: block; width: 16px; height: 1.5px;
          background: rgba(255,255,255,0.7);
        }
        .vp-lb-close-line:first-child { transform: rotate(45deg) translateY(2px); }
        .vp-lb-close-line:last-child  { transform: rotate(-45deg) translateY(-2px); }

        .vp-lb-nav {
          position: absolute; top: 50%; transform: translateY(-50%);
          background: rgba(8,6,4,0.7);
          border: 1px solid rgba(201,168,76,0.2);
          width: 52px; height: 80px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.3s ease;
          border-radius: 8px;
          font-size: 2.2rem;
          color: rgba(255,255,255,0.5);
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
        @keyframes lb-scale { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes lb-switch { 0% { opacity:1; transform:scale(1); } 50% { opacity:0; transform:scale(0.96); } 100% { opacity:1; transform:scale(1); } }

        .vp-lb-img-wrap { position: relative; display: flex; }
        .vp-lb-img {
          max-width: 100%; max-height: 72vh;
          object-fit: contain;
          border: 1px solid rgba(201,168,76,0.15);
          border-radius: 12px;
        }
        .vp-lb-corner {
          position: absolute;
          width: 20px; height: 20px;
          border-style: solid; border-color: var(--gold); opacity: 0.7;
        }
        .vp-lb-tl { top: -4px; left: -4px; border-width: 1.5px 0 0 1.5px; }
        .vp-lb-tr { top: -4px; right: -4px; border-width: 1.5px 1.5px 0 0; }
        .vp-lb-bl { bottom: -4px; left: -4px; border-width: 0 0 1.5px 1.5px; }
        .vp-lb-br { bottom: -4px; right: -4px; border-width: 0 1.5px 1.5px 0; }

        .vp-lb-caption {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; margin-top: 1.4rem; gap: 1rem;
        }
        .vp-lb-cap-left { display: flex; align-items: center; gap: 1rem; }
        .vp-lb-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          color: rgba(201,168,76,0.2);
        }
        .vp-lb-cap-divider {
          width: 1px; height: 32px;
          background: linear-gradient(to bottom, transparent, rgba(201,168,76,0.3), transparent);
        }
        .vp-lb-cap-info { display: flex; flex-direction: column; gap: 0.2rem; }
        .vp-lb-label {
          font-family: 'Playfair Display', serif;
          font-size: 1.05rem; font-style: italic; font-weight: 300;
          color: rgba(255,255,255,0.85);
        }
        .vp-lb-sub { font-size: 0.55rem; letter-spacing: 0.3em; color: rgba(201,168,76,0.5); }
        .vp-lb-dots { display: flex; gap: 0.3rem; flex-wrap: wrap; justify-content: flex-end; max-width: 300px; }
        .vp-lb-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: rgba(255,255,255,0.15); border: none; cursor: pointer;
          transition: all 0.3s ease;
        }
        .vp-lb-dot--active {
          background: var(--gold); transform: scale(1.4);
          box-shadow: 0 0 8px var(--gold-glow);
        }

        /* ══════════════════════════════════════════
           RESPONSIVE
        ══════════════════════════════════════════ */
        @media (max-width: 1100px) {
          .vp-hero { grid-template-columns: 1fr; min-height: auto; }
          .vp-hero-left { padding: 5rem 3rem; }
          .vp-hero-right { height: 60vw; }
          .vp-split-line { display: none; }
          .vp-gallery { padding: 4rem 2.5rem 6rem; }
          .vp-masonry { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .vp-hero-left { padding: 4rem 2rem; }
          .vp-gallery-header { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
          .vp-gallery-header-right { align-items: flex-start; }
          .vp-gallery-desc { text-align: left; }
          .vp-masonry { grid-template-columns: repeat(2, 1fr); }
          .vp-gallery { padding: 3rem 1.5rem 5rem; }
          .vp-strips { gap: 8px; padding: 0 10px; }
        }
        @media (max-width: 480px) {
          .vp-masonry { grid-template-columns: 1fr; }
          .vp-hero-right { height: 80vw; }
        }
      `}</style>
    </div>
  );
};

export default ViewPhotosPage;