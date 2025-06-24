import { useState } from 'react';
import ArrowDown from './../ui/icons/ArrowDown';

const faqData = [
    {
        id: 1,
        question: "How much does Bolt Drive cost? Do I need to pay for fuel?",
        answer: "Bolt Drive pricing varies by location and vehicle type. You typically pay a daily rate plus mileage. Fuel costs are usually included in the rental price, but this can vary by location. Check the app for specific pricing in your area."
    },
    {
        id: 2,
        question: "How do I unlock a Bolt Drive car?",
        answer: "To unlock a Bolt Drive car, simply open the Bolt app, locate your reserved vehicle on the map, and tap the 'Unlock' button when you're near the car. The doors will unlock automatically via the app's connectivity."
    },
    {
        id: 3,
        question: "Where do I find the car keys?",
        answer: "Bolt Drive cars don't use traditional keys. The vehicle is unlocked and started through the Bolt app on your smartphone. Once unlocked, you can start the engine using the start button inside the vehicle."
    },
    {
        id: 4,
        question: "How do I pay for Yollda Drive?",
        answer: "Payment for Yollda Drive is processed automatically through the payment method linked to your account. You'll be charged based on your usage time and distance traveled. All payments are handled securely through the app."
    },
    {
        id: 5,
        question: "What kind of cars can I rent with Yollda Partner?",
        answer: "All of our cars come with automatic transmission at no extra cost. The specific make and model of hire car depends on availability. Our car types include: small, electric, medium-sized, and premium cars, as well as SUVs and vans. Check the app to see which cars are available to rent nearby.",
        isOpen: true // This one is expanded by default as shown in the image
    },
    {
        id: 6,
        question: "What are the age requirements for renting?",
        answer: "You must be at least 21 years old to rent a vehicle through Yollda. Some premium vehicles may require you to be 25 or older. A valid driver's license is required for all rentals."
    },
    {
        id: 7,
        question: "Can I extend my rental period?",
        answer: "Yes, you can extend your rental period through the app if the vehicle is available. Additional charges will apply based on the extended time and mileage."
    },
    {
        id: 8,
        question: "What happens if I have an accident?",
        answer: "In case of an accident, immediately contact emergency services if needed, then report the incident through the app. Our 24/7 support team will guide you through the process and arrange assistance."
    }
];

export default function FAQNewsletterSection() {
    const [faqs, setFaqs] = useState(faqData);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isSubscribing, setIsSubscribing] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const toggleFAQ = (id) => {
        setFaqs(prev =>
            prev.map(faq => ({
                ...faq,
                isOpen: faq.id === id ? !faq.isOpen : false // Close all others, toggle clicked one
            }))
        );
    };

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) return;

        setError('')
        setIsSubscribing(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Here you would make the actual API call to subscribe the user
        // const response = await fetch('/api/newsletter/subscribe', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ email })
        // });
        // setError('Error happened')

        setIsSubscribed(true);
        setIsSubscribing(false);
        setEmail('');
    };

    const visibleFaqs = showMore ? faqs : faqs.slice(0, 5);

    return (
        <div className="w-full flex justify-center text-white py-10 md:py-16 lg:py-24">
            <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20">
                <div className="flex flex-col md:flex-row">
                    {/* Left Side - Newsletter Subscription */}
                    <div className="bg-green-dark rounded-3xl px-6 py-6 lg:py-10 text-white md:w-[300px] lg:w-[500px] max-h-[390px] lg:max-h-[450px]">
                        {isSubscribed ?
                            <div className="text-center">
                                <div className="w-16 h-16 bg-light-green rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-green-dark" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h2 className="text-h2-responsive font-bold mb-4">
                                    Thank you for subscribing!
                                </h2>
                                <p className="text-span-small-responsive text-white/90 mb-6">
                                    You'll receive our latest insights, updates, and expert tips on optimizing your financial management.
                                </p>
                                <button
                                    onClick={() => setIsSubscribed(false)}
                                    className="w-full bg-light-green hover:bg-green-400 disabled:bg-gray-400 disabled:cursor-not-allowed text-white lg:px-8 py-4 rounded-xl font-bold transition-all duration-200 transform text-button-large-responsive flex items-center justify-center"
                                >
                                    Subscribe another email
                                </button>
                            </div>
                            : <div className="space-y-8">
                                <h2 className="text-h2-responsive font-bold leading-tight">
                                    Subscribe our newsletter
                                </h2>
                                <p className="text-span-small-responsive text-white/90 leading-relaxed">
                                    Subscribe to our newsletter and be the first to receive insights, updates,
                                    and expert tips on optimizing your financial management.
                                </p>

                                <form onSubmit={handleSubscribe} className="space-y-4">
                                    <div>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            required
                                            className="w-full bg-green-dark/50 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-light-green focus:border-transparent transition-all duration-200 text-input-responsive"
                                        />
                                        {error && <p className="text-xs text-red-400 ml-1 mt-2">{error}</p>}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubscribing}
                                        className="w-full bg-light-green hover:bg-green-400 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold transition-all duration-200 transform text-button-large-responsive flex items-center justify-center"
                                    >
                                        {isSubscribing ? (
                                            <div className="flex items-center space-s-2">
                                                <div className="w-5 h-5 border-2 border-green-dark/30 border-t-green-dark rounded-full animate-spin"></div>
                                                <span>Subscribing...</span>
                                            </div>
                                        ) : (
                                            'Subscribe'
                                        )}
                                    </button>
                                </form>
                            </div>}
                    </div>

                    {/* Right Side - FAQ Section */}
                    <div className="space-y-6 flex-1 mt-8 md:mt-0 md:ms-8">
                        {/* FAQ Items */}
                        <div className="space-y-4">
                            {visibleFaqs.map((faq) => (
                                <div
                                    key={faq.id}
                                    className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-md"
                                >
                                    <button
                                        onClick={() => toggleFAQ(faq.id)}
                                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        <span className="text-span-responsive font-medium text-gray-900 pe-4">
                                            {faq.question}
                                        </span>
                                        <ArrowDown strokeColor={`stroke-gray-500`} className={`transition-transform duration-200 ${faq.isOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {faq.isOpen && (
                                        <div className="px-6 pb-4 animate-fade-in">
                                            <div className="pt-2 border-t border-gray-100">
                                                <p className="text-p-small-responsive text-gray-500 leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* View More Button */}
                        {faqs.length > 5 && (
                            <div className="text-center mt-4">
                                <button
                                    onClick={() => setShowMore(!showMore)}
                                    className="bg-gray-200 hover:bg-gray-100 px-4 py-2 rounded-xl text-dark-gray transition-colors duration-200 text-button-responsive font-medium flex items-center mx-auto group"
                                >
                                    {showMore ? 'View less' : 'View more'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}