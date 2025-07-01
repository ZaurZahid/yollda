import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Button from "../ui/Button";
import ArrowIcon from "../ui/icons/Arrow";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import CloseIcon from "../ui/icons/Close";
import NavbarButton from "../ui/icons/NavbarButton";
import { useTranslation } from "next-i18next";
import YolldaLogo from "../ui/icons/Yollda";
import RegisterBar from "./RegisterBar";

const Header = ({ logo, theme = "normal", onOpen, isBurgerOpen }) => {
  const { t } = useTranslation("common");
  //test
  const headerRef = useRef(null);
  const modalRef = useRef(null);

  const [registerMethodsOpen, setRegisterMethodsOpen] = useState(false);

  const registerMethodsSwitch = () => {
    if (!isBurgerOpen) {
      setRegisterMethodsOpen((prev) => !prev);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setRegisterMethodsOpen(false);
      }
    };

    if (registerMethodsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [registerMethodsOpen]);

  useEffect(() => {
    if (isBurgerOpen) {
      setRegisterMethodsOpen(false);
    }
  }, [isBurgerOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY > 0) {
          headerRef.current.classList.add("bg-white", "shadow-md");
        } else {
          headerRef.current.classList.remove("bg-white", "shadow-md");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isParentActive = (currentPath, targetPath) => {
    if (targetPath === "/") {
      return currentPath === "/";
    }

    if (currentPath.includes("/blogs") && targetPath.includes("#blogs")) {
      return true;
    }

    // For all other paths, check parent-child relationship
    return (
      currentPath === targetPath || currentPath.startsWith(`${targetPath}/`)
    );
  };

  return (
    <header
      ref={headerRef}
      className={`header w-full flex justify-center fixed top-0 left-0 z-30 transition-all duration-300 ${
        theme === "transparent" ? "bg-transparent" : "bg-white"
      }`}
    >
      <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20">
        <div className="flex justify-between items-center py-4">
          <Link href="/" passHref>
            <YolldaLogo
              className={`max-w-24 lg:max-w-32 cursor-pointer ${
                theme === "transparent" ? "fill-white" : "fill-green-dark"
              }`}
            />
          </Link>

          <div className="flex items-center space-s-4 md:space-s-6 lg:space-s-8">
            <LanguageSwitcher />

            <div className="hidden md:flex items-center space-s-4 md:space-s-6 lg:space-s-8">
              <h5 className="text-span-responsive font-bold">Destek</h5>
              <div className="ms-4 relative">
                <Button
                  text={t("navigation.join")}
                  onClick={registerMethodsSwitch}
                  classes={
                    " bg-green-dark hover:green-secondary-dark text-white whitespace-nowrap h-8 "
                  }
                />
                {registerMethodsOpen && (
                  <div
                    ref={modalRef}
                    className="absolute top-16 right-0 rtl:right-auto rtl:left-0 z-50 w-[380px] transition-all duration-300"
                  >
                    <RegisterBar individual={true} />
                  </div>
                )}
              </div>
            </div>
            <button onClick={onOpen}>
              <NavbarButton />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
