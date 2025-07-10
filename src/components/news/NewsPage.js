import { useMemo, useState } from "react";
import Breadcrumb from "../ui/Breadcrumb";
import NewsList from "./NewsList";
import Pagination from "../ui/Pagination";
import { useTranslation } from "next-i18next";
import ArrowDown from "../ui/icons/ArrowDown";
import HelpBanner from "../layout/HelpBanner";

export default function NewsPage({ newsData, newsCategoriesData }) {
  const { t } = useTranslation("common");
  const { i18n } = useTranslation();

  const breadcrumbItems = [
    { label: t("navigation.home"), url: "/" },
    { label: t("navigation.news"), url: "" },
  ];

  // Pagination State
  const [currentPage, setCurrentPage] = useState(newsData?.current_page || 1); // Default from SSR
  const [totalFound, setTotalFound] = useState(newsData?.total); // Default from SSR
  const [itemsPerPage] = useState(10);
  const [newsList, setNews] = useState(newsData.results || []); // New results
  const [totalItems, setTotalItems] = useState(newsData?.last_page || 1); // Total number of items

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]); // Assuming you will fetch subcategories later
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);

  const fetchSubCategories = async (id) => {
    setIsSubCategoryOpen(false);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/web/news-categories/${id}`
      );
      const data = await response.json();

      setSubCategories(data?.subcategories);
    } catch (error) {}
  };

  // Function to fetch data for a specific page
  const fetchNews = async (page, perPage, category) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/web/news/?page=${page}&per_page=${perPage}&category=${category}`,
        {
          headers: {
            "Content-Type": "application/json",
            Country: "AZ", // Default to AZ if language is not recognized,
            "Accept-Language": i18n.language, // Use the current language from i18n
          },
        }
      );
      const data = await response.json();

      setCurrentPage(data.current_page);
      setTotalFound(data.total);
      setNews(data.results); // Update newsList with new results
      setTotalItems(data?.last_page); // Update total items based on the last page
    } catch (error) {
      console.error("Error fetching s:", error);
    }
  };

  // Handle page change
  const handlePageChange = async (pageNumber) => {
    setCurrentPage(pageNumber);

    await fetchNews(
      pageNumber,
      itemsPerPage,
      selectedSubCategory?.slug || selectedCategory?.slug || null
    );
  };

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    setIsCategoryOpen(false);

    if (category?.has_subcategory) {
      await fetchSubCategories(category.id);
    } else {
      await fetchNews(1, itemsPerPage, category?.slug);

      setSubCategories([]); // Clear subcategories if no subcategory exists
      setSelectedSubCategory(null); // Reset selected subcategory
    }
  };

  const handleSubCategoryChange = (category) => {
    setSelectedSubCategory(category);
    setIsSubCategoryOpen(false);
    fetchNews(1, itemsPerPage, category?.slug);
  };

  return (
    <div className="w-full flex justify-center py-12 lg:py-20">
      <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-col">
          <h1 className="font-secondary text-h2-responsive lg:w-[70%] uppercase font-extrabold text-green-dark">
            {t("news_page.heading")}
          </h1>
          <p className="text-gray-400 mt-2 lg:mt-5">
            {t("news_page.description")}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10 lg:mt-20">
          {/* Category Filter */}
          <div className="relative  w-1/2">
            <button
              onClick={() => {
                setIsCategoryOpen((prevState) => !prevState);
                setIsSubCategoryOpen(false); // Close subcategory dropdown when category is opened
              }}
              className="w-full bg-light-green/10 border border-light-green/20  px-4 py-3 text-left flex items-center justify-between text-green-dark hover:bg-light-green/20 rounded-xl transition-colors duration-200"
            >
              <span className="text-span-responsive font-medium">
                {selectedCategory?.title || t("buttons.select")}
              </span>
              <ArrowDown
                strokeColor={`stroke-gray-500`}
                className={`transition-transform duration-200 ${
                  isCategoryOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isCategoryOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-y-auto max-h-[300px] custom-contact-scrollbar">
                {newsCategoriesData.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 text-span-responsive first:rounded-t-lg last:rounded-b-lg"
                  >
                    {category.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Region Filter */}
          {subCategories?.length > 0 && (
            <div className="relative w-1/2  animate-fade-in transition-all duration-200">
              <button
                onClick={() => {
                  setIsSubCategoryOpen((prevState) => !prevState);
                  setIsCategoryOpen(false);
                }}
                className="w-full bg-light-green/10 border border-light-green/20 rounded-xl px-4 py-3 text-left flex items-center justify-between text-green-dark hover:bg-light-green/20 rounded-xl transition-colors duration-200"
              >
                <span className="text-span-responsive font-medium">
                  {selectedSubCategory?.title || t("buttons.select")}
                </span>
                <ArrowDown
                  strokeColor={`stroke-gray-500`}
                  className={`transition-transform duration-200 ${
                    isSubCategoryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isSubCategoryOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-y-auto max-h-[300px] custom-contact-scrollbar">
                  {subCategories.map((subCategory) => (
                    <button
                      key={subCategory.id}
                      onClick={() => handleSubCategoryChange(subCategory)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 text-span-responsive first:rounded-t-lg last:rounded-b-lg"
                    >
                      {subCategory.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mt-4">
          <p className="text-span-responsive text-gray-700">
            {totalFound || "0"} {t("results_found")}
          </p>
        </div>

        <NewsList news={newsList} />

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
