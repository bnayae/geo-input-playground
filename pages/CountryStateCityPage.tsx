import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { CountryStateCity } from "../components/country-state-city/CountryStateCity";

const CountryStateCityPage: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Geo playground</title>
        <meta name="description" content="Geographic input playground" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1>country-state-city</h1>
        <Link href="https://www.npmjs.com/package/country-state-city">
          yarn add country-state-city
        </Link>
        <CountryStateCity />
      </main>

      <footer className="footer">
        <Link href="/">Home</Link>
      </footer>
    </div>
  );
};

export default CountryStateCityPage;
