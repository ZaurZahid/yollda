import { useTranslation } from "next-i18next";

import Briefcase from "../../ui/icons/Briefcase";
import PiggyBankBudget from "./../../ui/icons/PiggyBankBudget";
import Tools from "./../../ui/icons/Tools";

export default function RevenueStreamSection() {
  const { t } = useTranslation("common");
  const benefits = [
    {
      id: 1,
      title: t("signup_page.revenue_section.benefits.benefit1.title"),
      description: t(
        "signup_page.revenue_section.benefits.benefit1.description"
      ),
      icon: <Briefcase className="w-8 h-8" fillColor={"fill-green-dark"} />,
    },
    {
      id: 2,
      title: t("signup_page.revenue_section.benefits.benefit2.title"),
      description: t(
        "signup_page.revenue_section.benefits.benefit2.description"
      ),
      icon: (
        <PiggyBankBudget className="w-8 h-8" fillColor={"fill-green-dark"} />
      ),
    },
    {
      id: 3,
      title: t("signup_page.revenue_section.benefits.benefit3.title"),
      description: t(
        "signup_page.revenue_section.benefits.benefit3.description"
      ),
      icon: <Tools className="w-8 h-8" fillColor={"fill-green-dark"} />,
    },
  ];
  return (
    <div className="w-full flex justify-center py-12 lg:py-20">
      <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20">
        {/* Header */}
        <div className="mb-8 md:mb-16">
          <h2 className="font-secondary text-h2-responsive uppercase font-bold text-green-dark mb-4 leading-tight">
            {t("signup_page.revenue_section.heading")}{" "}
            <span className="text-light-green">
              {t("signup_page.revenue_section.sub_heading")}
            </span>
          </h2>
          <p className="text-p-large-responsive text-gray-500 leading-relaxed">
            {t("signup_page.revenue_section.description")}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {benefits.map((benefit, index) => (
            <div key={benefit.id} className={`group`}>
              {/* Icon Container */}
              <div className="mb-3">
                <div className="h-[60px] max-w-[60px] bg-green-button-light rounded-xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
                  {benefit.icon}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h6 className="text-h6-responsive font-bold text-green-dark transition-colors duration-300">
                  {benefit.title}
                </h6>
                <p className="lg:max-w-[80%] text-span-responsive text-gray-500 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
