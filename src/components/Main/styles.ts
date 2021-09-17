import styled from "styled-components";

export const Content = styled.div`
  flex: 2;

  .logo {
    position: absolute;
    top: 6rem;
    left: 10rem;
    font-size: 2rem;
    font-weight: 600;
    color: #FFF;
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
      padding: 0 6rem 0 4rem;

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
      margin-bottom: 2.3rem;

      & > * {
        padding: 0.75rem;
      }

      span {
        font-size: 2rem;
      }

      img {
        max-width: 11.5rem;
      }
    }

    -webkit-user-select: none;    
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  //// Media Queries
  @media(max-width: 1680px){
    .wrapper {
      flex-direction: column;

      bottom: 7.5rem;
      left: 7.5rem;
    }
  }
`;