import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const VideoHero = () => {
  const [loaded, setLoaded]     = useState(false);
  const [lineIdx, setLineIdx]   = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Stagger text lines in one by one after video loads
  useEffect(() => {
    if (!loaded) return;
    const timers = [0, 400, 800, 1300, 1900].map((delay, i) =>
      setTimeout(() => setLineIdx(i + 1), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [loaded]);

  const scrollToContent = () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section className="vh-root">

      {/* ── VIDEO ── */}
      <video
        ref={videoRef}
        className="vh-video"
        src="/Videos/Backgorund1.mp4"       // ← change to your video path
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={() => setLoaded(true)}
      />

      {/* ── Multi-layer overlays ── */}
      {/* Base dark veil */}
      <div className="vh-overlay vh-overlay--base" />
      {/* Radial vignette */}
      <div className="vh-overlay vh-overlay--vignette" />
      {/* Bottom gradient to blend into page bg */}
      <div className="vh-overlay vh-overlay--bottom" />
      {/* Subtle top fade */}
      <div className="vh-overlay vh-overlay--top" />
      {/* Fine grain texture */}
      <div className="vh-grain" />

      {/* ── CONTENT ── */}
      <div className={`vh-content ${loaded ? "vh-content--ready" : ""}`}>

        {/* Top eyebrow */}
        <div className={`vh-eyebrow ${lineIdx >= 1 ? "vh-in" : ""}`}>
          <span className="vh-ey-line" />
          <span className="vh-ey-text">EAGLE-VIEW PICTURES</span>
          <span className="vh-ey-dot" />
          <span className="vh-ey-text">EST. 2013</span>
          <span className="vh-ey-line vh-ey-line--r" />
        </div>

        {/* Main heading */}
        <h1 className="vh-heading">
          <span className={`vh-h-row vh-h-row--1 ${lineIdx >= 2 ? "vh-in" : ""}`}>
            <span className="vh-h-thin">Crafting</span>
          </span>
          <span className={`vh-h-row vh-h-row--2 ${lineIdx >= 2 ? "vh-in" : ""}`}>
            <span className="vh-h-bold">Timeless</span>
            <span className="vh-h-outline"> Stories</span>
          </span>
          <span className={`vh-h-row vh-h-row--3 ${lineIdx >= 3 ? "vh-in" : ""}`}>
            <span className="vh-h-script">through the lens</span>
          </span>
        </h1>

        {/* Divider */}
        <div className={`vh-divider ${lineIdx >= 3 ? "vh-in" : ""}`}>
          <span className="vh-div-line" />
          <span className="vh-div-diamond" />
          <span className="vh-div-line vh-div-line--r" />
        </div>

        {/* Sub-copy */}
        <p className={`vh-sub ${lineIdx >= 4 ? "vh-in" : ""}`}>
          Wedding &nbsp;·&nbsp; Pre-Wedding &nbsp;·&nbsp; Candid &nbsp;·&nbsp; Portraits
        </p>

        {/* CTA row */}
        <div className={`vh-ctas ${lineIdx >= 5 ? "vh-in" : ""}`}>
          <Link to="/gallery" className="vh-cta vh-cta--primary">
            <span>View Gallery</span>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 10h12M10 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="vh-cta-fill" />
          </Link>

          <Link to="/Packages" className="vh-cta vh-cta--ghost">
            <span>Our Packages</span>
          </Link>
        </div>

      </div>

      {/* ── Left side vertical label ── */}
      <div className="vh-side-label vh-side-label--left">
        <span>WEDDING PHOTOGRAPHY</span>
      </div>

      {/* ── Right side social strip ── */}
      <div className="vh-side-label vh-side-label--right">
        <a href="https://www.instagram.com/eagle_view_photogrphy" target="_blank" rel="noopener noreferrer" className="vh-social">IG</a>
        <span className="vh-social-line" />
        <a href="https://youtube.com/@eagle_view_photography" target="_blank" rel="noopener noreferrer" className="vh-social">YT</a>
        <span className="vh-social-line" />
        <a href="https://wa.me/917395864345" target="_blank" rel="noopener noreferrer" className="vh-social">WA</a>
      </div>

      {/* ── Bottom center: scroll indicator + location ── */}
      <div className="vh-bottom-bar">
        <div className="vh-location">
          <span className="vh-loc-dot" />
          <span>Paramakudi, Tamil Nadu</span>
        </div>

        <button className="vh-scroll" onClick={scrollToContent} aria-label="Scroll down">
          <div className="vh-scroll-mouse">
            <span className="vh-scroll-wheel" />
          </div>
          <span className="vh-scroll-text">SCROLL</span>
        </button>

        <div className="vh-frame-count">
          <span className="vh-fc-num">500+</span>
          <span className="vh-fc-label">Love Stories</span>
        </div>
      </div>

      {/* ── Decorative corner brackets ── */}
      <span className="vh-corner vh-corner--tl" />
      <span className="vh-corner vh-corner--tr" />
      <span className="vh-corner vh-corner--bl" />
      <span className="vh-corner vh-corner--br" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Bebas+Neue&family=Great+Vibes&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --gold:      #C9A84C;
          --gold-lt:   #E8C96A;
          --gold-glow: rgba(201,168,76,0.5);
          --gold-bd:   rgba(201,168,76,0.22);
          --bg:        #080604;
        }

        .vh-root {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 600px;
          overflow: hidden;
          background: var(--bg);
          font-family: 'DM Sans', sans-serif;
        }

        /* ── VIDEO ── */
        .vh-video {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center;
          transform: scale(1.04);
          animation: vhZoom 18s cubic-bezier(0.25,0.46,0.45,0.94) forwards;
        }
        @keyframes vhZoom {
          from { transform: scale(1.04); }
          to   { transform: scale(1); }
        }

        /* ── OVERLAYS ── */
        .vh-overlay { position: absolute; inset: 0; pointer-events: none; }

        .vh-overlay--base {
          background: rgba(6,4,2,0.48);
        }
        .vh-overlay--vignette {
          background: radial-gradient(ellipse at 50% 50%,
            transparent 30%,
            rgba(4,3,1,0.55) 75%,
            rgba(4,3,1,0.85) 100%);
        }
        .vh-overlay--bottom {
          background: linear-gradient(to top,
            rgba(8,6,4,1) 0%,
            rgba(8,6,4,0.6) 15%,
            transparent 40%);
        }
        .vh-overlay--top {
          background: linear-gradient(to bottom,
            rgba(8,6,4,0.5) 0%,
            transparent 25%);
        }

        /* Grain texture */
        .vh-grain {
          position: absolute; inset: 0;
          pointer-events: none;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
        }

        /* ── CONTENT ── */
        .vh-content {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center;
          padding: 6rem 2rem 10rem;
          z-index: 2;
        }

        /* Stagger helper */
        .vh-eyebrow,
        .vh-h-row,
        .vh-divider,
        .vh-sub,
        .vh-ctas {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1),
                      transform 0.9s cubic-bezier(0.16,1,0.3,1);
        }
        .vh-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        /* Eyebrow */
        .vh-eyebrow {
          display: flex; align-items: center; gap: 0.7rem;
          margin-bottom: 2rem;
        }
        .vh-ey-line {
          display: block; width: 36px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold));
        }
        .vh-ey-line--r { background: linear-gradient(90deg, var(--gold), transparent); }
        .vh-ey-text {
          font-size: 0.52rem; font-weight: 600;
          letter-spacing: 0.5em; color: var(--gold);
        }
        .vh-ey-dot {
          width: 3px; height: 3px; border-radius: 50%;
          background: rgba(201,168,76,0.4); flex-shrink: 0;
        }

        /* Heading */
        .vh-heading {
          display: flex; flex-direction: column;
          align-items: center; gap: 0;
          margin-bottom: 1.5rem;
          line-height: 1;
        }

        .vh-h-row {
          display: block;
          transition-delay: 0s !important; /* individual via inline not needed, parent staggers */
        }
        .vh-h-row--1 { transition-delay: 0s; }
        .vh-h-row--2 { transition-delay: 0.15s; }
        .vh-h-row--3 { transition-delay: 0.3s; }

        .vh-h-thin {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-weight: 300;
          font-size: clamp(1.8rem, 4vw, 3rem);
          color: rgba(240,235,226,0.45);
          letter-spacing: 0.18em;
          display: block;
        }
        .vh-h-bold {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(5rem, 12vw, 10.5rem);
          color: #fff;
          letter-spacing: 0.04em;
        }
        .vh-h-outline {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(5rem, 12vw, 10.5rem);
          color: transparent;
          -webkit-text-stroke: 1.5px var(--gold);
          letter-spacing: 0.04em;
        }
        .vh-h-script {
          font-family: 'Great Vibes', cursive;
          font-size: clamp(1.8rem, 4vw, 3.2rem);
          color: rgba(240,235,226,0.55);
          display: block;
          margin-top: -0.2em;
          letter-spacing: 0.05em;
          animation: scriptShimmer 5s ease 2s infinite;
        }
        @keyframes scriptShimmer {
          0%,100% { color: rgba(240,235,226,0.55); }
          50%     { color: rgba(201,168,76,0.7); }
        }

        /* Divider */
        .vh-divider {
          display: flex; align-items: center; gap: 0.9rem;
          margin: 1.5rem 0;
        }
        .vh-div-line {
          display: block; width: 60px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold));
        }
        .vh-div-line--r { background: linear-gradient(90deg, var(--gold), transparent); }
        .vh-div-diamond {
          width: 7px; height: 7px;
          background: var(--gold); transform: rotate(45deg);
          box-shadow: 0 0 14px var(--gold-glow);
          animation: diamondGlow 2.5s ease infinite;
        }
        @keyframes diamondGlow {
          0%,100% { box-shadow: 0 0 14px var(--gold-glow); }
          50%     { box-shadow: 0 0 28px var(--gold-glow), 0 0 50px rgba(201,168,76,0.3); }
        }

        /* Sub text */
        .vh-sub {
          font-size: clamp(0.7rem, 1.2vw, 0.85rem);
          letter-spacing: 0.35em;
          color: rgba(240,235,226,0.4);
          font-weight: 500;
          margin-bottom: 2.5rem;
        }

        /* CTA row */
        .vh-ctas {
          display: flex; align-items: center; gap: 1.2rem;
        }

        .vh-cta {
          position: relative;
          display: inline-flex; align-items: center; gap: 0.7rem;
          padding: 0.95rem 2.2rem;
          font-size: 0.72rem; font-weight: 500;
          letter-spacing: 0.2em; text-decoration: none;
          overflow: hidden;
          transition: color 0.35s ease;
        }

        .vh-cta--primary {
          border: 1px solid var(--gold);
          color: var(--bg);
          background: var(--gold);
        }
        .vh-cta-fill {
          position: absolute; inset: 0;
          background: var(--gold-lt);
          transform: translateX(-101%);
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
          z-index: 0;
        }
        .vh-cta--primary:hover .vh-cta-fill { transform: translateX(0); }
        .vh-cta--primary span,
        .vh-cta--primary svg { position: relative; z-index: 1; }
        .vh-cta--primary svg { width: 16px; height: 16px; }

        .vh-cta--ghost {
          border: 1px solid rgba(201,168,76,0.35);
          color: rgba(240,235,226,0.75);
          background: transparent;
        }
        .vh-cta--ghost::before {
          content: '';
          position: absolute; inset: 0;
          background: rgba(201,168,76,0.08);
          transform: translateX(-101%);
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
        }
        .vh-cta--ghost:hover::before { transform: translateX(0); }
        .vh-cta--ghost:hover { color: #fff; border-color: var(--gold); }
        .vh-cta--ghost span { position: relative; z-index: 1; }

        /* ── SIDE LABELS ── */
        .vh-side-label {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.8rem;
          z-index: 3;
        }
        .vh-side-label--left {
          left: 2rem;
        }
        .vh-side-label--left span {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
          font-size: 0.48rem;
          letter-spacing: 0.4em;
          color: rgba(201,168,76,0.3);
        }
        .vh-side-label--right {
          right: 2rem;
          gap: 0.6rem;
        }
        .vh-social {
          font-size: 0.5rem;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.35);
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s;
        }
        .vh-social:hover { color: var(--gold); }
        .vh-social-line {
          display: block; width: 1px; height: 20px;
          background: rgba(201,168,76,0.2);
        }

        /* ── BOTTOM BAR ── */
        .vh-bottom-bar {
          position: absolute;
          bottom: 2.5rem; left: 0; right: 0;
          display: flex; align-items: center;
          justify-content: space-between;
          padding: 0 4rem;
          z-index: 3;
        }

        .vh-location {
          display: flex; align-items: center; gap: 0.5rem;
          font-size: 0.55rem; letter-spacing: 0.25em;
          color: rgba(255,255,255,0.25);
        }
        .vh-loc-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--gold); opacity: 0.6;
          animation: locPulse 2s ease infinite;
        }
        @keyframes locPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(201,168,76,0.4); }
          50%     { box-shadow: 0 0 0 5px rgba(201,168,76,0); }
        }

        .vh-scroll {
          display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
          background: none; border: none; cursor: pointer;
          font-size: 0.48rem; letter-spacing: 0.4em;
          color: rgba(255,255,255,0.3);
          animation: scrollBob 2.5s ease infinite;
        }
        @keyframes scrollBob {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(6px); }
        }
        .vh-scroll-mouse {
          width: 20px; height: 32px; border-radius: 10px;
          border: 1.5px solid rgba(201,168,76,0.3);
          display: flex; justify-content: center; padding-top: 6px;
        }
        .vh-scroll-wheel {
          width: 2px; height: 6px; border-radius: 2px; background: var(--gold);
          animation: wheelScroll 1.8s ease infinite;
        }
        @keyframes wheelScroll {
          0%   { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(8px); }
        }
        .vh-scroll-text { font-size: 0.45rem; letter-spacing: 0.4em; }

        .vh-frame-count {
          display: flex; flex-direction: column; align-items: flex-end; gap: 0.1rem;
        }
        .vh-fc-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.4rem; color: rgba(201,168,76,0.4); letter-spacing: 0.06em; line-height: 1;
        }
        .vh-fc-label {
          font-size: 0.45rem; letter-spacing: 0.25em;
          color: rgba(255,255,255,0.2);
        }

        /* ── CORNER BRACKETS ── */
        .vh-corner {
          position: absolute; width: 24px; height: 24px;
          border-style: solid; border-color: rgba(201,168,76,0.2);
          z-index: 3; pointer-events: none;
        }
        .vh-corner--tl { top: 20px; left: 20px; border-width: 1px 0 0 1px; }
        .vh-corner--tr { top: 20px; right: 20px; border-width: 1px 1px 0 0; }
        .vh-corner--bl { bottom: 20px; left: 20px; border-width: 0 0 1px 1px; }
        .vh-corner--br { bottom: 20px; right: 20px; border-width: 0 1px 1px 0; }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .vh-side-label { display: none; }
          .vh-bottom-bar { padding: 0 1.5rem; }
          .vh-ctas { flex-direction: column; gap: 0.8rem; }
          .vh-cta { width: 100%; justify-content: center; }
          .vh-h-bold, .vh-h-outline { font-size: clamp(4rem, 16vw, 6rem); }
          .vh-content { padding: 5rem 1.5rem 8rem; }
          .vh-corner { width: 16px; height: 16px; }
        }
      `}</style>
    </section>
  );
};

export default VideoHero;