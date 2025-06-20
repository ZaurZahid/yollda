// components/LanguageSwitcher.js
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

export default function LanguageSwitcher() {
    const router = useRouter();
    const { locale, locales, pathname, query, asPath } = router;
    const [isOpen, setIsOpen] = useState(false);

    const handleLocaleChange = (value) => {
        setIsOpen(false)
        router.push({ pathname, query }, asPath, { locale: value });
    };

    const dropdownRef = useRef(null);

    // Close the dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const localeDisplayNames = {
        az: 'Azerbaijan',
        en: 'English',
        'ar-AE': 'United Arab Emirates'
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-s-2 p-1 rounded cursor-pointer font-bold transition duration-500 ease-in-out">
                <img src={`/${locale}-flag.png`} alt={`/${locale} flag`} className="w-5 h-5" />
                <span>{locale.toUpperCase()}</span>
            </button>

            {isOpen && (
                <div className="absolute left-1/2 transform -translate-x-1/2 w-[200px] sm:w-[280px] lg:w-[440px] max-h-[300px] mt-4 lg:mt-6 p-4 lg:p-8 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-y-auto transition duration-500 ease-in-out">
                    <ul className="">
                        {locales.map(lang => (
                            <li
                                key={lang}
                                className={`flex items-center justify-between mt-2 py-2 lg:py-4 px-3 lg:px-6 rounded-xl border border-gray-200 cursor-pointer text-gray-700 ${locale === lang ? 'bg-green-button-light' : 'hover:bg-gray-100'}`}
                                onClick={() => handleLocaleChange(lang)}
                            >
                                <div className="flex items-center space-s-2">
                                    <img src={`/${lang}-flag.png`} alt={`${lang} flag`} className="w-5 h-5" />
                                    <span className="font-bold text-sm">{localeDisplayNames[lang]}</span>
                                </div>

                                <div
                                    className={`min-w-5 min-h-5 rounded-full border-2 flex items-center justify-center ml-1 ${locale === lang ? 'border-green-500' : 'border-gray-400'
                                        }`}
                                >
                                    {<div className={`w-2.5 h-2.5 border-2 ${locale === lang ? 'border-green-500 bg-green-500' : 'border-gray-400'} rounded-full`} />}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
