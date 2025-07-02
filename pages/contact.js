import Head from "next/head";
import Layout from "../src/components/layout/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { fetchFromAPI } from "../src/hooks/apiFetcher";
import ContactTopSection from "../src/components/contact/ContactTopSection";
import LocationMapSection from "../src/components/contact/LocationMapSection";
import FAQNewsletterSection from "../src/components/contact/FAQNewsletterSection";

export default function Contact({ faqsData, error }) {
  const { t } = useTranslation("common");

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <Layout>
      <Head>
        <title>{`Yollda | ${t("navigation.contact")}`}</title>
        <meta
          name="description"
          content="This is a description of contact page."
        />
      </Head>

      <ContactTopSection />
      <LocationMapSection />
      <FAQNewsletterSection faqsData={faqsData} />
    </Layout>
  );
}

export async function getServerSideProps({ locale }) {
  try {
    const [faqsData] = await Promise.all([
      fetchFromAPI("/api/v1/web/faqs/?page=1&per_page=20", locale),
    ]);

    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        faqsData,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);

    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        faqsData: null,
        error: "Failed to load data.",
      },
    };
  }
}
