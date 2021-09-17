import styled from "styled-components";

export const Content = styled.aside`
  flex: 1;
  background-color: rgb(0, 0, 0, 0.5);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  padding: 0 8rem;
  overflow: auto;

  .separator {
    width: 100%;
    height: 0.1rem;
    background-color: #81A09A;
  }

  .heading {
    font-size: 2rem;
    font-weight: 400;
    margin-top: 5rem;
   }

  .container-flex-dual {
    margin: 5rem 0;

    div {
      display: flex;
      justify-content: space-between;

      & + div {
        margin-top: 3.5rem;
      }

      span {
        font-size: 1.8rem;
      }

      span:first-of-type {
        color: #81A09A;
      }
    }
  }

  .container-chart {
    margin: 5rem 0;
  }

  .container-flex-column {
    display: flex;
    flex-direction: column;
    margin: 2.5rem 0;

    div {
      display: flex;
      align-items: center;
      padding: 1.25rem 0;
    }
    
    .date-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      width: 5rem;
      height: 5rem;
      border-radius: 50%;
      color: #FFF;
      padding: 3rem;

      background-color: rgb(0, 0, 0, 0.3 );

      span:first-of-type {
        font-size: 1.9rem;
      }

      span:last-of-type {
        font-size: 1.1rem;
      }
    }

    .temperatures {
      display: flex;
      flex-direction: column;
      margin-left: 3rem;

      div {
        padding: 0.25rem 0;

        i, span {
          font-size: 1.6rem;
          padding: 0.25rem;
        }
      }
    }

    .rain {
      display: flex;
      flex-direction: column;
      min-width: 12.5rem;

      i, span {
        font-size: 1.5rem;
        padding: 0.25rem;
      }
    }

    .description {
      font-size: 1.5rem;
    }
  }
`;