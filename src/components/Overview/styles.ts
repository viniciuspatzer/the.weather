import styled from "styled-components";

export const Content = styled.aside`
  flex: 1;
  background-color: rgb(10, 10, 10, 0.5);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);

  padding-left: 8rem;


  .search-bar {
    display: flex;
    align-items: flex-end;

    input {
      width: 100%;
      background-color:rgba(0, 0, 0, 0);
      border: 0;
      border-bottom: 0.1rem solid #81A09A;
      outline: 0;

      font-size: 2rem;
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
    }
  }
`;