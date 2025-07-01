import Link from "next/link";
import RegisterBar from "./RegisterBar";
import { useEffect, useState } from "react";
import registerMethods from "../../utils/registerMethods";
import ArrowDown from "../ui/icons/ArrowDown";

const burgerLinks = [
  {
    column: "Products",
    items: [
      { label: "Tow assist", url: "/tow-assist" },
      { label: "Battery assist", url: "/battery-assist" },
      { label: "Fuel assist", url: "/fuel-assist" },
      { label: "Tire assist", url: "/tire-assist" },
    ],
  },
  {
    column: "Earn",
    items: [
      { label: "Yollda Partners", url: "/earn/yollda-partners" },
      { label: "Tow Drivers", url: "/earn/tow-drivers" },
      { label: "Yollda Fleets", url: "/earn/yollda-fleets" },
    ],
  },
  {
    column: "Company",
    items: [
      { label: "About Yollda", url: "/about" },
      { label: "Careers", url: "/careers" },
      { label: "Blog", url: "/blog" },
      { label: "Brand Guidelines", url: "/brand-guidelines" },
    ],
  },
  {
    column: "Support",
    items: [
      { label: "Yollda Partners", url: "/support/yollda-partners" },
      { label: "Tow Drivers", url: "/support/tow-drivers" },
      { label: "Yollda Fleets", url: "/support/yollda-fleets" },
      { label: "Contact us", url: "/contact" },
    ],
  },
  {
    column: "Safety",
    items: [{ label: "Driver safety", url: "/driver-safety" }],
  },
  {
    column: "Locations",
    items: [{ label: "Our cities", url: "/our-cities" }],
  },
];

const legalLinks = [
  { label: "Terms and Conditions", url: "/terms-and-conditions" },
  { label: "Privacy", url: "/privacy" },
  { label: "Cookies", url: "/cookies" },
  { label: "Security", url: "/security" },
];

const mobileBarItems = [
  { id: 1, label: "Sign up", items: [...registerMethods], isOpen: false },
  { id: 2, label: "Products", items: burgerLinks[0].items, isOpen: false },
  { id: 3, label: "Earn", items: burgerLinks[1].items, isOpen: false },
  { id: 4, label: "Company", items: burgerLinks[2].items, isOpen: false },
  { id: 5, label: "Support", items: burgerLinks[3].items, isOpen: false },
  { id: 6, label: "Safety", items: burgerLinks[4].items, isOpen: false },
  { id: 7, label: "Locations", items: burgerLinks[5].items, isOpen: false },
  { id: 8, label: "Other", items: legalLinks },
];

const BurgerModal = ({ isOpen, onClose }) => {
  const [barItems, setBarItems] = useState(mobileBarItems);
  const toggleMenuItem = (id) => {
    setBarItems((prev) =>
      prev.map((item) => ({
        ...item,
        isOpen: item.id === id ? !item.isOpen : false,
      }))
    );
  };
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (isOpen && isMobile) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);
  return (
    isOpen && (
      <>
        <div className="hidden md:block fixed left-0 top-0 w-full bg-white rounded-b-2xl pb-[68px] text-[14px] shadow-2xl">
          <div className="max-w-[1100px] mx-auto mt-[100px] flex justify-between gap-6">
            <div className="bg-[#f8fafa]  w-full rounded-xl p-[42px] flex flex-col gap-9 justify-between">
              <div className="grid grid-cols-4 gap-3 gap-y-16 w-full">
                {burgerLinks.map((item) => (
                  <ul
                    key={item.column}
                    className="flex flex-col  gap-[8px] font-[700] "
                  >
                    <li className="font-bold py-1 px-3 text-gray-700">
                      {item.column}
                    </li>
                    {item.items.map((link) => (
                      <li
                        key={link.label}
                        className=" font-[500] text-gray-500"
                      >
                        <Link
                          href={link.url}
                          className="py-1 px-3 hover:text-gray-600 hover:bg-[#f3f4f6] transition-colors duration-300 rounded-lg"
                        >
                          {" "}
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
              <ul className="flex items-center gap-6 font-[500] text-gray-700">
                {legalLinks.map((link) => (
                  <li key={link.label} className="py-1 px-3 hover:text-gray-600 hover:bg-[#f3f4f6] transition-colors duration-300 rounded-lg">
                    <Link href={link.url}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden lg:block min-w-[380px]">
              <RegisterBar />
            </div>
          </div>
        </div>
        {/* Mobile-------------------------------- */}
        <div className="md:hidden fixed left-0 top-0 w-full h-full bg-white overflow-y-auto">
          <div className="space-y-6 flex-1 mt-[100px] mx-6">
            <div className="space-y-4">
              {barItems.map((item) => (
                <div key={item.id} className="  transition-all duration-200 ">
                  <button
                    onClick={() => toggleMenuItem(item.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between  "
                  >
                    <span className="text-span-responsive text-[16px] font-[600] text-gray-800 pe-4">
                      {item.label}
                    </span>
                    <ArrowDown
                      strokeColor={`stroke-gray-500`}
                      className={`transition-transform duration-200 ${item.isOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                  {item.isOpen && (
                    <div className="px-6 pb-4 animate-fade-in pl-10">
                      <div className="pt-2 flex flex-col gap-6 ">
                        {item.items.map((navigation) => (
                          <Link
                            href={navigation.url}
                            className="text-p-small-responsive text-gray-500 text-[16px] font-[500] flex items-center gap-2"
                          >
                            {navigation.icon && navigation.icon}
                            {navigation.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default BurgerModal;
