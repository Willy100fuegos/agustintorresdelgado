import { useSiteContent } from '../../../contexts/SiteContentContext';
import EditableContentWrapper from '../../../components/feature/EditableContentWrapper';

const JuntosContent = () => {
  const { getContent } = useSiteContent();

  return (
    <section className="w-full bg-black pt-20">
      {/* Block 1 - SI A LAS 40 HORAS (Image Left, Text Right) */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Image Column - Left */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-auto">
          <EditableContentWrapper keyId="juntos_block1_image" contentType="image">
            <img
              src={getContent('juntos_block1_image', 'http://imgfz.com/i/qdgWr0G.jpeg')}
              alt="Si a las 40 horas"
              title="Si a las 40 horas - Agustín Torres Delgado"
              className="w-full h-full object-cover"
            />
          </EditableContentWrapper>
        </div>

        {/* Text Column - Right */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-24 py-12 lg:py-16">
          <EditableContentWrapper keyId="juntos_block1_title" contentType="text">
            <h2 className="text-orange-500 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase mb-12 lg:mb-16 tracking-wide leading-tight">
              {getContent('juntos_block1_title', 'SI A LAS 40 HORAS')}
            </h2>
          </EditableContentWrapper>
          <EditableContentWrapper keyId="juntos_block1_text" contentType="textarea">
            <p className="text-white/90 text-base sm:text-lg lg:text-xl leading-relaxed">
              {getContent('juntos_block1_text', 'En el Senado se avanzó en la reducción de la jornada laboral a 40 horas semanales, una demanda justa para millones de trabajadoras y trabajadores. Sin embargo, la propuesta de Movimiento Ciudadano para que incluyera dos días obligatorios de descanso por cada cinco de trabajo fue rechazada por Morena y sus aliados.')}
              <br /><br />
              {getContent('juntos_block1_text_2', 'La reforma no puede quedarse a medias. Reducir horas debe significar también garantizar el derecho real al descanso. Ahora la discusión pasa a la Cámara de Diputados, donde seguiremos defendiendo 40 horas con cinco días de trabajo por dos de descanso, porque es un tema de dignidad y justicia social. Porque el derecho al descanso no es un privilegio. Es justicia social.')}
            </p>
          </EditableContentWrapper>
        </div>
      </div>

      {/* Block 2 - MC (Text Left, Image Right) */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Text Column - Left */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-24 py-12 lg:py-16 order-2 lg:order-1">
          <EditableContentWrapper keyId="juntos_block2_title" contentType="text">
            <h2 className="text-orange-500 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase mb-12 lg:mb-16 tracking-wide leading-tight">
              {getContent('juntos_block2_title', 'MC')}
            </h2>
          </EditableContentWrapper>
          <EditableContentWrapper keyId="juntos_block2_text" contentType="textarea">
            <p className="text-white/90 text-base sm:text-lg lg:text-xl leading-relaxed">
              {getContent('juntos_block2_text', 'Además, creemos en el derecho a la alegría. Desde nuestra visión, transformar no solo implica resolver problemas, sino también devolverle a las comunidades la felicidad y calidad de vida. Ejemplo de esto fue La Fiesta Naranja, un evento que organizamos en Coatzacoalcos para celebrar cada mes el cumpleaños de las niñas y niños, fortaleciendo los lazos familiares y la convivencia. Hoy, como Secretario General de Acuerdos de Movimiento Ciudadano, tengo el compromiso de seguir trabajando junto a personas que, como yo, creen en la transformación. Este movimiento no solo defiende causas, también inspira a construir el México que merecemos.')}
            </p>
          </EditableContentWrapper>
        </div>

        {/* Image Column - Right */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-auto order-1 lg:order-2">
          <EditableContentWrapper keyId="juntos_block2_image" contentType="image">
            <img
              src={getContent('juntos_block2_image', 'http://imgfz.com/i/8ZwkeoM.png')}
              alt="Movimiento Ciudadano - Transformación"
              title="Movimiento Ciudadano - Transformación Social"
              className="w-full h-full object-cover"
            />
          </EditableContentWrapper>
        </div>
      </div>
    </section>
  );
};

export default JuntosContent;