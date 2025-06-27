import MoneyStack from './../../ui/icons/MoneyStack';
import Cube from './../../ui/icons/Cube';
import Headset from './../../ui/icons/Headset';

const benefits = [
    {
        id: 1,
        title: "Steady and secure earnings",
        description: "Consistent jobs, dependable payouts",
        icon: <MoneyStack className="w-8 h-8" fillColor={"fill-green-dark"} />
    },
    {
        id: 2,
        title: "Total clarity",
        description: "A modern, intuitive portal to run your business with ease.",
        icon: <Cube className="w-8 h-8" fillColor={"fill-green-dark"} />
    },
    {
        id: 3,
        title: "Fast, reliable support",
        description: "We’re here when you need us.",
        icon: <Headset className="w-8 h-8" fillColor={"fill-green-dark"} />
    }
];

export default function WhyPartnerUsSection({ isSubmitted }) {
    return (
        <div className={`w-full flex justify-center py-12 lg:py-20 ${isSubmitted ? 'mt-[23rem] md:mt-48 lg:mt-0' : 'mt-[32rem] md:mt-[25rem] lg:mt-[8rem]'}`}>
            <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20">
                {/* Header */}
                <div className="mb-8 md:mb-16">
                    <h2 className="font-secondary text-h2-responsive uppercase font-bold text-green-dark mb-4 leading-tight">
                        Why partner with us?
                    </h2>
                    <p className="text-p-large-responsive text-gray-500 leading-relaxed">
                        Bolt is trusted by fleet partners from across 45+ countries all over the world.
                        We’re known for:
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