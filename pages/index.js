import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// import Layout from '../src/components/layout/Layout'
// import OnboardingSection from '../src/components/layout/OnboardingSection'
// import ValueSection from '../src/components/layout/ValuesSection'
// import HowItWorks from '../src/components/layout/HowItWorks'
// import TradeCenters from '../src/components/layout/TradeCenters'
// import Fags from '../src/components/layout/Fags'
// import BlogSection from '../src/components/layout/BlogSection'
// import ContactForm from '../src/components/layout/ContactForm'
import { useTranslation } from 'next-i18next'
import Layout from '../src/components/layout/Layout';
import TopIntroduction from '../src/components/home/TopIntroduction';
import OurServices from '../src/components/home/OurServices';
import MobilitySection from '../src/components/home/MobilitySection';
import AboutUs from '../src/components/home/AboutUs';
import EarnWithSection from '../src/components/home/EarnWithSection';
import LatestFeatures from '../src/components/home/LatestFeatures';
import DownloadApps from '../src/components/home/DownloadApps';
import NewsUpdates from '../src/components/home/NewsUpdates';
// import { fetchFromAPI } from './../src/hooks/apiFetcher';

export default function HomePage({ /* shoppingCenters, faqData, siteData, onboardingData, featureData, blogsData, */ error }) {
  const { t } = useTranslation('common')

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <Layout theme={"normal"}>{/* transparent */}
      <Head>
        <html dir={'ar' === 'az' ? 'rtl' : 'ltr'} />
        <title>Yollda | {t('navigation.home')}</title>
        <meta name="description" content="This is a description of home page." />
      </Head>

      <TopIntroduction siteData={''} />
      <img
        src="/frame.png"
        alt="Beautiful image"
        class="h-[530px] lg:h-[590px] w-full object-cover"
      />
      <OurServices siteData={''} />
      <img
        src="/frame.png"
        alt="Beautiful image"
        class="h-[530px] lg:h-[720px] w-full object-cover"
      />
      <MobilitySection />
      <img
        src="/frame.png"
        alt="Beautiful image"
        class="h-[300px] lg:h-[400px] w-full object-cover"
      />
      <AboutUs />
      <EarnWithSection />
      <LatestFeatures />
      <img
        src="/frame.png"
        alt="Beautiful image"
        class="h-[300px] lg:h-[750px] w-full object-cover"
      />
      <DownloadApps />

      <NewsUpdates />

      {/* <OnboardingSection centers={shoppingCenters} />
      <ValueSection features={featureData} />
      <HowItWorks onboardingData={onboardingData} />
      <TradeCenters centers={shoppingCenters} />
      <Fags fags={faqData} />
      <BlogSection blogsData={blogsData} />
      <ContactForm siteData={siteData} /> */}
    </Layout>
    // </Layout>
  );
}

export async function getServerSideProps({ locale }) {
  try {
    // const [faqData, featureData, siteData, onboardingData, shoppingCenters, blogsData] = await Promise.all([
    //   fetchFromAPI('/api/v1/support/faq/', locale),
    //   fetchFromAPI('/api/v1/support/feature/', locale),
    //   fetchFromAPI('/api/v1/support/site/', locale),
    //   fetchFromAPI('/api/v1/support/onboarding/', locale),
    //   fetchFromAPI('/api/v1/shop/shopping-centers/', locale),
    //   fetchFromAPI('/api/v1/support/blog/?page=1&per_page=3', locale),
    // ]);
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        // faqData,
        // featureData,
        // siteData,
        // onboardingData,
        // shoppingCenters,
        // blogsData: blogsData?.results || []
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);

    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        // faqData: null,
        // featureData: null,
        // siteData: null,
        // onboardingData: null,
        // shoppingCenters: null,
        // blogsData: null,
        error: 'Failed to load data.',
      },
    };
  }
}