import Head from "next/head";
import Layout from "../../src/components/layout/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { fetchFromAPI } from "../../src/hooks/apiFetcher";
import NewsSection from "../../src/components/blogs/NewsSection";
import BlogsSection from "../../src/components/blogs/BlogsSection";

export default function Blogs({ blogsData, blogsCategories, error }) {
  const { t } = useTranslation("common");

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <Layout /* siteData={siteData} */ theme={"transparent"}>
      <Head>
        <title>{`Yollda | ${t("navigation.blog")}`}</title>
        <meta name="description" content={t("meta_descriptions.blogs")} />
      </Head>

      <img
        src="/Blogs.png"
        alt="Beautiful image"
        className="h-[530px] lg:h-[800px] w-full object-cover -mt-24 md:-mt-32 lg:-mt-24"
      />

      <BlogsSection blogsData={blogsData} blogsCategories={blogsCategories} />
    </Layout>
  );
}

export async function getServerSideProps({ locale }) {
  try {
    const [blogsData, blogsCategories] = await Promise.all([
      fetchFromAPI("/api/v1/web/blogs/?page=1&per_page=10", locale),
      fetchFromAPI("/api/v1/web/blog-categories/?page=1&per_page=40", locale),
    ]);
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        blogsData,
        blogsCategories,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);

    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        blogsCategories: null,
        blogsData: null,
        error: "Failed to load data.",
      },
    };
  }
}
