import Image from 'next/image';
import ArrowIcon from '../ui/icons/Arrow';
import Button from '../ui/Button';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export default function ValueSection({ features }) {
    const { t } = useTranslation('common')
    const router = useRouter();

    return (
        <section id="about" className="mt-8 relative p-8 lg:p-16 bg-white rounded-3xl">
            <div className="flex flex-col lg:flex-row items-center">
                <div className="grow">
                    <h1 className="text-3xl font-bold mb-6">
                        {t('valuesSection.title_header')}
                        <span className="bg-gradient-to-tr rounded-3xl px-3 lg:px-5 py-1 text-base sm:text-3xl mx-2 text-white inline-block transform -skew-y-3">
                            {t('valuesSection.title_header_span')}
                        </span>
                        <div className="block">
                            {t('valuesSection.title_footer')}
                        </div>
                    </h1>
                    <h5 className="text-base font-bold mb-2">
                        {t('valuesSection.valuesTitle')}
                    </h5>
                    <ul className="space-y-2 text-base">
                        {features.sort((a, b) => a.order_id - b.order_id).map(feature =>
                            <li className="flex items-center gap-2" key={feature.id}>
                                <img src="/circle.svg" alt="circle" className="w-2 h-2" />
                                <span>{feature.title}</span>
                            </li>
                        )}
                    </ul>
                    <Button
                        text={t('buttons.contact_us')}
                        IconComponent={<ArrowIcon strokeColor={"stroke-white"} />}
                        onClick={() => router.push('/#contact')}
                        classes={"mt-6 lg:mt-8 bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap h-11"}
                    />
                </div>

                {/* Image Section */}
                <div className="grid grid-cols-1 grid-cols-2 gap-4 mt-8 lg:mt-0 lg:ml-8">
                    <div className="flex flex-col gap-4">
                        <div className="flex-1">
                            <Image
                                src={`/bine_2025.jpg`}
                                alt="Image 1"
                                width={259}
                                height={134}
                                className="rounded-lg shadow-md object-cover h-full"
                            />
                        </div>
                        <div className="flex-1">
                            <Image
                                src={`/absheron_2025.jpg`}
                                alt="Image 2"
                                width={259}
                                height={134}
                                className="rounded-lg shadow-md object-cover h-full"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="h-full">
                            <Image
                                src={`/sederek_2025.jpg`}
                                alt="Image 2"
                                width={259}
                                height={347}
                                className="rounded-lg shadow-md object-cover h-full"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
