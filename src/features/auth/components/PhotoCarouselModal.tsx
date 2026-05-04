import { useState, useEffect, useCallback } from 'react';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PhotoCarouselModalProps {
  photos: string[];
  selectedIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function PhotoCarouselModal({
  photos,
  selectedIndex,
  isOpen,
  onClose,
  onNavigate
}: PhotoCarouselModalProps) {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);

  // Update current index when selectedIndex changes
  useEffect(() => {
    setCurrentIndex(selectedIndex);
  }, [selectedIndex]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowLeft') {
      navigatePrev();
    } else if (e.key === 'ArrowRight') {
      navigateNext();
    }
  }, [currentIndex]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  const navigatePrev = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
    setCurrentIndex(newIndex);
    onNavigate(newIndex);
  };

  const navigateNext = () => {
    const newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    onNavigate(newIndex);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
    onNavigate(index);
  };

  if (!isOpen || photos.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex flex-col animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between p-4 text-white bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">
            Foto {currentIndex + 1} de {photos.length}
          </span>
          {photos.length > 1 && (
            <div className="hidden sm:flex gap-1">
              {photos.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    idx === currentIndex ? 'bg-white w-4' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
        
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
          aria-label="Cerrar"
        >
          <FiX size={20} />
        </button>
      </div>

      {/* Main image area */}
      <div className="flex-1 flex items-center justify-center relative px-4 sm:px-12">
        {/* Left arrow */}
        {photos.length > 1 && (
          <button
            onClick={navigatePrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 z-10"
            aria-label="Foto anterior"
          >
            <FiChevronLeft size={24} />
          </button>
        )}

        {/* Image */}
        <div className="relative max-w-full max-h-full">
          <img
            key={currentIndex}
            src={photos[currentIndex]}
            alt={`Foto ${currentIndex + 1}`}
            className="max-w-full max-h-[70vh] sm:max-h-[75vh] object-contain rounded-lg shadow-2xl animate-zoomIn"
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        {/* Right arrow */}
        {photos.length > 1 && (
          <button
            onClick={navigateNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 z-10"
            aria-label="Siguiente foto"
          >
            <FiChevronRight size={24} />
          </button>
        )}
      </div>

      {/* Thumbnail bar */}
      {photos.length > 1 && (
        <div className="bg-gradient-to-t from-black/50 to-transparent p-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent pb-2">
            {photos.map((photo, idx) => (
              <button
                key={idx}
                onClick={() => handleThumbnailClick(idx)}
                className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden transition-all ${
                  idx === currentIndex
                    ? 'ring-2 ring-white scale-105'
                    : 'opacity-50 hover:opacity-80'
                }`}
              >
                <img
                  src={photo}
                  alt={`Miniatura ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
