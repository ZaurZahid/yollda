import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import CookieConsent from './CookieConsent';
import JoinListModal from './JoinList';

const Layout = ({ children, siteData }) => {
    const [joined, setJoined] = useState(false);
    const [joinModalOpen, setJoinModalOpen] = useState(false);

    const onJoinSuccess = () => {
        setJoined(true);
    };

    const onOpenJoinModal = () => {
        setJoinModalOpen(true);
    };

    const onCloseJoinModal = () => {
        setJoined(false)
        setJoinModalOpen(false);
    };

    return (
        <div className="bg-gray-100 relative">
            <div className="min-h-screen w-full flex justify-center overflow-hidden">
                <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20">
                    <Header logo={siteData?.[0].image || ''} onOpen={onOpenJoinModal} />
                    <main className='mt-28 sm:mt-40 xl:mt-28'>
                        {children}
                    </main>
                </div>
            </div>

            <Footer siteData={siteData} />
            <CookieConsent />
            <JoinListModal onSuccess={onJoinSuccess} joined={joined} opened={joinModalOpen} onClose={onCloseJoinModal} />
        </div>
    );
};

export default Layout;
