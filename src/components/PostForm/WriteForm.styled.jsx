import styled from 'styled-components';

export const FormBox = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const FormRow = styled.div`
  margin-top: 46px;

  > label {
    display: block;
    margin-bottom: 16px;
    font-weight: 600;
  }
`;

export const FormCheckList = styled.ul`
  display: block;
  overflow-x: hidden;
  height: 200px;
  padding: 20px 16px;
  border: 1px solid #d5d9de;
  background: #fff;

  > li {
    margin: 6px 0;
  }

  span {
    font-size: 15px;
    color: #888;
    padding-left: 6px;
  }
`;

export const StepNum = styled.span`
  /* color: #a7d862;
    color: #aaa;
    color: #eb1b44; */
  color: #82c722;
  font-weight: 600;
`;
