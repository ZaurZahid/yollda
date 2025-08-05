import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Button from "../ui/Button";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import NavbarButton from "../ui/icons/NavbarButton";
import { useTranslation } from "next-i18next";
import YolldaLogo from "../ui/icons/Yollda";
import RegisterBar from "./RegisterBar";
import CrossIcon from "../ui/icons/CrossIcon";

const Header = ({
  logo,
  theme = "normal",
  onOpen,
  isBurgerOpen,
  closeBurgerModal,
  isFleetLayout,
}) => {
  const { t } = useTranslation("common");
  //test
  const headerRef = useRef(null);
  const modalRef = useRef(null);
  const logoRef = useRef(null);

  const [isTransparent, setIsTransparent] = useState(theme === "transparent");

  const [registerMethodsOpen, setRegisterMethodsOpen] = useState(false);

  const registerMethodsSwitch = () => {
    if (isBurgerOpen) {
      closeBurgerModal();
    }
    setRegisterMethodsOpen((prev) => !prev);
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
      setIsTransparent(false);
      logoRef.current.classList.add("fill-green-dark");
      logoRef.current.classList.remove("fill-white");
    } else if (
      !isBurgerOpen &&
      theme === "transparent" &&
      window.scrollY === 0
    ) {
      setIsTransparent(true);
      logoRef.current.classList.add("fill-white");
      logoRef.current.classList.remove("fill-green-dark");
    }
  }, [isBurgerOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY > 0) {
          headerRef.current.classList.add(
            /* "bg-white", */ "shadow-md",
            "bg-white"
          );
          if (theme === "transparent") {
            logoRef.current.classList.add("fill-green-dark");
            logoRef.current.classList.remove("fill-white");
            setIsTransparent(false);
          }
        } else {
          headerRef.current.classList.remove(/* "bg-white", */ "shadow-md");
          if (theme === "transparent") {
            headerRef.current.classList.remove("bg-white");
          }

          if (theme === "transparent" && !isBurgerOpen) {
            logoRef.current.classList.add("fill-white");
            logoRef.current.classList.remove("fill-green-dark");
            setIsTransparent(true);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isBurgerOpen]);

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
              ref={logoRef}
              className={`max-w-24 lg:max-w-32 cursor-pointer ${
                theme === "transparent" ? "fill-white" : "fill-green-dark"
              }`}
            />
          </Link>

          <div
            className={`flex  items-center space-s-4 md:space-s-6 lg:space-s-8  ${
              isTransparent ? "text-white" : "text-black"
            }`}
          >
            <LanguageSwitcher />

            {!isFleetLayout && (
              <>
                <div className="hidden md:flex items-center space-s-4 md:space-s-6 lg:space-s-8">
                  <h5 className="text-span-responsive font-bold ">
                    {t("buttons.support")}
                  </h5>
                  <div className="ms-4 relative">
                    <Button
                      text={t("navigation.join")}
                      onClick={registerMethodsSwitch}
                      classes={`${
                        isTransparent
                          ? "bg-white text-green-950 hover:bg-slate-400 "
                          : "bg-green-dark hover:green-secondary-dark text-white"
                      } whitespace-nowrap h-8 `}
                    />
                    {registerMethodsOpen && (
                      <div
                        ref={modalRef}
                        className="absolute top-16 right-0 rtl:right-auto rtl:left-0 z-50 w-[380px] transition-all duration-300"
                      >
                        <RegisterBar
                          individual={true}
                          handleClose={() => setRegisterMethodsOpen(false)}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={onOpen}
                  className={isTransparent ? "text-white" : null}
                >
                  {isBurgerOpen ? <CrossIcon /> : <NavbarButton />}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
