

import React from "react";

import "./galary.css";

const Page = () => {
  return (
    <div className="gallery-container">

      {/* HERO SECTION */}
       <div
          className="hero-section"
          style={{
            backgroundImage: "url('/Images/Backgrounds/baby-shoot.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            
          }}
        >
          <div className="hero-overlay"></div>
        
          <div className="hero-text">
            <h1>New-Born Shoots</h1>
          </div>
        </div>

      {/* GALLERY SECTION */}
                <div className="gallery-section">
        <h2 className="section-title">Moments</h2>
      <div className="gallery-grid">

        <div className="gallery-item tall">
          <img loading="lazy" decoding="async" src="/Images/img1.jpg" alt="" className="gallery-img" />
        </div>

        <div className="gallery-item">
          <img loading="lazy" decoding="async" src="/Images/img2.jpg" alt="" className="gallery-img" />
        </div>
         <div className="gallery-item">
          <img loading="lazy" decoding="async" src="/Images/img4.jpg" alt="" className="gallery-img" />
        </div>

        <div className="gallery-item wide">
          <img loading="lazy" decoding="async" src="/Images/img3.jpg" alt="" className="gallery-img" />
        </div>

        <div className="gallery-item">
          <img loading="lazy" decoding="async" src="/Images/img4.jpg" alt="" className="gallery-img" />
        </div>

        <div className="gallery-item tall">
          <img loading="lazy" decoding="async" src="/Images/img5.jpg" alt="" className="gallery-img" />
        </div>

        <div className="gallery-item">
          <img loading="lazy" decoding="async" src="/Images/img6.jpg" alt="" className="gallery-img" />
        </div>
             <div className="gallery-item tall">
          <img loading="lazy" decoding="async" src="/Images/img1.jpg" alt="" className="gallery-img" />
        </div>

  <div className="gallery-item">
          <img loading="lazy" decoding="async" src="/Images/img4.jpg" alt="" className="gallery-img" />
        </div>

        <div className="gallery-item">
          <img loading="lazy" decoding="async" src="/Images/img2.jpg" alt="" className="gallery-img" />
        </div>
         <div className="gallery-item">
          <img loading="lazy" decoding="async" src="/Images/img4.jpg" alt="" className="gallery-img" />
        </div>

        <div className="gallery-item wide">
          <img loading="lazy" decoding="async" src="/Images/img3.jpg" alt="" className="gallery-img" />
        </div>

        <div className="gallery-item">
          <img loading="lazy" decoding="async" src="/Images/img4.jpg" alt="" className="gallery-img" />
        </div>

        <div className="gallery-item tall">
          <img loading="lazy" decoding="async" src="/Images/img5.jpg" alt="" className="gallery-img" />
        </div>
          <div className="gallery-item wide">
          <img loading="lazy" decoding="async" src="/Images/img3.jpg" alt="" className="gallery-img" />
        </div>

        <div className="gallery-item">
          <img loading="lazy" decoding="async" src="/Images/img6.jpg" alt="" className="gallery-img" />
        </div>

          <div className="gallery-item">
          <img loading="lazy" decoding="async" src="/Images/img4.jpg" alt="" className="gallery-img" />
        </div>



      </div>
</div>
    </div>
  );
};

export default Page;
