import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import NoticiaCard from './NoticiaCard';

interface Post {
  id: number;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
  is_published: boolean;
}

export default function NoticiasGrid() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-white text-xl">Cargando noticias...</div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">No hay noticias publicadas aún.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <NoticiaCard
          key={post.id}
          post={post}
          formattedDate={formatDate(post.created_at)}
        />
      ))}
    </div>
  );
}