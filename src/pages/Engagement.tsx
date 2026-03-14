import React, { useState, useEffect, useRef } from "react";

const galleryItems = [
  { img: "/Images/img1.jpg", label: "First Glance",    span: "tall" },
  { img: "/Images/img2.jpg", label: "Ring Moment",     span: "normal" },
  { img: "/Images/img4.jpg", label: "Together",        span: "normal" },
  { img: "/Images/img3.jpg", label: "Golden Hour",     span: "wide" },
  { img: "/Images/img4.jpg", label: "Pure Joy",        span: "normal" },
  { img: "/Images/img5.jpg", label: "The Promise",     span: "tall" },
  { img: "/Images/img6.jpg", label: "Candid Love",     span: "normal" },
  { img: "/Images/img1.jpg", label: "Eternal Bond",    span: "tall" },
  { img: "/Images/img4.jpg", label: "In His Eyes",     span: "normal" },
  { img: "/Images/img2.jpg", label: "Laughter",        span: "normal" },
  { img: "/Images/img4.jpg", label: "Close to You",    span: "normal" },
  { img: "/Images/img3.jpg", label: "Sunset Kiss",     span: "wide" },
  { img: "/Images/img4.jpg", label: "Whispers",        span: "normal" },
  { img: "/Images/img5.jpg", label: "Our Story",       span: "tall" },
  { img: "/Images/img3.jpg", label: "Forever Begins",  span: "wide" },
  { img: "/Images/img6.jpg", label: "Just Us",         span: "normal" },
  { img: "/Images/img4.jpg", label: "Blissful",        span: "normal" },
];

const Page = () => {
  const [heroVisible, setHeroVisible]   = useState(false);
  const [lightbox, setLightbox]         = useState<number | null>(null);
  const [lbAnim, setLbAnim]             = useState(false);
  const [visible, setVisible]           = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = Number((e.target as HTMLElement).dataset.index);
          setVisible((prev) => new Set([...prev, idx]));
        }
      }),
      { threshold: 0.08 }
    );
    itemRefs.current.forEach((r) => r && observer.observe(r));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")     setLightbox(null);
      if (e.key === "ArrowRight") navLb(1);
      if (e.key === "ArrowLeft")  navLb(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  const openLb = (i: number) => { setLightbox(i); setLbAnim(true); setTimeout(() => setLbAnim(false), 400); };
  const navLb = (dir: 1 | -1, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLbAnim(true);
    setTimeout(() => {
      setLightbox((p) => p !== null ? (p + dir + galleryItems.length) % galleryItems.length : null);
      setLbAnim(false);
    }, 180);
  };

  return (
    <div className="eg-root">

      {/* ── HERO ── */}
      <div className={`eg-hero ${heroVisible ? "eg-hero--visible" : ""}`}>
        <img src="/Images/Backgrounds/background.jpg" alt="Engagement" className="eg-hero-img" />
        <div className="eg-hero-overlay" />

        <div className="eg-particles" aria-hidden="true">
          {[...Array(8)].map((_, i) => <span key={i} className={`eg-particle eg-p--${i + 1}`} />)}
        </div>

        <div className="eg-hero-content">
          <p className="eg-eyebrow">
            <span className="eg-ey-line" />
            EAGLE-VIEW PICTURES
            <span className="eg-ey-line eg-ey-line--r" />
          </p>

          <h1 className="eg-hero-title">Engagement</h1>

          <div className="eg-hero-rule">
            <span className="eg-rule-line" />
            <span className="eg-rule-gem" />
            <span className="eg-rule-line eg-rule-line--r" />
          </div>

          <p className="eg-hero-sub">
            Where two hearts begin their forever — every moment, beautifully told
          </p>
        </div>

        <div className="eg-scroll">
          <div className="eg-scroll-mouse"><span className="eg-scroll-wheel" /></div>
          <span className="eg-scroll-text">SCROLL</span>
        </div>
      </div>

      {/* ── SECTION LABEL ── */}
      <div className="eg-section-label">
        <span className="eg-lbl-line" />
        <div className="eg-lbl-center">
          <span className="eg-lbl-gem">✦</span>
          <span className="eg-lbl-text">MOMENTS</span>
          <span className="eg-lbl-gem">✦</span>
        </div>
        <span className="eg-lbl-line eg-lbl-line--r" />
      </div>

      {/* ── MASONRY GRID ── */}
      <div className="eg-grid">
        {galleryItems.map((item, i) => (
          <div
            key={i}
            data-index={i}
            ref={(el) => { itemRefs.current[i] = el; }}
            className={`eg-item eg-item--${item.span} ${visible.has(i) ? "eg-item--visible" : ""}`}
            style={{ transitionDelay: `${(i % 5) * 0.07}s` }}
            onClick={() => openLb(i)}
          >
            <div className="eg-item-inner">
              <img src={item.img} alt={item.label} className="eg-img" />
              <div className="eg-shimmer" />

              <div className="eg-overlay">
                <div className="eg-overlay-body">
                  <span className="eg-overlay-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="eg-overlay-label">{item.label}</span>
                  <span className="eg-overlay-bar" />
                  <span className="eg-overlay-view">View Full &nbsp;↗</span>
                </div>
              </div>

              <span className="eg-corner eg-tl" />
              <span className="eg-corner eg-tr" />
              <span className="eg-corner eg-bl" />
              <span className="eg-corner eg-br" />
              <div className="eg-top-bar" />
            </div>
          </div>
        ))}
      </div>

      {/* ── FOOTER ORNAMENT ── */}
      <div className="eg-footer-orn">
        <span className="eg-fo-line" />
        <span className="eg-fo-gem">✦</span>
        <span className="eg-fo-text">Every frame is a heartbeat</span>
        <span className="eg-fo-gem">✦</span>
        <span className="eg-fo-line" />
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox !== null && (
        <div className="eg-lb" onClick={() => setLightbox(null)}>
          <div className="eg-lb-topbar">
            <span className="eg-lb-top-label">{galleryItems[lightbox].label}</span>
            <span className="eg-lb-top-count">
              {String(lightbox + 1).padStart(2, "0")}
              <span className="eg-lb-top-sep"> / </span>
              {String(galleryItems.length).padStart(2, "0")}
            </span>
          </div>

          <button className="eg-lb-close" onClick={() => setLightbox(null)}>
            <span className="eg-lb-x" /><span className="eg-lb-x" />
          </button>

          <button className="eg-lb-nav eg-lb-prev" onClick={(e) => navLb(-1, e)}>
            <span className="eg-lb-arrow">‹</span>
          </button>

          <div className={`eg-lb-frame ${lbAnim ? "eg-lb-frame--anim" : ""}`} onClick={(e) => e.stopPropagation()}>
            <div className="eg-lb-img-wrap">
              <img src={galleryItems[lightbox].img} alt={galleryItems[lightbox].label} className="eg-lb-img" />
              <span className="eg-lb-corner eg-lb-tl" />
              <span className="eg-lb-corner eg-lb-tr" />
              <span className="eg-lb-corner eg-lb-bl" />
              <span className="eg-lb-corner eg-lb-br" />
            </div>
            <div className="eg-lb-caption">
              <div className="eg-lb-cap-left">
                <span className="eg-lb-num">{String(lightbox + 1).padStart(2, "0")}</span>
                <div className="eg-lb-cap-div" />
                <div className="eg-lb-cap-info">
                  <span className="eg-lb-label">{galleryItems[lightbox].label}</span>
                  <span className="eg-lb-sub">Eagle View Photography</span>
                </div>
              </div>
              <div className="eg-lb-dots">
                {galleryItems.map((_, di) => (
                  <button key={di}
                    className={`eg-lb-dot ${di === lightbox ? "eg-lb-dot--active" : ""}`}
                    onClick={(e) => { e.stopPropagation(); openLb(di); }}
                  />
                ))}
              </div>
            </div>
          </div>

          <button className="eg-lb-nav eg-lb-next" onClick={(e) => navLb(1, e)}>
            <span className="eg-lb-arrow">›</span>
          </button>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Great+Vibes&family=Montserrat:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --g-primary: #C9A84C;
          --g-light:   #E8C96A;
          --g-pale:    #F5DFA0;
          --g-deep:    #9A7228;
          --g-glow:    rgba(201,168,76,0.6);
          --g-glow-sm: rgba(201,168,76,0.3);
          --g-border:  rgba(201,168,76,0.3);
          --bg:        #080604;
        }

        .eg-root {
          background: var(--bg);
          min-height: 100vh;
          font-family: 'Montserrat', sans-serif;
          color: #fff;
        }

        /* ══ HERO ══ */
        .eg-hero {
          position: relative; height: 80vh; min-height: 560px;
          overflow: hidden; opacity: 0; transition: opacity 1.1s ease;
        }
        .eg-hero--visible { opacity: 1; }
        .eg-hero-img {
          width: 100%; height: 100%; object-fit: cover;
          transform: scale(1.1);
          animation: eg-zoom 14s cubic-bezier(0.25,0.46,0.45,0.94) forwards;
          filter: brightness(0.4) sepia(0.12);
        }
        @keyframes eg-zoom { to { transform: scale(1); } }
        .eg-hero-overlay {
          position: absolute; inset: 0;
          background:
            linear-gradient(to bottom, rgba(8,6,4,0.15) 0%, rgba(8,6,4,0.38) 50%, rgba(8,6,4,0.93) 100%),
            radial-gradient(ellipse at 50% 55%, rgba(201,168,76,0.04) 0%, transparent 65%);
        }

        /* Particles */
        .eg-particles { position: absolute; inset: 0; pointer-events: none; }
        .eg-particle {
          position: absolute; width: 2px; height: 2px; border-radius: 50%;
          background: var(--g-primary); opacity: 0; animation: eg-float 9s ease infinite;
        }
        .eg-p--1{left:12%;animation-delay:0s;animation-duration:9s}
        .eg-p--2{left:28%;animation-delay:1.5s;animation-duration:11s}
        .eg-p--3{left:48%;animation-delay:3s;animation-duration:8s}
        .eg-p--4{left:63%;animation-delay:0.7s;animation-duration:10s}
        .eg-p--5{left:78%;animation-delay:2s;animation-duration:9s}
        .eg-p--6{left:20%;animation-delay:4s;animation-duration:12s}
        .eg-p--7{left:68%;animation-delay:1s;animation-duration:7s}
        .eg-p--8{left:43%;animation-delay:5s;animation-duration:10s}
        @keyframes eg-float {
          0%  {bottom:5%;opacity:0;transform:translateX(0) scale(1)}
          20% {opacity:0.6}
          80% {opacity:0.3}
          100%{bottom:92%;opacity:0;transform:translateX(18px) scale(0.4)}
        }

        /* Hero content */
        .eg-hero-content {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center; padding: 2rem;
          animation: eg-fade 1.6s ease 0.4s both;
        }
        @keyframes eg-fade {
          from { opacity:0; transform:translateY(26px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .eg-eyebrow {
          display: inline-flex; align-items: center; gap: 0.9rem;
          font-size: 0.6rem; letter-spacing: 0.55em;
          color: #ffffff; margin-bottom: 1.4rem; font-weight: 600;
        }
        .eg-ey-line {
          display: block; width: 35px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--g-primary));
        }
        .eg-ey-line--r { background: linear-gradient(90deg, var(--g-primary), transparent); }
        .eg-hero-title {
          font-family: 'Great Vibes', cursive;
          font-size: clamp(3.5rem, 9vw, 7rem);
          font-weight: 400; line-height: 1.05; color: #ffffff;
          margin-bottom: 1.6rem;
          text-shadow: 0 4px 40px rgba(0,0,0,0.4);
          animation: eg-shimmer 4s ease 2s infinite;
        }
        @keyframes eg-shimmer {
          0%,100% { text-shadow: 0 4px 40px rgba(0,0,0,0.4); }
          50%     { text-shadow: 0 4px 40px rgba(0,0,0,0.4), 0 0 60px rgba(201,168,76,0.1); }
        }
        .eg-hero-rule {
          display: flex; align-items: center; gap: 1rem; margin-bottom: 1.4rem;
        }
        .eg-rule-line {
          display: block; width: 70px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--g-primary));
        }
        .eg-rule-line--r { background: linear-gradient(90deg, var(--g-primary), transparent); }
        .eg-rule-gem {
          display: block; width: 7px; height: 7px;
          background: var(--g-primary); transform: rotate(45deg);
          animation: eg-gem 2s ease infinite;
        }
        @keyframes eg-gem {
          0%,100% { box-shadow: 0 0 12px var(--g-glow), 0 0 28px var(--g-glow); }
          50%     { box-shadow: 0 0 20px var(--g-glow), 0 0 50px rgba(201,168,76,0.45); }
        }
        .eg-hero-sub {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1rem, 2vw, 1.4rem);
          font-weight: 300; font-style: italic;
          color: rgba(255,255,255,0.72); letter-spacing: 0.05em;
        }

        /* Scroll */
        .eg-scroll {
          position: absolute; bottom: 2.2rem; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
          animation: eg-bob 2.5s ease infinite;
        }
        @keyframes eg-bob {
          0%,100% { transform: translateX(-50%) translateY(0); }
          50%     { transform: translateX(-50%) translateY(7px); }
        }
        .eg-scroll-mouse {
          width: 22px; height: 34px;
          border: 1.5px solid rgba(201,168,76,0.4); border-radius: 11px;
          display: flex; justify-content: center; padding-top: 6px;
        }
        .eg-scroll-wheel {
          width: 2px; height: 7px; border-radius: 2px; background: var(--g-primary);
          animation: eg-wheel 1.8s ease infinite;
        }
        @keyframes eg-wheel {
          0%   { opacity:1; transform:translateY(0); }
          100% { opacity:0; transform:translateY(10px); }
        }
        .eg-scroll-text { font-size: 0.45rem; letter-spacing: 0.5em; color: rgba(201,168,76,0.45); }

        /* ══ SECTION LABEL ══ */
        .eg-section-label {
          display: flex; align-items: center; justify-content: center;
          gap: 1.5rem; padding: 3.5rem 3rem 2.5rem;
        }
        .eg-lbl-line {
          flex: 1; max-width: 140px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.2));
        }
        .eg-lbl-line--r { background: linear-gradient(90deg, rgba(201,168,76,0.2), transparent); }
        .eg-lbl-center { display: flex; align-items: center; gap: 0.8rem; }
        .eg-lbl-gem { font-size: 0.38rem; color: var(--g-primary); opacity: 0.6; }
        .eg-lbl-text { font-size: 0.58rem; letter-spacing: 0.55em; color: rgba(255,255,255,0.35); font-weight: 600; }

        /* ══ MASONRY GRID ══ */
        .eg-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 220px;
          gap: 5px;
          padding: 0 2.5rem 3rem;
          max-width: 1600px; margin: 0 auto;
        }

        .eg-item {
          opacity: 0;
          transform: translateY(28px) scale(0.97);
          transition: opacity 0.65s ease, transform 0.65s ease;
          cursor: pointer;
        }
        .eg-item--visible { opacity: 1; transform: translateY(0) scale(1); }
        .eg-item--tall    { grid-row: span 2; }
        .eg-item--wide    { grid-column: span 2; }

        .eg-item-inner {
          position: relative; width: 100%; height: 100%; overflow: hidden;
        }
        .eg-img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s ease;
          filter: brightness(0.82) sepia(0.08);
        }
        .eg-item-inner:hover .eg-img {
          transform: scale(1.07);
          filter: brightness(0.5) sepia(0.05);
        }

        /* Shimmer */
        .eg-shimmer {
          position: absolute; inset: 0;
          background: linear-gradient(110deg, transparent 38%, rgba(201,168,76,0.07) 50%, transparent 62%);
          transform: translateX(-100%); pointer-events: none;
        }
        .eg-item-inner:hover .eg-shimmer {
          transform: translateX(100%);
          transition: transform 0.75s ease;
        }

        /* Hover overlay */
        .eg-overlay {
          position: absolute; inset: 0;
          display: flex; align-items: flex-end; padding: 1.3rem 1.5rem;
          background: linear-gradient(to top, rgba(8,6,4,0.78) 0%, transparent 58%);
          opacity: 0; transition: opacity 0.4s ease;
        }
        .eg-item-inner:hover .eg-overlay { opacity: 1; }
        .eg-overlay-body {
          display: flex; flex-direction: column; gap: 0.28rem;
          transform: translateY(10px);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .eg-item-inner:hover .eg-overlay-body { transform: translateY(0); }
        .eg-overlay-num {
          font-size: 0.52rem; letter-spacing: 0.4em;
          color: var(--g-primary); font-weight: 600;
        }
        .eg-overlay-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem; color: #fff; font-style: italic; font-weight: 300;
        }
        .eg-overlay-bar {
          display: block; width: 28px; height: 1px;
          background: linear-gradient(90deg, var(--g-primary), var(--g-light));
          box-shadow: 0 0 5px var(--g-glow-sm);
        }
        .eg-overlay-view {
          font-size: 0.56rem; letter-spacing: 0.18em;
          color: rgba(255,255,255,0.52);
        }

        /* Corner brackets */
        .eg-corner {
          position: absolute; width: 0; height: 0;
          border-style: solid; border-color: transparent;
          transition: width 0.35s ease, height 0.35s ease, border-color 0.35s ease;
          pointer-events: none;
        }
        .eg-tl { top:0; left:0;   border-width: 1.5px 0 0 1.5px; }
        .eg-tr { top:0; right:0;  border-width: 1.5px 1.5px 0 0; }
        .eg-bl { bottom:0; left:0;  border-width: 0 0 1.5px 1.5px; }
        .eg-br { bottom:0; right:0; border-width: 0 1.5px 1.5px 0; }
        .eg-item-inner:hover .eg-corner {
          width: 22px; height: 22px; border-color: var(--g-primary);
          filter: drop-shadow(0 0 4px rgba(201,168,76,0.8));
        }

        /* Top bar */
        .eg-top-bar {
          position: absolute; top:0; left:0; right:0; height: 2px;
          background: linear-gradient(90deg, transparent, var(--g-primary), transparent);
          box-shadow: 0 0 10px var(--g-glow);
          opacity: 0; transition: opacity 0.4s ease;
        }
        .eg-item-inner:hover .eg-top-bar { opacity: 1; }

        /* ══ FOOTER ORNAMENT ══ */
        .eg-footer-orn {
          display: flex; align-items: center; justify-content: center;
          gap: 1rem; padding: 2.5rem 3rem 4rem;
        }
        .eg-fo-line { flex: 1; max-width: 100px; height: 1px; background: rgba(201,168,76,0.1); }
        .eg-fo-gem  { font-size: 0.38rem; color: var(--g-deep); opacity: 0.6; }
        .eg-fo-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.9rem, 1.5vw, 1rem); font-style: italic; font-weight: 300;
          color: rgba(255,255,255,0.22); letter-spacing: 0.06em;
        }

        /* ══ LIGHTBOX ══ */
        .eg-lb {
          position: fixed; inset: 0; background: rgba(4,3,2,0.97);
          z-index: 2000; display: flex; align-items: center; justify-content: center;
          animation: eg-lb-in 0.35s ease; backdrop-filter: blur(12px);
        }
        @keyframes eg-lb-in { from { opacity:0; } to { opacity:1; } }

        .eg-lb-topbar {
          position: absolute; top:0; left:0; right:0;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.2rem 2rem;
          border-bottom: 1px solid rgba(201,168,76,0.1);
          background: rgba(8,6,4,0.6); backdrop-filter: blur(10px);
        }
        .eg-lb-top-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem; font-style: italic; font-weight: 300;
          color: rgba(255,255,255,0.6);
        }
        .eg-lb-top-count { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.2em; color: var(--g-primary); }
        .eg-lb-top-sep { color: rgba(201,168,76,0.3); }

        .eg-lb-close {
          position: absolute; top: 1rem; right: 1.8rem;
          width: 36px; height: 36px;
          background: rgba(201,168,76,0.08); border: 1px solid rgba(201,168,76,0.25);
          cursor: pointer; z-index: 10;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          transition: background 0.3s, border-color 0.3s;
        }
        .eg-lb-close:hover { background: rgba(201,168,76,0.15); border-color: var(--g-primary); }
        .eg-lb-x {
          display: block; width: 16px; height: 1.5px;
          background: rgba(255,255,255,0.7); transition: background 0.3s;
        }
        .eg-lb-x:first-child  { transform: rotate(45deg) translate(1px,1px); }
        .eg-lb-x:last-child   { transform: rotate(-45deg) translate(1px,-1px); }
        .eg-lb-close:hover .eg-lb-x { background: var(--g-light); }

        .eg-lb-nav {
          position: absolute; top: 50%; transform: translateY(-50%);
          background: rgba(8,6,4,0.7); border: 1px solid rgba(201,168,76,0.2);
          width: 52px; height: 80px; cursor: pointer; z-index: 10;
          display: flex; align-items: center; justify-content: center;
          transition: border-color 0.3s, background 0.3s;
        }
        .eg-lb-nav:hover { border-color: var(--g-primary); background: rgba(201,168,76,0.08); }
        .eg-lb-arrow { font-size: 2.2rem; color: rgba(255,255,255,0.5); transition: color 0.3s, transform 0.3s; line-height:1; }
        .eg-lb-nav:hover .eg-lb-arrow { color: var(--g-light); }
        .eg-lb-prev { left: 1rem; }
        .eg-lb-prev:hover .eg-lb-arrow { transform: translateX(-3px); }
        .eg-lb-next { right: 1rem; }
        .eg-lb-next:hover .eg-lb-arrow { transform: translateX(3px); }

        .eg-lb-frame {
          display: flex; flex-direction: column; align-items: center;
          max-width: 82vw; max-height: 88vh;
          animation: eg-lb-scale 0.38s cubic-bezier(0.34,1.4,0.64,1);
        }
        .eg-lb-frame--anim { animation: eg-lb-switch 0.22s ease; }
        @keyframes eg-lb-scale { from { transform:scale(0.9); opacity:0; } to { transform:scale(1); opacity:1; } }
        @keyframes eg-lb-switch {
          0%  { opacity:1; transform:scale(1); }
          50% { opacity:0; transform:scale(0.96); }
          100%{ opacity:1; transform:scale(1); }
        }

        .eg-lb-img-wrap { position: relative; display: flex; }
        .eg-lb-img {
          max-width: 100%; max-height: 72vh; object-fit: contain;
          border: 1px solid rgba(201,168,76,0.15); display: block;
        }
        .eg-lb-corner {
          position: absolute; width: 20px; height: 20px;
          border-style: solid; border-color: var(--g-primary); opacity: 0.7; pointer-events: none;
        }
        .eg-lb-tl { top:-4px; left:-4px;   border-width: 1.5px 0 0 1.5px; }
        .eg-lb-tr { top:-4px; right:-4px;  border-width: 1.5px 1.5px 0 0; }
        .eg-lb-bl { bottom:-4px; left:-4px;  border-width: 0 0 1.5px 1.5px; }
        .eg-lb-br { bottom:-4px; right:-4px; border-width: 0 1.5px 1.5px 0; }

        .eg-lb-caption {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; margin-top: 1.4rem; padding: 0 0.2rem; gap: 1rem;
        }
        .eg-lb-cap-left { display: flex; align-items: center; gap: 1rem; }
        .eg-lb-num {
          font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 300;
          color: rgba(201,168,76,0.2); line-height: 1;
        }
        .eg-lb-cap-div {
          width: 1px; height: 32px;
          background: linear-gradient(to bottom, transparent, rgba(201,168,76,0.3), transparent);
        }
        .eg-lb-cap-info { display: flex; flex-direction: column; gap: 0.2rem; }
        .eg-lb-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.05rem; font-style: italic; font-weight: 300;
          color: rgba(255,255,255,0.85);
        }
        .eg-lb-sub { font-size: 0.55rem; letter-spacing: 0.3em; color: rgba(201,168,76,0.5); }
        .eg-lb-dots {
          display: flex; gap: 0.3rem; flex-wrap: wrap;
          max-width: 200px; justify-content: flex-end;
        }
        .eg-lb-dot {
          width: 5px; height: 5px; border-radius: 50%; border: none;
          background: rgba(255,255,255,0.12); cursor: pointer;
          transition: background 0.3s, transform 0.3s;
        }
        .eg-lb-dot--active {
          background: var(--g-primary); transform: scale(1.4);
          box-shadow: 0 0 5px var(--g-glow-sm);
        }

        /* ══ RESPONSIVE ══ */
        @media (max-width: 900px) {
          .eg-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 180px; padding: 0 1.5rem 3rem; }
          .eg-lb-dots { display: none; }
        }
        @media (max-width: 560px) {
          .eg-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 140px; gap: 3px; padding: 0 0.8rem 2.5rem; }
          .eg-section-label { padding: 2.5rem 1.5rem 1.5rem; }
          .eg-lb-prev { left: 0.3rem; }
          .eg-lb-next { right: 0.3rem; }
          .eg-lb-frame { max-width: 94vw; }
          .eg-lb-num, .eg-lb-cap-div { display: none; }
        }
      `}</style>
    </div>
  );
};

export default Page;