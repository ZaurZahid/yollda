import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../contex/AuthContex";
const FormState = {
  ENTER_CODE: 0,
  ACCOUNT_CONFLICT: 1,
};

function FleetOtp() {
  const router = useRouter();
  const { isAuth, loginUser, loading } = useAuth();
  const { token: otpToken } = router.query;
  const { phone } = router.query; // get ?phone=... from URL
  const { prefix } = router.query; // get ?phone=... from URL
  const [formData, setFormData] = useState({
    code: "",
  });
  const [timer, setTimer] = useState(60); // Timer state for 60 seconds
  const timerRef = useRef(null); // Ref to store timer interval

  // Start timer when component mounts
  useEffect(() => {
    if (!loading && isAuth) {
      if (document.referrer) {
        router.back();
      } else {
        router.push("/add-company-steps");
      }
    }
  }, [isAuth, loading]);

  useEffect(() => {
    startTimer();
    // Cleanup timer on component unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setTimer(60);
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const validateForm = () => {
    const newErrors = {};

    // Country validation
    if (!formData.code) {
      newErrors.code = "Country code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [formState, setFromState] = useState(FormState.ENTER_CODE);

  const handleInputChage = (value, field) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/v1/account/verify-otp/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Country: "AZ",
            Apptype: "PARTNER",
          },
          body: JSON.stringify({
            token: otpToken,
            otp: formData.code,
          }),
        }
      );
      if (!response.ok) {
        const responseData = await response.json();
        if (responseData?.message?.[0]) {
          setError(responseData?.message?.[0]);
        }
        if (responseData?.error) {
          setError(responseData?.error);
        }
      } else {
        // Reset and start timer after successful resend
        const responseData = await response.json();
        startTimer();
        setError(""); // Clear any previous errors
        const userResponse = await fetch(
          `${process.env.NEXT_PUBLIC_APP_API_URL}/api/v1/account/me/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${responseData?.access}`,
            },
          }
        );
        const userData = await userResponse.json();
        loginUser(userData, responseData?.access, responseData?.refresh);

        router.push("/add-company-steps");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResendCode = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/v1/account/resend-otp/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone_prefix: prefix,
            phone: phone,
          }),
        }
      );
      if (!response.ok) {
        const responseData = await response.json();
        setError(responseData?.message?.[0]);
      }
    } catch (error) {}
  };

  const handlePrevious = () => {
    router.push("/signup");
  };

  const handleContinue = () => {
    console.log("Continuing...");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

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
                  +{prefix + phone || "90 123 456 789123"}
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
                    errors.code ? "border-red-400" : "border-gray-300"
                  } rounded-xl px-4 py-2 text-gray-900 placeholder-gray-500 
                  bg-gray-50 focus:bg-white 
                  focus:outline-none focus:ring-2 focus:ring-light-green focus:border-transparent 
                  transition-all duration-200 text-input-responsive`}
                />
              </div>

              {error && (
                <p className="text-red-500 text-span-small-responsive mt-1">
                  {error}
                </p>
              )}

              {/* Resend Code */}
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Request again</span>
                <div className="flex items-center space-x-2">
                  {timer > 0 && (
                    <span className="text-gray-400 text-sm font-mono">
                      {formatTimer(timer)}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={timer > 0}
                    className={`text-sm font-medium transition-colors ${
                      timer > 0
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-green-500 hover:text-green-600"
                    }`}
                  >
                    Resend Code
                  </button>
                </div>
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
