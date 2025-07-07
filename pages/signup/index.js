import Head from "next/head";
import Layout from "../../src/components/layout/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { fetchFromAPI } from "../../src/hooks/apiFetcher";
import PartnerSignupSection from "../../src/components/signup/partner/PartnerSignupSection";
import FAQNewsletterSection from "../../src/components/contact/FAQNewsletterSection";
import HowPartnerWorksSection from "../../src/components/signup/partner/HowPartnerWorksSection";
import { useState } from "react";
import RevenueStreamSection from "../../src/components/signup/partner/RevenueStreamSection";
import YolldaPartnerSection from "../../src/components/signup/partner/YolldaPartnerSection";

export default function PartnerSignup({
  faqsData,
  countriesData,
  /* siteData, newsData, */ error,
}) {
  const { t } = useTranslation("common");
  const [isSubmitted, setIsSubmitted] = useState(true);

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <Layout /* siteData={siteData} */ theme={"transparent"}>
      <Head>
        <title>{`Yollda | ${t("navigation.partner.signup")}`}</title>
        <meta name="description" content={t("meta_descriptions.signup")} />
      </Head>

      <PartnerSignupSection
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
        countriesData={countriesData}
      />
      <HowPartnerWorksSection isSubmitted={isSubmitted} />
      <RevenueStreamSection />
      <YolldaPartnerSection />
      <FAQNewsletterSection faqsData={faqsData} />
    </Layout>
  );
}

export async function getServerSideProps({ locale }) {
  try {
    const [faqsData, countriesData] = await Promise.all([
      fetchFromAPI("/api/v1/web/faqs/?page=1&per_page=20", locale),
      fetchFromAPI("/api/v1/web/countries/?page=1&per_page=10", locale),
    ]);
    // const [siteData, termsData] = await Promise.all([
    //     fetchFromAPI('/api/v1/support/site/', locale),
    //     fetchFromAPI('/api/v1/support/blog/?page=1&per_page=10', locale),
    // ]);
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        faqsData,
        countriesData,
        // siteData,
        // termsData,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);

    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        faqsData: null,
        siteData: null,
        newsData: null,
        countriesData: null,
        error: "Failed to load data.",
      },
    };
  }
}
