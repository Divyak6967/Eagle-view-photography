import React, { useState } from 'react';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const services = [
  { id: 1,  title: "Engagements",     sub: "Where it all begins",         icon: "/Icons/Engagement.png",  path: "/engagement"  },
  { id: 2,  title: "Pre-Wedding",     sub: "Love before the vows",        icon: "/Icons/pre-wedding.png", path: "/prewedding"  },
  { id: 3,  title: "Weddings",        sub: "The most magical day",        icon: "/Icons/wedding.png",     path: "/weddings"    },
  { id: 4,  title: "Maternity",       sub: "A new life blooming",         icon: "/Icons/maternity.png",   path: "/maternity"   },
  { id: 5,  title: "Baby Shower",     sub: "Celebrating new arrivals",    icon: "/Icons/babyshower.png",  path: "/babyshower"  },
  { id: 6,  title: "New Born",        sub: "First breaths, first frames", icon: "/Icons/newborn.png",     path: "/newborn"     },
  { id: 7,  title: "Birthday",        sub: "Every year a new story",      icon: "/Icons/birthday.png",    path: "/birthday"    },
  { id: 8,  title: "Puberty",         sub: "Coming of age, beautifully",  icon: "/Icons/puperty.png",     path: "/puperty"     },
  { id: 9,  title: "Modelling Shoot", sub: "Frame your finest self",      icon: "/Icons/modaling.png",    path: "/modeling"    },
];

const Service = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="sv-root">

      {/* Ambient corner glows */}
      <div className="sv-glow-tl" />
      <div className="sv-glow-br" />

      {/* ── Header ── */}
      <motion.div
        className="sv-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
      >
        <p className="sv-eyebrow">
          <span className="sv-ey-line" />
          OUR SERVICES
          <span className="sv-ey-line sv-ey-line--r" />
        </p>
        <h2 className="sv-title">What We Capture</h2>
        <div className="sv-divider">
          <span className="sv-div-line" />
          <span className="sv-div-gem" />
          <span className="sv-div-line sv-div-line--r" />
        </div>
        <p className="sv-subtitle">
          From first glances to forever memories — every milestone, beautifully told.
        </p>
      </motion.div>

      {/* ── Cards Grid ── */}
      <div className="sv-grid">
        {services.map((s, i) => (
          <motion.div
            key={s.id}
            className={`sv-card ${hovered === s.id ? 'sv-card--active' : ''}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.2 }}
            onMouseEnter={() => setHovered(s.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => { navigate(s.path); window.scrollTo(0, 0); }}
          >
            {/* Outer gold glow */}
            <div className="sv-outer-glow" />

            {/* Card body */}
            <div className="sv-card-inner">

              {/* Top gold bar */}
              <div className="sv-top-bar" />

              {/* Corner ornaments */}
              <span className="sv-corner sv-corner--tl" />
              <span className="sv-corner sv-corner--tr" />
              <span className="sv-corner sv-corner--bl" />
              <span className="sv-corner sv-corner--br" />

              {/* Icon */}
              <div className="sv-icon-wrap">
                <img src={s.icon} alt={s.title} className="sv-icon" />
              </div>

              {/* Text */}
              <h3 className="sv-name">{s.title}</h3>
              <p className="sv-desc">{s.sub}</p>

              {/* CTA */}
              <div className="sv-cta">
                <span className="sv-cta-text">Explore</span>
                <span className="sv-cta-arrow">→</span>
              </div>

            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;1,300;1,400&family=Great+Vibes&family=Montserrat:wght@300;400;500;600&display=swap');

        :root {
          --g-primary:  #C9A84C;
          --g-light:    #E8C96A;
          --g-pale:     #F5DFA0;
          --g-deep:     #9A7228;
          --g-glow:     rgba(201,168,76,0.5);
          --g-faint:    rgba(201,168,76,0.06);
          --g-border:   rgba(201,168,76,0.35);
          --g-border-h: rgba(201,168,76,0.75);
          --bg:         #080604;
          --bg-card:    #0e0b07;
          --bg-card-h:  #130f08;
        }

        .sv-root {
          position: relative;
          background: var(--bg);
          padding: 6rem 4rem 7rem;
          font-family: 'Montserrat', sans-serif;
          overflow: hidden;
        }

        /* Ambient corner glows */
        .sv-glow-tl {
          position: absolute; top: -100px; left: -100px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 65%);
          pointer-events: none;
        }
        .sv-glow-br {
          position: absolute; bottom: -100px; right: -100px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 65%);
          pointer-events: none;
        }

        /* ── Header ── */
        .sv-header {
          text-align: center;
          margin-bottom: 4.5rem;
          position: relative; z-index: 1;
        }
        .sv-eyebrow {
          display: inline-flex; align-items: center; gap: 0.9rem;
          font-size: 0.65rem; font-weight: 600; letter-spacing: 0.55em;
          color: #ffffff; margin-bottom: 1rem;
        }
        .sv-ey-line {
          display: block; width: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--g-primary));
        }
        .sv-ey-line--r {
          background: linear-gradient(90deg, var(--g-primary), transparent);
        }
        .sv-title {
          font-family: 'Great Vibes', cursive;
          font-size: clamp(3rem, 5.5vw, 4.8rem);
          font-weight: 400;
          color: #ffffff;
          margin: 0 0 1.4rem;
          display: block;
          line-height: 1.1;
        }
        .sv-divider {
          display: flex; align-items: center;
          justify-content: center; gap: 0.9rem;
          margin-bottom: 1.4rem;
        }
        .sv-div-line {
          width: 70px; height: 1px; display: block;
          background: linear-gradient(90deg, transparent, var(--g-primary));
        }
        .sv-div-line--r {
          background: linear-gradient(90deg, var(--g-primary), transparent);
        }
        .sv-div-gem {
          width: 7px; height: 7px; display: block;
          background: var(--g-primary); transform: rotate(45deg);
          box-shadow: 0 0 12px var(--g-glow), 0 0 28px var(--g-glow);
        }
        .sv-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.05rem, 1.6vw, 1.2rem);
          font-style: italic; font-weight: 300;
          color: rgba(255,255,255,0.7);
          letter-spacing: 0.04em; margin: 0;
        }

        /* ── Grid ── */
        .sv-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.6rem;
          max-width: 1140px;
          margin: 0 auto;
          position: relative; z-index: 1;
        }

        /* ── Card ── */
        .sv-card {
          position: relative;
          cursor: pointer;
        }

        /* Outer glow on hover */
        .sv-outer-glow {
          position: absolute; inset: -3px;
          border-radius: 3px;
          background: radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.2) 0%, transparent 70%);
          pointer-events: none;
          opacity: 0;
          filter: blur(10px);
          transition: opacity 0.4s ease;
        }
        .sv-card--active .sv-outer-glow { opacity: 1; }

        .sv-card-inner {
          position: relative;
          border: 1px solid var(--g-border);
          border-radius: 2px;
          padding: 2.6rem 2rem 2.2rem;
          text-align: center;
          background: var(--bg-card);
          display: flex; flex-direction: column; align-items: center;
          overflow: hidden;
          transition: border-color 0.4s ease, background 0.4s ease,
                      transform 0.4s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.4s ease;
        }
        .sv-card--active .sv-card-inner {
          border-color: var(--g-border-h);
          background: var(--bg-card-h);
          transform: translateY(-10px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(201,168,76,0.07);
        }

        /* Gold top bar */
        .sv-top-bar {
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, var(--g-primary) 50%, transparent 100%);
          box-shadow: 0 0 16px var(--g-glow);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .sv-card--active .sv-top-bar { opacity: 1; }

        /* Corner ornaments */
        .sv-corner {
          position: absolute;
          width: 10px; height: 10px;
          border-color: var(--g-primary);
          border-style: solid;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .sv-card--active .sv-corner { opacity: 0.7; }
        .sv-corner--tl { top: 6px; left: 6px;  border-width: 1px 0 0 1px; }
        .sv-corner--tr { top: 6px; right: 6px; border-width: 1px 1px 0 0; }
        .sv-corner--bl { bottom: 6px; left: 6px;  border-width: 0 0 1px 1px; }
        .sv-corner--br { bottom: 6px; right: 6px; border-width: 0 1px 1px 0; }

        /* Icon */
        .sv-icon-wrap {
          width: 84px; height: 84px;
          border-radius: 50%;
          border: 1px solid var(--g-border);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.6rem; margin-top: 0.4rem;
          background: rgba(201,168,76,0.04);
          transition: background 0.4s ease, border-color 0.4s ease,
                      box-shadow 0.4s ease;
        }
        .sv-card--active .sv-icon-wrap {
          background: rgba(201,168,76,0.1);
          border-color: var(--g-primary);
          box-shadow: 0 0 20px rgba(201,168,76,0.2);
        }

        .sv-icon {
          width: 40px; height: 40px; object-fit: contain;
          filter: brightness(0) invert(1);
          transition: filter 0.4s ease, transform 0.4s ease;
        }
        .sv-card--active .sv-icon {
          filter: brightness(0) saturate(100%) invert(72%) sepia(55%) saturate(500%) hue-rotate(5deg) brightness(95%);
          transform: scale(1.12);
        }

        /* Text */
        .sv-name {
          font-family: 'Montserrat', sans-serif;
          font-size: 1.05rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: #ffffff;
          margin: 0 0 0.55rem;
          transition: color 0.4s ease;
        }
        .sv-card--active .sv-name {
          color: var(--g-light);
        }

        .sv-desc {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          font-style: italic;
          font-weight: 300;
          color: rgba(255,255,255,0.65);
          margin: 0 0 1.4rem;
          line-height: 1.6;
        }

        /* CTA */
        .sv-cta {
          display: flex; align-items: center; gap: 0.5rem;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.3em;
          color: var(--g-primary);
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.35s ease, transform 0.35s ease;
          text-transform: uppercase;
        }
        .sv-card--active .sv-cta {
          opacity: 1;
          transform: translateY(0);
        }
        .sv-cta-arrow {
          transition: transform 0.3s ease;
          display: inline-block;
        }
        .sv-card--active .sv-cta-arrow {
          transform: translateX(4px);
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .sv-grid { grid-template-columns: repeat(2, 1fr); gap: 1.2rem; }
          .sv-root { padding: 4rem 2rem 5rem; }
        }
        @media (max-width: 540px) {
          .sv-grid { grid-template-columns: repeat(2, 1fr); gap: 0.9rem; }
          .sv-root { padding: 3rem 1rem 4rem; }
          .sv-card-inner { padding: 2rem 1.2rem 1.8rem; }
          .sv-icon-wrap { width: 68px; height: 68px; }
          .sv-icon { width: 32px; height: 32px; }
          .sv-name { font-size: 0.92rem; }
          .sv-desc { font-size: 0.9rem; }
        }
      `}</style>
    </section>
  );
};

export default Service;