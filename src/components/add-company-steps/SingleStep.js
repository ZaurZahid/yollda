import { useState } from "react";
import CloseIcon from "../ui/icons/Close";
import InputWrapper from "./InputWrapper";
import FileUploadModal from "./FileUploadModal";

const InputType = {
  TEXT: 0,
  SELECT: 1,
  CHECKBOX: 2,
  FILE: 3,
};
const SingleStep = () => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    surname: "",
    country: "",
    check: false,
    check2: false,
    file: null,
  });
  const [errors, setErrors] = useState({});
  const [fileModal, setFileModal] = useState(true);
  const handleFileModalOpen = () => {
    setFileModal((prevSate) => !prevSate);
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
  const onClose = () => {
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
          Some random step title.
        </h1>
        {/* Step description */}
        <h1 className="font-medium text-gray-500 ">Some random step title.</h1>
        {/* Main form section */}
        <form className="flex flex-col gap-8">
          {/*------------------------------------------- */}

          <InputWrapper
            value={formData.name}
            type={InputType.TEXT}
            placeholder="First name"
            label="First name"
            description="This is how we gonna recongnize your family"
            handleInputChange={handleInputChange("name")}
          />
          <InputWrapper
            value={formData.surname}
            type={InputType.TEXT}
            placeholder="Last name"
            handleInputChange={handleInputChange("surname")}
            label="Last name"
          />
          <InputWrapper
            value={formData.city}
            type={InputType.SELECT}
            placeholder="Select city"
            options={["Baku", "Zaqatala"]}
            handleInputChange={handleInputChange("city")}
            label="Select city"
          />
          <InputWrapper
            value={formData.country}
            type={InputType.SELECT}
            placeholder="Select country"
            options={["Azerbaijan", "Estonia"]}
            handleInputChange={handleInputChange("country")}
            label="Select country"
          />
          <InputWrapper
            value={formData.check}
            type={InputType.CHECKBOX}
            placeholder="Agree with terms"
            optionDescription="I'm not the registered owner"
            handleInputChange={handleInputChange("check")}
            label="Agree with terms"
            description="If the vehicle is not registered in your name or you are using it under a Power of Attorney, please tick the box below."
          />
          <InputWrapper
            value={formData.check2}
            type={InputType.CHECKBOX}
            placeholder="Agree with terms 2"
            optionDescription="I'm not the registered owner 2"
            handleInputChange={handleInputChange("check2")}
            label="Agree with terms2"
            description="If the vehicle is not registered in your name or you are using it under a Power of Attorney, please tick the box below second time."
          />
          <InputWrapper
            value={formData.check2}
            type={InputType.FILE}
            handleInputChange={handleInputChange("file")}
            handleFileModalOpen={handleFileModalOpen}
            label="Vehicle registration certificate (Front side)*"
            description="Upload a clear photo of the front of your vehicle's technical passport. All information must be clearly visible."
          />

          {/*------------------------------------------- */}
          <div className="flex justify-center gap-5">
            <button
              type="button"
              className="h-[50px] w-full max-w-[235px] text-gray-600 hover:bg-gray-200 transition rounded-2xl bg-gray-100"
            >
              Previous
            </button>
            <button
              type="submit"
              className="h-[50px] w-full max-w-[235px] rounded-2xl text-white bg-[#47E373] hover:bg-[#3ed167] transition"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
      {fileModal && (
        <FileUploadModal isOpen={fileModal} onClose={handleFileModalOpen} />
      )}
    </div>
  );
};

export default SingleStep;
