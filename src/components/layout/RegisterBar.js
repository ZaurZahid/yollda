import Link from "next/link";

import { FaAngleRight } from "react-icons/fa6";
import registerMethods from "../../utils/registerMethods";

export default function RegisterBar({ individual = false }) {
  return (
    <div
      className={`rounded-xl p-[32px]  max-w-[395px] ${
        individual ? "bg-white shadow-md" : "bg-[#f8fafa]"
      } `}
    >
      {registerMethods.map((item, idx) => (
        <Link
          href={item.url}
          key={idx}
          className={`flex items-start gap-3 p-4  rounded-2xl transition hover:bg-[#f3f4f6]`}
        >
          <div>{item.icon}</div>
          <div>
            <h3 className="font-[600] text-gray-600 text-[14px]">
              {item.label}
            </h3>
            <p className="font-[500] text-gray-400 text-[12px]">
              {item.description}
            </p>
          </div>
          <FaAngleRight color="#6B7280" />
        </Link>
      ))}
    </div>
  );
}
