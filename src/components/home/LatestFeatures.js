import { useTranslation } from "next-i18next";

export default function LatestFeatures() {
  const { t } = useTranslation("common");
  return (
    <section className="w-full flex justify-center bg-green-dark text-white text-center py-16 lg:py-20">
      <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20">
        {/* Section Label */}
        <div className="inline-block mb-8">
          <h5 className="text-h5-responsive font-bold">
            {t("latest_features_section.label")}
          </h5>
        </div>

        {/* Main Heading */}
        <h1 className="font-secondary text-section-lg-title-responsive uppercase font-extrabold leading-tight">
          {t("latest_features_section.heading")}
        </h1>

        {/* Description */}
        <div className="lg:w-[48%] m-auto text-h6-responsive mt-9 text-white text-center">
          <p className="mt-4">{t("latest_features_section.description.top")}</p>

          <p className="mt-4">
            {t("latest_features_section.description.middle")}
          </p>

          <p className="mt-4">
            {t("latest_features_section.description.bottom")}
          </p>
        </div>
      </div>
    </section>
  );
}
