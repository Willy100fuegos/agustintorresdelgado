import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabaseClient';

interface SiteContentItem {
  key_id: string;
  section_name: string;
  content_value: string;
  content_type: 'text' | 'textarea' | 'image';
}

interface SiteContentContextType {
  content: Record<string, string>;
  loading: boolean;
  refreshContent: () => Promise<void>;
  getContent: (keyId: string, fallback: string) => string;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

// Valores por defecto hardcodeados como fallback
const DEFAULT_CONTENT: Record<string, string> = {
  // Hero Section
  'home_hero_title_1': 'AGUSTÍN TORRES',
  'home_hero_title_2': 'DELGADO',
  'home_hero_subtitle': 'Secretario General de Acuerdos de Movimiento Ciudadano',
  'home_hero_image': 'https://readdy.ai/api/search-image?query=Professional%20Mexican%20politician%20in%20formal%20business%20attire%20standing%20confidently%20in%20a%20modern%20government%20office%20with%20clean%20white%20background%2C%20natural%20lighting%2C%20professional%20portrait%20photography%2C%20sharp%20focus%2C%20dignified%20pose%2C%20contemporary%20setting%2C%20high%20quality%20corporate%20headshot%20style&width=800&height=1000&seq=hero1&orientation=portrait',
  
  // Image Grid
  'home_grid_image_1': 'https://readdy.ai/api/search-image?query=Mexican%20politician%20speaking%20at%20public%20rally%20with%20orange%20Movimiento%20Ciudadano%20branding%2C%20engaged%20crowd%20in%20background%2C%20outdoor%20event%2C%20bright%20daylight%2C%20energetic%20atmosphere%2C%20professional%20event%20photography%2C%20wide%20angle%20shot%2C%20vibrant%20colors%2C%20political%20campaign%20setting&width=600&height=400&seq=grid1&orientation=landscape',
  'home_grid_image_2': 'https://readdy.ai/api/search-image?query=Community%20meeting%20in%20Veracruz%20Mexico%20with%20diverse%20group%20of%20citizens%2C%20indoor%20conference%20room%2C%20people%20listening%20attentively%2C%20professional%20setting%2C%20warm%20lighting%2C%20collaborative%20atmosphere%2C%20documentary%20style%20photography%2C%20authentic%20moment%2C%20civic%20engagement&width=600&height=400&seq=grid2&orientation=landscape',
  'home_grid_image_3': 'https://readdy.ai/api/search-image?query=Mexican%20legislative%20session%20in%20Senate%20chamber%2C%20politicians%20debating%2C%20formal%20government%20setting%2C%20official%20architecture%2C%20professional%20lighting%2C%20serious%20atmosphere%2C%20political%20journalism%20photography%2C%20wide%20shot%20of%20chamber%2C%20democratic%20process&width=600&height=400&seq=grid3&orientation=landscape',
  'home_grid_image_4': 'https://readdy.ai/api/search-image?query=Politician%20visiting%20local%20community%20in%20Coatzacoalcos%20Veracruz%2C%20interacting%20with%20families%2C%20outdoor%20neighborhood%20setting%2C%20friendly%20atmosphere%2C%20natural%20daylight%2C%20candid%20moment%2C%20photojournalism%20style%2C%20authentic%20connection%2C%20grassroots%20politics&width=600&height=400&seq=grid4&orientation=landscape',
  
  // Opinión Page
  'opinion_title': 'MIGRACIÓN: RETO HISTÓRICO Y HUMANO',
  'opinion_image': 'http://imgfz.com/i/1Xk2hRE.png',
  'opinion_image_caption': 'Agustín Torres Delgado - Secretario General de Acuerdos Movimiento Ciudadano',
  'opinion_text': `La migración es uno de los temas más antiguos de la humanidad. Desde tiempos inmemoriales, las personas han dejado sus hogares en busca de mejores oportunidades, seguridad o simplemente un futuro más digno. Sin embargo, en los últimos años, este fenómeno ha tomado dimensiones alarmantes, especialmente en América Latina, donde millones de personas se ven obligadas a abandonar sus países debido a la violencia, la pobreza extrema y la falta de oportunidades.

México, por su posición geográfica, se ha convertido en un punto clave en las rutas migratorias hacia Estados Unidos. Esto nos coloca frente a un desafío histórico y humano que no podemos ignorar. La migración no es solo un problema de cifras o políticas públicas; es una cuestión de dignidad humana. Detrás de cada migrante hay una historia de dolor, esperanza y valentía.

Como Secretario General de Acuerdos de Movimiento Ciudadano, considero que es fundamental abordar este tema con empatía, pero también con responsabilidad. No podemos cerrar los ojos ante las causas estructurales que generan la migración: la desigualdad, la corrupción y la falta de oportunidades en los países de origen. Al mismo tiempo, debemos garantizar que quienes transitan por nuestro territorio lo hagan en condiciones seguras y dignas.

México tiene una larga tradición de solidaridad con los migrantes. Históricamente, hemos sido un país de acogida para quienes huyen de conflictos o buscan refugio. Sin embargo, también debemos reconocer que nuestras capacidades tienen límites y que necesitamos políticas migratorias claras, humanas y sostenibles.

Es urgente trabajar en coordinación con otros países de la región para atacar las causas de la migración. Esto implica invertir en desarrollo económico, combatir la corrupción y fortalecer las instituciones en los países de origen. Solo así podremos reducir la presión migratoria y ofrecer alternativas reales a quienes hoy se ven obligados a dejar todo atrás.

Al mismo tiempo, debemos garantizar que los migrantes que transitan por México sean tratados con dignidad y respeto. Esto incluye proteger sus derechos humanos, brindarles acceso a servicios básicos y combatir la trata de personas y el crimen organizado que lucra con su vulnerabilidad.

La migración es un reto complejo que requiere soluciones integrales. No podemos resolverlo con muros ni con políticas represivas. Necesitamos un enfoque humanitario que reconozca la dignidad de cada persona, pero también un enfoque pragmático que considere las capacidades y necesidades de nuestro país.

Desde Movimiento Ciudadano, estamos comprometidos con construir un México más justo y solidario, pero también más ordenado y seguro. Creemos que es posible atender el fenómeno migratorio con empatía y responsabilidad, siempre poniendo en el centro a las personas y sus derechos.

La migración no es solo un desafío para México; es un desafío para toda la región. Y solo trabajando juntos, con visión de largo plazo y compromiso genuino, podremos construir un futuro donde nadie tenga que dejar su hogar para buscar una vida digna. Porque, como ya lo cantaron Los Tigres del Norte, "somos más americanos" y debemos actuar en consecuencia.`,

  // Galería Page
  'galeria_slide_1_image': 'http://imgfz.com/i/35wrtsY.png',
  'galeria_slide_1_alt': 'Precampaña Gómez Palacio, Durango',
  'galeria_slide_1_description': 'Arrancamos con fuerza la precampaña en Gómez Palacio, Durango. Con trabajo, disciplina y compromiso, Omar Castañeda, de Casta Lagunera, encabeza el proyecto que las y los ciudadanos necesitan para construir un futuro mejor. En Movimiento Ciudadano apostamos por un cambio real, con ideas frescas y una política cercana, transparente y enfocada en la gente. ¡Lo nuevo está por llegar!',
  'galeria_slide_2_image': 'http://imgfz.com/i/aZVRf7M.png',
  'galeria_slide_2_alt': 'Fuerza Naranja en Papantla',
  'galeria_slide_2_description': '¡La Fuerza Naranja llegó a Papantla! Con el compromiso de construir un futuro mejor para todos, Mariano Romero, precandidato a la alcaldía de Papantla por Movimiento Ciudadano, creo un espacio de encuentro para escuchar y trabajar en conjunto con las y los ciudadanos. En Movimiento Ciudadano sabemos que Papantla merece un gobierno cercano, que impulse el desarrollo y ponga a la gente en el centro. Con Mariano al frente, estamos listos para transformar Papantla y llevarla por el rumbo que realmente necesita.',
  'galeria_slide_3_image': 'http://imgfz.com/i/1fCbIlR.png',
  'galeria_slide_3_alt': 'Coatza tiene Gallo',
  'galeria_slide_3_description': '¡Coatza tiene Gallo! Con el respaldo de Álvarez Máynez y toda la Fuerza Naranja, arrancó la precampaña de Christopher \'El Gallo\' para la alcaldía de Coatza. La ciudad no aguanta cuatro años más de malos gobiernos y llegó el momento de sacarla del bache. Es hora de transformar Coatza y darle el futuro que merece.',

  // Comunicados Page
  'comunicados_title': 'AGUSTÍN TORRES ASUME LA SECRETARÍA NACIONAL DE MOVIMIENTO CIUDADANO.',
  'comunicados_subtitle': 'El originario de Coatzacoalcos se suma a Jorge Álvarez Máynez en la nueva dirigencia del partido naranja a nivel nacional',
  'comunicados_image': 'http://imgfz.com/i/VstLBIk.png',
  'comunicados_image_alt': 'Agustín Torres Delgado asume Secretaría Nacional de Movimiento Ciudadano',
  'comunicados_text': `En el marco de la Quinta Convención Nacional Democrática de Movimiento Ciudadano, el porteño Agustín Torres Delgado fue nombrado como nuevo Secretario General de este instituto político, donde también fue nombrado Jorge Álvarez Máynez como coordinador nacional.

En ceremonia celebrada en la Ciudad de México, Torres Delgado, asume de esta manera el segundo cargo jerárquico en el partido naranja, que ya es la fuerza política de mayor crecimiento en todo país y que apunta a convertirse en la única oposición al actual gobierno.

El oriundo de Coatzacoalcos, quien ha sido el principal promotor del sur de Veracruz en la esfera nacional de MC, fue votado por unanimidad para asumir junto a Jorge Álvarez Máynez, las riendas del partido naranja.

Agustín Torres, lleva más de 15 años en la política iniciando su andar en el partido Convergencia, hoy convertido en Movimiento Ciudadano, donde junto a Dante Delgado, han sido de los constructores de la nueva cara de la política en México, donde ya han consolidado proyectos en los principales estados del país, pues gobiernan Nuevo León y Jalisco.

Es también regidor con licencia por Coatzacoalcos, la tierra que lo vio crecer y donde se ha encargado de formar un proyecto de gobierno para la ciudad, en el que pone por delante la calidad de vida para los niños y niñas del municipio, así como también ha impulsado una dirigencia y regiduría cercana a la gente con trabajo, esto apoyado por sus dirigentes locales como lo son Christopher El Gallo y Luis Gutiérrez.`,
};

export const SiteContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<Record<string, string>>(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);

  const loadContent = async () => {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('*');

      if (error) throw error;

      if (data && data.length > 0) {
        const contentMap: Record<string, string> = { ...DEFAULT_CONTENT };
        data.forEach((item: SiteContentItem) => {
          contentMap[item.key_id] = item.content_value;
        });
        setContent(contentMap);
      } else {
        // Si no hay datos en la BD, usar valores por defecto
        setContent(DEFAULT_CONTENT);
      }
    } catch (error) {
      console.error('Error loading site content:', error);
      // En caso de error, usar valores por defecto
      setContent(DEFAULT_CONTENT);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  const refreshContent = async () => {
    setLoading(true);
    await loadContent();
  };

  const getContent = (keyId: string, fallback: string = '') => {
    return content[keyId] || fallback || DEFAULT_CONTENT[keyId] || '';
  };

  return (
    <SiteContentContext.Provider value={{ content, loading, refreshContent, getContent }}>
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => {
  const context = useContext(SiteContentContext);
  if (context === undefined) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }
  return context;
};