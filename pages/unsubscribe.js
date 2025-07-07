import Head from "next/head";
import Layout from "../src/components/layout/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { fetchFromAPI } from "../src/hooks/apiFetcher";
import UnsubscribePage from "../src/components/unsubscribe/UnSubscribePage";

export default function UnSubscribe({ /* siteData, newsData, */ error }) {
  const { t } = useTranslation("common");

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <Layout /* siteData={siteData} */>
      <Head>
        <title>{`Yollda | ${t("navigation.UnSubscribe")}`}</title>
        <meta name="description" content={t("meta_descriptions.unsubscribe")} />
      </Head>

      <UnsubscribePage />
    </Layout>
  );
}

export async function getServerSideProps({ locale }) {
  try {
    // const [siteData, termsData] = await Promise.all([
    //     fetchFromAPI('/api/v1/support/site/', locale),
    //     fetchFromAPI('/api/v1/support/blog/?page=1&per_page=10', locale),
    // ]);
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        // siteData,
        // termsData,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);

    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        siteData: null,
        newsData: null,
        error: "Failed to load data.",
      },
    };
  }
}
