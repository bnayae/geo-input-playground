import styled from "styled-components";
import { GooglePlacesWithMapRaw } from "./GooglePlacesWithMapRaw";

export const GooglePlacesWithMap = styled(GooglePlacesWithMapRaw)`
  .layout {
    display: grid;
    grid-auto-flow: row;
  }

  .form-input {
    min-width: 10cm;
  }
`;
