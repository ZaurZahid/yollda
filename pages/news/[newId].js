import Head from "next/head";
import NewsPage from "../../src/components/news/NewsPage";
import Layout from "../../src/components/layout/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { fetchFromAPI } from "../../src/hooks/apiFetcher";
import SingleNewSection from "../../src/components/news/SingleNewSection";

export default function SingleNewPage({
  newData,
  /* siteData, newsData, */ error,
}) {
  const { t } = useTranslation("common");

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <Layout /* siteData={siteData} */ theme={"normal"}>
      <Head>
        <title>{`Yollda | ${t("navigation.news")}`}</title>
        <meta name="description" content={t("meta_descriptions.single_news")} />
      </Head>

      <SingleNewSection newData={newData} />
    </Layout>
  );
}

export async function getServerSideProps({ params, locale }) {
  const { newId } = params;

  try {
    const [newData] = await Promise.all([
      fetchFromAPI(`/api/v1/web/news/${newId}`, locale),
    ]);
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        newData,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);

    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        newData: null,
        error: "Failed to load data.",
      },
    };
  }
}
