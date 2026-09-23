import React, { useState } from 'react';
import { Package } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt, className = '' }) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center ${className}`}>
        <div className="text-center">
          <Package size={48} className="mx-auto text-blue-300 mb-2" />
          <p className="text-xs text-blue-400 font-medium">تصویر در دسترس نیست</p>
        </div>
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
      onError={() => setError(true)}
    />
  );
};

export default ImageWithFallback;
