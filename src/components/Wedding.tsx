import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

type Couple = {
  name: string;
  subtitle: string;
  date: string;
  image: string;
  path: string;
};

const couples: Couple[] = [
  {
    name: "KEDAR & MRINALINI",
    subtitle: "A love written in golden light",
    date: "NOV 2024",
    image: "/Images/img5.jpg",
    path: "./viewphotos1",
  },
  {
    name: "RAVINDAR & JAYA",
    subtitle: "Two souls, one forever",
    date: "JAN 2025",
    image: "/Images/img2.jpg",
    path: "./viewphotos2",
  },
  {
    name: "RAVI & JANU",
    subtitle: "Where every frame tells a story",
    date: "MAR 2025",
    image: "/Images/1.jpg.jpeg",
    path: "./viewphotos3",
  },
];

const Wedding = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const DURATION = 5000;

  const goTo = (idx: number) => {
    if (transitioning || idx === active) return;
    setTransitioning(true);
    setPrev(active);
    setActive(idx);
    setProgress(0);
    setTimeout(() => { setPrev(null); setTransitioning(false); }, 900);
  };

  useEffect(() => {
    autoRef.current = setInterval(() => {
      setActive((a) => {
        const next = (a + 1) % couples.length;
        setPrev(a);
        setTransitioning(true);
        setProgress(0);
        setTimeout(() => { setPrev(null); setTransitioning(false); }, 900);
        return next;
      });
    }, DURATION);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, []);

  useEffect(() => {
    setProgress(0);
    if (progressRef.current) clearInterval(progressRef.current);
    const step = 100 / (DURATION / 50);
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + step, 100));
    }, 50);
    return () => { if (progressRef.current) clearInterval(progressRef.current); };
  }, [active]);

  const current = couples[active];

  return (
    <div className="wd-root">

      {/* ── Background layers ── */}
      {couples.map((c, i) => (
        <div
          key={c.image}
          className={`wd-bg ${i === active ? "wd-bg--active" : ""} ${i === prev ? "wd-bg--prev" : ""}`}
          style={{ backgroundImage: `url(${c.image})` }}
        />
      ))}

      <div className="wd-overlay" />
      <div className="wd-vignette" />

      {/* ── Top bar ── */}
      <div className="wd-topbar">
        <div className="wd-brand">
          <span className="wd-brand-line" />
          <span className="wd-brand-text">EAGLE VIEW PHOTOGRAPHY</span>
          <span className="wd-brand-line wd-brand-line--r" />
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="wd-content">

        {/* Left — couple info */}
        <div className="wd-left">
          <div className={`wd-info ${transitioning ? "wd-info--out" : "wd-info--in"}`}>

            <p className="wd-eyebrow">
              <span className="wd-ey-dot" />
              WEDDING STORIES
            </p>

            <h1 className="wd-couple-name">{current.name}</h1>

            <div className="wd-name-rule">
              <span className="wd-rule-line" />
              <span className="wd-rule-gem" />
            </div>

            <p className="wd-subtitle">{current.subtitle}</p>

            <div className="wd-meta">
              <span className="wd-date">{current.date}</span>
              <span className="wd-meta-sep">·</span>
              <span className="wd-location">Tamil Nadu, India</span>
            </div>

            <button
              className="wd-btn"
              onClick={() => { navigate(current.path); window.scrollTo(0, 0); }}
            >
              <span className="wd-btn-text">VIEW PHOTOS</span>
              <span className="wd-btn-arrow">→</span>
              <span className="wd-btn-glow" />
            </button>
          </div>
        </div>

        {/* Right — couple selector */}
        <div className="wd-right">
          <ul className="wd-list">
            {couples.map((c, i) => (
              <li
                key={i}
                className={`wd-list-item ${i === active ? "wd-list-item--active" : ""}`}
                onClick={() => goTo(i)}
              >
                <div className="wd-thumb-wrap">
                  <img src={c.image} alt={c.name} className="wd-thumb" />
                  <div className="wd-thumb-overlay" />
                </div>
                <div className="wd-list-info">
                  <span className="wd-list-name">{c.name}</span>
                  <span className="wd-list-date">{c.date}</span>
                </div>
                <span className="wd-list-arrow">→</span>

                {i === active && (
                  <div className="wd-list-progress">
                    <div className="wd-list-progress-fill" style={{ width: `${progress}%` }} />
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="wd-counter">
            <span className="wd-counter-active">{String(active + 1).padStart(2, "0")}</span>
            <span className="wd-counter-sep"> / </span>
            <span className="wd-counter-total">{String(couples.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>

      {/* ── Bottom dots ── */}
      <div className="wd-dots">
        {couples.map((_, i) => (
          <button
            key={i}
            className={`wd-dot ${i === active ? "wd-dot--active" : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Great+Vibes&family=Montserrat:wght@300;400;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --g-primary: #C9A84C;
          --g-light:   #E8C96A;
          --g-pale:    #F5DFA0;
          --g-deep:    #9A7228;
          --g-glow:    rgba(201,168,76,0.6);
          --g-glow-sm: rgba(201,168,76,0.35);
          --g-border:  rgba(201,168,76,0.35);
          --g-faint:   rgba(201,168,76,0.06);
        }

        .wd-root {
          position: relative;
          width: 100%; height: 100vh;
          min-height: 600px;
          overflow: hidden;
          font-family: 'Montserrat', sans-serif;
          background: #080604;
        }

        /* ── Backgrounds ── */
        .wd-bg {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
          opacity: 0;
          transition: opacity 0.9s ease;
          transform: scale(1.05);
          will-change: opacity, transform;
        }
        .wd-bg--active {
          opacity: 1;
          animation: wd-zoom 6s ease forwards;
        }
        .wd-bg--prev { opacity: 0; }
        @keyframes wd-zoom {
          from { transform: scale(1.05); }
          to   { transform: scale(1); }
        }

        /* ── Overlays ── */
        .wd-overlay {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(
            105deg,
            rgba(8,6,4,0.80) 0%,
            rgba(8,6,4,0.42) 50%,
            rgba(8,6,4,0.70) 100%
          );
        }
        .wd-vignette {
          position: absolute; inset: 0; z-index: 2;
          background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%);
        }

        /* ── Top bar ── */
        .wd-topbar {
          position: absolute; top: 2rem; left: 0; right: 0;
          display: flex; justify-content: center; z-index: 10;
        }
        .wd-brand {
          display: flex; align-items: center; gap: 1rem;
        }
        .wd-brand-line {
          display: block; width: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--g-glow-sm));
        }
        .wd-brand-line--r {
          background: linear-gradient(90deg, var(--g-glow-sm), transparent);
        }
        .wd-brand-text {
          font-size: 0.58rem; font-weight: 600;
          letter-spacing: 0.45em;
          color: rgba(255,255,255,0.55);
        }

        /* ── Main content ── */
        .wd-content {
          position: absolute; inset: 0; z-index: 5;
          display: flex; align-items: center;
          padding: 5rem 5% 4rem; gap: 2rem;
        }

        /* Left */
        .wd-left { flex: 1; display: flex; align-items: center; }
        .wd-info { display: flex; flex-direction: column; gap: 1.1rem; }
        .wd-info--in  { animation: wd-in  0.7s cubic-bezier(0.16,1,0.3,1) forwards; }
        .wd-info--out { animation: wd-out 0.35s ease forwards; }

        @keyframes wd-in {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes wd-out {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-16px); }
        }

        /* Eyebrow */
        .wd-eyebrow {
          display: flex; align-items: center; gap: 0.6rem;
          font-size: 0.62rem; font-weight: 600;
          letter-spacing: 0.45em; color: #ffffff;
        }
        .wd-ey-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--g-primary);
          box-shadow: 0 0 10px var(--g-glow);
          animation: pulse 2s ease infinite;
          flex-shrink: 0;
        }
        @keyframes pulse {
          0%,100% { box-shadow: 0 0 0 0 var(--g-glow-sm); }
          50%      { box-shadow: 0 0 0 7px rgba(201,168,76,0); }
        }

        /* Couple name */
        .wd-couple-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.2rem, 4.5vw, 4rem);
          font-weight: 300; color: #fff;
          line-height: 1.1; letter-spacing: 0.06em;
          text-shadow: 0 2px 30px rgba(0,0,0,0.5);
        }

        /* Rule */
        .wd-name-rule { display: flex; align-items: center; gap: 0.6rem; }
        .wd-rule-line {
          display: block; width: 50px; height: 1px;
          background: linear-gradient(90deg, var(--g-primary), transparent);
        }
        .wd-rule-gem {
          display: block; width: 5px; height: 5px;
          background: var(--g-primary); transform: rotate(45deg);
          box-shadow: 0 0 8px var(--g-glow);
        }

        /* Subtitle */
        .wd-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1rem, 1.8vw, 1.25rem);
          font-style: italic; font-weight: 300;
          color: rgba(255,255,255,0.7);
          letter-spacing: 0.04em;
        }

        /* Meta */
        .wd-meta {
          display: flex; align-items: center; gap: 0.7rem;
          font-size: 0.65rem; font-weight: 600;
          letter-spacing: 0.2em; color: rgba(255,255,255,0.45);
        }
        .wd-meta-sep { color: var(--g-glow-sm); }

        /* CTA Button */
        .wd-btn {
          position: relative;
          display: inline-flex; align-items: center; gap: 0.8rem;
          padding: 0.9rem 2rem;
          background: transparent;
          border: 1px solid var(--g-border);
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.65rem; font-weight: 600;
          letter-spacing: 0.3em;
          cursor: pointer; overflow: hidden;
          transition: border-color 0.3s;
          margin-top: 0.5rem; width: fit-content;
        }
        .wd-btn:hover { border-color: var(--g-primary); }
        .wd-btn-text { position: relative; z-index: 1; }
        .wd-btn-arrow {
          position: relative; z-index: 1;
          color: var(--g-primary); font-size: 0.9rem;
          transition: transform 0.3s;
        }
        .wd-btn:hover .wd-btn-arrow { transform: translateX(4px); }
        .wd-btn-glow {
          position: absolute; inset: 0;
          background: rgba(201,168,76,0.07);
          transform: translateX(-101%);
          transition: transform 0.4s ease;
        }
        .wd-btn:hover .wd-btn-glow { transform: translateX(0); }

        /* Right */
        .wd-right {
          display: flex; flex-direction: column; gap: 1rem;
          width: 320px; flex-shrink: 0;
        }
        .wd-list { list-style: none; display: flex; flex-direction: column; gap: 0; }

        /* List items */
        .wd-list-item {
          position: relative;
          display: flex; align-items: center; gap: 1rem;
          padding: 1rem 1.2rem;
          border: 1px solid rgba(201,168,76,0.1);
          border-bottom: none;
          cursor: pointer;
          transition: background 0.3s, border-color 0.3s;
          overflow: hidden;
        }
        .wd-list-item:last-child { border-bottom: 1px solid rgba(201,168,76,0.1); }
        .wd-list-item:hover { background: rgba(201,168,76,0.04); }
        .wd-list-item--active {
          background: rgba(201,168,76,0.07) !important;
          border-color: rgba(201,168,76,0.3) !important;
        }
        .wd-list-item--active + .wd-list-item {
          border-top-color: rgba(201,168,76,0.3);
        }

        /* Thumb */
        .wd-thumb-wrap {
          position: relative; width: 52px; height: 52px;
          flex-shrink: 0; overflow: hidden;
        }
        .wd-thumb {
          width: 100%; height: 100%; object-fit: cover;
          filter: brightness(0.7) sepia(0.1);
          transition: filter 0.3s, transform 0.4s;
        }
        .wd-list-item:hover .wd-thumb { filter: brightness(0.9) sepia(0); transform: scale(1.06); }
        .wd-list-item--active .wd-thumb { filter: brightness(1) sepia(0); }
        .wd-thumb-overlay {
          position: absolute; inset: 0;
          border: 1.5px solid transparent;
          transition: border-color 0.3s;
        }
        .wd-list-item--active .wd-thumb-overlay { border-color: var(--g-primary); }

        /* List info */
        .wd-list-info {
          flex: 1; display: flex; flex-direction: column;
          gap: 0.2rem; min-width: 0;
        }
        .wd-list-name {
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.6);
          transition: color 0.3s;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .wd-list-item--active .wd-list-name { color: #ffffff; }
        .wd-list-date {
          font-size: 0.58rem; letter-spacing: 0.15em;
          color: rgba(255,255,255,0.25);
          transition: color 0.3s;
        }
        .wd-list-item--active .wd-list-date { color: rgba(201,168,76,0.75); }

        /* Arrow */
        .wd-list-arrow {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.15);
          transition: color 0.3s, transform 0.3s;
          flex-shrink: 0;
        }
        .wd-list-item--active .wd-list-arrow,
        .wd-list-item:hover .wd-list-arrow {
          color: var(--g-primary);
          transform: translateX(3px);
        }

        /* Progress bar */
        .wd-list-progress {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 2px; background: rgba(201,168,76,0.1);
        }
        .wd-list-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--g-deep), var(--g-light));
          box-shadow: 0 0 6px var(--g-glow);
          transition: width 0.05s linear;
        }

        /* Counter */
        .wd-counter { text-align: right; padding-right: 0.3rem; }
        .wd-counter-active {
          font-size: 2rem; font-weight: 700;
          color: rgba(201,168,76,0.1);
          letter-spacing: -0.02em; line-height: 1;
        }
        .wd-counter-sep { font-size: 0.75rem; color: rgba(201,168,76,0.12); }
        .wd-counter-total { font-size: 0.75rem; color: rgba(201,168,76,0.18); }

        /* ── Bottom dots ── */
        .wd-dots {
          position: absolute; bottom: 2rem; left: 50%;
          transform: translateX(-50%);
          display: flex; gap: 0.5rem; z-index: 10;
        }
        .wd-dot {
          width: 24px; height: 3px;
          border: none; border-radius: 2px;
          background: rgba(255,255,255,0.2);
          cursor: pointer;
          transition: background 0.3s, width 0.3s;
        }
        .wd-dot--active {
          background: var(--g-primary);
          width: 40px;
          box-shadow: 0 0 8px var(--g-glow);
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .wd-content {
            flex-direction: column; justify-content: flex-end;
            padding: 5rem 5% 5rem; gap: 1.5rem;
          }
          .wd-right { width: 100%; }
          .wd-list { flex-direction: row; gap: 0; }
          .wd-list-item {
            flex: 1; flex-direction: column; align-items: flex-start;
            padding: 0.8rem;
            border-bottom: 1px solid rgba(201,168,76,0.1);
            border-right: none;
          }
          .wd-list-item:last-child { border-right: 1px solid rgba(201,168,76,0.1); }
          .wd-thumb-wrap { width: 100%; height: 60px; }
          .wd-list-arrow { display: none; }
          .wd-counter { display: none; }
          .wd-couple-name { font-size: clamp(1.8rem, 6vw, 3rem); }
        }
        @media (max-width: 560px) {
          .wd-content { padding: 4rem 4% 8rem; }
          .wd-list { flex-direction: column; }
          .wd-list-item { flex-direction: row; }
          .wd-thumb-wrap { width: 44px; height: 44px; }
          .wd-list-name { font-size: 0.62rem; }
          .wd-brand-text { display: none; }
        }
      `}</style>
    </div>
  );
};

export default Wedding;