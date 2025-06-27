import Devices from '../../ui/icons/Devices';
import SearchAlt from './../../ui/icons/SearchAlt';
import MemoCircleCheck from './../../ui/icons/MemoCircleCheck';

const benefits = [
    {
        id: 1,
        title: "Fill in the application",
        description: "Choose your city, share your contact details and service type. We’ll guide you through the next steps.",
        icon: <Devices className="w-8 h-8" fillColor={"fill-green-dark"} />
    },
    {
        id: 2,
        title: "Upload your documents",
        description: "Submit required documents like your ID, driver’s license, and service-related permits.",
        icon: <SearchAlt className="w-8 h-8" fillColor={"fill-green-dark"} />
    },
    {
        id: 3,
        title: "Get approved and start",
        description: "Once your documents are verified, you’ll get access to the app and can start accepting service requests.",
        icon: <MemoCircleCheck className="w-8 h-8" fillColor={"fill-green-dark"} />
    }
];

export default function YolldaPartnerSection() {
    return (
        <div className="w-full flex justify-center py-12 lg:py-20">
            <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20">
                {/* Header */}
                <div className="mb-8 md:mb-16">
                    <h2 className="font-secondary text-h2-responsive uppercase font-bold text-green-dark mb-4 leading-tight">
                        Get started as {' '}
                        <span className="text-light-green">a yollda partner</span>
                    </h2>
                    <p className="text-p-large-responsive text-gray-500 leading-relaxed">
                        Whether you're an individual specialist or manage a fleet, Yollda lets you earn by providing essential roadside assistance — on your own time. Support drivers when they need it most.
                    </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                    {benefits.map((benefit, index) => (
                        <div
                            key={benefit.id}
                            className={`group`}
                        >
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