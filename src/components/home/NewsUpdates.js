import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { formatDate } from "../../hooks/formatDate";
import { useRouter } from "next/router";

export default function NewsUpdates({ newsData }) {
  const [newsList] = useState(newsData?.results || []);
  const { t } = useTranslation("common");
  const router = useRouter();
  const { locale } = router;
  return (
    <div className="w-full flex justify-center py-16 lg:py-24">
      <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20">
        <div className="flex flex-col">
          <h1 className="font-secondary text-h1-responsive uppercase font-extrabold text-green-dark text-center">
            {t("news_section.heading")}
          </h1>

          <h6 className="text-h6-responsive mt-9 text-gray-500 text-center">
            {t("news_section.description")}
          </h6>
        </div>

        {/* Services Grid */}
        <div className="space-y-12 lg:space-y-16 mt-8 lg:mt-10">
          {/* Desktop Layout */}
          <div className="grid grid-cols-12 gap-6">
            {/* Large Featured Article - Left */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <Link
                href={`/news/${newsList[0]?.slug}`}
                className="flex bg-green-dark rounded-2xl overflow-hidden shadow-xl h-[400px] md:h-[500px] relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
                <img
                  src={newsList[0]?.banner}
                  alt={newsList[0]?.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <h3 className="lg:w-[80%] text-h4-responsive font-bold text-white leading-tight">
                    {newsList[0]?.title}
                  </h3>
                </div>
              </Link>
            </div>

            {/* Middle Column - Article List */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4 space-y-4 flex flex-col justify-between">
              {newsList?.slice(1, 4)?.map((article) => (
                <Link
                  href={`/news/${article?.slug}`}
                  key={article.id}
                  className="flex items-center space-s-4 h-[30%] rounded-xl cursor-pointer group"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={article?.banner}
                      alt={article?.title}
                      className="w-32 h-32 rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-span-responsive font-semibold text-gray-600 line-clamp-2 mb-2">
                      {article?.title}
                    </h4>
                    <div className="flex items-center text-span-small-responsive text-gray-500">
                      <img
                        src="/calendar.svg"
                        className="me-1"
                        alt="calendar icon"
                      />
                      {formatDate(article?.created_at, locale)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Right Column - Two Large Cards */}
            <div className="col-span-12 lg:col-span-4 space-y-6 md:space-y-0 lg:space-y-6 flex flex-col md:flex-row lg:flex-col justify-between md:mt-4 lg:mt-0">
              {newsList?.slice(4, 6)?.map((article) => (
                <Link
                  href={`/news/${article?.slug}`}
                  key={article?.id}
                  className="flex bg-green-dark rounded-2xl overflow-hidden shadow-xl md:w-[48%] lg:w-full h-[200px] lg:h-[47%] relative group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
                  <img
                    src={article?.banner}
                    alt={article?.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-h6-responsive font-bold text-white leading-tight">
                      {article?.title}
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
