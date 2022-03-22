import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import { useState } from 'react'
import styles from './index.module.css';

interface IWithClass {
    className?: string;
}

export const ReactCountryRegionSelectorRaw = ({className}:IWithClass) => {
  const [country, setCountry] = useState<string>('');
  const [region, setRegion] = useState<string>('');

  return (
    <div className={className}>
        <CountryDropdown
          classes='countries geo'
          value={country}
          // labelType="short"
          // valueType="short"
          onChange={(val) => setCountry(val)} 
          priorityOptions={['US', 'IL']} blacklist={['AF', 'AX']}/>
         
        <RegionDropdown classes='region geo'
          country={country}
          value={region}
          onChange={(val) => setRegion(val)} />
    </div>
  )
}
