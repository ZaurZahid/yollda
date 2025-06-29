import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";

export default function HowPartnerWorksSection({ isSubmitted }) {
  const { t } = useTranslation("common");
  const steps = [
    {
      id: 1,
      title: t("signup_page.how_partner_section.steps.step1.title"),
      description: t("signup_page.how_partner_section.steps.step1.description"),
      position: "top-left",
    },
    {
      id: 2,
      title: t("signup_page.how_partner_section.steps.step2.title"),
      description: t("signup_page.how_partner_section.steps.step2.description"),
      position: "top-right",
    },
    {
      id: 3,
      title: t("signup_page.how_partner_section.steps.step3.title"),
      description: t("signup_page.how_partner_section.steps.step3.description"),
      position: "bottom-left",
    },
    {
      id: 4,
      title: t("signup_page.how_partner_section.steps.step4.title"),
      description: t("signup_page.how_partner_section.steps.step4.description"),
      position: "bottom-right",
    },
  ];

  const getStepPositionClasses = (position) => {
    switch (position) {
      case "top-left":
        return "lg:absolute lg:top-0 lg:left-0 lg:w-64 lg:text-right lg:pr-8 rtl:lg:left-auto rtl:lg:right-0 rtl:lg:text-left rtl:lg:pl-8";
      case "top-right":
        return "lg:absolute lg:top-0 lg:right-0 lg:w-64 lg:text-left lg:pl-8 rtl:lg:right-auto rtl:lg:left-0 rtl:lg:text-right rtl:lg:pr-8";
      case "bottom-left":
        return "lg:absolute lg:bottom-0 lg:left-0 lg:w-64 lg:text-right lg:pr-8 rtl:lg:left-auto rtl:lg:right-0 rtl:lg:text-left rtl:lg:pl-8";
      case "bottom-right":
        return "lg:absolute lg:bottom-0 lg:right-0 lg:w-64 lg:text-left lg:pl-8 rtl:lg:right-auto rtl:lg:left-0 rtl:lg:text-right rtl:lg:pr-8";
      default:
        return "";
    }
  };
  const getStepAlignment = (position) => {
    switch (position) {
      case "top-left":
      case "bottom-left":
        return "lg:items-end rtl:lg:items-start";
      case "top-right":
      case "bottom-right":
        return "lg:items-start rtl:lg:items-end";
      default:
        return "items-center";
    }
  };

  return (
    <div
      className={`w-full flex justify-center py-12 lg:py-20 ${
        isSubmitted
          ? "mt-[20rem] md:mt-[10rem] lg:mt-0"
          : "mt-[52rem] md:mt-[40rem] lg:mt-48"
      }`}
    >
      <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-h2-responsive font-bold text-green-dark mb-6">
            {t("signup_page.partner_section.heading")}
          </h2>
          <p className="text-p-large-responsive text-gray-500 lg:max-w-[60%] mx-auto leading-relaxed">
            {t("signup_page.partner_section.description")}
          </p>
        </div>

        {/* Mobile Layout - Stacked Steps */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => (
            <div key={step.id} className={`flex items-center space-s-6`}>
              {/* Step Number */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-green-button-light rounded-xl flex items-center justify-center text-green-dark font-bold text-h2-responsive shadow-lg">
                  {step.id}
                </div>
              </div>

              {/* Step Content */}
              <div className="flex-1">
                <h5 className="text-h5-responsive font-bold text-green-dark mb-2">
                  {step.title}
                </h5>
                <p className="text-span-responsive text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}

          {/* Mobile Phone Mockup */}
          <div className="flex justify-center !mt-20">
            <div className={`relative w-full z-10`}>
              <img
                src={"/mobile-iphone.png"}
                alt="mobile-iphone 2x"
                className="relative z-10 mx-auto max-w-[180px] md:max-w-[250px] h-full object-cover"
              />
              <img
                src={"/glow-mobile.png"}
                alt="glow-mobile 2x"
                className="absolute z-9 top-[20px] md:-top-24 w-auto h-auto"
              />
            </div>
          </div>
        </div>

        {/* Desktop Layout - Phone in Center with Steps Around */}
        <div className="hidden lg:block">
          <div className="relative flex items-center justify-center min-h-[600px]">
            {/* Central Phone Mockup */}
            <div className={`relative w-[700px] z-10`}>
              <img
                src={"/mobile-iphone.png"}
                alt="mobile-iphone 2x"
                className="relative z-10 mx-auto lg:max-w-[250px] h-full object-cover"
              />
              <img
                src={"/glow-mobile.png"}
                alt="glow-mobile 2x"
                className="absolute z-9 -top-24 w-auto h-auto"
              />
            </div>

            {/* Steps Positioned Around Phone */}
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`${getStepPositionClasses(step.position)}`}
              >
                <div
                  className={`flex flex-col space-y-4 ${getStepAlignment(
                    step.position
                  )}`}
                >
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-green-button-light rounded-xl flex items-center justify-center text-green-dark font-bold text-h2-responsive shadow-lg">
                      {step.id}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1">
                    <h5 className="text-h5-responsive font-bold text-green-dark mb-2">
                      {step.title}
                    </h5>
                    <p className="text-span-responsive text-gray-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
