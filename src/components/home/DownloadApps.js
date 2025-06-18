import React, { useState } from "react";
import { useTranslation } from 'next-i18next';

export default function DownloadApps() {
    const { t } = useTranslation('common')
    const [selectedApp, setSelectedApp] = useState('yollda');

    return (
        <section className="w-full flex justify-center bg-green-dark text-white pt-16 lg:pt-20">
            <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20">
                {/* Main Heading */}
                <h1 className="font-secondary text-h1-responsive uppercase text-center font-extrabold leading-tight">
                    Download our apps
                </h1>
                {/* Description */}
                <p className="mt-4 text-h6-responsive text-center">
                    Available for iOS and Android devices.
                </p>

                <div className="lg:-mt-24 flex flex-col lg:flex-row lg:justify-between">
                    <div className="mt-12 lg:mt-0 lg:mr-12 flex flex-col justify-center text-center lg:text-start">
                        <div className="mb-6">
                            <div className="inline-flex space-x-2 p-2 rounded-xl bg-green-secondary-dark">
                                <button className={`px-6 py-1 rounded-xl text-span-small-responsive duration-200 ${selectedApp === 'yollda' ? "bg-green-dark text-white font-medium" : 'text-gray-500'} `} onClick={() => setSelectedApp('yollda')}>
                                    Yollda
                                </button>
                                <button className={`px-6 py-1 rounded-xl text-span-small-responsive duration-200 ${selectedApp === 'yollda_partner' ? "bg-green-dark text-white font-medium" : 'text-gray-500'} `} onClick={() => setSelectedApp('yollda_partner')}>
                                    Yollda Partner
                                </button>
                            </div>
                        </div>

                        <h4 className="mb-6 text-h4-responsive font-bold">
                            Roadside help. Anytime, anywhere.
                        </h4>

                        <p className="mb-6 text-span-responsive">
                            {t('footer.available_text')}
                        </p>

                        <div>
                            <a
                                href={'siteData?.[0]?.linkedin'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex bg-light-green text-white font-bold px-6 py-3 rounded-2xl text-button-responsive transition-all duration-200 transform hover:scale-105"
                            >
                                Get Yollda
                            </a>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        {/* laptop 4x image */}
                        <div className="hidden lg:block -mr-20 select-none pointer-events-none">
                            <img
                                src={'/phone-4x.png'}
                                alt="phone image 4x"
                                className="w-[700px] object-cover"
                            />
                        </div>

                        {/* tablet 3x image */}
                        <div className="hidden md:block lg:hidden -mt-12 select-none pointer-events-none">
                            <img
                                src={'/phone-3x.png'}
                                alt="phone image 3x"
                                className="w-[600px] object-cover"
                            />
                        </div>

                        {/* mobile 2x image */}
                        <div className="block md:hidden select-none pointer-events-none">
                            <img
                                src={'/phone-2x.png'}
                                alt="phone image 2x"
                                className="w-[300px] object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}