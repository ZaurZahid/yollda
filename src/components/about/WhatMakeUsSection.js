import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

// const carouselSlides = [
//   {
//     id: 1,
//     subtitle: "Yollda is your trusted",
//     title: "Azərbaycanda sürücülük edin və pul qazanın",
//     description:
//       "We never sacrifice long-term value for short-term results. We think big and optimise for what's best for the whole company, not only one team. Whenever we see problems outside our direct responsibility, we speak up and help.",
//     buttonText: "All jobs",
//     image:
//       "https://images.pexels.com/photos/3964704/pexels-photo-3964704.jpeg?auto=compress&cs=tinysrgb&w=800",
//   },
//   {
//     id: 2,
//     subtitle: "Yollda is your partner",
//     title: "Türkiyə'də güvenli sürüş deneyimi",
//     description:
//       "We believe in building lasting relationships with our drivers and partners. Our platform connects communities and creates opportunities for sustainable income while ensuring safety and reliability on every journey.",
//     buttonText: "Join us",
//     image:
//       "https://images.pexels.com/photos/4173624/pexels-photo-4173624.jpeg?auto=compress&cs=tinysrgb&w=800",
//   },
//   {
//     id: 3,
//     subtitle: "Yollda is innovation",
//     title: "საქართველოში ტექნოლოგიური გადაწყვეტები",
//     description:
//       "We leverage cutting-edge technology to provide seamless roadside assistance. Our smart routing algorithms and real-time tracking ensure that help arrives exactly when and where you need it most.",
//     buttonText: "Learn more",
//     image:
//       "https://images.pexels.com/photos/3807738/pexels-photo-3807738.jpeg?auto=compress&cs=tinysrgb&w=800",
//   },
// ];

export default function WhatMakeUsSection({ aboutCarousel }) {
  const { t } = useTranslation("common");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
    slidesToScroll: 1,
    dragFree: false,
    watchDrag: true,
    startIndex: 0,
    inViewThreshold: 0.7,
  });

  const updateCurrent = useCallback((emblaApi) => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    updateCurrent(emblaApi);
  }, [emblaApi, updateCurrent]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const currentSlide = aboutCarousel[selectedIndex];

  return (
    <section className="w-full flex justify-center text-white py-16 lg:py-20">
      <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20">
        <div className="flex flex-col">
          {/* Main Heading */}
          <h1 className="font-secondary text-section-lg-title-responsive uppercase font-extrabold text-green-dark">
            {t("about_page.what_makes_us_section.heading")}
          </h1>

          {/* Description */}
          <p className="lg:w-[48%] text-h6-responsive mt-6 text-green-dark">
            {t("about_page.what_makes_us_section.description")}
          </p>
        </div>

        {/* Carousel Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mt-12 lg:mt-20">
          {/* Left Side - Image Carousel */}
          <div className="relative">
            <div
              className="overflow-hidden rounded-3xl shadow-2xl cursor-grab active:cursor-grabbing"
              ref={emblaRef}
            >
              <div className="flex rtl:flex-row-reverse">
                {aboutCarousel?.map((slide) => (
                  <div key={slide.id} className="flex-[0_0_100%] min-w-0">
                    <div className="h-[300px] lg:h-[500px] overflow-hidden">
                      <img
                        src={slide.image}
                        // alt={slide.title}
                        alt="Carousel image"
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center mt-6 space-s-6">
              {/* Previous Button */}
              <button
                onClick={scrollPrev}
                className="bg-gray-300 hover:bg-gray-500 rounded-xl p-3 shadow-lg transition-all duration-400 border border-gray-200 rtl:-rotate-180"
                aria-label="Previous slide"
              >
                <svg
                  className="w-6 h-6 text-white"
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
              <div className="flex space-s-2">
                {aboutCarousel?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === selectedIndex
                        ? "bg-light-green scale-125"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={scrollNext}
                className="bg-gray-300 hover:bg-gray-500 rounded-xl p-3 shadow-lg transition-all duration-400 border border-gray-200 rtl:rotate-180"
                aria-label="Next slide"
              >
                <svg
                  className="w-6 h-6 text-white"
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

          {/* Right Side - Content */}
          <div className="hidden lg:block space-y-2">
            {/* Subtitle */}
            <p className="text-span-responsive text-green-dark/70 font-medium">
              {currentSlide?.sub_title}
            </p>

            {/* Main Title */}
            <h4 className="text-h4-responsive font-bold text-green-dark leading-tight">
              {currentSlide.title}
            </h4>

            {/* Description */}
            <p className="body-regular text-dark-gray leading-relaxed">
              {currentSlide?.description}
            </p>

            {/* CTA Button */}
            <div className="pt-4">
              <a
                href={currentSlide?.deeplink_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex mt-4 bg-green-dark text-light-green px-6 py-3 rounded-2xl text-button-responsive transition-all duration-200 transform hover:scale-105"
              >
                {currentSlide?.action_title}
              </a>
            </div>
          </div>

          {/* Mobile Layout - Stack vertically on small screens */}
          <div className="lg:hidden">
            <div className="text-start">
              <div className="rounded-2xl p-6 space-y-4">
                <p className="text-span-responsive text-green-dark/70 font-medium">
                  {currentSlide?.sub_title}
                </p>
                <h3 className="text-h4-responsive font-bold text-green-dark leading-tight">
                  {currentSlide?.title}
                </h3>
                <p className="body-regular text-dark-gray leading-relaxed">
                  {currentSlide?.description}
                </p>
                <a
                  href={currentSlide?.deeplink_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex mx-auto !mt-8 bg-green-dark text-light-green px-6 py-3 rounded-2xl text-button-responsive transition-all duration-200 transform hover:scale-105"
                >
                  {currentSlide?.action_title}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
