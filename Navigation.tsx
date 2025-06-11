import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface NavigationProps {
  onOpenForm: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onOpenForm }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  const scrollToSection = (sectionId: string) => {
    if (window.location.pathname === '/blog') {
      // Navigate from blog to main page with current language
      window.location.href = `/?lang=${language}#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToHome = () => {
    if (window.location.pathname === '/blog') {
      // Navigate from blog to main page with current language
      window.location.href = `/?lang=${language}`;
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
  };

  const navigateToBlog = () => {
    // Navigate to blog page with current language
    window.location.href = `/blog?lang=${language}`;
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: t('nav.services'), id: 'services' },
    { label: t('nav.universities'), id: 'universities' },
    { label: t('nav.blog'), action: navigateToBlog },
    { label: t('nav.about'), id: 'about' },
    { label: t('nav.faq'), id: 'faq' }
  ];

  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-lg border-b border-gray-200/30 shadow-lg
      transition-transform duration-300 ease-in-out
      ${isVisible ? 'translate-y-0' : '-translate-y-full'}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center h-28 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <button 
            onClick={scrollToHome}
            className="flex items-center hover:scale-105 transition-all duration-300 group relative"
          >
            <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse space-x-5' : 'space-x-5'}`}>
              <div className="relative">
                <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-white to-gray-50 p-3 group-hover:shadow-3xl transition-all duration-300 border-2 border-gray-100 group-hover:border-bright-blue/30">
                  <img 
                    src="/Ag logo.png" 
                    alt="AG Logo" 
                    className="w-full h-full object-contain filter drop-shadow-lg"
                  />
                </div>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-bright-blue/20 to-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"></div>
              </div>
              
              <div className={`flex flex-col ${language === 'ar' ? 'items-end' : 'items-start'}`}>
                <span className="text-3xl font-bold text-dark-blue group-hover:text-bright-blue transition-colors duration-300 tracking-tight">
                  EduConsult
                </span>
                <span className={`text-base text-gray-500 font-medium tracking-wide ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {t('nav.partner')}
                </span>
                <div className="w-0 h-0.5 bg-gradient-to-r from-bright-blue to-purple group-hover:w-full transition-all duration-500 mt-1"></div>
              </div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center ${language === 'ar' ? 'space-x-reverse space-x-8' : 'space-x-8'}`}>
            {navItems.map((item) => (
              <button
                key={item.id || 'blog'}
                onClick={() => item.action ? item.action() : scrollToSection(item.id!)}
                className={`text-gray-700 hover:text-bright-blue transition-colors duration-200 font-semibold text-lg relative group px-2 py-1 ${language === 'ar' ? 'font-arabic' : ''}`}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-bright-blue to-purple transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 text-gray-700 hover:text-bright-blue transition-colors duration-200 p-3 rounded-xl hover:bg-gradient-to-r hover:from-bright-blue/10 hover:to-purple/10 border border-gray-200 hover:border-bright-blue/30"
            >
              <Globe className="w-5 h-5" />
              <span className={`text-sm font-semibold ${language === 'ar' ? 'font-arabic' : ''}`}>
                {language === 'en' ? 'العربية' : 'English'}
              </span>
            </button>
            
            <button
              onClick={onOpenForm}
              className={`bg-gradient-to-r from-bright-blue to-purple text-white px-10 py-4 rounded-xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg border-2 border-transparent hover:border-white/20 ${language === 'ar' ? 'font-arabic' : ''}`}
            >
              {t('nav.apply')}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className={`md:hidden flex items-center ${language === 'ar' ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
            <button
              onClick={toggleLanguage}
              className="text-gray-700 hover:text-bright-blue transition-colors p-2 rounded-lg hover:bg-gray-100"
            >
              <Globe className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-bright-blue transition-colors p-2 rounded-lg hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200/30 rounded-b-2xl shadow-xl">
            <div className={`px-4 pt-4 pb-6 space-y-3 ${language === 'ar' ? 'text-right' : ''}`}>
              {navItems.map((item) => (
                <button
                  key={item.id || 'blog'}
                  onClick={() => item.action ? item.action() : scrollToSection(item.id!)}
                  className={`block w-full text-left px-4 py-3 text-gray-700 hover:text-bright-blue hover:bg-gradient-to-r hover:from-bright-blue/10 hover:to-purple/10 rounded-xl transition-all duration-200 font-semibold text-lg ${language === 'ar' ? 'text-right font-arabic' : ''}`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  onOpenForm();
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full mt-4 bg-gradient-to-r from-bright-blue to-purple text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg ${language === 'ar' ? 'font-arabic' : ''}`}
              >
                {t('nav.apply')}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;