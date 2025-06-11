import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const WhatsAppButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = "+905391357686";
    const message = t('whatsapp.message');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className={`
      fixed bottom-6 right-6 z-50 transition-all duration-500 ease-out
      ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}
    `}>
      {/* Tooltip */}
      <div className={`
        absolute bottom-full right-0 mb-3 px-4 py-2 bg-dark-blue text-white text-sm font-medium rounded-lg shadow-lg
        transition-all duration-300 whitespace-nowrap
        ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}
      `}>
        <div className="relative">
          {t('whatsapp.tooltip')}
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-dark-blue"></div>
        </div>
      </div>

      {/* Main WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group"
      >
        {/* Outer pulse ring */}
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75 scale-110"></div>
        
        {/* Middle pulse ring */}
        <div className="absolute inset-0 rounded-full bg-green-400 animate-pulse opacity-60 scale-105"></div>
        
        {/* Main button */}
        <div className={`
          relative w-16 h-16 rounded-full 
          flex items-center justify-center shadow-2xl transform transition-all duration-300
          hover:scale-110 hover:shadow-3xl
          ${isHovered ? 'animate-bounce' : 'animate-pulse'}
        `}>
          <img 
            src="/sas.svg" 
            alt="WhatsApp" 
            className="w-16 h-16 drop-shadow-lg"
          />
          
          {/* Notification badge */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-green-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
      </button>

      {/* Secondary action button (appears on hover) */}
      <div className={`
        absolute bottom-20 right-0 transition-all duration-300
        ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}>
        <button
          onClick={() => {
            const phoneNumber = "+905391357686";
            window.open(`tel:${phoneNumber}`, '_self');
          }}
          className="w-12 h-12 bg-gradient-to-br from-bright-blue to-blue-purple rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <Phone className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default WhatsAppButton;