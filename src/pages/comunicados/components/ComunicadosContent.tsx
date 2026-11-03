import { useSiteContent } from '../../../contexts/SiteContentContext';
import EditableContentWrapper from '../../../components/feature/EditableContentWrapper';

const ComunicadosContent = () => {
  const { getContent } = useSiteContent();

  // Obtener contenido del CMS con fallbacks
  const title = getContent('comunicados_title', 'AGUSTÍN TORRES ASUME LA SECRETARÍA NACIONAL DE MOVIMIENTO CIUDADANO.');
  const subtitle = getContent('comunicados_subtitle', 'El originario de Coatzacoalcos se suma a Jorge Álvarez Máynez en la nueva dirigencia del partido naranja a nivel nacional');
  const image = getContent('comunicados_image', 'http://imgfz.com/i/VstLBIk.png');
  const imageAlt = getContent('comunicados_image_alt', 'Agustín Torres Delgado asume Secretaría Nacional de Movimiento Ciudadano');
  const text = getContent('comunicados_text', '');

  // Dividir el texto en párrafos
  const paragraphs = text.split('\n\n').filter(p => p.trim());

  return (
    <article className="max-w-4xl mx-auto px-6 py-16">
      {/* Headline */}
      <EditableContentWrapper keyId="comunicados_title" contentType="text">
        <h1 className="text-4xl md:text-5xl font-bold text-white uppercase mb-6 leading-tight">
          {title}
        </h1>
      </EditableContentWrapper>

      {/* Subtitle */}
      <EditableContentWrapper keyId="comunicados_subtitle" contentType="text">
        <h3 className="text-xl md:text-2xl text-gray-400 italic mb-12 leading-relaxed">
          {subtitle}
        </h3>
      </EditableContentWrapper>

      {/* Featured Image */}
      <div className="w-full mb-12">
        <EditableContentWrapper keyId="comunicados_image" contentType="image">
          <img
            src={image}
            alt={imageAlt}
            title={imageAlt}
            className="w-full h-auto rounded-lg"
          />
        </EditableContentWrapper>
      </div>

      {/* Article Body */}
      <EditableContentWrapper keyId="comunicados_text" contentType="textarea">
        <div className="text-white text-lg leading-relaxed space-y-6">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>
              {paragraph}
            </p>
          ))}
        </div>
      </EditableContentWrapper>
    </article>
  );
};

export default ComunicadosContent;