import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../../lib/supabaseClient';
import Navbar from '../../../components/feature/Navbar';
import Footer from '../../../components/feature/Footer';

interface Post {
  id: string;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
}

export default function NoticiaDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching post:', error);
      } else {
        setPost(data);
      }
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  // Dynamic SEO and Open Graph tags
  useEffect(() => {
    if (!post) return;

    // Update document title
    document.title = `${post.title} | Agustín Torres Delgado`;

    // Helper function to update or create meta tags
    const updateMetaTag = (property: string, content: string, isProperty = true) => {
      const attribute = isProperty ? 'property' : 'name';
      let metaTag = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute(attribute, property);
        document.head.appendChild(metaTag);
      }
      
      metaTag.setAttribute('content', content);
    };

    // Extract first 160 characters of content for description
    const description = post.content.substring(0, 160).replace(/\n/g, ' ') + '...';

    // Update Open Graph tags
    updateMetaTag('og:title', post.title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', post.image_url);
    updateMetaTag('og:url', window.location.href);
    updateMetaTag('og:type', 'article');

    // Update standard meta tags
    updateMetaTag('description', description, false);

    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = 'Agustín Torres Delgado | Movimiento Ciudadano';
      updateMetaTag('og:title', 'Agustín Torres Delgado | Movimiento Ciudadano');
      updateMetaTag(
        'og:description',
        'Sitio web oficial de Agustín Torres Delgado, Secretario General de Acuerdos de Movimiento Ciudadano. Trabajando juntos por el derecho a la alegría y un mejor futuro para Coatzacoalcos, Veracruz y México.'
      );
      updateMetaTag('og:type', 'website');
      updateMetaTag(
        'description',
        'Sitio web oficial de Agustín Torres Delgado, Secretario General de Acuerdos de Movimiento Ciudadano. Trabajando juntos por el derecho a la alegría y un mejor futuro para Coatzacoalcos, Veracruz y México.',
        false
      );
    };
  }, [post]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-white text-3xl font-bold mb-4">Artículo no encontrado</h1>
            <Link 
              to="/noticias" 
              className="text-orange-500 hover:text-orange-400 underline"
            >
              Volver a Noticias
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const formattedDate = new Date(post.created_at).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const currentUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(post.title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${currentUrl}&text=${shareTitle}`,
    whatsapp: `https://api.whatsapp.com/send?text=${shareTitle}%20${currentUrl}`
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Image */}
      <div className="w-full h-[500px] overflow-hidden bg-zinc-900">
        <img 
          src={post.image_url} 
          alt={post.title}
          className="w-full h-full object-cover object-[center_20%]"
        />
      </div>

      {/* Article Content */}
      <div className="max-w-[800px] mx-auto px-6 py-12">
        {/* Back Link */}
        <Link 
          to="/noticias" 
          className="inline-flex items-center text-orange-500 hover:text-orange-400 mb-8 transition-colors"
        >
          <i className="ri-arrow-left-line mr-2"></i>
          Volver a Noticias
        </Link>

        {/* Title */}
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Date */}
        <p className="text-gray-400 text-sm mb-8">
          {formattedDate}
        </p>

        {/* Content */}
        <div className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap mb-12">
          {post.content}
        </div>

        {/* Social Share Section */}
        <div className="border-t border-zinc-800 pt-8">
          <h3 className="text-white text-xl font-bold mb-6">Compartir este artículo:</h3>
          <div className="flex flex-wrap gap-4">
            {/* Facebook Button */}
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#1877F2] hover:bg-[#166FE5] text-white px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-facebook-fill text-xl"></i>
              <span>Facebook</span>
            </a>

            {/* Twitter/X Button */}
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#000000] hover:bg-[#1a1a1a] text-white px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer border border-zinc-700"
            >
              <i className="ri-twitter-x-fill text-xl"></i>
              <span>X (Twitter)</span>
            </a>

            {/* WhatsApp Button */}
            <a
              href={shareLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-whatsapp-fill text-xl"></i>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}