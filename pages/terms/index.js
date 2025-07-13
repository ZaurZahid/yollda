import Head from "next/head";
import NewsPage from "../../src/components/news/NewsPage";
import Layout from "../../src/components/layout/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { fetchFromAPI } from "../../src/hooks/apiFetcher";
import TermsConditionsSection from "../../src/components/terms/TermsConditionsSection";

export default function TermsConditions({ termsData, countriesData, error }) {
  const { t } = useTranslation("common");

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <Layout theme={"normal"}>
      <Head>
        <title>{`Yollda | ${t("navigation.terms")}`}</title>
        <meta name="description" content={t("meta_descriptions.terms")} />
      </Head>

      <TermsConditionsSection
        termsData={termsData}
        countriesData={countriesData}
      />
    </Layout>
  );
}

export async function getServerSideProps({ locale }) {
  try {
    const [termsData, countriesData] = await Promise.all([
      fetchFromAPI("/api/v1/web/terms/", locale),
      fetchFromAPI("/api/v1/web/countries/?page=1&per_page=10", locale),
    ]);
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        termsData,
        countriesData,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);

    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        termsData: null,
        countriesData: null,
        error: "Failed to load data.",
      },
    };
  }
}
