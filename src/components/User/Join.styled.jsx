import styled from 'styled-components';

export const JoinBox = styled.div`
  max-width: 800px;
  margin: 90px auto;
  text-align: center;

  /* input {
    height: 60px;
    margin: 4px 0;
  }
  button {
    width: 100%;
    margin: 4px 0;
  }
  a {
    display: inline-block;
    margin-top: 8px;
    color: #666;
  } */
`;

export const JoinRow = styled.div`
  display: flex;
  align-items: baseline;
  padding: 8px 0;

  > label {
    flex: none;
    width: 200px;
  }
  > div {
    flex: 1;
    text-align: left;

    > small {
      font-size: 14px;
      color: #eb1b44;
    }

    img {
      max-width: 200px;
      max-height: 500px;
    }
  }
`;
