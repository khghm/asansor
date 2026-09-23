import React from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  category?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt, className = '' }) => {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
    />
  );
};

export default ImageWithFallback;
