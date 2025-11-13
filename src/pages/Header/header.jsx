import React from 'react'
import { useTranslation } from 'react-i18next';

const Header = props => {
    const { t, i18n } = useTranslation();
    
  const changeLanguage = (event) => {
    const newLang = event.target.value;
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };
  return (
    <div>
       <span className="font-medium">{t('tashkent')}</span>
       <select 
                  className="bg-transparent border-none outline-none cursor-pointer"
                  onChange={changeLanguage}
                  value={i18n.language}
                >
                  <option value="uz">O'zbekcha</option>
                  <option value="ru">Русский</option>
                  <option value="en">English</option>
                </select>
    </div>
  )
}



export default Header
