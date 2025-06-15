import { useState } from "react";
import Button from "./Button";
import CloseIcon from "./icons/Close";

const Accordion = ({ data }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="w-full">
            {data.map((item, index) => (
                <div
                    key={index}
                    className={`mb-4 ${index === data.length - 1 ? "mb-0" : ""}`} // Add margin-bottom for all except the last
                >
                    <div
                        className={`cursor-pointer rounded-2xl transition-all duration-300 ease-in-out ${activeIndex === index ? "bg-white shadow-md" : ""
                            }`}
                        onClick={() => toggleAccordion(index)}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 relative">
                            <div className="flex lg:items-center">
                                <span className="text-blue-600 font-bold text-3xl mr-4">
                                    {index + 1}
                                </span>
                                <h3 className="text-gray-900 font-semibold text-lg mr-20">{item.question}</h3>
                            </div>

                            <Button
                                text=""
                                IconComponent={<CloseIcon fillColor={activeIndex === index ? "fill-white" : "fill-blue-600"} />}
                                onClick={() => toggleAccordion(index)}
                                classes={`absolute right-4 top-4 rounded-full !px-1 !pr-3 flex items-center justify-center ${activeIndex === index ? "bg-blue-600 hover:bg-blue-500 rotate-90" : "bg-gray-200 hover:bg-gray-300 rotate-45"}`}
                            />
                        </div>

                        {/* Content */}
                        <div
                            className={`overflow-hidden transition-all duration-500 ease-in-out ${activeIndex === index ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                                }`}
                        >
                            <div className="p-4 pt-0 pl-11">
                                <p className="text-gray-700 text-base mr-20">
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Accordion;
