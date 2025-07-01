import Head from "next/head";
import Layout from "../../src/components/layout/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { fetchFromAPI } from "../../src/hooks/apiFetcher";
import NewsSection from "../../src/components/blogs/NewsSection";
import BlogsSection from "../../src/components/blogs/BlogsSection";

export default function Blogs({ /* siteData, blogsData, */ error }) {
  const { t } = useTranslation("common");

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <Layout /* siteData={siteData} */ theme={"transparent"}>
      <Head>
        <title>{`Yollda | ${t("navigation.blog")}`}</title>
        <meta
          name="description"
          content="This is a description of blog page."
        />
      </Head>

      <img
        src="/frame.png"
        alt="Beautiful image"
        className="h-[530px] lg:h-[800px] w-full object-cover -mt-24 md:-mt-32 lg:-mt-24"
      />

      <BlogsSection blogsData={[] /* blogsData */} />
      <NewsSection newsData={[] /* blogsData */} />
    </Layout>
  );
}

export async function getServerSideProps({ locale }) {
  try {
    // const [siteData, blogsData] = await Promise.all([
    //     fetchFromAPI('/api/v1/support/site/', locale),
    //     fetchFromAPI('/api/v1/support/blog/?page=1&per_page=10', locale),
    // ]);
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        // siteData,
        // blogsData,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);

    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        siteData: null,
        blogsData: null,
        error: "Failed to load data.",
      },
    };
  }
}
