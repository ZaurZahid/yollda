import Head from "next/head";
import Layout from "../src/components/layout/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { fetchFromAPI } from "../src/hooks/apiFetcher";
import ContactTopSection from "../src/components/contact/ContactTopSection";
import LocationMapSection from "../src/components/contact/LocationMapSection";
import FAQNewsletterSection from "../src/components/contact/FAQNewsletterSection";

export default function Contact({
  faqsData,
  contactUsData,
  countriesData,
  error,
}) {
  const { t } = useTranslation("common");

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <Layout>
      <Head>
        <title>{`Yollda | ${t("navigation.contact")}`}</title>
        <meta name="description" content={t("meta_descriptions.contact")} />
      </Head>

      <ContactTopSection
        countriesData={countriesData}
        contactUsData={contactUsData}
      />
      <LocationMapSection contactUsData={contactUsData} />
      <FAQNewsletterSection faqsData={faqsData} />
    </Layout>
  );
}

export async function getServerSideProps({ locale }) {
  try {
    const [faqsData, contactUsData, countriesData] = await Promise.all([
      fetchFromAPI("/api/v1/web/faqs/?page=1&per_page=20", locale),
      fetchFromAPI("/api/v1/web/contact-us/", locale),
      fetchFromAPI("/api/v1/web/countries/?page=1&per_page=10", locale),
    ]);

    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        faqsData,
        contactUsData,
        countriesData,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);

    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        faqsData: null,
        contactUsData: null,
        countriesData: null,
        error: "Failed to load data.",
      },
    };
  }
}
