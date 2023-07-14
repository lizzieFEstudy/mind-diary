import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import React from 'react';
import { styled } from 'styled-components';

const Layout = ({ children }) => {
  return (
    <S.LayoutContainer>
      <S.Wrapper>
        <Header />
        <S.LayoutContent>{children}</S.LayoutContent>
        <Footer />
      </S.Wrapper>
    </S.LayoutContainer>
  );
};

export const S = {
  LayoutContainer: styled.div`
    overflow-x: hidden;
    max-width: 100vw;
    min-height: 100vh;
    background: #f1f1f1;
  `,
  LayoutContent: styled.div`
    margin: 10px 0 90px;
  `,
  Wrapper: styled.div`
    box-sizing: border-box;
    overflow: hidden;
    max-width: 1480px;
    width: 100%;
    margin: 0 auto;
    padding: 0 30px;
  `
};

export default Layout;
