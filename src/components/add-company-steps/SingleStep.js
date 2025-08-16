import { useEffect, useState } from "react";
import CloseIcon from "../ui/icons/Close";
import InputWrapper from "./InputWrapper";
import FileUploadModal from "./FileUploadModal";
import { useRouter } from "next/router";
import axiosInstance from "../../axios";

const SingleStep = () => {
  const router = useRouter();

  const { step } = router.query;

  const [formData, setFormData] = useState({});
  const [stepData, setStepData] = useState();
  const [errors, setErrors] = useState({});
  const [fileModal, setFileModal] = useState(false);
  const [fileTobeUploaded, setFileToBeUploaded] = useState("");
  useEffect(() => {
    const fetchStepData = async () => {
      try {
        if (step) {
          const res = await axiosInstance(`/api/v1/account/step/${step}`);
          setStepData(res.data);
          const updatedFormData = {};
          res?.data?.fields.forEach(
            (field) =>
              (updatedFormData[field?.field_name] = field?.added_data?.value)
          );
          setFormData(updatedFormData);
        }
      } catch (error) {}
    };

    fetchStepData();
  }, [step]);
  const handleFileDelete = () => {
    return;
  };
  const handleInputChange = (field) => {
    return (value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Clear error when user starts typing/selecting
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };
  };

  const handleCheckBoxChange = (field) => {
    return (key) => {
      setFormData((prev) => {
        const existing = prev[field] ? prev[field].split(",") : [];
        let updated;

        if (existing.includes(key)) {
          // uncheck → remove key
          updated = existing.filter((k) => k !== key);
        } else {
          // check → add key
          updated = [...existing, key];
        }

        return { ...prev, [field]: updated.join(",") };
      });

      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };
  };

  const handleSaveData = async () => {
    try {
      const dataToBeSent = new FormData();
      dataToBeSent.append("form_data", JSON.stringify(formData));
      dataToBeSent.append("step_id", step);
      const res = await axiosInstance.post(
        "/api/v1/account/step-submission/",
        dataToBeSent
      );
      router.push("/add-company-steps");
    } catch (error) {}
  };

  const handleFileUpload = async (selectedFile, expirationDate) => {
    try {
      const formData = new FormData();
      formData.append("field_key", fileTobeUploaded);
      formData.append("file", selectedFile);
      formData.append("sign_up_step_id", step);
      if (expirationDate) formData.append("expiry_date", expirationDate);

      const res = await axiosInstance.post(
        "/api/v1/account/upload-file/",
        formData
      );
    } catch (error) {
    } finally {
      handleFileModalClose();
    }
  };

  const handleFileModalOpen = (fileName) => {
    setFileToBeUploaded(fileName);
    setFileModal(true);
  };
  const handleFileModalClose = () => {
    setFileToBeUploaded("");
    setFileModal(false);
  };
  const onClose = () => {
    router.push("/add-company-steps");
    return;
  };
  return (
    <div className="h-full w-full py-4 pb-32">
      <div className="container max-w-[560px] px-2 flex flex-col gap-4  mx-auto h-full">
        {/* Exit button */}
        <div className="flex justify-end items-center">
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors bg-gray-100 rounded-full"
          >
            <CloseIcon />
          </button>
        </div>
        {/* Step image???? */}
        <div className="flex  items-center">
          <div className="h-[71px] w-[71px] bg-[#D9D9D9] rounded-2xl"></div>
        </div>
        {/* Step Title */}
        <h1 className="font-bold text-gray-800 text-[28px]">
          {stepData?.title || "Some random title"}
        </h1>
        {/* Step description */}
        <h1 className="font-medium text-gray-500 ">
          {stepData?.description || "Some random step description."}
        </h1>
        {/* Main form section */}
        <form className="flex flex-col gap-8">
          {/*------------------------------------------- */}

          {stepData?.fields.map((field) => (
            <InputWrapper
              fieldName={`${field?.field_name}`}
              formData={formData}
              key={field.id}
              type={field?.field_type}
              label={field?.title}
              placeholder={field?.placeholder}
              description={field?.help_text || field?.description}
              value={formData?.[field?.field_name]}
              handleInputChange={handleInputChange(`${field?.field_name}`)}
              options={field?.options}
              handleFileModalOpen={() =>
                handleFileModalOpen(`${field?.field_name}`)
              }
              handleCheckBoxChange={handleCheckBoxChange(
                `${field?.field_name}`
              )}
            />
          ))}

          {/*------------------------------------------- */}
          <div className="flex justify-center gap-5">
            <button
              onClick={onClose}
              type="button"
              className="h-[50px] w-full max-w-[235px] text-gray-600 hover:bg-gray-200 transition rounded-2xl bg-gray-100"
            >
              Previous
            </button>
            <button
              onClick={handleSaveData}
              // type="submit"
              type="button"
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
          onClose={handleFileModalClose}
        />
      )}
    </div>
  );
};

export default SingleStep;
