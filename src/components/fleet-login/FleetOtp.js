import { useState } from "react";
import { useRouter } from "next/router";

const FormState = {
  ENTER_CODE: 0,
  ACCOUNT_CONFLICT: 1,
};

function FleetOtp() {
  const router = useRouter();
  const { phone } = router.query; // get ?phone=... from URL

  const [formData, setFormData] = useState({
    code: "",
  });
  const [errors, setErrors] = useState({});
  const [formState, setFromState] = useState(FormState.ENTER_CODE);

  const handleInputChage = (value, field) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Verification code:", formData.code);
  };

  const handleResendCode = () => {
    console.log("Resending code...");
  };

  const handlePrevious = () => {
    console.log("Going back...");
  };

  const handleContinue = () => {
    console.log("Continuing...");
  };

  return (
    <div className="h-full bg-white flex justify-center">
      <div className="mt-2 w-full max-w-md">
        {formState === FormState.ENTER_CODE && (
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                Enter code
              </h1>
              <p className="text-gray-600 text-sm leading-relaxed">
                Please type the verification code sent to
                <br />
                <span className="font-medium text-gray-900">
                  {phone || "+90 123 456 789123"}
                </span>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  placeholder="Enter code"
                  value={formData.code}
                  onChange={(e) => handleInputChage(e.target.value, "code")}
                  className={`w-full border ${
                    errors.email ? "border-red-400" : "border-gray-300"
                  } rounded-xl px-4 py-2 text-gray-900 placeholder-gray-500 
                  bg-gray-50 focus:bg-white 
                  focus:outline-none focus:ring-2 focus:ring-light-green focus:border-transparent 
                  transition-all duration-200 text-input-responsive`}
                />
              </div>

              {/* Resend Code */}
              <div>
                <span className="text-gray-500 text-sm">Request again </span>
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-green-500 text-sm font-medium hover:text-green-600 transition-colors"
                >
                  Resend Code
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-600 rounded-[10px] hover:bg-gray-50 transition-colors font-medium"
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-600 rounded-[10px] font-medium disabled:cursor-not-allowed disabled:text-gray-400"
                  disabled={formData.code.length < 4}
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        )}

        {formState === FormState.ACCOUNT_CONFLICT && (
          <div className="max-w-md">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">
                Account conflict
              </h1>
              <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                Your phone number{" "}
                <span className="font-semibold text-gray-900">
                  {phone || "—"}
                </span>{" "}
                is linked to an existing account. How would you like to proceed?
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => console.log("Complete existing")}
                className="w-full h-11 rounded-[10px] bg-green-500 text-white font-medium hover:bg-green-600 transition"
              >
                Complete existing registration
              </button>

              <button
                type="button"
                onClick={() => console.log("Create new")}
                className="w-full h-11 rounded-[10px] bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
              >
                Create new account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FleetOtp;
