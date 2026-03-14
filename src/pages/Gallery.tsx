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

const ViewPhotosPage = () => {
  const [lightbox, setLightbox]       = useState<number | null>(null);
  const [visible, setVisible]         = useState<Set<number>>(new Set());
  const [heroVisible, setHeroVisible] = useState(false);
  const [lbAnim, setLbAnim]           = useState(false);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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
      { threshold: 0.1 }
    );
    itemRefs.current.forEach((r) => r && observer.observe(r));
    return () => observer.disconnect();
  }, []);

  // Lightbox keyboard nav
  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")      setLightbox(null);
      if (e.key === "ArrowRight")  setLightbox((p) => p !== null ? (p + 1) % images.length : null);
      if (e.key === "ArrowLeft")   setLightbox((p) => p !== null ? (p - 1 + images.length) % images.length : null);
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
      
      {/* ── HERO ── */}
      <div className={`vp-hero ${heroVisible ? "vp-hero--visible" : ""}`}>
        <img src="/Images/camera.jpg" alt="Hero" className="vp-hero-img" />
        <div className="vp-hero-overlay" />

        <div className="vp-hero-content">
          <p className="vp-hero-eyebrow">
            <span className="vp-ey-line" />
            EAGLE-VIEW PICTURES
            <span className="vp-ey-line vp-ey-line--r" />
          </p>

          <h1 className="vp-hero-title">Our Gallery</h1>

          <div className="vp-hero-divider">
            <span className="vp-dline" />
            <span className="vp-diamond" />
            <span className="vp-dline vp-dline--r" />
          </div>

          <p className="vp-hero-sub">
            Capturing timeless moments of love & celebration
          </p>
        </div>

        <div className="vp-scroll-indicator">
          <div className="vp-scroll-mouse">
            <span className="vp-scroll-wheel" />
          </div>
          <span className="vp-scroll-text">SCROLL</span>
        </div>
      </div>

      {/* ── SECTION LABEL ── */}
      <div className="vp-section-label">
        <span className="vp-label-line" />
        <div className="vp-label-center">
          <span className="vp-label-gem">✦</span>
          <span className="vp-label-text">THE COLLECTION</span>
          <span className="vp-label-gem">✦</span>
        </div>
        <span className="vp-label-line vp-label-line--r" />
      </div>

      {/* ── ELEGANT CAROUSEL GRID ── */}
      <div className="vp-elegant-grid">
        <div className="vp-grid-container">
          {images.map((img, i) => (
            <div
              key={i}
              data-index={i}
              ref={(el) => { itemRefs.current[i] = el; }}
              className={`vp-elegant-item ${visible.has(i) ? "vp-elegant-item--visible" : ""}`}
              // style={{
              //   '--i': i,
              //   '--delay': `${(i % 12) * 0.08}s`
              // }}
              onClick={() => openLightbox(i)}
            >
              <div className="vp-elegant-inner">
                <img src={img} alt={labels[i]} className="vp-elegant-img" />
                
                {/* Elegant glass overlay */}
                <div className="vp-glass-overlay" />
                
                {/* Content reveal */}
                <div className="vp-content-reveal">
                  <div className="vp-content-inner">
                    <span className="vp-number">{String((i % 9) + 1).padStart(2, "0")}</span>
                    <h3 className="vp-label">{labels[i]}</h3>
                    <div className="vp-line" />
                    <span className="vp-view-text">View Moment</span>
                  </div>
                </div>

                {/* Elegant frame */}
                <div className="vp-frame">
                  <span className="vp-frame-line vp-frame-t" />
                  <span className="vp-frame-line vp-frame-r" />
                  <span className="vp-frame-line vp-frame-b" />
                  <span className="vp-frame-line vp-frame-l" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── LIGHTBOX ── (SAME AS BEFORE) */}
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
            <span className="vp-lb-nav-arrow">‹</span>
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
                <span className="vp-lb-num">
                  {String((lightbox % 9) + 1).padStart(2, "0")}
                </span>
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
            <span className="vp-lb-nav-arrow">›</span>
          </button>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Great+Vibes&family=Montserrat:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --g-primary: #C9A84C;
          --g-light:   #E8C96A;
          --g-pale:    #F5DFA0;
          --g-deep:    #9A7228;
          --g-glow:    rgba(201,168,76,0.6);
          --g-glow-sm: rgba(201,168,76,0.3);
          --g-border:  rgba(201,168,76,0.35);
          --bg:        #080604;
          --glass:     rgba(255, 255, 255, 0.05);
          --glass-blur: rgba(255, 255, 255, 0.1);
        }

        .vp-root {
          background: var(--bg);
          min-height: 100vh;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          overflow-x: hidden;
        }

        /* ═══════════════════════════ HERO (UNCHANGED) ═══════════════════════════ */
        .vp-hero {
          position: relative;
          height: 100vh; min-height: 600px;
          overflow: hidden;
          opacity: 0;
          transition: opacity 1.1s ease;
        }
        .vp-hero--visible { opacity: 1; }

        .vp-hero-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transform: scale(1.1);
          animation: hero-zoom 14s cubic-bezier(0.25,0.46,0.45,0.94) forwards;
          filter: brightness(0.45) sepia(0.15);
        }
        @keyframes hero-zoom { to { transform: scale(1); } }

        .vp-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(8,6,4,0.15) 0%, rgba(8,6,4,0.35) 50%, rgba(8,6,4,0.9) 100%);
        }

        .vp-hero-content {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center; padding: 2rem;
          animation: hero-fade 1.6s ease 0.4s both;
        }
        @keyframes hero-fade {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .vp-hero-eyebrow {
          display: inline-flex; align-items: center; gap: 0.9rem;
          font-size: 0.6rem; letter-spacing: 0.55em;
          color: #ffffff; margin-bottom: 1.4rem; font-weight: 600;
        }
        .vp-ey-line {
          display: block; width: 35px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--g-primary));
        }
        .vp-ey-line--r { background: linear-gradient(90deg, var(--g-primary), transparent); }

        .vp-hero-title {
          font-family: 'Great Vibes', cursive;
          font-size: clamp(3.5rem, 9vw, 7rem);
          font-weight: 400; line-height: 1.05;
          color: #ffffff;
          margin-bottom: 1.8rem;
          text-shadow: 0 4px 40px rgba(0,0,0,0.4);
          animation: title-shimmer 4s ease 1.5s infinite;
        }
        @keyframes title-shimmer {
          0%,100% { text-shadow: 0 4px 40px rgba(0,0,0,0.4); }
          50%     { text-shadow: 0 4px 40px rgba(0,0,0,0.4), 0 0 60px rgba(201,168,76,0.08); }
        }

        .vp-hero-divider {
          display: flex; align-items: center; gap: 1rem; margin-bottom: 1.6rem;
        }
        .vp-dline {
          display: block; width: 70px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--g-primary));
        }
        .vp-dline--r { background: linear-gradient(90deg, var(--g-primary), transparent); }
        .vp-diamond {
          display: block; width: 7px; height: 7px;
          background: var(--g-primary); transform: rotate(45deg);
          box-shadow: 0 0 12px var(--g-glow);
          animation: gem-pulse 2s ease infinite;
        }
        @keyframes gem-pulse {
          0%,100% { box-shadow: 0 0 12px var(--g-glow); }
          50%     { box-shadow: 0 0 20px var(--g-glow), 0 0 50px rgba(201,168,76,0.4); }
        }

        .vp-hero-sub {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1rem, 2vw, 1.45rem);
          font-weight: 300; font-style: italic;
          color: rgba(255,255,255,0.75);
          letter-spacing: 0.05em;
        }

        .vp-scroll-indicator {
          position: absolute; bottom: 2.5rem; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 0.6rem;
          animation: scroll-bob 2.5s ease infinite;
        }
        @keyframes scroll-bob {
          0%,100% { transform: translateX(-50%) translateY(0); }
          50%     { transform: translateX(-50%) translateY(7px); }
        }
        .vp-scroll-mouse {
          width: 22px; height: 34px;
          border: 1.5px solid rgba(201,168,76,0.4);
          border-radius: 11px;
          display: flex; justify-content: center; padding-top: 6px;
        }
        .vp-scroll-wheel {
          width: 2px; height: 7px; border-radius: 2px;
          background: var(--g-primary);
          animation: wheel-scroll 1.8s ease infinite;
        }
        @keyframes wheel-scroll {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(10px); }
        }

        /* ═══════════════════════════ SECTION LABEL ═══════════════════════════ */
        .vp-section-label {
          display: flex; align-items: center;
          justify-content: center; gap: 1.5rem;
          padding: 3rem 3rem 2rem;
        }
        .vp-label-line {
          flex: 1; max-width: 150px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.2));
        }
        .vp-label-line--r { background: linear-gradient(90deg, rgba(201,168,76,0.2), transparent); }
        .vp-label-center { display: flex; align-items: center; gap: 0.8rem; }
        .vp-label-gem { font-size: 0.4rem; color: var(--g-primary); opacity: 0.6; }
        .vp-label-text {
          font-size: 0.58rem; letter-spacing: 0.55em;
          color: rgba(255,255,255,0.35); font-weight: 600;
        }

        /* ═══════════════════════════ ELEGANT GLASS GRID ═══════════════════════════ */
        .vp-elegant-grid {
          padding: 0 3rem 5rem;
          max-width: 1600px;
          margin: 0 auto;
          position: relative;
        }

        .vp-grid-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(6, 280px);
          gap: 20px;
          /* Elegant stagger pattern */
          grid-template-areas: 
            "a b c d"
            "e b f g"
            "h i f j"
            "k i l m"
            "n o l p"
            "q r s t";
        }

        .vp-elegant-item {
          opacity: 0;
          transform: translateY(50px) scale(0.95);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          cursor: pointer;
          position: relative;
          isolation: isolate;
        }

        .vp-elegant-item:nth-child(1) { grid-area: a; transition-delay: 0.1s; }
        .vp-elegant-item:nth-child(2) { grid-area: b; transition-delay: 0.2s; }
        .vp-elegant-item:nth-child(3) { grid-area: c; transition-delay: 0.25s; }
        .vp-elegant-item:nth-child(4) { grid-area: d; transition-delay: 0.3s; }
        .vp-elegant-item:nth-child(5) { grid-area: e; transition-delay: 0.35s; }
        .vp-elegant-item:nth-child(6) { grid-area: f; transition-delay: 0.4s; }
        .vp-elegant-item:nth-child(7) { grid-area: g; transition-delay: 0.45s; }
        .vp-elegant-item:nth-child(8) { grid-area: h; transition-delay: 0.5s; }
        .vp-elegant-item:nth-child(9) { grid-area: i; transition-delay: 0.55s; }
        .vp-elegant-item:nth-child(10) { grid-area: j; transition-delay: 0.6s; }
        .vp-elegant-item:nth-child(11) { grid-area: k; transition-delay: 0.65s; }
        .vp-elegant-item:nth-child(12) { grid-area: l; transition-delay: 0.7s; }
        .vp-elegant-item:nth-child(13) { grid-area: m; transition-delay: 0.75s; }
        .vp-elegant-item:nth-child(14) { grid-area: n; transition-delay: 0.8s; }
        .vp-elegant-item:nth-child(15) { grid-area: o; transition-delay: 0.85s; }
        .vp-elegant-item:nth-child(16) { grid-area: p; transition-delay: 0.9s; }
        .vp-elegant-item:nth-child(17) { grid-area: q; transition-delay: 0.95s; }
        .vp-elegant-item:nth-child(18) { grid-area: r; transition-delay: 1s; }
        .vp-elegant-item:nth-child(19) { grid-area: s; transition-delay: 1.05s; }
        .vp-elegant-item:nth-child(20) { grid-area: t; transition-delay: 1.1s; }

        .vp-elegant-item--visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .vp-elegant-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 20px;
          overflow: hidden;
          background: var(--glass);
          backdrop-filter: blur(20px);
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 0 25px 50px rgba(0,0,0,0.3);
        }

        .vp-elegant-inner:hover {
          transform: scale(1.03) translateY(-15px);
          box-shadow: 0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.2);
          background: rgba(201,168,76,0.08);
        }

        .vp-elegant-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          filter: brightness(0.85) contrast(1.1);
        }

        .vp-elegant-inner:hover .vp-elegant-img {
          filter: brightness(0.6) contrast(1.15) saturate(1.2);
          transform: scale(1.1);
        }

        /* Elegant glass overlay */
        .vp-glass-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, 
            rgba(201,168,76,0.1) 0%, 
            rgba(201,168,76,0.05) 50%, 
            transparent 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
          border-radius: 20px;
        }

        .vp-elegant-inner:hover .vp-glass-overlay {
          opacity: 1;
        }

        /* Content reveal - slides up beautifully */
        .vp-content-reveal {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(8,6,4,0.95) 0%, transparent 70%);
          transform: translateY(100%);
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          padding: 2.5rem 2rem 2rem;
        }

        .vp-elegant-inner:hover .vp-content-reveal {
          transform: translateY(0);
        }

        .vp-content-inner {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .vp-number {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--g-primary);
          letter-spacing: 0.3em;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.6s ease forwards;
          animation-delay: 0.2s;
        }

        .vp-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          font-weight: 300;
          color: #fff;
          line-height: 1.3;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.6s ease forwards;
          animation-delay: 0.3s;
        }

        .vp-line {
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, var(--g-primary), var(--g-light));
          opacity: 0;
          transform: scaleX(0);
          animation: expandLine 0.6s ease forwards;
          animation-delay: 0.4s;
        }

        .vp-view-text {
          font-size: 0.75rem;
          font-weight: 500;
          color: rgba(255,255,255,0.8);
          letter-spacing: 0.2em;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.6s ease forwards;
          animation-delay: 0.5s;
        }

        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expandLine {
          to {
            opacity: 1;
            transform: scaleX(1);
          }
        }

        /* Elegant frame lines */
        .vp-frame {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .vp-elegant-inner:hover .vp-frame {
          opacity: 1;
        }

        .vp-frame-line {
          position: absolute;
          background: var(--g-primary);
          box-shadow: 0 0 10px var(--g-glow);
          transition: all 0.5s ease;
        }

        .vp-frame-t { top: 0; left: 0; right: 0; height: 1px; }
        .vp-frame-r { top: 0; bottom: 0; right: 0; width: 1px; }
        .vp-frame-b { bottom: 0; left: 0; right: 0; height: 1px; }
        .vp-frame-l { top: 0; bottom: 0; left: 0; width: 1px; }

        /* ═══════════════════════════ LIGHTBOX (UNCHANGED) ═══════════════════════════ */
        .vp-lightbox {
          position: fixed; inset: 0;
          background: rgba(4,3,2,0.97);
          z-index: 2000;
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
          background: rgba(8,6,4,0.6);
          backdrop-filter: blur(10px);
        }
        .vp-lb-top-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem; font-style: italic; font-weight: 300;
          color: rgba(255,255,255,0.6);
        }
        .vp-lb-top-count {
          font-size: 0.7rem; font-weight: 600;
          letter-spacing: 0.2em; color: var(--g-primary);
        }
        .vp-lb-top-sep { color: rgba(201,168,76,0.3); }

        .vp-lb-close {
          position: absolute; top: 1rem; right: 1.8rem;
          width: 36px; height: 36px;
          background: rgba(201,168,76,0.08);
          border: 1px solid rgba(201,168,76,0.25);
          cursor: pointer;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          transition: all 0.3s ease;
          border-radius: 8px;
        }
        .vp-lb-close:hover {
          background: rgba(201,168,76,0.15);
          border-color: var(--g-primary);
        }
        .vp-lb-close-line {
          display: block; width: 16px; height: 1.5px;
          background: rgba(255,255,255,0.7);
        }
        .vp-lb-close-line:first-child { transform: rotate(45deg); }
        .vp-lb-close-line:last-child { transform: rotate(-45deg); }

        .vp-lb-nav {
          position: absolute; top: 50%; transform: translateY(-50%);
          background: rgba(8,6,4,0.7);
          border: 1px solid rgba(201,168,76,0.2);
          width: 52px; height: 80px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.3s ease;
          border-radius: 8px;
        }
        .vp-lb-nav:hover {
          border-color: var(--g-primary);
          background: rgba(201,168,76,0.08);
        }
        .vp-lb-nav-arrow {
          font-size: 2.2rem; color: rgba(255,255,255,0.5);
          transition: color 0.3s ease;
        }
        .vp-lb-nav:hover .vp-lb-nav-arrow { color: var(--g-light); }
        .vp-lb-prev { left: 1rem; }
        .vp-lb-next { right: 1rem; }

        .vp-lb-frame {
          display: flex; flex-direction: column;
          align-items: center;
          max-width: 82vw; max-height: 88vh;
          animation: lb-scale 0.38s cubic-bezier(0.34,1.4,0.64,1);
        }
        .vp-lb-frame--anim { animation: lb-switch 0.22s ease; }
        @keyframes lb-scale { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes lb-switch { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0; transform: scale(0.96); } 100% { opacity: 1; transform: scale(1); } }

        .vp-lb-img-wrap { position: relative; display: flex; }
        .vp-lb-img {
          max-width: 100%; max-height: 72vh;
          object-fit: contain;
          border: 1px solid rgba(201,168,76,0.15);
          border-radius: 12px;
          display: block;
        }

        .vp-lb-corner {
          position: absolute;
          width: 20px; height: 20px;
          border-style: solid; border-color: var(--g-primary);
          opacity: 0.7;
        }
        .vp-lb-tl { top: -4px; left: -4px; border-width: 1.5px 0 0 1.5px; }
        .vp-lb-tr { top: -4px; right: -4px; border-width: 1.5px 1.5px 0 0; }
        .vp-lb-bl { bottom: -4px; left: -4px; border-width: 0 0 1.5px 1.5px; }
        .vp-lb-br { bottom: -4px; right: -4px; border-width: 0 1.5px 1.5px 0; }

        .vp-lb-caption {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; margin-top: 1.4rem;
          gap: 1rem;
        }
        .vp-lb-cap-left { display: flex; align-items: center; gap: 1rem; }
        .vp-lb-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 300;
          color: rgba(201,168,76,0.2);
        }
        .vp-lb-cap-divider {
          width: 1px; height: 32px;
          background: linear-gradient(to bottom, transparent, rgba(201,168,76,0.3), transparent);
        }
        .vp-lb-cap-info { display: flex; flex-direction: column; gap: 0.2rem; }
        .vp-lb-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.05rem; font-style: italic; font-weight: 300;
          color: rgba(255,255,255,0.85);
        }
        .vp-lb-sub {
          font-size: 0.55rem; letter-spacing: 0.3em;
          color: rgba(201,168,76,0.5);
        }

        .vp-lb-dots {
          display: flex; gap: 0.3rem;
        }
        .vp-lb-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: rgba(255,255,255,0.2);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .vp-lb-dot--active {
          background: var(--g-primary);
          transform: scale(1.3);
          box-shadow: 0 0 8px var(--g-glow);
        }

        /* ═══════════════════════════ RESPONSIVE ═══════════════════════════ */
        @media (max-width: 1200px) {
          .vp-grid-container {
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(7, 240px);
            gap: 16px;
          }
        }

        @media (max-width: 768px) {
          .vp-grid-container {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(10, 200px);
            gap: 12px;
          }
          .vp-elegant-grid { padding: 0 1.5rem 4rem; }
        }

        @media (max-width: 480px) {
          .vp-grid-container {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(20, 220px);
            gap: 10px;
          }
          .vp-elegant-grid { padding: 0 1rem 3rem; }
          .vp-content-reveal { padding: 1.5rem 1.5rem 1.5rem; }
        }
      `}</style>
    </div>
  );
};

export default ViewPhotosPage;
