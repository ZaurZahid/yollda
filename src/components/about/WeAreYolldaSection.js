import { useTranslation } from "next-i18next";

export default function WeAreYolldaSection({ aboutSingleItem }) {
  const { t } = useTranslation("common");
  return (
    <div className="w-full flex justify-center bg-green-dark text-white py-16 lg:py-24">
      <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20">
        <div className="space-y-8">
          {/* Main Heading */}
          <h1 className="font-secondary text-section-lg-title-responsive font-bold leading-tight tracking-wide">
            {t("about_page.we_are_section.heading")}
          </h1>

          {/* Description */}
          <p className="text-p-large-responsive text-white/90 leading-relaxed lg:w-[55%] mt-2">
            {t("about_page.we_are_section.description")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 lg:gap-12 items-center mt-10">
          {/* Left Side - Content */}
          <div className="space-y-8">
            {/* Subheading */}
            <div className="space-y-2">
              <p className="text-span-large-responsive text-white/80 font-medium">
                {aboutSingleItem[0]?.sub_title}
              </p>

              <h4 className="text-h4-responsive font-bold leading-tight">
                {aboutSingleItem[0]?.title}
              </h4>
            </div>

            {/* Additional Description */}
            <p className="text-p-large-responsive mt-4 text-white/90 leading-relaxed max-w-lg">
              {aboutSingleItem[0]?.description}
            </p>

            {/* CTA Button */}
            <div className="mt-4">
              <a
                href={`${aboutSingleItem[0]?.deeplink_url}`}
                className="bg-light-green hover:bg-green-400 text-white px-8 py-4 rounded-2xl text-button-large-responsive font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {aboutSingleItem[0]?.action_title}
              </a>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
              <img
                src={aboutSingleItem[0]?.image}
                alt="Professional driver in car - Yollda partner"
                className="w-full h-[300px] lg:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Subtle overlay for better text contrast if needed */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
