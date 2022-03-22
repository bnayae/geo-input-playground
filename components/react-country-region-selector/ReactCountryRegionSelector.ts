import styled from 'styled-components';
import { ReactCountryRegionSelectorRaw } from './ReactCountryRegionSelectorRaw';

export const ReactCountryRegionSelector = styled(ReactCountryRegionSelectorRaw)`
  display: grid;
  grid-auto-flow:column;
  grid-column-gap: 2em;
  margin: 2em;

  .geo{
    font-size:0.5cm;
    padding: 0.5em;

    option {
      background: pink;
    }
  }
`;

