import React from 'react';
import Link from 'next/link';
import { formatDate } from '../../hooks/formatDate';

const BlogCard = ({ post: { id, title, date, image, category } }) => {
    return (
        <Link
            href={`/blogs/${id}`}
            key={id}
            className="inline-flex pointer-events-none w-full group cursor-pointer bg-white hover:bg-gray-50 rounded-2xl transition-all duration-300 hover:shadow-lg"
        >
            <div className="flex flex-col md:flex-row gap-6">
                {/* Image */}
                <div className="md:w-80 flex-shrink-0">
                    <div className="aspect-video w-full rounded-xl md:rounded-r-none overflow-hidden">
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4 mt-auto mb-auto p-4 md:p-6 md:pl-0">
                    {/* Category */}
                    <div className="inline-block">
                        <span className="bg-light-green/10 text-gray-700 px-3 py-1 rounded-full text-span-small-responsive font-medium">
                            {category}
                        </span>
                    </div>

                    {/* Title */}
                    <h5 className="text-h5-responsive font-bold text-gray-700 leading-tight group-hover:text-green-dark transition-colors duration-200">
                        {title}
                    </h5>

                    {/* Date */}
                    <div className="flex items-center text-span-small-responsive text-gray-500">
                        {date}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;