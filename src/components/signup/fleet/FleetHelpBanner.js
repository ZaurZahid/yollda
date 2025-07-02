import { useTranslation } from "next-i18next";
import YolldaLogo from "../../ui/icons/Yollda";
export default function FleetHelpBanner() {
  const { t } = useTranslation("common");
  return (
    <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-green-dark">
      {/* Background Pattern/Texture */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-dark via-green-dark/95 to-green-dark/90"></div>

      <div className="relative grid md:grid-cols-12 items-center h-auto md:h-[420px]">
        {/* Left Side - Image */}
        <div className="col-span-12 md:col-span-6 lg:col-span-6 relative md:h-full">
          <div className="h-[300px] md:h-[400px] md:h-full overflow-hidden rounded-t-xl md:rounded-xl md:rounded-r-none">
            <img
              src="https://images.pexels.com/photos/7144176/pexels-photo-7144176.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Happy people in car needing roadside assistance"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="col-span-12 md:col-span-6 lg:col-span-6 relative z-10 p-8 text-white">
          {/* Brand Logo/Text */}
          <div className="md:mb-4">
            <div className="flex items-center space-s-2">
              <YolldaLogo className="max-w-24 md:max-w-32 cursor-pointer fill-light-green" />
            </div>
          </div>

          <div className="lg:max-w-[80%]">
            {/* Main Heading */}
            <h3 className="text-h3-responsive font-bold text-white mb-4 leading-tight">
              {t("fleet.help_banner.heading")}
            </h3>

            <p className="text-p-large-responsive font-medium text-white mb-12 leading-tight">
              {t("fleet.help_banner.description")}
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row justify-end gap-8">
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
