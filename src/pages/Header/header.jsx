import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import logo from "../../assets/images/logo-light.svg";
import reklama from "../../assets/images/reklama.svg";
import { NavLink } from 'react-router-dom';
import bookmark from "../../assets/images/bookmark.svg";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showReklama, setShowReklama] = useState(true);

  const menuItems = [
    { label: t('menu.uzbekistan'), href: "#" },
    { label: t('menu.world'), href: "#" },
    { label: t('menu.economy'), href: "#" },
    { label: t('menu.society'), href: "#" },
    { label: t('menu.sport'), href: "#" },
    { label: t('menu.technology'), href: "#" },
    { label: t('menu.audio'), href: "#" }
  ];

  const languageOptions = [
    { code: 'uz', label: "O'zbekcha" },
    { code: 'ru', label: "Русский" },
    { code: 'en', label: "English" }
  ];

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
  };

  return (
    <header>
     
      {showReklama && (
        <div className="relative container">
          <img src={reklama} alt="Reklama" className="w-full mb-4" />
          <button
            onClick={() => setShowReklama(false)}
            className="absolute top-0 right-1 w-9 h-9 bg-white rounded-full shadow-lg hover:bg-blue-200 transition-colors flex items-center justify-center"
            aria-label="Yopish"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}

   
      <nav className="bg-white border-b border-gray-200 rounded-lg container">
        <div className=" px-6 h-16 ">
          <div className="flex items-center justify-between h-full">
    
            <div className="flex items-center">
              <a href="/" className="flex-shrink-0">
                <img src={logo} alt="KUN.UZ" className="h-9" />
              </a>
            </div>

    
            <nav className="hidden lg:flex items-center space-x-9">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-gray-900 hover:text-blue-600 font-semibold text-base transition-colors whitespace-nowrap"
                >
                  {item.label}
                </a>
              ))}
                <NavLink to="/Likes">
               <div className='flex gap-2'> <img src={bookmark} alt="KUN.UZ" className="h-6" /> Saralanganlar</div>
            </NavLink>
            </nav>

        
            <div className="flex items-center space-x-3">
            
              <div className="hidden sm:flex items-center space-x-2">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeWidth="2"/>
                </svg>
                <select
                  className="bg-transparent border-none outline-none cursor-pointer text-gray-900 font-semibold text-sm pr-1"
                  onChange={handleLanguageChange}
                  value={i18n.language}
                >
                  {languageOptions.map((option) => (
                    <option key={option.code} value={option.code}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

          
              <button className="p-2 text-gray-700 hover:text-blue-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35" strokeLinecap="round"/>
                </svg>
              </button>

              
              <button
                className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg className="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

      
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="mx-auto px-6 py-4" style={{ maxWidth: '1370px' }}>
              <div className="flex flex-col space-y-1">
                {menuItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="text-gray-900 hover:text-blue-600 hover:bg-gray-50 font-semibold text-base py-3 px-2 rounded transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="pt-3 mt-3 border-t border-gray-200">
                  <div className="flex items-center space-x-2 px-2">
                    <svg className="w-5 h-5 text-gray-900 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeWidth="2"/>
                    </svg>
                    <select
                      className="bg-transparent border-none outline-none cursor-pointer text-gray-900 font-semibold text-sm flex-1"
                      onChange={handleLanguageChange}
                      value={i18n.language}
                    >
                      {languageOptions.map((option) => (
                        <option key={option.code} value={option.code}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;