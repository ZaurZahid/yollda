import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CookieConsent from "./CookieConsent";
import BurgerModal from "./BurgerModal";
// import JoinListModal from './JoinList';

const Layout = ({ children, theme = "normal" }) => {
  const [burgerModal, setBurgerModal] = useState(false);

  const burgerModalSwitch = () => {
    setBurgerModal((prev) => !prev);
  };

  const onCloseBurgerModal = () => {
    setBurgerModal(false);
  };

  return (
    <div className="bg-background font-primary relative">
      <div className="min-h-screen w-full flex justify-center overflow-hidden">
        {/* <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20"> */}
        <Header
          logo={/* siteData?.[0].image ||  */ ""}
          onOpen={burgerModalSwitch}
          theme={theme}
          isBurgerOpen={burgerModal}
        />
        <main className="w-full mt-20 sm:mt-32 xl:mt-20">{children}</main>
        {/* </div> */}
      </div>
      <Footer siteData={/* siteData */ ""} />
      <BurgerModal isOpen={burgerModal} onClose={onCloseBurgerModal} />
      <CookieConsent />
    </div>
  );
};

export default Layout;
