import Head from "next/head";
import NewsPage from "../../src/components/news/NewsPage";
import Layout from "../../src/components/layout/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { fetchFromAPI } from "../../src/hooks/apiFetcher";
import TermsSubPageSection from "../../src/components/terms/TermsSubPageSection";

export default function TermsSubPage({
  specificTermData,
  /* siteData, newsData, */ error,
}) {
  const { t } = useTranslation("common");

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <Layout /* siteData={siteData} */ theme={"transparent"}>
      <Head>
        <title>{`Yollda | ${t("navigation.terms")}`}</title>
        <meta
          name="description"
          content="This is a description of terms page."
        />
      </Head>

      <TermsSubPageSection specificTermData={specificTermData} />
    </Layout>
  );
}

export async function getServerSideProps({ params, locale }) {
  const { page } = params;

  try {
    // const [siteData, termsData] = await Promise.all([
    //     fetchFromAPI('/api/v1/support/site/', locale),
    //     fetchFromAPI('/api/v1/support/blog/?page=1&per_page=10', locale),
    // ]);

    const [specificTermData] = await Promise.all([
      fetchFromAPI(`/api/v1/web/terms/${page}/`, locale, { Country: "AZ" }),
    ]);
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        specificTermData,
        // termsData,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);

    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        specificTermData: null,
        newsData: null,
        error: "Failed to load data.",
      },
    };
  }
}
