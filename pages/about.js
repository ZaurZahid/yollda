import Head from "next/head";
import Layout from "../src/components/layout/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { fetchFromAPI } from "../src/hooks/apiFetcher";
import TermsConditionsSection from "../src/components/terms/TermsConditionsSection";
import WeAreYolldaSection from "../src/components/about/WeAreYolldaSection";
import SuperAppSection from "../src/components/about/SuperAppSection";
import WhatMakeUsSection from "../src/components/about/WhatMakeUsSection";
import EarnMoneySection from "../src/components/about/EarnMoneySection";

export default function About({
  aboutSingleItem,
  aboutCarousel,
  aboutList,
  /* siteData, newsData, */ error,
}) {
  const { t } = useTranslation("common");

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <Layout /* siteData={siteData} */ theme={"transparent"}>
      <Head>
        <title>{`Yollda | ${t("navigation.about")}`}</title>
        <meta name="description" content={t("meta_descriptions.about")} />
      </Head>

      <img
        src="/About1.png"
        alt="Beautiful image"
        className="h-[530px] lg:h-[800px] w-full object-cover -mt-24 md:-mt-32 lg:-mt-24"
      />

      <WeAreYolldaSection aboutSingleItem={aboutSingleItem} />

      <img
        src="/About2.png"
        alt="Beautiful image"
        className="h-[350px] lg:h-[640px] w-full object-cover"
      />

      <WhatMakeUsSection aboutCarousel={aboutCarousel} />

      <SuperAppSection />

      <img
        src="/About3.png"
        alt="Beautiful image"
        className="h-[100px] lg:h-[200px] w-full object-cover"
      />

      <EarnMoneySection aboutList={aboutList} />
    </Layout>
  );
}

export async function getServerSideProps({ locale }) {
  try {
    const [aboutSingleItem, aboutCarousel, aboutList] = await Promise.all([
      fetchFromAPI(
        "/api/v1/web/attractive-info/?info_type=about_single_item",
        locale
      ),
      fetchFromAPI(
        "/api/v1/web/attractive-info/?info_type=about_carousel",
        locale
      ),
      fetchFromAPI("/api/v1/web/attractive-info/?info_type=about_list", locale),
    ]);
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        aboutSingleItem,
        aboutCarousel,
        aboutList,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);

    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        aboutSingleItem: null,
        aboutCarousel: null,
        aboutList: null,
        error: "Failed to load data.",
      },
    };
  }
}
