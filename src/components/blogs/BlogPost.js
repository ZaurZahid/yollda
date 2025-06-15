import React from 'react'
import { useTranslation } from 'next-i18next';
import Breadcrumb from '../ui/Breadcrumb';
import Facebook from '../ui/icons/Facebook';
import Linkedin from '../ui/icons/Linkedin';

function BlogPost({ post }) {
    const { t } = useTranslation('common')

    const breadcrumbItems = [
        { label: t('navigation.home'), url: '/' },
        { label: t('navigation.blog'), url: '/blogs' },
        { label: post.short_content, url: '' },
    ];

    const shareToSocial = (platform) => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(post.title);

        if (platform === 'facebook') {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        } else if (platform === 'twitter') {
            window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
        } else if (platform === 'linkedin') {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
        }
    };

    return (
        <div className="lg:mt-8 mb-14 flex flex-col items-center justify-center relative z-10">
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex flex-col w-full">
                <h1 className="text-3xl font-bold text-gray-800 text-center">
                    {post.title}
                </h1>
                <img
                    className="w-full rounded-3xl mt-8 min-h-72 max-h-80 object-cover"
                    src={post.image}
                    alt="Blog post image"
                />
            </div>
            <div
                className="prose text-gray-700 my-8 max-w-3xl w-full px-8 md:px-16"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <div className="max-w-3xl w-full px-8 md:px-16">
                <h6 className="text-xs font-bold text-gray-800 mb-3">
                    {t('buttons.share')}:
                </h6>
                <div className="flex space-x-4">
                    <button
                        onClick={() => shareToSocial('facebook')}
                        className="bg-blue-200 text-white py-4 px-5 rounded-xl hover:bg-blue-600 group transition duration-300"
                    >
                        <Facebook className="stroke-black group-hover:stroke-white transition duration-300" />
                    </button>
                    <button
                        onClick={() => shareToSocial('linkedin')}
                        className="bg-blue-200 text-white py-4 px-5 rounded-xl hover:bg-blue-600 group transition duration-300"
                    >
                        <Linkedin className="stroke-black group-hover:stroke-white transition duration-300" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BlogPost