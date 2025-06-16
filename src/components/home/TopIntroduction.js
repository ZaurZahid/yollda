import React from 'react'

function TopIntroduction({ siteData = '' }) {
    return (
        <div class="py-16 lg:py-20 bg-white flex justify-center">
            <div class="text-center">
                <h1 className="w-[80%] m-auto text-section-lg-title-responsive uppercase font-extrabold text-green-dark">
                    Fast. Reliable. Wherever You Are
                </h1>

                <h6 className="text-h6-responsive mt-9 font-semibold text-gray-500 text-center">
                    Yollda is your all-in-one road assistance  platform
                </h6>

                <a
                    href={'siteData?.[0]?.linkedin'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex mt-9 bg-green-dark text-light-green px-6 py-3 rounded-2xl text-button-responsive transition-all duration-200 transform hover:scale-105"
                >
                    Get Yollda
                </a>
            </div>
        </div>
    )
}

export default TopIntroduction