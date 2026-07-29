import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import BabyShower from './pages/BabyShower';
import BabyShowerStory from './pages/BabyShowerStory';
import Birthday from './pages/Birthday';
import Engagement from './pages/Engagement';
import Modeling from './pages/Modeling';
import ModelingStory from './pages/ModelingStory';
import Newborn from './pages/Newborn';
import PreWedding from './pages/PreWedding';
import Puperty from './pages/Puperty';
import ViewPhotos1 from './pages/ViewPhotos1';
import ViewPhotos2 from './pages/ViewPhotos2';
import ViewPhotos3 from './pages/ViewPhotos3';
import Weddings from './pages/Weddings';
import CoupleGallery from './pages/CoupleGallery';
import Weddingservice from './pages/WeddingService';
import Promotion from './pages/Promotion';
import CustomCursor from './pages/CustomCursor';
import PackagesPage from './pages/Packages';



function App() {
  return (
    <Router>
      <Navbar />
     <CustomCursor/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/babyshower" element={<BabyShower />} />
        <Route path="/babyshower/:slug" element={<BabyShowerStory />} />
        <Route path="/birthday" element={<Birthday />} />
        <Route path="/engagement" element={<Engagement />} />
        <Route path="/modeling" element={<Modeling />} />
        <Route path="/modeling/:slug" element={<ModelingStory />} />
        <Route path="/newborn" element={<Newborn />} />
        <Route path="/prewedding" element={<PreWedding />} />
        <Route path="/puperty" element={<Puperty />} />
        <Route path="/viewphotos1" element={<ViewPhotos1 />} />
        <Route path="/viewphotos2" element={<ViewPhotos2 />} />
        <Route path="/viewphotos3" element={<ViewPhotos3 />} />
        <Route path="/weddings" element={<Weddings />} />
        <Route path="/WeddingService" element={<Weddingservice />} />
        <Route path="/couple/:id" element={<CoupleGallery />} />
         <Route path="promotion" element={<Promotion />} />
         <Route path="/Packages" element={<PackagesPage />} />


      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
