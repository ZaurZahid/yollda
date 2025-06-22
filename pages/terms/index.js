import Head from "next/head";
import NewsPage from "../../src/components/news/NewsPage";
import Layout from "../../src/components/layout/Layout";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { fetchFromAPI } from "../../src/hooks/apiFetcher";
import TermsConditionsSection from "../../src/components/terms/TermsConditionsSection";

export default function TermsConditions({ /* siteData, newsData, */ error }) {
    const { t } = useTranslation('common')

    if (error) {
        return <h1>{error}</h1>;
    }

    return (
        <Layout /* siteData={siteData} */ theme={'transparent'}>
            <Head>
                <html dir={'ar' === 'az' ? 'rtl' : 'ltr'} />
                <title>Yollda | {t('navigation.terms')}</title>
                <meta name="description" content="This is a description of terms page." />
            </Head>

            <TermsConditionsSection termsData={[]/* termsData */} />
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
                ...(await serverSideTranslations(locale, ['common'])),
                // siteData,
                // termsData,
            },
        };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);

        return {
            props: {
                ...(await serverSideTranslations(locale, ['common'])),
                siteData: null,
                newsData: null,
                error: 'Failed to load data.',
            },
        };
    }
}