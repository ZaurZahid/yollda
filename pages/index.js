import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// import Layout from '../src/components/layout/Layout'
// import OnboardingSection from '../src/components/layout/OnboardingSection'
// import ValueSection from '../src/components/layout/ValuesSection'
// import HowItWorks from '../src/components/layout/HowItWorks'
// import TradeCenters from '../src/components/layout/TradeCenters'
// import Fags from '../src/components/layout/Fags'
// import BlogSection from '../src/components/layout/BlogSection'
// import ContactForm from '../src/components/layout/ContactForm'
import { useTranslation } from "next-i18next";
import Layout from "../src/components/layout/Layout";
import TopIntroduction from "../src/components/home/TopIntroduction";
import OurServices from "../src/components/home/OurServices";
import MobilitySection from "../src/components/home/MobilitySection";
import AboutUs from "../src/components/home/AboutUs";
import EarnWithSection from "../src/components/home/EarnWithSection";
import LatestFeatures from "../src/components/home/LatestFeatures";
import DownloadApps from "../src/components/home/DownloadApps";
import NewsUpdates from "../src/components/home/NewsUpdates";
import { fetchFromAPI } from "../src/hooks/apiFetcher";
// import { fetchFromAPI } from './../src/hooks/apiFetcher';

export default function HomePage({
  ourServicesData,
  shortAbout,
  benefits,
  alternatingSlides,
  error,
}) {
  const { t } = useTranslation("common");

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <Layout theme={"normal"}>
      <Head>
        <title>{`Yollda | ${t("navigation.home")}`}</title>
        <meta name="description" content={t("meta_descriptions.home")} />
      </Head>

      <TopIntroduction siteData={""} />
      <img
        src="/Home1.png"
        alt="Beautiful image"
        className="h-[530px] lg:h-[590px] w-full object-cover"
      />
      <OurServices ourServicesData={ourServicesData} />
      <img
        src="/frame.png"
        alt="Beautiful image"
        className="h-[530px] lg:h-[720px] w-full object-cover"
      />
      <MobilitySection benefits={benefits} />
      <img
        src="/Home3.png"
        alt="Beautiful image"
        className="h-[300px] lg:h-[400px] w-full object-cover"
      />
      <AboutUs shortAbout={shortAbout} />
      <EarnWithSection alternatingSlides={alternatingSlides} />
      <LatestFeatures />
      <img
        src="/Home4.png"
        alt="Beautiful image"
        className="h-[300px] lg:h-[750px] w-full object-cover"
      />
      <DownloadApps />

      <NewsUpdates />
    </Layout>
  );
}

export async function getServerSideProps({ locale }) {
  try {
    const [ourServicesData, shortAbout, benefits, alternatingSlides] =
      await Promise.all([
        fetchFromAPI("/api/v1/web/our-services/?page=1&per_page=10", locale),
        fetchFromAPI("/api/v1/web/short-about/", locale),
        fetchFromAPI("/api/v1/web/benefits/?page=1&per_page=20", locale),
        fetchFromAPI(
          "/api/v1/web/attractive-info/?info_type=home_alternating_sides",
          locale
        ),
      ]);
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        ourServicesData,
        shortAbout,
        alternatingSlides,
        benefits,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);

    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        ourServicesData: null,
        shortAbout: null,
        benefits: null,
        alternatingSlides: null,
        error: "Failed to load data.",
      },
    };
  }
}
