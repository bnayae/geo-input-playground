import styled from 'styled-components';
import { HookCountriesRaw } from './HookCountriesRaw';

export const HookCountries = styled(HookCountriesRaw)`
  display: grid;
  grid-auto-flow:column;
  grid-column-gap: 2em;
  margin: 2em;

  .geo{
    font-size:0.5cm;
    padding: 0.5em;
    min-width:20em;
  }
`;

