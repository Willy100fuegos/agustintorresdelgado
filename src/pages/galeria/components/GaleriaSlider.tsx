import { useState } from 'react';
import { useSiteContent } from '../../../contexts/SiteContentContext';
import EditableContentWrapper from '../../../components/feature/EditableContentWrapper';

const GaleriaSlider = () => {
  const { getContent } = useSiteContent();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Obtener contenido del CMS con fallbacks
  const slides = [
    {
      id: 1,
      image: getContent('galeria_slide_1_image', 'http://imgfz.com/i/35wrtsY.png'),
      alt: getContent('galeria_slide_1_alt', 'Precampaña Gómez Palacio, Durango'),
      description: getContent('galeria_slide_1_description', 'Arrancamos con fuerza la precampaña en Gómez Palacio, Durango. Con trabajo, disciplina y compromiso, Omar Castañeda, de Casta Lagunera, encabeza el proyecto que las y los ciudadanos necesitan para construir un futuro mejor. En Movimiento Ciudadano apostamos por un cambio real, con ideas frescas y una política cercana, transparente y enfocada en la gente. ¡Lo nuevo está por llegar!')
    },
    {
      id: 2,
      image: getContent('galeria_slide_2_image', 'http://imgfz.com/i/aZVRf7M.png'),
      alt: getContent('galeria_slide_2_alt', 'Fuerza Naranja en Papantla'),
      description: getContent('galeria_slide_2_description', '¡La Fuerza Naranja llegó a Papantla! Con el compromiso de construir un futuro mejor para todos, Mariano Romero, precandidato a la alcaldía de Papantla por Movimiento Ciudadano, creo un espacio de encuentro para escuchar y trabajar en conjunto con las y los ciudadanos. En Movimiento Ciudadano sabemos que Papantla merece un gobierno cercano, que impulse el desarrollo y ponga a la gente en el centro. Con Mariano al frente, estamos listos para transformar Papantla y llevarla por el rumbo que realmente necesita.')
    },
    {
      id: 3,
      image: getContent('galeria_slide_3_image', 'http://imgfz.com/i/1fCbIlR.png'),
      alt: getContent('galeria_slide_3_alt', 'Coatza tiene Gallo'),
      description: getContent('galeria_slide_3_description', '¡Coatza tiene Gallo! Con el respaldo de Álvarez Máynez y toda la Fuerza Naranja, arrancó la precampaña de Christopher \'El Gallo\' para la alcaldía de Coatza. La ciudad no aguanta cuatro años más de malos gobiernos y llegó el momento de sacarla del bache. Es hora de transformar Coatza y darle el futuro que merece.')
    }
  ];

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative w-full bg-black py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Slides Container */}
        <div className="relative">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`transition-opacity duration-700 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0 absolute inset-0'
              }`}
            >
              {/* Image */}
              <div className="w-full flex justify-center mb-8">
                <EditableContentWrapper keyId={`galeria_slide_${slide.id}_image`} contentType="image">
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    title={slide.alt}
                    className="w-full max-w-4xl h-auto rounded-lg"
                  />
                </EditableContentWrapper>
              </div>

              {/* Description */}
              <div className="max-w-3xl mx-auto text-center">
                <EditableContentWrapper keyId={`galeria_slide_${slide.id}_description`} contentType="textarea">
                  <p className="text-white text-lg leading-relaxed px-4">
                    {slide.description}
                  </p>
                </EditableContentWrapper>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-300 cursor-pointer z-10"
          aria-label="Diapositiva anterior"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <i className="ri-arrow-left-s-line text-2xl"></i>
          </div>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-300 cursor-pointer z-10"
          aria-label="Siguiente diapositiva"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <i className="ri-arrow-right-s-line text-2xl"></i>
          </div>
        </button>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-3 mt-12">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentSlide ? 'bg-orange-500 w-8' : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Ir a la diapositiva ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GaleriaSlider;