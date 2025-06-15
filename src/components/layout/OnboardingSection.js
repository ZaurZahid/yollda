import React from 'react';
import Star from '../ui/icons/Star';
import { useTranslation } from 'next-i18next';
import WhitelistJoinForm from '../ui/WhitelistJoinForm';

function OnboardingSection({ centers }) {
    const { t } = useTranslation('common');

    return (
        <section className="pb-[24rem] sm:pb-[34rem] lg:pb-8 py-4 lg:py-12 rounded-3xl">
            <div className="flex flex-col lg:flex-row">
                <div className="max-w-none lg:max-w-sm xl:max-w-xl relative z-10">
                    <Star className="absolute -left-6 lg:-left-8 -top-6 lg:-top-8 w-10 lg:w-12 h-10 lg:h-12" />

                    <h1 className="text-3xl font-bold mb-5">
                        {t('onboarding.title_header')}
                        <span className="bg-gradient-to-orange rounded-3xl px-3 lg:px-5 py-1 text-base sm:text-3xl mx-2 text-white inline-block transform -skew-y-3">
                            {t('onboarding.title_header_span')}
                        </span>
                        <div className="block">{t('onboarding.title_footer')}</div>
                    </h1>
                    <p className="text-gray-600 mb-6">{t('onboarding.subtitle')}</p>
                    <div className="bg-white lg:shadow-sm p-6 rounded-lg z-10">
                        <WhitelistJoinForm centers={centers} />
                    </div>
                </div>

                {/* Image Section */}
                <div className="grow lg:ml-8 relative">
                    <img
                        src="/phones-gradient-2x.png"
                        alt="phones gradient"
                        className="max-h-96 absolute top-24 lg:top-16 right-16 sm:right-48 lg:right-44 xxl:right-0 scale-[1.6] sm:scale-[1.4] lg:scale-[2.1]"
                    />
                </div>
            </div>
        </section>
    );
}

export default OnboardingSection;