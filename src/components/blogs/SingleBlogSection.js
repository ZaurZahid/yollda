import { useState } from "react";
import Breadcrumb from "../ui/Breadcrumb";
import NewsList from "./NewsList";
import Pagination from "../ui/Pagination";
import { useTranslation } from 'next-i18next';
import ArrowDown from "../ui/icons/ArrowDown";
import HelpBanner from "../layout/HelpBanner";
import SingleBlog from "./SingleBlog";
import Articles from "./Articles";
import SubscribeNewsletter from "../ui/SubscribeNewsletter";

const mockTermsData = {
    'users': {
        id: 'yollda-users',
        title: 'Yollda Users',
        subtitle: 'Service Beneficiaries',
        lastUpdated: 'March 8, 2022',
        content: `
      <h6>Eligibility</h6>
      <p>You <strong>must</strong> be <a href="asd"/>link</a> at least 18 years old to use the Yollda app. By registering, you confirm that the information provided is accurate and up to date.</p>
      <p>You must be at least 18 years old to use the Yollda app. By registering, you confirm that the information provided is accurate and up to date.</p>
      <hr/>
      <p>You must be at least 18 years old to use the Yollda app. By registering, you confirm that the information provided is accurate and up to date.</p>
      <p>You must be at least 18 years old to use the Yollda app. By registering, you confirm that the information provided is accurate and up to date.</p>
      <p>You must be at least 18 years old to use the Yollda app. By registering, you confirm that the information provided is accurate and up to date.</p>
      
      <h4>Services Provided</h4>
      <p>Yollda allows users to request services such as towing, tire repair, battery jump-starts, and fuel delivery. Services are delivered by independent service providers (Yollda Partners or Fleet Owners).</p>
      <ul><li>sdkfkdsf</li><li>sllgdflkgdfg</li></ul>
      <h2>Payments</h2>
      <p>All payments are processed through the Yollda app. Users agree to pay the price indicated prior to confirming the service.</p>
      
      <h2>Cancellations and Refunds</h2>
      <p>Users may cancel a request before a provider is assigned without penalty. Once a provider is en route, cancellation fees may apply.</p>
      
      <h2>Liability</h2>
      <p>Yollda is a platform connecting users with service providers. We are not liable for damages caused by service providers. Complaints may be filed through the app.</p>
    `
    }
}

export default function SingleBlogSection({ blogsData }) {
    const { t } = useTranslation('common');

    const breadcrumbItems = [
        { label: t('navigation.home'), url: '/' },
        { label: t('navigation.blogs'), url: '' },
    ];
    const tabs = ['For passengers', 'News', 'Product update'];

    return (
        <div className="w-full flex justify-center py-12 lg:py-20">
            <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20">
                <div className="flex flex-col lg:w-[80%] mx-auto">
                    <Breadcrumb items={breadcrumbItems} />
                    <h2 className="font-secondary text-h2-responsive uppercase font-bold text-green-dark lg:w-[80%]">
                        Yollda joins UN Global Compact: strengthening our commitment to sustainability
                    </h2>

                    <div className="flex flex-wrap gap-2 md:gap-1 md:space-s-4 mt-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                className={`px-4 py-2 text-span-responsive cursor-default font-medium rounded-full transition-all duration-200 text-green-dark bg-light-green/20`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center mt-6">
                        <img src="/calendar.svg" className="me-2" alt="calendar icon" />
                        <span className="text-span-small-responsive text-gray-500">March 8, 2022</span>
                    </div>

                </div>
                <img
                    src={'https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&cs=tinysrgb&w=800'}
                    alt={'blog image'}
                    className="w-full max-h-[250px] md:max-h-[450px] lg:max-h-[650px] object-cover mt-6 rounded-2xl"
                />

                <div className="flex flex-col lg:w-[80%] mx-auto mt-10">
                    <div
                        className="lg:w-[80%]
                        prose-h1:text-h1-responsive prose-h1:mt-12 prose-h1:mb-8 
                        prose-h2:text-h2-responsive prose-h2:mt-12 prose-h2:mb-8 
                        prose-h3:text-h3-responsive prose-h3:mt-8 prose-h3:mb-6
                        prose-h4:text-h4-responsive prose-h4:mt-8 prose-h4:mb-6
                        prose-h5:text-h5-responsive prose-h5:mt-6 prose-h5:mt-4
                        prose-h6:text-h6-responsive prose-h6:mt-4 prose-h6:mt-0

                        prose-headings:text-green-dark prose-headings:!font-bold
                        prose-p:text-gray-500
                        prose-a:text-gray-800 prose-a:underline
                        prose-strong:text-gray-800

                        prose-hr:my-6
                        prose-hr:md:my-10
                        prose-hr:lg:my-16
                        prose-hr:h-[2px]
                        prose-hr:bg-gray-200
                        prose-hr:border-0

                        prose-ul:text-gray-500 prose-ol:text-gray-500
                        prose-ul:list-disc
                        prose-li:list-inside
                        prose-li:marker:text-gray-500
                        prose-li:marker:-pr-20
                        "
                        dangerouslySetInnerHTML={{ __html: mockTermsData.users.content }}
                    />
                </div>

                <div className="mt-24">
                    <SubscribeNewsletter />
                </div>
            </div>
        </div >
    );
}