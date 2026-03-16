import React, { useState, useEffect, useRef } from "react";

const WHATSAPP_NUMBER = "917395864345";

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

// Build WhatsApp message with full package details
const buildWhatsAppMessage = (pkg: typeof packages[0]) => {
  const itemList = pkg.items.map((item) => `  • ${item.label}`).join("\n");
  const message =
    `Hello Eagle-View Photography! 👋\n\n` +
    `I'm interested in booking the *${pkg.name} Package* (₹${pkg.price}).\n\n` +
    `*Package Includes:*\n${itemList}\n\n` +
    `Please share availability and further details. Thank you!`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

const PackagesPage = () => {
  const [visible, setVisible]         = useState<Set<number>>(new Set());
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeCard, setActiveCard]   = useState<number | null>(1);
  const [countUp, setCountUp]         = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const t = setTimeout(() => { setHeroVisible(true); setCountUp(true); }, 80);
    return () => clearTimeout(t);
  }, []);

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

      {/* ══════════════════════════════════
          HERO — full redesign
      ══════════════════════════════════ */}
      <section className={`pk-hero ${heroVisible ? "pk-hero--visible" : ""}`}>

        {/* Subtle grid lines */}
        <div className="pk-grid-bg" aria-hidden>
          {Array(10).fill(null).map((_, i) => (
            <div key={i} className="pk-grid-line" style={{ left: `${i * 11.11}%` }} />
          ))}
        </div>

        {/* Ambient orbs */}
        <div className="pk-orb pk-orb--1" />
        <div className="pk-orb pk-orb--2" />
        <div className="pk-orb pk-orb--3" />

        {/* ── SPLIT: left text + right visual ── */}
        <div className="pk-hero-split">

          {/* Left — editorial text */}
          <div className="pk-hero-text">

            <div className="pk-hero-tag">
              <span className="pk-tag-dot" />
              <span>EAGLE-VIEW PICTURES</span>
              <span className="pk-tag-dot" />
            </div>

            <h1 className="pk-hero-heading">
              <span className="pk-h-small">Wedding</span>
              <span className="pk-h-big">Pack<span className="pk-h-outline">ages</span></span>
            </h1>

            <div className="pk-hero-rule">
              <span className="pk-hr-line" />
              <span className="pk-hr-diamond" />
              <span className="pk-hr-line pk-hr-line--r" />
            </div>

            <p className="pk-hero-sub">
              Every love story is unique.<br />
              Choose a package crafted to honour yours — beautifully, completely, forever.
            </p>

            {/* Live stats bar */}
            <div className="pk-hero-stats">
              {[
                { num: "4",    unit: "Packages",  sub: "tailored tiers"    },
                { num: "500+", unit: "Couples",   sub: "trusted us"        },
                { num: "10+",  unit: "Years",     sub: "of excellence"     },
              ].map(({ num, unit, sub }) => (
                <div key={unit} className="pk-hs-item">
                  <span className="pk-hs-num">{num}</span>
                  <div className="pk-hs-copy">
                    <span className="pk-hs-unit">{unit}</span>
                    <span className="pk-hs-sub">{sub}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Price range pill */}
            <div className="pk-price-pill">
              <span className="pk-pp-label">Starting from</span>
              <span className="pk-pp-price">₹45,000</span>
              <span className="pk-pp-sep">—</span>
              <span className="pk-pp-price">₹1,35,000</span>
              <span className="pk-pp-label">to suit every vision</span>
            </div>

            {/* Scroll CTA */}
            <button
              className="pk-hero-cta"
              onClick={() => document.getElementById("pk-packages")?.scrollIntoView({ behavior: "smooth" })}
            >
              <div className="pk-hc-left">
                <span className="pk-hc-label">View All Packages</span>
                <span className="pk-hc-sub">Compare & choose yours</span>
              </div>
              <div className="pk-hc-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>

          </div>

          {/* Right — decorative package preview cards */}
          <div className="pk-hero-visual">
            {/* Stacked preview tiles */}
            {packages.map((pkg, i) => (
              <div
                key={pkg.id}
                className="pk-preview-tile"
                style={{
                  "--tile-accent": pkg.accent,
                  "--tile-delay": `${0.2 + i * 0.12}s`,
                  "--tile-x": `${i % 2 === 0 ? "-8px" : "8px"}`,
                } as React.CSSProperties}
              >
                <span className="pk-pt-tier">{pkg.tier}</span>
                <span className="pk-pt-name">{pkg.name}</span>
                <span className="pk-pt-price">₹{pkg.price}</span>
                {pkg.tag && <span className="pk-pt-tag">{pkg.tag}</span>}
                <div className="pk-pt-bar" />
              </div>
            ))}

            {/* Floating badge */}
            <div className="pk-hero-badge">
              <span className="pk-hb-num">4K</span>
              <span className="pk-hb-label">Video Quality</span>
            </div>
          </div>

        </div>

        {/* Scroll mouse */}
        <div className="pk-scroll-ind">
          <div className="pk-scroll-mouse"><span className="pk-scroll-wheel" /></div>
          <span>SCROLL</span>
        </div>
      </section>

      {/* ══════════════════════════════════
          PACKAGES GRID
      ══════════════════════════════════ */}
      <section id="pk-packages" className="pk-section">

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
              {pkg.tag && <div className="pk-tag">{pkg.tag}</div>}
              <div className="pk-tier">{pkg.tier}</div>

              <div className="pk-card-header">
                <h2 className="pk-card-name">{pkg.name}</h2>
                <div className="pk-card-price">
                  <span className="pk-currency">₹</span>
                  <span className="pk-amount">{pkg.price}</span>
                </div>
                <div className="pk-card-divider" />
              </div>

              <ul className="pk-features">
                {pkg.items.map((item, j) => (
                  <li key={j} className="pk-feature">
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

              {/* ── WhatsApp booking CTA ── */}
              <div className="pk-card-footer">
                <a
                  href={buildWhatsAppMessage(pkg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pk-cta"
                >
                  <span className="pk-cta-wa-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </span>
                  <span>Book via WhatsApp</span>
                  <svg className="pk-cta-arrow" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 10h12M10 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>

              <div className="pk-card-glow" />
              <span className="pk-c pk-c--tl" />
              <span className="pk-c pk-c--br" />
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════
          COMPARE STRIP
      ══════════════════════════════════ */}
      <section className="pk-compare">
        <div className="pk-compare-inner">
          <p className="pk-compare-label">WHAT SETS US APART</p>
          <div className="pk-compare-items">
            {[
              ["10+",  "Years of Experience"],
              ["500+", "Happy Couples"],
              ["4K",   "Video Quality"],
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

      {/* ══════════════════════════════════
          BOTTOM CONTACT
      ══════════════════════════════════ */}
      <section className="pk-contact">
        <div className="pk-contact-inner">
          <p className="pk-contact-eyebrow">NOT SURE WHICH PACKAGE?</p>
          <h2 className="pk-contact-title">Let's talk about<br /><em>your day</em></h2>
          <p className="pk-contact-sub">We'll help you find the perfect fit for your budget and vision.</p>
          <div className="pk-contact-btns">
            <a href="tel:+917395864345" className="pk-contact-btn pk-contact-btn--primary">
              📞 Call Us Now
            </a>
            <a href="https://wa.me/917395864345" className="pk-contact-btn pk-contact-btn--wa">
              💬 WhatsApp
            </a>
          </div>
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
          --bg:          #070604;
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
          overflow: hidden;
          opacity: 0;
          transition: opacity 0.8s ease;
          display: flex;
          align-items: center;
        }
        .pk-hero--visible { opacity: 1; }

        .pk-grid-bg { position: absolute; inset: 0; pointer-events: none; }
        .pk-grid-line {
          position: absolute; top: 0; bottom: 0; width: 1px;
          background: rgba(201,168,76,0.035);
        }

        .pk-orb {
          position: absolute; border-radius: 50%;
          filter: blur(90px); pointer-events: none;
        }
        .pk-orb--1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(201,168,76,0.07), transparent 70%);
          top: -150px; left: -150px;
          animation: orbDrift 10s ease-in-out infinite alternate;
        }
        .pk-orb--2 {
          width: 450px; height: 450px;
          background: radial-gradient(circle, rgba(201,168,76,0.05), transparent 70%);
          bottom: -100px; right: -100px;
          animation: orbDrift 14s ease-in-out infinite alternate-reverse;
        }
        .pk-orb--3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(201,168,76,0.04), transparent 70%);
          top: 40%; left: 40%;
          animation: orbDrift 18s ease-in-out infinite alternate;
        }
        @keyframes orbDrift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(40px, 25px) scale(1.08); }
        }

        /* SPLIT LAYOUT */
        .pk-hero-split {
          position: relative; z-index: 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          width: 100%;
          min-height: 100vh;
          align-items: center;
          padding: 6rem;
          gap: 4rem;
        }

        /* ── LEFT TEXT ── */
        .pk-hero-text {
          display: flex;
          flex-direction: column;
          gap: 0;
          animation: heroSlideLeft 1s cubic-bezier(0.16,1,0.3,1) 0.2s both;
        }
        @keyframes heroSlideLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .pk-hero-tag {
          display: flex; align-items: center; gap: 0.7rem;
          font-size: 0.52rem; letter-spacing: 0.5em;
          color: var(--gold); font-weight: 600;
          margin-bottom: 2.5rem;
        }
        .pk-tag-dot {
          display: block; width: 4px; height: 4px; border-radius: 50%;
          background: var(--gold); box-shadow: 0 0 8px var(--gold-glow);
        }

        .pk-hero-heading {
          display: flex; flex-direction: column;
          line-height: 0.9;
          margin-bottom: 2rem;
        }
        .pk-h-small {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-weight: 300;
          font-size: clamp(2rem, 4vw, 3.5rem);
          color: rgba(240,235,226,0.3);
          letter-spacing: 0.15em;
          padding-left: 0.2em;
        }
        .pk-h-big {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(5rem, 10vw, 9.5rem);
          letter-spacing: 0.04em;
          color: var(--text);
          line-height: 0.88;
        }
        .pk-h-outline {
          color: transparent;
          -webkit-text-stroke: 1.5px var(--gold);
        }

        .pk-hero-rule {
          display: flex; align-items: center; gap: 0.8rem;
          margin-bottom: 1.8rem;
        }
        .pk-hr-line {
          display: block; height: 1px; width: 50px;
          background: linear-gradient(90deg, var(--gold), transparent);
        }
        .pk-hr-line--r { background: linear-gradient(90deg, transparent, var(--gold)); }
        .pk-hr-diamond {
          width: 6px; height: 6px;
          background: var(--gold); transform: rotate(45deg);
          box-shadow: 0 0 10px var(--gold-glow);
          animation: pulse 2.5s ease infinite;
        }
        @keyframes pulse {
          0%,100% { box-shadow: 0 0 10px var(--gold-glow); }
          50%     { box-shadow: 0 0 22px var(--gold-glow), 0 0 40px rgba(201,168,76,0.2); }
        }

        .pk-hero-sub {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-weight: 300;
          font-size: clamp(0.95rem, 1.5vw, 1.15rem);
          line-height: 1.9; color: var(--muted);
          margin-bottom: 2.5rem;
          max-width: 400px;
        }

        /* Stats bar */
        .pk-hero-stats {
          display: flex; gap: 0;
          border-top: 1px solid rgba(201,168,76,0.12);
          border-bottom: 1px solid rgba(201,168,76,0.12);
          margin-bottom: 2.5rem;
        }
        .pk-hs-item {
          flex: 1;
          display: flex; align-items: center; gap: 0.7rem;
          padding: 1.2rem 1rem;
          border-right: 1px solid rgba(201,168,76,0.1);
        }
        .pk-hs-item:last-child { border-right: none; }
        .pk-hs-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem; color: var(--gold);
          letter-spacing: 0.04em; line-height: 1; flex-shrink: 0;
        }
        .pk-hs-copy { display: flex; flex-direction: column; gap: 0.1rem; }
        .pk-hs-unit { font-size: 0.7rem; font-weight: 500; color: var(--text); letter-spacing: 0.04em; }
        .pk-hs-sub  { font-size: 0.55rem; letter-spacing: 0.1em; color: var(--muted); }

        /* Price pill */
        .pk-price-pill {
          display: flex; align-items: center; flex-wrap: wrap; gap: 0.6rem;
          border: 1px solid var(--gold-border);
          padding: 0.8rem 1.4rem;
          background: rgba(201,168,76,0.03);
          margin-bottom: 2.5rem;
          width: fit-content;
        }
        .pk-pp-label { font-size: 0.58rem; letter-spacing: 0.2em; color: var(--muted); }
        .pk-pp-price {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem; color: var(--gold); letter-spacing: 0.04em;
        }
        .pk-pp-sep { color: rgba(201,168,76,0.3); font-size: 1rem; }

        /* Hero CTA button */
        .pk-hero-cta {
          position: relative;
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; max-width: 380px;
          padding: 1.1rem 1.4rem;
          border: 1px solid rgba(201,168,76,0.25);
          background: transparent; color: var(--text);
          cursor: pointer; overflow: hidden;
          transition: border-color 0.4s ease, color 0.4s ease;
        }
        .pk-hero-cta::before {
          content: ''; position: absolute; inset: 0;
          background: var(--gold);
          transform: translateX(-101%);
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
          z-index: 0;
        }
        .pk-hero-cta:hover::before { transform: translateX(0); }
        .pk-hero-cta:hover { color: #070604; border-color: var(--gold); }
        .pk-hc-left {
          display: flex; flex-direction: column; gap: 0.2rem;
          position: relative; z-index: 1; text-align: left;
        }
        .pk-hc-label { font-size: 0.78rem; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; }
        .pk-hc-sub   { font-size: 0.56rem; letter-spacing: 0.12em; opacity: 0.5; }
        .pk-hc-icon {
          position: relative; z-index: 1;
          width: 38px; height: 38px; border-radius: 50%;
          border: 1px solid currentColor;
          display: flex; align-items: center; justify-content: center;
          opacity: 0.6; transition: all 0.3s ease; flex-shrink: 0;
        }
        .pk-hero-cta:hover .pk-hc-icon { opacity: 1; }
        .pk-hc-icon svg { width: 15px; height: 15px; }

        /* ── RIGHT VISUAL ── */
        .pk-hero-visual {
          position: relative;
          display: flex; flex-direction: column; gap: 12px;
          animation: heroSlideRight 1s cubic-bezier(0.16,1,0.3,1) 0.35s both;
        }
        @keyframes heroSlideRight {
          from { opacity: 0; transform: translateX(50px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .pk-preview-tile {
          position: relative;
          display: flex; align-items: center;
          padding: 1.2rem 1.8rem;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          background: rgba(255,255,255,0.02);
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
          animation: tileIn 0.8s cubic-bezier(0.16,1,0.3,1) var(--tile-delay) both;
        }
        @keyframes tileIn {
          from { opacity: 0; transform: translateX(var(--tile-x)) scale(0.96); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        .pk-preview-tile:hover {
          border-color: var(--tile-accent);
          background: rgba(255,255,255,0.04);
          transform: translateX(-6px);
          box-shadow: 6px 0 30px rgba(0,0,0,0.3);
        }

        .pk-pt-tier {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.5rem; color: rgba(255,255,255,0.04);
          letter-spacing: 0.05em; line-height: 1;
          margin-right: 1.2rem; flex-shrink: 0;
          transition: color 0.4s ease;
        }
        .pk-preview-tile:hover .pk-pt-tier { color: var(--tile-accent); opacity: 0.25; }

        .pk-pt-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.8rem; letter-spacing: 0.06em;
          color: var(--text); flex: 1;
          transition: color 0.4s ease;
        }
        .pk-preview-tile:hover .pk-pt-name { color: var(--tile-accent); }

        .pk-pt-price {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.3rem; color: var(--muted);
          letter-spacing: 0.04em; margin-left: auto; padding-left: 1rem;
          transition: color 0.4s ease;
        }
        .pk-preview-tile:hover .pk-pt-price { color: var(--tile-accent); }

        .pk-pt-tag {
          position: absolute; top: 0; right: 16px;
          background: var(--tile-accent); color: #070604;
          font-size: 0.48rem; font-weight: 700; letter-spacing: 0.15em;
          padding: 0.25rem 0.6rem; border-radius: 0 0 5px 5px;
        }

        .pk-pt-bar {
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 3px;
          background: var(--tile-accent);
          opacity: 0; transform: scaleY(0);
          transform-origin: top;
          transition: opacity 0.3s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1);
          border-radius: 0 2px 2px 0;
        }
        .pk-preview-tile:hover .pk-pt-bar { opacity: 1; transform: scaleY(1); }

        /* Floating badge */
        .pk-hero-badge {
          position: absolute;
          bottom: -20px; right: -20px;
          width: 90px; height: 90px;
          border-radius: 50%;
          border: 1px solid var(--gold-border);
          background: rgba(201,168,76,0.06);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 0.1rem;
          animation: badgeSpin 20s linear infinite;
        }
        @keyframes badgeSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .pk-hb-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.4rem; color: var(--gold); letter-spacing: 0.05em; line-height: 1;
          animation: badgeSpin 20s linear infinite reverse;
        }
        .pk-hb-label {
          font-size: 0.42rem; letter-spacing: 0.2em; color: var(--muted);
          animation: badgeSpin 20s linear infinite reverse;
          text-align: center; max-width: 60px;
        }

        /* Scroll indicator */
        .pk-scroll-ind {
          position: absolute; bottom: 2.5rem; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
          font-size: 0.5rem; letter-spacing: 0.4em; color: var(--muted);
          z-index: 3;
          animation: scrollBob 2.5s ease infinite;
        }
        @keyframes scrollBob {
          0%,100% { transform: translateX(-50%) translateY(0); }
          50%     { transform: translateX(-50%) translateY(7px); }
        }
        .pk-scroll-mouse {
          width: 22px; height: 34px; border-radius: 11px;
          border: 1.5px solid var(--gold-border);
          display: flex; justify-content: center; padding-top: 6px;
        }
        .pk-scroll-wheel {
          width: 2px; height: 7px; border-radius: 2px; background: var(--gold);
          animation: wheelScroll 1.8s ease infinite;
        }
        @keyframes wheelScroll {
          0%   { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(10px); }
        }

        /* ════════════ PACKAGES SECTION ════════════ */
        .pk-section { padding: 5rem 3rem 7rem; max-width: 1500px; margin: 0 auto; }
        .pk-section-label {
          display: flex; align-items: center; gap: 1.5rem;
          margin-bottom: 4rem; justify-content: center;
        }
        .pk-sl-line {
          display: block; height: 1px; width: 100px;
          background: linear-gradient(90deg, transparent, var(--gold-border));
        }
        .pk-sl-line--r { background: linear-gradient(90deg, var(--gold-border), transparent); }
        .pk-sl-text { font-size: 0.55rem; letter-spacing: 0.5em; color: var(--muted); }

        /* Cards */
        .pk-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px; align-items: start;
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
                      border-color 0.4s ease, background 0.4s ease, box-shadow 0.4s ease;
          overflow: hidden; cursor: pointer;
        }
        .pk-card--visible { opacity: 1; transform: translateY(0) scale(1); }
        .pk-card--active {
          border-color: var(--accent);
          background: linear-gradient(135deg, rgba(255,255,255,0.04), var(--accent-glow));
          box-shadow: 0 30px 60px rgba(0,0,0,0.5), 0 0 0 1px var(--accent),
                      inset 0 1px 0 rgba(255,255,255,0.06);
          transform: translateY(-12px) scale(1.02);
        }
        .pk-tag {
          position: absolute; top: -1px; right: 20px;
          background: var(--accent); color: #070604;
          font-size: 0.55rem; font-weight: 700; letter-spacing: 0.15em;
          padding: 0.3rem 0.8rem; border-radius: 0 0 6px 6px;
        }
        .pk-tier {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 4rem; color: rgba(255,255,255,0.04);
          position: absolute; top: 1rem; left: 1.5rem;
          line-height: 1; letter-spacing: 0.05em;
          transition: color 0.4s ease; pointer-events: none;
        }
        .pk-card--active .pk-tier { color: var(--accent-glow); }
        .pk-card-header { margin-bottom: 1.8rem; position: relative; z-index: 1; }
        .pk-card-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.2rem; letter-spacing: 0.08em; color: var(--text);
          margin-bottom: 0.8rem; transition: color 0.4s ease;
        }
        .pk-card--active .pk-card-name { color: var(--accent); }
        .pk-card-price { display: flex; align-items: baseline; gap: 0.2rem; margin-bottom: 1.2rem; }
        .pk-currency {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem; font-weight: 300; color: var(--accent); opacity: 0.7;
        }
        .pk-amount {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.5rem; color: var(--accent); letter-spacing: 0.04em;
        }
        .pk-card-divider {
          height: 1px;
          background: linear-gradient(90deg, var(--accent), transparent);
          opacity: 0.3; transition: opacity 0.4s ease;
        }
        .pk-card--active .pk-card-divider { opacity: 0.7; }
        .pk-features {
          list-style: none;
          display: flex; flex-direction: column; gap: 0.65rem;
          margin-bottom: 2rem; position: relative; z-index: 1;
        }
        .pk-feature {
          display: flex; align-items: center; gap: 0.7rem;
          font-size: 0.82rem; color: rgba(240,235,226,0.65);
          transition: color 0.3s ease; line-height: 1.4;
        }
        .pk-card--active .pk-feature { color: rgba(240,235,226,0.85); }
        .pk-feature-check {
          flex-shrink: 0; width: 18px; height: 18px; border-radius: 50%;
          border: 1px solid var(--accent);
          display: flex; align-items: center; justify-content: center;
          color: var(--accent); opacity: 0.5; transition: opacity 0.3s ease;
        }
        .pk-card--active .pk-feature-check { opacity: 1; }
        .pk-feature-check svg { width: 10px; height: 10px; }
        .pk-feature-icon { font-size: 0.9rem; flex-shrink: 0; }
        .pk-feature-label { flex: 1; }

        /* WhatsApp CTA */
        .pk-card-footer { position: relative; z-index: 1; }
        .pk-cta {
          width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 0.6rem;
          padding: 0.9rem 1.5rem;
          border: 1px solid var(--accent);
          background: transparent; color: var(--accent);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem; font-weight: 500; letter-spacing: 0.12em;
          cursor: pointer; border-radius: 6px;
          position: relative; overflow: hidden;
          transition: color 0.35s ease;
          text-decoration: none;
        }
        .pk-cta::before {
          content: ''; position: absolute; inset: 0;
          background: var(--accent);
          transform: translateY(101%);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .pk-cta:hover::before { transform: translateY(0); }
        .pk-cta:hover { color: #070604; }
        .pk-cta span, .pk-cta-arrow, .pk-cta-wa-icon { position: relative; z-index: 1; }
        .pk-cta-wa-icon { width: 16px; height: 16px; display: flex; flex-shrink: 0; }
        .pk-cta-wa-icon svg { width: 100%; height: 100%; }
        .pk-cta-arrow { width: 16px; height: 16px; }

        .pk-card-glow {
          position: absolute; inset: 0; border-radius: 16px;
          background: radial-gradient(ellipse at 50% 100%, var(--accent-glow), transparent 70%);
          opacity: 0; transition: opacity 0.5s ease; pointer-events: none;
        }
        .pk-card--active .pk-card-glow { opacity: 1; }
        .pk-c {
          position: absolute; width: 16px; height: 16px; border-style: solid;
          opacity: 0; transition: opacity 0.4s ease; pointer-events: none;
        }
        .pk-card--active .pk-c { opacity: 0.6; }
        .pk-c--tl { top: 10px; left: 10px; border-color: var(--accent) transparent transparent var(--accent); border-width: 1px 0 0 1px; }
        .pk-c--br { bottom: 10px; right: 10px; border-color: transparent var(--accent) var(--accent) transparent; border-width: 0 1px 1px 0; }

        /* ════════════ COMPARE ════════════ */
        .pk-compare {
          border-top: 1px solid rgba(201,168,76,0.08);
          border-bottom: 1px solid rgba(201,168,76,0.08);
          background: rgba(201,168,76,0.02); padding: 3rem;
        }
        .pk-compare-inner { max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 2rem; }
        .pk-compare-label { font-size: 0.55rem; letter-spacing: 0.5em; color: var(--muted); }
        .pk-compare-items { display: flex; gap: 0; width: 100%; border: 1px solid rgba(201,168,76,0.1); }
        .pk-compare-item {
          flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
          padding: 1.5rem 1rem;
          border-right: 1px solid rgba(201,168,76,0.1);
          transition: background 0.3s ease;
        }
        .pk-compare-item:last-child { border-right: none; }
        .pk-compare-item:hover { background: rgba(201,168,76,0.04); }
        .pk-ci-num { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; color: var(--gold); letter-spacing: 0.05em; }
        .pk-ci-label { font-size: 0.6rem; letter-spacing: 0.2em; color: var(--muted); text-align: center; }

        /* ════════════ CONTACT ════════════ */
        .pk-contact {
          padding: 7rem 3rem; text-align: center;
          position: relative; overflow: hidden;
        }
        .pk-contact::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.05), transparent 70%);
          pointer-events: none;
        }
        .pk-contact-inner { position: relative; z-index: 1; }
        .pk-contact-eyebrow { font-size: 0.55rem; letter-spacing: 0.5em; color: var(--gold); margin-bottom: 1.5rem; display: block; }
        .pk-contact-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 300; line-height: 1.2; margin-bottom: 1.2rem;
        }
        .pk-contact-title em { font-style: italic; color: var(--gold); }
        .pk-contact-sub { font-size: 0.9rem; color: var(--muted); margin-bottom: 3rem; font-family: 'Cormorant Garamond', serif; font-style: italic; }
        .pk-contact-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
        .pk-contact-btn {
          display: inline-flex; align-items: center; gap: 0.6rem;
          padding: 1rem 2.5rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem; font-weight: 500; letter-spacing: 0.12em;
          text-decoration: none; border-radius: 4px; transition: all 0.35s ease;
        }
        .pk-contact-btn--primary { background: var(--gold); color: #070604; border: 1px solid var(--gold); }
        .pk-contact-btn--primary:hover { background: transparent; color: var(--gold); }
        .pk-contact-btn--wa { background: transparent; color: var(--text); border: 1px solid rgba(255,255,255,0.15); }
        .pk-contact-btn--wa:hover { border-color: var(--gold); color: var(--gold); }

        /* ════════════ RESPONSIVE ════════════ */
        @media (max-width: 1200px) {
          .pk-hero-split { padding: 5rem 3rem; gap: 3rem; }
          .pk-cards { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 900px) {
          .pk-hero-split { grid-template-columns: 1fr; min-height: auto; padding: 5rem 2rem 4rem; }
          .pk-hero-visual { display: none; }
        }
        @media (max-width: 768px) {
          .pk-cards { grid-template-columns: 1fr; gap: 14px; }
          .pk-section { padding: 4rem 1.5rem 5rem; }
          .pk-compare-items { flex-wrap: wrap; }
          .pk-compare-item { flex: 0 0 50%; border-bottom: 1px solid rgba(201,168,76,0.1); }
          .pk-contact { padding: 5rem 1.5rem; }
        }
      `}</style>
    </div>
  );
};

export default PackagesPage;