import { useState, type ReactNode } from 'react';
import { useAdminSession } from '../../hooks/useAdminSession';
import { useSiteContent } from '../../contexts/SiteContentContext';
import { InlineEditorModal } from './InlineEditorModal';

interface EditableContentWrapperProps {
  keyId: string;
  contentType: 'text' | 'textarea' | 'image';
  children: ReactNode;
}

export function EditableContentWrapper({
  keyId,
  contentType,
  children,
}: EditableContentWrapperProps) {
  const { isAdmin } = useAdminSession();
  const { getContent, refreshContent } = useSiteContent();
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Si no es admin, renderizar children normalmente
  if (!isAdmin) {
    return <>{children}</>;
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = async () => {
    await refreshContent();
  };

  const currentValue = getContent(keyId, '');

  // Si es admin, envolver con overlay hover
  return (
    <>
      <div
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-editable-key={keyId}
        data-content-type={contentType}
      >
        {children}
        
        {/* Overlay hover con ícono de edición */}
        {isHovered && (
          <div className="absolute inset-0 bg-orange-500/10 border-2 border-orange-500 pointer-events-none transition-all duration-200 rounded-sm">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleOpenModal();
              }}
              className="absolute top-2 right-2 w-8 h-8 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center shadow-lg pointer-events-auto transition-all duration-200 hover:scale-110 cursor-pointer z-50"
              title={`Editar ${contentType === 'image' ? 'imagen' : 'texto'}`}
            >
              <i className="ri-pencil-fill text-base"></i>
            </button>
          </div>
        )}
      </div>

      {/* Modal de edición */}
      <InlineEditorModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        keyId={keyId}
        contentType={contentType}
        currentValue={currentValue}
        onSave={handleSave}
      />
    </>
  );
}

export default EditableContentWrapper;