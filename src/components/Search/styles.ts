import styled from "styled-components";

export const Content = styled.div`

  min-height: 36rem;

  .search-bar {
    display: flex;
    align-items: flex-end;

    input {
      width: 100%;
      background-color:rgba(0, 0, 0, 0);
      border: 0;
      border-bottom: 0.1rem solid #81A09A;
      outline: 0;

      font-size: 1.8rem;
      line-height: 5rem;

      &::placeholder {
        color: #81A09A;
      }
    }

    .icon-box {
      margin-left: 6rem;
      padding: 4rem;
      background-color: #81A09A;
      cursor: pointer;
      border: 0;
      outline: 0;
    }
  }

  .cities-suggestions {
    display: flex;
    flex-direction: column;
    margin: 2rem 0;
    margin-left: -1.5rem;


    span {
      padding: 1.5rem;
      font-size: 1.8rem;
      color: #81A09A;
      cursor: pointer;

      &:hover {
          filter: brightness(2);
          background-color: rgba(10, 10, 10, 0.1);
      }
    }
}
`;