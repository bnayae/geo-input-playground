import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Geo playground</title>
        <meta name="description" content="Geographic input playground" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1>Geo Samples</h1>
        <ul>
          <li>
            <Link href="/GooglePlacesWithMapPage">Google API Places + Map</Link>
          </li>
          <li>
            <Link href="/GooglePlacesWithMapCityPage">
              Google API Places + Map (Cities)
            </Link>
          </li>
          <li>
            <Link href="/GooglePlacesWithMapStatePage">
              Google API Places + Map (States)
            </Link>
          </li>
          <li>
            <Link href="/GooglePlacesPage">Google API Places</Link>
          </li>
          <hr />
          <li>
            <Link href="/CountryStateCityPage">country-state-city</Link>
          </li>
          <hr />
          <li>
            <Link href="/GoogleAddressPage">Google API Address Suggest</Link>
          </li>
          <li>
            <Link href="/GoogleCitySuggestPage">Google API City Suggest</Link>
          </li>
          <li>
            <Link href="/react-country-region-selector">
              react-country-region-selector
            </Link>
          </li>
          <li>
            <Link href="/HookCountriesPage">useCountries</Link>
          </li>
          <li>
            <Link href="/ReactFlagsSelectPage">ReactFlagsSelect</Link>
          </li>
        </ul>
      </main>

      <footer className="footer"></footer>
    </div>
  );
};

export default Home;
