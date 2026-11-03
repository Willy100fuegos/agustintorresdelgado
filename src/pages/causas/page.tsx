import Navbar from '../../components/feature/Navbar';
import CausasContent from './components/CausasContent';
import Footer from '../../components/feature/Footer';

const CausasPage = () => {
  return (
    <div className="bg-black min-h-screen overflow-x-hidden">
      <Navbar />
      <CausasContent />
      <Footer />
    </div>
  );
};

export default CausasPage;
