import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';

interface SiteContentItem {
  key_id: string;
  section_name: string;
  content_value: string;
  content_type: 'text' | 'textarea' | 'image';
}

interface GroupedContent {
  [section: string]: SiteContentItem[];
}

export default function SiteEditor() {
  const [content, setContent] = useState<SiteContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['Inicio']));
  const [uploadingImages, setUploadingImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('site_content')
        .select('*')
        .order('section_name', { ascending: true })
        .order('key_id', { ascending: true });

      if (fetchError) throw fetchError;

      setContent(data || []);
    } catch (err: any) {
      setError(err.message || 'Error al cargar el contenido');
    } finally {
      setLoading(false);
    }
  };

  const groupBySection = (): GroupedContent => {
    return content.reduce((acc, item) => {
      if (!acc[item.section_name]) {
        acc[item.section_name] = [];
      }
      acc[item.section_name].push(item);
      return acc;
    }, {} as GroupedContent);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const handleTextChange = (keyId: string, value: string) => {
    setContent(prev =>
      prev.map(item =>
        item.key_id === keyId ? { ...item, content_value: value } : item
      )
    );
  };

  const handleImageUpload = async (keyId: string, file: File) => {
    setUploadingImages(prev => new Set(prev).add(keyId));
    setError('');

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(uploadData.path);

      handleTextChange(keyId, publicUrl);
      setSuccess('Imagen subida exitosamente');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Error al subir la imagen');
    } finally {
      setUploadingImages(prev => {
        const newSet = new Set(prev);
        newSet.delete(keyId);
        return newSet;
      });
    }
  };

  const handleImageUrlChange = (keyId: string, url: string) => {
    handleTextChange(keyId, url);
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const updates = content.map(item => ({
        key_id: item.key_id,
        section_name: item.section_name,
        content_value: item.content_value,
        content_type: item.content_type,
      }));

      for (const update of updates) {
        const { error: upsertError } = await supabase
          .from('site_content')
          .upsert(update, { onConflict: 'key_id' });

        if (upsertError) throw upsertError;
      }

      setSuccess('¡Cambios guardados exitosamente!');
      setTimeout(() => setSuccess(''), 5000);
    } catch (err: any) {
      setError(err.message || 'Error al guardar los cambios');
    } finally {
      setSaving(false);
    }
  };

  const formatLabel = (keyId: string): string => {
    return keyId
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-white text-xl">Cargando contenido...</div>
      </div>
    );
  }

  const groupedContent = groupBySection();
  const sections = Object.keys(groupedContent);

  return (
    <div className="space-y-6">
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

      {/* Secciones */}
      {sections.map(section => (
        <div key={section} className="bg-zinc-900 rounded-lg overflow-hidden shadow-2xl">
          {/* Header de Sección */}
          <button
            onClick={() => toggleSection(section)}
            className="w-full px-8 py-5 flex items-center justify-between bg-zinc-800 hover:bg-zinc-750 transition-colors"
          >
            <h3 className="text-xl font-bold text-white">{section}</h3>
            <i className={`ri-arrow-${expandedSections.has(section) ? 'up' : 'down'}-s-line text-2xl text-gray-400`}></i>
          </button>

          {/* Contenido de Sección */}
          {expandedSections.has(section) && (
            <div className="p-8 space-y-6">
              {groupedContent[section].map(item => (
                <div key={item.key_id} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    {formatLabel(item.key_id)}
                  </label>

                  {item.content_type === 'text' && (
                    <input
                      type="text"
                      value={item.content_value}
                      onChange={(e) => handleTextChange(item.key_id, e.target.value)}
                      className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  )}

                  {item.content_type === 'textarea' && (
                    <textarea
                      value={item.content_value}
                      onChange={(e) => handleTextChange(item.key_id, e.target.value)}
                      rows={6}
                      className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors resize-vertical"
                    />
                  )}

                  {item.content_type === 'image' && (
                    <div className="space-y-3">
                      {/* Vista previa de imagen */}
                      {item.content_value && (
                        <div className="relative w-full max-w-md">
                          <img
                            src={item.content_value}
                            alt={formatLabel(item.key_id)}
                            className="w-full h-48 object-cover rounded-lg border border-zinc-700"
                          />
                        </div>
                      )}

                      {/* Input de URL */}
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">URL de la imagen:</label>
                        <input
                          type="url"
                          value={item.content_value}
                          onChange={(e) => handleImageUrlChange(item.key_id, e.target.value)}
                          placeholder="https://ejemplo.com/imagen.jpg"
                          className="w-full px-4 py-2 bg-black border border-zinc-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                        />
                      </div>

                      {/* Subir archivo */}
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">O subir nueva imagen:</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleImageUpload(item.key_id, file);
                            }
                          }}
                          disabled={uploadingImages.has(item.key_id)}
                          className="w-full px-4 py-2 bg-black border border-zinc-700 rounded-lg text-gray-400 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-500 file:text-white file:font-semibold hover:file:bg-orange-600 file:cursor-pointer focus:outline-none focus:border-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        {uploadingImages.has(item.key_id) && (
                          <p className="text-xs text-orange-500 mt-1">Subiendo imagen...</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Botón Guardar Global */}
      <div className="sticky bottom-6 flex justify-center">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-12 py-4 rounded-lg shadow-2xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-lg"
        >
          {saving ? 'Guardando...' : 'Guardar Todos los Cambios'}
        </button>
      </div>
    </div>
  );
}