import React, { useState, useEffect, useRef } from "react";

const galleryItems = [
  { img: "/Images/img1.jpg", label: "First Chapter",    span: "tall" },
  { img: "/Images/img2.jpg", label: "Golden Light",     span: "normal" },
  { img: "/Images/img4.jpg", label: "Stolen Glance",    span: "normal" },
  { img: "/Images/img3.jpg", label: "Chasing Sunsets",  span: "wide" },
  { img: "/Images/img4.jpg", label: "Just the Two",     span: "normal" },
  { img: "/Images/img5.jpg", label: "Soft Whispers",    span: "tall" },
  { img: "/Images/img6.jpg", label: "Wanderlust",       span: "normal" },
  { img: "/Images/img1.jpg", label: "Forever Young",    span: "tall" },
  { img: "/Images/img4.jpg", label: "Open Roads",       span: "normal" },
  { img: "/Images/img2.jpg", label: "Dream Together",   span: "normal" },
  { img: "/Images/img4.jpg", label: "Wild Hearts",      span: "normal" },
  { img: "/Images/img3.jpg", label: "Before Forever",   span: "wide" },
  { img: "/Images/img4.jpg", label: "Timeless",         span: "normal" },
  { img: "/Images/img5.jpg", label: "Barefoot Love",    span: "tall" },
  { img: "/Images/img3.jpg", label: "Into the Light",   span: "wide" },
  { img: "/Images/img6.jpg", label: "Unscripted",       span: "normal" },
  { img: "/Images/img4.jpg", label: "Our Story",        span: "normal" },
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
    <div className="pw-root">

      {/* ── HERO ── */}
      <div className={`pw-hero ${heroVisible ? "pw-hero--visible" : ""}`}>
        <img src="/Images/Backgrounds/background.jpg" alt="Pre-Wedding" className="pw-hero-img" />
        <div className="pw-hero-overlay" />

        <div className="pw-particles" aria-hidden="true">
          {[...Array(8)].map((_, i) => <span key={i} className={`pw-particle pw-p--${i + 1}`} />)}
        </div>

        <div className="pw-hero-content">
          <p className="pw-eyebrow">
            <span className="pw-ey-line" />
            EAGLE-VIEW PICTURES
            <span className="pw-ey-line pw-ey-line--r" />
          </p>

          <h1 className="pw-hero-title">Pre-Wedding Shoots</h1>

          <div className="pw-hero-rule">
            <span className="pw-rule-line" />
            <span className="pw-rule-gem" />
            <span className="pw-rule-line pw-rule-line--r" />
          </div>

          <p className="pw-hero-sub">
            Chasing light, chasing love — beautifully told before the big day
          </p>
        </div>

        <div className="pw-scroll">
          <div className="pw-scroll-mouse"><span className="pw-scroll-wheel" /></div>
          <span className="pw-scroll-text">SCROLL</span>
        </div>
      </div>

      {/* ── SECTION LABEL ── */}
      <div className="pw-section-label">
        <span className="pw-lbl-line" />
        <div className="pw-lbl-center">
          <span className="pw-lbl-gem">✦</span>
          <span className="pw-lbl-text">MOMENTS</span>
          <span className="pw-lbl-gem">✦</span>
        </div>
        <span className="pw-lbl-line pw-lbl-line--r" />
      </div>

      {/* ── MASONRY GRID ── */}
      <div className="pw-grid">
        {galleryItems.map((item, i) => (
          <div
            key={i}
            data-index={i}
            ref={(el) => { itemRefs.current[i] = el; }}
            className={`pw-item pw-item--${item.span} ${visible.has(i) ? "pw-item--visible" : ""}`}
            style={{ transitionDelay: `${(i % 5) * 0.07}s` }}
            onClick={() => openLb(i)}
          >
            <div className="pw-item-inner">
              <img src={item.img} alt={item.label} className="pw-img" />
              <div className="pw-shimmer" />

              <div className="pw-overlay">
                <div className="pw-overlay-body">
                  <span className="pw-overlay-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="pw-overlay-label">{item.label}</span>
                  <span className="pw-overlay-bar" />
                  <span className="pw-overlay-view">View Full &nbsp;↗</span>
                </div>
              </div>

              <span className="pw-corner pw-tl" />
              <span className="pw-corner pw-tr" />
              <span className="pw-corner pw-bl" />
              <span className="pw-corner pw-br" />
              <div className="pw-top-bar" />
            </div>
          </div>
        ))}
      </div>

      {/* ── FOOTER ORNAMENT ── */}
      <div className="pw-footer-orn">
        <span className="pw-fo-line" />
        <span className="pw-fo-gem">✦</span>
        <span className="pw-fo-text">Every frame is a heartbeat</span>
        <span className="pw-fo-gem">✦</span>
        <span className="pw-fo-line" />
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox !== null && (
        <div className="pw-lb" onClick={() => setLightbox(null)}>
          <div className="pw-lb-topbar">
            <span className="pw-lb-top-label">{galleryItems[lightbox].label}</span>
            <span className="pw-lb-top-count">
              {String(lightbox + 1).padStart(2, "0")}
              <span className="pw-lb-top-sep"> / </span>
              {String(galleryItems.length).padStart(2, "0")}
            </span>
          </div>

          <button className="pw-lb-close" onClick={() => setLightbox(null)}>
            <span className="pw-lb-x" /><span className="pw-lb-x" />
          </button>

          <button className="pw-lb-nav pw-lb-prev" onClick={(e) => navLb(-1, e)}>
            <span className="pw-lb-arrow">‹</span>
          </button>

          <div className={`pw-lb-frame ${lbAnim ? "pw-lb-frame--anim" : ""}`} onClick={(e) => e.stopPropagation()}>
            <div className="pw-lb-img-wrap">
              <img src={galleryItems[lightbox].img} alt={galleryItems[lightbox].label} className="pw-lb-img" />
              <span className="pw-lb-corner pw-lb-tl" />
              <span className="pw-lb-corner pw-lb-tr" />
              <span className="pw-lb-corner pw-lb-bl" />
              <span className="pw-lb-corner pw-lb-br" />
            </div>
            <div className="pw-lb-caption">
              <div className="pw-lb-cap-left">
                <span className="pw-lb-num">{String(lightbox + 1).padStart(2, "0")}</span>
                <div className="pw-lb-cap-div" />
                <div className="pw-lb-cap-info">
                  <span className="pw-lb-label">{galleryItems[lightbox].label}</span>
                  <span className="pw-lb-sub">Eagle View Photography</span>
                </div>
              </div>
              <div className="pw-lb-dots">
                {galleryItems.map((_, di) => (
                  <button key={di}
                    className={`pw-lb-dot ${di === lightbox ? "pw-lb-dot--active" : ""}`}
                    onClick={(e) => { e.stopPropagation(); openLb(di); }}
                  />
                ))}
              </div>
            </div>
          </div>

          <button className="pw-lb-nav pw-lb-next" onClick={(e) => navLb(1, e)}>
            <span className="pw-lb-arrow">›</span>
          </button>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Great+Vibes&family=Montserrat:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --g-primary: #C9A84C;
          --g-light:   #E8C96A;
          --g-deep:    #9A7228;
          --g-glow:    rgba(201,168,76,0.6);
          --g-glow-sm: rgba(201,168,76,0.3);
          --bg:        #080604;
        }

        .pw-root {
          background: var(--bg);
          min-height: 100vh;
          font-family: 'Montserrat', sans-serif;
          color: #fff;
        }

        /* ══ HERO ══ */
        .pw-hero {
          position: relative; height: 80vh; min-height: 560px;
          overflow: hidden; opacity: 0; transition: opacity 1.1s ease;
        }
        .pw-hero--visible { opacity: 1; }
        .pw-hero-img {
          width: 100%; height: 100%; object-fit: cover;
          transform: scale(1.1);
          animation: pw-zoom 14s cubic-bezier(0.25,0.46,0.45,0.94) forwards;
          filter: brightness(0.4) sepia(0.12);
        }
        @keyframes pw-zoom { to { transform: scale(1); } }
        .pw-hero-overlay {
          position: absolute; inset: 0;
          background:
            linear-gradient(to bottom, rgba(8,6,4,0.15) 0%, rgba(8,6,4,0.38) 50%, rgba(8,6,4,0.93) 100%),
            radial-gradient(ellipse at 50% 55%, rgba(201,168,76,0.04) 0%, transparent 65%);
        }

        /* Particles */
        .pw-particles { position: absolute; inset: 0; pointer-events: none; }
        .pw-particle {
          position: absolute; width: 2px; height: 2px; border-radius: 50%;
          background: var(--g-primary); opacity: 0; animation: pw-float 9s ease infinite;
        }
        .pw-p--1{left:12%;animation-delay:0s;animation-duration:9s}
        .pw-p--2{left:28%;animation-delay:1.5s;animation-duration:11s}
        .pw-p--3{left:48%;animation-delay:3s;animation-duration:8s}
        .pw-p--4{left:63%;animation-delay:0.7s;animation-duration:10s}
        .pw-p--5{left:78%;animation-delay:2s;animation-duration:9s}
        .pw-p--6{left:20%;animation-delay:4s;animation-duration:12s}
        .pw-p--7{left:68%;animation-delay:1s;animation-duration:7s}
        .pw-p--8{left:43%;animation-delay:5s;animation-duration:10s}
        @keyframes pw-float {
          0%  {bottom:5%;opacity:0;transform:translateX(0) scale(1)}
          20% {opacity:0.6} 80% {opacity:0.3}
          100%{bottom:92%;opacity:0;transform:translateX(18px) scale(0.4)}
        }

        .pw-hero-content {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center; padding: 2rem;
          animation: pw-fade 1.6s ease 0.4s both;
        }
        @keyframes pw-fade {
          from { opacity:0; transform:translateY(26px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .pw-eyebrow {
          display: inline-flex; align-items: center; gap: 0.9rem;
          font-size: 0.6rem; letter-spacing: 0.55em;
          color: #ffffff; margin-bottom: 1.4rem; font-weight: 600;
        }
        .pw-ey-line {
          display: block; width: 35px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--g-primary));
        }
        .pw-ey-line--r { background: linear-gradient(90deg, var(--g-primary), transparent); }
        .pw-hero-title {
          font-family: 'Great Vibes', cursive;
          font-size: clamp(3rem, 8vw, 6.5rem);
          font-weight: 400; line-height: 1.05; color: #ffffff;
          margin-bottom: 1.6rem;
          text-shadow: 0 4px 40px rgba(0,0,0,0.4);
          animation: pw-shimmer 4s ease 2s infinite;
        }
        @keyframes pw-shimmer {
          0%,100% { text-shadow: 0 4px 40px rgba(0,0,0,0.4); }
          50%     { text-shadow: 0 4px 40px rgba(0,0,0,0.4), 0 0 60px rgba(201,168,76,0.1); }
        }
        .pw-hero-rule { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.4rem; }
        .pw-rule-line {
          display: block; width: 70px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--g-primary));
        }
        .pw-rule-line--r { background: linear-gradient(90deg, var(--g-primary), transparent); }
        .pw-rule-gem {
          display: block; width: 7px; height: 7px;
          background: var(--g-primary); transform: rotate(45deg);
          animation: pw-gem 2s ease infinite;
        }
        @keyframes pw-gem {
          0%,100% { box-shadow: 0 0 12px var(--g-glow), 0 0 28px var(--g-glow); }
          50%     { box-shadow: 0 0 20px var(--g-glow), 0 0 50px rgba(201,168,76,0.45); }
        }
        .pw-hero-sub {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1rem, 2vw, 1.4rem);
          font-weight: 300; font-style: italic;
          color: rgba(255,255,255,0.72); letter-spacing: 0.05em;
        }

        /* Scroll */
        .pw-scroll {
          position: absolute; bottom: 2.2rem; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
          animation: pw-bob 2.5s ease infinite;
        }
        @keyframes pw-bob {
          0%,100% { transform: translateX(-50%) translateY(0); }
          50%     { transform: translateX(-50%) translateY(7px); }
        }
        .pw-scroll-mouse {
          width: 22px; height: 34px;
          border: 1.5px solid rgba(201,168,76,0.4); border-radius: 11px;
          display: flex; justify-content: center; padding-top: 6px;
        }
        .pw-scroll-wheel {
          width: 2px; height: 7px; border-radius: 2px; background: var(--g-primary);
          animation: pw-wheel 1.8s ease infinite;
        }
        @keyframes pw-wheel {
          0%   { opacity:1; transform:translateY(0); }
          100% { opacity:0; transform:translateY(10px); }
        }
        .pw-scroll-text { font-size: 0.45rem; letter-spacing: 0.5em; color: rgba(201,168,76,0.45); }

        /* ══ SECTION LABEL ══ */
        .pw-section-label {
          display: flex; align-items: center; justify-content: center;
          gap: 1.5rem; padding: 3.5rem 3rem 2.5rem;
        }
        .pw-lbl-line {
          flex: 1; max-width: 140px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.2));
        }
        .pw-lbl-line--r { background: linear-gradient(90deg, rgba(201,168,76,0.2), transparent); }
        .pw-lbl-center { display: flex; align-items: center; gap: 0.8rem; }
        .pw-lbl-gem { font-size: 0.38rem; color: var(--g-primary); opacity: 0.6; }
        .pw-lbl-text { font-size: 0.58rem; letter-spacing: 0.55em; color: rgba(255,255,255,0.35); font-weight: 600; }

        /* ══ GRID ══ */
        .pw-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 220px;
          gap: 5px;
          padding: 0 2.5rem 3rem;
          max-width: 1600px; margin: 0 auto;
        }
        .pw-item {
          opacity: 0; transform: translateY(28px) scale(0.97);
          transition: opacity 0.65s ease, transform 0.65s ease;
          cursor: pointer;
        }
        .pw-item--visible { opacity: 1; transform: translateY(0) scale(1); }
        .pw-item--tall    { grid-row: span 2; }
        .pw-item--wide    { grid-column: span 2; }

        .pw-item-inner { position: relative; width: 100%; height: 100%; overflow: hidden; }
        .pw-img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s ease;
          filter: brightness(0.82) sepia(0.08);
        }
        .pw-item-inner:hover .pw-img { transform: scale(1.07); filter: brightness(0.5) sepia(0.05); }

        .pw-shimmer {
          position: absolute; inset: 0;
          background: linear-gradient(110deg, transparent 38%, rgba(201,168,76,0.07) 50%, transparent 62%);
          transform: translateX(-100%); pointer-events: none;
        }
        .pw-item-inner:hover .pw-shimmer { transform: translateX(100%); transition: transform 0.75s ease; }

        .pw-overlay {
          position: absolute; inset: 0;
          display: flex; align-items: flex-end; padding: 1.3rem 1.5rem;
          background: linear-gradient(to top, rgba(8,6,4,0.78) 0%, transparent 58%);
          opacity: 0; transition: opacity 0.4s ease;
        }
        .pw-item-inner:hover .pw-overlay { opacity: 1; }
        .pw-overlay-body {
          display: flex; flex-direction: column; gap: 0.28rem;
          transform: translateY(10px);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .pw-item-inner:hover .pw-overlay-body { transform: translateY(0); }
        .pw-overlay-num { font-size: 0.52rem; letter-spacing: 0.4em; color: var(--g-primary); font-weight: 600; }
        .pw-overlay-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem; color: #fff; font-style: italic; font-weight: 300;
        }
        .pw-overlay-bar {
          display: block; width: 28px; height: 1px;
          background: linear-gradient(90deg, var(--g-primary), var(--g-light));
          box-shadow: 0 0 5px var(--g-glow-sm);
        }
        .pw-overlay-view { font-size: 0.56rem; letter-spacing: 0.18em; color: rgba(255,255,255,0.52); }

        /* Corner brackets */
        .pw-corner {
          position: absolute; width: 0; height: 0;
          border-style: solid; border-color: transparent;
          transition: width 0.35s ease, height 0.35s ease, border-color 0.35s ease;
          pointer-events: none;
        }
        .pw-tl{top:0;left:0;border-width:1.5px 0 0 1.5px}
        .pw-tr{top:0;right:0;border-width:1.5px 1.5px 0 0}
        .pw-bl{bottom:0;left:0;border-width:0 0 1.5px 1.5px}
        .pw-br{bottom:0;right:0;border-width:0 1.5px 1.5px 0}
        .pw-item-inner:hover .pw-corner {
          width: 22px; height: 22px; border-color: var(--g-primary);
          filter: drop-shadow(0 0 4px rgba(201,168,76,0.8));
        }
        .pw-top-bar {
          position: absolute; top:0; left:0; right:0; height: 2px;
          background: linear-gradient(90deg, transparent, var(--g-primary), transparent);
          box-shadow: 0 0 10px var(--g-glow);
          opacity: 0; transition: opacity 0.4s ease;
        }
        .pw-item-inner:hover .pw-top-bar { opacity: 1; }

        /* ══ FOOTER ══ */
        .pw-footer-orn {
          display: flex; align-items: center; justify-content: center;
          gap: 1rem; padding: 2.5rem 3rem 4rem;
        }
        .pw-fo-line { flex:1; max-width:100px; height:1px; background:rgba(201,168,76,0.1); }
        .pw-fo-gem  { font-size:0.38rem; color:var(--g-deep); opacity:0.6; }
        .pw-fo-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.9rem,1.5vw,1rem); font-style:italic; font-weight:300;
          color: rgba(255,255,255,0.22); letter-spacing:0.06em;
        }

        /* ══ LIGHTBOX ══ */
        .pw-lb {
          position: fixed; inset: 0; background: rgba(4,3,2,0.97);
          z-index: 2000; display: flex; align-items: center; justify-content: center;
          animation: pw-lb-in 0.35s ease; backdrop-filter: blur(12px);
        }
        @keyframes pw-lb-in { from{opacity:0} to{opacity:1} }
        .pw-lb-topbar {
          position: absolute; top:0; left:0; right:0;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.2rem 2rem;
          border-bottom: 1px solid rgba(201,168,76,0.1);
          background: rgba(8,6,4,0.6); backdrop-filter: blur(10px);
        }
        .pw-lb-top-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem; font-style:italic; font-weight:300; color:rgba(255,255,255,0.6);
        }
        .pw-lb-top-count { font-size:0.7rem; font-weight:600; letter-spacing:0.2em; color:var(--g-primary); }
        .pw-lb-top-sep { color:rgba(201,168,76,0.3); }
        .pw-lb-close {
          position: absolute; top:1rem; right:1.8rem;
          width:36px; height:36px;
          background:rgba(201,168,76,0.08); border:1px solid rgba(201,168,76,0.25);
          cursor:pointer; z-index:10;
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          transition:background 0.3s,border-color 0.3s;
        }
        .pw-lb-close:hover { background:rgba(201,168,76,0.15); border-color:var(--g-primary); }
        .pw-lb-x { display:block; width:16px; height:1.5px; background:rgba(255,255,255,0.7); transition:background 0.3s; }
        .pw-lb-x:first-child  { transform:rotate(45deg) translate(1px,1px); }
        .pw-lb-x:last-child   { transform:rotate(-45deg) translate(1px,-1px); }
        .pw-lb-close:hover .pw-lb-x { background:var(--g-light); }
        .pw-lb-nav {
          position:absolute; top:50%; transform:translateY(-50%);
          background:rgba(8,6,4,0.7); border:1px solid rgba(201,168,76,0.2);
          width:52px; height:80px; cursor:pointer; z-index:10;
          display:flex; align-items:center; justify-content:center;
          transition:border-color 0.3s,background 0.3s;
        }
        .pw-lb-nav:hover { border-color:var(--g-primary); background:rgba(201,168,76,0.08); }
        .pw-lb-arrow { font-size:2.2rem; color:rgba(255,255,255,0.5); transition:color 0.3s,transform 0.3s; line-height:1; }
        .pw-lb-nav:hover .pw-lb-arrow { color:var(--g-light); }
        .pw-lb-prev { left:1rem; }
        .pw-lb-prev:hover .pw-lb-arrow { transform:translateX(-3px); }
        .pw-lb-next { right:1rem; }
        .pw-lb-next:hover .pw-lb-arrow { transform:translateX(3px); }
        .pw-lb-frame {
          display:flex; flex-direction:column; align-items:center;
          max-width:82vw; max-height:88vh;
          animation:pw-lb-scale 0.38s cubic-bezier(0.34,1.4,0.64,1);
        }
        .pw-lb-frame--anim { animation:pw-lb-switch 0.22s ease; }
        @keyframes pw-lb-scale { from{transform:scale(0.9);opacity:0} to{transform:scale(1);opacity:1} }
        @keyframes pw-lb-switch {
          0%{opacity:1;transform:scale(1)} 50%{opacity:0;transform:scale(0.96)} 100%{opacity:1;transform:scale(1)}
        }
        .pw-lb-img-wrap { position:relative; display:flex; }
        .pw-lb-img { max-width:100%; max-height:72vh; object-fit:contain; border:1px solid rgba(201,168,76,0.15); display:block; }
        .pw-lb-corner { position:absolute; width:20px; height:20px; border-style:solid; border-color:var(--g-primary); opacity:0.7; pointer-events:none; }
        .pw-lb-tl{top:-4px;left:-4px;border-width:1.5px 0 0 1.5px}
        .pw-lb-tr{top:-4px;right:-4px;border-width:1.5px 1.5px 0 0}
        .pw-lb-bl{bottom:-4px;left:-4px;border-width:0 0 1.5px 1.5px}
        .pw-lb-br{bottom:-4px;right:-4px;border-width:0 1.5px 1.5px 0}
        .pw-lb-caption {
          display:flex; align-items:center; justify-content:space-between;
          width:100%; margin-top:1.4rem; padding:0 0.2rem; gap:1rem;
        }
        .pw-lb-cap-left { display:flex; align-items:center; gap:1rem; }
        .pw-lb-num { font-family:'Cormorant Garamond',serif; font-size:2rem; font-weight:300; color:rgba(201,168,76,0.2); line-height:1; }
        .pw-lb-cap-div { width:1px; height:32px; background:linear-gradient(to bottom,transparent,rgba(201,168,76,0.3),transparent); }
        .pw-lb-cap-info { display:flex; flex-direction:column; gap:0.2rem; }
        .pw-lb-label { font-family:'Cormorant Garamond',serif; font-size:1.05rem; font-style:italic; font-weight:300; color:rgba(255,255,255,0.85); }
        .pw-lb-sub { font-size:0.55rem; letter-spacing:0.3em; color:rgba(201,168,76,0.5); }
        .pw-lb-dots { display:flex; gap:0.3rem; flex-wrap:wrap; max-width:200px; justify-content:flex-end; }
        .pw-lb-dot { width:5px; height:5px; border-radius:50%; border:none; background:rgba(255,255,255,0.12); cursor:pointer; transition:background 0.3s,transform 0.3s; }
        .pw-lb-dot--active { background:var(--g-primary); transform:scale(1.4); box-shadow:0 0 5px var(--g-glow-sm); }

        /* ══ RESPONSIVE ══ */
        @media (max-width:900px) {
          .pw-grid { grid-template-columns:repeat(2,1fr); grid-auto-rows:180px; padding:0 1.5rem 3rem; }
          .pw-lb-dots { display:none; }
        }
        @media (max-width:560px) {
          .pw-grid { grid-template-columns:repeat(2,1fr); grid-auto-rows:140px; gap:3px; padding:0 0.8rem 2.5rem; }
          .pw-section-label { padding:2.5rem 1.5rem 1.5rem; }
          .pw-lb-prev{left:0.3rem} .pw-lb-next{right:0.3rem}
          .pw-lb-frame{max-width:94vw}
          .pw-lb-num,.pw-lb-cap-div{display:none}
        }
      `}</style>
    </div>
  );
};

export default Page;