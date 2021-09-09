import styled from "styled-components";

export const Content = styled.div`
  flex: 2;

  -webkit-user-select: none;    
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  /* @media(max-width: 600px){
    display: none;
  } */

  .logo {
    position: absolute;
    top: 6rem;
    left: 10rem;
  }

  .wrapper {
    display: flex;
    align-items: center;
    position: absolute;

    bottom: 14rem;
    left: 10rem;

    h1 {
      font-size: 16rem;
      font-weight: 600;
    }

    .stats {
      display: flex;
      flex-direction: column;
      margin-bottom: -2rem;
      padding: 0 3rem;

      h3 {
        font-size: 6rem;
      }

      span {
        font-size: 2rem;
      }
    }

    .status {
      display: flex;
      flex-direction: column;
      flex-direction: column;
      margin-bottom: -1.5rem;

      & > * {
        padding: 0.75rem;
      }

      i {
        font-size: 6rem;
      }

      span {
        font-size: 2rem;
      }
    }
  }
`;