import React from 'react'
import Star from '../ui/icons/Star';
import Breadcrumb from './../ui/Breadcrumb';
import SvgInteractive from '../ui/SvgInteractive';
import { useTranslation } from 'next-i18next';

function CentersPage({ centerDetail }) {
    const { t } = useTranslation('common')

    const breadcrumbItems = [
        { label: t('navigation.home'), url: '/' },
        { label: centerDetail.name, url: '' },
    ];

    return (
        <div className="lg:mt-4 mb-16 relative p-8 lg:p-16 bg-white rounded-3xl z-10">
            <Star className="absolute left-2 lg:left-6 top-3 lg:top-9 w-10 lg:w-12 h-10 lg:h-12" />

            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                <div className="flex flex-col">
                    <Breadcrumb items={breadcrumbItems} />
                    <h1 className="text-3xl font-bold text-gray-800">
                        {centerDetail.name}
                    </h1>
                </div>

                <div className="mt-4 lg:mt-0 ml-0 lg:ml-4 p-2 bg-gray-100 rounded-2xl flex">
                    <div className="min-w-11 h-11 flex items-center justify-center bg-green-500 rounded-2xl">
                        <img src="/location-tick-white.svg" alt="location-tick" className="w-5 h-5 lg:w-6 lg:h-6" />
                    </div>
                    <div className="ml-2">
                        <h3 className="text-gray-600 text-sm"> {t('mapSection.location')}</h3>
                        <h3 className="text-base font-bold text-black">{centerDetail.address}</h3>
                    </div>
                </div>

            </div>
            {/* <div className="flex flex-col mt-8">
                <h1 className="text-xs text-gray-800">
                    {t('mapSection.inner_map_title')}
                </h1>
                <div className="mt-4 bg-gray-200 rounded-2xl overflow-auto">
                    <SvgInteractive svgFile="/YAZILI.svg" className='rounded-2xl min-w-[50rem] min-h-[30rem]' />
                      <img src="/YAZILI.svg" alt="map" className='rounded-2xl min-w-[50rem]' />  
                </div>
            </div> */}
        </div>
    )
}

export default CentersPage