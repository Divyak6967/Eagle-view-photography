import React, { useState, useEffect, useRef } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import Testimonials from '../components/Testimonials';
import Ratings from '../components/Ratings';
import Service from '../components/Service';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [inView, setInView] = useState<Record<string, boolean>>({});
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const id = (e.target as HTMLElement).dataset.observe;
            if (id) setInView(prev => ({ ...prev, [id]: true }));
          }
        });
      },
      { threshold: 0.12 }
    );
    Object.values(sectionRefs.current).forEach(r => r && observer.observe(r));
    return () => observer.disconnect();
  }, []);

  const setRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  return (
    <>
      <div className="ab2-root">

        {/* ── HERO: Split-screen cinematic ── */}
        <section className="ab2-hero">
          <div className="ab2-hero-img-panel">
            <img
              src="/Images/3.jpg.jpeg"
              alt="Eagle View Photography"
              className="ab2-hero-img"
              style={{ transform: `translateY(${scrollY * 0.25}px)` }}
            />
            <div className="ab2-hero-img-overlay" />
            <div className="ab2-year-stamp">
              <span className="ab2-year-num">2014</span>
              <span className="ab2-year-line" />
              <span className="ab2-year-lbl">Est.</span>
            </div>
          </div>

          <div className="ab2-hero-text-panel">
            <div className="ab2-vert-label" aria-hidden="true">EAGLE — VIEW — PICTURES</div>
            <div className="ab2-hero-inner">
              <p className="ab2-hero-eyebrow">
                <span className="ab2-ey-dot" />
                About Us
              </p>
              <h1 className="ab2-hero-headline">
                <span className="ab2-hl-thin">We</span>
                <span className="ab2-hl-script"> Tell</span>
                <br />
                <span className="ab2-hl-thin">Your</span>
                <span className="ab2-hl-bold"> Story</span>
              </h1>
              <div className="ab2-hero-divider">
                <span className="ab2-hdl" />
                <span className="ab2-hdiamond" />
                <span className="ab2-hdl ab2-hdl--r" />
              </div>
              <p className="ab2-hero-tagline">
                Turning fleeting moments into timeless memories
              </p>
              <div className="ab2-hero-scroll">
                <div className="ab2-scroll-track"><div className="ab2-scroll-thumb" /></div>
                <span className="ab2-scroll-lbl">Scroll to discover</span>
              </div>
            </div>
          </div>

          <div className="ab2-particles" aria-hidden="true">
            {[...Array(6)].map((_, i) => <span key={i} className={`ab2-particle ab2-p--${i + 1}`} />)}
          </div>
        </section>

        {/* ── TICKER ── */}
        <div className="ab2-ticker">
          <div className="ab2-ticker-track">
            {[...Array(4)].map((_, ri) => (
              <span key={ri} className="ab2-ticker-set">
                {["WEDDINGS","PORTRAITS","MATERNITY","ENGAGEMENTS","MODELLING","LEGACY"].map((w, i) => (
                  <React.Fragment key={i}>
                    <span className="ab2-ticker-word">{w}</span>
                    <span className="ab2-ticker-gem">✦</span>
                  </React.Fragment>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* ── STORY ── */}
        <section
          className={`ab2-story ${inView.story ? "ab2--in" : ""}`}
          data-observe="story"
          ref={setRef("story") as any}
        >
          <span className="ab2-story-bg-num" aria-hidden="true">01</span>
          <div className="ab2-story-inner">
            <div className="ab2-img-stack">
              <div className="ab2-img-primary">
                <img src="/Images/3.jpg.jpeg" alt="Eagle View Photography" />
                <div className="ab2-img-primary-overlay" />
                <span className="ab2-fc ab2-fc--tl" />
                <span className="ab2-fc ab2-fc--tr" />
                <span className="ab2-fc ab2-fc--bl" />
                <span className="ab2-fc ab2-fc--br" />
              </div>
              <div className="ab2-img-accent">
                <img src="/Images/img3.jpg" alt="Photography" />
                <div className="ab2-img-accent-badge">
                  <span className="ab2-badge-large">800<sup>+</sup></span>
                  <span className="ab2-badge-sub">Weddings Captured</span>
                </div>
              </div>
            </div>

            <div className="ab2-story-content">
              <div className="ab2-section-tag">
                <span className="ab2-tag-line" />
                <span className="ab2-tag-text">OUR STORY</span>
              </div>
              <h2 className="ab2-story-title">
                Capturing Life's Most <em>Beautiful</em> Moments With Elegance &amp; Emotion
              </h2>
              <p className="ab2-story-body">
                At <strong>Eagle View Photography</strong>, we specialize in transforming
                fleeting moments into timeless memories. From grand weddings to intimate
                celebrations, our passion lies in capturing authentic emotions with creativity and precision.
              </p>
              <p className="ab2-story-body">
                Every frame we create tells a story — <em>your story</em> — beautifully
                preserved forever. We believe photography is not just a service; it's an art
                form that speaks long after the moment has passed.
              </p>
              <div className="ab2-signature">
                <span className="ab2-sig-line" />
                <div className="ab2-sig-text">Eagle View Photography</div>
              </div>
              <div className="ab2-actions">
                <div className="ab2-socials">
                  <a href="#" className="ab2-soc ab2-soc--ig" aria-label="Instagram"><FaInstagram /></a>
                  <a href="#" className="ab2-soc ab2-soc--fb" aria-label="Facebook"><FaFacebookF /></a>
                  <a href="#" className="ab2-soc ab2-soc--tw" aria-label="Twitter"><FaTwitter /></a>
                </div>
                <Link to="/contact" className="ab2-cta">
                  <span className="ab2-cta-inner">
                    <span className="ab2-cta-label">Book a Session</span>
                    <span className="ab2-cta-arrow">
                      <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
                        <path d="M0 5H18M14 1L18 5L14 9" stroke="currentColor" strokeWidth="1.2"/>
                      </svg>
                    </span>
                  </span>
                  <span className="ab2-cta-bg" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        {/* <section
          className={`ab2-stats ${inView.stats ? "ab2--in" : ""}`}
          data-observe="stats"
          ref={setRef("stats") as any}
        >
          {[
            { num: "800", suf: "+", lbl: "Weddings" },
            { num: "10",  suf: "+", lbl: "Years" },
            { num: "2k",  suf: "+", lbl: "Memories" },
            { num: "50",  suf: "+", lbl: "Awards" },
          ].map((s, i) => (
            <React.Fragment key={i}>
              <div className="ab2-stat" style={{ transitionDelay: `${i * 0.12}s` }}>
                <span className="ab2-stat-num">{s.num}<sup>{s.suf}</sup></span>
                <span className="ab2-stat-rule" />
                <span className="ab2-stat-lbl">{s.lbl}</span>
              </div>
              {i < 3 && <span className="ab2-stat-sep" aria-hidden="true">✦</span>}
            </React.Fragment>
          ))}
        </section> */}

        {/* ── VALUES ── */}
        {/* <section
          className={`ab2-values ${inView.values ? "ab2--in" : ""}`}
          data-observe="values"
          ref={setRef("values") as any}
        >
          <span className="ab2-values-bg-num" aria-hidden="true">02</span>
          <div className="ab2-values-head">
            <div className="ab2-section-tag">
              <span className="ab2-tag-line" />
              <span className="ab2-tag-text">OUR PHILOSOPHY</span>
            </div>
            <h2 className="ab2-values-title">What Drives Us</h2>
          </div>
          <div className="ab2-values-grid">
            {[
              { num: "01", title: "Authenticity",  body: "We capture real, unscripted emotion — the laughter, the tears, the quiet glances that define your story." },
              { num: "02", title: "Craftsmanship", body: "Every frame is meticulously composed. Light, shadow, timing — nothing is left to chance." },
              { num: "03", title: "Legacy",        body: "We don't just take photos. We create heirlooms that will be passed down through generations." },
            ].map((v, i) => (
              <div key={i} className="ab2-value-card" style={{ transitionDelay: `${i * 0.15}s` }}>
                <span className="ab2-value-num">{v.num}</span>
                <div className="ab2-value-bar" />
                <h3 className="ab2-value-title">{v.title}</h3>
                <p className="ab2-value-body">{v.body}</p>
                <div className="ab2-value-gem">✦</div>
              </div>
            ))}
          </div>
        </section> */}

        {/* ── CLOSING QUOTE ── */}
        <section className="ab2-quote">
          <div className="ab2-quote-mark">"</div>
          <blockquote className="ab2-quote-text">
            Every photograph is a certificate of presence
          </blockquote>
          <div className="ab2-quote-attr">
            <span className="ab2-qa-line" />
            <span className="ab2-qa-text">Eagle View Photography</span>
          </div>
        </section>

      </div>

      <Ratings />
      <Service />
      <Testimonials />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,200;0,300;0,600;1,200;1,300;1,600&family=Great+Vibes&family=Montserrat:wght@200;300;400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --g-primary:#C9A84C;--g-light:#E8C96A;--g-deep:#9A7228;
          --g-glow:rgba(201,168,76,0.6);--g-glow-sm:rgba(201,168,76,0.28);
          --g-border:rgba(201,168,76,0.28);--bg:#080604;--bg2:#0d0b08;
        }
        .ab2-root{background:var(--bg);min-height:100vh;font-family:'Montserrat',sans-serif;color:#fff;overflow-x:hidden}

        /* ══ HERO ══ */
        .ab2-hero{
          position:relative;height:100vh;min-height:620px;
          display:grid;grid-template-columns:55% 45%;
          overflow:hidden;
        }
        .ab2-hero-img-panel{position:relative;overflow:hidden}
        .ab2-hero-img{width:100%;height:130%;object-fit:cover;object-position:center top;filter:brightness(0.55) sepia(0.15);will-change:transform}
        .ab2-hero-img-overlay{position:absolute;inset:0;background:linear-gradient(to right,transparent 60%,var(--bg) 100%),linear-gradient(to bottom,rgba(8,6,4,0.2) 0%,rgba(8,6,4,0.5) 100%)}
        .ab2-year-stamp{position:absolute;bottom:3rem;left:2.5rem;display:flex;align-items:center;gap:1rem;animation:ab2-fade-up 1s ease 1s both}
        .ab2-year-num{font-family:'Cormorant Garamond',serif;font-size:1rem;font-weight:200;letter-spacing:0.4em;color:rgba(255,255,255,0.4)}
        .ab2-year-line{display:block;width:40px;height:1px;background:var(--g-border)}
        .ab2-year-lbl{font-size:0.5rem;letter-spacing:0.5em;color:rgba(201,168,76,0.6)}
        .ab2-hero-text-panel{position:relative;background:var(--bg);display:flex;align-items:center;padding:0 4rem 0 3.5rem;overflow:hidden}
        .ab2-hero-text-panel::before{content:'';position:absolute;left:0;top:10%;bottom:10%;width:1px;background:linear-gradient(to bottom,transparent,var(--g-border),transparent)}
        .ab2-vert-label{position:absolute;right:1.8rem;top:50%;transform:translateY(-50%) rotate(90deg);font-size:0.45rem;letter-spacing:0.6em;color:rgba(201,168,76,0.18);white-space:nowrap;font-weight:600}
        .ab2-hero-inner{display:flex;flex-direction:column;gap:1.8rem;animation:ab2-fade-up 1.2s ease 0.3s both}
        .ab2-hero-eyebrow{display:inline-flex;align-items:center;gap:0.8rem;font-size:0.55rem;letter-spacing:0.55em;color:var(--g-primary);font-weight:600}
        .ab2-ey-dot{display:block;width:5px;height:5px;border-radius:50%;background:var(--g-primary);box-shadow:0 0 8px var(--g-glow);animation:ab2-pulse 2s ease infinite}
        @keyframes ab2-pulse{0%,100%{box-shadow:0 0 8px var(--g-glow)}50%{box-shadow:0 0 16px var(--g-glow),0 0 28px var(--g-glow-sm)}}
        .ab2-hero-headline{line-height:0.95;letter-spacing:-0.01em}
        .ab2-hl-thin{display:block;font-family:'Cormorant Garamond',serif;font-size:clamp(2.8rem,5vw,4.5rem);font-weight:200;color:rgba(255,255,255,0.5);letter-spacing:0.08em}
        .ab2-hl-script{font-family:'Great Vibes',cursive;font-size:clamp(4rem,7vw,6.5rem);color:#fff;text-shadow:0 0 60px rgba(201,168,76,0.12)}
        .ab2-hl-bold{font-family:'Cormorant Garamond',serif;font-size:clamp(3.5rem,6vw,5.5rem);font-weight:600;color:#fff;letter-spacing:0.04em}
        .ab2-hero-divider{display:flex;align-items:center;gap:0.8rem}
        .ab2-hdl{display:block;width:50px;height:1px;background:linear-gradient(90deg,var(--g-primary),transparent)}
        .ab2-hdl--r{background:linear-gradient(90deg,transparent,var(--g-primary))}
        .ab2-hdiamond{display:block;width:6px;height:6px;background:var(--g-primary);transform:rotate(45deg);box-shadow:0 0 10px var(--g-glow)}
        .ab2-hero-tagline{font-family:'Cormorant Garamond',serif;font-size:clamp(1rem,1.8vw,1.3rem);font-weight:300;font-style:italic;color:rgba(255,255,255,0.55);letter-spacing:0.04em}
        .ab2-hero-scroll{display:flex;align-items:center;gap:1rem;margin-top:0.5rem}
        .ab2-scroll-track{width:1px;height:50px;background:rgba(201,168,76,0.15);position:relative;overflow:hidden}
        .ab2-scroll-thumb{position:absolute;top:0;left:0;width:100%;height:40%;background:var(--g-primary);animation:ab2-scroll-drop 2s ease infinite}
        @keyframes ab2-scroll-drop{0%{top:-40%}100%{top:140%}}
        .ab2-scroll-lbl{font-size:0.48rem;letter-spacing:0.45em;color:rgba(255,255,255,0.25)}
        .ab2-particles{position:absolute;inset:0;pointer-events:none;z-index:2}
        .ab2-particle{position:absolute;width:2px;height:2px;border-radius:50%;background:var(--g-primary);opacity:0;animation:ab2-float 10s ease infinite}
        .ab2-p--1{left:30%;animation-delay:0s;animation-duration:9s}
        .ab2-p--2{left:45%;animation-delay:2s;animation-duration:11s}
        .ab2-p--3{left:60%;animation-delay:4s;animation-duration:8s}
        .ab2-p--4{left:20%;animation-delay:1s;animation-duration:13s}
        .ab2-p--5{left:75%;animation-delay:3s;animation-duration:10s}
        .ab2-p--6{left:50%;animation-delay:5s;animation-duration:12s}
        @keyframes ab2-float{0%{bottom:5%;opacity:0}20%{opacity:0.5}80%{opacity:0.2}100%{bottom:90%;opacity:0;transform:translateX(15px)}}

        /* ══ TICKER ══ */
        .ab2-ticker{overflow:hidden;border-top:1px solid rgba(201,168,76,0.12);border-bottom:1px solid rgba(201,168,76,0.12);padding:1rem 0;background:var(--bg2)}
        .ab2-ticker-track{display:flex;animation:ab2-ticker 22s linear infinite;width:max-content}
        @keyframes ab2-ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .ab2-ticker-set{display:flex;align-items:center}
        .ab2-ticker-word{font-size:0.55rem;letter-spacing:0.55em;font-weight:600;color:rgba(255,255,255,0.2);padding:0 2rem;white-space:nowrap}
        .ab2-ticker-gem{font-size:0.4rem;color:var(--g-primary);opacity:0.4}

        /* ══ STORY ══ */
        .ab2-story{position:relative;overflow:hidden;padding:7rem 5rem 6rem;max-width:1500px;margin:0 auto;opacity:0;transform:translateY(40px);transition:opacity 0.9s ease,transform 0.9s ease}
        .ab2-story.ab2--in{opacity:1;transform:none}
        .ab2-story-bg-num{position:absolute;top:-2rem;left:-1rem;font-family:'Cormorant Garamond',serif;font-size:18vw;font-weight:600;color:rgba(201,168,76,0.025);line-height:1;pointer-events:none;user-select:none;letter-spacing:-0.05em}
        .ab2-story-inner{display:grid;grid-template-columns:1fr 1fr;gap:6rem;align-items:center}

        /* Stacked images */
        .ab2-img-stack{position:relative;height:560px}
        .ab2-img-primary{position:absolute;top:0;left:0;width:82%;height:85%;overflow:hidden}
        .ab2-img-primary img{width:100%;height:100%;object-fit:cover;filter:brightness(0.85) sepia(0.1);transition:transform 0.8s ease,filter 0.5s ease}
        .ab2-img-primary:hover img{transform:scale(1.04);filter:brightness(0.75) sepia(0.06)}
        .ab2-img-primary-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(8,6,4,0.4) 0%,transparent 60%)}
        .ab2-fc{position:absolute;width:24px;height:24px;border-style:solid;border-color:var(--g-primary);opacity:0.65}
        .ab2-fc--tl{top:-2px;left:-2px;border-width:1.5px 0 0 1.5px}
        .ab2-fc--tr{top:-2px;right:-2px;border-width:1.5px 1.5px 0 0}
        .ab2-fc--bl{bottom:-2px;left:-2px;border-width:0 0 1.5px 1.5px}
        .ab2-fc--br{bottom:-2px;right:-2px;border-width:0 1.5px 1.5px 0}
        .ab2-img-accent{position:absolute;bottom:0;right:0;width:52%;height:48%;overflow:hidden;border:4px solid var(--bg);box-shadow:-8px -8px 0 var(--g-primary)}
        .ab2-img-accent img{width:100%;height:100%;object-fit:cover;filter:brightness(0.7) sepia(0.08)}
        .ab2-img-accent-badge{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(8,6,4,0.55);backdrop-filter:blur(2px)}
        .ab2-badge-large{font-family:'Cormorant Garamond',serif;font-size:2.8rem;font-weight:200;color:#fff;line-height:1}
        .ab2-badge-large sup{font-size:0.45em;color:var(--g-primary);vertical-align:super}
        .ab2-badge-sub{font-size:0.5rem;letter-spacing:0.3em;color:rgba(255,255,255,0.45);margin-top:0.3rem}

        /* Story content */
        .ab2-story-content{display:flex;flex-direction:column;gap:2rem}
        .ab2-section-tag{display:flex;align-items:center;gap:1rem}
        .ab2-tag-line{display:block;width:30px;height:1px;background:var(--g-primary)}
        .ab2-tag-text{font-size:0.52rem;letter-spacing:0.55em;color:var(--g-primary);font-weight:600}
        .ab2-story-title{font-family:'Cormorant Garamond',serif;font-size:clamp(1.8rem,2.8vw,2.6rem);font-weight:300;line-height:1.35;color:#fff;letter-spacing:0.01em}
        .ab2-story-title em{font-style:italic;color:var(--g-light)}
        .ab2-story-body{font-size:0.95rem;line-height:2;color:rgba(255,255,255,0.58);font-weight:300}
        .ab2-story-body strong{color:#fff;font-weight:500}
        .ab2-story-body em{color:var(--g-light);font-style:italic}
        .ab2-signature{display:flex;align-items:center;gap:1.2rem}
        .ab2-sig-line{display:block;width:40px;height:1px;background:var(--g-border)}
        .ab2-sig-text{font-family:'Great Vibes',cursive;font-size:1.8rem;color:var(--g-primary);text-shadow:0 0 15px var(--g-glow-sm)}
        .ab2-actions{display:flex;align-items:center;gap:2rem;flex-wrap:wrap}
        .ab2-socials{display:flex;gap:0.7rem}
        .ab2-soc{width:38px;height:38px;border:1px solid var(--g-border);display:flex;align-items:center;justify-content:center;font-size:0.85rem;color:rgba(255,255,255,0.45);text-decoration:none;transition:all 0.3s ease;background:rgba(201,168,76,0.03)}
        .ab2-soc:hover{border-color:var(--g-primary);transform:translateY(-3px);background:rgba(201,168,76,0.08)}
        .ab2-soc--ig:hover{color:#e1306c}.ab2-soc--fb:hover{color:#1877f2}.ab2-soc--tw:hover{color:#1da1f2}
        .ab2-cta{position:relative;display:inline-flex;align-items:center;text-decoration:none;overflow:hidden;border:1px solid var(--g-primary);transition:box-shadow 0.3s}
        .ab2-cta:hover{box-shadow:0 0 20px var(--g-glow-sm),inset 0 0 20px rgba(201,168,76,0.05)}
        .ab2-cta-inner{display:flex;align-items:center;gap:1rem;padding:0.9rem 2rem;position:relative;z-index:1}
        .ab2-cta-label{font-size:0.65rem;font-weight:600;letter-spacing:0.3em;text-transform:uppercase;color:#fff}
        .ab2-cta-arrow{color:var(--g-primary);display:flex;align-items:center;transition:transform 0.3s}
        .ab2-cta:hover .ab2-cta-arrow{transform:translateX(6px)}
        .ab2-cta-bg{position:absolute;inset:0;background:linear-gradient(105deg,transparent 0%,rgba(201,168,76,0.07) 50%,transparent 100%);transform:translateX(-100%);transition:transform 0.6s ease}
        .ab2-cta:hover .ab2-cta-bg{transform:translateX(100%)}

        /* ══ STATS ══ */
        .ab2-stats{display:flex;align-items:center;justify-content:center;gap:3rem;padding:4.5rem 5rem;border-top:1px solid rgba(201,168,76,0.08);border-bottom:1px solid rgba(201,168,76,0.08);background:linear-gradient(to right,transparent,rgba(201,168,76,0.025),transparent);opacity:0;transform:translateY(30px);transition:opacity 0.8s ease,transform 0.8s ease}
        .ab2-stats.ab2--in{opacity:1;transform:none}
        .ab2-stat{display:flex;flex-direction:column;align-items:center;gap:0.5rem;opacity:0;transform:translateY(20px);transition:opacity 0.6s ease,transform 0.6s ease}
        .ab2-stats.ab2--in .ab2-stat{opacity:1;transform:none}
        .ab2-stat-num{font-family:'Cormorant Garamond',serif;font-size:3.2rem;font-weight:200;color:#fff;line-height:1}
        .ab2-stat-num sup{font-size:0.4em;color:var(--g-primary);vertical-align:super}
        .ab2-stat-rule{display:block;width:24px;height:1px;background:var(--g-primary);margin:0 auto}
        .ab2-stat-lbl{font-size:0.5rem;letter-spacing:0.45em;color:rgba(255,255,255,0.3);text-transform:uppercase}
        .ab2-stat-sep{font-size:0.4rem;color:rgba(201,168,76,0.25)}

        /* ══ VALUES ══ */
        .ab2-values{position:relative;overflow:hidden;padding:7rem 5rem 6rem;max-width:1500px;margin:0 auto;opacity:0;transform:translateY(40px);transition:opacity 0.9s ease,transform 0.9s ease}
        .ab2-values.ab2--in{opacity:1;transform:none}
        .ab2-values-bg-num{position:absolute;top:-2rem;right:-1rem;font-family:'Cormorant Garamond',serif;font-size:18vw;font-weight:600;color:rgba(201,168,76,0.025);line-height:1;pointer-events:none;user-select:none}
        .ab2-values-head{display:flex;flex-direction:column;gap:1rem;margin-bottom:4rem}
        .ab2-values-title{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,3.5vw,3rem);font-weight:200;color:#fff;letter-spacing:0.04em}
        .ab2-values-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px}
        .ab2-value-card{position:relative;padding:3rem 2.5rem;background:rgba(201,168,76,0.02);border:1px solid rgba(201,168,76,0.08);display:flex;flex-direction:column;gap:1.2rem;opacity:0;transform:translateY(30px);transition:opacity 0.7s ease,transform 0.7s ease,background 0.4s,border-color 0.4s;overflow:hidden}
        .ab2-values.ab2--in .ab2-value-card{opacity:1;transform:none}
        .ab2-value-card:hover{background:rgba(201,168,76,0.05);border-color:rgba(201,168,76,0.2)}
        .ab2-value-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--g-primary),transparent);opacity:0;transition:opacity 0.4s}
        .ab2-value-card:hover::before{opacity:1}
        .ab2-value-num{font-family:'Cormorant Garamond',serif;font-size:3.5rem;font-weight:200;color:rgba(201,168,76,0.12);line-height:1}
        .ab2-value-bar{width:30px;height:1px;background:var(--g-primary)}
        .ab2-value-title{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:300;color:#fff;letter-spacing:0.04em}
        .ab2-value-body{font-size:0.88rem;line-height:1.9;color:rgba(255,255,255,0.5);font-weight:300}
        .ab2-value-gem{font-size:0.35rem;color:var(--g-primary);opacity:0.5;margin-top:auto}

        /* ══ QUOTE ══ */
        .ab2-quote{padding:6rem 5rem 7rem;display:flex;flex-direction:column;align-items:center;text-align:center;gap:2rem;background:linear-gradient(to bottom,rgba(201,168,76,0.02),transparent);border-top:1px solid rgba(201,168,76,0.08)}
        .ab2-quote-mark{font-family:'Cormorant Garamond',serif;font-size:8rem;font-weight:200;color:rgba(201,168,76,0.15);line-height:0.6;pointer-events:none}
        .ab2-quote-text{font-family:'Cormorant Garamond',serif;font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:200;font-style:italic;color:rgba(255,255,255,0.75);max-width:700px;line-height:1.4;letter-spacing:0.02em}
        .ab2-quote-attr{display:flex;align-items:center;gap:1rem}
        .ab2-qa-line{display:block;width:30px;height:1px;background:var(--g-border)}
        .ab2-qa-text{font-size:0.5rem;letter-spacing:0.4em;color:var(--g-primary);font-weight:600}

        @keyframes ab2-fade-up{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}

        /* ══ RESPONSIVE ══ */
        @media(max-width:1024px){
          .ab2-hero{grid-template-columns:1fr}
          .ab2-hero-img-panel{height:55vh}
          .ab2-hero-text-panel{padding:4rem 3rem;min-height:auto}
          .ab2-hero-text-panel::before{display:none}
          .ab2-story-inner{grid-template-columns:1fr;gap:3rem}
          .ab2-img-stack{height:420px}
          .ab2-values-grid{grid-template-columns:1fr}
          .ab2-story,.ab2-values{padding:5rem 3rem 4rem}
        }
        @media(max-width:768px){
          .ab2-stats{flex-wrap:wrap;gap:2rem;padding:3rem 2rem}
          .ab2-story,.ab2-values{padding:4rem 1.5rem 3rem}
          .ab2-quote{padding:4rem 1.5rem 5rem}
          .ab2-img-stack{height:340px}
          .ab2-img-accent{width:58%;height:50%}
        }
      `}</style>
    </>
  );
};

export default AboutPage;