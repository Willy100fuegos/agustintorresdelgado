import { useSiteContent } from '../../contexts/SiteContentContext';
import EditableContentWrapper from './EditableContentWrapper';

const AboutSection = () => {
  const { getContent } = useSiteContent();

  const timeline = [
    'Licenciatura en Administración de Empresas',
    'Maestría en Marketing Promocional en la Universidad Complutense de Madrid',
    'Coordinador Administrativo del Grupo Parlamentario de Movimiento Ciudadano en el Senado',
    'Regidor de Coatzacoalcos',
    'Tesorero Nacional de Movimiento Ciudadano',
    'Coordinador del Sur de Veracruz',
    'Secretario General de Acuerdos de Movimiento Ciudadano',
  ];

  return (
    <section id="acerca" className="relative w-full bg-black pt-24 lg:pt-0">
      {/* Desktop Split Layout */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Column - Image */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-auto">
          <EditableContentWrapper keyId="about_image" contentType="image">
            <img
              src={getContent('about_image', 'https://res.cloudinary.com/dt7otpfmm/image/upload/v1771397834/acercade_a6634o.png')}
              alt="Agustín Torres Delgado - Acerca de"
              title="ATD - Acerca de"
              className="w-full h-full object-cover"
            />
          </EditableContentWrapper>
        </div>

        {/* Right Column - Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-24 py-12 lg:py-16">
          {/* Heading */}
          <EditableContentWrapper keyId="about_title" contentType="text">
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mb-6 lg:mb-8 tracking-wide">
              {getContent('about_title', 'AGUSTÍN TORRES DELGADO')}
            </h1>
          </EditableContentWrapper>

          {/* Intro Text */}
          <EditableContentWrapper keyId="about_intro_text" contentType="textarea">
            <p className="text-white/90 text-base sm:text-lg lg:text-xl leading-relaxed mb-8 lg:mb-12">
              {getContent('about_intro_text', 'Soy Agustín Torres Delgado, y mi sueño siempre ha sido transformar, crear y construir; por ello trabajo todos los días para tener un mejor país para las y los Mexicanos.')}
            </p>
          </EditableContentWrapper>

          {/* Timeline List */}
          <div className="space-y-4 lg:space-y-5">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                {/* Orange Bullet */}
                <div className="flex-shrink-0 mt-1.5">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                </div>
                {/* Timeline Item Text */}
                <EditableContentWrapper keyId={`about_timeline_${index + 1}`} contentType="text">
                  <p className="text-white/85 text-sm sm:text-base lg:text-lg leading-relaxed">
                    {getContent(`about_timeline_${index + 1}`, item)}
                  </p>
                </EditableContentWrapper>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;