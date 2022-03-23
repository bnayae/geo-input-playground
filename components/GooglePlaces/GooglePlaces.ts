import styled from "styled-components";
import { GooglePlacesRaw } from "./GooglePlacesRaw";

export const GooglePlaces = styled(GooglePlacesRaw)`
  /* display: grid;
  grid-auto-flow: column;
  grid-column-gap: 2em;
  margin: 2em;
  min-width: 25em; */

  .sb-title {
    position: relative;
    top: -12px;
    font-family: Roboto, sans-serif;
    font-weight: 500;
  }

  .sb-title-icon {
    position: relative;
    top: -5px;
  }

  .card-container {
    display: flex;
    height: 500px;
    width: 600px;
  }

  .panel {
    background: white;
    width: 300px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .half-input-container {
    display: flex;
    justify-content: space-between;
  }

  .half-input {
    max-width: 120px;
  }

  .map {
    width: 300px;
  }

  h2 {
    margin: 0;
    font-family: Roboto, sans-serif;
  }

  input {
    height: 30px;
  }

  input {
    border: 0;
    border-bottom: 1px solid black;
    font-size: 14px;
    font-family: Roboto, sans-serif;
    font-style: normal;
    font-weight: normal;
  }

  input:focus::placeholder {
    color: white;
  }

  .button-cta {
    height: 40px;
    width: 40%;
    background: #3367d6;
    color: white;
    font-size: 15px;
    text-transform: uppercase;
    font-family: Roboto, sans-serif;
    border: 0;
    border-radius: 3px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.48);
    cursor: pointer;
  }
`;
