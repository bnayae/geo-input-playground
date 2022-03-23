import styled from "styled-components";
import { CountryStateCityRaw } from "./CountryStateCityRaw";

export const CountryStateCity = styled(CountryStateCityRaw)`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 2em;
  margin: 2em;

  .geo {
    font-size: 0.5cm;
    padding: 0.5em;
    min-width: 25em;
  }

  div[class$="control"] {
    /* box-shadow: 0 0 0 1px red !important; */
    :hover {
      border-color: red !important;
    }
  }

  .country {
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: 1em;
    justify-content: start;
    align-content: center;
    align-items: center;

    .icon {
      display: grid;
      align-content: center;
      align-items: center;
    }
  }
`;
