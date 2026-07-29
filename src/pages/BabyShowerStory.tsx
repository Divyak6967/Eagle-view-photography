import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { families } from "./BabyShower";

const Page = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const family = families.find((f) => f.slug === slug);

  const [heroVisible, setHeroVisible] = useState(false);
  const [lightbox, setLightbox]       = useState<number | null>(null);
  const [lbAnim, setLbAnim]           = useState(false);
  const [visible, setVisible]         = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const photos = family?.photos ?? [];

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

  if (!family) {
    return (
      <div className="bs-root bs-notfound">
        <p>This baby shower story couldn't be found.</p>
        <button onClick={() => navigate("/babyshower")}>← Back to Baby Shower Stories</button>
        <style>{`
          .bs-notfound{min-height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.4rem;background:#080604;color:#fff;font-family:'Montserrat',sans-serif}
          .bs-notfound button{background:transparent;border:1px solid rgba(201,168,76,0.4);color:#fff;padding:0.8rem 1.6rem;letter-spacing:0.1em;cursor:pointer}
          .bs-notfound button:hover{border-color:#C9A84C}
        `}</style>
      </div>
    );
  }

  return (
    <div className="bs-root">

      {/* ── HERO ── */}
      <div className={`bs-hero ${heroVisible ? "bs-hero--visible" : ""}`}>
        <img loading="lazy" decoding="async" src={family.cover} alt={family.name} className="bs-hero-img" />
        <div className="bs-hero-overlay" />

        <Link to="/babyshower" className="bs-back">
          <span className="bs-back-arrow">←</span> BABY SHOWER STORIES
        </Link>

        <div className="bs-hero-content">
          <p className="bs-eyebrow">
            <span className="bs-ey-line" />
            EAGLE-VIEW PICTURES
            <span className="bs-ey-line bs-ey-line--r" />
          </p>
          <h1 className="bs-hero-title">{family.name}</h1>
          <div className="bs-hero-rule">
            <span className="bs-rule-line" />
            <span className="bs-rule-gem" />
            <span className="bs-rule-line bs-rule-line--r" />
          </div>
          <p className="bs-hero-sub">{family.subtitle}</p>
        </div>
      </div>

      {/* ── SECTION LABEL ── */}
      <div className="bs-section-label">
        <span className="bs-lbl-line" />
        <div className="bs-lbl-center">
          <span className="bs-lbl-gem">✦</span>
          <span className="bs-lbl-text">MOMENTS</span>
          <span className="bs-lbl-gem">✦</span>
        </div>
        <span className="bs-lbl-line bs-lbl-line--r" />
      </div>

      {/* ── MASONRY GRID ── */}
      <div className="bs-grid">
        {photos.map((item, i) => (
          <div
            key={i}
            data-index={i}
            ref={(el) => { itemRefs.current[i] = el; }}
            className={`bs-item ${visible.has(i) ? "bs-item--visible" : ""}`}
            style={{ transitionDelay: `${(i % 5) * 0.07}s` }}
            onClick={() => openLb(i)}
          >
            <div className="bs-item-inner">
              <img loading="lazy" decoding="async" src={item.img} alt={item.label} className="bs-img" />
              <div className="bs-shimmer" />
              <div className="bs-overlay">
                <div className="bs-overlay-body">
                  <span className="bs-overlay-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="bs-overlay-label">{item.label}</span>
                  <span className="bs-overlay-bar" />
                  <span className="bs-overlay-view">View Full &nbsp;↗</span>
                </div>
              </div>
              <span className="bs-corner bs-tl" />
              <span className="bs-corner bs-tr" />
              <span className="bs-corner bs-bl" />
              <span className="bs-corner bs-br" />
              <div className="bs-top-bar" />
            </div>
          </div>
        ))}
      </div>

      {/* ── FOOTER ORNAMENT ── */}
      <div className="bs-footer-orn">
        <span className="bs-fo-line" />
        <span className="bs-fo-gem">✦</span>
        <span className="bs-fo-text">The smallest things take up the most room in your heart</span>
        <span className="bs-fo-gem">✦</span>
        <span className="bs-fo-line" />
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox !== null && (
        <div className="bs-lb" onClick={() => setLightbox(null)}>
          <div className="bs-lb-topbar">
            <span className="bs-lb-top-label">{photos[lightbox].label}</span>
            <span className="bs-lb-top-count">
              {String(lightbox + 1).padStart(2, "0")}
              <span className="bs-lb-top-sep"> / </span>
              {String(photos.length).padStart(2, "0")}
            </span>
          </div>
          <button className="bs-lb-close" onClick={() => setLightbox(null)}>
            <span className="bs-lb-x" /><span className="bs-lb-x" />
          </button>
          <button className="bs-lb-nav bs-lb-prev" onClick={(e) => navLb(-1, e)}>
            <span className="bs-lb-arrow">‹</span>
          </button>
          <div className={`bs-lb-frame ${lbAnim ? "bs-lb-frame--anim" : ""}`} onClick={(e) => e.stopPropagation()}>
            <div className="bs-lb-img-wrap">
              <img loading="lazy" decoding="async" src={photos[lightbox].img} alt={photos[lightbox].label} className="bs-lb-img" />
              <span className="bs-lb-corner bs-lb-tl" />
              <span className="bs-lb-corner bs-lb-tr" />
              <span className="bs-lb-corner bs-lb-bl" />
              <span className="bs-lb-corner bs-lb-br" />
            </div>
            <div className="bs-lb-caption">
              <div className="bs-lb-cap-left">
                <span className="bs-lb-num">{String(lightbox + 1).padStart(2, "0")}</span>
                <div className="bs-lb-cap-div" />
                <div className="bs-lb-cap-info">
                  <span className="bs-lb-label">{photos[lightbox].label}</span>
                  <span className="bs-lb-sub">Eagle View Photography</span>
                </div>
              </div>
              <div className="bs-lb-dots">
                {photos.map((_, di) => (
                  <button key={di}
                    className={`bs-lb-dot ${di === lightbox ? "bs-lb-dot--active" : ""}`}
                    onClick={(e) => { e.stopPropagation(); openLb(di); }}
                  />
                ))}
              </div>
            </div>
          </div>
          <button className="bs-lb-nav bs-lb-next" onClick={(e) => navLb(1, e)}>
            <span className="bs-lb-arrow">›</span>
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
        .bs-root{background:var(--bg);min-height:100vh;font-family:'Montserrat',sans-serif;color:#fff}

        /* HERO */
        .bs-hero{position:relative;height:70vh;min-height:460px;overflow:hidden;opacity:0;transition:opacity 1.1s ease}
        .bs-hero--visible{opacity:1}
        .bs-hero-img{width:100%;height:100%;object-fit:cover;object-position:top center;transform:scale(1.1);animation:bs-zoom 14s cubic-bezier(0.25,0.46,0.45,0.94) forwards;filter:brightness(0.45) sepia(0.1)}
        @keyframes bs-zoom{to{transform:scale(1)}}
        .bs-hero-overlay{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(8,6,4,0.25) 0%,rgba(8,6,4,0.45) 50%,rgba(8,6,4,0.94) 100%)}

        .bs-back{position:absolute;top:1.8rem;left:2rem;z-index:10;display:inline-flex;align-items:center;gap:0.6rem;font-size:0.62rem;font-weight:600;letter-spacing:0.25em;color:rgba(255,255,255,0.75);text-decoration:none;transition:color 0.3s}
        .bs-back:hover{color:var(--g-light)}
        .bs-back-arrow{color:var(--g-primary);transition:transform 0.3s}
        .bs-back:hover .bs-back-arrow{transform:translateX(-3px)}

        .bs-hero-content{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem;animation:bs-fade 1.6s ease 0.4s both}
        @keyframes bs-fade{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}
        .bs-eyebrow{display:inline-flex;align-items:center;gap:0.9rem;font-size:0.6rem;letter-spacing:0.55em;color:#fff;margin-bottom:1.4rem;font-weight:600}
        .bs-ey-line{display:block;width:35px;height:1px;background:linear-gradient(90deg,transparent,var(--g-primary))}
        .bs-ey-line--r{background:linear-gradient(90deg,var(--g-primary),transparent)}
        .bs-hero-title{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:300;font-size:clamp(2.4rem,6vw,4.5rem);line-height:1.1;color:#fff;margin-bottom:1.4rem;text-shadow:0 4px 40px rgba(0,0,0,0.4)}
        .bs-hero-rule{display:flex;align-items:center;gap:1rem;margin-bottom:1.4rem}
        .bs-rule-line{display:block;width:70px;height:1px;background:linear-gradient(90deg,transparent,var(--g-primary))}
        .bs-rule-line--r{background:linear-gradient(90deg,var(--g-primary),transparent)}
        .bs-rule-gem{display:block;width:7px;height:7px;background:var(--g-primary);transform:rotate(45deg)}
        .bs-hero-sub{font-family:'Cormorant Garamond',serif;font-size:clamp(1rem,2vw,1.3rem);font-weight:300;font-style:italic;color:rgba(255,255,255,0.72);letter-spacing:0.03em}

        /* SECTION LABEL */
        .bs-section-label{display:flex;align-items:center;justify-content:center;gap:1.5rem;padding:3.5rem 3rem 2.5rem}
        .bs-lbl-line{flex:1;max-width:140px;height:1px;background:linear-gradient(90deg,transparent,rgba(201,168,76,0.2))}
        .bs-lbl-line--r{background:linear-gradient(90deg,rgba(201,168,76,0.2),transparent)}
        .bs-lbl-center{display:flex;align-items:center;gap:0.8rem}
        .bs-lbl-gem{font-size:0.38rem;color:var(--g-primary);opacity:0.6}
        .bs-lbl-text{font-size:0.58rem;letter-spacing:0.55em;color:rgba(255,255,255,0.35);font-weight:600}

        /* GRID */
        .bs-grid{column-count:4;column-gap:8px;padding:0 2.5rem 3rem;max-width:1600px;margin:0 auto}
        .bs-item{break-inside:avoid;margin-bottom:8px;opacity:0;transform:translateY(28px) scale(0.97);transition:opacity 0.65s ease,transform 0.65s ease;cursor:pointer}
        .bs-item--visible{opacity:1;transform:translateY(0) scale(1)}
        .bs-item-inner{position:relative;width:100%;overflow:hidden;line-height:0}
        .bs-img{width:100%;height:auto;display:block;transition:transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94),filter 0.5s ease;filter:brightness(0.82) sepia(0.08)}
        .bs-item-inner:hover .bs-img{transform:scale(1.07);filter:brightness(0.5) sepia(0.05)}
        .bs-shimmer{position:absolute;inset:0;background:linear-gradient(110deg,transparent 38%,rgba(201,168,76,0.07) 50%,transparent 62%);transform:translateX(-100%);pointer-events:none}
        .bs-item-inner:hover .bs-shimmer{transform:translateX(100%);transition:transform 0.75s ease}
        .bs-overlay{position:absolute;inset:0;display:flex;align-items:flex-end;padding:1.3rem 1.5rem;background:linear-gradient(to top,rgba(8,6,4,0.78) 0%,transparent 58%);opacity:0;transition:opacity 0.4s ease}
        .bs-item-inner:hover .bs-overlay{opacity:1}
        .bs-overlay-body{display:flex;flex-direction:column;gap:0.28rem;transform:translateY(10px);transition:transform 0.4s cubic-bezier(0.16,1,0.3,1)}
        .bs-item-inner:hover .bs-overlay-body{transform:translateY(0)}
        .bs-overlay-num{font-size:0.52rem;letter-spacing:0.4em;color:var(--g-primary);font-weight:600}
        .bs-overlay-label{font-family:'Cormorant Garamond',serif;font-size:1.1rem;color:#fff;font-style:italic;font-weight:300}
        .bs-overlay-bar{display:block;width:28px;height:1px;background:linear-gradient(90deg,var(--g-primary),var(--g-light));box-shadow:0 0 5px var(--g-glow-sm)}
        .bs-overlay-view{font-size:0.56rem;letter-spacing:0.18em;color:rgba(255,255,255,0.52)}
        .bs-corner{position:absolute;width:0;height:0;border-style:solid;border-color:transparent;transition:width 0.35s ease,height 0.35s ease,border-color 0.35s ease;pointer-events:none}
        .bs-tl{top:0;left:0;border-width:1.5px 0 0 1.5px}
        .bs-tr{top:0;right:0;border-width:1.5px 1.5px 0 0}
        .bs-bl{bottom:0;left:0;border-width:0 0 1.5px 1.5px}
        .bs-br{bottom:0;right:0;border-width:0 1.5px 1.5px 0}
        .bs-item-inner:hover .bs-corner{width:22px;height:22px;border-color:var(--g-primary);filter:drop-shadow(0 0 4px rgba(201,168,76,0.8))}
        .bs-top-bar{position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--g-primary),transparent);box-shadow:0 0 10px var(--g-glow);opacity:0;transition:opacity 0.4s ease}
        .bs-item-inner:hover .bs-top-bar{opacity:1}

        /* FOOTER */
        .bs-footer-orn{display:flex;align-items:center;justify-content:center;gap:1rem;padding:2.5rem 3rem 4rem}
        .bs-fo-line{flex:1;max-width:100px;height:1px;background:rgba(201,168,76,0.1)}
        .bs-fo-gem{font-size:0.38rem;color:var(--g-deep);opacity:0.6}
        .bs-fo-text{font-family:'Cormorant Garamond',serif;font-size:clamp(0.9rem,1.5vw,1rem);font-style:italic;font-weight:300;color:rgba(255,255,255,0.22);letter-spacing:0.06em}

        /* LIGHTBOX */
        .bs-lb{position:fixed;inset:0;background:rgba(4,3,2,0.97);z-index:2000;display:flex;align-items:center;justify-content:center;animation:bs-lb-in 0.35s ease;backdrop-filter:blur(12px)}
        @keyframes bs-lb-in{from{opacity:0}to{opacity:1}}
        .bs-lb-topbar{position:absolute;top:0;left:0;right:0;display:flex;align-items:center;justify-content:space-between;padding:1.2rem 2rem;border-bottom:1px solid rgba(201,168,76,0.1);background:rgba(8,6,4,0.6);backdrop-filter:blur(10px)}
        .bs-lb-top-label{font-family:'Cormorant Garamond',serif;font-size:1rem;font-style:italic;font-weight:300;color:rgba(255,255,255,0.6)}
        .bs-lb-top-count{font-size:0.7rem;font-weight:600;letter-spacing:0.2em;color:var(--g-primary)}
        .bs-lb-top-sep{color:rgba(201,168,76,0.3)}
        .bs-lb-close{position:absolute;top:1rem;right:1.8rem;width:36px;height:36px;background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);cursor:pointer;z-index:10;display:flex;flex-direction:column;align-items:center;justify-content:center;transition:background 0.3s,border-color 0.3s}
        .bs-lb-close:hover{background:rgba(201,168,76,0.15);border-color:var(--g-primary)}
        .bs-lb-x{display:block;width:16px;height:1.5px;background:rgba(255,255,255,0.7);transition:background 0.3s}
        .bs-lb-x:first-child{transform:rotate(45deg) translate(1px,1px)}
        .bs-lb-x:last-child{transform:rotate(-45deg) translate(1px,-1px)}
        .bs-lb-close:hover .bs-lb-x{background:var(--g-light)}
        .bs-lb-nav{position:absolute;top:50%;transform:translateY(-50%);background:rgba(8,6,4,0.7);border:1px solid rgba(201,168,76,0.2);width:52px;height:80px;cursor:pointer;z-index:10;display:flex;align-items:center;justify-content:center;transition:border-color 0.3s,background 0.3s}
        .bs-lb-nav:hover{border-color:var(--g-primary);background:rgba(201,168,76,0.08)}
        .bs-lb-arrow{font-size:2.2rem;color:rgba(255,255,255,0.5);transition:color 0.3s,transform 0.3s;line-height:1}
        .bs-lb-nav:hover .bs-lb-arrow{color:var(--g-light)}
        .bs-lb-prev{left:1rem}
        .bs-lb-prev:hover .bs-lb-arrow{transform:translateX(-3px)}
        .bs-lb-next{right:1rem}
        .bs-lb-next:hover .bs-lb-arrow{transform:translateX(3px)}
        .bs-lb-frame{display:flex;flex-direction:column;align-items:center;max-width:82vw;max-height:88vh;animation:bs-lb-scale 0.38s cubic-bezier(0.34,1.4,0.64,1)}
        .bs-lb-frame--anim{animation:bs-lb-switch 0.22s ease}
        @keyframes bs-lb-scale{from{transform:scale(0.9);opacity:0}to{transform:scale(1);opacity:1}}
        @keyframes bs-lb-switch{0%{opacity:1;transform:scale(1)}50%{opacity:0;transform:scale(0.96)}100%{opacity:1;transform:scale(1)}}
        .bs-lb-img-wrap{position:relative;display:flex}
        .bs-lb-img{max-width:100%;max-height:72vh;object-fit:contain;border:1px solid rgba(201,168,76,0.15);display:block}
        .bs-lb-corner{position:absolute;width:20px;height:20px;border-style:solid;border-color:var(--g-primary);opacity:0.7;pointer-events:none}
        .bs-lb-tl{top:-4px;left:-4px;border-width:1.5px 0 0 1.5px}
        .bs-lb-tr{top:-4px;right:-4px;border-width:1.5px 1.5px 0 0}
        .bs-lb-bl{bottom:-4px;left:-4px;border-width:0 0 1.5px 1.5px}
        .bs-lb-br{bottom:-4px;right:-4px;border-width:0 1.5px 1.5px 0}
        .bs-lb-caption{display:flex;align-items:center;justify-content:space-between;width:100%;margin-top:1.4rem;padding:0 0.2rem;gap:1rem}
        .bs-lb-cap-left{display:flex;align-items:center;gap:1rem}
        .bs-lb-num{font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:300;color:rgba(201,168,76,0.2);line-height:1}
        .bs-lb-cap-div{width:1px;height:32px;background:linear-gradient(to bottom,transparent,rgba(201,168,76,0.3),transparent)}
        .bs-lb-cap-info{display:flex;flex-direction:column;gap:0.2rem}
        .bs-lb-label{font-family:'Cormorant Garamond',serif;font-size:1.05rem;font-style:italic;font-weight:300;color:rgba(255,255,255,0.85)}
        .bs-lb-sub{font-size:0.55rem;letter-spacing:0.3em;color:rgba(201,168,76,0.5)}
        .bs-lb-dots{display:flex;gap:0.3rem;flex-wrap:wrap;max-width:200px;justify-content:flex-end}
        .bs-lb-dot{width:5px;height:5px;border-radius:50%;border:none;background:rgba(255,255,255,0.12);cursor:pointer;transition:background 0.3s,transform 0.3s}
        .bs-lb-dot--active{background:var(--g-primary);transform:scale(1.4);box-shadow:0 0 5px var(--g-glow-sm)}

        /* RESPONSIVE */
        @media (max-width:900px){
          .bs-grid{column-count:3;padding:0 1.5rem 3rem}
          .bs-lb-dots{display:none}
        }
        @media (max-width:560px){
          .bs-grid{column-count:2;column-gap:4px;padding:0 0.8rem 2.5rem}
          .bs-item{margin-bottom:4px}
          .bs-section-label{padding:2.5rem 1.5rem 1.5rem}
          .bs-back{left:1.2rem;top:1.2rem}
          .bs-lb-prev{left:0.3rem}.bs-lb-next{right:0.3rem}
          .bs-lb-frame{max-width:94vw}
          .bs-lb-num,.bs-lb-cap-div{display:none}
        }
      `}</style>
    </div>
  );
};

export default Page;
