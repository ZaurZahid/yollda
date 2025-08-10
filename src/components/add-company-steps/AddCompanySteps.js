import { useMemo, useState } from "react";
import CaseIcon from "../ui/icons/CaseIcon";
import FileIcon from "../ui/icons/FileIcon";
import VehicleIcon from "../ui/icons/VehicleIcon";
import CardIcon from "../ui/icons/CardIcon";
import FlashIcon from "../ui/icons/FlashIcon";
import TickCircle from "../ui/icons/TickCircle";
import ClockIcon from "../ui/icons/ClockIcon";
import CrossCirlce from "../ui/icons/CrossCircle";
import DangerIcon from "../ui/icons/DangerIcon";

const TaskStatus = {
  REVIEW: 0,
  ACCEPTED: 1,
  IDLE: 2,
  DECLINED: 3,
};

/* ------- Mocked backend data (simulate API response) ------- */
const useSteps = () =>
  useMemo(
    () => [
      {
        id: "company",
        title: "Add company details",
        description: "Official information that appear on your invoices",
        cta: "Review",
        status: TaskStatus.ACCEPTED,
        icon: CaseIcon,
      },
      {
        id: "documents",
        title: "Upload documents",
        description: "Required official documents",
        cta: "Review",
        status: TaskStatus.DECLINED,
        icon: FileIcon,
      },
      {
        id: "vehicles",
        title: "Add your vehicles",
        description: "Official information that appear on your invoices",
        cta: "Accepted",
        status: TaskStatus.REVIEW,
        icon: VehicleIcon,
      },
      {
        id: "payout",
        title: "Add payout details",
        description: "Official information that appear on your invoices",
        cta: "Add info",
        status: TaskStatus.IDLE,
        icon: CardIcon,
      },
    ],
    []
  );

/* ------- Helper to determine gradient for connecting line ------- */
const getTimelineGradient = (currentStepStatus, nextStepStatus) => {
  const isCurrentCompleted = currentStepStatus === TaskStatus.ACCEPTED;
  const isNextCompleted = nextStepStatus === TaskStatus.ACCEPTED;

  if (isCurrentCompleted && isNextCompleted) {
    return "bg-gradient-to-b from-emerald-400 to-emerald-400";
  } else if (isCurrentCompleted && !isNextCompleted) {
    return "bg-gradient-to-b from-emerald-400 via-emerald-300 to-gray-200";
  } else if (!isCurrentCompleted && isNextCompleted) {
    return "bg-gradient-to-b from-gray-200 via-emerald-300 to-emerald-400";
  } else {
    return "bg-gradient-to-b from-gray-200 to-gray-200";
  }
};

/* ------- Step card ------- */
function StepCard({ step, isLast, nextStep }) {
  const Icon = step.icon;

  const getStepStyles = (status) => {
    switch (status) {
      case TaskStatus.ACCEPTED:
        return {
          outerRing: "bg-emerald-400/20",
          innerCircle: "bg-emerald-400",
          iconColor: "#FFFFFF",
        };
      case TaskStatus.DECLINED:
        return {
          outerRing: "bg-red-400/20",
          innerCircle: "bg-red-400",
          iconColor: "#FFFFFF",
        };
      case TaskStatus.REVIEW:
        return {
          outerRing: "bg-amber-400/20",
          innerCircle: "bg-amber-400",
          iconColor: "#FFFFFF",
        };
      default: // IDLE
        return {
          outerRing: "bg-gray-200/20",
          innerCircle: "bg-gray-100",
          iconColor: "#6B7280",
        };
    }
  };

  const stepStyles = getStepStyles(step.status);

  return (
    <div className="flex w-full">
      {/* Timeline rail + bullet */}
      <div className="relative w-[50px]">
        <div
          className={`absolute top-0 left-0 w-[38px] h-[38px] ${stepStyles.outerRing} rounded-full flex items-center justify-center`}
        >
          <div
            className={`w-[32px] h-[32px] ${stepStyles.innerCircle} rounded-full z-20 flex justify-center items-center shadow-sm`}
          >
            <Icon color={stepStyles.iconColor} />
          </div>
        </div>

        {!isLast && (
          <div
            className={`absolute top-[19px] left-[16px] w-[6px] h-[calc(100%+19px)] ${getTimelineGradient(
              step.status,
              nextStep?.status
            )} rounded-full`}
          />
        )}
      </div>

      {/* Card */}
      <div className="rounded-[26px] p-4 shadow-lg flex flex-col gap-3 w-full bg-white border border-gray-100">
        <div className="flex flex-col gap-3">
          <h3 className="text-gray-800 text-[20px] font-[600]">{step.title}</h3>
          <p className="text-[16px] font-[500] text-gray-500">
            {step.description}
          </p>
        </div>

        {step.status === TaskStatus.IDLE && (
          <button className="rounded-[16px] text-[12px] text-gray-600 font-[600] hover:bg-gray-200 bg-gray-100 py-[6px] px-[16px] w-fit transition-all duration-200 hover:shadow-sm">
            {step.cta}
          </button>
        )}
        {step.status === TaskStatus.DECLINED && (
          <button className="rounded-[16px] text-[12px] text-red-600 font-[600] hover:bg-red-100 bg-red-50 py-[6px] px-[16px] w-fit transition-all duration-200 flex items-center gap-2 hover:shadow-sm">
            <CrossCirlce color="#DC2626" />
            {step.cta}
          </button>
        )}
        {step.status === TaskStatus.ACCEPTED && (
          <button className="rounded-[16px] text-[12px] text-emerald-600 font-[600] hover:bg-emerald-100 bg-emerald-50 py-[6px] px-[16px] w-fit transition-all duration-200 flex items-center gap-2 hover:shadow-sm">
            <TickCircle color="#059669" />
            {step.cta}
          </button>
        )}
        {step.status === TaskStatus.REVIEW && (
          <button className="rounded-[16px] text-[12px] text-amber-600 font-[600] hover:bg-amber-100 bg-amber-50 py-[6px] px-[16px] w-fit transition-all duration-200 flex items-center gap-2 hover:shadow-sm">
            <ClockIcon color="#D97706" />
            {step.cta}
          </button>
        )}
      </div>
    </div>
  );
}

/* ------- Top error item (only shows when hasError is true) ------- */
function TopErrorItem() {
  return (
    <div className="flex w-full">
      {/* left rail + bullet */}
      <div className="relative w-[50px]">
        <div className="absolute top-0 left-0 w-[38px] h-[38px] bg-[#FEF2F2] rounded-full flex items-center justify-center">
          <div className="w-[32px] h-[32px] bg-[#FEF2F2] rounded-full z-20 flex justify-center items-center shadow-sm">
            {/* using FlashIcon as the alert symbol you already import */}
            <DangerIcon />
          </div>
        </div>
      </div>

      {/* red message card */}
      <div className="rounded-[26px] p-4 flex flex-col gap-3 w-full bg-red-50 ">
        <div className="flex flex-col gap-2">
          <h3 className="text-gray-800 text-[18px] font-[500]">
            Get ready to activate your fleet
          </h3>
          <p className="text-[14px] font-[500] text-gray-500">
            Unfortunately, your company account can’t be activated because of
            document issues. Please contact Support to resolve this.
          </p>
          <button className="text-red-600 font-semibold text-[14px] w-fit hover:underline">
            Delete application
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------- Page ------- */
export default function SetupPage() {
  const steps = useSteps();

  // NEW: errors state (true by default)
  const [hasError] = useState(true);

  return (
    <div className="h-full w-full bg-white">
      {/* Main */}
      <div className="container mx-auto px-6 flex flex-col items-stretch gap-8 max-w-[500px]">
        <h1 className="mt-6 text-2xl font-semibold text-gray-900">
          Let's set up your company
        </h1>

        <section className="mt-4">
          {/* Top error (conditional) */}
          {hasError && <TopErrorItem />}

          <div className="space-y-5 flex flex-col mt-5">
            {steps.map((step, i) => (
              <StepCard
                key={step.id}
                step={step}
                isLast={i === steps.length - 1}
                nextStep={steps[i + 1]}
              />
            ))}
          </div>

          {/* Final completion step */}
          <div className="flex w-full mt-7">
            {/* Timeline rail + bullet */}
            <div className="relative w-[50px]">
              <div className="absolute top-0 left-0 w-[38px] h-[38px] bg-gray-200/20 rounded-full flex items-center justify-center">
                <div className="w-[32px] h-[32px] bg-gray-100 rounded-full z-20 flex justify-center items-center shadow-sm">
                  <FlashIcon />
                </div>
              </div>
            </div>

            {/* Card */}
            <div className="rounded-[26px] p-4 flex flex-col gap-3 w-full bg-gray-50">
              <div className="flex flex-col gap-3">
                <h3 className="text-gray-800 text-[20px] font-[600]">
                  Get ready to activate your fleet
                </h3>
                <p className="text-[16px] font-[500] text-gray-500">
                  After everything is completed, your account will be activated
                  on Yollda Fleet and you will be able to manage your drivers
                  and vehicles.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer note */}
        <p className="text-sm text-gray-600 border-t-2 border-gray-200 py-5">
          Registration with Yollda is no longer of interest? You can{" "}
          <a
            href="#"
            className="text-emerald-500 hover:text-emerald-600 transition-colors"
          >
            delete this application
          </a>
        </p>
      </div>
    </div>
  );
}
