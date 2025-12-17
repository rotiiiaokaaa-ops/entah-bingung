import React, { useRef } from 'react';
import { Camera, Heart, Edit2 } from 'lucide-react';

interface PhotoFrameProps {
  photo: string;
  name: string;
  label: string;
  color: string;
  isEditable: boolean;
  onPhotoChange: (file: File) => void;
  onNameChange: (name: string) => void;
}

const PhotoFrame: React.FC<PhotoFrameProps> = ({ 
  photo, 
  name, 
  label, 
  color,
  isEditable,
  onPhotoChange,
  onNameChange 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onPhotoChange(e.target.files[0]);
    }
  };

  const handleDivClick = () => {
    if (isEditable) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={`relative group transform transition-all duration-500 hover:scale-105 hover:z-10 w-full max-w-sm mx-auto`}>
      {/* Polaroid Frame */}
      <div 
        className={`bg-white p-4 pb-16 shadow-2xl rotate-1 group-hover:rotate-0 transition-transform duration-500 border-4 ${color === 'blue' ? 'border-blue-200' : 'border-pink-200'}`}
        style={{ borderRadius: '2px' }}
      >
        {/* Image Area */}
        <div 
          className={`relative aspect-square overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 transition-colors ${isEditable ? 'cursor-pointer hover:border-pink-400' : 'cursor-default'}`}
          onClick={handleDivClick}
        >
          <img 
            src={photo} 
            alt={label} 
            className="w-full h-full object-cover" 
          />
          
          {/* Overlay on Hover - Only show camera if editable */}
          {isEditable && (
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="bg-white/90 p-3 rounded-full text-pink-500">
                <Camera size={24} />
              </div>
            </div>
          )}
          
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*"
            disabled={!isEditable}
            onChange={handleFileChange}
          />
        </div>

        {/* Decorative Tape */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-yellow-200/80 rotate-2 shadow-sm"></div>

        {/* Name Input */}
        <div className="absolute bottom-4 left-0 w-full px-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <input 
              type="text" 
              value={name}
              readOnly={!isEditable}
              onChange={(e) => onNameChange(e.target.value)}
              className={`font-handwriting text-3xl text-gray-700 text-center bg-transparent border-b border-transparent w-full ${isEditable ? 'hover:border-gray-300 focus:border-pink-500 focus:outline-none' : 'pointer-events-none'}`}
              placeholder={`Masukkan Nama`}
            />
            {isEditable && <Edit2 size={14} className="text-gray-400 opacity-50" />}
          </div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">{label}</p>
        </div>
      </div>

      {/* Floating Elements */}
      <div className={`absolute -top-6 -right-6 text-${color === 'blue' ? 'blue' : 'pink'}-400 animate-bounce`}>
        <Heart fill="currentColor" size={40} />
      </div>
    </div>
  );
};

export default PhotoFrame;