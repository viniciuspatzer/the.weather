import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import teste from '../assets/prov2.jpg'

export const Content = styled.div`
  height: 100vh;
  min-height: 700px;
  display: flex;
  align-items: stretch;
  /* background: black; */
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
    border: 0;
    outline: 0;
  }

  input {
    outline: 0;
    border: 0;
  }

  a {
    text-decoration: none;
  }

  ::-webkit-scrollbar{
    width: 13px;
    height: 13px;
  }

  ::-webkit-scrollbar-thumb{
    background: rgba(255, 255, 255, 0.25);
  }

  ::-webkit-scrollbar-thumb:hover{
    background: rgba(255, 255, 255, 0.30);
  }

  ::-webkit-scrollbar-track{
    background: transparent;
    box-shadow: inset 0px 0px 0px 0px #F0F0F0;
  }
`;