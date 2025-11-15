import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
      const { t } = useTranslation();
    const handleGoHome = () => {
        window.location.href = '/';
    };

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div className=" h-[400px]  flex items-center justify-center ">
            <div className="max-w-2xl w-full text-center">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-gray-800 mb-4">404</h1>
                  
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t('notfound.notweb')}
                </h2>



                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={handleGoHome}
                        className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                        {t('notfound.home')}
                    </button>


                </div>


            </div>
        </div>
    );
};

export default NotFound;