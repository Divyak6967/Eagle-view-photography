import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { stories } from "./Modeling";

const Page = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const story = stories.find((s) => s.slug === slug);

  const [heroVisible, setHeroVisible] = useState(false);
  const [lightbox, setLightbox]       = useState<number | null>(null);
  const [lbAnim, setLbAnim]           = useState(false);
  const [visible, setVisible]         = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const photos = story?.photos ?? [];

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = Number((e.target as HTMLElement).dataset.index);
          setVisible((prev) => new Set([...prev, idx]));
        }
      }),
      { threshold: 0.08 }
    );
    itemRefs.current.forEach((r) => r && observer.observe(r));
    return () => observer.disconnect();
  }, [slug]);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")     setLightbox(null);
      if (e.key === "ArrowRight") navLb(1);
      if (e.key === "ArrowLeft")  navLb(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  const openLb = (i: number) => {
    setLightbox(i); setLbAnim(true);
    setTimeout(() => setLbAnim(false), 400);
  };
  const navLb = (dir: 1 | -1, e?: React.MouseEvent) => {
    e?.stopPropagation(); setLbAnim(true);
    setTimeout(() => {
      setLightbox((p) => p !== null ? (p + dir + photos.length) % photos.length : null);
      setLbAnim(false);
    }, 180);
  };

  if (!story) {
    return (
      <div className="mst-notfound">
        <p>This modeling story couldn't be found.</p>
        <button onClick={() => navigate("/modeling")}>← Back to Modeling Stories</button>
        <style>{`
          .mst-notfound{min-height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.4rem;background:#080604;color:#fff;font-family:'Montserrat',sans-serif}
          .mst-notfound button{background:transparent;border:1px solid rgba(201,168,76,0.4);color:#fff;padding:0.8rem 1.6rem;letter-spacing:0.1em;cursor:pointer}
          .mst-notfound button:hover{border-color:#C9A84C}
        `}</style>
      </div>
    );
  }

  return (
    <div className="mst-root">

      {/* ── HERO ── */}
      <div className={`mst-hero ${heroVisible ? "mst-hero--visible" : ""}`}>
        <img loading="lazy" decoding="async" src={story.cover} alt={story.name} className="mst-hero-img" />
        <div className="mst-hero-overlay" />

        <Link to="/modeling" className="mst-back">
          <span className="mst-back-arrow">←</span> MODELING STORIES
        </Link>

        <div className="mst-hero-content">
          <p className="mst-eyebrow">
            <span className="mst-ey-line" />
            EAGLE-VIEW PICTURES
            <span className="mst-ey-line mst-ey-line--r" />
          </p>
          <h1 className="mst-hero-title">{story.name}</h1>
          <div className="mst-hero-rule">
            <span className="mst-rule-line" />
            <span className="mst-rule-gem" />
            <span className="mst-rule-line mst-rule-line--r" />
          </div>
          <p className="mst-hero-sub">{story.subtitle}</p>
        </div>
      </div>

      {/* ── SECTION LABEL ── */}
      <div className="mst-section-label">
        <span className="mst-lbl-line" />
        <div className="mst-lbl-center">
          <span className="mst-lbl-gem">✦</span>
          <span className="mst-lbl-text">MOMENTS</span>
          <span className="mst-lbl-gem">✦</span>
        </div>
        <span className="mst-lbl-line mst-lbl-line--r" />
      </div>

      {/* ── MASONRY GRID ── */}
      <div className="mst-grid">
        {photos.map((item, i) => (
          <div
            key={i}
            data-index={i}
            ref={(el) => { itemRefs.current[i] = el; }}
            className={`mst-item mst-item--${item.span} ${visible.has(i) ? "mst-item--visible" : ""}`}
            style={{ transitionDelay: `${(i % 5) * 0.07}s` }}
            onClick={() => openLb(i)}
          >
            <div className="mst-item-inner">
              <img loading="lazy" decoding="async" src={item.img} alt={item.label} className="mst-img" />
              <div className="mst-shimmer" />
              <div className="mst-overlay">
                <div className="mst-overlay-body">
                  <span className="mst-overlay-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mst-overlay-label">{item.label}</span>
                  <span className="mst-overlay-bar" />
                  <span className="mst-overlay-view">View Full &nbsp;↗</span>
                </div>
              </div>
              <span className="mst-corner mst-tl" />
              <span className="mst-corner mst-tr" />
              <span className="mst-corner mst-bl" />
              <span className="mst-corner mst-br" />
              <div className="mst-top-bar" />
            </div>
          </div>
        ))}
      </div>

      {/* ── FOOTER ORNAMENT ── */}
      <div className="mst-footer-orn">
        <span className="mst-fo-line" />
        <span className="mst-fo-gem">✦</span>
        <span className="mst-fo-text">Every frame is a work of art</span>
        <span className="mst-fo-gem">✦</span>
        <span className="mst-fo-line" />
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox !== null && (
        <div className="mst-lb" onClick={() => setLightbox(null)}>
          <div className="mst-lb-topbar">
            <span className="mst-lb-top-label">{photos[lightbox].label}</span>
            <span className="mst-lb-top-count">
              {String(lightbox + 1).padStart(2, "0")}
              <span className="mst-lb-top-sep"> / </span>
              {String(photos.length).padStart(2, "0")}
            </span>
          </div>
          <button className="mst-lb-close" onClick={() => setLightbox(null)}>
            <span className="mst-lb-x" /><span className="mst-lb-x" />
          </button>
          <button className="mst-lb-nav mst-lb-prev" onClick={(e) => navLb(-1, e)}>
            <span className="mst-lb-arrow">‹</span>
          </button>
          <div className={`mst-lb-frame ${lbAnim ? "mst-lb-frame--anim" : ""}`} onClick={(e) => e.stopPropagation()}>
            <div className="mst-lb-img-wrap">
              <img loading="lazy" decoding="async" src={photos[lightbox].img} alt={photos[lightbox].label} className="mst-lb-img" />
              <span className="mst-lb-corner mst-lb-tl" />
              <span className="mst-lb-corner mst-lb-tr" />
              <span className="mst-lb-corner mst-lb-bl" />
              <span className="mst-lb-corner mst-lb-br" />
            </div>
            <div className="mst-lb-caption">
              <div className="mst-lb-cap-left">
                <span className="mst-lb-num">{String(lightbox + 1).padStart(2, "0")}</span>
                <div className="mst-lb-cap-div" />
                <div className="mst-lb-cap-info">
                  <span className="mst-lb-label">{photos[lightbox].label}</span>
                  <span className="mst-lb-sub">Eagle View Photography</span>
                </div>
              </div>
              <div className="mst-lb-dots">
                {photos.map((_, di) => (
                  <button key={di}
                    className={`mst-lb-dot ${di === lightbox ? "mst-lb-dot--active" : ""}`}
                    onClick={(e) => { e.stopPropagation(); openLb(di); }}
                  />
                ))}
              </div>
            </div>
          </div>
          <button className="mst-lb-nav mst-lb-next" onClick={(e) => navLb(1, e)}>
            <span className="mst-lb-arrow">›</span>
          </button>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Great+Vibes&family=Montserrat:wght@300;400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --g-primary:#C9A84C;--g-light:#E8C96A;--g-deep:#9A7228;
          --g-glow:rgba(201,168,76,0.6);--g-glow-sm:rgba(201,168,76,0.3);--bg:#080604;
        }
        .mst-root{background:var(--bg);min-height:100vh;font-family:'Montserrat',sans-serif;color:#fff}

        /* HERO */
        .mst-hero{position:relative;height:70vh;min-height:460px;overflow:hidden;opacity:0;transition:opacity 1.1s ease}
        .mst-hero--visible{opacity:1}
        .mst-hero-img{width:100%;height:100%;object-fit:cover;object-position:top center;transform:scale(1.1);animation:mst-zoom 14s cubic-bezier(0.25,0.46,0.45,0.94) forwards;filter:brightness(0.45) sepia(0.1)}
        @keyframes mst-zoom{to{transform:scale(1)}}
        .mst-hero-overlay{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(8,6,4,0.25) 0%,rgba(8,6,4,0.45) 50%,rgba(8,6,4,0.94) 100%)}

        .mst-back{position:absolute;top:1.8rem;left:2rem;z-index:10;display:inline-flex;align-items:center;gap:0.6rem;font-size:0.62rem;font-weight:600;letter-spacing:0.25em;color:rgba(255,255,255,0.75);text-decoration:none;transition:color 0.3s}
        .mst-back:hover{color:var(--g-light)}
        .mst-back-arrow{color:var(--g-primary);transition:transform 0.3s}
        .mst-back:hover .mst-back-arrow{transform:translateX(-3px)}

        .mst-hero-content{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem;animation:mst-fade 1.6s ease 0.4s both}
        @keyframes mst-fade{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}
        .mst-eyebrow{display:inline-flex;align-items:center;gap:0.9rem;font-size:0.6rem;letter-spacing:0.55em;color:#fff;margin-bottom:1.4rem;font-weight:600}
        .mst-ey-line{display:block;width:35px;height:1px;background:linear-gradient(90deg,transparent,var(--g-primary))}
        .mst-ey-line--r{background:linear-gradient(90deg,var(--g-primary),transparent)}
        .mst-hero-title{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:300;font-size:clamp(2.4rem,6vw,4.5rem);line-height:1.1;color:#fff;margin-bottom:1.4rem;text-shadow:0 4px 40px rgba(0,0,0,0.4)}
        .mst-hero-rule{display:flex;align-items:center;gap:1rem;margin-bottom:1.4rem}
        .mst-rule-line{display:block;width:70px;height:1px;background:linear-gradient(90deg,transparent,var(--g-primary))}
        .mst-rule-line--r{background:linear-gradient(90deg,var(--g-primary),transparent)}
        .mst-rule-gem{display:block;width:7px;height:7px;background:var(--g-primary);transform:rotate(45deg)}
        .mst-hero-sub{font-family:'Cormorant Garamond',serif;font-size:clamp(1rem,2vw,1.3rem);font-weight:300;font-style:italic;color:rgba(255,255,255,0.72);letter-spacing:0.03em;max-width:600px}

        /* SECTION LABEL */
        .mst-section-label{display:flex;align-items:center;justify-content:center;gap:1.5rem;padding:3.5rem 3rem 2.5rem}
        .mst-lbl-line{flex:1;max-width:140px;height:1px;background:linear-gradient(90deg,transparent,rgba(201,168,76,0.2))}
        .mst-lbl-line--r{background:linear-gradient(90deg,rgba(201,168,76,0.2),transparent)}
        .mst-lbl-center{display:flex;align-items:center;gap:0.8rem}
        .mst-lbl-gem{font-size:0.38rem;color:var(--g-primary);opacity:0.6}
        .mst-lbl-text{font-size:0.58rem;letter-spacing:0.55em;color:rgba(255,255,255,0.35);font-weight:600}

        /* GRID */
        .mst-grid{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:220px;gap:5px;padding:0 2.5rem 3rem;max-width:1600px;margin:0 auto}
        .mst-item{opacity:0;transform:translateY(28px) scale(0.97);transition:opacity 0.65s ease,transform 0.65s ease;cursor:pointer}
        .mst-item--visible{opacity:1;transform:translateY(0) scale(1)}
        .mst-item--tall{grid-row:span 2}
        .mst-item--wide{grid-column:span 2}
        .mst-item-inner{position:relative;width:100%;height:100%;overflow:hidden}
        .mst-img{width:100%;height:100%;object-fit:cover;transition:transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94),filter 0.5s ease;filter:brightness(0.82) sepia(0.08)}
        .mst-item-inner:hover .mst-img{transform:scale(1.07);filter:brightness(0.5) sepia(0.05)}

        .mst-shimmer{position:absolute;inset:0;background:linear-gradient(110deg,transparent 38%,rgba(201,168,76,0.07) 50%,transparent 62%);transform:translateX(-100%);pointer-events:none}
        .mst-item-inner:hover .mst-shimmer{transform:translateX(100%);transition:transform 0.75s ease}

        .mst-overlay{position:absolute;inset:0;display:flex;align-items:flex-end;padding:1.3rem 1.5rem;background:linear-gradient(to top,rgba(8,6,4,0.78) 0%,transparent 58%);opacity:0;transition:opacity 0.4s ease}
        .mst-item-inner:hover .mst-overlay{opacity:1}
        .mst-overlay-body{display:flex;flex-direction:column;gap:0.28rem;transform:translateY(10px);transition:transform 0.4s cubic-bezier(0.16,1,0.3,1)}
        .mst-item-inner:hover .mst-overlay-body{transform:translateY(0)}
        .mst-overlay-num{font-size:0.52rem;letter-spacing:0.4em;color:var(--g-primary);font-weight:600}
        .mst-overlay-label{font-family:'Cormorant Garamond',serif;font-size:1.1rem;color:#fff;font-style:italic;font-weight:300}
        .mst-overlay-bar{display:block;width:28px;height:1px;background:linear-gradient(90deg,var(--g-primary),var(--g-light));box-shadow:0 0 5px var(--g-glow-sm)}
        .mst-overlay-view{font-size:0.56rem;letter-spacing:0.18em;color:rgba(255,255,255,0.52)}

        .mst-corner{position:absolute;width:0;height:0;border-style:solid;border-color:transparent;transition:width 0.35s ease,height 0.35s ease,border-color 0.35s ease;pointer-events:none}
        .mst-tl{top:0;left:0;border-width:1.5px 0 0 1.5px}
        .mst-tr{top:0;right:0;border-width:1.5px 1.5px 0 0}
        .mst-bl{bottom:0;left:0;border-width:0 0 1.5px 1.5px}
        .mst-br{bottom:0;right:0;border-width:0 1.5px 1.5px 0}
        .mst-item-inner:hover .mst-corner{width:22px;height:22px;border-color:var(--g-primary);filter:drop-shadow(0 0 4px rgba(201,168,76,0.8))}
        .mst-top-bar{position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--g-primary),transparent);box-shadow:0 0 10px var(--g-glow);opacity:0;transition:opacity 0.4s ease}
        .mst-item-inner:hover .mst-top-bar{opacity:1}

        /* FOOTER */
        .mst-footer-orn{display:flex;align-items:center;justify-content:center;gap:1rem;padding:2.5rem 3rem 4rem}
        .mst-fo-line{flex:1;max-width:100px;height:1px;background:rgba(201,168,76,0.1)}
        .mst-fo-gem{font-size:0.38rem;color:var(--g-deep);opacity:0.6}
        .mst-fo-text{font-family:'Cormorant Garamond',serif;font-size:clamp(0.9rem,1.5vw,1rem);font-style:italic;font-weight:300;color:rgba(255,255,255,0.22);letter-spacing:0.06em}

        /* LIGHTBOX */
        .mst-lb{position:fixed;inset:0;background:rgba(4,3,2,0.97);z-index:2000;display:flex;align-items:center;justify-content:center;animation:mst-lb-in 0.35s ease;backdrop-filter:blur(12px)}
        @keyframes mst-lb-in{from{opacity:0}to{opacity:1}}
        .mst-lb-topbar{position:absolute;top:0;left:0;right:0;display:flex;align-items:center;justify-content:space-between;padding:1.2rem 2rem;border-bottom:1px solid rgba(201,168,76,0.1);background:rgba(8,6,4,0.6);backdrop-filter:blur(10px)}
        .mst-lb-top-label{font-family:'Cormorant Garamond',serif;font-size:1rem;font-style:italic;font-weight:300;color:rgba(255,255,255,0.6)}
        .mst-lb-top-count{font-size:0.7rem;font-weight:600;letter-spacing:0.2em;color:var(--g-primary)}
        .mst-lb-top-sep{color:rgba(201,168,76,0.3)}
        .mst-lb-close{position:absolute;top:1rem;right:1.8rem;width:36px;height:36px;background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);cursor:pointer;z-index:10;display:flex;flex-direction:column;align-items:center;justify-content:center;transition:background 0.3s,border-color 0.3s}
        .mst-lb-close:hover{background:rgba(201,168,76,0.15);border-color:var(--g-primary)}
        .mst-lb-x{display:block;width:16px;height:1.5px;background:rgba(255,255,255,0.7);transition:background 0.3s}
        .mst-lb-x:first-child{transform:rotate(45deg) translate(1px,1px)}
        .mst-lb-x:last-child{transform:rotate(-45deg) translate(1px,-1px)}
        .mst-lb-close:hover .mst-lb-x{background:var(--g-light)}
        .mst-lb-nav{position:absolute;top:50%;transform:translateY(-50%);background:rgba(8,6,4,0.7);border:1px solid rgba(201,168,76,0.2);width:52px;height:80px;cursor:pointer;z-index:10;display:flex;align-items:center;justify-content:center;transition:border-color 0.3s,background 0.3s}
        .mst-lb-nav:hover{border-color:var(--g-primary);background:rgba(201,168,76,0.08)}
        .mst-lb-arrow{font-size:2.2rem;color:rgba(255,255,255,0.5);transition:color 0.3s,transform 0.3s;line-height:1}
        .mst-lb-nav:hover .mst-lb-arrow{color:var(--g-light)}
        .mst-lb-prev{left:1rem}
        .mst-lb-prev:hover .mst-lb-arrow{transform:translateX(-3px)}
        .mst-lb-next{right:1rem}
        .mst-lb-next:hover .mst-lb-arrow{transform:translateX(3px)}
        .mst-lb-frame{display:flex;flex-direction:column;align-items:center;max-width:82vw;max-height:88vh;animation:mst-lb-scale 0.38s cubic-bezier(0.34,1.4,0.64,1)}
        .mst-lb-frame--anim{animation:mst-lb-switch 0.22s ease}
        @keyframes mst-lb-scale{from{transform:scale(0.9);opacity:0}to{transform:scale(1);opacity:1}}
        @keyframes mst-lb-switch{0%{opacity:1;transform:scale(1)}50%{opacity:0;transform:scale(0.96)}100%{opacity:1;transform:scale(1)}}
        .mst-lb-img-wrap{position:relative;display:flex}
        .mst-lb-img{max-width:100%;max-height:72vh;object-fit:contain;border:1px solid rgba(201,168,76,0.15);display:block}
        .mst-lb-corner{position:absolute;width:20px;height:20px;border-style:solid;border-color:var(--g-primary);opacity:0.7;pointer-events:none}
        .mst-lb-tl{top:-4px;left:-4px;border-width:1.5px 0 0 1.5px}
        .mst-lb-tr{top:-4px;right:-4px;border-width:1.5px 1.5px 0 0}
        .mst-lb-bl{bottom:-4px;left:-4px;border-width:0 0 1.5px 1.5px}
        .mst-lb-br{bottom:-4px;right:-4px;border-width:0 1.5px 1.5px 0}
        .mst-lb-caption{display:flex;align-items:center;justify-content:space-between;width:100%;margin-top:1.4rem;padding:0 0.2rem;gap:1rem}
        .mst-lb-cap-left{display:flex;align-items:center;gap:1rem}
        .mst-lb-num{font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:300;color:rgba(201,168,76,0.2);line-height:1}
        .mst-lb-cap-div{width:1px;height:32px;background:linear-gradient(to bottom,transparent,rgba(201,168,76,0.3),transparent)}
        .mst-lb-cap-info{display:flex;flex-direction:column;gap:0.2rem}
        .mst-lb-label{font-family:'Cormorant Garamond',serif;font-size:1.05rem;font-style:italic;font-weight:300;color:rgba(255,255,255,0.85)}
        .mst-lb-sub{font-size:0.55rem;letter-spacing:0.3em;color:rgba(201,168,76,0.5)}
        .mst-lb-dots{display:flex;gap:0.3rem;flex-wrap:wrap;max-width:200px;justify-content:flex-end}
        .mst-lb-dot{width:5px;height:5px;border-radius:50%;border:none;background:rgba(255,255,255,0.12);cursor:pointer;transition:background 0.3s,transform 0.3s}
        .mst-lb-dot--active{background:var(--g-primary);transform:scale(1.4);box-shadow:0 0 5px var(--g-glow-sm)}

        /* RESPONSIVE */
        @media (max-width:900px){
          .mst-grid{grid-template-columns:repeat(2,1fr);grid-auto-rows:180px;padding:0 1.5rem 3rem}
          .mst-lb-dots{display:none}
        }
        @media (max-width:560px){
          .mst-grid{grid-template-columns:repeat(2,1fr);grid-auto-rows:140px;gap:3px;padding:0 0.8rem 2.5rem}
          .mst-section-label{padding:2.5rem 1.5rem 1.5rem}
          .mst-back{left:1.2rem;top:1.2rem}
          .mst-lb-prev{left:0.3rem}.mst-lb-next{right:0.3rem}
          .mst-lb-frame{max-width:94vw}
          .mst-lb-num,.mst-lb-cap-div{display:none}
        }
      `}</style>
    </div>
  );
};

export default Page;
