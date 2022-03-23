import styled from "styled-components";
import { ReactFlagsSelectComponentRaw } from "./ReactFlagsSelectComponentRaw";

export const ReactFlagsSelectComponent = styled(ReactFlagsSelectComponentRaw)`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 2em;
  margin: 2em;
  min-width: 25em;
`;
