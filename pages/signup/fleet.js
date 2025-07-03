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
import TryItSection from "../../src/components/signup/fleet/TryItSection";
import FleetHelpBanner from "../../src/components/signup/fleet/FleetHelpBanner";
import WhyPartnerUsSection from "../../src/components/signup/fleet/WhyPartnerUsSection";
import FleetSignupSection from "../../src/components/signup/fleet/FleetSignupSection";

export default function FleetSignup({ /* siteData, newsData, */ error }) {
  const { t } = useTranslation("common");
  const [isSubmitted, setIsSubmitted] = useState(true);

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <Layout /* siteData={siteData} */ theme={"transparent"}>
      <Head>
        <title>{`Yollda | ${t("navigation.signup")}`}</title>
        <meta
          name="description"
          content="This is a description of fleet signup page."
        />
      </Head>

      <FleetSignupSection
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
      />
      <WhyPartnerUsSection isSubmitted={isSubmitted} />
      <TryItSection />
    </Layout>
  );
}

export async function getServerSideProps({ locale }) {
  try {
    // const [siteData, termsData] = await Promise.all([
    //     fetchFromAPI('/api/v1/support/site/', locale),
    //     fetchFromAPI('/api/v1/support/blog/?page=1&per_page=10', locale),
    // ]);
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        // siteData,
        // termsData,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);

    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        siteData: null,
        newsData: null,
        error: "Failed to load data.",
      },
    };
  }
}
