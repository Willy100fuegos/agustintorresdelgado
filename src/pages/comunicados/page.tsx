import Navbar from '../../components/feature/Navbar';
import ComunicadosContent from './components/ComunicadosContent';
import Footer from '../../components/feature/Footer';

const ComunicadosPage = () => {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="pt-32">
        <ComunicadosContent />
      </div>
      <Footer />
    </div>
  );
};

export default ComunicadosPage;
