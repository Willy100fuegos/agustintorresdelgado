import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabaseClient';
import type { Session } from '@supabase/supabase-js';
import type { Post } from '../../../lib/supabaseClient';

interface AdminPanelProps {
  session: Session;
}

export default function AdminPanel({ session }: AdminPanelProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data || []);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleEdit = (post: Post) => {
    setEditingId(post.id);
    setTitle(post.title);
    setContent(post.content);
    setCurrentImageUrl(post.image_url);
    setImageFile(null);
    setSuccess('');
    setError('');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
    setImageFile(null);
    setCurrentImageUrl('');
    setSuccess('');
    setError('');
    
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleDelete = async (postId: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este artículo? Esta acción no se puede deshacer.')) {
      return;
    }

    try {
      const { error: deleteError } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      if (deleteError) throw deleteError;

      setSuccess('¡Artículo eliminado exitosamente!');
      fetchPosts();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Error al eliminar el artículo');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      let imageUrl = currentImageUrl;

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('blog-images')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('blog-images')
          .getPublicUrl(uploadData.path);

        imageUrl = publicUrl;
      }

      if (editingId) {
        const { error: updateError } = await supabase
          .from('posts')
          .update({
            title,
            content,
            image_url: imageUrl,
          })
          .eq('id', editingId);

        if (updateError) throw updateError;

        setSuccess('¡Artículo actualizado exitosamente!');
      } else {
        const { error: insertError } = await supabase
          .from('posts')
          .insert({
            title,
            content,
            image_url: imageUrl,
            is_published: true,
          });

        if (insertError) throw insertError;

        setSuccess('¡Noticia publicada exitosamente!');
      }

      setTitle('');
      setContent('');
      setImageFile(null);
      setCurrentImageUrl('');
      setEditingId(null);
      
      const fileInput = document.getElementById('image-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

      fetchPosts();

    } catch (err: any) {
      setError(err.message || 'Error al procesar la noticia');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Panel de Administración</h1>
            <p className="text-gray-400">Bienvenido, {session.user.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg transition-colors whitespace-nowrap font-semibold text-sm"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              ⬅️ Volver al Sitio (Modo Edición)
            </button>
            <button
              onClick={handleLogout}
              className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-2 rounded-lg transition-colors whitespace-nowrap"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Formulario de Nueva Noticia / Editar */}
        <div className="bg-zinc-900 rounded-lg p-8 shadow-2xl mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            {editingId ? 'Editar Noticia' : 'Crear Nueva Noticia'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Título */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                Título de la Noticia
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="Ingresa el título de la noticia"
              />
            </div>

            {/* Contenido */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
                Contenido
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={10}
                className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors resize-vertical"
                placeholder="Escribe el contenido completo de la noticia..."
              />
            </div>

            {/* Subir Imagen */}
            <div>
              <label htmlFor="image-upload" className="block text-sm font-medium text-gray-300 mb-2">
                Imagen Destacada {editingId && '(Dejar vacío para mantener la actual)'}
              </label>
              {currentImageUrl && !imageFile && (
                <div className="mb-3">
                  <img
                    src={currentImageUrl}
                    alt="Imagen actual"
                    className="w-48 h-32 object-cover rounded-lg border border-zinc-700"
                  />
                  <p className="text-sm text-gray-400 mt-1">Imagen actual</p>
                </div>
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-500 file:text-white file:font-semibold hover:file:bg-orange-600 file:cursor-pointer focus:outline-none focus:border-orange-500 transition-colors"
              />
              {imageFile && (
                <p className="text-sm text-gray-400 mt-2">
                  Archivo seleccionado: {imageFile.name}
                </p>
              )}
            </div>

            {/* Mensajes de estado */}
            {error && (
              <div className="bg-red-500/10 border border-red-500 rounded-lg p-4">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-500/10 border border-green-500 rounded-lg p-4">
                <p className="text-green-500 text-sm">{success}</p>
              </div>
            )}

            {/* Botones */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-lg"
              >
                {loading ? 'Procesando...' : editingId ? 'Actualizar Noticia' : 'Publicar Noticia'}
              </button>
              
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-8 bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-4 rounded-lg transition-colors whitespace-nowrap"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Lista de Artículos Publicados */}
        <div className="bg-zinc-900 rounded-lg p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">Artículos Publicados</h2>
          
          {posts.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No hay artículos publicados aún.</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div 
                  key={post.id} 
                  className="bg-black border border-zinc-800 rounded-lg p-6 flex items-start gap-6 hover:border-zinc-700 transition-colors"
                >
                  {post.image_url && (
                    <img 
                      src={post.image_url} 
                      alt={post.title}
                      className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
                    />
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white mb-2 truncate">{post.title}</h3>
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">{post.content}</p>
                    <p className="text-xs text-gray-500">
                      Publicado: {new Date(post.created_at).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleEdit(post)}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors whitespace-nowrap text-sm font-semibold"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors whitespace-nowrap text-sm font-semibold"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}