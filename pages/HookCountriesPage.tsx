import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import { useState } from 'react'
import { HookCountries } from '../components/use-countries/HookCountries';

const HookCountriesPage: NextPage = () => {
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
        <h1>useCountries</h1>
        <Link href='https://github.com/oktaysenkan/use-countries'>yarn add react-country-region-selector</Link>
        <HookCountries/>
      </main>

      <footer className='footer'>
        <Link href='/'>Home</Link>
      </footer>
    </div>
  )
}

export default HookCountriesPage
