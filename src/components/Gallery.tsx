import React, { useState } from "react";

const row1 = [
  "/Images/img6.jpg",
  "/Images/img1.jpg",
  "/Images/img7.jpg",
  "/Images/img3.jpg",
  "/Images/img8.jpg",
  "/Images/img5.jpg",
];

const row2 = [
  "/Images/img2.jpg",
  "/Images/img9.jpg",
  "/Images/img4.jpg",
  "/Images/img7.jpg",
  "/Images/img6.jpg",
  "/Images/img1.jpg",
];

const labels1 = ["Wedding Day", "Golden Hour", "First Look", "Ceremony", "Bridal", "Candid"];
const labels2 = ["Reception", "Love Story", "Details", "Portraits", "Together", "Forever"];

const Gallery = () => {
  const [paused, setPaused] = useState<"row1" | "row2" | null>(null);

  return (
    <section className="gl-root">

      <div className="gl-ambient" />

      {/* ── Header ── */}
      <div className="gl-header">
        <p className="gl-eyebrow">
          <span className="gl-ey-line" />
          OUR PORTFOLIO
          <span className="gl-ey-line gl-ey-line--r" />
        </p>
        <h2 className="gl-title">Frames That Last Forever</h2>
        <div className="gl-rule">
          <span className="gl-rule-line" />
          <span className="gl-rule-gem" />
          <span className="gl-rule-line gl-rule-line--r" />
        </div>
        <p className="gl-subtitle">A glimpse into the stories we've had the honour of telling</p>
      </div>

      {/* ── Row 1 — scrolls LEFT ── */}
      <div
        className="gl-strip-wrap"
        onMouseEnter={() => setPaused("row1")}
        onMouseLeave={() => setPaused(null)}
      >
        <div className={`gl-strip gl-strip--left ${paused === "row1" ? "gl-strip--paused" : ""}`}>
          {[...row1, ...row1, ...row1].map((img, i) => (
            <div key={i} className="gl-item">
              <img src={img} alt={labels1[i % labels1.length]} className="gl-img" />
              <div className="gl-item-overlay">
                <span className="gl-item-label">{labels1[i % labels1.length]}</span>
              </div>
            </div>
          ))}
        </div>
        <span className="gl-fade gl-fade--l" />
        <span className="gl-fade gl-fade--r" />
      </div>

      {/* ── Row 2 — scrolls RIGHT ── */}
      <div
        className="gl-strip-wrap"
        onMouseEnter={() => setPaused("row2")}
        onMouseLeave={() => setPaused(null)}
      >
        <div className={`gl-strip gl-strip--right ${paused === "row2" ? "gl-strip--paused" : ""}`}>
          {[...row2, ...row2, ...row2].map((img, i) => (
            <div key={i} className="gl-item gl-item--tall">
              <img src={img} alt={labels2[i % labels2.length]} className="gl-img" />
              <div className="gl-item-overlay">
                <span className="gl-item-label">{labels2[i % labels2.length]}</span>
              </div>
            </div>
          ))}
        </div>
        <span className="gl-fade gl-fade--l" />
        <span className="gl-fade gl-fade--r" />
      </div>

      {/* ── Footer ── */}
      <div className="gl-footer">
        <div className="gl-footer-rule">
          <span className="gl-fr-line" />
          <span className="gl-fr-gem">✦</span>
          <span className="gl-fr-line" />
        </div>
        <p className="gl-footer-text">
          Every frame is a heartbeat. Every photo is a memory that lives forever.
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&family=Great+Vibes&family=Montserrat:wght@300;400;600&display=swap');

        :root {
          --gold-primary: #C9A84C;
          --gold-light:   #E8C96A;
          --gold-pale:    #F5DFA0;
          --gold-deep:    #A07830;
          --gold-glow:    rgba(201, 168, 76, 0.55);
          --gold-faint:   rgba(201, 168, 76, 0.07);
          --gold-border:  rgba(201, 168, 76, 0.45);
          --bg:           #080604;
        }

        .gl-root {
          position: relative;
          background: var(--bg);
          padding: 5rem 0 4rem;
          overflow: hidden;
          font-family: 'Montserrat', sans-serif;
        }

        .gl-ambient {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 900px; height: 450px;
          background: radial-gradient(ellipse, var(--gold-faint) 0%, transparent 65%);
          pointer-events: none;
        }

        /* ── Header ── */
        .gl-header {
          text-align: center;
          padding: 0 2rem;
          margin-bottom: 3rem;
          position: relative; z-index: 1;
        }
        .gl-eyebrow {
          display: inline-flex; align-items: center; gap: 0.9rem;
          font-size: 0.58rem; font-weight: 600; letter-spacing: 0.5em;
          color: #ffffff; margin-bottom: 0.9rem;
        }
        .gl-ey-line {
          display: block; width: 35px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold-primary));
        }
        .gl-ey-line--r {
          background: linear-gradient(90deg, var(--gold-primary), transparent);
        }
        .gl-title {
          font-family: 'Great Vibes', cursive;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 400;
          color: #ffffff;
          margin: 0 0 1.2rem; line-height: 1.1; display: block;
        }
        .gl-rule {
          display: flex; align-items: center;
          justify-content: center; gap: 0.8rem; margin-bottom: 1rem;
        }
        .gl-rule-line {
          display: block; width: 60px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold-primary));
        }
        .gl-rule-line--r {
          background: linear-gradient(90deg, var(--gold-primary), transparent);
        }
        .gl-rule-gem {
          display: block; width: 6px; height: 6px;
          background: var(--gold-primary); transform: rotate(45deg);
          box-shadow: 0 0 10px var(--gold-glow), 0 0 26px var(--gold-glow);
        }
        .gl-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.95rem, 1.5vw, 1.1rem);
          font-style: italic; font-weight: 300;
          color: rgba(255, 255, 255, 0.75); letter-spacing: 0.04em;
        }

        /* ── Strip ── */
        .gl-strip-wrap {
          position: relative; overflow: hidden;
        }
        .gl-fade {
          position: absolute; top: 0; bottom: 0; width: 120px;
          z-index: 2; pointer-events: none;
        }
        .gl-fade--l { left: 0;  background: linear-gradient(90deg, var(--bg), transparent); }
        .gl-fade--r { right: 0; background: linear-gradient(90deg, transparent, var(--bg)); }

        .gl-strip {
          display: flex; gap: 6px;
          width: max-content; padding: 6px 0;
        }
        .gl-strip--left  { animation: scroll-left  35s linear infinite; }
        .gl-strip--right { animation: scroll-right 35s linear infinite; }
        .gl-strip--paused { animation-play-state: paused !important; }

        @keyframes scroll-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes scroll-right {
          from { transform: translateX(-33.333%); }
          to   { transform: translateX(0); }
        }

        /* ── Items ── */
        .gl-item {
          position: relative;
          width: 300px; height: 200px;
          flex-shrink: 0; overflow: hidden; cursor: pointer;
        }
        .gl-item--tall { height: 240px; width: 320px; }

        .gl-img {
          width: 100%; height: 100%; object-fit: cover;
          filter: brightness(0.72) saturate(0.85) sepia(0.08);
          transition: filter 0.5s ease, transform 0.6s ease;
        }
        .gl-item:hover .gl-img {
          filter: brightness(0.55) saturate(1.05) sepia(0.04);
          transform: scale(1.06);
        }

        .gl-item-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(10,6,0,0.72) 0%, transparent 55%);
          display: flex; align-items: flex-end;
          padding: 1rem 1.1rem;
          opacity: 0; transition: opacity 0.4s ease;
        }
        .gl-item:hover .gl-item-overlay { opacity: 1; }

        .gl-item-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem; font-style: italic;
          font-weight: 300; color: var(--gold-light); letter-spacing: 0.05em;
        }
        .gl-item::after {
          content: ''; position: absolute; inset: 0;
          border: 1.5px solid transparent;
          transition: border-color 0.4s ease; pointer-events: none;
        }
        .gl-item:hover::after { border-color: var(--gold-border); }

        /* ── Footer ── */
        .gl-footer {
          text-align: center; padding: 3rem 2rem 0;
          position: relative; z-index: 1;
        }
        .gl-footer-rule {
          display: flex; align-items: center;
          justify-content: center; gap: 1rem; margin-bottom: 1.5rem;
        }
        .gl-fr-line {
          display: block; flex: 1; max-width: 80px;
          height: 1px; background: rgba(201, 168, 76, 0.15);
        }
        .gl-fr-gem {
          font-size: 0.45rem; color: var(--gold-deep);
          letter-spacing: 0.3em;
          text-shadow: 0 0 10px var(--gold-glow);
        }
        .gl-footer-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1rem, 2vw, 1.2rem);
          font-style: italic; font-weight: 300;
          color: rgba(255, 255, 255, 0.65); letter-spacing: 0.04em;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .gl-item       { width: 220px; height: 150px; }
          .gl-item--tall { width: 240px; height: 180px; }
          .gl-fade       { width: 60px; }
        }
        @media (max-width: 480px) {
          .gl-item       { width: 170px; height: 120px; }
          .gl-item--tall { width: 190px; height: 145px; }
        }
      `}</style>
    </section>
  );
};

export default Gallery;