import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const servicesList = [
  { name: "Weddings",        path: "/weddingservice", icon: "✦" },
  { name: "Engagements",     path: "/engagement",     icon: "✦" },
  { name: "Pre-Wedding",     path: "/prewedding",     icon: "✦" },
  { name: "Modal Shoot",     path: "/modeling",       icon: "✦" },
  { name: "Maternity",       path: "/maternity",      icon: "✦" },
  { name: "Puberty",         path: "/puperty",        icon: "✦" },
  { name: "Baby Shoot",      path: "/babyshower",     icon: "✦" },
  { name: "Promotion Shoot", path: "/promotion",      icon: "✦" },
];

const navLinks = [
  { name: "Home",        path: "/" },
  { name: "Our Gallery", path: "/gallery" },
   { name: "Packages", path: "/Packages" },
  { name: "About Us",    path: "/about" },
  { name: "Contact",     path: "/contact" },
];

const Navbar = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'instant' });
  const location = useLocation();
  const [showServices, setShowServices] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Scroll detection for navbar glass effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowServices(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setShowServices(false);
    setMobileServices(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className={`nb-root ${scrolled ? "nb-root--scrolled" : ""}`}>

        {/* Gold top accent line */}
        <div className="nb-top-accent" />

        <div className="nb-inner">

          {/* ── Logo ── */}
          <Link to="/" className="nb-logo-wrap">
            <img src="/Images/logo2.png" alt="Eagle View" className="nb-logo" />
          </Link>

          {/* ── Desktop Nav ── */}
          <ul className="nb-links">

            {navLinks.slice(0, 2).map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`nb-link ${isActive(link.path) ? "nb-link--active" : ""}`}
                  onClick={scrollToTop}
                >
                  {link.name}
                  <span className="nb-link-bar" />
                </Link>
              </li>
            ))}

            {/* Services dropdown */}
            <li
              ref={dropdownRef}
              className="nb-dropdown-wrap"
              onMouseEnter={() => setShowServices(true)}
              onMouseLeave={() => setShowServices(false)}
            >
              <button
                className={`nb-link nb-link--btn ${showServices ? "nb-link--active" : ""}`}
                onClick={() => setShowServices(!showServices)}
                aria-expanded={showServices}
              >
                Services
                <span className={`nb-chevron ${showServices ? "nb-chevron--open" : ""}`}>‹</span>
                <span className="nb-link-bar" />
              </button>

              {/* Dropdown panel */}
              <div className={`nb-dropdown ${showServices ? "nb-dropdown--open" : ""}`}>
                <div className="nb-dropdown-inner">
                  <p className="nb-drop-label">
                    <span className="nb-drop-label-line" />
                    OUR SPECIALITIES
                    <span className="nb-drop-label-line nb-drop-label-line--r" />
                  </p>
                  <ul className="nb-drop-list">
                    {servicesList.map((s) => (
                      <li key={s.path}>
                        <Link to={s.path} className="nb-drop-item" onClick={scrollToTop}>
                          <span className="nb-drop-gem">✦</span>
                          <span className="nb-drop-name">{s.name}</span>
                          <span className="nb-drop-arrow">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>

            {navLinks.slice(2).map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`nb-link ${isActive(link.path) ? "nb-link--active" : ""}`}
                  onClick={scrollToTop}
                >
                  {link.name}
                  <span className="nb-link-bar" />
                </Link>
              </li>
            ))}

          </ul>

          {/* ── CTA Button ── */}
          <Link to="/contact" className="nb-cta" onClick={scrollToTop}>
            <span className="nb-cta-text">Book Now</span>
            <span className="nb-cta-shine" />
          </Link>

          {/* ── Mobile Hamburger ── */}
          <button
            className={`nb-ham ${mobileOpen ? "nb-ham--open" : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className="nb-ham-line" />
            <span className="nb-ham-line" />
            <span className="nb-ham-line" />
          </button>
        </div>

        {/* ── Mobile Menu ── */}
        <div className={`nb-mobile ${mobileOpen ? "nb-mobile--open" : ""}`}>
          <div className="nb-mobile-inner">

            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nb-mob-link ${isActive(link.path) ? "nb-mob-link--active" : ""}`}
                onClick={scrollToTop}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Services */}
            <div className="nb-mob-service-wrap">
              <button
                className="nb-mob-link nb-mob-link--toggle"
                onClick={() => setMobileServices(!mobileServices)}
              >
                Services
                <span className={`nb-mob-chevron ${mobileServices ? "nb-mob-chevron--open" : ""}`}>‹</span>
              </button>

              {mobileServices && (
                <div className="nb-mob-drop">
                  {servicesList.map((s) => (
                    <Link key={s.path} to={s.path} className="nb-mob-drop-item" onClick={scrollToTop}>
                      <span className="nb-mob-gem">✦</span>
                      {s.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.slice(2).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nb-mob-link ${isActive(link.path) ? "nb-mob-link--active" : ""}`}
                onClick={scrollToTop}
              >
                {link.name}
              </Link>
            ))}

            <Link to="/contact" className="nb-mob-cta" onClick={scrollToTop}>Book a Session</Link>

          </div>
        </div>
      </nav>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400&family=Montserrat:wght@400;500;600&display=swap');

        :root {
          --g-primary: #C9A84C;
          --g-light:   #E8C96A;
          --g-pale:    #F5DFA0;
          --g-deep:    #9A7228;
          --g-glow:    rgba(201,168,76,0.55);
          --g-glow-sm: rgba(201,168,76,0.25);
          --g-border:  rgba(201,168,76,0.25);
          --nb-h:      72px;
        }

        /* ── Root ── */
        .nb-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          font-family: 'Montserrat', sans-serif;
          transition: background 0.4s ease, backdrop-filter 0.4s ease,
                      box-shadow 0.4s ease, border-color 0.4s ease;
          background: rgba(8,6,4,0.08);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border-bottom: 1px solid transparent;
        }
        .nb-root--scrolled {
          background: rgba(8,6,4,0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom-color: rgba(201,168,76,0.12);
          box-shadow: 0 4px 40px rgba(0,0,0,0.4);
        }

        /* Gold top accent */
        .nb-top-accent {
          height: 1.5px;
          background: linear-gradient(90deg,
            transparent 0%,
            var(--g-deep) 20%,
            var(--g-primary) 50%,
            var(--g-deep) 80%,
            transparent 100%
          );
          opacity: 0.7;
        }

        /* ── Inner layout ── */
        .nb-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: var(--nb-h);
          padding: 0 3rem;
          max-width: 1400px;
          margin: 0 auto;
          gap: 2rem;
        }

        /* ── Logo ── */
        .nb-logo-wrap {
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }
        .nb-logo {
          height: 40px;
          width: auto;
          object-fit: contain;
          max-width: 180px;
        }

        /* ── Desktop links ── */
        .nb-links {
          display: flex;
          align-items: center;
          gap: 0.2rem;
          list-style: none;
          margin: 0; padding: 0;
          flex: 1;
          justify-content: center;
        }

        .nb-link {
          position: relative;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          padding: 0.55rem 1.1rem;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
          transition: color 0.3s ease;
          white-space: nowrap;
          gap: 4px;
        }
        .nb-link:hover { color: #ffffff; }
        .nb-link--active { color: var(--g-light); }
        .nb-link--btn { outline: none; }

        /* Underline bar */
        .nb-link-bar {
          display: block;
          height: 1px;
          width: 0;
          background: linear-gradient(90deg, var(--g-deep), var(--g-light), var(--g-deep));
          transition: width 0.35s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 0 0 6px var(--g-glow-sm);
          align-self: center;
        }
        .nb-link:hover .nb-link-bar,
        .nb-link--active .nb-link-bar { width: 100%; }

        /* Chevron */
        .nb-chevron {
          display: inline-block;
          margin-left: 5px;
          font-size: 0.9rem;
          color: var(--g-primary);
          transition: transform 0.3s ease;
          transform: rotate(-90deg);
          line-height: 1;
        }
        .nb-chevron--open { transform: rotate(90deg); }

        /* ── Dropdown ── */
        .nb-dropdown-wrap { position: relative; }

        .nb-dropdown {
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%) translateY(-8px);
          width: 280px;
          background: rgba(10,8,4,0.97);
          border: 1px solid rgba(201,168,76,0.2);
          box-shadow: 0 24px 60px rgba(0,0,0,0.7), 0 0 40px rgba(201,168,76,0.04);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
          backdrop-filter: blur(20px);
        }
        .nb-dropdown--open {
          opacity: 1;
          visibility: visible;
          pointer-events: all;
          transform: translateX(-50%) translateY(0);
        }

        /* Dropdown top gold line */
        .nb-dropdown::before {
          content: '';
          position: absolute; top: -1px; left: 10%; right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--g-primary), transparent);
          box-shadow: 0 0 8px var(--g-glow);
        }

        .nb-dropdown-inner { padding: 1.4rem 0 1rem; }

        .nb-drop-label {
          display: flex; align-items: center; gap: 0.6rem;
          font-size: 0.5rem; font-weight: 600;
          letter-spacing: 0.45em; color: rgba(255,255,255,0.3);
          padding: 0 1.4rem 1rem;
        }
        .nb-drop-label-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.2));
        }
        .nb-drop-label-line--r {
          background: linear-gradient(90deg, rgba(201,168,76,0.2), transparent);
        }

        .nb-drop-list { list-style: none; padding: 0; margin: 0; }

        .nb-drop-item {
          display: flex; align-items: center; gap: 0.8rem;
          padding: 0.65rem 1.4rem;
          text-decoration: none;
          color: rgba(255,255,255,0.6);
          font-size: 0.78rem;
          letter-spacing: 0.06em;
          font-weight: 400;
          transition: background 0.25s, color 0.25s, padding-left 0.25s;
          position: relative;
        }
        .nb-drop-item:hover {
          color: #ffffff;
          background: rgba(201,168,76,0.06);
          padding-left: 1.8rem;
        }
        .nb-drop-gem {
          font-size: 0.35rem;
          color: var(--g-primary);
          opacity: 0.5;
          flex-shrink: 0;
          transition: opacity 0.25s;
        }
        .nb-drop-item:hover .nb-drop-gem { opacity: 1; }
        .nb-drop-name { flex: 1; }
        .nb-drop-arrow {
          font-size: 0.7rem;
          color: var(--g-primary);
          opacity: 0;
          transform: translateX(-4px);
          transition: opacity 0.25s, transform 0.25s;
        }
        .nb-drop-item:hover .nb-drop-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* ── CTA Button ── */
        .nb-cta {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.55rem 1.5rem;
          border: 1px solid var(--g-primary);
          background: transparent;
          text-decoration: none;
          overflow: hidden;
          flex-shrink: 0;
          transition: box-shadow 0.3s;
        }
        .nb-cta:hover {
          box-shadow: 0 0 20px var(--g-glow-sm), inset 0 0 20px rgba(201,168,76,0.05);
        }
        .nb-cta-text {
          position: relative; z-index: 1;
          font-size: 0.62rem; font-weight: 600;
          letter-spacing: 0.35em; text-transform: uppercase;
          color: var(--g-light);
          transition: color 0.3s;
        }
        .nb-cta:hover .nb-cta-text { color: var(--g-pale); }
        .nb-cta-shine {
          position: absolute; top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.12), transparent);
          transform: skewX(-20deg);
          transition: left 0.5s ease;
        }
        .nb-cta:hover .nb-cta-shine { left: 150%; }

        /* ── Hamburger ── */
        .nb-ham {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          flex-shrink: 0;
        }
        .nb-ham-line {
          display: block;
          height: 1.5px;
          background: rgba(255,255,255,0.8);
          transition: transform 0.35s ease, opacity 0.35s ease, width 0.35s ease, background 0.3s;
        }
        .nb-ham-line:nth-child(1) { width: 24px; }
        .nb-ham-line:nth-child(2) { width: 16px; }
        .nb-ham-line:nth-child(3) { width: 20px; }

        .nb-ham--open .nb-ham-line { background: var(--g-primary); }
        .nb-ham--open .nb-ham-line:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg); width: 22px;
        }
        .nb-ham--open .nb-ham-line:nth-child(2) { opacity: 0; width: 0; }
        .nb-ham--open .nb-ham-line:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg); width: 22px;
        }

        /* ── Mobile Menu ── */
        .nb-mobile {
          display: none;
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.45s cubic-bezier(0.16,1,0.3,1);
          background: rgba(8,6,4,0.97);
          border-top: 1px solid rgba(201,168,76,0.1);
          backdrop-filter: blur(20px);
        }
        .nb-mobile--open { max-height: 600px; }

        .nb-mobile-inner {
          padding: 1.5rem 2rem 2rem;
          display: flex; flex-direction: column; gap: 0.2rem;
        }

        .nb-mob-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.9rem 0;
          border-bottom: 1px solid rgba(201,168,76,0.07);
          font-size: 0.8rem; font-weight: 500;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(255,255,255,0.65);
          text-decoration: none; background: none; border-left: none;
          border-right: none; border-top: none; cursor: pointer;
          font-family: 'Montserrat', sans-serif;
          width: 100%;
          transition: color 0.25s, padding-left 0.25s;
        }
        .nb-mob-link:hover { color: #fff; padding-left: 0.4rem; }
        .nb-mob-link--active { color: var(--g-light); }
        .nb-mob-link--toggle { border-bottom-color: rgba(201,168,76,0.07); }

        .nb-mob-chevron {
          font-size: 1rem; color: var(--g-primary);
          transform: rotate(-90deg);
          transition: transform 0.3s; display: inline-block;
        }
        .nb-mob-chevron--open { transform: rotate(90deg); }

        .nb-mob-drop {
          display: flex; flex-direction: column;
          padding: 0.5rem 0 0.5rem 1rem;
          border-left: 1px solid rgba(201,168,76,0.2);
          margin-left: 0.4rem;
          gap: 0;
        }
        .nb-mob-drop-item {
          display: flex; align-items: center; gap: 0.6rem;
          padding: 0.65rem 0.5rem;
          font-size: 0.75rem; letter-spacing: 0.1em;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: color 0.25s, padding-left 0.25s;
          border-bottom: 1px solid rgba(255,255,255,0.03);
        }
        .nb-mob-drop-item:hover { color: var(--g-light); padding-left: 0.8rem; }
        .nb-mob-gem {
          font-size: 0.3rem; color: var(--g-primary); opacity: 0.6;
        }

        .nb-mob-service-wrap { display: flex; flex-direction: column; }

        .nb-mob-cta {
          display: flex; align-items: center; justify-content: center;
          margin-top: 1.2rem; padding: 0.85rem;
          border: 1px solid rgba(201,168,76,0.4);
          background: rgba(201,168,76,0.06);
          color: var(--g-light); text-decoration: none;
          font-size: 0.7rem; font-weight: 600;
          letter-spacing: 0.35em; text-transform: uppercase;
          transition: background 0.3s, border-color 0.3s;
        }
        .nb-mob-cta:hover {
          background: rgba(201,168,76,0.12);
          border-color: var(--g-primary);
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .nb-inner { padding: 0 2rem; }
          .nb-links { gap: 0; }
          .nb-link { padding: 0.55rem 0.75rem; font-size: 0.68rem; }
        }

        @media (max-width: 768px) {
          .nb-links, .nb-cta { display: none; }
          .nb-ham, .nb-mobile { display: flex; }
          .nb-mobile { display: block; }
          .nb-inner { padding: 0 1.5rem; }
        }
      `}</style>
    </>
  );
};

export default Navbar;