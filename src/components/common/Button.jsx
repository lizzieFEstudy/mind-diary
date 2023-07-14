import styled, { css } from 'styled-components';

const SIZES = {
  sm: css`
    --button-font-size: 0.875rem;
    --button-padding: 8px 12px;
    --button-radius: 4px;
  `,
  md: css`
    --button-font-size: 1rem;
    --button-padding: 12px 16px;
    --button-radius: 8px;
  `,
  lg: css`
    --button-font-size: 1.25rem;
    --button-padding: 16px 20px;
    --button-radius: 12px;
  `
};

const VARIANTS = {
  secondary: css`
    --button-color: #000;
    --button-bg-color: transparent;
    --button-hover-bg-color: rgba(0, 0, 0, 0.03);
    --button-border-color: #000;
  `,
  success: css`
    --button-color: #ffffff;
    --button-bg-color: #28a745;
    --button-hover-bg-color: #218838;
  `,
  successOutline: css`
    --button-color: #28a745;
    --button-bg-color: #fff;
    --button-hover-bg-color: rgba(33, 136, 56, 0.03);
    --button-border-color: #28a745;
  `,
  error: css`
    --button-color: #ffffff;
    --button-bg-color: #dc3545;
    --button-hover-bg-color: #c82333;
  `,
  warning: css`
    --button-color: #212529;
    --button-bg-color: #ffc107;
    --button-hover-bg-color: #e0a800;
  `
};

/**
 * 버튼 style
 * @param { {size: "sm" | "md" | "lg"; varient: "success" | "successOutline" | "error" | "warning"} }  * 비활성화, 크기, 종류, 내용
 */
export const Button = ({ disabled, $size, $variant, children, onClick }) => {
  const sizeStyle = SIZES[$size];
  const variantStyle = VARIANTS[$variant];

  return (
    <StyledButton disabled={disabled} $sizeStyle={sizeStyle} $variantStyle={variantStyle} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  ${(p) => p.$sizeStyle}
  ${(p) => p.$variantStyle}

  margin: 0;
  border: none;
  cursor: pointer;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: var(--button-font-size, 1rem);
  padding: var(--button-padding, 12px 16px);
  border: 1px solid var(--button-border-color, transparent);
  /* border-radius: var(--button-radius, 8px); */
  background: var(--button-bg-color, #000);
  color: var(--button-color, #ffffff);
  transition: background 300ms;

  &:active,
  &:hover,
  &:focus {
    background: var(--button-hover-bg-color, #a7d862);
    color: var(--button-hover-color, #000);
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
    background: var(--button-bg-color, #000);
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 36px 0;
`;
