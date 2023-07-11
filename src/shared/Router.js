import Detail from 'pages/Detail';
import Main from 'pages/Main';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import Layout from './Layout';
import Login from 'pages/Login';
import Write from 'pages/Write';
import Join from 'pages/Join';

const Router = () => {
  console.log('✏️리렌더링: Router.js');

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Layout>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          {/* <Route path="/write" element={<Write />}></Route> */}
          {/* <Route path="/write?test=t" element={<h1>test</h1>}></Route> */}
          {/* <Route path="/write/1" element={<h1>test2</h1>}></Route> */}
          <Route path="/write" element={<Write />}>
            <Route path="1" element={<div>1test</div>} />
            {/* <Route path="2" element={<About></About>} /> */}
          </Route>
          <Route path="/detail/:id" element={<Detail />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/join" element={<Join />}></Route>
          <Route path="*" element={<div>없는 페이지입니다.</div>}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
