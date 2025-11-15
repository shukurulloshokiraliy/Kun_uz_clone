import React from "react";
import { useTranslation } from 'react-i18next';
import footer_logo from "../../assets/images/footer-logo.svg";
import telegram from "../../assets/images/icon1.svg";
import facebook from "../../assets/images/icon2.svg";
import twitter from "../../assets/images/icon3.svg";
import instagram from "../../assets/images/icon4.svg";
import apple_store from "../../assets/images/apple-store.svg";
import play_market from "../../assets/images/play-market.svg";

const Footer = () => {
  const { t } = useTranslation();

  return (
    //Footer
    <footer className="bg-gray-50 py-8 border-t border-gray-200">
      <div className="container">
  
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-8">
          
       
          <div className="flex-shrink-0">
            <img src={footer_logo} alt="footer-logo" className="w-24 h-auto" />
          </div>

        
          <ul className="flex flex-wrap gap-6 lg:gap-8 text-sm lg:text-base text-gray-700">
            <li className="hover:text-gray-900 cursor-pointer transition-colors">
              {t('footer.about')}
            </li>
            <li className="hover:text-gray-900 cursor-pointer transition-colors">
              {t('footer.rss')}
            </li>
            <li className="hover:text-gray-900 cursor-pointer transition-colors">
              {t('footer.contact')}
            </li>
            <li className="hover:text-gray-900 cursor-pointer transition-colors">
              {t('footer.advertising')}
            </li>
            <li className="hover:text-gray-900 cursor-pointer transition-colors">
              {t('footer.team')}
            </li>
          </ul>

       
          <div className="flex gap-3">
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-300 hover:border-gray-400 transition-colors">
              <img src={telegram} alt="telegram" className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-300 hover:border-gray-400 transition-colors">
              <img src={facebook} alt="facebook" className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-300 hover:border-gray-400 transition-colors">
              <img src={twitter} alt="twitter" className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-300 hover:border-gray-400 transition-colors">
              <img src={instagram} alt="instagram" className="w-5 h-5" />
            </a>
          </div>

      
          <div className="flex gap-3">
            <a href="#" className="hover:opacity-80 transition-opacity">
              <img src={apple_store} alt="apple-store" className="h-10" />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <img src={play_market} alt="play-market" className="h-10" />
            </a>
          </div>
        </div>

    
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed border-t border-gray-200 pt-6">
          <p>
            {t('footer.copyright')}
          </p>

          <p>
            {t('footer.disclaimer')}
          </p>

          <p className="flex items-start">
            <span className="mr-2">Ⓣ</span>
            <span>{t('footer.commercial')}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;