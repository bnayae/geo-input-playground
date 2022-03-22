import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className='container'>
      <Head>
        <title>Geo playground</title>
        <meta name="description" content="Geographic input playground" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='main'>
        <h1>Placeholder</h1>
        <ul>
          <li><Link href='/react-country-region-selector'>react-country-region-selector</Link></li>
          <li><Link href='/HookCountriesPage'>useCountries</Link></li>
        </ul>
      </main>

      <footer className='footer'>
      </footer>
    </div>
  )
}

export default Home
