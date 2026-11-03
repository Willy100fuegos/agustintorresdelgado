import { useSiteContent } from '../../../contexts/SiteContentContext';
import EditableContentWrapper from '../../../components/feature/EditableContentWrapper';

const CausasContent = () => {
  const { getContent } = useSiteContent();

  return (
    <section className="w-full bg-black pt-20">
      {/* Block A - Calidad de Vida (Text Left, Image Right) */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Text Column - Left */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-24 py-12 lg:py-16 order-2 lg:order-1">
          <EditableContentWrapper keyId="causas_block1_title" contentType="text">
            <h2 className="text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase mb-12 lg:mb-16 tracking-wide leading-tight">
              {getContent('causas_block1_title', 'CALIDAD DE VIDA')}
            </h2>
          </EditableContentWrapper>
          <EditableContentWrapper keyId="causas_block1_text" contentType="textarea">
            <p className="text-white/90 text-base sm:text-lg lg:text-xl leading-relaxed">
              {getContent('causas_block1_text', 'Mi principal compromiso es que todas las familias tengan una mejor calidad de vida. Desde cosas básicas como mejorar las calles, hasta garantizar mejores condiciones de trabajo, en Movimiento Ciudadano hemos logrado avances importantes: más vacaciones, mejores salarios y derechos como tener una silla para trabajar. Pequeñas acciones que generan grandes cambios.')}
            </p>
          </EditableContentWrapper>
        </div>

        {/* Image Column - Right */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-auto order-1 lg:order-2">
          <EditableContentWrapper keyId="causas_block1_image" contentType="image">
            <img
              src={getContent('causas_block1_image', 'http://imgfz.com/i/NRQF7Tb.png')}
              alt="Calidad de Vida"
              title="Calidad de Vida - Agustín Torres Delgado"
              className="w-full h-full object-cover"
            />
          </EditableContentWrapper>
        </div>
      </div>

      {/* Block B - Derecho a la Alegría (Image Left, Text Right) */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Image Column - Left */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-auto">
          <EditableContentWrapper keyId="causas_block2_image" contentType="image">
            <img
              src={getContent('causas_block2_image', 'http://imgfz.com/i/18lw0tg.png')}
              alt="Derecho a la Alegría"
              title="Derecho a la Alegría - Agustín Torres Delgado"
              className="w-full h-full object-cover"
            />
          </EditableContentWrapper>
        </div>

        {/* Text Column - Right */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-24 py-12 lg:py-16">
          <EditableContentWrapper keyId="causas_block2_title" contentType="text">
            <h2 className="text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase mb-12 lg:mb-16 tracking-wide leading-tight">
              {getContent('causas_block2_title', 'DERECHO A LA ALEGRÍA')}
            </h2>
          </EditableContentWrapper>
          <EditableContentWrapper keyId="causas_block2_text" contentType="textarea">
            <p className="text-white/90 text-base sm:text-lg lg:text-xl leading-relaxed">
              {getContent('causas_block2_text', 'Creo firmemente en el derecho a la alegría, sobre todo para las niñas y niños. En Coatzacoalcos organicé La Fiesta Naranja, un evento mensual donde celebrábamos los cumpleaños de los pequeños del mes con sus familias. Payasos, juegos, pastel y regalos llenaban de sonrisas a toda la comunidad. ¡Esos momentos me recordaron que la alegría también transforma vidas!')}
            </p>
          </EditableContentWrapper>
        </div>
      </div>
    </section>
  );
};

export default CausasContent;