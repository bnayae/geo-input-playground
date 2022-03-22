import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ChangeEventHandler, useState } from "react";
import useCountries from "use-countries";
import Select, { ActionMeta, GetOptionLabel, OnChangeValue } from 'react-select';
import makeAnimated from 'react-select/animated';
import { Country } from "use-countries/dist/locales";

interface IWithClass {
  className?: string;
}

// interface IOption {
//   value: string;
//   label: string;
// }

export const HookCountriesRaw = ({ className }: IWithClass) => {
  const [country, setCountry] = useState<string | undefined>('US');

  const { countries } = // , languages, country, setCountry, language, setLanguage } =
    useCountries();

  const handleChanged =  (newValue: OnChangeValue<Country, false>, actionMeta: ActionMeta<Country>) => {
    console.log('## SEL', {newValue, actionMeta})
    setCountry(newValue?.code)
  };

  // const options: IOption[] = countries.map((c) => ({ value: c.code, label: c.name }));

  const animatedComponents = makeAnimated();

  const selected = countries.find(c => c.code === country);

  const getLabel = (country: Country | undefined) => {
    if(country == null) return '';
    const text = country.name === country.native ? country.name : `${country.name} / ${country.native}`
    return <div className="country">
      <span className='icon'>{country.phone}</span>
      <span className='text'>{text}</span>
    </div>
  }

  return (
    <div className={className}>
       <Select<Country>
          className="countries geo"
          // classNamePrefix="select"
          defaultValue={selected}
          // defaultInputValue={country}
          
          getOptionLabel={getLabel as ((country: Country | undefined) => string)}
          getOptionValue= {o => o.code}
          isDisabled={!countries?.length}
          isLoading={!countries?.length}
          isClearable={true}
          isRtl={false}
          isSearchable={true}
          name="countries"
          options={countries}
          // options={options}
          onChange={handleChanged}
          components={animatedComponents}
        />
    </div>
  );
};
