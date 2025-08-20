// components/layout/FleetSidebar.js

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../../contex/AuthContex";
import useIsMobile from "../../hooks/useIsMobile";

const FleetSidebar = ({ isOpen, onClose }) => {
  const { userData, logOut, useData } = useAuth();
  const router = useRouter();

  const isMobile = useIsMobile();

  // Auto-close sidebar if screen is resized to desktop
  useEffect(() => {
    if (!isMobile && isOpen) {
      onClose();
    }
  }, [isMobile, isOpen, onClose]);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !event.target.closest(".fleet-sidebar") &&
        !event.target.closest(".fleet-sidebar-toggle")
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  const handleLogout = async () => {
    try {
      await fetch("/api/v1/account/logout/", { method: "POST" });
      logOut();
      router.push("/signup");
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-80 bg-white z-50 shadow-lg transform transition-transform duration-300 fleet-sidebar ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-5 border-b">
        <h2 className="text-lg font-bold">{userData?.name || "Elshan "}</h2>
        <p className="text-sm text-gray-500">Orignos • Application</p>
      </div>

      <div className="p-5 space-y-4">
        <button
          onClick={() => {
            router.push("/drivers");
            onClose();
          }}
          className="block w-full text-left text-gray-800 font-medium hover:text-green-700"
        >
          Drivers
        </button>
        <button
          onClick={() => {
            router.push("/vehicles");
            onClose();
          }}
          className="block w-full text-left text-gray-800 font-medium hover:text-green-700"
        >
          Vehicles
        </button>
      </div>

      <div className="absolute bottom-0 w-full border-t p-4">
        <div className="text-sm text-gray-600 mb-2">
          <p className="font-medium">{userData?.name || "Elshan Ahmadov"}</p>
          <p>{userData?.email || "logo.aze@gmail.com"}</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm font-medium text-red-500 hover:underline"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default FleetSidebar;
