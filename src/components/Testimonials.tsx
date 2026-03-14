"use client";
import { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    text: "Working with this photography team is always a blast! They know exactly how to work in the best light — literally. From glowing brides to dramatic glam, every detail pops on camera. Super easygoing, professional, and always bring the best energy to shoots.",
    author: "Makeovers By Sharanya",
    role: "Makeup Artist",
    initials: "MS",
  },
  {
    id: 2,
    text: "Eagle View Photography truly exceeded our expectations. The team is extremely professional, punctual, and talented. They captured every special moment with such detail and creativity. If you want photography that tells a story, this is the team to go with.",
    author: "Ganesh",
    role: "Wedding Client",
    initials: "G",
  },
  {
    id: 3,
    text: "Absolutely phenomenal experience! From the moment we booked them for our engagement shoot, the communication was seamless. Kishan is incredibly talented and made us feel so comfortable in front of the camera. The photos came out truly beautiful.",
    author: "Pooja Ghosh",
    role: "Engagement Client",
    initials: "PG",
  },
  {
    id: 4,
    text: "The team at Eagle View Photography went above and beyond for our wedding. Their attention to detail and ability to capture candid moments was incredible. Every photo tells a story and we'll cherish them forever. Highly recommended.",
    author: "Priya & Rahul",
    role: "Wedding Couple",
    initials: "PR",
  },
  {
    id: 5,
    text: "Exceptional service and outstanding results. Eagle View Photography handled our corporate event with complete professionalism. The photos were delivered promptly and exceeded all our expectations. Will definitely work with them again.",
    author: "Vikram Mehta",
    role: "Corporate Client",
    initials: "VM",
  },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isPaused, setIsPaused] = useState(false);

  const goTo = (index: number, dir: "next" | "prev" = "next") => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setActive(index);
      setAnimating(false);
    }, 320);
  };

  const next = () => goTo((active + 1) % testimonials.length, "next");
  const prev = () => goTo((active - 1 + testimonials.length) % testimonials.length, "prev");

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 4500);
    return () => clearInterval(interval);
  }, [active, isPaused]);

  const t = testimonials[active];

  return (
    <section
      className="tm-root"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="tm-ambient" />

      {/* ── Header ── */}
      <div className="tm-header">
        <span className="tm-eyebrow">
          <span className="tm-ey-line" />
          CLIENT STORIES
          <span className="tm-ey-line tm-ey-line--r" />
        </span>
        <h2 className="tm-heading">What They Say</h2>
        <div className="tm-head-rule">
          <span className="tm-rule-line" />
          <span className="tm-rule-gem" />
          <span className="tm-rule-line tm-rule-line--r" />
        </div>
      </div>

      {/* ── Spotlight Stage ── */}
      <div className="tm-stage">
        <div className="tm-bigquote">"</div>

        <div className={`tm-content ${animating ? (direction === "next" ? "tm-exit-left" : "tm-exit-right") : "tm-enter"}`}>

          {/* Stars */}
          <div className="tm-stars">
            {[...Array(5)].map((_, i) => <span key={i} className="tm-star">★</span>)}
          </div>

          {/* Quote */}
          <blockquote className="tm-quote">{t.text}</blockquote>

          {/* Author */}
          <div className="tm-author-row">
            <div className="tm-avatar">
              <span className="tm-avatar-initials">{t.initials}</span>
              <div className="tm-avatar-ring" />
            </div>
            <div className="tm-author-info">
              <span className="tm-author-name">{t.author}</span>
              <span className="tm-author-role">{t.role}</span>
            </div>
            <div className="tm-author-sep" />
            <span className="tm-author-count">
              {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Nav buttons */}
        <button className="tm-nav tm-nav--prev" onClick={prev} aria-label="Previous">←</button>
        <button className="tm-nav tm-nav--next" onClick={next} aria-label="Next">→</button>
      </div>

      {/* ── Author tabs ── */}
      <div className="tm-tabs">
        {testimonials.map((item, i) => (
          <button
            key={item.id}
            className={`tm-tab ${i === active ? "tm-tab--active" : ""}`}
            onClick={() => goTo(i, i > active ? "next" : "prev")}
          >
            <span className="tm-tab-dot" />
            <span className="tm-tab-name">{item.author.split(" ")[0]}</span>
          </button>
        ))}
      </div>

      {/* ── Bottom copy ── */}
      <div className="tm-bottom">
        <div className="tm-bottom-rule">
          <span className="tm-br-line" />
          <span className="tm-br-gem">✦</span>
          <span className="tm-br-line" />
        </div>
        <h3 className="tm-bottom-title">True Emotions. True Moments. True Love Stories.</h3>
        <p className="tm-bottom-text">
          Your wedding day is a celebration of love, laughter, and once-in-a-lifetime moments.
          At Eagle View Photography, we specialise in capturing those raw, real emotions
          through candid photography and cinematic videography — so you can relive the magic, again and again.
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Great+Vibes&family=Montserrat:wght@300;400;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        :root {
          --g-primary: #C9A84C;
          --g-light:   #E8C96A;
          --g-pale:    #F5DFA0;
          --g-deep:    #9A7228;
          --g-glow:    rgba(201,168,76,0.6);
          --g-glow-sm: rgba(201,168,76,0.3);
          --g-faint:   rgba(201,168,76,0.06);
          --g-border:  rgba(201,168,76,0.3);
          --bg:        #080604;
        }

        .tm-root {
          position: relative;
          background: var(--bg);
          padding: 5rem 2rem 4rem;
          font-family: 'Montserrat', sans-serif;
          overflow: hidden;
          color: #fff;
        }

        /* Ambient glow */
        .tm-ambient {
          position: absolute; top: 40%; left: 50%;
          transform: translate(-50%, -50%);
          width: 700px; height: 400px;
          background: radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 65%);
          pointer-events: none;
        }

        /* ── Header ── */
        .tm-header {
          text-align: center; margin-bottom: 3.5rem;
          position: relative; z-index: 1;
        }
        .tm-eyebrow {
          display: inline-flex; align-items: center; gap: 0.9rem;
          font-size: 0.58rem; font-weight: 600; letter-spacing: 0.5em;
          color: #ffffff; margin-bottom: 0.9rem;
        }
        .tm-ey-line {
          display: block; width: 35px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--g-primary));
        }
        .tm-ey-line--r { background: linear-gradient(90deg, var(--g-primary), transparent); }

        .tm-heading {
          font-family: 'Great Vibes', cursive;
          font-size: clamp(2.8rem, 6vw, 4.5rem);
          font-weight: 400; color: #ffffff;
          margin: 0 0 1.2rem; line-height: 1; display: block;
        }
        .tm-head-rule {
          display: flex; align-items: center; justify-content: center; gap: 0.8rem;
        }
        .tm-rule-line {
          display: block; width: 60px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--g-primary));
        }
        .tm-rule-line--r { background: linear-gradient(90deg, var(--g-primary), transparent); }
        .tm-rule-gem {
          display: block; width: 6px; height: 6px;
          background: var(--g-primary); transform: rotate(45deg);
          box-shadow: 0 0 10px var(--g-glow), 0 0 24px var(--g-glow);
        }

        /* ── Stage ── */
        .tm-stage {
          position: relative; max-width: 820px;
          margin: 0 auto 2.5rem;
          padding: 0 4rem; min-height: 320px;
          display: flex; align-items: center;
        }
        .tm-bigquote {
          position: absolute; top: -1.5rem; left: 3.5rem;
          font-family: 'Cormorant Garamond', serif;
          font-size: 10rem; line-height: 1;
          color: rgba(201,168,76,0.08);
          pointer-events: none; user-select: none; z-index: 0;
        }

        /* Animations */
        .tm-content { position: relative; z-index: 1; width: 100%; text-align: center; }

        @keyframes enterFromRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes enterFromLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes exitToLeft {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(-40px); }
        }
        @keyframes exitToRight {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(40px); }
        }
        .tm-enter       { animation: enterFromRight 0.42s ease forwards; }
        .tm-exit-left   { animation: exitToLeft 0.42s ease forwards; pointer-events: none; }
        .tm-exit-right  { animation: exitToRight 0.42s ease forwards; pointer-events: none; }

        /* Stars */
        .tm-stars {
          display: flex; justify-content: center;
          gap: 0.3rem; margin-bottom: 1.5rem;
        }
        .tm-star {
          color: var(--g-primary); font-size: 1.1rem;
          text-shadow: 0 0 10px var(--g-glow);
        }

        /* Quote */
        .tm-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.1rem, 2.2vw, 1.45rem);
          font-style: italic; font-weight: 300;
          line-height: 1.9; color: rgba(255,255,255,0.9);
          letter-spacing: 0.02em; margin: 0 0 2.2rem;
          padding: 0 0.5rem;
        }

        /* Author row */
        .tm-author-row {
          display: flex; align-items: center;
          justify-content: center; gap: 1rem; flex-wrap: wrap;
        }
        .tm-avatar { position: relative; width: 50px; height: 50px; flex-shrink: 0; }
        .tm-avatar-initials {
          width: 50px; height: 50px; border-radius: 50%;
          background: rgba(201,168,76,0.1);
          border: 1.5px solid rgba(201,168,76,0.55);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem; font-weight: 600;
          color: var(--g-light); letter-spacing: 0.05em;
          position: absolute; inset: 0;
        }
        .tm-avatar-ring {
          position: absolute; inset: -4px; border-radius: 50%;
          border: 1px dashed rgba(201,168,76,0.3);
          animation: spin 12s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .tm-author-info {
          display: flex; flex-direction: column;
          align-items: flex-start; gap: 0.15rem;
        }
        .tm-author-name {
          font-size: 0.82rem; font-weight: 600;
          letter-spacing: 0.12em; color: #ffffff;
          text-transform: uppercase;
        }
        .tm-author-role {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.85rem; font-style: italic;
          color: rgba(255,255,255,0.45);
        }
        .tm-author-sep {
          width: 1px; height: 28px;
          background: rgba(201,168,76,0.2); margin: 0 0.3rem;
        }
        .tm-author-count {
          font-size: 0.6rem; letter-spacing: 0.2em;
          color: rgba(201,168,76,0.35); font-weight: 600;
        }

        /* Nav buttons */
        .tm-nav {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 42px; height: 42px;
          border: 1px solid rgba(201,168,76,0.2);
          background: rgba(201,168,76,0.03);
          border-radius: 50%; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; color: rgba(255,255,255,0.45);
          transition: border-color 0.3s, background 0.3s, color 0.3s, transform 0.3s;
          z-index: 2;
        }
        .tm-nav:hover {
          border-color: var(--g-primary);
          background: rgba(201,168,76,0.1);
          color: var(--g-light);
          transform: translateY(-50%) scale(1.1);
        }
        .tm-nav--prev { left: 0; }
        .tm-nav--next { right: 0; }

        /* ── Author tabs ── */
        .tm-tabs {
          display: flex; justify-content: center;
          gap: 0.4rem; margin-bottom: 4rem;
          flex-wrap: wrap; padding: 0 1rem;
        }
        .tm-tab {
          display: flex; align-items: center; gap: 0.4rem;
          padding: 0.4rem 0.9rem;
          border: 1px solid rgba(201,168,76,0.12);
          background: transparent; border-radius: 20px;
          cursor: pointer; transition: all 0.3s ease;
        }
        .tm-tab:hover {
          border-color: rgba(201,168,76,0.35);
          background: rgba(201,168,76,0.04);
        }
        .tm-tab--active {
          border-color: var(--g-primary) !important;
          background: rgba(201,168,76,0.09) !important;
        }
        .tm-tab-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: rgba(255,255,255,0.2);
          transition: background 0.3s; flex-shrink: 0;
        }
        .tm-tab--active .tm-tab-dot {
          background: var(--g-primary);
          box-shadow: 0 0 6px var(--g-glow);
        }
        .tm-tab-name {
          font-size: 0.62rem; letter-spacing: 0.12em;
          color: rgba(255,255,255,0.4); font-weight: 600;
          text-transform: uppercase; transition: color 0.3s;
        }
        .tm-tab--active .tm-tab-name { color: var(--g-light); }

        /* ── Bottom ── */
        .tm-bottom {
          text-align: center; max-width: 720px;
          margin: 0 auto; padding-top: 2rem;
          border-top: 1px solid rgba(201,168,76,0.1);
        }
        .tm-bottom-rule {
          display: flex; align-items: center;
          justify-content: center; gap: 1rem; margin-bottom: 1.8rem;
        }
        .tm-br-line {
          display: block; flex: 1; max-width: 100px;
          height: 1px; background: rgba(201,168,76,0.12);
        }
        .tm-br-gem {
          font-size: 0.5rem; color: var(--g-deep);
          letter-spacing: 0.4em;
          text-shadow: 0 0 10px var(--g-glow);
        }

        .tm-bottom-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.3rem, 3vw, 1.8rem);
          font-weight: 400; color: #ffffff;
          letter-spacing: 0.03em; margin: 0 0 1rem; line-height: 1.4;
        }
        .tm-bottom-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.95rem, 1.6vw, 1.1rem);
          font-style: italic; font-weight: 300;
          color: rgba(255,255,255,0.55);
          line-height: 1.9; margin: 0; letter-spacing: 0.02em;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .tm-stage { padding: 0 3rem; min-height: 280px; }
          .tm-bigquote { font-size: 7rem; left: 2.5rem; }
          .tm-nav { width: 36px; height: 36px; }
          .tm-author-sep, .tm-author-count { display: none; }
        }
        @media (max-width: 480px) {
          .tm-root { padding: 3.5rem 1rem 3rem; }
          .tm-stage { padding: 0 2.5rem; }
          .tm-bigquote { font-size: 5rem; left: 1.5rem; top: -1rem; }
          .tm-nav { width: 32px; height: 32px; font-size: 0.85rem; }
          .tm-tabs { gap: 0.3rem; }
          .tm-tab { padding: 0.35rem 0.7rem; }
          .tm-tab-name { font-size: 0.55rem; }
          .tm-author-row { gap: 0.7rem; }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;