import Link from 'next/link'
import React from 'react'
import { trimText } from '../../hooks/trimText'

function Articles({ articles }) {
    return (
        <div className="space-y-8 mt-10 md:mt-20">
            {/* Long Article Column */}
            <div className="space-y-8">
                {articles/* .filter(article => article.size === 'medium') */.slice(1, 2).map((article) => (
                    <Link
                        href={`/news/${article.id}`}
                        key={article.id}
                        className="inline-flex w-full group cursor-pointer bg-white hover:bg-gray-50 rounded-2xl transition-all duration-300 hover:shadow-lg"
                    >
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Image */}
                            <div className="flex-shrink-0">
                                <div className="md:w-80 h-[200px] md:h-80 rounded-t-xl md:rounded-xl md:rounded-r-none overflow-hidden">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 space-y-4 mt-auto mb-auto p-4 md:p-6 md:pl-0">
                                {/* Category */}
                                <div className="inline-block">
                                    <span className="text-light-green rounded-full text-span-small-responsive font-medium">
                                        {article.category}
                                    </span>
                                </div>

                                {/* Title */}
                                <h5 className="text-h5-responsive lg:w-[90%] font-bold text-gray-700 leading-tight group-hover:text-green-dark transition-colors duration-200">
                                    {trimText(article.title, 100)}
                                </h5>

                                {/* Date */}
                                <div className="flex items-center text-span-small-responsive text-gray-500">
                                    {article.date}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Medium Articles Column */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Large Article */}
                {articles/* .filter(article => article.size === 'large') */.slice(1, 3).map((article) => (
                    <Link href={`/news/${article.id}`} key={article.id} className="group cursor-pointer">
                        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                            <div className="h-[200px] md:h-[400px] overflow-hidden">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="px-6 py-16">
                                <div className="inline-block mb-3">
                                    <span className="bg-white text-light-green rounded-full text-span-small-responsive font-medium">
                                        {article.category}
                                    </span>
                                </div>
                                <h5 className="text-h5-responsive md:w-[90%] font-semibold text-gray-700 leading-tight mb-3 group-hover:text-green-dark transition-colors duration-200">
                                    {article.title}
                                </h5>
                                <div className="flex items-center text-span-small-responsive text-gray-500">
                                    <span>{article.date}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Third Row - Small Articles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {articles/* .filter(article => article.size === 'small') */.slice(1, 4).map((article) => (
                    <Link href={`/news/${article.id}`} key={article.id} className="group cursor-pointer">
                        <div className="bg-green-dark rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
                            <div className="overflow-hidden h-[250px] lg:h-[350px]">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                <div className="inline-block mb-2">
                                    <span className="bg-light-green text-white px-2 py-1 rounded-xl text-span-small-responsive font-medium">
                                        {article.category}
                                    </span>
                                </div>
                                <h5 className="text-h5-responsive font-semibold leading-tight">
                                    {article.title}
                                </h5>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Long Article Column */}
            <div className="space-y-8">
                {articles/* .filter(article => article.size === 'medium') */.slice(1, 2).map((article) => (
                    <Link
                        href={`/news/${article.id}`}
                        key={article.id}
                        className="inline-flex w-full group cursor-pointer bg-white hover:bg-gray-50 rounded-2xl transition-all duration-300 hover:shadow-lg"
                    >
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Image */}
                            <div className="flex-shrink-0">
                                <div className="md:w-80 h-[200px] md:h-80 rounded-t-xl md:rounded-xl md:rounded-r-none overflow-hidden">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 space-y-4 mt-auto mb-auto p-4 md:p-6 md:pl-0">
                                {/* Category */}
                                <div className="inline-block">
                                    <span className="text-light-green rounded-full text-span-small-responsive font-medium">
                                        {article.category}
                                    </span>
                                </div>

                                {/* Title */}
                                <h5 className="text-h5-responsive lg:w-[90%] font-bold text-gray-700 leading-tight group-hover:text-green-dark transition-colors duration-200">
                                    {trimText(article.title, 100)}
                                </h5>

                                {/* Date */}
                                <div className="flex items-center text-span-small-responsive text-gray-500">
                                    {article.date}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Articles