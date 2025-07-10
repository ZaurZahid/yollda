import Link from "next/link";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import { trimText } from "../../hooks/trimText";
const tabs = ["For passengers", "News", "Product update"];

function Articles({ articlesData }) {
  console.log("ARTICLES DATA", articlesData.results);
  const [blogsList, setBlogsList] = useState(articlesData?.results || []);
  const { t } = useTranslation("common");
  return (
    <div className="space-y-8 mt-10 md:mt-20">
      {/* Singlie blog  */}
      <div className="flex flex-wrap gap-2 md:gap-1 md:space-s-4">
        {blogsList[0]?.tags.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-span-responsive cursor-default font-medium rounded-full transition-all duration-200 text-green-dark bg-light-green/20`}
          >
            {tab}
          </button>
        ))}
      </div>

      {blogsList[0] && (
        <article className="mt-10 rounded-2xl">
          <div className="flex items-center">
            <img src="/calendar.svg" className="me-2" alt="calendar icon" />
            <span className="text-span-small-responsive text-gray-500">
              {blogsList[0]?.created_at}
            </span>
          </div>

          <h6 className="text-h6-responsive font-medium text-gray-900 leading-relaxed mt-4">
            {trimText(blogsList[0]?.title, 240)}
          </h6>

          <a
            href={`/blogs/${blogsList[0]?.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex bg-green-dark text-light-green px-6 py-3 mt-6 md:mt-9 rounded-2xl text-button-responsive transition-all duration-200 transform hover:scale-105"
          >
            {t("continue_reading")}
          </a>
        </article>
      )}

      {/* Patterned blog layout */}
      {(() => {
        const pattern = [1, 2, 3]; // repeating group sizes
        const blogRows = [];
        let i = 1; // start from second blog (first is handled separately)
        let patternIndex = 0;

        while (i < blogsList.length) {
          const groupSize = pattern[patternIndex % pattern.length];
          const group = blogsList.slice(i, i + groupSize);

          if (group.length === 0) break;

          // Choose layout based on group size
          if (groupSize === 1) {
            blogRows.push(
              <div key={i} className="space-y-8">
                {group.map((article) => (
                  <Link
                    href={`/blogs/${article?.slug}`}
                    key={article?.id}
                    className="inline-flex w-full group cursor-pointer bg-white hover:bg-gray-50 rounded-2xl transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="md:w-80 h-[200px] md:h-80 rounded-t-xl md:rounded-xl md:rounded-r-none overflow-hidden">
                          <img
                            src={article?.banner}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      </div>
                      <div className="flex-1 space-y-4 mt-auto mb-auto p-4 md:p-6 md:pl-0">
                        <div className="inline-block">
                          <span className="text-light-green rounded-full text-span-small-responsive font-medium">
                            {article?.category?.title}
                          </span>
                        </div>
                        <h5 className="text-h5-responsive lg:w-[90%] font-bold text-gray-700 leading-tight group-hover:text-green-dark transition-colors duration-200">
                          {trimText(article?.title, 100)}
                        </h5>
                        <div className="flex items-center text-span-small-responsive text-gray-500">
                          {article?.created_at}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            );
          } else if (groupSize === 2) {
            blogRows.push(
              <div key={i} className="grid lg:grid-cols-2 gap-8">
                {group.map((article) => (
                  <Link
                    href={`/blogs/${article?.slug}`}
                    key={article?.id}
                    className="group cursor-pointer"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                      <div className="h-[200px] md:h-[400px] overflow-hidden">
                        <img
                          src={article?.banner}
                          alt={article?.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="px-6 py-16">
                        <div className="inline-block mb-3">
                          <span className="bg-white text-light-green rounded-full text-span-small-responsive font-medium">
                            {article?.category?.title}
                          </span>
                        </div>
                        <h5 className="text-h5-responsive md:w-[90%] font-semibold text-gray-700 leading-tight mb-3 group-hover:text-green-dark transition-colors duration-200">
                          {article?.title}
                        </h5>
                        <div className="flex items-center text-span-small-responsive text-gray-500">
                          <span>{article?.created_at}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            );
          } else if (groupSize === 3) {
            blogRows.push(
              <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {group.map((article) => (
                  <Link
                    href={`/blogs/${article?.slug}`}
                    key={article?.id}
                    className="group cursor-pointer"
                  >
                    <div className="bg-green-dark rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
                      <div className="overflow-hidden h-[250px] lg:h-[350px]">
                        <img
                          src={article?.banner}
                          alt={article?.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <div className="inline-block mb-2">
                          <span className="bg-light-green text-white px-2 py-1 rounded-xl text-span-small-responsive font-medium">
                            {article?.category?.title}
                          </span>
                        </div>
                        <h5 className="text-h5-responsive font-semibold leading-tight">
                          {article?.title}
                        </h5>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            );
          }

          i += groupSize;
          patternIndex++;
        }

        return blogRows;
      })()}
    </div>
  );
}

export default Articles;
