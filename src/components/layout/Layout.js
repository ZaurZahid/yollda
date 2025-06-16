import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import CookieConsent from './CookieConsent';
// import JoinListModal from './JoinList';

const Layout = ({ children, theme = "normal" }) => {
    const [joined, setJoined] = useState(false);

    const onOpenJoinModal = () => {
        setJoinModalOpen(true);
    };

    return (
        <div className="bg-background font-primary relative">
            <div className="min-h-screen w-full flex justify-center overflow-hidden">
                {/* <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20"> */}
                <Header logo={/* siteData?.[0].image ||  */''} onOpen={onOpenJoinModal} theme={theme} />
                <main className='w-full mt-20 sm:mt-32 xl:mt-20'>
                    {children}
                </main>
                {/* </div> */}
            </div>
            <Footer siteData={/* siteData */ ''} />

            {/* 
            <Footer siteData={siteData} />
            <CookieConsent /> */}
        </div>
    );
};

export default Layout;
