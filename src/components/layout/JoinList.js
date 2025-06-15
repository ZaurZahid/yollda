import React, { useEffect, useRef, useState } from 'react';
import Button from '../ui/Button';
import CloseIcon from '../ui/icons/Close';
import { useTranslation } from 'next-i18next';
import WhitelistJoinForm from '../ui/WhitelistJoinForm';

const JoinListModal = ({ onSuccess, joined, opened, onClose }) => {
    const { t } = useTranslation('common');
    const modalRef = useRef(null);
    const [centers, setCenters] = useState([])

    useEffect(() => {
        const fetchShoppingCenters = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/shop/shopping-centers`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                setCenters(data);
            } catch (err) {
                console.log(err.message);
            }
        };

        if (opened) fetchShoppingCenters();
    }, [opened]);

    // Close the modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const handleClose = () => {
        onClose();
    };

    if (!opened) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-30">
            <div ref={modalRef} className="sm:w-full lg:w-3/5 container rounded-2xl mx-auto my-auto px-4 md:px-0">
                <div className="bg-white rounded-lg shadow-lg w-full flex flex-col md:flex-row relative">
                    <Button
                        text=""
                        IconComponent={<CloseIcon strokeColor={"stroke-black"} />}
                        onClick={handleClose}
                        classes={"absolute z-10 top-3 right-3 bg-gray-300 hover:bg-gray-400 rounded-full !px-1 !pr-3 flex items-center justify-center"}
                    />

                    <div className="sm:w-full lg:w-3/5 min-h-64 md:rounded-bl-lg rounded-tl-lg rounded-tr-lg md:rounded-tr-none bg-gradient-to-tr p-8 flex flex-col justify-between p-4 relative">
                        <img src="/AllVerWhite.svg" alt="Logo" className="max-w-32" />
                        <h1 className="text-3xl mt-3 font-bold text-white">
                            {t('joinListModal.waitingMessage')}
                        </h1>
                        <img src="/ellipse-modal.svg" alt="ellipse" className="w-full max-h-full absolute left-0 top-0" />
                    </div>
                    {joined
                        ? <div className="flex flex-col items-center justify-center text-center p-8 w-full">
                            <img src="/hand.png" alt="Hand shake" className="max-w-64" />
                            <h1 className="mt-4 md:mt-6 text-3xl font-bold text-black">
                                {t('joinListModal.success_message.title')}
                            </h1>
                            <p className="text-base mt-3 text-gray-500">
                                {t('joinListModal.success_message.subtitle')}
                            </p>
                        </div>
                        : <div className="flex flex-col p-8 w-full">
                            <h1 className="text-3xl font-bold text-black">
                                {t('joinListModal.header.title')}
                            </h1>
                            <p className="text-base mt-3 text-gray-500">
                                {t('joinListModal.header.subtitle')}
                            </p>
                            <div className="mt-8">
                                <WhitelistJoinForm onSuccess={onSuccess} centers={centers} isModal />
                            </div>
                        </div>}
                </div>
            </div>
        </div>
    );
};

export default JoinListModal;
