import Navbar from '../../components/feature/Navbar';
import GaleriaSlider from './components/GaleriaSlider';
import Footer from '../../components/feature/Footer';

const GaleriaPage = () => {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="pt-32">
        <GaleriaSlider />
      </div>
      <Footer />
    </div>
  );
};

export default GaleriaPage;
