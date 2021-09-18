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

    bottom: 12rem;
    left: 10rem;

    h1 {
      font-size: 16rem;
      font-weight: 600;
    }

    .info {
      display: flex;
      align-items: center;

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
      align-items: flex-start;
      bottom: 7.5rem;
      left: 7.5rem;
      
      h1 {
        margin-bottom: -5rem;
        margin-left: 3rem;
        font-size: 12.5rem;
      }
    }
  }

  @media(max-width: 1140px){
    flex: 1;

    .wrapper {
      bottom: 7.5rem;
      left: 2.5rem;

      h1 {
        margin-bottom: 0rem;
      }

      .info {
        display: hidden;

        .status {
          display: none;
        }
      }
    }
  }

  @media(max-width: 980px){
    display: none;
    flex: 0;
  }
`;