import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Each entry is one family's baby shower story. Add another entry here when a
// new client is added — the story-card row scales to any number of families
// (they wrap onto new rows), and each card links to its own dedicated photo
// page at /babyshower/:slug so different families never mix on one page.
export const families = [
  {
    id: 0,
    slug: "benilo-sharmi",
    name: "Benilo & Sharmi",
    subtitle: "Hello, tiny miracle — the sweetest chapter begins",
    cover: "/Images/babyshower/couple-cover.jpg",
    photos: [
      { img: "/Images/babyshower/EAGL2777.jpg", label: "Tiny Miracle" },
      { img: "/Images/babyshower/EAGL2787.jpg", label: "Pure Innocence" },
      { img: "/Images/babyshower/EAGL2778.jpg", label: "First Smile" },
      { img: "/Images/babyshower/EAGL2788.jpg", label: "Wrapped in Love" },
      { img: "/Images/babyshower/EAGL2779.jpg", label: "Dreaming Away" },
      { img: "/Images/babyshower/EAGL2789.jpg", label: "Golden Light" },
      { img: "/Images/babyshower/EAGL2780.jpg", label: "Little Hands" },
      { img: "/Images/babyshower/EAGL2790.jpg", label: "Hello World" },
      { img: "/Images/babyshower/EAGL2782.jpg", label: "Sweet Slumber" },
      { img: "/Images/babyshower/EAGL2791.jpg", label: "Cherished" },
      { img: "/Images/babyshower/EAGL2783.jpg", label: "Bundle of Joy" },
      { img: "/Images/babyshower/EAGL2792.jpg", label: "Forever Loved" },
      { img: "/Images/babyshower/EAGL2784.jpg", label: "Newborn Bliss" },
      { img: "/Images/babyshower/EAGL2793.jpg", label: "Snuggle Time" },
      { img: "/Images/babyshower/EAGL2785.jpg", label: "Soft & Warm" },
      { img: "/Images/babyshower/EAGL2794.jpg", label: "Our Greatest Gift" },
      { img: "/Images/babyshower/EAGL2786.jpg", label: "Tiny Toes" },
      { img: "/Images/babyshower/6.jpg", label: "Hello, Tiny Miracle" },
      { img: "/Images/babyshower/1.jpg", label: "The Sweetest Chapter" },
      { img: "/Images/babyshower/5.jpg", label: "Tiny Kicks, Full Hearts" },
      { img: "/Images/babyshower/2.jpg", label: "Carried With Love" },
    ],
  },
];

const Page = () => {
  const navigate = useNavigate();
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const goToFamily = (slug: string) => {
    navigate(`/babyshower/${slug}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bb-root">

      {/* ── HERO ── */}
      <div className={`bb-hero ${heroVisible ? "bb-hero--visible" : ""}`}>
        <img loading="lazy" decoding="async" src="/Images/Backgrounds/background.jpg" alt="Baby shower" className="bb-hero-img" />
        <div className="bb-hero-overlay" />

        <div className="bb-particles" aria-hidden="true">
          {[...Array(8)].map((_, i) => <span key={i} className={`bb-particle bb-p--${i + 1}`} />)}
        </div>

        <div className="bb-hero-content">
          <p className="bb-eyebrow">
            <span className="bb-ey-line" />
            EAGLE-VIEW PICTURES
            <span className="bb-ey-line bb-ey-line--r" />
          </p>
          <h1 className="bb-hero-title">Baby shower</h1>
          <div className="bb-hero-rule">
            <span className="bb-rule-line" />
            <span className="bb-rule-gem" />
            <span className="bb-rule-line bb-rule-line--r" />
          </div>
          <p className="bb-hero-sub">
            Tiny moments, infinite love — every detail beautifully captured
          </p>
        </div>

        <div className="bb-scroll">
          <div className="bb-scroll-mouse"><span className="bb-scroll-wheel" /></div>
          <span className="bb-scroll-text">SCROLL</span>
        </div>
      </div>

      {/* ── FAMILY STORY CARDS ── */}
      <div className="bb-fam-section">
        <div className="bb-section-label">
          <span className="bb-lbl-line" />
          <div className="bb-lbl-center">
            <span className="bb-lbl-gem">✦</span>
            <span className="bb-lbl-text">BABY SHOWER STORIES</span>
            <span className="bb-lbl-gem">✦</span>
          </div>
          <span className="bb-lbl-line bb-lbl-line--r" />
        </div>

        <div className="bb-fam-row">
          {families.map((f) => (
            <div
              key={f.id}
              className="bb-fam-card"
              onClick={() => goToFamily(f.slug)}
            >
              <div className="bb-fam-media">
                <img loading="lazy" decoding="async" src={f.cover} alt={f.name} className="bb-fam-img" />
                <div className="bb-fam-media-overlay" />
              </div>
              <div className="bb-fam-body">
                <p className="bb-fam-eyebrow">
                  <span className="bb-fam-dot" />
                  BABY SHOWER STORY
                </p>
                <h3 className="bb-fam-name">{f.name}</h3>
                <div className="bb-fam-rule">
                  <span className="bb-fam-rule-line" />
                  <span className="bb-fam-rule-gem" />
                </div>
                <p className="bb-fam-sub">{f.subtitle}</p>
                <button className="bb-fam-btn" onClick={(e) => { e.stopPropagation(); goToFamily(f.slug); }}>
                  <span>VIEW PHOTOS</span>
                  <span className="bb-fam-btn-arrow">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FOOTER ORNAMENT ── */}
      <div className="bb-footer-orn">
        <span className="bb-fo-line" />
        <span className="bb-fo-gem">✦</span>
        <span className="bb-fo-text">The smallest things take up the most room in your heart</span>
        <span className="bb-fo-gem">✦</span>
        <span className="bb-fo-line" />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Great+Vibes&family=Montserrat:wght@300;400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --g-primary:#C9A84C;--g-light:#E8C96A;--g-deep:#9A7228;
          --g-glow:rgba(201,168,76,0.6);--g-glow-sm:rgba(201,168,76,0.3);--bg:#080604;
        }
        .bb-root{background:var(--bg);min-height:100vh;font-family:'Montserrat',sans-serif;color:#fff}

        /* HERO */
        .bb-hero{position:relative;height:80vh;min-height:560px;overflow:hidden;opacity:0;transition:opacity 1.1s ease}
        .bb-hero--visible{opacity:1}
        .bb-hero-img{width:100%;height:100%;object-fit:cover;transform:scale(1.1);animation:bb-zoom 14s cubic-bezier(0.25,0.46,0.45,0.94) forwards;filter:brightness(0.4) sepia(0.12)}
        @keyframes bb-zoom{to{transform:scale(1)}}
        .bb-hero-overlay{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(8,6,4,0.15) 0%,rgba(8,6,4,0.38) 50%,rgba(8,6,4,0.93) 100%),radial-gradient(ellipse at 50% 55%,rgba(201,168,76,0.04) 0%,transparent 65%)}

        .bb-particles{position:absolute;inset:0;pointer-events:none}
        .bb-particle{position:absolute;width:2px;height:2px;border-radius:50%;background:var(--g-primary);opacity:0;animation:bb-float 9s ease infinite}
        .bb-p--1{left:12%;animation-delay:0s;animation-duration:9s}
        .bb-p--2{left:28%;animation-delay:1.5s;animation-duration:11s}
        .bb-p--3{left:48%;animation-delay:3s;animation-duration:8s}
        .bb-p--4{left:63%;animation-delay:0.7s;animation-duration:10s}
        .bb-p--5{left:78%;animation-delay:2s;animation-duration:9s}
        .bb-p--6{left:20%;animation-delay:4s;animation-duration:12s}
        .bb-p--7{left:68%;animation-delay:1s;animation-duration:7s}
        .bb-p--8{left:43%;animation-delay:5s;animation-duration:10s}
        @keyframes bb-float{0%{bottom:5%;opacity:0;transform:translateX(0) scale(1)}20%{opacity:0.6}80%{opacity:0.3}100%{bottom:92%;opacity:0;transform:translateX(18px) scale(0.4)}}

        .bb-hero-content{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem;animation:bb-fade 1.6s ease 0.4s both}
        @keyframes bb-fade{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}
        .bb-eyebrow{display:inline-flex;align-items:center;gap:0.9rem;font-size:0.6rem;letter-spacing:0.55em;color:#fff;margin-bottom:1.4rem;font-weight:600}
        .bb-ey-line{display:block;width:35px;height:1px;background:linear-gradient(90deg,transparent,var(--g-primary))}
        .bb-ey-line--r{background:linear-gradient(90deg,var(--g-primary),transparent)}
        .bb-hero-title{font-family:'Great Vibes',cursive;font-size:clamp(3rem,8vw,6.5rem);font-weight:400;line-height:1.05;color:#fff;margin-bottom:1.6rem;text-shadow:0 4px 40px rgba(0,0,0,0.4);animation:bb-shimmer 4s ease 2s infinite}
        @keyframes bb-shimmer{0%,100%{text-shadow:0 4px 40px rgba(0,0,0,0.4)}50%{text-shadow:0 4px 40px rgba(0,0,0,0.4),0 0 60px rgba(201,168,76,0.1)}}
        .bb-hero-rule{display:flex;align-items:center;gap:1rem;margin-bottom:1.4rem}
        .bb-rule-line{display:block;width:70px;height:1px;background:linear-gradient(90deg,transparent,var(--g-primary))}
        .bb-rule-line--r{background:linear-gradient(90deg,var(--g-primary),transparent)}
        .bb-rule-gem{display:block;width:7px;height:7px;background:var(--g-primary);transform:rotate(45deg);animation:bb-gem 2s ease infinite}
        @keyframes bb-gem{0%,100%{box-shadow:0 0 12px var(--g-glow),0 0 28px var(--g-glow)}50%{box-shadow:0 0 20px var(--g-glow),0 0 50px rgba(201,168,76,0.45)}}
        .bb-hero-sub{font-family:'Cormorant Garamond',serif;font-size:clamp(1rem,2vw,1.4rem);font-weight:300;font-style:italic;color:rgba(255,255,255,0.72);letter-spacing:0.05em}

        .bb-scroll{position:absolute;bottom:2.2rem;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:0.5rem;animation:bb-bob 2.5s ease infinite}
        @keyframes bb-bob{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(7px)}}
        .bb-scroll-mouse{width:22px;height:34px;border:1.5px solid rgba(201,168,76,0.4);border-radius:11px;display:flex;justify-content:center;padding-top:6px}
        .bb-scroll-wheel{width:2px;height:7px;border-radius:2px;background:var(--g-primary);animation:bb-wheel 1.8s ease infinite}
        @keyframes bb-wheel{0%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(10px)}}
        .bb-scroll-text{font-size:0.45rem;letter-spacing:0.5em;color:rgba(201,168,76,0.45)}

        /* SECTION LABEL */
        .bb-section-label{display:flex;align-items:center;justify-content:center;gap:1.5rem;padding:3.5rem 3rem 2.5rem}
        .bb-lbl-line{flex:1;max-width:140px;height:1px;background:linear-gradient(90deg,transparent,rgba(201,168,76,0.2))}
        .bb-lbl-line--r{background:linear-gradient(90deg,rgba(201,168,76,0.2),transparent)}
        .bb-lbl-center{display:flex;align-items:center;gap:0.8rem}
        .bb-lbl-gem{font-size:0.38rem;color:var(--g-primary);opacity:0.6}
        .bb-lbl-text{font-size:0.58rem;letter-spacing:0.55em;color:rgba(255,255,255,0.35);font-weight:600}

        /* FAMILY STORY CARDS (one editorial card per family; wraps to a new row as more are added) */
        .bb-fam-section{padding-bottom:0.5rem}
        .bb-fam-row{display:flex;flex-wrap:wrap;justify-content:center;align-items:stretch;gap:1.8rem;max-width:1200px;margin:0 auto;padding:0 2.5rem 4rem}
        .bb-fam-card{position:relative;display:flex;width:100%;max-width:900px;min-height:340px;background:#0e0b07;border:1px solid rgba(201,168,76,0.18);cursor:pointer;overflow:hidden;transition:border-color 0.4s ease,transform 0.4s cubic-bezier(0.16,1,0.3,1),box-shadow 0.4s ease}
        .bb-fam-card:hover{border-color:rgba(201,168,76,0.55);transform:translateY(-6px);box-shadow:0 26px 60px rgba(0,0,0,0.55),0 0 34px rgba(201,168,76,0.07)}
        .bb-fam-media{position:relative;width:42%;flex-shrink:0;overflow:hidden}
        .bb-fam-img{width:100%;height:100%;object-fit:cover;object-position:top center;transition:transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94);filter:brightness(0.88) sepia(0.05)}
        .bb-fam-card:hover .bb-fam-img{transform:scale(1.07)}
        .bb-fam-media-overlay{position:absolute;inset:0;background:linear-gradient(90deg,transparent 60%,rgba(14,11,7,0.55) 100%)}
        .bb-fam-body{flex:1;display:flex;flex-direction:column;justify-content:center;gap:1rem;padding:2.8rem 3.2rem;min-width:0}
        .bb-fam-eyebrow{display:flex;align-items:center;gap:0.6rem;font-size:0.62rem;font-weight:600;letter-spacing:0.4em;color:#fff}
        .bb-fam-dot{width:6px;height:6px;border-radius:50%;background:var(--g-primary);box-shadow:0 0 10px var(--g-glow);flex-shrink:0}
        .bb-fam-name{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,3.4vw,2.8rem);font-weight:300;font-style:italic;color:#fff;line-height:1.15}
        .bb-fam-rule{display:flex;align-items:center;gap:0.6rem}
        .bb-fam-rule-line{width:46px;height:1px;background:linear-gradient(90deg,var(--g-primary),transparent)}
        .bb-fam-rule-gem{width:5px;height:5px;background:var(--g-primary);transform:rotate(45deg);box-shadow:0 0 8px var(--g-glow)}
        .bb-fam-sub{font-family:'Cormorant Garamond',serif;font-size:1.08rem;font-style:italic;font-weight:300;color:rgba(255,255,255,0.65)}
        .bb-fam-btn{position:relative;display:inline-flex;align-items:center;gap:0.8rem;padding:0.85rem 1.9rem;background:transparent;border:1px solid rgba(201,168,76,0.35);color:#fff;font-family:'Montserrat',sans-serif;font-size:0.65rem;font-weight:600;letter-spacing:0.3em;cursor:pointer;transition:border-color 0.3s,background 0.3s;width:fit-content;margin-top:0.4rem}
        .bb-fam-btn:hover{border-color:var(--g-primary);background:rgba(201,168,76,0.08)}
        .bb-fam-btn-arrow{color:var(--g-primary);transition:transform 0.3s;display:inline-block}
        .bb-fam-btn:hover .bb-fam-btn-arrow{transform:translateX(4px)}

        /* FOOTER */
        .bb-footer-orn{display:flex;align-items:center;justify-content:center;gap:1rem;padding:2.5rem 3rem 4rem}
        .bb-fo-line{flex:1;max-width:100px;height:1px;background:rgba(201,168,76,0.1)}
        .bb-fo-gem{font-size:0.38rem;color:var(--g-deep);opacity:0.6}
        .bb-fo-text{font-family:'Cormorant Garamond',serif;font-size:clamp(0.9rem,1.5vw,1rem);font-style:italic;font-weight:300;color:rgba(255,255,255,0.22);letter-spacing:0.06em}

        /* RESPONSIVE */
        @media (max-width:900px) and (min-width:561px){
          .bb-fam-card{flex-direction:column;max-width:520px;min-height:0}
          .bb-fam-media{width:100%;height:260px}
          .bb-fam-body{padding:2.2rem 2.2rem}
        }
        @media (max-width:560px){
          .bb-section-label{padding:2.5rem 1.5rem 1.5rem}
          .bb-fam-row{flex-direction:column;align-items:stretch;padding:0 1.2rem 2.5rem}
          .bb-fam-card{max-width:100%;flex-direction:column;min-height:0}
          .bb-fam-media{width:100%;height:220px}
          .bb-fam-body{padding:2rem 1.6rem}
        }
      `}</style>
    </div>
  );
};

export default Page;
