import Head from "next/head";
import NewsPage from "../../src/components/news/NewsPage";
import Layout from "../../src/components/layout/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { fetchFromAPI } from "../../src/hooks/apiFetcher";

export default function News({
  newsCategoriesData,
  newsData,
  /* siteData, newsData, */ error,
}) {
  const { t } = useTranslation("common");

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <Layout /* siteData={siteData} */ theme={"transparent"}>
      <Head>
        <title>{`Yollda | ${t("navigation.news")}`}</title>
        <meta name="description" content={t("meta_descriptions.news")} />
      </Head>

      <img
        src="/Blogs.png"
        alt="Beautiful image"
        className="h-[530px] lg:h-[800px] w-full object-cover -mt-24 md:-mt-32 lg:-mt-24"
      />
      <NewsPage newsCategoriesData={newsCategoriesData} newsData={newsData} />
    </Layout>
  );
}

export async function getServerSideProps({ locale }) {
  try {
    const [newsCategoriesData, newsData] = await Promise.all([
      fetchFromAPI("/api/v1/web/news-categories", locale),
      fetchFromAPI("/api/v1/web/news/?page=1&per_page=10", locale),
    ]);
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        newsCategoriesData,
        newsData,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);

    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        newsCategoriesData: null,
        newsData: null,
        error: "Failed to load data.",
      },
    };
  }
}
