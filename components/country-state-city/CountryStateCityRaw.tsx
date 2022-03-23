import { City, Country, State } from "country-state-city";
import { ICountry, IState } from "country-state-city/dist/lib/interface";
import Fuse from "fuse.js";
import { useEffect, useMemo, useState } from "react";
import Select, {
  ActionMeta,
  InputActionMeta,
  OnChangeValue,
} from "react-select";
import makeAnimated from "react-select/animated";
import Flag from "react-world-flags";

interface IWithClass {
  className?: string;
}

// interface IOption {
//   value: string;
//   label: string;
// }

enum InputKind {
  set = "set-value",
  change = "input-change",
  blur = "input-blur",
  close = "menu-close",
}

export const CountryStateCityRaw = ({ className }: IWithClass) => {
  const [country, setCountry] = useState<string | undefined>("US");
  const [state, setState] = useState<string | undefined>();
  // const [city, setCity] = useState<ICity | undefined>();

  const countries = Country.getAllCountries(); // , languages, country, setCountry, language, setLanguage } =
  const cities = City.getAllCities();
  console.log("## Cities", cities.length);
  // console.log(State.getAllStates());
  // console.log(City.getCitiesOfCountry("IL"));

  const [search, setSearch] = useState<ICountry[]>(countries);

  useEffect(() => {
    setSearch(countries);
  }, [countries]);

  const animatedComponents = makeAnimated();

  const selectedCountries = countries.find((c) => c.isoCode === country);
  const states = useMemo(
    () => State.getStatesOfCountry(country ?? ""),
    [country]
  );
  const selectedStates = useMemo(
    () => states.find((c) => c.isoCode === state),
    [states, state]
  );

  const fuseCountries = new Fuse(countries, {
    isCaseSensitive: false,
    shouldSort: true,
    // distance: 2,
    // includeMatches: true,
    includeScore: true,
    threshold: 0.2,
    keys: [
      // "isoCode", // will be assigned a `weight` of 1
      {
        name: "name",
        weight: 2,
      },
    ],
  });

  const handleCountryChanged = (
    newValue: OnChangeValue<ICountry, false>,
    actionMeta: ActionMeta<ICountry>
  ) => {
    if (newValue?.isoCode !== country) setState(undefined);
    setCountry(newValue?.isoCode);
    // setSearch(countries);
  };

  const handleStateChanged = (
    newValue: OnChangeValue<IState, false>,
    actionMeta: ActionMeta<IState>
  ) => {
    setState(newValue?.isoCode);
    // setSearch(countries);
  };

  // const handleCityChanged = (
  //   newValue: OnChangeValue<ICity, false>,
  //   actionMeta: ActionMeta<ICity>
  // ) => {
  //   setCity(newValue as ICity);
  //   // setSearch(countries);
  // };

  // const options: IOption[] = countries.map((c) => ({ value: c.code, label: c.name }));

  const getLabel = (country: ICountry | undefined) => {
    if (country == null) return "";
    const text = country.name;
    return (
      <div className="country">
        <span className="icon">
          <Flag code={country.isoCode} width="32" />
        </span>
        <span className="text">{text}</span>
      </div>
    );
  };

  const handleCountryInput = (
    newValue: string,
    actionMeta: InputActionMeta
  ) => {
    if (
      actionMeta.action === InputKind.blur ||
      actionMeta.action === InputKind.close ||
      !newValue ||
      newValue === ""
    ) {
      setSearch(countries);
      return;
    }
    const filtered = fuseCountries.search(newValue);
    const results = filtered.map((m) => m.item);
    setSearch(results);
  };

  const handleBlur = () => {
    // setSearch(countries);
  };

  return (
    <div className={className}>
      <Select<ICountry>
        className="countries geo"
        defaultValue={selectedCountries}
        onChange={handleCountryChanged}
        onInputChange={handleCountryInput}
        onBlur={handleBlur}
        filterOption={(c, v) => true}
        getOptionLabel={getLabel as (country: ICountry | undefined) => string}
        getOptionValue={(o) => o.isoCode}
        isDisabled={!countries?.length}
        isLoading={!countries?.length}
        isClearable={true}
        isRtl={false}
        isSearchable={true}
        name="countries"
        options={search}
        components={animatedComponents}
      />
      <Select<IState>
        className="states geo"
        // defaultValue={selectedStates}
        value={selectedStates}
        onChange={handleStateChanged}
        formatOptionLabel={(s) => s.name}
        filterOption={(s, v) =>
          s.data.name.toLowerCase().indexOf(v.toLowerCase()) != -1
        }
        getOptionValue={(m) => m.isoCode}
        isDisabled={!countries?.length}
        isLoading={!countries?.length}
        isClearable={true}
        isRtl={false}
        isSearchable={true}
        name="states"
        options={states}
        components={animatedComponents}
      />
      {/* <Select<ICity>
        className="cities geo"
        // defaultValue={selectedStates}
        value={city}
        onChange={handleCityChanged}
        formatOptionLabel={(s) => s.name}
        filterOption={(s, v) =>
          s.data.name.toLowerCase().indexOf(v.toLowerCase()) != -1
        }
        isDisabled={!countries?.length}
        isLoading={!countries?.length}
        isClearable={true}
        isRtl={false}
        isSearchable={true}
        name="cities"
        options={cities}
        components={animatedComponents}
      /> */}
    </div>
  );
};
