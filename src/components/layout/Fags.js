import Star from "../ui/icons/Star";
import Accordion from './../ui/Accordion';
import { useTranslation } from 'next-i18next';

export default function Fags({ fags }) {
    const { t } = useTranslation('common')

    return (
        <div id="fag" className="mt-8 relative py-14 lg:py-16">
            <div className="text-center mb-8 lg:mb-14">
                <div className="relative inline-block">
                    <h2 className="text-3xl font-bold text-gray-900">{t('faqSection.title')}</h2>
                    <Star className="absolute right-0 top-0 transform translate-x-10 -translate-y-6 w-10 lg:w-12 h-10 lg:h-12" />
                </div>
                <p className="text-gray-600 mt-2">{t('faqSection.subtitle')}</p>
            </div>


            <Accordion data={fags} />
        </div>
    );
}
