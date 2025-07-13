import { useTranslation } from "next-i18next";

export default function AboutUs({ shortAbout }) {
  const { t } = useTranslation("common");
  return (
    <section className="w-full flex justify-center bg-light-green text-white pt-16 lg:pt-20">
      <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20">
        <div className="text-center">
          {/* Section Label */}
          <div className="inline-block mb-8">
            <h5 className="text-green-dark text-h5-responsive font-bold">
              {t("about_us.label")}
            </h5>
          </div>

          {/* Main Heading */}
          <h1 className="font-secondary text-section-lg-title-responsive uppercase font-extrabold text-green-dark">
            {shortAbout?.title}
          </h1>

          {/* Description */}
          <p className="lg:w-[48%] m-auto  text-h6-responsive mt-9 text-green-dark text-center">
            {shortAbout?.description}
          </p>

          {/* CTA Button */}
          <a
            href={"siteData?.[0]?.linkedin"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex my-9 bg-green-dark text-light-green px-6 py-3 rounded-2xl text-button-responsive transition-all duration-200 transform hover:scale-105"
          >
            {t("buttons.getY_button")}
          </a>

          <div className="flex justify-center">
            {/* laptop 4x image */}
            <div className="hidden lg:block select-none pointer-events-none">
              <img
                src={"/app-4x.png"}
                alt="app image 4x"
                className="w-[800px] w-full object-cover"
              />
            </div>

            {/* tablet 3x image */}
            <div className="hidden md:block lg:hidden select-none pointer-events-none">
              <img
                src={"/app-3x.png"}
                alt="app image 4x"
                className="w-[800px] w-full object-cover"
              />
            </div>

            {/* mobile 2x image */}
            <div className="block md:hidden select-none pointer-events-none">
              <img
                src={"/app-2x.png"}
                alt="app image 4x"
                className="w-[400px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
