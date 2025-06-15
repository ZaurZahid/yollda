import React from 'react'
import Star from './../ui/icons/Star';
import BlogList from './../blogs/BlogList';
import Button from '../ui/Button';
import ArrowIcon from '../ui/icons/Arrow';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

function BlogSection({ blogsData }) {
    const { t } = useTranslation('common')
    const router = useRouter();

    return (
        <div id="blogs" className="relative p-8 lg:p-16 bg-white rounded-3xl overflow-hidden">
            <Star className="absolute left-2 lg:left-6 top-3 lg:top-9 w-10 lg:w-12 h-10 lg:h-12" />

            <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex flex-col">
                    <h1 className="text-3xl mt-3 font-bold text-gray-800">
                        {t('blogSection.title')}
                    </h1>
                    <p className="text-gray-600 mt-1 lg:mt-3">
                        {t('blogSection.subtitle')}
                    </p>
                </div>
                <Button
                    text={t('buttons.read_more')}
                    IconComponent={<ArrowIcon strokeColor={"stroke-black"} />}
                    onClick={() => router.push('/blogs')}
                    classes={"hidden md:flex mt-6 lg:mt-0 md:ml-6 bg-gray-200 hover:bg-gray-300 text-black whitespace-nowrap h-11"}
                />
            </div>

            <BlogList blogs={blogsData} />

            <Button
                text={t('buttons.read_more')}
                IconComponent={<ArrowIcon strokeColor={"stroke-black"} />}
                onClick={() => router.push('/blogs')}
                classes={"md:hidden mt-12 bg-gray-200 hover:bg-gray-300 text-black whitespace-nowrap h-11 relative z-10"}
            />

            <img src="/ellipse-blue.svg" alt="ellipse blue" className='absolute left-0 bottom-0' />
            <img src="/ellipse-green.svg" alt="ellipse green" className='absolute left-20 bottom-0' />
        </div>
    )
}

export default BlogSection