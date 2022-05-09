import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { GooglePlacesWithMap } from "../components/react-google-maps-api/GooglePlacesWithMap/GooglePlacesWithMap";
import { GooglePlaceTypeFilter } from "../components/react-google-maps-api/GooglePlacesWithMap/GooglePlaceTypeFilter";

const GooglePlacesWithMapPage: NextPage = () => {
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
        <h1>Google API Places + Map</h1>
        <Link href="https://www.npmjs.com/package/@react-google-maps/api">
          @react-google-maps/api
        </Link>
        <GooglePlacesWithMap
          filter={[
            GooglePlaceTypeFilter.administrative_area_level_2,
            GooglePlaceTypeFilter.locality,
            GooglePlaceTypeFilter.sublocality,
          ]}
        />
      </main>

      <footer className="footer">
        <Link href="/">Home</Link>
      </footer>
    </div>
  );
};

export default GooglePlacesWithMapPage;
