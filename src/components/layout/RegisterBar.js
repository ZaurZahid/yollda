import Link from "next/link";

import registerMethods from "../../utils/registerMethods";
import ArrowDown from './../ui/icons/ArrowDown';

export default function RegisterBar({ individual = false }) {
  return (
    <div
      className={`rounded-xl p-[32px]  max-w-[395px] ${individual ? "bg-white shadow-lg" : "bg-[#f8fafa]"
        } `}
    >
      {registerMethods.map((item, idx) => (
        <Link
          href={item.url}
          key={idx}
          className={`relative flex items-start gap-3 p-4  rounded-2xl transition hover:bg-[#f3f4f6]`}
        >
          <div>{item.icon}</div>
          <div className={"max-w-[80%]"}>
            <h3 className="font-[600] text-gray-600 text-[14px]">
              {item.label}
            </h3>
            <p className="font-[500] text-gray-400 text-[12px]">
              {item.description}
            </p>
          </div>
          <ArrowDown strokeColor={`stroke-gray-600`} className={`w-5 absolute top-5 right-0 rtl:right-auto rtl:left-0 transition-transform duration-200 -rotate-90 rtl:rotate-90`} />
        </Link>
      ))}
    </div>
  );
}
