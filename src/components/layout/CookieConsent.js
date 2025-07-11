import { useState, useEffect, useRef } from 'react';
import SettingsIcon from '../ui/icons/Settings';
import Link from 'next/link';
import CloseIcon from '../ui/icons/Close';

const cookieCategories = [
    {
        id: 'necessary',
        name: 'Necessary',
        description: 'Necessary cookies help make our website usable by enabling basic functions, e.g. page navigation. The website cannot function properly without these cookies.',
        required: false,
        enabled: false,
        count: 78
    },
    {
        id: 'analytics',
        name: 'Analytics',
        description: 'Analytics cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
        required: false,
        enabled: false,
        count: 45
    },
    {
        id: 'marketing',
        name: 'Marketing',
        description: 'Marketing cookies are used to track visitors across websites to display relevant advertisements.',
        required: false,
        enabled: false,
        count: 32
    },
    {
        id: 'preferences',
        name: 'Preferences',
        description: 'Preference cookies enable a website to remember information that changes the way the website behaves or looks.',
        required: false,
        enabled: false,
        count: 12
    },
];

export default function CookiesContent() {
    const [modalType, setModalType] = useState('banner');
    const [categories, setCategories] = useState(cookieCategories);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('yolldaCookieConsent');
        if (!consent) {
            setShowModal(true);
        }
    }, []);

    const modalRef = useRef(null);

    // Close the modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setModalType('banner')
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleCategoryToggle = (categoryId) => {
        setCategories(prev =>
            prev.map(cat =>
                cat.id === categoryId && !cat.required
                    ? { ...cat, enabled: !cat.enabled }
                    : cat
            )
        );
    };

    const handleAcceptAll = () => {
        const updatedCategories = categories.map(cat => ({ ...cat, enabled: true }));
        setCategories(updatedCategories);
        localStorage.setItem('yolldaCookieConsent', JSON.stringify(updatedCategories));
        setShowModal(false);
    };

    const handleRejectAll = () => {
        const updatedCategories = categories.map(cat => ({
            ...cat,
            enabled: cat.required
        }));
        setCategories(updatedCategories);
        localStorage.setItem('yolldaCookieConsent', JSON.stringify(updatedCategories));
        setShowModal(false);
    };

    const handleAllowSelection = () => {
        localStorage.setItem('yolldaCookieConsent', JSON.stringify(categories));
        setShowModal(false);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    if (!showModal) return null;

    // Simple Banner (Fixed Bottom) - Default View
    if (modalType === 'banner') {
        return (
            <div className="fixed bottom-0 left-0 right-0 z-50">
                <div className="bg-green-dark text-white rounded-xl rounded-t-2xl rounded-b-none p-4 sm:p-6 shadow-2xl">
                    {/* Mobile Layout */}
                    <div className="block sm:hidden space-y-4">
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                                <h3 className="text-h6-responsive font-semibold mb-2">
                                    This website uses cookies.
                                </h3>
                                <p className="text-span-small-responsive text-white/90 mb-3 leading-relaxed">
                                    Use the tick-boxes to confirm that you're happy for us to use your data for the described purposes.
                                </p>
                            </div>

                            <button
                                onClick={() => setModalType('settings')}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200 flex-shrink-0"
                                aria-label="Cookie settings"
                            >
                                <SettingsIcon />
                            </button>
                        </div>

                        <p className="text-span-small-responsive text-white/70 mb-4">
                            Check our{' '}
                            <Link href="#" target="_blank" className="text-light-green hover:underline">
                                Cookie declaration
                            </Link>
                            {' '}for more information and preferences.
                        </p>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleAcceptAll}
                                className="bg-light-green hover:bg-green-400 text-green-dark px-6 py-3 rounded-full font-semibold transition-all duration-200 text-button-responsive w-full"
                            >
                                Allow all
                            </button>

                            <button
                                onClick={handleRejectAll}
                                className="bg-transparent border-2 border-white/30 text-white px-6 py-3 rounded-full hover:bg-white/10 transition-all duration-200 text-button-responsive font-medium w-full"
                            >
                                Reject all
                            </button>
                        </div>
                    </div>

                    {/* Tablet Layout */}
                    <div className="hidden sm:block lg:hidden">
                        <div className="flex items-start justify-between gap-6 mb-4">
                            <div className="flex-1">
                                <h3 className="text-h6-responsive font-semibold mb-2">
                                    This website uses cookies.
                                </h3>
                                <p className="text-span-responsive text-white/90 mb-2">
                                    Use the tick-boxes to confirm that you're happy for us to use your data for the described purposes.
                                </p>
                                <p className="text-span-small-responsive text-white/70">
                                    Check our{' '}
                                    <Link href="#" target="_blank" className="text-light-green hover:underline">
                                        Cookie declaration
                                    </Link>
                                    {' '}for more information and preferences.
                                </p>
                            </div>

                            <button
                                onClick={() => setModalType('settings')}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
                                aria-label="Cookie settings"
                            >
                                <SettingsIcon />
                            </button>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={handleRejectAll}
                                className="bg-transparent border-2 border-white/30 text-white px-6 py-3 rounded-full hover:bg-white/10 transition-all duration-200 text-button-responsive font-medium"
                            >
                                Reject all
                            </button>

                            <button
                                onClick={handleAcceptAll}
                                className="bg-light-green hover:bg-green-400 text-green-dark px-6 py-3 rounded-full font-semibold transition-all duration-200 text-button-responsive"
                            >
                                Allow all
                            </button>
                        </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden lg:flex items-center justify-between gap-8">
                        <div className="flex-1">
                            <h3 className="text-h6-responsive font-semibold mb-2">
                                This website uses cookies.
                            </h3>
                            <p className="text-span-responsive text-white/90 mb-2">
                                Use the tick-boxes to confirm that you're happy for us to use your data for the described purposes.
                            </p>
                            <p className="text-span-small-responsive text-white/70">
                                Check our{' '}
                                <Link href="#" target="_blank" className="text-light-green hover:underline">
                                    Cookie declaration
                                </Link>
                                {' '}for more information and preferences.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setModalType('settings')}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
                                aria-label="Cookie settings"
                            >
                                <SettingsIcon />
                            </button>

                            <button
                                onClick={handleRejectAll}
                                className="bg-transparent border-2 border-white/30 text-white px-6 py-2 rounded-full hover:bg-white/10 transition-all duration-200 text-button-responsive font-medium"
                            >
                                Reject all
                            </button>

                            <button
                                onClick={handleAcceptAll}
                                className="bg-light-green hover:bg-green-400 text-green-dark px-6 py-2 rounded-full font-semibold transition-all duration-200 text-button-responsive"
                            >
                                Allow all
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // SettingsIcon Modal (Full)
    if (modalType === 'settings') {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <div ref={modalRef} className="bg-green-dark text-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto custom-cookie-scrollbar">
                    <button
                        onClick={() => setModalType('banner')}
                        className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
                    >
                        <CloseIcon fillColor={"fill-white"} />
                    </button>

                    <div className="space-y-6 pb-4 overflow-y-scroll custom-cookie-scrollbar max-h-[300px] mt-8">
                        {categories.map((category) => (
                            <div key={category.id} className="space-y-3 bg-green-secondary-dark rounded-xl p-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-h6-responsive font-semibold">
                                        {category.name} ({category.count})
                                    </h4>
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={category.enabled}
                                            onChange={() => handleCategoryToggle(category.id)}
                                            disabled={category.required}
                                            className="sr-only"
                                        />
                                        <button
                                            onClick={() => handleCategoryToggle(category.id)}
                                            disabled={category.required}
                                            className={`w-12 h-6 rounded-full transition-colors duration-200 ${category.enabled
                                                ? 'bg-light-green'
                                                : 'bg-white/20'
                                                } ${category.required ? 'opacity-50' : ''}`}
                                        >
                                            <div
                                                className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${category.enabled ? 'translate-x-6' : 'translate-x-0.5'
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-span-small-responsive text-white/80 leading-relaxed">
                                    {category.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4 border-t border-white/20">
                        <p className="text-span-small-responsive text-white/70 mb-6">
                            This website uses cookies. Use the tick-boxes to confirm that you're happy for us to use
                            your data for the described purposes.
                        </p>
                        <p className="text-span-small-responsive text-white/70 mb-6">
                            Check our{' '}
                            <Link href="#" target="_blank" className="text-light-green hover:underline">
                                Cookie declaration
                            </Link>
                            {' '}for more information and preferences.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={handleAllowSelection}
                                className="flex-1 bg-transparent border-2 border-white/30 text-white py-3 rounded-full hover:bg-white/10 transition-all duration-200 text-button-responsive font-medium"
                            >
                                Allow selection
                            </button>
                            <button
                                onClick={handleAcceptAll}
                                className="flex-1 bg-light-green hover:bg-green-400 text-green-dark py-3 rounded-full font-semibold transition-all duration-200 text-button-responsive"
                            >
                                Allow all
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}