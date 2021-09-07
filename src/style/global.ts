import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import teste from '../assets/prov2.jpg'

export const Content = styled.div`
  height: 100vh;
  min-height: 700px;

  display: flex;
  align-items: stretch;

  background: url(${teste}) center center/cover no-repeat;
`;

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body, input, textarea, button {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    color: #FFF;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }
`;