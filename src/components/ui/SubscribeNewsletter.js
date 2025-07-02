import { useState } from "react";
import { useTranslation } from "next-i18next";

export default function SubscribeNewsletter() {
  const { t } = useTranslation("common");

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const handleSubscribe = async () => {
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
    } catch (error) {
      throw new Error("Failed to subscribe");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setError("");
    setIsSubscribing(true);

    // Simulate API call
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    await handleSubscribe();

    // Here you would make the actual API call to subscribe the user
    // const response = await fetch('/api/newsletter/subscribe', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email })
    // });
    // setError('Error happened')

    setIsSubscribed(true);
    setIsSubscribing(false);
    setEmail("");
  };

  if (isSubscribed) {
    return (
      <div className="bg-green-dark rounded-3xl p-8 lg:p-12 text-white text-center">
        <div className="max-w-md mx-auto">
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
          <h2 className="text-h3-responsive font-bold mb-4">
            Thank you for subscribing!
          </h2>
          <p className="text-span-responsive text-white/90 mb-6">
            You'll receive our latest insights, updates, and expert tips on
            optimizing your financial management.
          </p>
          <button
            onClick={() => setIsSubscribed(false)}
            className="text-light-green hover:text-green-400 transition-colors duration-200 text-button-responsive font-medium"
          >
            Subscribe another email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-green-dark rounded-3xl p-8 lg:px-12 lg:py-20 text-white">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Side - Content */}
        <div className="space-y-4">
          <h2 className="text-h2-responsive font-bold leading-tight">
            Subscribe our newsletter
          </h2>
          <p className="text-span-small-responsive text-white/90 leading-relaxed max-w-lg">
            Subscribe to our newsletter and be the first to receive insights,
            updates, and expert tips on optimizing your financial management.
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="space-y-4">
          <div>
            <h3 className="text-h5-responsive font-semibold mb-4">
              Stay up to date
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full bg-green-dark/50 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-light-green focus:border-transparent transition-all duration-200 text-input-responsive"
                  />

                  {error && (
                    <p className="text-xs text-red-400 ml-1 mt-4">{error}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubscribing || !email}
                  className="mt-2 md:mt-0 bg-light-green hover:bg-green-400 disabled:bg-gray-400 disabled:cursor-not-allowed text-green-dark px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 disabled:transform-none text-button-responsive flex items-center justify-center min-w-[120px] h-[52px]"
                >
                  {isSubscribing ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-green-dark/30 border-t-green-dark rounded-full animate-spin"></div>
                      <span>Subscribing...</span>
                    </div>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>
            </form>
          </div>

          <p className="text-span-small-responsive text-white/70">
            By subscribing agree to our{" "}
            <a
              href={`/privacy/`}
              className="text-light-green hover:text-green-400 transition-colors duration-200 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("footer.links.privacy")}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
