import { useMemo, useState } from "react";
import Breadcrumb from "../ui/Breadcrumb";
import NewsList from "./NewsList";
import Pagination from "../ui/Pagination";
import { useTranslation } from "next-i18next";
import ArrowDown from "../ui/icons/ArrowDown";
import HelpBanner from "../layout/HelpBanner";
import { fetchFromAPI } from "../../hooks/apiFetcher";

const newsArticles = [
  {
    id: 1,
    title:
      "Bolt joins UN Global Compact: strengthening our commitment to sustainabilityGlobal Compact: strengthening our commitment to sustainabilityGlobal Compact: strengthening our commitment to sustainabilityGlobal Compact: strengthening our commitment to sustainabilityGlobal Compact: strengthening our commitment to sustainability strengthening our commitment to sustainability",
    category: "Sustainability",
    date: "April 24, 2025",
    image:
      "https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 2,
    title:
      "Bolt joins UN Global Compact: strengthening our commitment to sustainability",
    category: "Sustainability",
    date: "April 24, 2025",
    image:
      "https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 3,
    title:
      "Bolt joins UN Global Compact: strengthening our commitment to sustainability",
    category: "Sustainability",
    date: "April 24, 2025",
    image:
      "https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 4,
    title: "New electric vehicle fleet expansion across major cities",
    category: "Technology",
    date: "April 20, 2025",
    image:
      "https://images.pexels.com/photos/3964704/pexels-photo-3964704.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 5,
    title: "Partnership announcement with local transportation authorities",
    category: "Business",
    date: "April 18, 2025",
    image:
      "https://images.pexels.com/photos/4173624/pexels-photo-4173624.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 6,
    title: "Safety improvements and new driver training programs launched",
    category: "Safety",
    date: "April 15, 2025",
    image:
      "https://images.pexels.com/photos/3807738/pexels-photo-3807738.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

// const categories = [
//   "All",
//   "Sustainability",
//   "Technology",
//   "Business",
//   "Safety",
// ];
const regions = ["Global", "North America", "Europe", "Asia Pacific"];

export default function NewsPage({ newsData, newsCategoriesData }) {
  const { t } = useTranslation("common");
  const { i18n } = useTranslation();

  const breadcrumbItems = [
    { label: t("navigation.home"), url: "/" },
    { label: t("navigation.news"), url: "" },
  ];

  // Pagination State
  const [currentPage, setCurrentPage] = useState(newsData?.current_page || 1); // Default from SSR
  const [itemsPerPage] = useState(newsData.per_page || 10);
  const [newsList, setNews] = useState(newsData.results || []); // New results
  const [totalItems, setTotalItems] = useState(newsData.total || 99); // Total number of items

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]); // Assuming you will fetch subcategories later
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
  // const [filteredArticles, setFilteredArticles] = useState(newsArticles);

  const fetchSubCategories = async (id) => {
    setIsSubCategoryOpen(false);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/web/news-categories/${id}`
      );
      const json = await response.json();
      // const res = await fetchFromAPI(`/api/v1/web/news-categories/${id}`);
      setSubCategories(json?.subcategories);
    } catch (error) {}
  };

  // Function to fetch data for a specific page
  const fetchNews = async (page, perPage, category = "notWorking") => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/web/news/?page=${page}&per_page=${perPage}`,
        {
          headers: {
            "Content-Type": "application/json",
            Country: "AZ", // Default to AZ if language is not recognized,
          },
        }
      );
      const data = await response.json();

      setCurrentPage(data.current_page);
      // setNews(data.results);
      // setFilteredArticles(data.results);
      setNews(data.results); // Update newsList with new results
      setTotalItems(data.total);

      // Scroll to top smoothly after data is loaded
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Error fetching s:", error);
    }
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); //helelik
    fetchNews(pageNumber, 10);

    // fetchNews(pageNumber, itemsPerPage);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setIsCategoryOpen(false);

    if (category?.has_subcategory) {
      fetchSubCategories(category.id);
    } else {
      fetchNews(currentPage, 10);
    }
    // filterArticles(category, selectedCategory.title);
  };

  const handleSubCategoryChange = (category) => {
    setSelectedSubCategory(category);
    setIsSubCategoryOpen(false);
    fetchNews(currentPage, 10, category);
    // filterArticles(selectedCategory, region);
  };

  // const filterArticles = (category, region) => {
  //   let filtered = newsArticles;

  //   if (category !== "News" && category !== "All") {
  //     filtered = filtered.filter((article) => article.category === category);
  //   }

  //   // Region filtering logic would go here
  //   // For now, we'll show all articles regardless of region

  //   setFilteredArticles(filtered);
  // };

  //  const selectedCate = useMemo(() => {
  //     return services?.find((c) => c.type === formData.service_type);
  //   }, [formData.service_type]);

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
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
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
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-y-auto max-h-[300px]">
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
                onClick={() => setIsSubCategoryOpen((prevState) => !prevState)}
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
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
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
            {newsList.length} {t("results_found")}
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
