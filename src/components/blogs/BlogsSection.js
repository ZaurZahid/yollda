import { useState } from "react";
import Breadcrumb from "../ui/Breadcrumb";
import NewsList from "./NewsList";
import Pagination from "../ui/Pagination";
import { useTranslation } from "next-i18next";
import ArrowDown from "../ui/icons/ArrowDown";
import HelpBanner from "../layout/HelpBanner";
import SingleBlog from "./SingleBlog";
import Articles from "./Articles";

const blogsArticles = [
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

export default function BlogsSection({ blogsData }) {
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

        <SingleBlog singleArticle={blogsArticles[0]} />
        <Articles articles={blogsArticles} />
      </div>
    </div>
  );
}
