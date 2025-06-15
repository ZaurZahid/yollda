import { useTranslation } from 'next-i18next';

export default function HowItWorks({ onboardingData }) {
    const { t } = useTranslation('common')

    return (
        <section id="features" className="mt-8 pt-24 pb-12">
            <div className="grid gap-24 xl:gap-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {onboardingData.sort((a, b) => a.id - b.id).map((step) => (
                    <div
                        key={step.id}
                        className="group relative flex flex-col items-center text-center bg-white rounded-3xl shadow-md px-6 py-10"
                    >
                        {/* Step number */}
                        <div
                            className="absolute top-2 left-2 w-10 h-10 xl:w-12 xl:h-12 flex items-center justify-center bg-blue-100 rounded-full text-blue-600 font-bold text-lg"
                        >
                            {step.id}.
                        </div>
                        {/* Image */}
                        <img
                            src={step.image}
                            alt={`Step ${step.id}`}
                            className="absolute -top-16 mx-auto w-32 h-auto transition-transform duration-300 group-hover:translate-y-[-20px]"
                        />
                        {/* Text content */}
                        <div className="mt-44">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {step.title}
                            </h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
