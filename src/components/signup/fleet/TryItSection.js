import { useTranslation } from "next-i18next";
import Devices from "./../../ui/icons/Devices";
import MemoCircleCheck from "./../../ui/icons/MemoCircleCheck";
import MoneySet from "./../../ui/icons/MoneySet";
import FleetHelpBanner from "./FleetHelpBanner";

const benefitIconComponents = [Devices, MemoCircleCheck, MoneySet];

export default function TryItSection() {
  const { t } = useTranslation("common");

  return (
    <div className="w-full flex justify-center py-12 lg:py-20">
      <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20">
        {/* Header */}
        <div className="mb-8 md:mb-16">
          <h2 className="font-secondary text-h2-responsive uppercase font-bold text-green-dark mb-4 leading-tight">
            {t("fleet.try_section.heading")}
          </h2>
          <p className="text-p-large-responsive text-gray-500 leading-relaxed">
            {t("fleet.try_section.description")}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {benefitIconComponents.map((IconComponent, index) => (
            <div key={index} className="group">
              <div className="mb-3">
                <div className="h-[60px] max-w-[60px] bg-green-button-light rounded-xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
                  <IconComponent
                    className="w-8 h-8"
                    fillColor="fill-green-dark"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h6 className="text-h6-responsive font-bold text-green-dark transition-colors duration-300">
                  {t(`fleet.try_section.benefits.${index}.title`)}
                </h6>
                <p className="lg:max-w-[80%] text-span-responsive text-gray-500 leading-relaxed">
                  {t(`fleet.try_section.benefits.${index}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 lg:mt-40">
          <FleetHelpBanner />
        </div>
      </div>
    </div>
  );
}
