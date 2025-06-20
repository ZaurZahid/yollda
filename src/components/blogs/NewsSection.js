import { useState } from "react";
import NewsList from "./NewsList";
import Pagination from "../ui/Pagination";
import { useTranslation } from 'next-i18next';
import ArrowDown from "../ui/icons/ArrowDown";
import HelpBanner from "../layout/HelpBanner";

const newsArticles = [
    {
        id: 1,
        title: "Bolt joins UN Global Compact: strengthening our commitment to sustainabilityGlobal Compact: strengthening our commitment to sustainabilityGlobal Compact: strengthening our commitment to sustainabilityGlobal Compact: strengthening our commitment to sustainabilityGlobal Compact: strengthening our commitment to sustainability strengthening our commitment to sustainability",
        category: "Sustainability",
        date: "April 24, 2025",
        image: "https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: 2,
        title: "Bolt joins UN Global Compact: strengthening our commitment to sustainability",
        category: "Sustainability",
        date: "April 24, 2025",
        image: "https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: 3,
        title: "Bolt joins UN Global Compact: strengthening our commitment to sustainability",
        category: "Sustainability",
        date: "April 24, 2025",
        image: "https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: 4,
        title: "New electric vehicle fleet expansion across major cities",
        category: "Technology",
        date: "April 20, 2025",
        image: "https://images.pexels.com/photos/3964704/pexels-photo-3964704.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: 5,
        title: "Partnership announcement with local transportation authorities",
        category: "Business",
        date: "April 18, 2025",
        image: "https://images.pexels.com/photos/4173624/pexels-photo-4173624.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: 6,
        title: "Safety improvements and new driver training programs launched",
        category: "Safety",
        date: "April 15, 2025",
        image: "https://images.pexels.com/photos/3807738/pexels-photo-3807738.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
];

const categories = ['All', 'Sustainability', 'Technology', 'Business', 'Safety'];
const regions = ['Global', 'North America', 'Europe', 'Asia Pacific'];

export default function NewsSection({ newsData }) {
    const { t } = useTranslation('common');
    const { i18n } = useTranslation();

    // Pagination State
    const [currentPage, setCurrentPage] = useState(newsData.current_page || 1); // Default from SSR
    const [itemsPerPage] = useState(newsData.per_page || 10);
    const [news, setNews] = useState(newsData.results || []); // New results
    const [totalItems, setTotalItems] = useState(newsData.total || 99); // Total number of items

    const [selectedCategory, setSelectedCategory] = useState('News');
    const [selectedRegion, setSelectedRegion] = useState('Global');
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isRegionOpen, setIsRegionOpen] = useState(false);
    const [filteredArticles, setFilteredArticles] = useState(newsArticles);

    // Function to fetch data for a specific page
    const fetchNews = async (page, perPage) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/support/new/?page=${page}&per_page=${perPage}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': i18n?.language || 'az',
                },
            });
            const data = await response.json();

            setCurrentPage(data.current_page);
            setNews(data.results);
            setTotalItems(data.total);

            // Scroll to top smoothly after data is loaded
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);//helelik

        // fetchNews(pageNumber, itemsPerPage);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setIsCategoryOpen(false);
        filterArticles(category, selectedRegion);
    };

    const handleRegionChange = (region) => {
        setSelectedRegion(region);
        setIsRegionOpen(false);
        filterArticles(selectedCategory, region);
    };

    const filterArticles = (category, region) => {
        let filtered = newsArticles;

        if (category !== 'News' && category !== 'All') {
            filtered = filtered.filter(article => article.category === category);
        }

        // Region filtering logic would go here
        // For now, we'll show all articles regardless of region

        setFilteredArticles(filtered);
    };

    return (
        <div className="w-full flex justify-center pb-12 lg:pb-20">
            <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20">
                <div className="flex flex-col">
                    <h1 className="font-secondary lg:w-[70%] text-h2-responsive uppercase font-extrabold text-green-dark">
                        Ride out as soon as you fly in with Flight Tracking
                    </h1>
                    <p className="text-gray-400 mt-2 lg:mt-5">
                        Keep yourself updated on the latest news from Bolt and the world of transportation.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mt-10 lg:mt-20">
                    {/* Category Filter */}
                    <div className="relative flex-1">
                        <button
                            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                            className="w-full bg-light-green/10 border border-light-green/20 rounded-xl px-4 py-3 text-left flex items-center justify-between text-green-dark hover:bg-light-green/20 rounded-xl transition-colors duration-200"
                        >
                            <span className="text-span-responsive font-medium">{selectedCategory}</span>
                            <ArrowDown strokeColor={`stroke-gray-500`} className={`transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isCategoryOpen && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                                {['News', ...categories].map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => handleCategoryChange(category)}
                                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 text-span-responsive first:rounded-t-lg last:rounded-b-lg"
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Region Filter */}
                    <div className="relative flex-1">
                        <button
                            onClick={() => setIsRegionOpen(!isRegionOpen)}
                            className="w-full bg-light-green/10 border border-light-green/20 rounded-xl px-4 py-3 text-left flex items-center justify-between text-green-dark hover:bg-light-green/20 rounded-xl transition-colors duration-200"
                        >
                            <span className="text-span-responsive font-medium">{selectedRegion}</span>
                            <ArrowDown strokeColor={`stroke-gray-500`} className={`transition-transform duration-200 ${isRegionOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isRegionOpen && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                                {regions.map((region) => (
                                    <button
                                        key={region}
                                        onClick={() => handleRegionChange(region)}
                                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 text-span-responsive first:rounded-t-lg last:rounded-b-lg"
                                    >
                                        {region}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Results Count */}
                <div className="mt-4">
                    <p className="text-span-responsive text-gray-700">
                        {filteredArticles.length} results found
                    </p>
                </div>

                <NewsList news={newsArticles} />

                <Pagination
                    totalPages={totalItems}
                    onPageChange={handlePageChange}
                    currentPage={currentPage}
                    className="mt-20"
                />

                <div className="mt-16">
                    <HelpBanner />
                </div>
            </div>
        </div>
    );
}