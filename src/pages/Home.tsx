import Content from "../components/Content";
import Gallery from "../components/Gallery";
import Service from "../components/Service";
import Ratings from "../components/Ratings";
import Testimonials from "../components/Testimonials";
import Wedding from "../components/Wedding";
import VideoHero from "../components/VideoHero";

export default function Home() {
  return (
    <>
      {/* Hero Section with Video */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background Video */}
        {/* <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 min-w-full min-h-full object-cover"
        >
          <source src="/Videos/Backgorund1.mp4" type="video/mp4" />
        </video> */}
              <VideoHero />

        {/* Optional overlay content */}
        <div className="absolute inset-0  flex items-center justify-center">
          <div className="text-center text-white">
            {/* <h1 className="text-5xl md:text-7xl font-bold mb-4">EAGLE VIEW PHOTOGRAPHY</h1> */}
            {/* <p className="text-xl md:text-2xl">Capturing Your Precious Moments</p> */}
          </div>
        </div>
      </div>

      {/* Other sections */}
      {/* <Content /> */}
      <Gallery />
      <Service />
      <Ratings />
      <Wedding />
      <Testimonials />
    </>
  );
}
