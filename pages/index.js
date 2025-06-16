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
// import { fetchFromAPI } from './../src/hooks/apiFetcher';

export default function HomePage({ /* shoppingCenters, faqData, siteData, onboardingData, featureData, blogsData, */ error }) {
  const { t } = useTranslation('common')

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <Layout theme={"normal"}>{/* transparent */}
      <Head>
        <title>Yollda | {t('navigation.home')}</title>
        <meta name="description" content="This is a description of home page." />
      </Head>

      <h1 class="text-h1-responsive text-light-green">h1 responsive</h1>

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