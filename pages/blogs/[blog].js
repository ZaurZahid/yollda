import Head from "next/head";
import NewsPage from "../../src/components/news/NewsPage";
import Layout from "../../src/components/layout/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { fetchFromAPI } from "../../src/hooks/apiFetcher";
import SingleBlogSection from "../../src/components/blogs/SingleBlogSection";

export default function SingleBlogPage({
  blogData,
  /* siteData, newsData, */ error,
}) {
  const { t } = useTranslation("common");

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <Layout /* siteData={siteData} */ theme={"normal"}>
      <Head>
        <title>{`Yollda | ${t("navigation.terms")}`}</title>
        <meta name="description" content={t("meta_descriptions.oneblog")} />
      </Head>

      <SingleBlogSection blogData={blogData} />
    </Layout>
  );
}

export async function getServerSideProps({ params, locale }) {
  const { blog } = params;

  try {
    const [blogData] = await Promise.all([
      fetchFromAPI(`/api/v1/web/blogs/${blog}`, locale),
    ]);
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        blogData,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);

    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        blogData: null,
        error: "Failed to load data.",
      },
    };
  }
}
