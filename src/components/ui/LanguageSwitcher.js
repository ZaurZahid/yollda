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

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2 p-1 rounded cursor-pointer font-bold transition duration-500 ease-in-out">
                <img src={`/${locale}-flag.png`} alt={`/${locale} flag`} className="w-5 h-5" />
                <span>{locale.toUpperCase()}</span>
            </button>

            {isOpen && (
                <ul className="absolute w-16 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden transition duration-500 ease-in-out">
                    {locales.map(lang => (
                        <li
                            key={lang}
                            className={`flex items-center space-x-2 p-2 cursor-pointer ${locale === lang ? 'bg-blue-600 text-white' : 'text-gray-900 hover:bg-gray-100'}`}
                            onClick={() => handleLocaleChange(lang)}
                        >
                            <img src={`/${lang}-flag.png`} alt={`${lang} flag`} className="w-5 h-5" />
                            <span className="font-bold text-sm">{lang.toUpperCase()}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
