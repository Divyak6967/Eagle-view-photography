import React from "react";
import { useParams } from "react-router-dom";

const galleries = {
  1: ["/Images/img1.jpg", "/Images/img2.jpg"],
  2: ["/Images/img1.jpg", "/Images/img2.jpg"],
  3: ["/Images/img1.jpg", "/Images/img2.jpg"],
  4: ["/Images/img1.jpg", "/Images/img2.jpg"],
  5: ["/Images/img1.jpg", "/Images/img2.jpg"],
  6: ["/Images/img1.jpg", "/Images/img2.jpg"],
  7: ["/Images/img1.jpg", "/Images/img2.jpg"],
  8: ["/Images/img1.jpg", "/Images/img2.jpg"],
  9: ["/Images/img1.jpg", "/Images/img2.jpg"],
};

const couples = {
  1: { groom: "MANJUNATH", bride: "RAMYA" },
  2: { groom: "ARJUN", bride: "JASMEET" },
  3: { groom: "ASHA", bride: "ROHIT" },
  4: { groom: "KARTHIK", bride: "PRIYA" },
  5: { groom: "RAHUL", bride: "SNEHA" },
  6: { groom: "VIKRAM", bride: "ANANYA" },
  7: { groom: "ROHAN", bride: "MEERA" },
  8: { groom: "ADITYA", bride: "KAVYA" },
  9: { groom: "NIKHIL", bride: "POOJA" },
};


const CoupleGallery = () => {
const { id } = useParams();
const images = galleries[id];
const couple = couples[id];

  return (
    <div>
      {/* Top Section with Background Image */}
      <div style={{
        backgroundImage: 'url("/Images/Backgrounds/background.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
      }}>
        {/* Overlay */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)"
        }}></div>
        
        {/* Content */}
        <div style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          color: "white"
        }}>
         <h1
  style={{
    fontSize: "4rem",
    margin: "0 0 20px 0",
    letterSpacing: "4px",
    fontWeight: "bold"
  }}
>
  {couple?.groom} & {couple?.bride}
</h1>
          <div style={{
            display: "flex",
            gap: "30px",
            justifyContent: "center"
          }}>
       
          </div>
        </div>
      </div>

      {/* Gallery Images Section - One by One */}
      <div style={{ padding: "50px" }}>
        {images ? (
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            maxWidth: "1200px",
            margin: "0 auto"
          }}>
            {images.map((img, index) => (
              <div key={index} style={{
                width: "100%",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
              }}>
                <img
                  src={img}
                  alt={`Gallery ${id} - Image ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    transition: "transform 0.5s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <p style={{
            textAlign: "center",
            fontSize: "1.5rem",
            color: "#999",
            padding: "100px"
          }}>
            No Gallery Found
          </p>
        )}
      </div>
    </div>
  );
};

export default CoupleGallery;