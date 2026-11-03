import { useSiteContent } from '../../../contexts/SiteContentContext';
import EditableContentWrapper from '../../../components/feature/EditableContentWrapper';

const OpinionContent = () => {
  const { getContent } = useSiteContent();

  // Obtener contenido del CMS con fallbacks
  const title = getContent('opinion_title', 'MIGRACIÓN: RETO HISTÓRICO Y HUMANO');
  const image = getContent('opinion_image', 'http://imgfz.com/i/1Xk2hRE.png');
  const imageCaption = getContent('opinion_image_caption', 'Agustín Torres Delgado - Secretario General de Acuerdos Movimiento Ciudadano');
  const text = getContent('opinion_text', '');

  // Dividir el texto en párrafos
  const paragraphs = text.split('\n\n').filter(p => p.trim());

  return (
    <section className="w-full bg-black pt-32 pb-16 px-6 sm:px-12 lg:px-16 xl:px-24">
      {/* Main Title */}
      <EditableContentWrapper keyId="opinion_title" contentType="text">
        <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase mb-16 tracking-wide leading-tight text-center">
          {title}
        </h1>
      </EditableContentWrapper>

      {/* Content Layout */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-7xl mx-auto">
        {/* Left Column - Image */}
        <div className="w-full lg:w-[35%] flex flex-col items-center">
          <EditableContentWrapper keyId="opinion_image" contentType="image">
            <img
              src={image}
              alt={imageCaption}
              title={imageCaption}
              className="w-full h-auto object-cover rounded-lg"
            />
          </EditableContentWrapper>
          <EditableContentWrapper keyId="opinion_image_caption" contentType="text">
            <p className="text-white/70 text-sm sm:text-base mt-4 text-center italic">
              {imageCaption}
            </p>
          </EditableContentWrapper>
        </div>

        {/* Right Column - Text in Newspaper Style */}
        <div className="w-full lg:w-[65%]">
          <EditableContentWrapper keyId="opinion_text" contentType="textarea">
            <div className="text-white/90 text-base sm:text-lg leading-relaxed lg:column-count-2 lg:column-gap-10 text-justify">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className={index > 0 ? 'mt-4' : ''}>
                  {paragraph}
                </p>
              ))}
            </div>
          </EditableContentWrapper>
        </div>
      </div>
    </section>
  );
};

export default OpinionContent;