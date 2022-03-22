import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import { useState } from 'react'
import styles from './index.module.css';
import { ReactCountryRegionSelector } from '../components/react-country-region-selector/ReactCountryRegionSelector';

const ReactCountryRegionSelectorPage: NextPage = () => {
  const [country, setCountry] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  return (
    <div className='container'>
      <Head>
        <title>Geo playground</title>
        <meta name="description" content="Geographic input playground" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='main'>
        <h1>react-country-region-selector</h1>
        <Link href='https://github.com/country-regions/react-country-region-selector'>yarn add react-country-region-selector</Link>
        <ReactCountryRegionSelector/>
      </main>

      <footer className='footer'>
        <Link href='/'>Home</Link>
      </footer>
    </div>
  )
}

export default ReactCountryRegionSelectorPage
