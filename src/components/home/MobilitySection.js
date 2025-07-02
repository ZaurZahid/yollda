import { useState } from "react";
import { useTranslation } from "next-i18next";

export default function MobilitySection({ benefits }) {
  const { t } = useTranslation("common");
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToPrevious = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? benefits?.results?.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentSlide((prev) =>
      prev === benefits?.results?.length - 1 ? 0 : prev + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="w-full flex justify-center bg-green-dark text-white py-16 lg:py-24">
      <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20">
        <div className="flex flex-col">
          {/* Left Side - Main Content */}
          <div className="space-y-4">
            {/* Main Title - Always Visible */}
            <div className="space-y-4">
              <h1 className="font-secondary text-section-lg-title-responsive font-extrabold">
                {t("home_page.benefits_section.title")}
              </h1>
            </div>

            {/* Description */}
            <p className="body-large text-white/90 leading-relaxed">
              {t("home_page.benefits_section.description")}
            </p>
          </div>

          {/* Right Side - Dynamic Content */}
          <div className="space-y-8 mt-20 lg:mt-32">
            {/* Content Card */}
            <div>
              <h3 className="text-h4-responsive font-bold mb-4 text-white">
                {benefits?.results?.[currentSlide].title}
              </h3>
              <p className="text-p-large-responsive text-white/90 mb-6">
                {benefits?.results?.[currentSlide].description}
              </p>
              <a
                href={benefits?.results?.[currentSlide].deeplink_url}
                className="inline-flex items-center text-light-green hover:text-green-400 transition-colors duration-200 font-medium text-button-responsive group"
              >
                {benefits?.results?.[currentSlide].action_title}
              </a>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-around md:justify-between">
              <button
                onClick={goToPrevious}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl p-3 transition-all duration-200 hover:scale-110 border border-white/30"
                aria-label="Previous slide"
              >
                <svg
                  className="w-5 h-5 text-white rtl:-rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Dots Indicator */}
              <div className="flex space-s-3">
                {benefits?.results?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                      ? "bg-light-green scale-125 shadow-lg"
                      : "bg-white/40 hover:bg-white/60 hover:scale-110"
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl p-3 transition-all duration-200 hover:scale-110 border border-white/30"
                aria-label="Next slide"
              >
                <svg
                  className="w-5 h-5 text-white rtl:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
