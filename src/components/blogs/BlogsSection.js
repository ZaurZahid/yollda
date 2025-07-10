import { useState } from "react";
import Breadcrumb from "../ui/Breadcrumb";
import NewsList from "./NewsList";
import Pagination from "../ui/Pagination";
import { useTranslation } from "next-i18next";
import ArrowDown from "../ui/icons/ArrowDown";
import HelpBanner from "../layout/HelpBanner";
import Articles from "./Articles";

export default function BlogsSection({ blogsData, blogsCategories }) {
  const { t } = useTranslation("common");

  const breadcrumbItems = [
    { label: t("navigation.home"), url: "/" },
    { label: t("navigation.blogs"), url: "" },
  ];

  return (
    <div className="w-full flex justify-center py-12 lg:py-20">
      <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-col">
          <h1 className="font-secondary text-h2-responsive lg:w-[70%] uppercase font-extrabold text-green-dark">
            {t("blogs_section.heading")}
          </h1>
        </div>

        <Articles articlesData={blogsData} blogsCategories={blogsCategories} />
      </div>
    </div>
  );
}
