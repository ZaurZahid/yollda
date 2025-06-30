import { useTranslation } from "next-i18next";
import MoneyStack from "./../../ui/icons/MoneyStack";
import Cube from "./../../ui/icons/Cube";
import Headset from "./../../ui/icons/Headset";

const benefitIcons = [
  <MoneyStack className="w-8 h-8" fillColor={"fill-green-dark"} />,
  <Cube className="w-8 h-8" fillColor={"fill-green-dark"} />,
  <Headset className="w-8 h-8" fillColor={"fill-green-dark"} />,
];

export default function WhyPartnerUsSection({ isSubmitted }) {
  const { t } = useTranslation("common");

  return (
    <div
      className={`w-full flex justify-center py-12 lg:py-20 ${
        isSubmitted
          ? "mt-[23rem] md:mt-48 lg:mt-0"
          : "mt-[32rem] md:mt-[25rem] lg:mt-[8rem]"
      }`}
    >
      <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20">
        {/* Header */}
        <div className="mb-8 md:mb-16">
          <h2 className="font-secondary text-h2-responsive uppercase font-bold text-green-dark mb-4 leading-tight">
            {t("fleet.why_us_section.heading")}
          </h2>
          <p className="text-p-large-responsive text-gray-500 leading-relaxed">
            {t("fleet.why_us_section.description")}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {benefitIcons.map((icon, index) => (
            <div key={index} className="group">
              {/* Icon Container */}
              <div className="mb-3">
                <div className="h-[60px] max-w-[60px] bg-green-button-light rounded-xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
                  {icon}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h6 className="text-h6-responsive font-bold text-green-dark transition-colors duration-300">
                  {t(`fleet.why_us_section.benefits.${index}.title`)}
                </h6>
                <p className="lg:max-w-[80%] text-span-responsive text-gray-500 leading-relaxed">
                  {t(`fleet.why_us_section.benefits.${index}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
