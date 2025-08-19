import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import CloseIcon from "../ui/icons/Close";
import InputWrapper from "./InputWrapper";
import FileUploadModal from "./FileUploadModal";
import axiosInstance from "../../axios";
import LoadingScreen from "../ui/LoadingScreen";
import CrossCirlce from "../ui/icons/CrossCircle";

const SingleStep = () => {
  const router = useRouter();
  const { step } = router.query;

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [stepData, setStepData] = useState(null);
  const [errors, setErrors] = useState({});
  const [fileModal, setFileModal] = useState(false);
  const [fileToBeUploaded, setFileToBeUploaded] = useState("");
  const [stepNotFound, setStepNotFound] = useState(false);
  useEffect(() => {
    if (!step) return;

    let isMounted = true;

    const fetchStepData = async () => {
      try {
        const { data } = await axiosInstance(`/api/v1/account/step/${step}`);

        if (!isMounted) return;

        if (data) {
          setStepData(data);
          setFormData(
            Object.fromEntries(
              data.fields.map((f) => [f.field_name, f.added_data?.value || ""])
            )
          );
        } else {
          setStepNotFound(true);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) setStepNotFound(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchStepData();
    return () => {
      isMounted = false;
    };
  }, [step]);

  /** Handlers */
  const handleInputChange = useCallback(
    (field) => (value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [errors]
  );

  const handleCheckBoxChange = useCallback(
    (field) => (key) => {
      setFormData((prev) => {
        const existing = prev[field]?.split(",") || [];
        const updated = existing.includes(key)
          ? existing.filter((k) => k !== key)
          : [...existing, key];
        return { ...prev, [field]: updated.join(",") };
      });

      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [errors]
  );

  const handleSaveData = async () => {
    try {
      const payload = new FormData();
      payload.append("form_data", JSON.stringify(formData));
      payload.append("step_id", step);

      await axiosInstance.post("/api/v1/account/step-submission/", payload);
      router.push("/add-company-steps");
    } catch (error) {
      console.error("Save error:", error);
    }
  };
  const isFieldVisible = useCallback(
    (field) => {
      const rules = field.rules;
      if (!rules) return true;

      const targetFieldValue = formData[rules.visible_on_key];
      if (!targetFieldValue) return false;

      // Check for single or comma-separated values (especially for checkboxes)
      return targetFieldValue.split(",").includes(rules.visible_on_value);
    },
    [formData]
  );

  const handleFileUpload = async (selectedFile, expirationDate) => {
    try {
      const payload = new FormData();
      payload.append("field_key", fileToBeUploaded);
      payload.append("file", selectedFile);
      payload.append("sign_up_step_id", step);
      if (expirationDate) payload.append("expiry_date", expirationDate);

      const { data } = await axiosInstance.post(
        "/api/v1/account/upload-file/",
        payload
      );

      handleInputChange(fileToBeUploaded)(data?.uuid);
    } catch (error) {
      console.error("File upload error:", error);
    } finally {
      setFileModal(false);
      setFileToBeUploaded("");
    }
  };

  useEffect(() => {
    if (!stepData) return;

    const visibleFieldKeys = stepData.fields
      .filter(isFieldVisible)
      .map((f) => f.field_name);

    setFormData((prev) => {
      const newFormData = { ...prev };
      let changed = false;

      Object.keys(newFormData).forEach((key) => {
        if (!visibleFieldKeys.includes(key)) {
          delete newFormData[key];
          changed = true;
        }
      });

      return changed ? newFormData : prev; // avoid unnecessary state updates
    });
  }, [stepData, isFieldVisible]); // 🚫 removed formData

  const onClose = () => router.push("/add-company-steps");

  /** Loading & Not Found State */
  if (loading) return <LoadingScreen size="lg" />;
  if (stepNotFound)
    return (
      <div className="h-full w-full py-4 pb-32">
        <div className="container max-w-[560px] px-2 flex flex-col gap-4 mx-auto h-full">
          {/* Exit button */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors bg-gray-100 rounded-full"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Not Found Content */}
          <div className="flex flex-col items-center justify-center flex-1 text-center">
            <div className="h-[120px] w-[120px] bg-gray-200 rounded-full flex items-center justify-center mb-6">
              <CrossCirlce size={120} />
            </div>

            <h1 className="font-bold text-gray-800 text-[28px] mb-4">
              Step Not Found
            </h1>

            <p className="font-medium text-gray-500 mb-8 max-w-md">
              The step you're looking for doesn't exist or has been removed.
              Please return to the company setup steps.
            </p>

            <button
              onClick={onClose}
              className="h-[50px] w-full max-w-[300px] rounded-2xl text-white bg-[#47E373] hover:bg-[#3ed167] transition font-medium"
            >
              Go to Company Steps
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="h-full w-full py-4 pb-32">
      <div className="container max-w-[560px] px-2 flex flex-col gap-4 mx-auto h-full">
        {/* Exit button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors bg-gray-100 rounded-full"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Step Info */}
        <div className="flex items-center">
          <div className="h-[71px] w-[71px] bg-[#D9D9D9] rounded-2xl"></div>
        </div>
        <h1 className="font-bold text-gray-800 text-[28px]">
          {stepData?.title || "Step Title"}
        </h1>
        <p className="font-medium text-gray-500">
          {stepData?.description || "Step description."}
        </p>

        {/* Form */}
        <form className="flex flex-col gap-8">
          {stepData?.fields?.filter(isFieldVisible).map((field) => (
            <InputWrapper
              key={field.id}
              type={field.field_type}
              label={field.title}
              placeholder={field.placeholder}
              description={field.help_text || field.description}
              value={formData[field.field_name]}
              handleInputChange={handleInputChange(field.field_name)}
              addedData={field.added_data}
              options={field.options}
              handleFileModalOpen={() => {
                setFileToBeUploaded(field.field_name);
                setFileModal(true);
              }}
              handleCheckBoxChange={handleCheckBoxChange(field.field_name)}
            />
          ))}

          {/* Buttons */}
          <div className="flex justify-center gap-5">
            <button
              type="button"
              onClick={onClose}
              className="h-[50px] w-full max-w-[235px] text-gray-600 hover:bg-gray-200 transition rounded-2xl bg-gray-100"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleSaveData}
              className="h-[50px] w-full max-w-[235px] rounded-2xl text-white bg-[#47E373] hover:bg-[#3ed167] transition"
            >
              Continue
            </button>
          </div>
        </form>
      </div>

      {fileModal && (
        <FileUploadModal
          onConfirm={handleFileUpload}
          isOpen={fileModal}
          onClose={() => setFileModal(false)}
        />
      )}
    </div>
  );
};

export default SingleStep;
