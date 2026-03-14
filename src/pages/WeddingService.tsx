import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const couples = [
  { id: 1, img: "/Images/img3.jpg", groom: "MANJUNATH", bride: "RAMYA",   date: "DEC 2024", location: "Chennai" },
  { id: 2, img: "/Images/img4.jpg", groom: "ARJUN",     bride: "JASMEET", date: "JAN 2025", location: "Bangalore" },
  { id: 3, img: "/Images/img6.jpg", groom: "ROHIT",     bride: "ASHA",    date: "FEB 2025", location: "Madurai" },
  { id: 4, img: "/Images/img7.jpg", groom: "KARTHIK",   bride: "PRIYA",   date: "MAR 2025", location: "Coimbatore" },
  { id: 5, img: "/Images/img8.jpg", groom: "RAHUL",     bride: "SNEHA",   date: "APR 2025", location: "Trichy" },
  { id: 6, img: "/Images/img1.jpg", groom: "VIKRAM",    bride: "ANANYA",  date: "MAY 2025", location: "Salem" },
  { id: 7, img: "/Images/img3.jpg", groom: "ROHAN",     bride: "MEERA",   date: "JUN 2025", location: "Tirunelveli" },
  { id: 8, img: "/Images/img6.jpg", groom: "ADITYA",    bride: "KAVYA",   date: "JUL 2025", location: "Vellore" },
  { id: 9, img: "/Images/img4.jpg", groom: "NIKHIL",    bride: "POOJA",   date: "AUG 2025", location: "Thanjavur" },
];

const Weddingservice = () => {
  const [heroVisible, setHeroVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [visible, setVisible] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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
    cardRefs.current.forEach((r) => r && observer.observe(r));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="ws-root">

      {/* ── HERO ── */}
      <div className={`ws-hero ${heroVisible ? "ws-hero--visible" : ""}`}>
        <img src="/Images/Backgrounds/background.jpg" alt="Wedding" className="ws-hero-img" />
        <div className="ws-hero-overlay" />

        {/* Floating particles */}
        <div className="ws-particles" aria-hidden="true">
          {[...Array(8)].map((_, i) => (
            <span key={i} className={`ws-particle ws-p--${i + 1}`} />
          ))}
        </div>

        <div className="ws-hero-content">
          <p className="ws-hero-eyebrow">
            <span className="ws-ey-line" />
            EAGLE-VIEW PICTURES
            <span className="ws-ey-line ws-ey-line--r" />
          </p>

          <h1 className="ws-hero-title">Wedding Stories</h1>

          <div className="ws-hero-rule">
            <span className="ws-rule-line" />
            <span className="ws-rule-gem" />
            <span className="ws-rule-line ws-rule-line--r" />
          </div>

          <p className="ws-hero-sub">
            Every love story is unique — beautifully captured, forever preserved
          </p>

          <div className="ws-hero-stats">
            <div className="ws-stat">
              <span className="ws-stat-num">800<span className="ws-stat-plus">+</span></span>
              <span className="ws-stat-lbl">Weddings</span>
            </div>
            <span className="ws-stat-sep" />
            <div className="ws-stat">
              <span className="ws-stat-num">10<span className="ws-stat-plus">+</span></span>
              <span className="ws-stat-lbl">Years</span>
            </div>
            <span className="ws-stat-sep" />
            <div className="ws-stat">
              <span className="ws-stat-num">2k<span className="ws-stat-plus">+</span></span>
              <span className="ws-stat-lbl">Memories</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="ws-scroll">
          <div className="ws-scroll-mouse">
            <span className="ws-scroll-wheel" />
          </div>
          <span className="ws-scroll-text">SCROLL</span>
        </div>
      </div>

      {/* ── SECTION LABEL ── */}
      <div className="ws-section-label">
        <span className="ws-lbl-line" />
        <div className="ws-lbl-center">
          <span className="ws-lbl-gem">✦</span>
          <span className="ws-lbl-text">OUR COUPLES</span>
          <span className="ws-lbl-gem">✦</span>
        </div>
        <span className="ws-lbl-line ws-lbl-line--r" />
      </div>

      {/* ── COUPLES GRID ── */}
      <div className="ws-grid">
        {couples.map((couple, i) => (
          <div
            key={couple.id}
            data-index={i}
            ref={(el) => { cardRefs.current[i] = el; }}
            className={`ws-card ${visible.has(i) ? "ws-card--visible" : ""}`}
            style={{ transitionDelay: `${(i % 3) * 0.12}s` }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <Link to={`/couple/${couple.id}`} className="ws-card-link">

              {/* Image */}
              <div className="ws-img-wrap">
                <img src={couple.img} alt={`${couple.groom} & ${couple.bride}`} className="ws-img" />
                <div className="ws-img-shimmer" />
              </div>

              {/* Dark gradient overlay */}
              <div className="ws-card-overlay" />

              {/* Index number */}
              <span className="ws-card-num">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Top right corner brackets */}
              <span className="ws-corner ws-tl" />
              <span className="ws-corner ws-tr" />
              <span className="ws-corner ws-bl" />
              <span className="ws-corner ws-br" />

              {/* Gold accent top bar */}
              <div className="ws-card-bar" />

              {/* Content */}
              <div className="ws-card-body">

                {/* Meta */}
                <div className="ws-card-meta">
                  <span className="ws-meta-date">{couple.date}</span>
                  <span className="ws-meta-dot">·</span>
                  <span className="ws-meta-loc">{couple.location}</span>
                </div>

                {/* Names */}
                <div className="ws-card-names">
                  <span className="ws-name">{couple.groom}</span>
                  <span className="ws-ampersand">&</span>
                  <span className="ws-name">{couple.bride}</span>
                </div>

                {/* Rule */}
                <div className="ws-card-rule">
                  <span className="ws-cr-line" />
                  <span className="ws-cr-gem">✦</span>
                </div>

                {/* CTA */}
                <div className="ws-card-cta">
                  <span className="ws-cta-text">View Gallery</span>
                  <span className="ws-cta-arrow">→</span>
                </div>

              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* ── FOOTER ORNAMENT ── */}
      <div className="ws-footer-orn">
        <span className="ws-fo-line" />
        <span className="ws-fo-gem">✦</span>
        <span className="ws-fo-text">Every Frame is a Memory</span>
        <span className="ws-fo-gem">✦</span>
        <span className="ws-fo-line" />
      </div>

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

        .ws-root {
          background: var(--bg);
          min-height: 100vh;
          font-family: 'Montserrat', sans-serif;
          color: #fff;
        }

        /* ══════════════════════
           HERO
        ══════════════════════ */
        .ws-hero {
          position: relative;
          height: 80vh; min-height: 580px;
          overflow: hidden;
          opacity: 0;
          transition: opacity 1.1s ease;
        }
        .ws-hero--visible { opacity: 1; }

        .ws-hero-img {
          width: 100%; height: 100%; object-fit: cover;
          transform: scale(1.1);
          animation: ws-zoom 14s cubic-bezier(0.25,0.46,0.45,0.94) forwards;
          filter: brightness(0.4) sepia(0.15);
        }
        @keyframes ws-zoom {
          to { transform: scale(1); }
        }

        .ws-hero-overlay {
          position: absolute; inset: 0;
          background:
            linear-gradient(to bottom, rgba(8,6,4,0.2) 0%, rgba(8,6,4,0.4) 50%, rgba(8,6,4,0.92) 100%),
            radial-gradient(ellipse at 50% 60%, rgba(201,168,76,0.05) 0%, transparent 65%);
        }

        /* Particles */
        .ws-particles { position: absolute; inset: 0; pointer-events: none; }
        .ws-particle {
          position: absolute; width: 2px; height: 2px; border-radius: 50%;
          background: var(--g-primary); opacity: 0;
          animation: ws-float 9s ease infinite;
        }
        .ws-p--1 { left:12%;  animation-delay:0s;   animation-duration:9s;  }
        .ws-p--2 { left:28%;  animation-delay:1.5s; animation-duration:11s; }
        .ws-p--3 { left:48%;  animation-delay:3s;   animation-duration:8s;  }
        .ws-p--4 { left:63%;  animation-delay:0.7s; animation-duration:10s; }
        .ws-p--5 { left:78%;  animation-delay:2s;   animation-duration:9s;  }
        .ws-p--6 { left:20%;  animation-delay:4s;   animation-duration:12s; }
        .ws-p--7 { left:68%;  animation-delay:1s;   animation-duration:7s;  }
        .ws-p--8 { left:43%;  animation-delay:5s;   animation-duration:10s; }
        @keyframes ws-float {
          0%   { bottom:5%;  opacity:0; transform:translateX(0) scale(1); }
          20%  { opacity:0.6; }
          80%  { opacity:0.3; }
          100% { bottom:92%; opacity:0; transform:translateX(18px) scale(0.4); }
        }

        /* Hero content */
        .ws-hero-content {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center; padding: 2rem;
          animation: ws-fade 1.6s ease 0.4s both;
        }
        @keyframes ws-fade {
          from { opacity:0; transform:translateY(26px); }
          to   { opacity:1; transform:translateY(0); }
        }

        .ws-hero-eyebrow {
          display: inline-flex; align-items: center; gap: 0.9rem;
          font-size: 0.6rem; letter-spacing: 0.55em;
          color: #ffffff; margin-bottom: 1.4rem; font-weight: 600;
        }
        .ws-ey-line {
          display: block; width: 35px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--g-primary));
        }
        .ws-ey-line--r { background: linear-gradient(90deg, var(--g-primary), transparent); }

        .ws-hero-title {
          font-family: 'Great Vibes', cursive;
          font-size: clamp(3.5rem, 9vw, 7rem);
          font-weight: 400; line-height: 1.05; color: #ffffff;
          margin-bottom: 1.6rem;
          text-shadow: 0 4px 40px rgba(0,0,0,0.4);
          animation: ws-shimmer 4s ease 2s infinite;
        }
        @keyframes ws-shimmer {
          0%,100% { text-shadow: 0 4px 40px rgba(0,0,0,0.4); }
          50%     { text-shadow: 0 4px 40px rgba(0,0,0,0.4), 0 0 60px rgba(201,168,76,0.1); }
        }

        .ws-hero-rule {
          display: flex; align-items: center; gap: 1rem; margin-bottom: 1.4rem;
        }
        .ws-rule-line {
          display: block; width: 70px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--g-primary));
        }
        .ws-rule-line--r { background: linear-gradient(90deg, var(--g-primary), transparent); }
        .ws-rule-gem {
          display: block; width: 7px; height: 7px;
          background: var(--g-primary); transform: rotate(45deg);
          box-shadow: 0 0 12px var(--g-glow), 0 0 28px var(--g-glow);
          animation: ws-gem 2s ease infinite;
        }
        @keyframes ws-gem {
          0%,100% { box-shadow: 0 0 12px var(--g-glow), 0 0 28px var(--g-glow); }
          50%     { box-shadow: 0 0 20px var(--g-glow), 0 0 50px rgba(201,168,76,0.45); }
        }

        .ws-hero-sub {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1rem, 2vw, 1.4rem);
          font-weight: 300; font-style: italic;
          color: rgba(255,255,255,0.72);
          letter-spacing: 0.05em; margin-bottom: 2.8rem;
        }

        /* Stats row */
        .ws-hero-stats {
          display: flex; align-items: center; gap: 2.5rem;
        }
        .ws-stat {
          display: flex; flex-direction: column; align-items: center; gap: 0.2rem;
        }
        .ws-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 300;
          color: #ffffff; line-height: 1;
        }
        .ws-stat-plus { color: var(--g-primary); font-size: 0.7em; }
        .ws-stat-lbl {
          font-size: 0.52rem; letter-spacing: 0.4em;
          color: rgba(255,255,255,0.35); text-transform: uppercase;
        }
        .ws-stat-sep {
          width: 1px; height: 36px;
          background: linear-gradient(to bottom, transparent, rgba(201,168,76,0.3), transparent);
        }

        /* Scroll indicator */
        .ws-scroll {
          position: absolute; bottom: 2.2rem; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
          animation: ws-bob 2.5s ease infinite;
        }
        @keyframes ws-bob {
          0%,100% { transform: translateX(-50%) translateY(0); }
          50%     { transform: translateX(-50%) translateY(7px); }
        }
        .ws-scroll-mouse {
          width: 22px; height: 34px;
          border: 1.5px solid rgba(201,168,76,0.4);
          border-radius: 11px;
          display: flex; justify-content: center; padding-top: 6px;
        }
        .ws-scroll-wheel {
          width: 2px; height: 7px; border-radius: 2px;
          background: var(--g-primary);
          animation: ws-wheel 1.8s ease infinite;
        }
        @keyframes ws-wheel {
          0%   { opacity:1; transform:translateY(0); }
          100% { opacity:0; transform:translateY(10px); }
        }
        .ws-scroll-text {
          font-size: 0.45rem; letter-spacing: 0.5em;
          color: rgba(201,168,76,0.45);
        }

        /* ══════════════════════
           SECTION LABEL
        ══════════════════════ */
        .ws-section-label {
          display: flex; align-items: center; justify-content: center;
          gap: 1.5rem; padding: 3.5rem 3rem 2.5rem;
        }
        .ws-lbl-line {
          flex: 1; max-width: 140px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.2));
        }
        .ws-lbl-line--r { background: linear-gradient(90deg, rgba(201,168,76,0.2), transparent); }
        .ws-lbl-center { display: flex; align-items: center; gap: 0.8rem; }
        .ws-lbl-gem { font-size: 0.38rem; color: var(--g-primary); opacity: 0.6; }
        .ws-lbl-text {
          font-size: 0.58rem; letter-spacing: 0.55em;
          color: rgba(255,255,255,0.35); font-weight: 600;
        }

        /* ══════════════════════
           GRID
        ══════════════════════ */
        .ws-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4px;
          padding: 0 2.5rem 2.5rem;
          max-width: 1500px; margin: 0 auto;
        }

        /* Card */
        .ws-card {
          opacity: 0;
          transform: translateY(32px) scale(0.97);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .ws-card--visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .ws-card-link {
          display: block; position: relative;
          overflow: hidden; text-decoration: none;
          height: 620px;
        }

        /* Image */
        .ws-img-wrap {
          position: absolute; inset: 0; overflow: hidden;
        }
        .ws-img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s ease;
          filter: brightness(0.75) sepia(0.1);
        }
        .ws-card-link:hover .ws-img {
          transform: scale(1.07);
          filter: brightness(0.48) sepia(0.06);
        }

        /* Shimmer sweep */
        .ws-img-shimmer {
          position: absolute; inset: 0;
          background: linear-gradient(110deg, transparent 38%, rgba(201,168,76,0.07) 50%, transparent 62%);
          transform: translateX(-100%);
          pointer-events: none;
        }
        .ws-card-link:hover .ws-img-shimmer {
          transform: translateX(100%);
          transition: transform 0.75s ease;
        }

        /* Overlay */
        .ws-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top,
            rgba(8,6,4,0.92) 0%,
            rgba(8,6,4,0.5) 40%,
            rgba(8,6,4,0.1) 75%,
            transparent 100%
          );
          transition: background 0.5s ease;
        }
        .ws-card-link:hover .ws-card-overlay {
          background: linear-gradient(to top,
            rgba(8,6,4,0.96) 0%,
            rgba(8,6,4,0.65) 50%,
            rgba(8,6,4,0.2) 80%,
            transparent 100%
          );
        }

        /* Index number */
        .ws-card-num {
          position: absolute; top: 1.2rem; left: 1.4rem;
          font-family: 'Cormorant Garamond', serif;
          font-size: 3.5rem; font-weight: 300;
          color: rgba(201,168,76,0.08); line-height: 1;
          transition: color 0.4s;
        }
        .ws-card-link:hover .ws-card-num { color: rgba(201,168,76,0.15); }

        /* Corner brackets */
        .ws-corner {
          position: absolute;
          width: 0; height: 0;
          border-style: solid; border-color: transparent;
          transition: width 0.38s ease, height 0.38s ease, border-color 0.38s ease;
          pointer-events: none;
        }
        .ws-tl { top: 0; left: 0;   border-width: 1.5px 0 0 1.5px; }
        .ws-tr { top: 0; right: 0;  border-width: 1.5px 1.5px 0 0; }
        .ws-bl { bottom: 0; left: 0;  border-width: 0 0 1.5px 1.5px; }
        .ws-br { bottom: 0; right: 0; border-width: 0 1.5px 1.5px 0; }
        .ws-card-link:hover .ws-corner {
          width: 24px; height: 24px;
          border-color: var(--g-primary);
          filter: drop-shadow(0 0 5px rgba(201,168,76,0.8));
        }

        /* Gold top bar */
        .ws-card-bar {
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--g-primary), transparent);
          box-shadow: 0 0 12px var(--g-glow);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .ws-card-link:hover .ws-card-bar { opacity: 1; }

        /* Card body */
        .ws-card-body {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 2rem 1.8rem 2.2rem;
          display: flex; flex-direction: column; gap: 0.6rem;
          transform: translateY(8px);
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
        }
        .ws-card-link:hover .ws-card-body { transform: translateY(0); }

        .ws-card-meta {
          display: flex; align-items: center; gap: 0.5rem;
          font-size: 0.58rem; letter-spacing: 0.2em;
          color: rgba(255,255,255,0.4);
        }
        .ws-meta-dot { color: var(--g-primary); opacity: 0.6; }

        .ws-card-names {
          display: flex; flex-direction: column; align-items: flex-start; gap: 0;
        }
        .ws-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.6rem, 2.5vw, 2.2rem);
          font-weight: 300; color: #ffffff;
          letter-spacing: 0.12em; line-height: 1.15;
        }
        .ws-ampersand {
          font-family: 'Great Vibes', cursive;
          font-size: 1.4rem; color: var(--g-primary);
          line-height: 1.2; padding-left: 2px;
          text-shadow: 0 0 10px var(--g-glow-sm);
        }

        .ws-card-rule {
          display: flex; align-items: center; gap: 0.6rem;
        }
        .ws-cr-line {
          display: block; width: 0; height: 1px;
          background: linear-gradient(90deg, var(--g-primary), transparent);
          transition: width 0.5s ease 0.1s;
        }
        .ws-card-link:hover .ws-cr-line { width: 40px; }
        .ws-cr-gem {
          font-size: 0.3rem; color: var(--g-primary); opacity: 0;
          transition: opacity 0.4s ease 0.2s;
        }
        .ws-card-link:hover .ws-cr-gem { opacity: 0.8; }

        .ws-card-cta {
          display: flex; align-items: center; gap: 0.5rem;
          font-size: 0.62rem; font-weight: 600;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: var(--g-primary);
          opacity: 0; transform: translateY(6px);
          transition: opacity 0.35s ease 0.1s, transform 0.35s ease 0.1s;
        }
        .ws-card-link:hover .ws-card-cta { opacity: 1; transform: translateY(0); }
        .ws-cta-arrow {
          transition: transform 0.3s ease;
          display: inline-block;
        }
        .ws-card-link:hover .ws-cta-arrow { transform: translateX(5px); }

        /* ══════════════════════
           FOOTER ORNAMENT
        ══════════════════════ */
        .ws-footer-orn {
          display: flex; align-items: center; justify-content: center;
          gap: 1rem; padding: 3rem 3rem 4rem;
        }
        .ws-fo-line {
          flex: 1; max-width: 100px; height: 1px;
          background: rgba(201,168,76,0.12);
        }
        .ws-fo-gem { font-size: 0.38rem; color: var(--g-deep); opacity: 0.6; }
        .ws-fo-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.9rem, 1.5vw, 1.05rem);
          font-style: italic; font-weight: 300;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.06em;
        }

        /* ══════════════════════
           RESPONSIVE
        ══════════════════════ */
        @media (max-width: 1024px) {
          .ws-card-link { height: 520px; }
        }
        @media (max-width: 768px) {
          .ws-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 3px; padding: 0 1rem 2rem;
          }
          .ws-card-link { height: 420px; }
          .ws-section-label { padding: 2.5rem 1.5rem 1.8rem; }
        }
        @media (max-width: 480px) {
          .ws-grid {
            grid-template-columns: 1fr;
            padding: 0 0.8rem 2rem;
          }
          .ws-card-link { height: 480px; }
          .ws-hero-stats { gap: 1.5rem; }
        }
      `}</style>
    </div>
  );
};

export default Weddingservice;