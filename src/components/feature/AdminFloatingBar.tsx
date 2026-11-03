import { useAdminSession } from '../../hooks/useAdminSession';
import { supabase } from '../../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export function AdminFloatingBar() {
  const { isAdmin, loading } = useAdminSession();
  const navigate = useNavigate();

  if (loading || !isAdmin) return null;

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-[#111] shadow-lg z-[9999] h-10">
      <div className="max-w-full mx-auto px-6 h-full flex items-center justify-between">
        {/* Indicador de modo edición */}
        <div className="flex items-center gap-2">
          <span className="text-orange-500 font-medium text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Modo Edición Activado ✏️
          </span>
        </div>

        {/* Botones de navegación */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin')}
            className="px-4 py-1.5 bg-gray-800 text-white rounded hover:bg-gray-700 transition-all duration-200 text-sm whitespace-nowrap cursor-pointer"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Panel de Noticias
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-1.5 bg-gray-800 text-white rounded hover:bg-gray-700 transition-all duration-200 text-sm whitespace-nowrap cursor-pointer"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Ir al Sitio
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-1.5 bg-orange-600 text-white rounded hover:bg-orange-700 transition-all duration-200 text-sm whitespace-nowrap cursor-pointer"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}