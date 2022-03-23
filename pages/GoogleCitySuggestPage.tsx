import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { GoogleCitySuggest } from "../components/GoogleCitySuggest/GoogleCitySuggest";

const GoogleCitySuggestPage: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Geo playground</title>
        <meta name="description" content="Geographic input playground" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1>Google API City Suggest</h1>
        <h4>Popup blocker should be disable</h4>
        <Link href="https://www.npmjs.com/package/react-geosuggest">NPM</Link>
        <GoogleCitySuggest />
      </main>

      <footer className="footer">
        <Link href="/">Home</Link>
      </footer>
    </div>
  );
};

export default GoogleCitySuggestPage;
