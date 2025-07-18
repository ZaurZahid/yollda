import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";

export default function UnsubscribePage() {
  const { t } = useTranslation("common");
  const [step, setStep] = useState("form");

  const [formData, setFormData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = t(
        "signup_page.signup_section.form.errors.email_required"
      );
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t(
        "signup_page.signup_section.form.errors.email_invalid"
      );
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStep("processing");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/web/subscribe-newsletter/?email=${formData.email}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        if (response.status === 400) {
          const errorData = await response.json();
          setErrors({
            email: errorData.error || "Unexpected error",
          });
        } else {
          throw new Error("Unexpected error");
        }

        setStep("form");
        return;
      }
    } catch (error) {
      setStep("form");
      setErrors({
        email: "Failed to unsubscribe",
      });

      return;
    }

    setStep("success");
  };

  return (
    <div className="w-full flex justify-center py-12 lg:py-20">
      <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20">
        <div className="md:max-w-[80%] lg:max-w-[50%] mx-auto bg-white rounded-3xl shadow-xl p-8 lg:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            {step === "success" ? (
              <>
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
                <h1 className="text-h2-responsive font-bold text-green-dark mb-4">
                  {t("unsubscribe_page.success.heading")}
                </h1>
                <p className="text-span-responsive text-gray-600 mb-8 leading-relaxed">
                  {t("unsubscribe_page.success.description")}
                </p>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-span-small-responsive text-gray-500 mb-2">
                      {t("unsubscribe_page.success.unsubscribed_email")}
                    </p>
                    <p className="text-span-responsive font-medium text-gray-900">
                      {formData.email}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-red-300 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 8.586l4.95-4.95a1 1 0 111.414 1.414L11.414 10l4.95 4.95a1 1 0 01-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 01-1.414-1.414L8.586 10l-4.95-4.95a1 1 0 011.414-1.414L10 8.586z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h1 className="text-h2-responsive font-bold text-gray-900 mb-4">
                  {t("unsubscribe_page.form.heading")}
                </h1>
                <p className="text-span-responsive text-gray-600 leading-relaxed">
                  {t("unsubscribe_page.form.description")}
                </p>
              </>
            )}
          </div>

          {step === "success" ? null : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Address */}
              <div>
                <label className="block text-span-responsive font-medium text-gray-700 mb-2">
                  {t("unsubscribe_page.form.email_address")}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder={t("unsubscribe_page.form.email_placeholder")}
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`w-full border ${
                      errors.email ? "border-red-400" : "border-gray-300"
                    } rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-light-green focus:border-transparent transition-all duration-200 text-input-responsive`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-span-small-responsive mt-1 flex items-center">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={step === "processing"}
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold transition-all duration-200 transform text-button-large-responsive flex items-center justify-center disabled:bg-gray-400"
                >
                  {t("unsubscribe_page.form.submit_button")}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
