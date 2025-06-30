import {
  FaTruck,
  FaUsers,
  FaTools,
  FaGasPump,
  FaChalkboardTeacher,
} from "react-icons/fa";

const registerMethods = [
  {
    icon: <FaTruck className="text-green-600 text-xl" />,
    label: "Become a Tow Partner",
    description: "Tow cars and freight with your tow truck and earn flexibly",
    url: "#",
  },
  {
    icon: <FaUsers className="text-teal-600 text-xl" />,
    label: "Sign Up as a Fleet Owner",
    description: "Add your fleet to Yollda and boost your income",
    url: "#",
  },
  {
    icon: <FaTools className="text-orange-500 text-xl" />,
    label: "Tire & Battery Assistance",
    description:
      "Join to provide mobile tire repair and battery replacement or jump-start services",
    url: "#",
    highlight: true,
  },
  {
    icon: <FaGasPump className="text-red-500 text-xl" />,
    label: "Fuel Delivery",
    description:
      "Deliver emergency fuel to stranded drivers and earn flexibly in your area",
    url: "#",
  },
  {
    icon: <FaChalkboardTeacher className="text-blue-500 text-xl" />,
    label: "Become a Training Partner",
    description:
      "Offer certified training to Yollda service providers and grow with our platform",
    url: "#",
  },
];

export default registerMethods;
