import { useState } from "react";
import Select, { ActionMeta, OnChangeValue } from "react-select";
import makeAnimated from "react-select/animated";
import Flag from "react-world-flags";
import useCountries from "use-countries";
import { Country } from "use-countries/dist/locales";

interface IWithClass {
  className?: string;
}

// interface IOption {
//   value: string;
//   label: string;
// }

export const HookCountriesRaw = ({ className }: IWithClass) => {
  const [country, setCountry] = useState<string | undefined>("US");

  const { countries } = useCountries(); // , languages, country, setCountry, language, setLanguage } =

  const handleChanged = (
    newValue: OnChangeValue<Country, false>,
    actionMeta: ActionMeta<Country>
  ) => {
    console.log("## SEL", { newValue, actionMeta });
    setCountry(newValue?.code);
  };

  // const options: IOption[] = countries.map((c) => ({ value: c.code, label: c.name }));

  const animatedComponents = makeAnimated();

  const selected = countries.find((c) => c.code === country);

  const getLabel = (country: Country | undefined) => {
    if (country == null) return "";
    const text =
      country.name === country.native
        ? country.name
        : `${country.name} / ${country.native}`;
    return (
      <div className="country">
        <span className="icon">
          <Flag code={country.code} width="32" />
        </span>
        <span className="text">{text}</span>
      </div>
    );
  };

  return (
    <div className={className}>
      <Select<Country>
        className="countries geo"
        // classNamePrefix="select"
        defaultValue={selected}
        // defaultInputValue={country}

        filterOption={(c, v) =>
          c.data.name.toLowerCase().indexOf(v.toLowerCase()) != -1 ||
          c.data.native.toLowerCase().indexOf(v.toLowerCase()) != -1
        }
        getOptionLabel={getLabel as (country: Country | undefined) => string}
        getOptionValue={(o) => o.code}
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
