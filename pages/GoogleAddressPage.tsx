import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { GoogleAddress } from "../components/GoogleAddress/GoogleAddress";

const GoogleAddressPage: NextPage = () => {
  const api_key = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;

  return (
    <div className="container">
      <Head>
        <title>Geo playground</title>
        <meta name="description" content="Geographic input playground" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Script
        id="maps.googleapis.com"
        strategy="lazyOnload"
        src={`https://maps.googleapis.com/maps/api/js?libraries=places&key=${api_key}`}
      /> */}

      <main className="main">
        <h1>Google API City Suggest</h1>
        <h4>Popup blocker should be disable</h4>
        <Link href="https://console.cloud.google.com/google/maps-apis/build/address-selection?project=global-walker-345009">
          Google Maps Docs
        </Link>
        <GoogleAddress />
      </main>

      <footer className="footer">
        <Link href="/">Home</Link>
      </footer>
    </div>
  );
};

export default GoogleAddressPage;
