import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Each entry is one modeling story/theme. Add another entry here for a new
// shoot — the story-card row scales to any number of stories (they wrap onto
// new rows), and each card links to its own dedicated photo page at
// /modeling/:slug so different shoots never mix on one page.
export const stories = [
  {
    id: 0,
    slug: "traditional-modeling",
    name: "Traditional Modeling",
    subtitle: "Confidence, attitude, expression — every frame tells a story without words",
    cover: "/Images/Modeling/EAGL3062.jpg",
    photos: [
      { img: "/Images/Modeling/EAGL2949.jpg", label: "Editorial Muse", span: "tall" },
      { img: "/Images/Modeling/EAGL2950.jpg", label: "Vogue Moment", span: "normal" },
      { img: "/Images/Modeling/EAGL2951.jpg", label: "Golden Hour", span: "normal" },
      { img: "/Images/Modeling/EAGL2952.jpg", label: "Studio Light", span: "wide" },
      { img: "/Images/Modeling/EAGL2953.jpg", label: "Radiant Grace", span: "normal" },
      { img: "/Images/Modeling/EAGL2954.jpg", label: "Silk & Shadow", span: "tall" },
      { img: "/Images/Modeling/EAGL2955.jpg", label: "Poised Elegance", span: "normal" },
      { img: "/Images/Modeling/EAGL2956.jpg", label: "Timeless Charm", span: "normal" },
      { img: "/Images/Modeling/EAGL2959.jpg", label: "Fierce Spirit", span: "wide" },
      { img: "/Images/Modeling/EAGL2960.jpg", label: "Modern Royalty", span: "tall" },
      { img: "/Images/Modeling/EAGL2961.jpg", label: "Classic Frame", span: "normal" },
      { img: "/Images/Modeling/EAGL2962.jpg", label: "Bold Statement", span: "normal" },
      { img: "/Images/Modeling/EAGL2963.jpg", label: "Soft Focus", span: "tall" },
      { img: "/Images/Modeling/EAGL2964.jpg", label: "Chic Portrait", span: "normal" },
      { img: "/Images/Modeling/EAGL2966.jpg", label: "Regal Aura", span: "normal" },
      { img: "/Images/Modeling/EAGL2967.jpg", label: "Effortless Style", span: "wide" },
      { img: "/Images/Modeling/EAGL2968.jpg", label: "Runway Ready", span: "normal" },
      { img: "/Images/Modeling/EAGL2969.jpg", label: "Captured Confidence", span: "tall" },
      { img: "/Images/Modeling/EAGL2970.jpg", label: "True Elegance", span: "normal" },
      { img: "/Images/Modeling/EAGL2971.jpg", label: "Graceful Pose", span: "normal" },
      { img: "/Images/Modeling/EAGL2972.jpg", label: "Refined Beauty", span: "wide" },
      { img: "/Images/Modeling/EAGL2973.jpg", label: "Statement Look", span: "tall" },
      { img: "/Images/Modeling/EAGL2974.jpg", label: "Couture Dream", span: "normal" },
      { img: "/Images/Modeling/EAGL2976.jpg", label: "Golden Muse", span: "normal" },
      { img: "/Images/Modeling/EAGL2978.jpg", label: "Velvet Gaze", span: "tall" },
      { img: "/Images/Modeling/EAGL2980.jpg", label: "Style Icon", span: "normal" },
      { img: "/Images/Modeling/EAGL2981.jpg", label: "Poised Perfection", span: "normal" },
      { img: "/Images/Modeling/EAGL2982.jpg", label: "Artistic Vision", span: "wide" },
      { img: "/Images/Modeling/EAGL2992.jpg", label: "Natural Glow", span: "normal" },
      { img: "/Images/Modeling/EAGL2993.jpg", label: "Studio Muse", span: "tall" },
      { img: "/Images/Modeling/EAGL2999.jpg", label: "Glamour Shot", span: "normal" },
      { img: "/Images/Modeling/EAGL3001.jpg", label: "Signature Look", span: "normal" },
      { img: "/Images/Modeling/EAGL3002.jpg", label: "Ethereal Beauty", span: "wide" },
      { img: "/Images/Modeling/EAGL3003.jpg", label: "Urban Chic", span: "tall" },
      { img: "/Images/Modeling/EAGL3005.jpg", label: "Timeless Grace", span: "normal" },
      { img: "/Images/Modeling/EAGL3006.jpg", label: "Vintage Charm", span: "normal" },
      { img: "/Images/Modeling/EAGL3007.jpg", label: "Modern Muse", span: "tall" },
      { img: "/Images/Modeling/EAGL3008.jpg", label: "Sculpted Light", span: "normal" },
      { img: "/Images/Modeling/EAGL3009.jpg", label: "Dreamy Frame", span: "normal" },
      { img: "/Images/Modeling/EAGL3010.jpg", label: "Radiant Pose", span: "wide" },
      { img: "/Images/Modeling/EAGL3011.jpg", label: "Elegant Edge", span: "normal" },
      { img: "/Images/Modeling/EAGL3013.jpg", label: "Fashion Forward", span: "tall" },
      { img: "/Images/Modeling/EAGL3015.jpg", label: "Bold & Beautiful", span: "normal" },
      { img: "/Images/Modeling/EAGL3016.jpg", label: "Serene Gaze", span: "normal" },
      { img: "/Images/Modeling/EAGL3017.jpg", label: "Captivating Charm", span: "wide" },
      { img: "/Images/Modeling/EAGL3025.jpg", label: "Poise & Power", span: "tall" },
      { img: "/Images/Modeling/EAGL3026.jpg", label: "Golden Silhouette", span: "normal" },
      { img: "/Images/Modeling/EAGL3028.jpg", label: "Chic & Sleek", span: "normal" },
      { img: "/Images/Modeling/EAGL3029.jpg", label: "Delicate Drama", span: "tall" },
      { img: "/Images/Modeling/EAGL3030.jpg", label: "Studio Story", span: "normal" },
      { img: "/Images/Modeling/EAGL3031.jpg", label: "Portrait Perfection", span: "normal" },
      { img: "/Images/Modeling/EAGL3032.jpg", label: "Grace in Motion", span: "wide" },
      { img: "/Images/Modeling/EAGL3033.jpg", label: "Refined Muse", span: "normal" },
      { img: "/Images/Modeling/EAGL3034.jpg", label: "Style Statement", span: "tall" },
      { img: "/Images/Modeling/EAGL3035.jpg", label: "Classic Muse", span: "normal" },
      { img: "/Images/Modeling/EAGL3037.jpg", label: "Modern Elegance", span: "normal" },
      { img: "/Images/Modeling/EAGL3038.jpg", label: "Confident Charm", span: "wide" },
      { img: "/Images/Modeling/EAGL3041.jpg", label: "Artful Frame", span: "tall" },
      { img: "/Images/Modeling/EAGL3042.jpg", label: "Golden Grace", span: "normal" },
      { img: "/Images/Modeling/EAGL3043.jpg", label: "Studio Glow", span: "normal" },
      { img: "/Images/Modeling/EAGL3044.jpg", label: "Timeless Pose", span: "tall" },
      { img: "/Images/Modeling/EAGL3045.jpg", label: "Fierce Grace", span: "normal" },
      { img: "/Images/Modeling/EAGL3046.jpg", label: "Elegant Reverie", span: "normal" },
      { img: "/Images/Modeling/EAGL3047.jpg", label: "Poised Muse", span: "wide" },
      { img: "/Images/Modeling/EAGL3048.jpg", label: "True Radiance", span: "normal" },
      { img: "/Images/Modeling/EAGL3049.jpg", label: "Style & Substance", span: "tall" },
      { img: "/Images/Modeling/EAGL3050-2.jpg", label: "Captured Elegance", span: "normal" },
      { img: "/Images/Modeling/EAGL3050.jpg", label: "Graceful Charm", span: "normal" },
      { img: "/Images/Modeling/EAGL3051.jpg", label: "Vivid Portrait", span: "wide" },
      { img: "/Images/Modeling/EAGL3052.jpg", label: "Studio Radiance", span: "tall" },
      { img: "/Images/Modeling/EAGL3053.jpg", label: "Golden Reverie", span: "normal" },
      { img: "/Images/Modeling/EAGL3054.jpg", label: "Chic Silhouette", span: "normal" },
      { img: "/Images/Modeling/EAGL3055.jpg", label: "Modern Grace", span: "tall" },
      { img: "/Images/Modeling/EAGL3056.jpg", label: "Effortless Charm", span: "normal" },
      { img: "/Images/Modeling/EAGL3057.jpg", label: "Fashion Muse", span: "normal" },
      { img: "/Images/Modeling/EAGL3058.jpg", label: "Refined Grace", span: "wide" },
      { img: "/Images/Modeling/EAGL3059.jpg", label: "Classic Elegance", span: "normal" },
      { img: "/Images/Modeling/EAGL3060.jpg", label: "Golden Portrait", span: "tall" },
      { img: "/Images/Modeling/EAGL3061.jpg", label: "Studio Elegance", span: "normal" },
      { img: "/Images/Modeling/EAGL3062.jpg", label: "Behind the Frame", span: "wide" },
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

  const goToStory = (slug: string) => {
    navigate(`/modeling/${slug}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="ms-root">

      {/* ── HERO ── */}
      <div className={`ms-hero ${heroVisible ? "ms-hero--visible" : ""}`}>
        <img loading="lazy" decoding="async" src="/Images/Backgrounds/background.jpg" alt="Modelling" className="ms-hero-img" />
        <div className="ms-hero-overlay" />

        <div className="ms-particles" aria-hidden="true">
          {[...Array(8)].map((_, i) => <span key={i} className={`ms-particle ms-p--${i + 1}`} />)}
        </div>

        <div className="ms-hero-content">
          <p className="ms-eyebrow">
            <span className="ms-ey-line" />
            EAGLE-VIEW PICTURES
            <span className="ms-ey-line ms-ey-line--r" />
          </p>
          <h1 className="ms-hero-title">Modelling Shoots</h1>
          <div className="ms-hero-rule">
            <span className="ms-rule-line" />
            <span className="ms-rule-gem" />
            <span className="ms-rule-line ms-rule-line--r" />
          </div>
          <p className="ms-hero-sub">
            Where artistry meets elegance — every pose tells a story
          </p>
        </div>

        <div className="ms-scroll">
          <div className="ms-scroll-mouse"><span className="ms-scroll-wheel" /></div>
          <span className="ms-scroll-text">SCROLL</span>
        </div>
      </div>

      {/* ── STORY CARDS ── */}
      <div className="ms-fam-section">
        <div className="ms-section-label">
          <span className="ms-lbl-line" />
          <div className="ms-lbl-center">
            <span className="ms-lbl-gem">✦</span>
            <span className="ms-lbl-text">MODELING STORIES</span>
            <span className="ms-lbl-gem">✦</span>
          </div>
          <span className="ms-lbl-line ms-lbl-line--r" />
        </div>

        <div className="ms-fam-row">
          {stories.map((s) => (
            <div
              key={s.id}
              className="ms-fam-card"
              onClick={() => goToStory(s.slug)}
            >
              <div className="ms-fam-media">
                <img loading="lazy" decoding="async" src={s.cover} alt={s.name} className="ms-fam-img" />
                <div className="ms-fam-media-overlay" />
              </div>
              <div className="ms-fam-body">
                <p className="ms-fam-eyebrow">
                  <span className="ms-fam-dot" />
                  MODELING STORY
                </p>
                <h3 className="ms-fam-name">{s.name}</h3>
                <div className="ms-fam-rule">
                  <span className="ms-fam-rule-line" />
                  <span className="ms-fam-rule-gem" />
                </div>
                <p className="ms-fam-sub">{s.subtitle}</p>
                <button className="ms-fam-btn" onClick={(e) => { e.stopPropagation(); goToStory(s.slug); }}>
                  <span>VIEW PHOTOS</span>
                  <span className="ms-fam-btn-arrow">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FOOTER ORNAMENT ── */}
      <div className="ms-footer-orn">
        <span className="ms-fo-line" />
        <span className="ms-fo-gem">✦</span>
        <span className="ms-fo-text">Every frame is a work of art</span>
        <span className="ms-fo-gem">✦</span>
        <span className="ms-fo-line" />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Great+Vibes&family=Montserrat:wght@300;400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --g-primary:#C9A84C;--g-light:#E8C96A;--g-deep:#9A7228;
          --g-glow:rgba(201,168,76,0.6);--g-glow-sm:rgba(201,168,76,0.3);--bg:#080604;
        }
        .ms-root{background:var(--bg);min-height:100vh;font-family:'Montserrat',sans-serif;color:#fff}

        /* HERO */
        .ms-hero{position:relative;height:80vh;min-height:560px;overflow:hidden;opacity:0;transition:opacity 1.1s ease}
        .ms-hero--visible{opacity:1}
        .ms-hero-img{width:100%;height:100%;object-fit:cover;transform:scale(1.1);animation:ms-zoom 14s cubic-bezier(0.25,0.46,0.45,0.94) forwards;filter:brightness(0.4) sepia(0.12)}
        @keyframes ms-zoom{to{transform:scale(1)}}
        .ms-hero-overlay{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(8,6,4,0.15) 0%,rgba(8,6,4,0.38) 50%,rgba(8,6,4,0.93) 100%),radial-gradient(ellipse at 50% 55%,rgba(201,168,76,0.04) 0%,transparent 65%)}

        .ms-particles{position:absolute;inset:0;pointer-events:none}
        .ms-particle{position:absolute;width:2px;height:2px;border-radius:50%;background:var(--g-primary);opacity:0;animation:ms-float 9s ease infinite}
        .ms-p--1{left:12%;animation-delay:0s;animation-duration:9s}
        .ms-p--2{left:28%;animation-delay:1.5s;animation-duration:11s}
        .ms-p--3{left:48%;animation-delay:3s;animation-duration:8s}
        .ms-p--4{left:63%;animation-delay:0.7s;animation-duration:10s}
        .ms-p--5{left:78%;animation-delay:2s;animation-duration:9s}
        .ms-p--6{left:20%;animation-delay:4s;animation-duration:12s}
        .ms-p--7{left:68%;animation-delay:1s;animation-duration:7s}
        .ms-p--8{left:43%;animation-delay:5s;animation-duration:10s}
        @keyframes ms-float{0%{bottom:5%;opacity:0;transform:translateX(0) scale(1)}20%{opacity:0.6}80%{opacity:0.3}100%{bottom:92%;opacity:0;transform:translateX(18px) scale(0.4)}}

        .ms-hero-content{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem;animation:ms-fade 1.6s ease 0.4s both}
        @keyframes ms-fade{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}
        .ms-eyebrow{display:inline-flex;align-items:center;gap:0.9rem;font-size:0.6rem;letter-spacing:0.55em;color:#fff;margin-bottom:1.4rem;font-weight:600}
        .ms-ey-line{display:block;width:35px;height:1px;background:linear-gradient(90deg,transparent,var(--g-primary))}
        .ms-ey-line--r{background:linear-gradient(90deg,var(--g-primary),transparent)}
        .ms-hero-title{font-family:'Great Vibes',cursive;font-size:clamp(3rem,8vw,6.5rem);font-weight:400;line-height:1.05;color:#fff;margin-bottom:1.6rem;text-shadow:0 4px 40px rgba(0,0,0,0.4);animation:ms-shimmer 4s ease 2s infinite}
        @keyframes ms-shimmer{0%,100%{text-shadow:0 4px 40px rgba(0,0,0,0.4)}50%{text-shadow:0 4px 40px rgba(0,0,0,0.4),0 0 60px rgba(201,168,76,0.1)}}
        .ms-hero-rule{display:flex;align-items:center;gap:1rem;margin-bottom:1.4rem}
        .ms-rule-line{display:block;width:70px;height:1px;background:linear-gradient(90deg,transparent,var(--g-primary))}
        .ms-rule-line--r{background:linear-gradient(90deg,var(--g-primary),transparent)}
        .ms-rule-gem{display:block;width:7px;height:7px;background:var(--g-primary);transform:rotate(45deg);animation:ms-gem 2s ease infinite}
        @keyframes ms-gem{0%,100%{box-shadow:0 0 12px var(--g-glow),0 0 28px var(--g-glow)}50%{box-shadow:0 0 20px var(--g-glow),0 0 50px rgba(201,168,76,0.45)}}
        .ms-hero-sub{font-family:'Cormorant Garamond',serif;font-size:clamp(1rem,2vw,1.4rem);font-weight:300;font-style:italic;color:rgba(255,255,255,0.72);letter-spacing:0.05em}

        .ms-scroll{position:absolute;bottom:2.2rem;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:0.5rem;animation:ms-bob 2.5s ease infinite}
        @keyframes ms-bob{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(7px)}}
        .ms-scroll-mouse{width:22px;height:34px;border:1.5px solid rgba(201,168,76,0.4);border-radius:11px;display:flex;justify-content:center;padding-top:6px}
        .ms-scroll-wheel{width:2px;height:7px;border-radius:2px;background:var(--g-primary);animation:ms-wheel 1.8s ease infinite}
        @keyframes ms-wheel{0%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(10px)}}
        .ms-scroll-text{font-size:0.45rem;letter-spacing:0.5em;color:rgba(201,168,76,0.45)}

        /* SECTION LABEL */
        .ms-section-label{display:flex;align-items:center;justify-content:center;gap:1.5rem;padding:3.5rem 3rem 2.5rem}
        .ms-lbl-line{flex:1;max-width:140px;height:1px;background:linear-gradient(90deg,transparent,rgba(201,168,76,0.2))}
        .ms-lbl-line--r{background:linear-gradient(90deg,rgba(201,168,76,0.2),transparent)}
        .ms-lbl-center{display:flex;align-items:center;gap:0.8rem}
        .ms-lbl-gem{font-size:0.38rem;color:var(--g-primary);opacity:0.6}
        .ms-lbl-text{font-size:0.58rem;letter-spacing:0.55em;color:rgba(255,255,255,0.35);font-weight:600}

        /* STORY CARDS (one editorial card per story; wraps to a new row as more are added) */
        .ms-fam-section{padding-bottom:0.5rem}
        .ms-fam-row{display:flex;flex-wrap:wrap;justify-content:center;align-items:stretch;gap:1.8rem;max-width:1200px;margin:0 auto;padding:0 2.5rem 4rem}
        .ms-fam-card{position:relative;display:flex;width:100%;max-width:900px;min-height:340px;background:#0e0b07;border:1px solid rgba(201,168,76,0.18);cursor:pointer;overflow:hidden;transition:border-color 0.4s ease,transform 0.4s cubic-bezier(0.16,1,0.3,1),box-shadow 0.4s ease}
        .ms-fam-card:hover{border-color:rgba(201,168,76,0.55);transform:translateY(-6px);box-shadow:0 26px 60px rgba(0,0,0,0.55),0 0 34px rgba(201,168,76,0.07)}
        .ms-fam-media{position:relative;width:42%;flex-shrink:0;overflow:hidden}
        .ms-fam-img{width:100%;height:100%;object-fit:cover;object-position:top center;transition:transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94);filter:brightness(0.9) sepia(0.03)}
        .ms-fam-card:hover .ms-fam-img{transform:scale(1.07)}
        .ms-fam-media-overlay{position:absolute;inset:0;background:linear-gradient(90deg,transparent 60%,rgba(14,11,7,0.55) 100%)}
        .ms-fam-body{flex:1;display:flex;flex-direction:column;justify-content:center;gap:1rem;padding:2.8rem 3.2rem;min-width:0}
        .ms-fam-eyebrow{display:flex;align-items:center;gap:0.6rem;font-size:0.62rem;font-weight:600;letter-spacing:0.4em;color:#fff}
        .ms-fam-dot{width:6px;height:6px;border-radius:50%;background:var(--g-primary);box-shadow:0 0 10px var(--g-glow);flex-shrink:0}
        .ms-fam-name{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,3.4vw,2.8rem);font-weight:300;font-style:italic;color:#fff;line-height:1.15}
        .ms-fam-rule{display:flex;align-items:center;gap:0.6rem}
        .ms-fam-rule-line{width:46px;height:1px;background:linear-gradient(90deg,var(--g-primary),transparent)}
        .ms-fam-rule-gem{width:5px;height:5px;background:var(--g-primary);transform:rotate(45deg);box-shadow:0 0 8px var(--g-glow)}
        .ms-fam-sub{font-family:'Cormorant Garamond',serif;font-size:1.08rem;font-style:italic;font-weight:300;color:rgba(255,255,255,0.65)}
        .ms-fam-btn{position:relative;display:inline-flex;align-items:center;gap:0.8rem;padding:0.85rem 1.9rem;background:transparent;border:1px solid rgba(201,168,76,0.35);color:#fff;font-family:'Montserrat',sans-serif;font-size:0.65rem;font-weight:600;letter-spacing:0.3em;cursor:pointer;transition:border-color 0.3s,background 0.3s;width:fit-content;margin-top:0.4rem}
        .ms-fam-btn:hover{border-color:var(--g-primary);background:rgba(201,168,76,0.08)}
        .ms-fam-btn-arrow{color:var(--g-primary);transition:transform 0.3s;display:inline-block}
        .ms-fam-btn:hover .ms-fam-btn-arrow{transform:translateX(4px)}

        /* FOOTER */
        .ms-footer-orn{display:flex;align-items:center;justify-content:center;gap:1rem;padding:2.5rem 3rem 4rem}
        .ms-fo-line{flex:1;max-width:100px;height:1px;background:rgba(201,168,76,0.1)}
        .ms-fo-gem{font-size:0.38rem;color:var(--g-deep);opacity:0.6}
        .ms-fo-text{font-family:'Cormorant Garamond',serif;font-size:clamp(0.9rem,1.5vw,1rem);font-style:italic;font-weight:300;color:rgba(255,255,255,0.22);letter-spacing:0.06em}

        /* RESPONSIVE */
        @media (max-width:900px) and (min-width:561px){
          .ms-fam-card{flex-direction:column;max-width:520px;min-height:0}
          .ms-fam-media{width:100%;height:260px}
          .ms-fam-body{padding:2.2rem 2.2rem}
        }
        @media (max-width:560px){
          .ms-section-label{padding:2.5rem 1.5rem 1.5rem}
          .ms-fam-row{flex-direction:column;align-items:stretch;padding:0 1.2rem 2.5rem}
          .ms-fam-card{max-width:100%;flex-direction:column;min-height:0}
          .ms-fam-media{width:100%;height:220px}
          .ms-fam-body{padding:2rem 1.6rem}
        }
      `}</style>
    </div>
  );
};

export default Page;
