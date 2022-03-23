import styled from "styled-components";
import { GoogleCitySuggestRaw } from "./GoogleCitySuggestRaw";

export const GoogleCitySuggest = styled(GoogleCitySuggestRaw)`
  display: grid;
  grid-auto-flow: row;
  grid-column-gap: 2em;
  margin: 2em;
  min-width: 25em;
`;
