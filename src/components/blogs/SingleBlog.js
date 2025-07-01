import React from "react";
import { trimText } from "../../hooks/trimText";
import { useTranslation } from "next-i18next";
const tabs = ["For passengers", "News", "Product update"];

function SingleBlog({ singleArticle = {} }) {
  const { t } = useTranslation("common");
  return (
    <div className="mt-14">
      <div className="flex flex-wrap gap-2 md:gap-1 md:space-s-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-span-responsive cursor-default font-medium rounded-full transition-all duration-200 text-green-dark bg-light-green/20`}
          >
            {tab}
          </button>
        ))}
      </div>

      {singleArticle && (
        <article className="mt-10 rounded-2xl">
          <div className="flex items-center">
            <img src="/calendar.svg" className="me-2" alt="calendar icon" />
            <span className="text-span-small-responsive text-gray-500">
              {singleArticle.date}
            </span>
          </div>

          <h6 className="text-h6-responsive font-medium text-gray-900 leading-relaxed mt-4">
            {trimText(singleArticle.title, 240)}
          </h6>

          <a
            href={"Continue reading"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex bg-green-dark text-light-green px-6 py-3 mt-6 md:mt-9 rounded-2xl text-button-responsive transition-all duration-200 transform hover:scale-105"
          >
            {t("continue_reading")}
          </a>
        </article>
      )}
    </div>
  );
}

export default SingleBlog;
