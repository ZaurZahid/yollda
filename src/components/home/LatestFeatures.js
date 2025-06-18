export default function LatestFeatures() {
    return (
        <section className="w-full flex justify-center bg-green-dark text-white text-center py-16 lg:py-20">
            <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20">
                {/* Section Label */}
                <div className="inline-block mb-8">
                    <h5 className="text-h5-responsive font-bold">
                        Latest features
                    </h5>
                </div>

                {/* Main Heading */}
                <h1 className="font-secondary text-section-lg-title-responsive uppercase font-extrabold leading-tight">
                    Request Help Instantly
                </h1>

                {/* Description */}
                <div className="lg:w-[48%] m-auto text-h6-responsive mt-9 text-white text-center">
                    <p className="mt-4">
                        You tap, help comes. Can’t tap? We’ve got you.
                    </p>

                    <p className="mt-4">
                        If your phone detects a crash and there’s no response, Yollda sends a help request on your behalf — instantly.
                    </p>

                    <p className="mt-4">
                        Had a breakdown or accident? Tap for help and nearby Yollda users will be alerted immediately
                    </p>
                </div>
            </div>
        </section>
    );
}