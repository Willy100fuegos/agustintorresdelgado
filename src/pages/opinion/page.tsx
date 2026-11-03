import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import OpinionContent from './components/OpinionContent';

const Opinion = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <OpinionContent />
      <Footer />
    </div>
  );
};

export default Opinion;
