import Head from "next/head";
import NewsPage from "../../src/components/news/NewsPage";
import Layout from "../../src/components/layout/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { fetchFromAPI } from "../../src/hooks/apiFetcher";
import TermsConditionsSection from "../../src/components/terms/TermsConditionsSection";

export default function TermsConditions({ termsData, error }) {
  const { t } = useTranslation("common");

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <Layout theme={"normal"}>
      <Head>
        <title>{`Yollda | ${t("navigation.terms")}`}</title>
        <meta
          name="description"
          content="This is a description of terms page."
        />
      </Head>

      <TermsConditionsSection termsData={termsData} />
    </Layout>
  );
}

export async function getServerSideProps({ locale }) {
  try {
    const [termsData] = await Promise.all([
      fetchFromAPI("/api/v1/web/terms/", locale, {
        Country: "AZ",
      }),
    ]);
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        termsData,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);

    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        termsData: null,
        error: "Failed to load data.",
      },
    };
  }
}
