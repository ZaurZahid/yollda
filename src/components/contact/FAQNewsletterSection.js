import { useState } from "react";
import { useTranslation } from "next-i18next";

import ArrowDown from "./../ui/icons/ArrowDown";

// const faqDataRaw = [
//   { id: 1 },
//   { id: 2 },
//   { id: 3 },
//   { id: 4 },
//   { id: 5, isOpen: true },
//   { id: 6 },
//   { id: 7 },
//   { id: 8 },
// ];

export default function FAQNewsletterSection({ faqsData }) {
  const { t } = useTranslation("common");
  const [faqs, setFaqs] = useState(faqsData.results);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const toggleFAQ = (id) => {
    setFaqs((prev) =>
      prev.map((faq) => ({
        ...faq,
        isOpen: faq.id === id ? !faq.isOpen : false,
      }))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setError("");
    setIsSubscribing(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/web/subscribe-newsletter/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }), // <-- fixed: convert to JSON string
        }
      );

      if (!response.ok) {
        if (response.status === 400) {
          const errorData = await response.json();
          setError(errorData.email?.[0] || 'Unexpected error');
        } else {
          throw new Error('Unexpected error');
        }

        setIsSubscribing(false);
        return;
      }
    } catch (error) {
      throw new Error("Failed to subscribe");
    }

    setIsSubscribed(true);
    setIsSubscribing(false);
    setEmail("");
  };

  const visibleFaqs = showMore ? faqs : faqs.slice(0, 5);

  return (
    <div className="w-full flex justify-center text-white py-10 md:py-16 lg:py-24">
      <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20">
        <div className="flex flex-col md:flex-row">
          {/* Newsletter */}
          <div className="bg-green-dark rounded-3xl px-6 py-6 lg:py-10 text-white md:w-[300px] lg:w-[500px] max-h-[390px] lg:max-h-[450px]">
            {isSubscribed ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-light-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-green-dark"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h2 className="text-h2-responsive font-bold mb-4">
                  {t("signup_page.faq_section.thank_you_title")}
                </h2>
                <p className="text-span-small-responsive text-white/90 mb-6">
                  {t("signup_page.faq_section.thank_you_description")}
                </p>
                <button
                  onClick={() => setIsSubscribed(false)}
                  className="w-full bg-light-green hover:bg-green-400 disabled:bg-gray-400 disabled:cursor-not-allowed text-white lg:px-8 py-4 rounded-xl font-bold transition-all duration-200 transform text-button-large-responsive flex items-center justify-center"
                >
                  {t("signup_page.faq_section.subscribe_another")}
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                <h2 className="text-h2-responsive font-bold leading-tight">
                  {t("signup_page.faq_section.newsletter_title")}
                </h2>
                <p className="text-span-small-responsive text-white/90 leading-relaxed">
                  {t("signup_page.faq_section.newsletter_description")}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t(
                        "signup_page.faq_section.input_placeholder"
                      )}
                      required
                      className="w-full bg-green-dark/50 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-light-green focus:border-transparent transition-all duration-200 text-input-responsive"
                    />
                    {error && (
                      <p className="text-xs text-red-400 ml-1 mt-2">{error}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubscribing}
                    className="w-full bg-light-green hover:bg-green-400 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold transition-all duration-200 transform text-button-large-responsive flex items-center justify-center"
                  >
                    {isSubscribing ? (
                      <div className="flex items-center space-s-2">
                        <div className="w-5 h-5 border-2 border-green-dark/30 border-t-green-dark rounded-full animate-spin"></div>
                        <span>{t("signup_page.faq_section.subscribing")}</span>
                      </div>
                    ) : (
                      t("signup_page.faq_section.subscribe_button")
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* FAQ Section */}
          <div className="space-y-6 flex-1 mt-8 md:mt-0 md:ms-8">
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
                    <ArrowDown
                      strokeColor={`stroke-gray-500`}
                      className={`transition-transform duration-200 ${faq.isOpen ? "rotate-180" : ""
                        }`}
                    />
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

            {faqs.length > 5 && (
              <div className="text-center mt-4">
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="bg-gray-200 hover:bg-gray-100 px-4 py-2 rounded-xl text-dark-gray transition-colors duration-200 text-button-responsive font-medium flex items-center mx-auto group"
                >
                  {showMore
                    ? t("signup_page.faq_section.view_less")
                    : t("signup_page.faq_section.view_more")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
