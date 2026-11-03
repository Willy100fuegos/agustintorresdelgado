
import { useState, useEffect } from 'react';

const SliderSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: 'https://res.cloudinary.com/dt7otpfmm/image/upload/v1771395683/juntos_r39h4a.png',
      alt: 'Juntos - Agustín Torres Delgado',
    },
    {
      id: 2,
      image: 'https://res.cloudinary.com/dt7otpfmm/image/upload/v1771395682/opinion_zxkmf3.png',
      alt: 'Opinión - Agustín Torres Delgado',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section id="galeria" className="relative w-full bg-black overflow-hidden">
      {/* Slides Container */}
      <div className="relative w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`w-full transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 relative' : 'opacity-0 absolute inset-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              title={slide.alt}
              className="w-full h-auto block"
              style={{ minWidth: '1024px' }}
            />
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Ir a la diapositiva ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 cursor-pointer"
        aria-label="Diapositiva anterior"
      >
        <div className="w-6 h-6 flex items-center justify-center">
          <i className="ri-arrow-left-s-line text-2xl"></i>
        </div>
      </button>
      <button
        onClick={() => goToSlide((currentSlide + 1) % slides.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 cursor-pointer"
        aria-label="Siguiente diapositiva"
      >
        <div className="w-6 h-6 flex items-center justify-center">
          <i className="ri-arrow-right-s-line text-2xl"></i>
        </div>
      </button>
    </section>
  );
};

export default SliderSection;
