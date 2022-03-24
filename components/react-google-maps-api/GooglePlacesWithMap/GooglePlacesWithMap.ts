import styled from "styled-components";
import { GooglePlacesWithMapRaw } from "./GooglePlacesWithMapRaw";

export const GooglePlacesWithMap = styled(GooglePlacesWithMapRaw)`
  .layout {
    display: grid;
    grid-template-areas: "places map";
    grid-template-columns: auto 400px;
    grid-column-gap: 2cm;

    .places {
      grid-area: places;
    }

    .map {
      grid-area: map;
    }
  }

  .form-input {
    min-width: 15cm;
  }
`;
