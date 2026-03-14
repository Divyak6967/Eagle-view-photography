

import React from "react";

import "./view3.css";

const View3Page = () => {
  return (
    <div className="view1-container">
      
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>RAVI & JANU</h1>
          <div className="hero-buttons">
            <button className="enquire-btn" onClick={() => window.location.href = '/contact'}>CONTACT US</button>
          </div>
        </div>
      </section>

      {/* IMAGE GALLERY */}
     <section className="gallery">
  {/* <h2>Wedding Moments</h2> */}

  <div className="gallery-column">
    <div className="gallery-item">
      <img src="/Images/img2.jpg" alt="img1" className="gallery-img" />
    </div>

    <div className="gallery-item">
      <img src="/Images/img5.jpg" alt="img2" className="gallery-img" />
    </div>

    <div className="gallery-item">
      <img src="/Images/img4.jpg" alt="img3" className="gallery-img" />
    </div>
  </div>
</section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 Wedding Photography. All Rights Reserved.</p>
      </footer>

    </div>
  );
};

export default View3Page;
