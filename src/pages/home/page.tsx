
import Navbar from '../../components/feature/Navbar';
import HeroSection from '../../components/feature/HeroSection';
import ImageGridSection from '../../components/feature/ImageGridSection';
import Footer from '../../components/feature/Footer';

const HomePage = () => {
  return (
    <div className="bg-black min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ImageGridSection />
      <Footer />
    </div>
  );
};

export default HomePage;
