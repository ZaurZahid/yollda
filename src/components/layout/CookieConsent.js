import { useState, useEffect } from "react";
import Button from './../ui/Button';
import { useTranslation } from 'next-i18next';

const CookieConsent = () => {
    const { t } = useTranslation('common')
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user already responded to the cookie consent
        const consent = localStorage.getItem("cookieConsent");
        if (consent !== 'accepted') {
            setIsVisible(true);
        }
    }, []);

    const handleConsent = (response) => {
        localStorage.setItem("cookieConsent", response);
        setIsVisible(false);
    };

    if (!isVisible) return null; // Hide the banner if not needed

    return (
        <>
            <div className="fixed inset-0 bg-white/50 backdrop-blur-sm z-40"></div>{/* Background Blurring Overlay */}

            <div className="fixed bottom-6 left-0 w-full z-50">
                <div className="flex flex-col md:flex-row md:items-center justify-between mx-6 sm:mx-8 md:mx-16 lg:mx-20 rounded-3xl p-5 md:p-6 bg-white shadow-xl">
                    <div className="flex items-center space-x-4">
                        <img
                            src="/cookie.svg"
                            alt="Cookie Icon"
                            className="w-14 h-14 md:w-16 md:h-16"
                        />
                        <div>
                            <h1 className="text-gray-900 font-bold md:text-sm lg:text-xl">
                                {t('cookieConsentModal.message')}
                            </h1>
                            <p className="text-gray-700 mt-2 md:text-xs lg:text-base">
                                {t('cookieConsentModal.disclaimer')}
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 md:mt-0 ml-auto md:ml-6 flex flex-row space-x-4">
                        <Button
                            text={t('buttons.decline')}
                            onClick={() => handleConsent("declined")}
                            classes={"bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded whitespace-nowrap h-10"}
                        />
                        <Button
                            text={t('buttons.accept')}
                            onClick={() => handleConsent("accepted")}
                            classes={"bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded whitespace-nowrap h-10"}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CookieConsent;
