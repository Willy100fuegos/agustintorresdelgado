import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

interface InlineEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  keyId: string;
  contentType: 'text' | 'textarea' | 'image';
  currentValue: string;
  onSave: () => void;
}

export function InlineEditorModal({
  isOpen,
  onClose,
  keyId,
  contentType,
  currentValue,
  onSave,
}: InlineEditorModalProps) {
  const [value, setValue] = useState(currentValue);
  const [imageUrl, setImageUrl] = useState(currentValue);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setValue(currentValue);
      setImageUrl(currentValue);
    }
  }, [isOpen, currentValue]);

  if (!isOpen) return null;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(data.path);

      setImageUrl(publicUrl);
    } catch (error) {
      console.error('Error al subir imagen:', error);
      alert('Error al subir la imagen. Por favor intenta de nuevo.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const finalValue = contentType === 'image' ? imageUrl : value;

      const { error } = await supabase
        .from('site_content')
        .upsert({
          key_id: keyId,
          content_value: finalValue,
          content_type: contentType,
          section_name: 'content',
        }, { onConflict: 'key_id' });

      if (error) throw error;

      onSave();
      onClose();
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error al guardar los cambios. Por favor intenta de nuevo.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Franklin Gothic Heavy', 'Franklin Gothic', 'Arial Black', sans-serif" }}>
            Editar Contenido
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/20 rounded-full transition-all duration-200"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
              ID: <span className="text-gray-500">{keyId}</span>
            </label>
          </div>

          {/* Text Input */}
          {contentType === 'text' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Texto
              </label>
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                style={{ fontFamily: "'Poppins', sans-serif" }}
                placeholder="Ingresa el texto..."
              />
            </div>
          )}

          {/* Textarea Input */}
          {contentType === 'textarea' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Texto
              </label>
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none"
                style={{ fontFamily: "'Poppins', sans-serif" }}
                placeholder="Ingresa el texto..."
              />
            </div>
          )}

          {/* Image Input */}
          {contentType === 'image' && (
            <div className="mb-6">
              {/* Image Preview */}
              {imageUrl && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Vista Previa
                  </label>
                  <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}

              {/* URL Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  URL de la Imagen
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  O Subir Archivo
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex-1 cursor-pointer">
                    <div className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 transition-all duration-200 flex items-center justify-center gap-2 bg-gray-50 hover:bg-orange-50">
                      <i className="ri-upload-cloud-line text-2xl text-gray-400"></i>
                      <span className="text-sm text-gray-600" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        {uploading ? 'Subiendo...' : 'Seleccionar archivo'}
                      </span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              disabled={saving}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={saving || uploading}
              className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {saving ? (
                <>
                  <i className="ri-loader-4-line animate-spin"></i>
                  Guardando...
                </>
              ) : (
                <>
                  <i className="ri-save-line"></i>
                  Guardar
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}