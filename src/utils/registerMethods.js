import GasIcon from "../components/ui/icons/Gas";
import TireBatteryIcon from "../components/ui/icons/TireBattery";
import UserIcon from "../components/ui/icons/User";
import VerifyIcon from "../components/ui/icons/Verify";
import Briefcase from './../components/ui/icons/Briefcase';

const registerMethods = [
  {
    icon: <UserIcon className="w-5 h-5" fillColor={"fill-light-green"} />,
    label: "Become a Tow Partner",
    description: "Tow cars and freight with your tow truck and earn flexibly",
    url: "#",
  },
  {
    icon: <Briefcase className="w-5 h-5" fillColor={"fill-teal-600"} />,
    label: "Sign Up as a Fleet Owner",
    description: "Add your fleet to Yollda and boost your income",
    url: "#",
  },
  {
    icon: <TireBatteryIcon className="w-5 h-5" fillColor={"fill-orange-500"} />,
    label: "Tire & Battery Assistance",
    description:
      "Join to provide mobile tire repair and battery replacement or jump-start services",
    url: "#",
    highlight: true,
  },
  {
    icon: <GasIcon className="w-5 h-5" fillColor={"fill-red-500"} />,
    label: "Fuel Delivery",
    description:
      "Deliver emergency fuel to stranded drivers and earn flexibly in your area",
    url: "#",
  },
  {
    icon: <VerifyIcon className="w-5 h-5" fillColor={"fill-blue-500"} />,
    label: "Become a Training Partner",
    description:
      "Offer certified training to Yollda service providers and grow with our platform",
    url: "#",
  },
];

export default registerMethods;
