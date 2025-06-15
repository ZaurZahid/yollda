import { useState } from "react";
import Star from "../ui/icons/Star";
import Breadcrumb from "../ui/Breadcrumb";
import BlogList from "./BlogList";
import Pagination from "../ui/Pagination";
import { useTranslation } from 'next-i18next';

export default function BlogsPage({ blogsData }) {
    const { t } = useTranslation('common');
    const { i18n } = useTranslation();

    const breadcrumbItems = [
        { label: t('navigation.home'), url: '/' },
        { label: t('navigation.blog'), url: '' },
    ];

    // Pagination State
    const [currentPage, setCurrentPage] = useState(blogsData.current_page || 1); // Default from SSR
    const [itemsPerPage, setItemsPerPage] = useState(blogsData.per_page || 10);
    const [blogs, setBlogs] = useState(blogsData.results || []); // Blog results
    const [totalItems, setTotalItems] = useState(blogsData.total || 0); // Total number of items

    // Function to fetch data for a specific page
    const fetchBlogs = async (page, perPage) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/support/blog/?page=${page}&per_page=${perPage}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': i18n?.language || 'az',
                },
            });
            const data = await response.json();

            setCurrentPage(data.current_page);
            setBlogs(data.results);
            setTotalItems(data.total);

            // Scroll to top smoothly after data is loaded
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    // Handle page change
    const handlePageChange = (pageNumber) => {
        fetchBlogs(pageNumber, itemsPerPage);
    };

    // Handle items per page change
    const handleItemsPerPageChange = (perPage) => {
        setItemsPerPage(perPage);
        fetchBlogs(1, perPage); // Reset to first page on change
    };

    return (
        <div className="lg:mt-4 mb-16 relative p-8 lg:p-16 bg-white rounded-3xl z-10">
            <Star className="absolute left-2 lg:left-6 top-3 lg:top-9 w-10 lg:w-12 h-10 lg:h-12" />

            <Breadcrumb items={breadcrumbItems} />
            <div className="flex flex-col">
                <h1 className="text-3xl font-bold text-gray-800">
                    {t('blogSection.title')}
                </h1>
                <p className="text-gray-600 mt-1 lg:mt-3">
                    {t('blogSection.subtitle')}
                </p>
            </div>
            <BlogList blogs={blogs} />

            <Pagination
                itemsPerPage={itemsPerPage}
                setItemsPerPage={handleItemsPerPageChange}
                totalItems={totalItems}
                paginate={handlePageChange}
                currentPage={currentPage}
                className="mt-8"
            />
        </div>
    );
}