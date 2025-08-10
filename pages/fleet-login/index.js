import Head from "next/head";
import { useTranslation } from "next-i18next";

import Layout from "../../src/components/layout/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import FleetOtp from "../../src/components/fleet-login/FleetOtp";

const FleetLoginPage = ({ error }) => {
  const { t } = useTranslation("common");

  return (
    <Layout isFleetLayout>
      <Head>
        <title>{`Yollda | ${t("navigation.fleet_login")}`}</title>
        <meta name="description" content={t("meta_descriptions.fleet_login")} />
      </Head>
      <FleetOtp />
    </Layout>
  );
};
export async function getServerSideProps({ locale }) {
  try {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);

    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),

        error: "Failed to load data.",
      },
    };
  }
}
export default FleetLoginPage;
