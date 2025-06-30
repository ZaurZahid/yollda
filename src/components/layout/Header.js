import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Button from "../ui/Button";
import ArrowIcon from "../ui/icons/Arrow";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import CloseIcon from "../ui/icons/Close";
import { useTranslation } from "next-i18next";
import YolldaLogo from "../ui/icons/Yollda";
import NavbarButton from "../ui/icons/navbarButton";
import RegisterBar from "./RegisterBar";

const Header = ({ logo, theme = "normal", onOpen, isBurgerOpen }) => {
  const { t } = useTranslation("common");
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

  // Navigation links array to easily extend or modify in the future
  const navLinks = [
    { href: "/", label: t("navigation.home") },
    { href: "/#about", label: t("navigation.about"), id: "about" },
    { href: "/#fag", label: t("navigation.faq"), id: "fag" },
    {
      href: "/#shopping-centers",
      label: t("navigation.shopping_centers"),
      id: "shopping-centers",
    },
    { href: "/#features", label: t("navigation.features"), id: "features" },
    { href: "/#blogs", label: t("navigation.blog"), id: "blogs" },
    { href: "/#contact", label: t("navigation.contact"), id: "contact" },
  ];

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
            <YolldaLogo className="max-w-24 lg:max-w-32 cursor-pointer fill-green-dark" />
          </Link>

          {/* <div className="lg:hidden">
                        <div className="flex items-center">
                            <LanguageSwitcher />
                            <button onClick={toggleMenu} className="ml-7">
                                <img src={"/menu.svg"} alt="Menu" className="w-6 h-6" />
                            </button>
                        </div>
                    </div> */}

          {/* <nav className={`${isOpen ? 'fixed inset-0 bg-white z-50' : 'hidden'} lg:flex lg:relative lg:bg-transparent lg:z-auto`}>
                        <div className="lg:flex sm:justify-center lg:items-center flex-wrap xl:justify-between mx-4 mt-16 lg:mt-0">
                            {isOpen && (
                                <div className="absolute top-0 right-0 p-4 flex justify-between w-full">
                                    <LanguageSwitcher />
                                    <Button
                                        text=""
                                        IconComponent={<CloseIcon strokeColor={"stroke-black"} />}
                                        onClick={toggleMenu}
                                        classes={"absolute z-10 top-3 right-3 bg-gray-300 hover:bg-gray-400 rounded-lg !px-1 !pr-3 flex items-center justify-center"}
                                    />

                                </div>
                            )}

                            {navLinks.map((link) => {
                                const isActive = isParentActive(router.pathname, link.href);
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        passHref
                                        className={`block lg:inline-block px-3 py-2 rounded-lg font-semibold transition-colors duration-300 text-sm text-center ${isActive ? 'text-gray-900 bg-blue-200 cursor-default pointer-events-none' : 'text-gray-900 hover:text-gray-500'
                                            }`}
                                        onClick={(e) => {
                                            e.preventDefault()

                                            setIsOpen(false); // Close the modal
                                            if (link.href.startsWith("/#")) {
                                                const header = document.querySelector('header');
                                                const targetElement = document.getElementById(link.id);

                                                window.scrollTo({
                                                    top: targetElement.offsetTop - header.offsetHeight,
                                                    behavior: 'smooth'
                                                });
                                            }
                                        }}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}

                            {isOpen && (
                                <div className="mt-12">
                                    <Button
                                        text={t('navigation.join')}
                                        IconComponent={<ArrowIcon strokeColor={"stroke-white"} />}
                                        onClick={() => {
                                            onOpen()
                                            toggleMenu()
                                        }}
                                        classes={"bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap h-11 mt-4 mx-auto"}
                                    />
                                </div>
                            )}
                        </div>
                    </nav> */}

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
                    className="absolute top-16 right-0 z-50 w-[380px] transition-all duration-300"
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
