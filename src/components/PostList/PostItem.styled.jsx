import styled, { css } from 'styled-components';

const TYPES = {
  type02: css`
    --post-background: #b939f9;
  `,
  type03: css`
    --post-background: #ff7639;
  `
};

const Post = ({ $type, children }) => {
  const typeStyle = TYPES[$type];

  return <StyledPost $TYPES={typeStyle}>{children}</StyledPost>;
};

export const StyledPost = styled.li`
  ${(p) => p.$typeStyle}

  box-sizing: border-box;
  width: 30%;
  margin-bottom: 140px;
  background: #dfdfdf;
  box-shadow: 6px 6px 18px 0 rgba(0, 0, 0, 0.1);

  a {
    box-sizing: border-box;
    display: block;
    position: relative;
    height: 360px;
    padding: 30px;
    border-bottom-right-radius: 60px 10px;
    font-size: 22px;
    font-weight: 600;
    background: var(--post-background, linear-gradient(45deg, #fcae16, #fcb217));
    color: #000;
    transition: all 300ms;

    &:before {
      content: '';
      position: absolute;
      top: -20px;
      right: calc(50% - 70px);
      width: 140px;
      height: 40px;
      background: rgba(0, 0, 0, 0.05);
      border: 1px solid rgba(0, 0, 0, 0.03);
      box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.05);
    }

    span {
      display: block;
      margin-top: 16px;
      font-size: 18px;
      font-weight: 400;
    }
  }

  &:hover a {
    border-bottom-right-radius: 75px 30px;
  }

  &:nth-child(1),
  &:nth-child(3n + 1) {
    transform: rotate(-6deg);

    a:before {
      transform: rotate(6deg);
    }
  }

  &:nth-child(2n) {
    transform: translateY(20px) rotate(6deg);
    a:before {
      top: calc(100% - 50px);
      right: -50px;
      width: 170px;
      height: 36px;
      transform: rotate(-45deg);
    }
  }

  &:nth-child(3),
  &:nth-child(5n) {
    transform: rotate(-3deg);
    border: 2px dashed #ddd;
    transform: translate(-22px, 20px);
    background: transparent;
    box-shadow: none;

    a {
      transform: translate(20px, -30px) rotate(-3deg);
      box-shadow: 6px 6px 18px 0 rgba(0, 0, 0, 0.1);

      &:before {
        top: 20px;
        right: -50px;
        width: 170px;
        height: 36px;
        transform: rotate(45deg);
      }
    }
  }
`;

export default Post;
