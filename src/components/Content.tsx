import React, { useEffect, useRef, useState } from 'react';

const Content = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="ct-root">

      {/* Ambient glow */}
      <div className="ct-glow" />

      {/* Top rule */}
      <div className={`ct-rule-wrap ${visible ? 'ct-visible' : ''}`}>
        <span className="ct-rule-line" />
        <span className="ct-rule-diamond" />
        <span className="ct-rule-line ct-rule-line--rev" />
      </div>

      {/* Opening quote mark */}
      <div className={`ct-quote-mark ${visible ? 'ct-visible ct-delay-1' : ''}`}>"</div>

      {/* Main headline */}
      <h2 className={`ct-headline ${visible ? 'ct-visible ct-delay-2' : ''}`}>
        Bridging Generations{' '}
        <em className="ct-headline-em">Through the Art</em>
        <br />
        of Photography
      </h2>

      {/* Sub-copy */}
      <p className={`ct-sub ${visible ? 'ct-visible ct-delay-3' : ''}`}>
        Every frame we capture becomes a bridge — between past and present,
        between families and their stories, between fleeting moments and forever.
      </p>

      {/* Bottom ornament */}
      <div className={`ct-ornament ${visible ? 'ct-visible ct-delay-4' : ''}`}>
        <span className="ct-orn-line" />
        <span className="ct-orn-center">✦</span>
        <span className="ct-orn-line" />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Great+Vibes&family=Montserrat:wght@300;400;600&display=swap');

        .ct-root {
          position: relative;
          background: #000;
          padding: 6rem 2rem;
          text-align: center;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.4rem;
        }

        /* Ambient teal glow in background */
        .ct-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 300px;
          background: radial-gradient(ellipse, rgba(0,201,167,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── Top rule ── */
        .ct-rule-wrap {
          display: flex;
          align-items: center;
          gap: 1rem;
          opacity: 0;
          transform: scaleX(0.6);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .ct-rule-wrap.ct-visible {
          opacity: 1;
          transform: scaleX(1);
        }
        .ct-rule-line {
          display: block;
          width: 80px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #00C9A7);
        }
        .ct-rule-line--rev {
          background: linear-gradient(90deg, #00C9A7, transparent);
        }
        .ct-rule-diamond {
          display: block;
          width: 6px;
          height: 6px;
          background: #00C9A7;
          transform: rotate(45deg);
          box-shadow: 0 0 8px rgba(0,201,167,0.9);
          flex-shrink: 0;
        }

        /* ── Quote mark ── */
        .ct-quote-mark {
          font-family: 'Cormorant Garamond', serif;
          font-size: 8rem;
          line-height: 0.5;
          color: rgba(0,201,167,0.15);
          font-weight: 400;
          opacity: 0;
          transform: translateY(-10px);
          transition: opacity 0.6s ease, transform 0.6s ease;
          user-select: none;
          pointer-events: none;
        }
        .ct-quote-mark.ct-visible { opacity: 1; transform: translateY(0); }

        /* ── Headline ── */
        .ct-headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 5vw, 3.6rem);
          font-weight: 300;
          color: #fff;
          line-height: 1.25;
          letter-spacing: 0.02em;
          max-width: 820px;
          margin: 0;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .ct-headline.ct-visible { opacity: 1; transform: translateY(0); }

        .ct-headline-em {
          font-style: italic;
          color: #00C9A7;
          font-weight: 300;
        }

        /* ── Sub-copy ── */
        .ct-sub {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.95rem, 1.8vw, 1.15rem);
          font-style: italic;
          font-weight: 300;
          color: rgba(255,255,255,0.4);
          max-width: 580px;
          line-height: 1.9;
          letter-spacing: 0.03em;
          margin: 0;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .ct-sub.ct-visible { opacity: 1; transform: translateY(0); }

        /* ── Bottom ornament ── */
        .ct-ornament {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 0.5rem;
          opacity: 0;
          transition: opacity 0.7s ease;
        }
        .ct-ornament.ct-visible { opacity: 1; }

        .ct-orn-line {
          display: block;
          width: 50px;
          height: 1px;
          background: rgba(255,255,255,0.1);
        }
        .ct-orn-center {
          font-size: 0.5rem;
          color: #00C9A7;
          letter-spacing: 0.3em;
          opacity: 0.6;
        }

        /* ── Delay utilities ── */
        .ct-delay-1 { transition-delay: 0.1s !important; }
        .ct-delay-2 { transition-delay: 0.25s !important; }
        .ct-delay-3 { transition-delay: 0.4s !important; }
        .ct-delay-4 { transition-delay: 0.55s !important; }

        /* ── Responsive ── */
        @media (max-width: 600px) {
          .ct-root { padding: 4rem 1.5rem; gap: 1rem; }
          .ct-quote-mark { font-size: 5rem; }
          .ct-rule-line { width: 40px; }
        }
      `}</style>
    </div>
  );
};

export default Content;