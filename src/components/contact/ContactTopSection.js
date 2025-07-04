import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ArrowDown from "../ui/icons/ArrowDown";
import SmsIcon from "../ui/icons/Sms";
import { useTranslation } from "next-i18next";

const countryCodes = [
  { code: "+994", flag: "az", country: "Azerbaijan" },
  { code: "+44", flag: "en", country: "United Kingdom" },
  { code: "+90", flag: "🇹🇷", country: "Turkey" },
  { code: "+995", flag: "🇬🇪", country: "Georgia" },
  { code: "+7", flag: "🇰🇿", country: "Kazakhstan" },
  { code: "+1", flag: "🇺🇸", country: "United States" },
];

const services = [
  "Emergency Towing",
  "Tire Repair",
  "Battery Jump-start",
  "Fuel Delivery",
  "Lockout Service",
  "Fleet Management",
  "Partnership Inquiry",
  "General Support",
  "Other",
];

const countries = [
  "Azerbaijan",
  "Turkey",
  "Georgia",
  "Kazakhstan",
  "United States",
  "United Kingdom",
  "Germany",
  "France",
  "Other",
];

export default function ContactTopSection({ contactUsData }) {
  const { t } = useTranslation("common");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+994",
    phone: "",
    service: "",
    country: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCountryCodeOpen, setIsCountryCodeOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);

  const countryCodeDropdownRef = useRef(null);
  const servicesDropdownRef = useRef(null);
  const countryDropdownRef = useRef(null);

  // Close the dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        countryCodeDropdownRef.current &&
        !countryCodeDropdownRef.current.contains(event.target)
      ) {
        setIsCountryCodeOpen(false);
      }
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target)
      ) {
        setIsServiceOpen(false);
      }
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target)
      ) {
        setIsCountryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

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

    // Phone validation
    const phoneRegex = /^[0-9\s\-\(\)]{7,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = t(
        "signup_page.signup_section.form.errors.phone_required"
      );
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = t(
        "signup_page.signup_section.form.errors.phone_invalid"
      );
    }

    // Service validation
    if (!formData.service) {
      newErrors.service = "Please select a service";
    }

    // Country validation
    if (!formData.country) {
      newErrors.country = t(
        "signup_page.signup_section.form.errors.country_required"
      );
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = t("contactus_page.form.errors.message_required");
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t("contactus_page.form.errors.message_least");
    } else if (formData.message.trim().length > 500) {
      newErrors.message = t("contactus_page.form.errors.message_most");
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

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would make the actual API call
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error (show error message)
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCountryCode = countryCodes.find(
    (c) => c.code === formData.countryCode
  );

  return (
    <div className="w-full flex justify-center text-white py-16 lg:py-24">
      <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20">
        <div className="grid md:grid-cols-2 gap-14 md:gap-4 lg:gap-16 items-start">
          {/* Left Side - Contact Information */}
          <div className="flex flex-col">
            {/* Header */}
            <div className="flex flex-col md:max-w-[80%]">
              <div className="inline-block mb-4">
                <span className="text-light-green text-span-responsive font-bold">
                  {t("buttons.support")}
                </span>
              </div>
              <h2 className="font-secondary text-h2-responsive font-bold text-green-dark mb-6">
                {contactUsData?.title}
              </h2>
              <p className="text-p-large-responsive text-gray-600 leading-relaxed">
                {contactUsData?.description}
              </p>
              <div className="mt-2 flex flex-col gap-2">
                {contactUsData?.emails?.map((email, index) => (
                  <a
                    key={index}
                    href={`mailto:${email}`}
                    className="text-p-large-responsive text-gray-700 hover:text-green-dark transition-colors duration-200"
                  >
                    {email}
                  </a>
                ))}
              </div>
              <div className="mt-2 flex flex-col gap-2">
                {contactUsData?.phone_numbers?.map((phone, index) => (
                  <a
                    key={index}
                    href={`tel:${phone}`}
                    className="text-p-large-responsive text-gray-700 hover:text-green-dark transition-colors duration-200"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </div>

            {/* Support Sections */}
            <div className="grid md:grid-cols-2 gap-8 lg:gap-10 mt-10 lg:mt-20">
              <div>
                <h6 className="text-h6-responsive font-medium text-green-dark mb-4">
                  {t("contactus_page.support_section.heading")}
                </h6>
                <p className="text-p-small-responsive text-gray-500 leading-relaxed">
                  {t("contactus_page.support_section.description")}
                </p>
              </div>

              <div>
                <h6 className="text-h6-responsive font-medium text-green-dark mb-4">
                  {t("contactus_page.feedback_section.heading")}
                </h6>
                <p className="text-p-small-responsive text-gray-500 leading-relaxed">
                  {t("contactus_page.feedback_section.description")}
                </p>
              </div>

              <div>
                <h6 className="text-h6-responsive font-medium text-green-dark mb-4">
                  {t("contactus_page.media_section.heading")}
                </h6>
                <p className="text-text-p-small-responsive text-gray-500 leading-relaxed">
                  {t("contactus_page.media_section.description")}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="flex lg:justify-end">
            <div className="bg-green-dark rounded-3xl p-6 w-full lg:max-w-[480px]">
              {isSubmitted ? (
                <div className="flex flex-col text-center">
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
                  <h4 className="text-h4-responsive font-bold text-white mb-2">
                    {t("contactus_page.form.success.heading")}
                  </h4>
                  <p className="text-span-responsive text-white/80 ml-1">
                    {t("contactus_page.form.success.description")}
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        firstName: "",
                        lastName: "",
                        email: "",
                        countryCode: "+994",
                        phone: "",
                        service: "",
                        country: "",
                        message: "",
                      });
                    }}
                    type="submit"
                    className="mt-6 w-full bg-light-green hover:bg-green-400 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold transition-all duration-200 text-button-large-responsive flex items-center justify-center"
                  >
                    {t("buttons.send_another_button")}
                  </button>
                </div>
              ) : (
                <div className="mb-12">
                  <h2 className="text-h2-responsive font-bold text-white mb-2">
                    Get in touch
                  </h2>
                  <p className="text-span-large-responsive text-white/80 ml-2">
                    You can reach us any time
                  </p>
                </div>
              )}

              {isSubmitted ? null : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder={t("contactus_page.form.first_name")}
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className={`w-full bg-green-secondary-dark border ${
                          errors.firstName
                            ? "border-red-400"
                            : "border-white/20"
                        } rounded-xl px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-light-green focus:border-transparent transition-all duration-200 text-input-small-responsive`}
                      />
                      {errors.firstName && (
                        <p className="text-red-400 text-span-small-responsive mt-1">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder={t("contactus_page.form.last_name")}
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className={`w-full bg-green-secondary-dark border ${
                          errors.lastName ? "border-red-400" : "border-white/20"
                        } rounded-xl px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-light-green focus:border-transparent transition-all duration-200 text-input-small-responsive`}
                      />
                      {errors.lastName && (
                        <p className="text-red-400 text-span-small-responsive mt-1">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <div className="relative">
                      <SmsIcon
                        strokeColor="stroke-white/60"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                      />
                      {/* <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" /> */}
                      <input
                        type="email"
                        placeholder={t("form.email_address")}
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className={`w-full bg-green-secondary-dark border ${
                          errors.email ? "border-red-400" : "border-white/20"
                        } rounded-xl pl-12 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-light-green focus:border-transparent transition-all duration-200 text-input-small-responsive`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-span-small-responsive mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <div className="flex gap-2">
                      {/* Country Code Dropdown */}
                      <div className="relative" ref={countryCodeDropdownRef}>
                        <button
                          type="button"
                          onClick={() =>
                            setIsCountryCodeOpen(!isCountryCodeOpen)
                          }
                          className={`bg-green-secondary-dark border border-white/20 rounded-xl px-4 py-2 w-[130px] text-white flex items-center space-s-2  transition-colors duration-200 min-w-[100px]
                                                    ${
                                                      isCountryCodeOpen
                                                        ? "focus:outline-none focus:ring-2 focus:ring-light-green focus:border-transparent"
                                                        : ""
                                                    }
                                                    `}
                        >
                          <img
                            src={`/${selectedCountryCode?.flag}-flag.png`}
                            alt={`${selectedCountryCode?.flag} flag`}
                            className="w-5 h-5"
                          />
                          <span className="text-span-responsive">
                            {formData.countryCode}
                          </span>
                          <ArrowDown
                            strokeColor={`stroke-gray-500`}
                            className={`transition-transform duration-200 !ms-auto ${
                              isCountryCodeOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {isCountryCodeOpen && (
                          <div className="absolute top-full left-0 rtl:right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto custom-contact-scrollbar">
                            {countryCodes.map((country) => (
                              <button
                                key={country.code}
                                type="button"
                                onClick={() => {
                                  handleInputChange(
                                    "countryCode",
                                    country.code
                                  );
                                  setIsCountryCodeOpen(false);
                                }}
                                className="w-full px-4 py-3 text-left hover:bg-gray-200 transition-colors duration-200 text-span-responsive first:rounded-t-xl last:rounded-b-xl flex items-center space-s-3"
                              >
                                <img
                                  src={`/${country.flag}-flag.png`}
                                  alt={`${country.flag} flag`}
                                  className="w-5 h-5"
                                />
                                <span className="text-gray-500">
                                  {country.code}
                                </span>
                                <span className="text-gray-500">
                                  {country.country}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Phone Input */}
                      <div className="flex-1">
                        <input
                          type="tel"
                          placeholder="70 867 59 62"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className={`w-full bg-green-secondary-dark border ${
                            errors.phone ? "border-red-400" : "border-white/20"
                          } rounded-xl px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-light-green focus:border-transparent transition-all duration-200 text-input-small-responsive`}
                        />
                      </div>
                    </div>
                    {errors.phone && (
                      <p className="text-red-400 text-span-small-responsive mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Service Dropdown */}
                  <div>
                    <div className="relative" ref={servicesDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsServiceOpen(!isServiceOpen)}
                        className={`w-full bg-green-secondary-dark border ${
                          errors.service ? "border-red-400" : "border-white/20"
                        } rounded-xl px-4 py-3 text-left flex items-center justify-between text-white  transition-colors duration-200
                                                ${
                                                  isServiceOpen &
                                                  !errors.service
                                                    ? "focus:outline-none focus:ring-2 focus:ring-light-green focus:border-transparent"
                                                    : ""
                                                }
                                            `}
                      >
                        <span
                          className={`text-input-small-responsive ${
                            formData.service ? "text-white" : "text-white/60"
                          }`}
                        >
                          {formData.service ||
                            t("contactus_page.form.services")}
                        </span>
                        <ArrowDown
                          strokeColor={`stroke-gray-500`}
                          className={`transition-transform duration-200 ${
                            isServiceOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isServiceOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-40 max-h-60 overflow-y-auto custom-contact-scrollbar">
                          {services.map((service) => (
                            <button
                              key={service}
                              type="button"
                              onClick={() => {
                                handleInputChange("service", service);
                                setIsServiceOpen(false);
                              }}
                              className="w-full px-4 py-3 text-left hover:bg-gray-200 transition-colors duration-200 text-span-responsive first:rounded-t-xl last:rounded-b-xl text-gray-700"
                            >
                              {service}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    {errors.service && (
                      <p className="text-red-400 text-span-small-responsive mt-1">
                        {errors.service}
                      </p>
                    )}
                  </div>

                  {/* Country Dropdown */}
                  <div>
                    <div className="relative" ref={countryDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsCountryOpen(!isCountryOpen)}
                        className={`w-full bg-green-secondary-dark border ${
                          errors.country ? "border-red-400" : "border-white/20"
                        } rounded-xl px-4 py-3 text-left flex items-center justify-between text-white  transition-colors duration-200
                                                ${
                                                  isCountryOpen &
                                                  !errors.country
                                                    ? "focus:outline-none focus:ring-2 focus:ring-light-green focus:border-transparent"
                                                    : ""
                                                }
                                            `}
                      >
                        <span
                          className={`text-input-small-responsive ${
                            formData.country ? "text-white" : "text-white/60"
                          }`}
                        >
                          {formData.country || t("contactus_page.form.country")}
                        </span>
                        <ArrowDown
                          strokeColor={`stroke-gray-500`}
                          className={`transition-transform duration-200 ${
                            isCountryOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isCountryOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-30 max-h-60 overflow-y-auto custom-contact-scrollbar">
                          {countries.map((country) => (
                            <button
                              key={country}
                              type="button"
                              onClick={() => {
                                handleInputChange("country", country);
                                setIsCountryOpen(false);
                              }}
                              className="w-full px-4 py-3 text-left hover:bg-gray-200 transition-colors duration-200 text-span-responsive first:rounded-t-xl last:rounded-b-xl text-gray-700"
                            >
                              {country}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    {errors.country && (
                      <p className="text-red-400 text-span-small-responsive mt-1">
                        {errors.country}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <div className="relative">
                      <textarea
                        placeholder={t("contactus_page.form.howWeCanHelp")}
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        rows={4}
                        maxLength={120}
                        className={`w-full bg-green-secondary-dark border ${
                          errors.message ? "border-red-400" : "border-white/20"
                        } rounded-xl px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-light-green focus:border-transparent transition-all duration-200 text-input-small-responsive resize-none`}
                      />
                      <div className="absolute bottom-3 right-3 text-span-small-responsive text-white/50">
                        {formData.message.length}/120
                      </div>
                    </div>
                    {errors.message && (
                      <p className="text-red-400 text-span-small-responsive mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-light-green hover:bg-green-400 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold transition-all duration-200 text-button-large-responsive flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-s-2">
                        <div className="w-5 h-5 border-2 border-green-dark/30 border-t-green-dark rounded-full animate-spin"></div>
                        <span>{t("buttons.sending_state")}</span>
                      </div>
                    ) : (
                      t("buttons.subscribe")
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
