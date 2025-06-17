import React from 'react'
import ServicesCarousel from './ServicesCarousel'

function OurServices({ siteData = '' }) {
    return (
        <div class="py-16 lg:py-20 bg-white">
            <div class="px-0 sm:px-32 text-center">
                <h1 className="text-section-lg-title-responsive uppercase font-extrabold text-green-dark">
                    Our Services IN
                </h1>

                <h6 className="text-h6-responsive mt-9 w-[80%] lg:w-[55%] m-auto text-gray-500 text-center">
                    Services and features  may vary by region. Some features may not yet be available in your area.
                </h6>
            </div>

            <div>
                <ServicesCarousel />
            </div>
        </div>
    )
}

export default OurServices