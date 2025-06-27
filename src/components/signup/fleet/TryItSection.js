import Devices from './../../ui/icons/Devices';
import MemoCircleCheck from './../../ui/icons/MemoCircleCheck';
import MoneySet from './../../ui/icons/MoneySet';
import FleetHelpBanner from './FleetHelpBanner';

const benefits = [
    {
        id: 1,
        title: "Sign up",
        description: "It takes just 2 minutes to register a fleet company account.",
        icon: <Devices className="w-8 h-8" fillColor={"fill-green-dark"} />
    },
    {
        id: 2,
        title: "Get approved",
        description: "Enter your vehicle and driver info as we process your account activation.",
        icon: <MemoCircleCheck className="w-8 h-8" fillColor={"fill-green-dark"} />
    },
    {
        id: 3,
        title: "Fast, reliable support",
        description: "After verification, your vehicles are set to begin earning.",
        icon: <MoneySet className="w-8 h-8" fillColor={"fill-green-dark"} />
    }
];

export default function TryItSection() {
    return (
        <div className="w-full flex justify-center py-12 lg:py-20">
            <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20">
                {/* Header */}
                <div className="mb-8 md:mb-16">
                    <h2 className="font-secondary text-h2-responsive uppercase font-bold text-green-dark mb-4 leading-tight">
                        Sign up and try it free
                    </h2>
                    <p className="text-p-large-responsive text-gray-500 leading-relaxed">
                        Set up in 3 easy steps:
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

                <div className="mt-24 lg:mt-40">
                    <FleetHelpBanner />
                </div>
            </div>
        </div>
    );
}