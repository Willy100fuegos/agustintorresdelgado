import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminSession } from '../../hooks/useAdminSession';
import { supabase } from '../../lib/supabaseClient';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAdmin } = useAdminSession();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
        }`}
        aria-label="Main navigation"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src="https://res.cloudinary.com/dt7otpfmm/image/upload/v1771395238/logoatd_hihcav.png"
                alt="ATD Logo"
                className="h-12 w-auto"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-white hover:text-orange-500 transition-colors whitespace-nowrap cursor-pointer">Inicio</Link>
              <Link to="/acerca-de" className="text-white hover:text-orange-500 transition-colors whitespace-nowrap cursor-pointer">Acerca de</Link>
              <Link to="/causas" className="text-white hover:text-orange-500 transition-colors whitespace-nowrap cursor-pointer">Causas</Link>
              <Link to="/juntos" className="text-white hover:text-orange-500 transition-colors whitespace-nowrap cursor-pointer">Juntos</Link>
              <Link to="/opinion" className="text-white hover:text-orange-500 transition-colors whitespace-nowrap cursor-pointer">Opinión</Link>
              <Link to="/galeria" className="text-white hover:text-orange-500 transition-colors whitespace-nowrap cursor-pointer">Galería</Link>
              <Link to="/comunicados" className="text-white hover:text-orange-500 transition-colors whitespace-nowrap cursor-pointer">Comunicados</Link>
              <Link to="/noticias" className="text-white hover:text-orange-500 transition-colors whitespace-nowrap cursor-pointer">Noticias</Link>

              {/* Admin buttons */}
              {isAdmin && (
                <div className="flex items-center gap-2 ml-2 border-l border-white/20 pl-4">
                  <button
                    onClick={() => navigate('/admin')}
                    className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-md transition-colors whitespace-nowrap cursor-pointer font-medium"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Panel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1.5 bg-zinc-700 hover:bg-zinc-600 text-white text-sm rounded-md transition-colors whitespace-nowrap cursor-pointer font-medium"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-white hover:text-orange-500 transition-colors duration-200"
              aria-label="Abrir menú"
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-menu-line text-3xl" aria-hidden="true"></i>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-black transition-all duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Top Bar: Logo + Close */}
        <div className="flex items-center justify-between px-6 h-20">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex-shrink-0">
            <img
              src="https://res.cloudinary.com/dt7otpfmm/image/upload/v1771395238/logoatd_hihcav.png"
              alt="ATD Logo"
              className="h-12 w-auto"
            />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-orange-500 hover:text-orange-400 transition-colors duration-200"
            aria-label="Cerrar menú"
          >
            <div className="w-10 h-10 flex items-center justify-center">
              <i className="ri-close-line text-4xl" aria-hidden="true"></i>
            </div>
          </button>
        </div>

        {/* Menu Links */}
        <div className="flex flex-col items-center space-y-6 py-8">
          {[
            { name: 'Inicio', path: '/' },
            { name: 'Acerca de', path: '/acerca-de' },
            { name: 'Causas', path: '/causas' },
            { name: 'Juntos', path: '/juntos' },
            { name: 'Opinión', path: '/opinion' },
            { name: 'Galería', path: '/galeria' },
            { name: 'Comunicados', path: '/comunicados' },
            { name: 'Noticias', path: '/noticias' },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-white text-2xl hover:text-orange-500 transition-colors whitespace-nowrap cursor-pointer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {/* Admin buttons mobile */}
          {isAdmin && (
            <div className="flex flex-col items-center gap-4 pt-4 border-t border-white/10 w-full px-8">
              <button
                onClick={() => { navigate('/admin'); setIsMobileMenuOpen(false); }}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white text-lg rounded-lg transition-colors whitespace-nowrap cursor-pointer font-medium"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Panel
              </button>
              <button
                onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                className="w-full py-3 bg-zinc-700 hover:bg-zinc-600 text-white text-lg rounded-lg transition-colors whitespace-nowrap cursor-pointer font-medium"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
