import { useTranslation } from "next-i18next";
import GasIcon from "../components/ui/icons/Gas";
import TireBatteryIcon from "../components/ui/icons/TireBattery";
import UserIcon from "../components/ui/icons/User";
import VerifyIcon from "../components/ui/icons/Verify";
import Briefcase from "./../components/ui/icons/Briefcase";

const RegisterMethods = () => {
  const { t } = useTranslation("common");
  const registerMethods = [
    {
      icon: <UserIcon className="w-5 h-5" fillColor={"fill-light-green"} />,
      label: t("register_methods.become_tow_partner.label"),
      description: t("register_methods.become_tow_partner.description"),
      url: "#",
    },
    {
      icon: <Briefcase className="w-5 h-5" fillColor={"fill-teal-600"} />,
      label: t("register_methods.sign_up_fleet_owner.label"),
      description: t("register_methods.sign_up_fleet_owner.description"),
      url: "#",
    },
    {
      icon: (
        <TireBatteryIcon className="w-5 h-5" fillColor={"fill-orange-500"} />
      ),
      label: t("register_methods.tire_battery_assistance.label"),
      description: t("register_methods.tire_battery_assistance.description"),
      url: "#",
      highlight: true,
    },
    {
      icon: <GasIcon className="w-5 h-5" fillColor={"fill-red-500"} />,
      label: t("register_methods.fuel_delivery.label"),
      description: t("register_methods.fuel_delivery.description"),
      url: "#",
    },
    {
      icon: <VerifyIcon className="w-5 h-5" fillColor={"fill-blue-500"} />,
      label: t("register_methods.training_partner.label"),
      description: t("register_methods.training_partner.description"),
      url: "#",
    },
  ];

  return registerMethods;
};

export default RegisterMethods;
