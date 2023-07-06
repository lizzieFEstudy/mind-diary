import Detail from 'pages/Detail';
import Main from 'pages/Main';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import Layout from './Layout';
import Login from 'pages/Login';

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Layout>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/detail/:id" element={<Detail />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
