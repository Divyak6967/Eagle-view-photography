"use client";

import React, { useEffect, useState, useRef } from "react";

const stats = [
  {
    icon: "/Images/camera.png",
    target: 500,
    suffix: "+",
    label: "Events Covered",
    desc: "From intimate gatherings to grand celebrations",
  },
  {
    icon: "/Images/video.png",
    target: 800,
    suffix: "+",
    label: "Weddings Covered",
    desc: "Love stories captured across Tamil Nadu",
  },
  {
    icon: "/Images/movie.png",
    target: 2000,
    suffix: "+",
    label: "Videos Edited",
    desc: "Cinematic reels crafted with precision",
    format: (n: number) => n >= 1000 ? `${(n / 1000).toFixed(n >= 1000 ? 0 : 1)}k+` : `${n}+`,
  },
  {
    icon: "/Images/customer.png",
    target: 1000,
    suffix: "+",
    label: "Happy Clients",
    desc: "Families who treasure their memories forever",
  },
];

const Ratings = () => {
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2400;
    const start = Date.now();
    let raf: number;

    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounts(stats.map((s) => Math.floor(s.target * eased)));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setCounts(stats.map((s) => s.target));
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isVisible]);

  const fmt = (val: number, s: typeof stats[0]) =>
    s.format ? s.format(val) : `${val}${s.suffix}`;

  return (
    <div ref={sectionRef} className="rt-root">

      {/* Background */}
      <div className="rt-bg">
        <img src="/Images/Camera.jpg" alt="" className="rt-bg-img" />
        <div className="rt-bg-overlay" />
        <div className="rt-grid-lines">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rt-grid-line" />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="rt-content">

        {/* Eyebrow */}
        <div className={`rt-eyebrow ${isVisible ? "rt-fade-in" : ""}`}>
          <span className="rt-eyebrow-line" />
          <span className="rt-eyebrow-text">BY THE NUMBERS</span>
          <span className="rt-eyebrow-line rt-eyebrow-line--rev" />
        </div>

        <h2 className={`rt-heading ${isVisible ? "rt-fade-in rt-delay-1" : ""}`}>
          A Legacy of Captured Moments
        </h2>

        {/* Stats grid */}
        <div className="rt-grid">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`rt-card ${isVisible ? "rt-slide-up" : ""}`}
              style={{ animationDelay: `${0.15 + i * 0.12}s` }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Top gold accent bar */}
              <div className="rt-card-top" style={{ opacity: hovered === i ? 1 : 0 }} />

              {/* Corner brackets */}
              <span className="rt-corner rt-tl" style={{
                borderColor: hovered === i ? 'var(--g-primary)' : 'rgba(201,168,76,0.2)',
              }} />
              <span className="rt-corner rt-br" style={{
                borderColor: hovered === i ? 'var(--g-primary)' : 'rgba(201,168,76,0.2)',
              }} />

              {/* Icon */}
              <div className="rt-icon-wrap" style={{
                background: hovered === i ? 'rgba(201,168,76,0.12)' : 'rgba(201,168,76,0.04)',
                borderColor: hovered === i ? 'var(--g-primary)' : 'rgba(201,168,76,0.25)',
              }}>
                <img
                  src={s.icon}
                  alt={s.label}
                  className="rt-icon"
                  style={{
                    filter: hovered === i
                      ? 'brightness(0) saturate(100%) invert(72%) sepia(55%) saturate(500%) hue-rotate(5deg) brightness(95%)'
                      : 'brightness(0) invert(1) opacity(0.75)',
                    transform: hovered === i ? 'scale(1.12)' : 'scale(1)',
                  }}
                />
              </div>

              {/* Number */}
              <div className="rt-number" style={{
                color: hovered === i ? 'var(--g-light)' : '#ffffff',
              }}>
                {isVisible ? fmt(counts[i], s) : `0${s.suffix}`}
              </div>

              {/* Label */}
              <div className="rt-label">{s.label}</div>

              {/* Desc */}
              <p className="rt-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Great+Vibes&family=Montserrat:wght@300;400;600&display=swap');

        :root {
          --g-primary: #C9A84C;
          --g-light:   #E8C96A;
          --g-pale:    #F5DFA0;
          --g-deep:    #9A7228;
          --g-glow:    rgba(201,168,76,0.55);
          --g-faint:   rgba(201,168,76,0.06);
          --g-border:  rgba(201,168,76,0.3);
        }

        .rt-root {
          position: relative;
          width: 100%;
          overflow: hidden;
          font-family: 'Montserrat', sans-serif;
        }

        /* ── Background ── */
        .rt-bg { position: absolute; inset: 0; }
        .rt-bg-img {
          width: 100%; height: 100%; object-fit: cover;
          filter: brightness(0.28) saturate(0.5) sepia(0.15);
        }
        .rt-bg-overlay {
          position: absolute; inset: 0;
          background:
            linear-gradient(to bottom, rgba(8,6,4,0.65) 0%, rgba(8,6,4,0.45) 50%, rgba(8,6,4,0.8) 100%),
            radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%);
        }

        /* Decorative grid */
        .rt-grid-lines {
          position: absolute; inset: 0;
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          pointer-events: none;
        }
        .rt-grid-line {
          border-right: 1px solid rgba(201,168,76,0.04);
        }

        /* ── Content ── */
        .rt-content {
          position: relative; z-index: 2;
          padding: 5.5rem 3rem 6rem;
          max-width: 1300px;
          margin: 0 auto;
          text-align: center;
        }

        /* Eyebrow */
        .rt-eyebrow {
          display: flex; align-items: center;
          justify-content: center; gap: 1rem;
          margin-bottom: 1.2rem; opacity: 0;
        }
        .rt-eyebrow.rt-fade-in { animation: fadeUp 0.7s ease 0.05s forwards; }
        .rt-eyebrow-line {
          display: block; width: 50px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--g-primary));
        }
        .rt-eyebrow-line--rev {
          background: linear-gradient(90deg, var(--g-primary), transparent);
        }
        .rt-eyebrow-text {
          font-size: 0.62rem; letter-spacing: 0.52em;
          color: #ffffff; font-weight: 600;
        }

        /* Heading */
        .rt-heading {
          font-family: 'Great Vibes', cursive;
          font-size: clamp(2.4rem, 4.5vw, 3.4rem);
          font-weight: 400;
          color: #ffffff;
          margin-bottom: 3.5rem; opacity: 0;
        }
        .rt-heading.rt-fade-in.rt-delay-1 { animation: fadeUp 0.7s ease 0.15s forwards; }

        /* ── Stats grid ── */
        .rt-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5px;
        }

        /* ── Card ── */
        .rt-card {
          position: relative;
          padding: 2.8rem 1.6rem 2.4rem;
          background: rgba(201,168,76,0.03);
          border: 1px solid rgba(201,168,76,0.12);
          cursor: default;
          transition: background 0.4s ease, border-color 0.4s ease, transform 0.4s ease;
          opacity: 0; overflow: hidden;
        }
        .rt-card.rt-slide-up { animation: fadeUp 0.65s ease forwards; }
        .rt-card:hover {
          background: rgba(201,168,76,0.06);
          border-color: rgba(201,168,76,0.35);
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(201,168,76,0.06);
        }

        /* Top gold accent bar */
        .rt-card-top {
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--g-primary), transparent);
          box-shadow: 0 0 14px var(--g-glow);
          transition: opacity 0.4s ease;
        }

        /* Icon */
        .rt-icon-wrap {
          width: 68px; height: 68px; border-radius: 50%;
          border: 1px solid;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1.6rem;
          transition: background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .rt-card:hover .rt-icon-wrap {
          box-shadow: 0 0 20px rgba(201,168,76,0.2);
        }
        .rt-icon {
          width: 30px; height: 30px; object-fit: contain;
          transition: filter 0.4s ease, transform 0.4s ease;
        }

        /* Number */
        .rt-number {
          font-size: clamp(2.4rem, 4vw, 3.2rem);
          font-weight: 600; line-height: 1;
          margin-bottom: 0.55rem;
          letter-spacing: -0.02em;
          transition: color 0.4s ease;
          font-variant-numeric: tabular-nums;
        }

        /* Label */
        .rt-label {
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.28em;
          color: #ffffff;
          text-transform: uppercase;
          margin-bottom: 0.8rem;
        }

        /* Desc */
        .rt-desc {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.98rem; font-style: italic;
          color: rgba(255,255,255,0.6);
          line-height: 1.6; font-weight: 300; margin: 0;
        }

        /* Corner brackets */
        .rt-corner {
          position: absolute;
          width: 14px; height: 14px;
          border-style: solid;
          transition: border-color 0.4s ease;
        }
        .rt-tl { top: 8px; left: 8px; border-width: 1px 0 0 1px; }
        .rt-br { bottom: 8px; right: 8px; border-width: 0 1px 1px 0; }

        /* ── Animations ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .rt-grid { grid-template-columns: repeat(2, 1fr); }
          .rt-content { padding: 4rem 2rem 5rem; }
        }
        @media (max-width: 520px) {
          .rt-grid { grid-template-columns: repeat(2, 1fr); gap: 1px; }
          .rt-card { padding: 2.2rem 1.2rem 1.8rem; }
          .rt-content { padding: 3rem 1rem; }
          .rt-number { font-size: 2rem; }
          .rt-desc { font-size: 0.88rem; }
        }
      `}</style>
    </div>
  );
};

export default Ratings;