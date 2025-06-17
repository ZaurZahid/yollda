import { useState } from 'react';

const earnServices = [
    {
        id: 1,
        category: "Earn as a Tow Driver",
        title: "Car & Freight Towing on Your Terms",
        description: "Handle light vehicles or heavy loads—choose jobs that fit your rig and schedule.",
        buttonText: "Register to Tow",
        image: "https://images.pexels.com/photos/3964704/pexels-photo-3964704.jpeg?auto=compress&cs=tinysrgb&w=800",
        imagePosition: 'left'
    },
    {
        id: 2,
        category: "Become a Yollda Assistant",
        title: "Offer tire, battery & fuel services",
        description: "You choose when and where to help days, evenings, weekends, or whenever you're free.",
        buttonText: "Register to Tow",
        image: "https://images.pexels.com/photos/4173624/pexels-photo-4173624.jpeg?auto=compress&cs=tinysrgb&w=800",
        imagePosition: 'right'
    },
    {
        id: 3,
        category: "Grow Your Fleet Revenue",
        title: "Manage assets, maximize uptime",
        description: "Register one or more tow trucks under Yollda Business, dispatch jobs, and track earnings from a single dashboard.",
        buttonText: "Register to Tow",
        image: "https://images.pexels.com/photos/3807738/pexels-photo-3807738.jpeg?auto=compress&cs=tinysrgb&w=800",
        imagePosition: 'left'
    },
    {
        id: 4,
        category: "Launch a Yollda Training Center",
        title: "Train the next generation of roadside experts",
        description: "Become an official Yollda Training Partner. Offer certified programs to prepare new Tow Drivers and Roadside Assistants. Help them get verified and ready to earn—while you grow your own business.",
        buttonText: "Apply to Training Partner",
        image: "https://images.pexels.com/photos/4173624/pexels-photo-4173624.jpeg?auto=compress&cs=tinysrgb&w=800",
        imagePosition: 'right'
    },
];


export default function EarnWithSection() {
    return (
        <div className="w-full flex justify-center py-16 lg:py-24">
            <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20">
                <div className="flex flex-col">
                    <h1 className="text-section-lg-title-responsive uppercase font-extrabold text-green-dark text-center">
                        Earn with Yollda
                    </h1>

                    <h6 className="text-h6-responsive mt-9 text-gray-500 text-center">
                        Join thousands of partners who earn by keeping drivers on the move—tow‑truck operators (car & freight), tire techs, battery specialists, fuel couriers, and fleet owners.
                    </h6>
                </div>

                {/* Services Grid */}
                <div className="space-y-12 lg:space-y-16 mt-16 lg:mt-28">
                    {earnServices.map((service, index) => (
                        <div
                            key={service.id}
                            className={`grid md:grid-cols-2 gap-8 lg:gap-12 items-center ${index % 2 === 1 ? 'md:grid-flow-col-dense' : ''
                                }`}
                        >
                            {/* Image */}
                            <div className={`${service.imagePosition === 'right' && index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                                <div className="relative overflow-hidden rounded-2xl shadow-xl group">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-80 lg:h-[32rem] object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className={`space-y-4 lg:space-y-6 ${service.imagePosition === 'right' && index % 2 === 1 ? 'md:col-start-1' : ''}`}>
                                {/* Category */}
                                <div className="inline-block">
                                    <span className="bg-light-green/10 text-green-dark px-4 py-2 rounded-full text-span-responsive font-medium">
                                        {service.category}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-h3-responsive font-bold text-gray-900">
                                    {service.title}
                                </h3>

                                {/* Description */}
                                <p className="lg:w-[70%] text-p-responsive text-dark-gray">
                                    {service.description}
                                </p>

                                {/* CTA Button */}
                                <div className="pt-2 lg:pt-4">
                                    <a
                                        href={'siteData?.[0]?.linkedin'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex bg-green-dark text-light-green px-6 py-3 rounded-2xl text-button-responsive transition-all duration-200 transform hover:scale-105"
                                    >
                                        {service.buttonText}
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 