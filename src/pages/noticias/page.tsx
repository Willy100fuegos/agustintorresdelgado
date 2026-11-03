import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import NoticiasGrid from './components/NoticiasGrid';
import { useAdminSession } from '../../hooks/useAdminSession';

export default function NoticiasPage() {
  const { isAdmin } = useAdminSession();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-center">
              NOTICIAS
            </h1>
            {isAdmin && (
              <button
                onClick={() => navigate('/admin')}
                className="mt-2 mb-2 px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                ⚙️ Gestionar Noticias
              </button>
            )}
          </div>
          <p className="text-gray-400 text-center mb-12 text-lg">
            Mantente informado sobre las últimas acciones y logros
          </p>
          <NoticiasGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
}
