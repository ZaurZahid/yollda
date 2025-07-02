import React from "react";
import ServicesCarousel from "./ServicesCarousel";
import { useTranslation } from "next-i18next";

function OurServices({ ourServicesData }) {
  const { t } = useTranslation("common");
  return (
    <div className="py-16 lg:py-20 bg-white">
      <div className="px-0 sm:px-32 text-center">
        <h1 className="font-secondary text-section-lg-title-responsive uppercase font-extrabold text-green-dark">
          {t("our_services.heading")}
        </h1>

        <h6 className="text-h6-responsive mt-9 w-[80%] lg:w-[55%] m-auto text-gray-500 text-center">
          {t("our_services.description")}
        </h6>
      </div>

      <div>
        <ServicesCarousel ourServicesData={ourServicesData} />
      </div>
    </div>
  );
}

export default OurServices;
