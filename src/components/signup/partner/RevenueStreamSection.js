import Briefcase from '../../ui/icons/Briefcase';
import PiggyBankBudget from './../../ui/icons/PiggyBankBudget';
import Tools from './../../ui/icons/Tools';

const benefits = [
    {
        id: 1,
        title: "Earn when you want dfsf sdf sdf dsfs sdfdsf ",
        description: "Support drivers during breakdowns, flat tires, and fuel needs. Work weekends or evenings — it's your call.",
        icon: <Briefcase className="w-8 h-8" fillColor={"fill-green-dark"} />
    },
    {
        id: 2,
        title: "Weekly payouts",
        description: "We pay you every week. No upfront fees, no subscriptions — just a fair commission on each completed job.",
        icon: <PiggyBankBudget className="w-8 h-8" fillColor={"fill-green-dark"} />
    },
    {
        id: 3,
        title: "A steady flow of service requests",
        description: "Earn consistently by helping drivers with Yollda's steady flow of assistance service requests.",
        icon: <Tools className="w-8 h-8" fillColor={"fill-green-dark"} />
    }
];

export default function RevenueStreamSection() {
    return (
        <div className="w-full flex justify-center py-12 lg:py-20">
            <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20">
                {/* Header */}
                <div className="mb-8 md:mb-16">
                    <h2 className="font-secondary text-h2-responsive uppercase font-bold text-gray-900 mb-4 leading-tight">
                        MAKE EVERY ROAD{' '}
                        <span className="text-light-green">A REVENUE STREAM</span>
                    </h2>
                    <p className="text-p-large-responsive text-gray-500 leading-relaxed">
                        Join a growing network of service pros who keep drivers safe and moving. Earn on your schedule by providing essential roadside help where it matters most.
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