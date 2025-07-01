import { useState } from 'react';
import Link from 'next/link';

export default function UnsubscribePage() {
  const [step, setStep] = useState('form');
  const [formData, setFormData] = useState({
    email: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStep('processing');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Here you would make the actual API call
      // const response = await fetch('/api/unsubscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      setStep('success');
    } catch (error) {
      console.error('Error unsubscribing:', error);
      setStep('form');
    }
  };

  return (
    <div className="w-full flex justify-center py-12 lg:py-20">
      <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20">
        <div className="md:max-w-[80%] lg:max-w-[50%] mx-auto bg-white rounded-3xl shadow-xl p-8 lg:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            {step === 'success' ?
              <>
                <h1 className="text-h2-responsive font-bold text-green-dark mb-4">
                  You've been unsubscribed
                </h1>
                <p className="text-span-responsive text-gray-600 mb-8 leading-relaxed">
                  We're sorry to see you go! You have been successfully unsubscribed from our newsletter.
                  You will no longer receive marketing emails from Allver.
                </p>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-span-small-responsive text-gray-500 mb-2">
                      Unsubscribed email:
                    </p>
                    <p className="text-span-responsive font-medium text-gray-900">
                      {formData.email}
                    </p>
                  </div>
                </div>
              </>
              : <>
                <h1 className="text-h2-responsive font-bold text-gray-900 mb-4">
                  Unsubscribe from Newsletter
                </h1>
                <p className="text-span-responsive text-gray-600 leading-relaxed">
                  We're sorry to see you go! Help us improve by letting us know why you're unsubscribing.
                </p>
              </>
            }
          </div>

          {step === 'success' ? null
            : <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Address */}
              <div>
                <label className="block text-span-responsive font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full border ${errors.email ? 'border-red-400' : 'border-gray-300'} rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-light-green focus:border-transparent transition-all duration-200 text-input-responsive`}
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
                  disabled={step === 'processing'}
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold transition-all duration-200 transform text-button-large-responsive flex items-center justify-center disabled:bg-gray-400"
                >
                  Unsubscribe from Newsletter
                </button>
              </div>
            </form>}
        </div>
      </div>
    </div>
  );
}