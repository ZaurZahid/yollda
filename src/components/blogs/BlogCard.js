import React from 'react';
import Link from 'next/link';
import { formatDate } from '../../hooks/formatDate';

const BlogCard = ({ post: { id, title, created_at, image, content, short_content } }) => {
    return (
        <Link href={`/blogs/${id}`} className="block border border-solid border-1 border-white max-w-sm rounded-3xl overflow-hidden p-6 hover:shadow-lg transition-shadow duration-300 relative z-10">
            <img
                className="w-full rounded-3xl object-cover h-44 md:h-56"
                src={image}
                alt="Blog image"
            />
            <div className="pt-6">
                <div className="text-gray-600 text-sm">{formatDate(created_at)}</div>
                <div className="text-gray-900 font-bold text-xl pt-2">{title}</div>
                <div
                    className="prose text-gray-700 text-base pt-4"
                    dangerouslySetInnerHTML={{ __html: short_content }}
                />
            </div>
        </Link>
    );
};

export default BlogCard;