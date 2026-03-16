import React, { useState, useEffect, useRef } from "react";
  import { useNavigate } from "react-router-dom";

const packages = [
  {
    id: "silver",
    tier: "01",
    name: "Silver",
    price: "45,000",
    tag: null,
    accent: "rgba(180,180,200,0.8)",
    accentGlow: "rgba(180,180,200,0.15)",
    items: [
      { icon: "📷", label: "Traditional Photo" },
      { icon: "🎬", label: "Traditional Video" },
      { icon: "📒", label: "12×36 Premium Album" },
      { icon: "💾", label: "Pendrive – Traditional Video Edit" },
      { icon: "🎁", label: "Complementary Gift" },
      { icon: "📅", label: "Wall Calendar" },
      { icon: "🌅", label: "Post Wedding Shoot" },
      { icon: "🖼️", label: "2 Photo Frames" },
    ],
  },
  {
    id: "gold",
    tier: "02",
    name: "Gold",
    price: "65,000",
    tag: "Popular",
    accent: "rgba(201,168,76,1)",
    accentGlow: "rgba(201,168,76,0.18)",
    items: [
      { icon: "📷", label: "Traditional Photo" },
      { icon: "🎬", label: "Traditional Video" },
      { icon: "📸", label: "Candid Photo" },
      { icon: "📒", label: "12×36 Premium Album" },
      { icon: "💾", label: "Pendrive – Traditional Video Edit" },
      { icon: "🎁", label: "Complementary Gift" },
      { icon: "📅", label: "Wall Calendar" },
      { icon: "🌅", label: "Post Wedding Shoot" },
      { icon: "🖼️", label: "2 Photo Frames" },
    ],
  },
  {
    id: "platinum",
    tier: "03",
    name: "Platinum",
    price: "80,000",
    tag: "Best Value",
    accent: "rgba(220,230,255,0.9)",
    accentGlow: "rgba(180,200,255,0.15)",
    items: [
      { icon: "📷", label: "Traditional Photo" },
      { icon: "🎬", label: "Traditional Video" },
      { icon: "📸", label: "Candid Photo" },
      { icon: "🎥", label: "Candid Video" },
      { icon: "📒", label: "12×36 Premium Album" },
      { icon: "💾", label: "Pendrive – Traditional & Candid Edit" },
      { icon: "🎁", label: "Complementary Gift" },
      { icon: "✨", label: "Teaser + Highlight + Reels" },
      { icon: "📅", label: "Wall Calendar" },
      { icon: "🌅", label: "Post Wedding Shoot" },
      { icon: "🖼️", label: "2 Photo Frames" },
    ],
  },
  {
    id: "elite",
    tier: "04",
    name: "Elite",
    price: "1,35,000",
    tag: "Ultimate",
    accent: "rgba(255,200,100,1)",
    accentGlow: "rgba(255,180,60,0.2)",
    items: [
      { icon: "📷", label: "Traditional Photo" },
      { icon: "🎬", label: "Traditional Video" },
      { icon: "📸", label: "Candid Photo" },
      { icon: "🎥", label: "Candid Video" },
      { icon: "🚁", label: "Drone Coverage" },
      { icon: "📒", label: "12×36 Premium Album" },
      { icon: "✨", label: "Teaser + Highlight + Reels" },
      { icon: "💾", label: "Pendrive – Traditional Video Edit" },
      { icon: "🎁", label: "Complementary Gift" },
      { icon: "📅", label: "Wall Calendar" },
      { icon: "💑", label: "Pre or Post Wedding Shoot" },
      { icon: "🖼️", label: "4 Photo Frames" },
    ],
  },
];

const PackagesPage = () => {
  const [visible, setVisible] = useState<Set<number>>(new Set());
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(1); // Gold highlighted by default
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);



// Inside your component:
const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = Number((e.target as HTMLElement).dataset.index);
          setVisible((p) => new Set([...p, idx]));
        }
      }),
      { threshold: 0.15 }
    );
    cardRefs.current.forEach((r) => r && observer.observe(r));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pk-root">

      {/* ── HERO ── */}
      <section className={`pk-hero ${heroVisible ? "pk-hero--visible" : ""}`}>

        {/* Background grid lines */}
        <div className="pk-grid-bg">
          {Array(8).fill(null).map((_, i) => (
            <div key={i} className="pk-grid-line" style={{ left: `${i * 14.28}%` }} />
          ))}
        </div>

        {/* Floating orbs */}
        <div className="pk-orb pk-orb--1" />
        <div className="pk-orb pk-orb--2" />

        <div className="pk-hero-content">
          <div className="pk-eyebrow">
            <span className="pk-ey-gem">✦</span>
            <span>EAGLE-VIEW PICTURES</span>
            <span className="pk-ey-gem">✦</span>
          </div>

          <h1 className="pk-hero-title">
            <span className="pk-ht-top">Wedding</span>
            <span className="pk-ht-mid">Packages</span>
            <span className="pk-ht-sub">Crafted for every love story</span>
          </h1>

          <div className="pk-hero-divider">
            <span className="pk-hdl" />
            <span className="pk-hd-diamond" />
            <span className="pk-hdl pk-hdl--r" />
          </div>

          <p className="pk-hero-desc">
            Choose the perfect package for your most special day.<br />
            Every memory, beautifully preserved.
          </p>

          {/* Price range teaser */}
          <div className="pk-price-range">
            <div className="pk-pr-item">
              <span className="pk-pr-from">Starting from</span>
              <span className="pk-pr-price">₹45,000</span>
            </div>
            <div className="pk-pr-sep">—</div>
            <div className="pk-pr-item">
              <span className="pk-pr-from">Up to</span>
              <span className="pk-pr-price">₹1,35,000</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="pk-scroll">
          <div className="pk-scroll-mouse"><span className="pk-scroll-wheel" /></div>
          <span>SCROLL</span>
        </div>
      </section>

      {/* ── PACKAGES GRID ── */}
      <section className="pk-section">

        <div className="pk-section-label">
          <span className="pk-sl-line" />
          <span className="pk-sl-text">CHOOSE YOUR PACKAGE</span>
          <span className="pk-sl-line pk-sl-line--r" />
        </div>

        <div className="pk-cards">
          {packages.map((pkg, i) => (
            <div
              key={pkg.id}
              data-index={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              className={`pk-card pk-card--${pkg.id} ${visible.has(i) ? "pk-card--visible" : ""} ${activeCard === i ? "pk-card--active" : ""}`}
              style={{
                transitionDelay: `${i * 0.12}s`,
                "--accent": pkg.accent,
                "--accent-glow": pkg.accentGlow,
              } as React.CSSProperties}
              onMouseEnter={() => setActiveCard(i)}
              onMouseLeave={() => setActiveCard(1)}
            >
              {/* Tag */}
              {pkg.tag && (
                <div className="pk-tag">{pkg.tag}</div>
              )}

              {/* Tier number */}
              <div className="pk-tier">{pkg.tier}</div>

              {/* Card header */}
              <div className="pk-card-header">
                <h2 className="pk-card-name">{pkg.name}</h2>
                <div className="pk-card-price">
                  <span className="pk-currency">₹</span>
                  <span className="pk-amount">{pkg.price}</span>
                </div>
                <div className="pk-card-divider" />
              </div>

              {/* Features list */}
              <ul className="pk-features">
                {pkg.items.map((item, j) => (
                  <li
                    key={j}
                    className="pk-feature"
                    style={{ animationDelay: `${j * 0.05}s` }}
                  >
                    <span className="pk-feature-check">
                      <svg viewBox="0 0 16 16" fill="none">
                        <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="pk-feature-icon">{item.icon}</span>
                    <span className="pk-feature-label">{item.label}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="pk-card-footer" onClick={() => navigate("/contact")}>
                <button className="pk-cta">
                  <span >Book This Package</span>
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 10h12M10 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {/* Background glow */}
              <div className="pk-card-glow" />

              {/* Corner accents */}
              <span className="pk-c pk-c--tl" />
              <span className="pk-c pk-c--br" />
            </div>
          ))}
        </div>
      </section>

      {/* ── COMPARISON STRIP ── */}
      <section className="pk-compare">
        <div className="pk-compare-inner">
          <p className="pk-compare-label">WHAT SETS US APART</p>
          <div className="pk-compare-items">
            {[
              ["10+", "Years of Experience"],
              ["500+", "Happy Couples"],
              ["4K", "Video Quality"],
              ["48hr", "Preview Delivery"],
              ["100%", "Satisfaction"],
            ].map(([num, label]) => (
              <div key={label} className="pk-compare-item">
                <span className="pk-ci-num">{num}</span>
                <span className="pk-ci-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section className="pk-contact">
       <div className="pk-contact-btns">
  <a href="tel:+917395864345" className="pk-contact-btn pk-contact-btn--primary">
    📞 Call Us Now
  </a>
  <a href="https://wa.me/917395864345" className="pk-contact-btn pk-contact-btn--wa">
    💬 WhatsApp
  </a>
</div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --gold:        #C9A84C;
          --gold-light:  #E8C96A;
          --gold-glow:   rgba(201,168,76,0.45);
          --gold-border: rgba(201,168,76,0.2);
          --bg:          #07060

4;
          --bg2:         #0d0b08;
          --text:        #f0ebe2;
          --muted:       rgba(240,235,226,0.45);
        }

        .pk-root {
          background: var(--bg);
          min-height: 100vh;
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
        }

        /* ════════════ HERO ════════════ */
        .pk-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          opacity: 0;
          transition: opacity 0.8s ease;
        }
        .pk-hero--visible { opacity: 1; }

        /* Grid background */
        .pk-grid-bg {
          position: absolute; inset: 0;
          display: flex; pointer-events: none;
        }
        .pk-grid-line {
          position: absolute; top: 0; bottom: 0;
          width: 1px;
          background: rgba(201,168,76,0.04);
        }

        /* Floating orbs */
        .pk-orb {
          position: absolute; border-radius: 50%;
          filter: blur(80px); pointer-events: none;
          animation: orbFloat 8s ease-in-out infinite alternate;
        }
        .pk-orb--1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(201,168,76,0.08), transparent 70%);
          top: -100px; left: -100px;
          animation-delay: 0s;
        }
        .pk-orb--2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(201,168,76,0.06), transparent 70%);
          bottom: -80px; right: -80px;
          animation-delay: -4s;
        }
        @keyframes orbFloat {
          from { transform: translate(0, 0); }
          to   { transform: translate(30px, 20px); }
        }

        .pk-hero-content {
          position: relative; z-index: 2;
          text-align: center;
          padding: 2rem;
          animation: fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.3s both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .pk-eyebrow {
          display: inline-flex; align-items: center; gap: 0.8rem;
          font-size: 0.55rem; letter-spacing: 0.5em;
          color: var(--gold); font-weight: 500;
          margin-bottom: 2rem;
        }
        .pk-ey-gem { font-size: 0.45rem; }

        .pk-hero-title {
          display: flex; flex-direction: column;
          align-items: center; gap: 0;
          margin-bottom: 2rem;
        }
        .pk-ht-top {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-weight: 300;
          font-size: clamp(2.5rem, 6vw, 5rem);
          color: var(--muted);
          letter-spacing: 0.1em;
          line-height: 1;
        }
        .pk-ht-mid {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(5rem, 13vw, 11rem);
          color: transparent;
          -webkit-text-stroke: 1.5px var(--gold);
          letter-spacing: 0.06em;
          line-height: 0.9;
        }
        .pk-ht-sub {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-weight: 300;
          font-size: clamp(1rem, 2vw, 1.4rem);
          color: var(--muted);
          letter-spacing: 0.15em;
          margin-top: 0.5rem;
        }

        .pk-hero-divider {
          display: flex; align-items: center; justify-content: center;
          gap: 1rem; margin: 2rem 0;
        }
        .pk-hdl {
          display: block; width: 80px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold));
        }
        .pk-hdl--r { background: linear-gradient(90deg, var(--gold), transparent); }
        .pk-hd-diamond {
          width: 7px; height: 7px;
          background: var(--gold); transform: rotate(45deg);
          box-shadow: 0 0 14px var(--gold-glow);
          animation: diamondPulse 2s ease infinite;
        }
        @keyframes diamondPulse {
          0%,100% { box-shadow: 0 0 14px var(--gold-glow); }
          50%     { box-shadow: 0 0 28px var(--gold-glow), 0 0 50px rgba(201,168,76,0.3); }
        }

        .pk-hero-desc {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-weight: 300;
          font-size: 1.1rem; line-height: 1.8;
          color: var(--muted); margin-bottom: 3rem;
        }

        .pk-price-range {
          display: inline-flex; align-items: center; gap: 2rem;
          border: 1px solid var(--gold-border);
          padding: 1rem 2.5rem;
          background: rgba(201,168,76,0.04);
        }
        .pk-pr-item { display: flex; flex-direction: column; gap: 0.2rem; align-items: center; }
        .pk-pr-from { font-size: 0.55rem; letter-spacing: 0.3em; color: var(--muted); }
        .pk-pr-price {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.8rem; color: var(--gold); letter-spacing: 0.05em;
        }
        .pk-pr-sep { color: var(--gold-border); font-size: 1.2rem; }

        .pk-scroll {
          position: absolute; bottom: 2.5rem; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
          font-size: 0.5rem; letter-spacing: 0.4em; color: var(--muted);
          animation: scrollBob 2.5s ease infinite;
        }
        @keyframes scrollBob {
          0%,100% { transform: translateX(-50%) translateY(0); }
          50%     { transform: translateX(-50%) translateY(7px); }
        }
        .pk-scroll-mouse {
          width: 22px; height: 34px;
          border: 1.5px solid var(--gold-border);
          border-radius: 11px;
          display: flex; justify-content: center; padding-top: 6px;
        }
        .pk-scroll-wheel {
          width: 2px; height: 7px; border-radius: 2px;
          background: var(--gold);
          animation: wheelScroll 1.8s ease infinite;
        }
        @keyframes wheelScroll {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(10px); }
        }

        /* ════════════ SECTION ════════════ */
        .pk-section {
          padding: 5rem 3rem 7rem;
          max-width: 1500px; margin: 0 auto;
        }
        .pk-section-label {
          display: flex; align-items: center; gap: 1.5rem;
          margin-bottom: 4rem; justify-content: center;
        }
        .pk-sl-line {
          display: block; height: 1px; width: 100px;
          background: linear-gradient(90deg, transparent, var(--gold-border));
        }
        .pk-sl-line--r { background: linear-gradient(90deg, var(--gold-border), transparent); }
        .pk-sl-text {
          font-size: 0.55rem; letter-spacing: 0.5em; color: var(--muted);
        }

        /* ════════════ CARDS ════════════ */
        .pk-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          align-items: start;
        }

        .pk-card {
          position: relative;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 2.5rem 2rem 2rem;
          background: var(--bg2);
          opacity: 0;
          transform: translateY(40px) scale(0.97);
          transition: opacity 0.7s ease, transform 0.7s ease,
                      border-color 0.4s ease, background 0.4s ease,
                      box-shadow 0.4s ease;
          overflow: hidden;
          cursor: pointer;
        }
        .pk-card--visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .pk-card--active {
          border-color: var(--accent);
          background: linear-gradient(135deg, rgba(255,255,255,0.04), var(--accent-glow));
          box-shadow: 0 30px 60px rgba(0,0,0,0.5), 0 0 0 1px var(--accent),
                      inset 0 1px 0 rgba(255,255,255,0.06);
          transform: translateY(-12px) scale(1.02);
        }

        /* Tag */
        .pk-tag {
          position: absolute; top: -1px; right: 20px;
          background: var(--accent);
          color: #08060

4;
          font-size: 0.55rem; font-weight: 700;
          letter-spacing: 0.15em;
          padding: 0.3rem 0.8rem;
          border-radius: 0 0 6px 6px;
        }

        /* Tier */
        .pk-tier {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 4rem;
          color: rgba(255,255,255,0.04);
          position: absolute;
          top: 1rem; left: 1.5rem;
          line-height: 1;
          letter-spacing: 0.05em;
          transition: color 0.4s ease;
          pointer-events: none;
        }
        .pk-card--active .pk-tier { color: var(--accent-glow); }

        /* Header */
        .pk-card-header { margin-bottom: 1.8rem; position: relative; z-index: 1; }
        .pk-card-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.2rem;
          letter-spacing: 0.08em;
          color: var(--text);
          margin-bottom: 0.8rem;
          transition: color 0.4s ease;
        }
        .pk-card--active .pk-card-name { color: var(--accent); }

        .pk-card-price {
          display: flex; align-items: baseline; gap: 0.2rem;
          margin-bottom: 1.2rem;
        }
        .pk-currency {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem; font-weight: 300;
          color: var(--accent); opacity: 0.7;
        }
        .pk-amount {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.5rem;
          color: var(--accent);
          letter-spacing: 0.04em;
        }

        .pk-card-divider {
          height: 1px;
          background: linear-gradient(90deg, var(--accent), transparent);
          opacity: 0.3;
          transition: opacity 0.4s ease;
        }
        .pk-card--active .pk-card-divider { opacity: 0.7; }

        /* Features */
        .pk-features {
          list-style: none;
          display: flex; flex-direction: column; gap: 0.65rem;
          margin-bottom: 2rem;
          position: relative; z-index: 1;
        }
        .pk-feature {
          display: flex; align-items: center; gap: 0.7rem;
          font-size: 0.82rem;
          color: rgba(240,235,226,0.65);
          transition: color 0.3s ease;
          line-height: 1.4;
        }
        .pk-card--active .pk-feature { color: rgba(240,235,226,0.85); }

        .pk-feature-check {
          flex-shrink: 0;
          width: 18px; height: 18px;
          border-radius: 50%;
          border: 1px solid var(--accent);
          display: flex; align-items: center; justify-content: center;
          color: var(--accent);
          opacity: 0.5;
          transition: opacity 0.3s ease;
        }
        .pk-card--active .pk-feature-check { opacity: 1; }
        .pk-feature-check svg { width: 10px; height: 10px; }

        .pk-feature-icon { font-size: 0.9rem; flex-shrink: 0; }
        .pk-feature-label { flex: 1; }

        /* CTA */
        .pk-card-footer { position: relative; z-index: 1; }
        .pk-cta {
          width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 0.7rem;
          padding: 0.9rem 1.5rem;
          border: 1px solid var(--accent);
          background: transparent;
          color: var(--accent);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem; font-weight: 500;
          letter-spacing: 0.15em;
          cursor: pointer;
          border-radius: 6px;
          position: relative; overflow: hidden;
          transition: color 0.35s ease;
        }
        .pk-cta::before {
          content: '';
          position: absolute; inset: 0;
          background: var(--accent);
          transform: translateY(101%);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .pk-cta:hover::before { transform: translateY(0); }
        .pk-cta:hover { color: #080604; }
        .pk-cta span, .pk-cta svg { position: relative; z-index: 1; }
        .pk-cta svg { width: 16px; height: 16px; }

        /* Background glow */
        .pk-card-glow {
          position: absolute;
          inset: 0; border-radius: 16px;
          background: radial-gradient(ellipse at 50% 100%, var(--accent-glow), transparent 70%);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
        }
        .pk-card--active .pk-card-glow { opacity: 1; }

        /* Corner accents */
        .pk-c {
          position: absolute;
          width: 16px; height: 16px;
          border-style: solid;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .pk-card--active .pk-c { opacity: 0.6; }
        .pk-c--tl {
          top: 10px; left: 10px;
          border-color: var(--accent) transparent transparent var(--accent);
          border-width: 1px 0 0 1px;
        }
        .pk-c--br {
          bottom: 10px; right: 10px;
          border-color: transparent var(--accent) var(--accent) transparent;
          border-width: 0 1px 1px 0;
        }

        /* ════════════ COMPARE STRIP ════════════ */
        .pk-compare {
          border-top: 1px solid rgba(201,168,76,0.08);
          border-bottom: 1px solid rgba(201,168,76,0.08);
          background: rgba(201,168,76,0.02);
          padding: 3rem 3rem;
        }
        .pk-compare-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; flex-direction: column; align-items: center; gap: 2rem;
        }
        .pk-compare-label {
          font-size: 0.55rem; letter-spacing: 0.5em; color: var(--muted);
        }
        .pk-compare-items {
          display: flex; gap: 0; width: 100%;
          border: 1px solid rgba(201,168,76,0.1);
        }
        .pk-compare-item {
          flex: 1;
          display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
          padding: 1.5rem 1rem;
          border-right: 1px solid rgba(201,168,76,0.1);
          transition: background 0.3s ease;
        }
        .pk-compare-item:last-child { border-right: none; }
        .pk-compare-item:hover { background: rgba(201,168,76,0.04); }
        .pk-ci-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem; color: var(--gold); letter-spacing: 0.05em;
        }
        .pk-ci-label {
          font-size: 0.6rem; letter-spacing: 0.2em; color: var(--muted); text-align: center;
        }

        /* ════════════ CONTACT CTA ════════════ */
        .pk-contact {
          padding: 7rem 3rem;
          text-align: center;
          position: relative; overflow: hidden;
        }
        .pk-contact::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.05), transparent 70%);
          pointer-events: none;
        }
        .pk-contact-inner { position: relative; z-index: 1; }
        .pk-contact-eyebrow {
          font-size: 0.55rem; letter-spacing: 0.5em; color: var(--gold);
          margin-bottom: 1.5rem; display: block;
        }
        .pk-contact-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 300; line-height: 1.2;
          margin-bottom: 1.2rem;
        }
        .pk-contact-title em { font-style: italic; color: var(--gold); }
        .pk-contact-sub {
          font-size: 0.9rem; color: var(--muted); margin-bottom: 3rem;
          font-family: 'Cormorant Garamond', serif; font-style: italic;
        }
        .pk-contact-btns {
          display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;
        }
        .pk-contact-btn {
          display: inline-flex; align-items: center; gap: 0.6rem;
          padding: 1rem 2.5rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem; font-weight: 500;
          letter-spacing: 0.12em; text-decoration: none;
          border-radius: 4px;
          transition: all 0.35s ease;
        }
        .pk-contact-btn--primary {
          background: var(--gold);
          color: #080604; border: 1px solid var(--gold);
        }
        .pk-contact-btn--primary:hover {
          background: transparent; color: var(--gold);
        }
        .pk-contact-btn--wa {
          background: transparent;
          color: var(--text);
          border: 1px solid rgba(255,255,255,0.15);
        }
        .pk-contact-btn--wa:hover {
          border-color: var(--gold); color: var(--gold);
        }

        /* ════════════ RESPONSIVE ════════════ */
        @media (max-width: 1200px) {
          .pk-cards { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .pk-cards { grid-template-columns: 1fr; gap: 14px; }
          .pk-section { padding: 4rem 1.5rem 5rem; }
          .pk-compare-items { flex-wrap: wrap; }
          .pk-compare-item { flex: 0 0 50%; border-bottom: 1px solid rgba(201,168,76,0.1); }
        }
      `}</style>
    </div>
  );
};

export default PackagesPage;