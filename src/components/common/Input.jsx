import styled, { css } from 'styled-components';

const commonInputStyles = css`
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1px solid #d5d9de;
  /* border-radius: ${(props) => props.theme.borderRadius}; */
  font: inherit;
  font-size: 0.9rem;
  line-height: 50px;
  background-color: #fff;
`;
export const Input = styled.input`
  ${commonInputStyles}

  &::placeholder {
    color: #abafb2;
  }
`;
export const Select = styled.select`
  ${commonInputStyles}
`;

export const Textarea = styled.textarea`
  ${commonInputStyles}
  height: 180px;
`;
