export default function SuperAppSection() {
    return (
        <section className="w-full flex justify-center bg-light-green text-white pt-16 pb-12 lg:pt-20 lg:pb-12">
            <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20">
                <div className="text-center">
                    {/* Main Heading */}
                    <h1 className="lg:w-[80%] mx-auto font-secondary text-section-lg-title-responsive uppercase font-extrabold text-green-dark">
                        Yollda Azərbaycanın Sürücü Yardımı üçün İlk sÜper tətbİqİdİr.
                    </h1>

                    {/* Description */}
                    <p className="lg:w-[48%] m-auto  text-h6-responsive mt-9 text-green-dark text-center">
                        Biz daha təmiz şəhər mühiti və avtomobillərin sayının azaldılması üçün mübarizə aparırıq. Şəxsi avtomobillərdən hansı məqsədlə istifadə olunmasından asılı olmayaraq onlara alternativ təklif edirik. Xidmətlərimizə gedişlərin sifarişi, karşerinq və elektrikli skuter icarəsi, həmçinin yemək və ərzaq mallarının çatdırılması daxildir.
                    </p>

                    {/* CTA Button */}
                    <a
                        href={'siteData?.[0]?.linkedin'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex my-9 bg-green-dark text-light-green px-6 py-3 rounded-2xl text-button-responsive transition-all duration-200 transform hover:scale-105"
                    >
                        Get Yollda
                    </a>
                </div>
            </div>
        </section>
    );
}