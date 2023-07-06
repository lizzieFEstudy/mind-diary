import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div id="container">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
