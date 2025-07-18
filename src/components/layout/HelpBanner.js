import YolldaLogo from "../ui/icons/Yollda";

import { useTranslation } from "next-i18next";
export default function HelpBanner() {
  const { t } = useTranslation("common");
  return (
    <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-green-dark">
      {/* Background Pattern/Texture */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-dark via-green-dark/95 to-green-dark/90"></div>

      <div className="relative grid md:grid-cols-12 items-center h-auto md:h-[280px]">
        {/* Left Side - Image */}
        <div className="col-span-12 md:col-span-5 lg:col-span-5 relative md:h-full">
          <div className="h-[200px] md:h-full overflow-hidden rounded-t-xl md:rounded-xl md:rounded-r-none">
            <img
              src="/HelpBanner.png"
              alt="Happy people in car needing roadside assistance"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="col-span-12 md:col-span-7 lg:col-span-7 relative z-10 p-8 text-white">
          {/* Brand Logo/Text */}
          <div className="md:mb-6">
            <div className="flex items-center space-s-2 md:mb-3">
              <YolldaLogo className="max-w-24 md:max-w-32 cursor-pointer fill-light-green" />
            </div>
          </div>

          {/* Main Heading */}
          <h3 className="text-h3-responsive font-bold text-white mb-8 leading-tight">
            {t("help_banner.need")}
          </h3>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row justify-end gap-4">
            <a
              href={"siteData?.[0]?.linkedin"}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto md:ml-0 md:w-auto bg-light-green text-white font-bold px-6 py-3 rounded-2xl text-button-responsive transition-all duration-200 transform hover:scale-105"
            >
              {t("buttons.getY_button")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
