import { useEffect, useRef, useState } from 'react';
import LinkIcon from './../../ui/icons/Link';
import ArrowDown from '../../ui/icons/ArrowDown';
import { useTranslation } from 'next-i18next';

const countryCodes = [
    { code: '+994', flag: 'az', country: 'Azerbaijan' },
    { code: '+44', flag: 'en', country: 'United Kingdom' },
    { code: '+90', flag: '🇹🇷', country: 'Turkey' },
    { code: '+995', flag: '🇬🇪', country: 'Georgia' },
    { code: '+7', flag: '🇰🇿', country: 'Kazakhstan' },
    { code: '+1', flag: '🇺🇸', country: 'United States' },
];

const countries = [
    'Azerbaijan',
    'Turkey',
    'Georgia',
    'Kazakhstan',
    'United States',
    'United Kingdom',
    'Germany',
    'France',
    'Other'
];

const cities = [
    'Baku',
    'Istanbul',
    'Tbilisi',
    'Almaty',
    'New York',
    'London',
    'Berlin',
    'Paris',
    'Other'
];

export default function PartnerSignupSection({ isSubmitted, setIsSubmitted }) {
    const { t } = useTranslation('common')

    const [formData, setFormData] = useState({
        phoneNumber: '',
        countryCode: '+994',
        email: '',
        country: '',
        city: '',
        agreeToTerms: false,
        agreeToPromotions: false
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCountryCodeOpen, setIsCountryCodeOpen] = useState(false);
    const [isCountryOpen, setIsCountryOpen] = useState(false);
    const [isCityOpen, setIsCityOpen] = useState(false);

    const countryCodeDropdownRef = useRef(null);
    const countryDropdownRef = useRef(null);
    const cityDropdownRef = useRef(null);

    // Close the dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (countryCodeDropdownRef.current && !countryCodeDropdownRef.current.contains(event.target)) {
                setIsCountryCodeOpen(false);
            }
            if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
                setIsCountryOpen(false);
            }
            if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target)) {
                setIsCityOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const validateForm = () => {
        const newErrors = {};

        // Phone number validation
        const phoneRegex = /^[0-9\s\-\(\)]{7,15}$/;
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!phoneRegex.test(formData.phoneNumber.replace(/\s/g, ''))) {
            newErrors.phoneNumber = 'Please enter a valid phone number';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email address is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Country validation
        if (!formData.country) {
            newErrors.country = 'Please select a country';
        }

        // City validation
        if (!formData.city) {
            newErrors.city = 'Please select a city';
        }

        // Terms agreement validation (required)
        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the Terms & Services and Privacy Policy';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Clear error when user starts typing/selecting
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
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
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Here you would make the actual API call
            // const response = await fetch('/api/partner-signup', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(formData)
            // });

            setIsSubmitted(true);
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle error (show error message)
        } finally {
            setIsSubmitting(false);
        }
    };

    const selectedCountryCode = countryCodes.find(c => c.code === formData.countryCode);

    return (
        <section className="relative">
            <img
                src="/frame.png"
                alt="Beautiful image"
                class="h-[530px] lg:h-[900px] w-full object-cover -mt-24 md:-mt-32 lg:-mt-24"
            />
            <div className="absolute top-0 left-0 z-10 w-full flex justify-center py-12 lg:py-20 mt-16 lg:mt-24">
                <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20">
                    <div className="grid lg:grid-cols-2 bg-gray-800">
                        {/* Left Side - Content */}
                        <div className="max-w-[90%] text-white">
                            {/* Support Badge */}
                            <div className="inline-block mb-4">
                                <span className="text-light-green text-span-responsive font-bold">
                                    Support
                                </span>
                            </div>

                            {/* Main Heading */}
                            <h2 className="font-secondary text-h2-responsive uppercase font-bold leading-tight mb-2">
                                HOW WOULD YOU LIKE TO PARTNER WITH YOLLDA TO START EARNING?
                            </h2>

                            {/* Description */}
                            <p className="text-p-responsive text-white/90 mb-4 leading-relaxed">
                                Download app Start drive, Earn money!
                            </p>

                            {/* CTA Button */}
                            <a
                                href={'siteData?.[0]?.linkedin'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex bg-light-green text-white font-bold px-6 py-3 rounded-2xl text-button-responsive transition-all duration-200 transform hover:scale-105"
                            >
                                Get Yollda Partner
                            </a>
                        </div>

                        {/* Right Side - Signup Form */}
                        <div className="w-full lg:max-w-[90%] ms-auto bg-white rounded-3xl shadow-2xl p-6 mt-10">
                            {isSubmitted ?
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-light-green rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-8 h-8 text-green-dark" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <h2 className="text-h2-responsive font-bold text-green-dark mb-4">
                                        Welcome to Yollda!
                                    </h2>
                                    <p className="text-span-responsive text-gray-500 mb-8">
                                        Thank you for joining as a partner. We'll review your application and get back to you within 24 hours.
                                    </p>
                                    <div className="space-y-3">
                                        <button
                                            onClick={() => {
                                                setIsSubmitted(false);
                                                setFormData({
                                                    phoneNumber: '',
                                                    countryCode: '+994',
                                                    email: '',
                                                    country: '',
                                                    city: '',
                                                    agreeToTerms: false,
                                                    agreeToPromotions: false
                                                });
                                            }}
                                            className="w-full bg-green-dark hover:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-light-green px-8 py-4 rounded-xl font-bold transition-all duration-200 transform disabled:transform-none text-button-large-responsive flex items-center justify-center"
                                        >
                                            Submit Another Application
                                        </button>
                                    </div>
                                </div>
                                : <>
                                    {/* Form Header */}
                                    <div className="mb-4">
                                        <h3 className="text-h3-responsive font-bold text-gray-900 mb-2">
                                            Sign up
                                        </h3>
                                        <a
                                            href={'siteData?.[0]?.linkedin'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex flex items-center text-light-green text-span-small-responsive font-medium mb-4"
                                        >
                                            <LinkIcon strokeColor="stroke-light-green" className={"me-1 h-5"} />
                                            Sign up as a fleet owner
                                        </a>
                                        <p className="text-p-small-responsive text-gray-500 leading-relaxed">
                                            You're the owner of one or more tow trucks. Join Yollda to manage your drivers, grow your business, and accept service requests through our platform.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        {/* Phone Number */}
                                        <div>
                                            <label className="block text-span-small-responsive font-bold text-gray-800 mb-2">
                                                Phone number
                                            </label>
                                            <div className="flex gap-2">
                                                {/* Country Code Dropdown */}
                                                <div className="relative" ref={countryCodeDropdownRef}>
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsCountryCodeOpen(!isCountryCodeOpen)}
                                                        className={`bg-gray-50 w-[130px] h-11 border border-gray-300 rounded-xl px-3 py-2 text-gray-700 flex items-center space-s-2 hover:bg-gray-200 transition-colors duration-200 min-w-[100px]
                                                    ${isCountryCodeOpen ? 'focus:outline-none focus:ring-2 focus:ring-light-green focus:border-transparent' : ''}
                                                `}
                                                    >
                                                        <img src={`/${selectedCountryCode?.flag}-flag.png`} alt={`${selectedCountryCode?.flag} flag`} className="w-5 h-5" />
                                                        <span className="text-span-responsive">{formData.countryCode}</span>
                                                        <ArrowDown strokeColor={`stroke-gray-500`} className={`transition-transform duration-200 !ms-auto ${isCountryCodeOpen ? 'rotate-180' : ''}`} />
                                                    </button>

                                                    {isCountryCodeOpen && (
                                                        <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto custom-contact-scrollbar">
                                                            {countryCodes.map((country) => (
                                                                <button
                                                                    key={country.code}
                                                                    type="button"
                                                                    onClick={() => {
                                                                        handleInputChange('countryCode', country.code);
                                                                        setIsCountryCodeOpen(false);
                                                                    }}
                                                                    className="w-full px-4 py-3 text-left hover:bg-gray-200 transition-colors duration-200 text-span-responsive first:rounded-t-xl last:rounded-b-xl flex items-center space-s-3"
                                                                >
                                                                    <img src={`/${country.flag}-flag.png`} alt={`${country.flag} flag`} className="w-5 h-5" />
                                                                    <span className="text-gray-500">{country.code}</span>
                                                                    <span className="text-gray-500">{country.country}</span>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Phone Input */}
                                                <div className="flex-1">
                                                    <input
                                                        type="tel"
                                                        placeholder="xx xxx xx xx"
                                                        value={formData.phoneNumber}
                                                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                                                        className={`w-full border ${errors.phoneNumber ? 'border-red-400' : 'border-gray-300'} rounded-xl px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-light-green focus:border-transparent transition-all duration-200 text-input-responsive`}
                                                    />
                                                </div>
                                            </div>
                                            {errors.phoneNumber && (
                                                <p className="text-red-500 text-span-small-responsive mt-1">{errors.phoneNumber}</p>
                                            )}
                                        </div>

                                        {/* Email Address */}
                                        <div>
                                            <label className="block text-span-small-responsive font-bold text-gray-800 mb-2">
                                                Email Address
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    placeholder="Email Address"
                                                    value={formData.email}
                                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                                    className={`w-full border ${errors.email ? 'border-red-400' : 'border-gray-300'} rounded-xl px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-light-green focus:border-transparent transition-all duration-200 text-input-responsive`}
                                                />
                                            </div>
                                            {errors.email && (
                                                <p className="text-red-500 text-span-small-responsive mt-1">{errors.email}</p>
                                            )}
                                        </div>

                                        {/* Country Dropdown */}
                                        <div>
                                            <label className="block text-span-small-responsive font-bold text-gray-800 mb-2">
                                                Country
                                            </label>
                                            <div className="relative" ref={countryDropdownRef}>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsCountryOpen(!isCountryOpen)}
                                                    className={`w-full border ${errors.country ? 'border-red-400' : 'border-gray-300'} rounded-xl px-4 py-2 text-left flex items-center justify-between text-gray-900 hover:bg-gray-200 transition-colors duration-200
                                            ${isCountryOpen & !errors.country ? 'focus:outline-none focus:ring-2 focus:ring-light-green focus:border-transparent' : ''}
                                        `}
                                                >
                                                    <span className={`text-input-responsive ${formData.country ? 'text-gray-900' : 'text-gray-500'}`}>
                                                        {formData.country || 'Country'}
                                                    </span>
                                                    <ArrowDown strokeColor={`stroke-gray-500`} className={`transition-transform duration-200 !ms-auto ${isCountryOpen ? 'rotate-180' : ''}`} />
                                                </button>

                                                {isCountryOpen && (
                                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-40 max-h-60 overflow-y-auto custom-contact-scrollbar">
                                                        {countries.map((country) => (
                                                            <button
                                                                key={country}
                                                                type="button"
                                                                onClick={() => {
                                                                    handleInputChange('country', country);
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
                                                <p className="text-red-500 text-span-small-responsive mt-1">{errors.country}</p>
                                            )}
                                        </div>

                                        {/* City Dropdown */}
                                        <div>
                                            <label className="block text-span-small-responsive font-bold text-gray-800 mb-2">
                                                City
                                            </label>
                                            <div className="relative" ref={cityDropdownRef}>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsCityOpen(!isCityOpen)}
                                                    className={`w-full border ${errors.city ? 'border-red-400' : 'border-gray-300'} rounded-xl px-4 py-2 text-left flex items-center justify-between text-gray-900 hover:bg-gray-200 transition-colors duration-200
                                            ${isCityOpen & !errors.city ? 'focus:outline-none focus:ring-2 focus:ring-light-green focus:border-transparent' : ''}
                                        `}
                                                >
                                                    <span className={`text-input-responsive ${formData.city ? 'text-gray-900' : 'text-gray-500'}`}>
                                                        {formData.city || 'City where you will work'}
                                                    </span>
                                                    <ArrowDown strokeColor={`stroke-gray-500`} className={`transition-transform duration-200 !ms-auto ${isCityOpen ? 'rotate-180' : ''}`} />
                                                </button>

                                                {isCityOpen && (
                                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-30 max-h-60 overflow-y-auto custom-contact-scrollbar">
                                                        {cities.map((city) => (
                                                            <button
                                                                key={city}
                                                                type="button"
                                                                onClick={() => {
                                                                    handleInputChange('city', city);
                                                                    setIsCityOpen(false);
                                                                }}
                                                                className="w-full px-4 py-3 text-left hover:bg-gray-200 transition-colors duration-200 text-span-responsive first:rounded-t-xl last:rounded-b-xl text-gray-700"
                                                            >
                                                                {city}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            {errors.city && (
                                                <p className="text-red-500 text-span-small-responsive mt-1">{errors.city}</p>
                                            )}
                                        </div>

                                        {/* Terms Agreement Checkbox - REQUIRED */}
                                        <div className="space-y-4">
                                            <div className="flex items-start space-s-3">
                                                <div className="relative flex-shrink-0 mt-1">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.agreeToTerms}
                                                        onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                                                        className="sr-only"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleInputChange('agreeToTerms', !formData.agreeToTerms)}
                                                        className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${formData.agreeToTerms
                                                            ? 'bg-light-green border-light-green'
                                                            : errors.agreeToTerms
                                                                ? 'border-red-400'
                                                                : 'border-gray-300 hover:border-light-green'
                                                            }`}
                                                    >
                                                        {formData.agreeToTerms && (
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="w-3 h-3 text-white"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                strokeWidth={3}
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-span-small-responsive text-gray-500 leading-relaxed">
                                                        I agree to the{' '}
                                                        <a
                                                            href={`/terms/`}
                                                            className="text-light-green hover:text-green-dark transition-colors duration-200 underline"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {t('footer.links.termAndCondition')}
                                                        </a>
                                                        {' '}and{' '}
                                                        <a
                                                            href={`/privacy/`}
                                                            className="text-light-green hover:text-green-dark transition-colors duration-200 underline"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {t('footer.links.privacy')}
                                                        </a>
                                                        , and confirm that I will provide only legal services and content on the Yollda platform.
                                                    </p>
                                                </div>
                                            </div>
                                            {errors.agreeToTerms && (
                                                <p className="text-red-500 text-span-small-responsive">{errors.agreeToTerms}</p>
                                            )}

                                            <div className="flex items-start space-s-3">
                                                <p className="text-span-small-responsive text-gray-500 leading-relaxed">
                                                    Once you become a partner, we may occasionally send you promotional offers related to Yollda. You can unsubscribe anytime by updating your communication preferences.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-green-dark hover:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-light-green px-8 py-4 rounded-xl font-bold transition-all duration-200 transform disabled:transform-none text-button-large-responsive flex items-center justify-center"
                                        >
                                            {isSubmitting ? (
                                                <div className="flex items-center space-s-2 text-white">
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                    <span>Becoming Partner...</span>
                                                </div>
                                            ) : (
                                                'Become Partner'
                                            )}
                                        </button>
                                    </form>
                                </>}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}