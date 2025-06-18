import { useState } from 'react';
import Link from 'next/link';

const newsArticles = [
    {
        id: 1,
        title: "Yollda is your trusted roadside assistant",
        date: "March 8, 2022",
        image: "https://images.pexels.com/photos/3964704/pexels-photo-3964704.jpeg?auto=compress&cs=tinysrgb&w=800",
        featured: true
    },
    {
        id: 2,
        title: "Yollda is your trusted roadside assistant",
        date: "March 8, 2022",
        image: "https://images.pexels.com/photos/4173624/pexels-photo-4173624.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: 3,
        title: "Yollda is your trusted roadside assistant",
        date: "March 8, 2022",
        image: "https://images.pexels.com/photos/3807738/pexels-photo-3807738.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: 4,
        title: "Yollda is your trusted roadside assistant",
        date: "March 8, 2022",
        image: "https://images.pexels.com/photos/5835359/pexels-photo-5835359.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: 5,
        title: "Yollda is your trusted roadside assistant",
        date: "March 8, 2022",
        image: "https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: 6,
        title: "Yollda is your trusted roadside assistant",
        date: "March 8, 2022",
        image: "https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
];

export default function NewsUpdates() {
    return (
        <div className="w-full flex justify-center py-16 lg:py-24">
            <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20">
                <div className="flex flex-col">
                    <h1 className="font-secondary text-h1-responsive uppercase font-extrabold text-green-dark text-center">
                        News & Update
                    </h1>

                    <h6 className="text-h6-responsive mt-9 text-gray-500 text-center">
                        Get the latest news, updates, and feature releases. Discover what's new on the road with Yollda.
                    </h6>
                </div>

                {/* Services Grid */}
                <div className="space-y-12 lg:space-y-16 mt-8 lg:mt-10">
                    {/* Desktop Layout */}
                    <div className="grid grid-cols-12 gap-6">
                        {/* Large Featured Article - Left */}
                        <div className="col-span-12 md:col-span-6 lg:col-span-4">
                            <Link href={`/news/${newsArticles[0].id}`} className="flex bg-green-dark rounded-2xl overflow-hidden shadow-xl h-[400px] md:h-[500px] relative group cursor-pointer">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
                                <img
                                    src={newsArticles[0].image}
                                    alt={newsArticles[0].title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                                    <h3 className="lg:w-[80%] text-h4-responsive font-bold text-white leading-tight">
                                        {newsArticles[0].title}
                                    </h3>
                                </div>
                            </Link>
                        </div>

                        {/* Middle Column - Article List */}
                        <div className="col-span-12 md:col-span-6 lg:col-span-4 space-y-4 flex flex-col justify-between">
                            {newsArticles.slice(1, 4).map((article) => (
                                <Link href={`/news/${article.id}`} key={article.id} className="flex items-center space-x-4 h-[30%] rounded-xl cursor-pointer group">
                                    <div className="flex-shrink-0">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-32 h-32 rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-span-responsive font-semibold text-gray-600 line-clamp-2 mb-2">
                                            {article.title}
                                        </h4>
                                        <div className="flex items-center text-span-small-responsive text-gray-500">
                                            <img src="/calendar.svg" className="mr-1" alt="calendar icon" />
                                            {article.date}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Right Column - Two Large Cards */}
                        <div className="col-span-12 lg:col-span-4 space-y-6 md:space-y-0 lg:space-y-6 flex flex-col md:flex-row lg:flex-col justify-between md:mt-4 lg:mt-0">
                            {newsArticles.slice(4, 6).map((article) => (
                                <Link href={`/news/${article.id}`} key={article.id} className="flex bg-green-dark rounded-2xl overflow-hidden shadow-xl md:w-[48%] lg:w-full h-[200px] lg:h-[47%] relative group cursor-pointer">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                                        <h3 className="text-h6-responsive font-bold text-white leading-tight">
                                            {article.title}
                                        </h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 