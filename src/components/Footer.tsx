import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaWhatsapp, FaHeart } from 'react-icons/fa';
import { SiThreads } from 'react-icons/si';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'instant' });

  const quickLinks = [
    { label: 'Home',       path: '/' },
    { label: 'About Us',   path: '/about' },
    { label: 'Gallery',    path: '/gallery' },
    // { label: 'Services',   path: '/services' },
    { label: 'Promotions', path: '/promotion' },
    { label: 'Contact',    path: '/contact' },
  ];

  const services = [
    { label: 'Wedding Photography',  path: '/weddingservice' },
    { label: 'Pre-Wedding Shoots',   path: '/prewedding' },
    { label: 'Engagement Shoots',    path: '/engagement' },
    { label: 'Maternity Shoots',     path: '/maternity' },
    { label: 'Baby Shoots',          path: '/babyshower' },
    { label: 'Modelling Shoots',     path: '/modeling' },
  ];

  const socials = [
    { id: 'ig',  icon: <FaInstagram size={15} />,  href: 'https://www.instagram.com/eagle_view_photogrphy?igsh=dTB6eHFlYzBmcnox', hoverBg: '#e4405f' },
    { id: 'th',  icon: <SiThreads size={15} />,    href: 'https://www.threads.com/@eagle_view_photogrphy',                         hoverBg: '#000000' },
    { id: 'yt',  icon: <FaYoutube size={15} />,    href: 'https://youtube.com/@eagle_view_photography?si=oQN8q3hP3jw3TGX_',        hoverBg: '#ff0000' },
    { id: 'wa',  icon: <FaWhatsapp size={15} />,   href: 'https://wa.me/917395864345',                                             hoverBg: '#25d366' },
  ];

  return (
    <footer className="ft-root">

      {/* ── Top decorative bar ── */}
      <div className="ft-top-bar">
        <span className="ft-bar-line" />
        <span className="ft-bar-diamond" />
        <span className="ft-bar-line ft-bar-line--rev" />
      </div>

      {/* ── Brand statement banner ── */}
      <div className="ft-banner">
        <h2 className="ft-banner-title">Eagle-View Pictures</h2>
        <p className="ft-banner-tagline">True Emotions &nbsp;·&nbsp; True Moments &nbsp;·&nbsp; True Love Stories</p>
      </div>

      {/* ── Main grid ── */}
      <div className="ft-main">

        {/* Col 1 – About */}
        <div className="ft-col ft-col--about">
          <h3 className="ft-col-heading">About Us</h3>
          <div className="ft-col-rule" />
          <p className="ft-about-text">
            Capturing your precious moments with artistry and passion.
            Wedding photography that tells your unique love story — frame by beautiful frame.
          </p>
          <div className="ft-socials">
            {socials.map((s) => (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ft-social-btn"
                style={{
                  background: hoveredSocial === s.id ? s.hoverBg : 'transparent',
                  borderColor: hoveredSocial === s.id ? s.hoverBg : 'rgba(201,168,76,0.2)',
                }}
                onMouseEnter={() => setHoveredSocial(s.id)}
                onMouseLeave={() => setHoveredSocial(null)}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Col 2 – Quick Links */}
        <div className="ft-col">
          <h3 className="ft-col-heading">Quick Links</h3>
          <div className="ft-col-rule" />
          <ul className="ft-list">
            {quickLinks.map((item) => (
              <li key={item.label} className="ft-list-item">
                <Link to={item.path} className="ft-link" onClick={scrollToTop}>
                  <span className="ft-link-arrow">→</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 – Services */}
        <div className="ft-col">
          <h3 className="ft-col-heading">Our Services</h3>
          <div className="ft-col-rule" />
          <ul className="ft-list">
            {services.map((item) => (
              <li key={item.label} className="ft-list-item">
                <Link to={item.path} className="ft-link" onClick={scrollToTop}>
                  <span className="ft-link-arrow">→</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 – Contact */}
        <div className="ft-col">
          <h3 className="ft-col-heading">Get In Touch</h3>
          <div className="ft-col-rule" />
          <ul className="ft-contact-list">
            <li className="ft-contact-item">
              <span className="ft-contact-icon">📍</span>
              <span>
                No-7, 2/243, Madurai–Rameshwaram Main Road,
                Paramakudi (623707), Ramanathapuram
              </span>
            </li>
            <li className="ft-contact-item">
              <span className="ft-contact-icon">📞</span>
              <a href="tel:+917395864345" className="ft-contact-link">+91 73958 64345</a>
            </li>
            <li className="ft-contact-item">
              <span className="ft-contact-icon">✉️</span>
              <a href="mailto:Eagleview@gmail.com" className="ft-contact-link">photographydreams56@gmail.com</a>
            </li>
          </ul>

          {/* Availability badge */}
          {/* <div className="ft-badge">
            <span className="ft-badge-dot" />
            Available for Bookings 2025–26
          </div> */}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="ft-divider-wrap">
        <div className="ft-divider" />
      </div>

      {/* ── Bottom bar ── */}
      <div className="ft-bottom">
        <p className="ft-copy">© {currentYear} Eagle-View Photography. All rights reserved.</p>

        <div className="ft-bottom-links">
          {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase().replace(/ /g, '-')}`}
              className="ft-bottom-link"
            >
              {item}
            </Link>
          ))}
        </div>

        <p className="ft-made">
          Made with&nbsp;<FaHeart size={11} className="ft-heart" />&nbsp;for love stories
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Great+Vibes&family=Montserrat:wght@300;400;600&display=swap');

        :root {
          --g-primary: #C9A84C;
          --g-light:   #E8C96A;
          --g-pale:    #F5DFA0;
          --g-deep:    #9A7228;
          --g-glow:    rgba(201,168,76,0.6);
          --g-glow-sm: rgba(201,168,76,0.3);
          --g-border:  rgba(201,168,76,0.18);
          --g-faint:   rgba(201,168,76,0.06);
          --bg:        #080604;
          --bg-card:   #0c0a06;
        }

        .ft-root {
          background: var(--bg);
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          border-top: 1px solid rgba(201,168,76,0.12);
        }

        /* ── Top bar ── */
        .ft-top-bar {
          display: flex; align-items: center;
          justify-content: center; gap: 1rem;
          padding: 0; height: 2px;
        }
        .ft-bar-line {
          flex: 1; max-width: 300px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--g-primary));
        }
        .ft-bar-line--rev {
          background: linear-gradient(90deg, var(--g-primary), transparent);
        }
        .ft-bar-diamond {
          width: 8px; height: 8px;
          background: var(--g-primary); transform: rotate(45deg);
          box-shadow: 0 0 12px var(--g-glow), 0 0 24px var(--g-glow);
          flex-shrink: 0;
        }

        /* ── Banner ── */
        .ft-banner {
          text-align: center;
          padding: 3.5rem 1.5rem 2.5rem;
          border-bottom: 1px solid rgba(201,168,76,0.08);
        }
        .ft-banner-title {
          font-family: 'Great Vibes', cursive;
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 400; color: #ffffff;
          margin-bottom: 0.6rem; line-height: 1.1;
        }
        .ft-banner-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.85rem, 1.5vw, 1rem);
          font-style: italic; font-weight: 300;
          color: rgba(255,255,255,0.38);
          letter-spacing: 0.1em;
        }

        /* ── Main grid ── */
        .ft-main {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
          gap: 3rem; max-width: 1300px;
          margin: 0 auto; padding: 4rem 3rem;
        }

        /* Column headings */
        .ft-col-heading {
          font-size: 0.65rem; font-weight: 600;
          letter-spacing: 0.4em; color: #ffffff;
          margin-bottom: 0.8rem; text-transform: uppercase;
        }
        .ft-col-rule {
          width: 28px; height: 1px;
          background: var(--g-primary);
          margin-bottom: 1.5rem;
          box-shadow: 0 0 8px var(--g-glow-sm);
        }

        /* About text */
        .ft-about-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem; line-height: 1.85;
          color: rgba(255,255,255,0.5);
          font-weight: 300; margin-bottom: 1.8rem;
        }

        /* Socials */
        .ft-socials { display: flex; gap: 0.7rem; flex-wrap: wrap; }
        .ft-social-btn {
          width: 36px; height: 36px; border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.2);
          display: flex; align-items: center; justify-content: center;
          color: #fff; text-decoration: none;
          transition: background 0.3s, border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .ft-social-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.4);
        }

        /* Links list */
        .ft-list {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 0.55rem;
        }
        .ft-link {
          display: flex; align-items: center; gap: 0.55rem;
          color: rgba(255,255,255,0.45);
          text-decoration: none; font-size: 0.82rem;
          letter-spacing: 0.02em;
          transition: color 0.3s, gap 0.3s;
        }
        .ft-link:hover { color: #ffffff; gap: 0.85rem; }
        .ft-link-arrow {
          color: var(--g-primary); font-size: 0.75rem;
          transition: transform 0.3s; flex-shrink: 0;
        }
        .ft-link:hover .ft-link-arrow { transform: translateX(3px); }

        /* Contact list */
        .ft-contact-list {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 1rem;
        }
        .ft-contact-item {
          display: flex; align-items: flex-start; gap: 0.75rem;
          font-size: 0.82rem;
          color: rgba(255,255,255,0.45);
          line-height: 1.6;
        }
        .ft-contact-icon { flex-shrink: 0; margin-top: 1px; font-size: 0.9rem; }
        .ft-contact-link {
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          transition: color 0.3s;
        }
        .ft-contact-link:hover { color: var(--g-light); }

        /* Badge */
        .ft-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          margin-top: 1.5rem; padding: 0.4rem 0.9rem;
          border: 1px solid rgba(201,168,76,0.18);
          font-size: 0.65rem; letter-spacing: 0.12em;
          color: rgba(255,255,255,0.35);
          background: rgba(201,168,76,0.04);
        }
        .ft-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--g-primary);
          animation: pulse 2s ease infinite;
          flex-shrink: 0;
        }
        @keyframes pulse {
          0%,100% { box-shadow: 0 0 0 0 var(--g-glow-sm); }
          50%      { box-shadow: 0 0 0 5px rgba(201,168,76,0); }
        }

        /* ── Divider ── */
        .ft-divider-wrap { padding: 0 3rem; max-width: 1300px; margin: 0 auto; }
        .ft-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.15) 20%, rgba(201,168,76,0.15) 80%, transparent);
        }

        /* ── Bottom bar ── */
        .ft-bottom {
          display: flex; flex-wrap: wrap;
          align-items: center; justify-content: space-between;
          gap: 1rem; max-width: 1300px;
          margin: 0 auto; padding: 1.8rem 3rem 2.5rem;
        }
        .ft-copy {
          font-size: 0.72rem; letter-spacing: 0.05em;
          color: rgba(255,255,255,0.25);
        }
        .ft-bottom-links { display: flex; gap: 2rem; flex-wrap: wrap; }
        .ft-bottom-link {
          font-size: 0.72rem; letter-spacing: 0.05em;
          color: rgba(255,255,255,0.25); text-decoration: none;
          transition: color 0.3s;
        }
        .ft-bottom-link:hover { color: var(--g-light); }

        .ft-made {
          font-size: 0.72rem; color: rgba(255,255,255,0.25);
          display: flex; align-items: center; gap: 0.1rem;
        }
        .ft-heart {
          color: #ff3366;
          animation: heartbeat 1.4s ease infinite;
          display: inline-block;
        }
        @keyframes heartbeat {
          0%,100% { transform: scale(1); }
          14%      { transform: scale(1.25); }
          28%      { transform: scale(1); }
          42%      { transform: scale(1.15); }
          70%      { transform: scale(1); }
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .ft-main {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem; padding: 3rem 2rem;
          }
          .ft-col--about { grid-column: span 2; }
          .ft-divider-wrap { padding: 0 2rem; }
          .ft-bottom { padding: 1.5rem 2rem 2rem; }
        }
        @media (max-width: 640px) {
          .ft-main {
            grid-template-columns: 1fr;
            gap: 2rem; padding: 2.5rem 1.5rem;
          }
          .ft-col--about { grid-column: span 1; }
          .ft-banner { padding: 2.5rem 1.5rem 2rem; }
          .ft-bottom {
            flex-direction: column; align-items: flex-start;
            padding: 1.5rem; gap: 0.8rem;
          }
          .ft-bottom-links { gap: 1.2rem; }
          .ft-divider-wrap { padding: 0 1.5rem; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
