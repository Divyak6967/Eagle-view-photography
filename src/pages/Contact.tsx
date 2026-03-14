import React, { useState, useEffect, useRef } from 'react';
import { FaInstagram, FaWhatsapp, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { SiThreads } from 'react-icons/si';

const SERVICES = ['Wedding', 'Engagement', 'Pre-Wedding', 'Maternity', 'Baby Shoot', 'Modelling'];

const ContactPage = () => {
  const [ready,       setReady]       = useState(false);
  const [service,     setService]     = useState('');
  const [focused,     setFocused]     = useState<string | null>(null);
  const [sent,        setSent]        = useState(false);
  const [sending,     setSending]     = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', message: '' });
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => { const t = setTimeout(() => setReady(true), 80); return () => clearTimeout(t); }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setFormVisible(true); }, { threshold: 0.06 });
    if (formRef.current) obs.observe(formRef.current);
    return () => obs.disconnect();
  }, []);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    const wa = `https://wa.me/917395864345?text=${encodeURIComponent(
      `✨ *New Booking Enquiry — Eagle View*\n\n` +
      `👤 *Name:* ${form.name}\n` +
      `📱 *Phone:* ${form.phone}\n` +
      `📧 *Email:* ${form.email}\n` +
      `🎯 *Service:* ${service || 'Not specified'}\n` +
      `📅 *Event Date:* ${form.date || 'Not specified'}\n` +
      `💬 *Message:* ${form.message}\n\n` +
      `Sent via Eagle View Contact Form`
    )}`;

    const mail = `mailto:info@eagleviewpictures.com?subject=${encodeURIComponent(
      `Booking Enquiry – ${service || 'Photography'} – ${form.name}`
    )}&body=${encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nService: ${service}\nEvent Date: ${form.date}\n\nMessage:\n${form.message}`
    )}`;

    setTimeout(() => {
      setSending(false);
      setSent(true);
      window.open(wa, '_blank');
      setTimeout(() => { window.location.href = mail; }, 800);
    }, 1400);
  };

  const filled  = (k: string) => !!form[k as keyof typeof form];
  const isReady = !!(form.name && form.phone && form.email);

  return (
    <div className={`cp ${ready ? 'cp--in' : ''}`}>

      {/* ── Top page header ── */}
      <div className={`cp-header ${ready ? 'cp-header--in' : ''}`}>
        <div className="cp-header-inner">
          <p className="cp-header-eye">
            <span className="cp-eye-dot" />
            Eagle View Pictures
          </p>
          <h1 className="cp-header-h1">
            Let's Create<br />
            <em>Something Beautiful</em>
          </h1>
          <p className="cp-header-sub">
            Fill the form below — we'll reach out via WhatsApp &amp; Email within a few hours.
          </p>

          {/* Quick-tap contact row */}
          <div className="cp-quick">
            <a href="https://wa.me/917395864345" target="_blank" rel="noreferrer" className="cp-quick-btn cp-quick-wa">
              <FaWhatsapp />
              <span>WhatsApp Us</span>
            </a>
            <a href="tel:+917395864345" className="cp-quick-btn">
              <FaPhone />
              <span>+91 73958 64345</span>
            </a>
            {/* <a href="mailto:info@eagleviewpictures.com" className="cp-quick-btn">
              <FaEnvelope />
              <span>Email Us</span>
            </a> */}
          </div>
        </div>

        {/* Decorative horizontal rule */}
        <div className="cp-header-rule">
          <span className="cp-hr-line" />
          <span className="cp-hr-gem">✦</span>
          <span className="cp-hr-line" />
        </div>
      </div>

      {/* ── Main body ── */}
      <div
        className={`cp-body ${formVisible ? 'cp-body--in' : ''}`}
        ref={formRef}
      >

        {/* ════ FORM PANEL ════ */}
        <div className="cp-form-panel">

          {sent ? (
            <div className="cp-success">
              <div className="cp-success-icon">
                <span className="cp-success-gem">✦</span>
              </div>
              <h2 className="cp-success-h">Message Sent!</h2>
              <div className="cp-success-divider" />
              <p className="cp-success-p">
                WhatsApp &amp; your email app have been opened with your details.<br />
                We'll confirm your booking shortly.
              </p>
              <div className="cp-success-btns">
                <a href="https://wa.me/917395864345" target="_blank" rel="noreferrer" className="cp-wa-btn">
                  <FaWhatsapp />
                  <span>Continue on WhatsApp</span>
                </a>
                <button
                  className="cp-again-btn"
                  onClick={() => { setSent(false); setForm({ name:'', email:'', phone:'', date:'', message:'' }); setService(''); }}
                >
                  Send Another
                </button>
              </div>
            </div>
          ) : (
            <form className="cp-form" onSubmit={handleSubmit} noValidate>

              {/* Form heading */}
              <div className="cp-form-hd">
                <div className="cp-tag">
                  <span className="cp-tag-l" /><span className="cp-tag-t">BOOK A SESSION</span>
                </div>
                <h2 className="cp-form-title">Tell us about<br /><em>your special day</em></h2>
                <p className="cp-form-sub">
                  Fields marked <span className="cp-asterisk">*</span> are required.
                </p>
              </div>

              {/* Service picker */}
              <div className="cp-svc">
                <p className="cp-svc-label">What are you looking for?</p>
                <div className="cp-svc-grid">
                  {SERVICES.map((s, i) => (
                    <button
                      key={s} type="button"
                      className={`cp-svc-btn ${service === s ? 'cp-svc-btn--on' : ''}`}
                      style={{ animationDelay: `${i * 0.05}s` }}
                      onClick={() => setService(s)}
                    >
                      {service === s && <span className="cp-svc-dot" />}
                      <span>{s}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Fields */}
              <div className="cp-fields">

                {/* Row 1 */}
                <div className="cp-row">
                  <Field id="name"  label="Your Name *"       type="text"  ph="e.g. Arjun & Priya"
                    val={form.name}  focused={focused} set={set} setFocused={setFocused} filled={filled} />
                  <Field id="phone" label="WhatsApp Number *" type="tel"   ph="+91 XXXXX XXXXX"
                    val={form.phone} focused={focused} set={set} setFocused={setFocused} filled={filled} />
                </div>

                {/* Row 2 */}
                <div className="cp-row">
                  <Field id="email" label="Email Address *" type="email" ph="your@email.com"
                    val={form.email} focused={focused} set={set} setFocused={setFocused} filled={filled} />
                  <Field id="date"  label="Event Date"      type="text"  ph="DD / MM / YYYY"
                    val={form.date}  focused={focused} set={set} setFocused={setFocused} filled={filled} />
                </div>

                {/* Message */}
                <div className={`cp-field cp-field--full ${focused==='message'?'cp-field--on':''} ${filled('message')?'cp-field--has':''}`}>
                  <label className="cp-lbl">Your Message</label>
                  <div className="cp-inp-w">
                    <textarea
                      rows={5}
                      placeholder="Tell us about your event, location, style, and any special moments you'd like captured..."
                      className="cp-inp cp-inp--ta"
                      value={form.message}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      onChange={set('message')}
                    />
                    <span className="cp-bar" />
                  </div>
                </div>

              </div>

              {/* Submit */}
              <div className="cp-submit-area">
                <button
                  type="submit"
                  disabled={!isReady || sending}
                  className={`cp-submit ${isReady ? 'cp-submit--on' : ''} ${sending ? 'cp-submit--sending' : ''}`}
                >
                  {sending ? (
                    <span className="cp-submit-inner">
                      <span className="cp-spinner" />
                      <span>Sending…</span>
                    </span>
                  ) : (
                    <span className="cp-submit-inner">
                      <FaWhatsapp className="cp-wa-ico" />
                      <span>Send via WhatsApp</span>
                      <svg width="20" height="9" viewBox="0 0 20 9" fill="none" className="cp-arr">
                        <path d="M0 4.5H18M14.5 1L18 4.5L14.5 8" stroke="currentColor" strokeWidth="1.1"/>
                      </svg>
                    </span>
                  )}
                  <span className="cp-shine" />
                </button>
                <p className="cp-note">
                  Clicking Send opens WhatsApp &amp; your email app with your message pre-filled — nothing is stored.
                </p>
              </div>

            </form>
          )}
        </div>

        {/* ════ INFO PANEL ════ */}
        <div className="cp-info-panel">

          {/* Studio photo */}
          <div className="cp-studio-photo">
            <img src="/Images/Backgrounds/background.jpg" alt="Eagle View Studio" />
            <div className="cp-studio-overlay" />
            <div className="cp-studio-caption">
              <span className="cp-studio-name">Eagle View Studio</span>
              <span className="cp-studio-loc">Paramakudi, Ramanathapuram</span>
            </div>
            {/* Gold frame corners */}
            <span className="cp-fc cp-fc--tl" /><span className="cp-fc cp-fc--tr" />
            <span className="cp-fc cp-fc--bl" /><span className="cp-fc cp-fc--br" />
          </div>

          {/* Badge */}
          <div className="cp-badges">
            {[['800+','Weddings'],['10+','Years'],['2k+','Memories']].map(([n, l]) => (
              <div key={l} className="cp-badge">
                <span className="cp-badge-n">{n}</span>
                <span className="cp-badge-l">{l}</span>
              </div>
            ))}
          </div>

          {/* Contact details */}
          <div className="cp-contacts">
            {[
              { I: FaMapMarkerAlt, v:'No.7, GS Land Promotors Building, 3rd Floor, Paramakudi, Ramanathapuram — 623707', h:'https://www.google.com/maps/search/?api=1&query=No+7+GS+Land+Promotors+Building+3rd+Floor+Paramakudi+Ramanathapuram+623707+Tamil+Nadu' },
              { I: FaPhone,        v:'+91 73958 64345',                   h:'tel:+917395864345' },
              { I: FaEnvelope,     v:'photographydreams56@gmail.com',         h:'mailto:photographydreams56@gmail.com' },
            ].map(({ I, v, h }, i) => (
              <a key={i} href={h} target="_blank" rel="noreferrer" className="cp-contact-row">
                <div className="cp-contact-icon"><I /></div>
                <span className="cp-contact-val">{v}</span>
              </a>
            ))}
          </div>

          {/* Hours */}
          <div className="cp-hours">
            <p className="cp-hours-title">Studio Hours</p>
            {[['Mon — Fri','9:00 AM – 7:00 PM',false],['Saturday','9:00 AM – 5:00 PM',false],['Sunday','By Appointment',true]].map(([d,t,g],i) => (
              <div key={i} className="cp-hour-row">
                <span className="cp-hour-d">{d}</span>
                <span className="cp-hour-dots" />
                <span className={`cp-hour-t ${g ? 'cp-hour-t--g' : ''}`}>{t}</span>
              </div>
            ))}
          </div>

          {/* Socials */}
          <div className="cp-socials">
            <p className="cp-socials-label">Follow Us</p>
            <div className="cp-soc-row">
              {[
                { I:FaInstagram, h:'https://www.instagram.com/eagle_view_photogrphy?igsh=dTB6eHFlYzBmcnox', c:'ig', l:'Instagram' },
                { I:SiThreads,   h:'https://www.threads.com/@eagle_view_photogrphy',                        c:'th', l:'Threads' },
                { I:FaYoutube,   h:'https://youtube.com/@eagle_view_photography?si=oQN8q3hP3jw3TGX_',       c:'yt', l:'YouTube' },
                { I:FaWhatsapp,  h:'https://wa.me/917395864345',                                            c:'wa', l:'WhatsApp' },
              ].map(({ I, h, c, l }) => (
                <a key={c} href={h} target="_blank" rel="noreferrer" className={`cp-soc cp-soc--${c}`} aria-label={l}>
                  <I />
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Footer rule ── */}
      <div className="cp-foot">
        <span className="cp-foot-line" />
        <span className="cp-foot-gem">✦</span>
        <span className="cp-foot-text">Every great story begins with a conversation</span>
        <span className="cp-foot-gem">✦</span>
        <span className="cp-foot-line" />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,200;0,300;0,400;0,600;1,200;1,300;1,400&family=Montserrat:wght@200;300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --gp: #C9A84C;
          --gl: #E8C96A;
          --gd: #9A7228;
          --gg:  rgba(201,168,76,0.5);
          --ggs: rgba(201,168,76,0.2);
          --gb:  rgba(201,168,76,0.2);
          --bg:  #070503;
          --bg2: #0b0806;
          --bg3: #0f0c07;
          --ease: cubic-bezier(0.16,1,0.3,1);
        }

        .cp {
          background: var(--bg);
          min-height: 100vh;
          font-family: 'Montserrat', sans-serif;
          color: #fff;
          overflow-x: hidden;
          opacity: 0;
          transition: opacity 0.7s ease;
        }
        .cp--in { opacity: 1; }

        /* ══════════════════════════════════════
           PAGE HEADER
        ══════════════════════════════════════ */
        .cp-header {
          padding: 5rem 5rem 0;
          max-width: 1320px;
          margin: 0 auto;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .cp-header--in { opacity: 1; transform: none; }

        .cp-header-inner {
          display: flex;
          flex-direction: column;
          gap: 1.6rem;
          max-width: 700px;
          margin-bottom: 3.5rem;
        }

        .cp-header-eye {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          font-size: 0.5rem;
          letter-spacing: 0.55em;
          color: var(--gp);
          font-weight: 600;
        }
        .cp-eye-dot {
          display: block;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--gp);
          flex-shrink: 0;
          animation: glow-pulse 2.2s ease infinite;
        }
        @keyframes glow-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(201,168,76,0.5); }
          50%      { box-shadow: 0 0 0 7px rgba(201,168,76,0); }
        }

        .cp-header-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 5vw, 4.5rem);
          font-weight: 200;
          line-height: 1.12;
          color: #fff;
          letter-spacing: 0.01em;
        }
        .cp-header-h1 em {
          font-style: italic;
          font-weight: 300;
          color: var(--gl);
        }

        .cp-header-sub {
          font-size: 0.84rem;
          font-weight: 300;
          color: rgba(255,255,255,0.45);
          line-height: 1.8;
          letter-spacing: 0.025em;
          max-width: 500px;
        }

        /* Quick buttons */
        .cp-quick {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          flex-wrap: wrap;
          margin-top: 0.4rem;
        }
        .cp-quick-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.65rem 1.4rem;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.03);
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          font-weight: 400;
          transition: all 0.3s ease;
        }
        .cp-quick-btn:hover {
          border-color: var(--gb);
          color: #fff;
          background: rgba(201,168,76,0.06);
          transform: translateY(-2px);
        }
        .cp-quick-wa {
          border-color: rgba(37,211,102,0.3);
          color: #25d366;
          background: rgba(37,211,102,0.04);
        }
        .cp-quick-wa:hover {
          border-color: #25d366;
          background: rgba(37,211,102,0.1);
          color: #25d366;
        }

        /* Horizontal rule with gem */
        .cp-header-rule {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          margin-bottom: 4rem;
        }
        .cp-hr-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(201,168,76,0.15), transparent);
        }
        .cp-hr-line:last-child {
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.15));
        }
        .cp-hr-gem {
          font-size: 0.38rem;
          color: rgba(201,168,76,0.4);
          flex-shrink: 0;
        }

        /* ══════════════════════════════════════
           MAIN BODY
        ══════════════════════════════════════ */
        .cp-body {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 5rem 6rem;
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 5rem;
          align-items: start;
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 0.9s ease 0.1s, transform 0.9s var(--ease) 0.1s;
        }
        .cp-body--in { opacity: 1; transform: none; }

        /* ══════════════════════════════════════
           FORM PANEL
        ══════════════════════════════════════ */
        .cp-form {
          display: flex;
          flex-direction: column;
          gap: 3.5rem;
        }

        .cp-form-hd { display: flex; flex-direction: column; gap: 1rem; }
        .cp-tag { display: flex; align-items: center; gap: 0.8rem; }
        .cp-tag-l { display: block; width: 20px; height: 1px; background: var(--gp); flex-shrink: 0; }
        .cp-tag-t { font-size: 0.44rem; letter-spacing: 0.55em; color: var(--gp); font-weight: 600; }

        .cp-form-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3vw, 2.8rem);
          font-weight: 300;
          line-height: 1.15;
          color: #fff;
        }
        .cp-form-title em { font-style: italic; color: var(--gl); }
        .cp-form-sub {
          font-size: 0.68rem;
          color: rgba(255,255,255,0.28);
          font-weight: 300;
        }
        .cp-asterisk { color: var(--gp); }

        /* Service grid */
        .cp-svc { display: flex; flex-direction: column; gap: 1.2rem; }
        .cp-svc-label {
          font-size: 0.5rem;
          letter-spacing: 0.42em;
          color: rgba(255,255,255,0.4);
          font-weight: 500;
        }
        .cp-svc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.6rem;
        }
        .cp-svc-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.7rem 1rem;
          border: 1px solid rgba(255,255,255,0.09);
          background: rgba(255,255,255,0.02);
          color: rgba(255,255,255,0.45);
          cursor: pointer;
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          font-family: 'Montserrat', sans-serif;
          font-weight: 400;
          transition: all 0.25s ease;
          animation: fade-up 0.5s var(--ease) both;
        }
        .cp-svc-btn:hover {
          border-color: rgba(201,168,76,0.35);
          color: rgba(255,255,255,0.8);
          background: rgba(201,168,76,0.05);
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
        }
        .cp-svc-btn--on {
          border-color: var(--gp);
          color: var(--gp);
          background: rgba(201,168,76,0.08);
          box-shadow: 0 0 20px rgba(201,168,76,0.12), 0 4px 16px rgba(0,0,0,0.3);
        }
        .cp-svc-dot {
          display: block;
          width: 4px; height: 4px;
          border-radius: 50%;
          background: var(--gp);
          flex-shrink: 0;
          animation: glow-pulse 2s ease infinite;
        }
        @keyframes fade-up { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:none; } }

        /* Fields */
        .cp-fields { display: flex; flex-direction: column; gap: 2.2rem; }
        .cp-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem 3rem;
        }

        .cp-field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          position: relative;
        }
        .cp-field--full { grid-column: 1/-1; }

        .cp-lbl {
          font-size: 0.46rem;
          letter-spacing: 0.48em;
          color: rgba(255,255,255,0.3);
          font-weight: 600;
          text-transform: uppercase;
          transition: color 0.3s ease;
        }
        .cp-field--on .cp-lbl,
        .cp-field--has .cp-lbl { color: var(--gp); }

        .cp-inp-w { position: relative; }
        .cp-inp {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding: 0.8rem 0;
          color: rgba(255,255,255,0.88);
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem;
          font-weight: 300;
          font-style: italic;
          outline: none;
          resize: none;
          caret-color: var(--gp);
          transition: border-color 0.3s ease;
        }
        .cp-inp::placeholder { color: rgba(255,255,255,0.12); font-style: italic; }
        .cp-field--on  .cp-inp { border-bottom-color: rgba(201,168,76,0.25); }
        .cp-field--has .cp-inp { border-bottom-color: rgba(201,168,76,0.18); }
        .cp-inp--ta { min-height: 110px; line-height: 1.8; font-size: 1.05rem; }

        .cp-bar {
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1.5px;
          background: linear-gradient(90deg, var(--gp), var(--gl));
          box-shadow: 0 0 8px var(--ggs);
          transition: width 0.5s var(--ease);
        }
        .cp-field--on .cp-bar { width: 100%; }

        /* Submit area */
        .cp-submit-area {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          align-items: flex-start;
        }
        .cp-submit {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.02);
          cursor: not-allowed;
          color: rgba(255,255,255,0.25);
          font-family: 'Montserrat', sans-serif;
          font-size: 0.68rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          font-weight: 500;
          transition: all 0.4s ease;
          padding: 0;
        }
        .cp-submit-inner {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.1rem 2.8rem;
          position: relative;
          z-index: 1;
        }
        .cp-submit--on {
          border-color: var(--gp);
          color: #fff;
          cursor: pointer;
          background: transparent;
          box-shadow: 0 4px 28px rgba(0,0,0,0.35);
        }
        .cp-submit--on:hover {
          box-shadow: 0 0 40px var(--ggs), 0 6px 30px rgba(0,0,0,0.4);
          transform: translateY(-2px);
        }
        .cp-submit--on:hover .cp-arr { transform: translateX(6px); }
        .cp-wa-ico { font-size: 1.1rem; color: #25d366; flex-shrink: 0; }
        .cp-arr { color: var(--gp); flex-shrink: 0; transition: transform 0.3s ease; }
        .cp-shine {
          position: absolute; inset: 0;
          background: linear-gradient(105deg, transparent 30%, rgba(201,168,76,0.08) 50%, transparent 70%);
          transform: translateX(-150%) skewX(-15deg);
          transition: transform 0.7s ease;
        }
        .cp-submit--on:hover .cp-shine { transform: translateX(200%) skewX(-15deg); }
        .cp-spinner {
          display: block;
          width: 16px; height: 16px;
          border-radius: 50%;
          border: 1.5px solid rgba(201,168,76,0.2);
          border-top-color: var(--gp);
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .cp-note {
          font-size: 0.6rem;
          color: rgba(255,255,255,0.22);
          line-height: 1.75;
          font-weight: 300;
          letter-spacing: 0.02em;
          max-width: 420px;
        }

        /* Success */
        .cp-success {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          animation: fade-up 0.7s ease;
        }
        .cp-success-icon {
          width: 60px; height: 60px;
          border: 1px solid rgba(201,168,76,0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cp-success-gem { font-size: 1.1rem; color: var(--gp); animation: glow-pulse 2s ease infinite; }
        .cp-success-h {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 200;
          color: #fff;
          line-height: 1;
        }
        .cp-success-divider {
          width: 50px; height: 1px;
          background: linear-gradient(90deg, var(--gp), transparent);
        }
        .cp-success-p {
          font-size: 0.88rem;
          color: rgba(255,255,255,0.45);
          line-height: 1.85;
          font-weight: 300;
          max-width: 400px;
        }
        .cp-success-btns {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .cp-wa-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.9rem 2rem;
          background: #25d366;
          color: #fff;
          text-decoration: none;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          font-weight: 600;
          transition: opacity 0.3s, transform 0.3s;
        }
        .cp-wa-btn:hover { opacity: 0.9; transform: translateY(-2px); }
        .cp-again-btn {
          background: transparent;
          border: 1px solid rgba(201,168,76,0.2);
          color: rgba(255,255,255,0.4);
          padding: 0.9rem 1.8rem;
          font-size: 0.58rem;
          letter-spacing: 0.3em;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
          transition: border-color 0.3s, color 0.3s;
        }
        .cp-again-btn:hover { border-color: var(--gp); color: var(--gp); }

        /* ══════════════════════════════════════
           INFO PANEL
        ══════════════════════════════════════ */
        .cp-info-panel {
          display: flex;
          flex-direction: column;
          gap: 0;
          position: sticky;
          top: 2rem;
          overflow: hidden;
          border: 1px solid rgba(201,168,76,0.1);
          background: var(--bg2);
          transition: box-shadow 0.4s ease, transform 0.4s ease;
        }
        .cp-info-panel:hover {
          box-shadow: 0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.14);
          transform: translateY(-3px);
        }

        /* Studio photo */
        .cp-studio-photo {
          position: relative;
          height: 230px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .cp-studio-photo img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: brightness(0.45) sepia(0.1);
          transition: transform 0.8s ease;
        }
        .cp-info-panel:hover .cp-studio-photo img { transform: scale(1.05); }
        .cp-studio-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(7,5,3,0.1) 0%, rgba(7,5,3,0.7) 100%);
        }
        .cp-studio-caption {
          position: absolute; bottom: 1.4rem; left: 1.6rem;
          display: flex; flex-direction: column; gap: 0.2rem;
        }
        .cp-studio-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem;
          font-weight: 300;
          font-style: italic;
          color: rgba(255,255,255,0.9);
        }
        .cp-studio-loc {
          font-size: 0.45rem;
          letter-spacing: 0.4em;
          color: var(--gp);
        }
        /* Gold corners */
        .cp-fc {
          position: absolute;
          width: 18px; height: 18px;
          border-style: solid;
          border-color: var(--gp);
          opacity: 0.55;
        }
        .cp-fc--tl { top:-1px; left:-1px;  border-width:1.5px 0 0 1.5px; }
        .cp-fc--tr { top:-1px; right:-1px; border-width:1.5px 1.5px 0 0; }
        .cp-fc--bl { bottom:-1px; left:-1px;  border-width:0 0 1.5px 1.5px; }
        .cp-fc--br { bottom:-1px; right:-1px; border-width:0 1.5px 1.5px 0; }

        /* Badges */
        .cp-badges {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-bottom: 1px solid rgba(201,168,76,0.07);
        }
        .cp-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.2rem 0.5rem;
          gap: 0.2rem;
          border-right: 1px solid rgba(201,168,76,0.07);
          transition: background 0.3s;
        }
        .cp-badge:last-child { border-right: none; }
        .cp-badge:hover { background: rgba(201,168,76,0.04); }
        .cp-badge-n {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          font-weight: 200;
          color: #fff;
          line-height: 1;
        }
        .cp-badge-l {
          font-size: 0.4rem;
          letter-spacing: 0.4em;
          color: rgba(255,255,255,0.3);
        }

        /* Contact rows */
        .cp-contacts {
          display: flex;
          flex-direction: column;
          gap: 0;
          padding: 0.5rem 0;
        }
        .cp-contact-row {
          display: flex;
          align-items: flex-start;
          gap: 0.9rem;
          padding: 1rem 1.6rem;
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.03);
          transition: background 0.25s, padding-left 0.25s;
          position: relative;
        }
        .cp-contact-row::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 2px;
          background: var(--gp);
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.3s ease;
        }
        .cp-contact-row:hover::before { transform: scaleY(1); transform-origin: top; }
        .cp-contact-row:hover {
          background: rgba(201,168,76,0.04);
          padding-left: 2rem;
        }
        .cp-contact-row:last-child { border-bottom: none; }
        .cp-contact-icon {
          width: 30px; height: 30px;
          border: 1px solid rgba(201,168,76,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          color: var(--gp);
          flex-shrink: 0;
          transition: background 0.3s;
        }
        .cp-contact-row:hover .cp-contact-icon { background: rgba(201,168,76,0.1); }
        .cp-contact-val {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.5);
          font-weight: 300;
          line-height: 1.6;
          padding-top: 0.3rem;
        }

        /* Hours */
        .cp-hours {
          padding: 1.5rem 1.6rem;
          border-top: 1px solid rgba(201,168,76,0.07);
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
        }
        .cp-hours-title {
          font-size: 0.42rem;
          letter-spacing: 0.5em;
          color: var(--gp);
          font-weight: 600;
          margin-bottom: 0.3rem;
        }
        .cp-hour-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.73rem;
          font-weight: 300;
        }
        .cp-hour-d { color: rgba(255,255,255,0.5); white-space: nowrap; }
        .cp-hour-dots { flex: 1; border-bottom: 1px dotted rgba(255,255,255,0.07); }
        .cp-hour-t { color: rgba(255,255,255,0.35); white-space: nowrap; }
        .cp-hour-t--g { color: var(--gp); }

        /* Socials */
        .cp-socials {
          padding: 1.5rem 1.6rem 1.8rem;
          border-top: 1px solid rgba(201,168,76,0.07);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .cp-socials-label {
          font-size: 0.42rem;
          letter-spacing: 0.5em;
          color: var(--gp);
          font-weight: 600;
        }
        .cp-soc-row { display: flex; gap: 0.5rem; }
        .cp-soc {
          width: 34px; height: 34px;
          border: 1px solid rgba(201,168,76,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.3);
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .cp-soc:hover {
          border-color: var(--gp);
          background: rgba(201,168,76,0.08);
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.4);
        }
        .cp-soc--ig:hover { color: #e1306c; }
        .cp-soc--th:hover { color: #fff; }
        .cp-soc--yt:hover { color: #ff0000; }
        .cp-soc--wa:hover { color: #25d366; }

        /* Footer */
        .cp-foot {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.2rem;
          padding: 2rem 5rem 3rem;
          border-top: 1px solid rgba(201,168,76,0.07);
        }
        .cp-foot-line {
          flex: 1;
          max-width: 80px;
          height: 1px;
          background: rgba(201,168,76,0.08);
        }
        .cp-foot-gem { font-size: 0.32rem; color: rgba(201,168,76,0.3); }
        .cp-foot-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.9rem;
          font-style: italic;
          font-weight: 300;
          color: rgba(255,255,255,0.18);
          letter-spacing: 0.06em;
          white-space: nowrap;
        }

        /* ══════════════════════════════════════
           RESPONSIVE
        ══════════════════════════════════════ */
        @media (max-width: 1100px) {
          .cp-header { padding: 4rem 3rem 0; }
          .cp-body { padding: 0 3rem 5rem; grid-template-columns: 1fr; gap: 4rem; }
          .cp-info-panel { position: static; display: grid; grid-template-columns: 240px 1fr; }
          .cp-studio-photo { height: auto; min-height: 100%; }
          .cp-svc-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .cp-header { padding: 3rem 1.8rem 0; }
          .cp-body { padding: 0 1.8rem 4rem; gap: 3.5rem; }
          .cp-row { grid-template-columns: 1fr; gap: 2rem; }
          .cp-info-panel { grid-template-columns: 1fr; }
          .cp-studio-photo { height: 200px; }
          .cp-svc-grid { grid-template-columns: repeat(2, 1fr); }
          .cp-foot { padding: 2rem 1.8rem; }
          .cp-foot-text { font-size: 0.75rem; white-space: normal; text-align: center; }
        }
        @media (max-width: 480px) {
          .cp-header { padding: 3rem 1.4rem 0; }
          .cp-body { padding: 0 1.4rem 3.5rem; }
          .cp-quick { flex-direction: column; align-items: flex-start; gap: 0.6rem; }
          .cp-svc-grid { grid-template-columns: repeat(2, 1fr); }
          .cp-submit-inner { padding: 1rem 1.8rem; }
          .cp-foot { padding: 1.5rem 1.4rem; gap: 0.8rem; }
        }
      `}</style>
    </div>
  );
};

/* ── Reusable field component ── */
const Field = ({ id, label, type, ph, val, focused, set, setFocused, filled }: any) => (
  <div className={`cp-field ${focused===id?'cp-field--on':''} ${filled(id)?'cp-field--has':''}`}>
    <label className="cp-lbl">{label}</label>
    <div className="cp-inp-w">
      <input
        type={type}
        placeholder={ph}
        className="cp-inp"
        value={val}
        onFocus={() => setFocused(id)}
        onBlur={() => setFocused(null)}
        onChange={set(id)}
      />
      <span className="cp-bar" />
    </div>
  </div>
);

export default ContactPage;