import React from "react";
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/router";

const Footer = ({ siteData }) => {
    const { t } = useTranslation('common')
    const currentYear = new Date().getFullYear();
    const router = useRouter();
    const { locale } = router;

    return (
        <footer className="bg-white text-gray-700 py-5 relative z-10">
            <div className="w-full flex justify-center">
                <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20">
                    <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
                        <div className="text-center lg:text-left mt-3 lg:mt-0">
                            {t('footer.copyright')} | {currentYear}
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8 space-y-4 lg:space-y-0">
                            <div className="flex items-center justify-center space-x-4">
                                <a
                                    href={`/privacy/${locale}`}
                                    className="underline text-blue-500 font-bold hover:text-blue-700"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {t('footer.links.privacyPolicy')}
                                </a>
                                <a
                                    href={`/terms/${locale}`}
                                    className="underline text-blue-500 font-bold hover:text-blue-700"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {t('footer.links.termsOfUse')}
                                </a>
                            </div>

                            <div className="flex justify-center space-x-4">
                                {siteData?.[0].facebook && <a href={siteData[0].facebook} target="_blank" rel="noopener noreferrer" className="hover:text-blue-800">
                                    <img src="/facebook.svg" alt="Facebook" className="w-5 h-5" />
                                </a>}
                                {siteData?.[0].instagram && <a href={siteData[0].instagram} target="_blank" rel="noopener noreferrer" className="hover:text-blue-800">
                                    <img src="/instagram.svg" alt="Instagram" className="w-5 h-5" />
                                </a>}
                                {siteData?.[0].whatsapp && <a href={siteData[0].whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-blue-800">
                                    <img src="/whatsapp.svg" alt="WhatsApp" className="w-5 h-5" />
                                </a>}
                                {siteData?.[0].tiktok && <a href={siteData[0].tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-blue-800">
                                    <img src="/tiktok.svg" alt="Tiktok" className="w-5 h-5" />
                                </a>}
                                {siteData?.[0].youtube && <a href={siteData[0].youtube} target="_blank" rel="noopener noreferrer" className="hover:text-blue-800">
                                    <img src="/youtube.svg" alt="YouTube" className="w-5 h-5" />
                                </a>}
                                {siteData?.[0].linkedin && <a href={siteData[0].linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-800">
                                    <img src="/linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
                                </a>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
