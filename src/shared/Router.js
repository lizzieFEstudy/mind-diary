import Detail from 'pages/Detail';
import Main from 'pages/Main';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import Layout from './Layout';
import Login from 'pages/Login';
import Write from 'pages/Write';
import Join from 'pages/Join';
import Edit from 'pages/Edit';
import AuthRoute from 'components/common/AuthRoute';
import { useAuthUser } from '@react-query-firebase/auth';
import { auth } from 'config/firebase';
import NotFound from 'pages/NotFound';
import WriteForm from 'components/PostForm/WriteForm';
import WriteIntro from 'components/PostForm/WriteIntro';

const Router = () => {
  // console.log('✏️리렌더링: Router.js');

  const user = useAuthUser('user', auth);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Layout>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/join" element={<Join />}></Route>

          {/* <Route path="/write" element={<AuthRoute component={<Write />} authenticated={user} />} /> */}
          <Route path="/write" element={<AuthRoute component={<Write />} authenticated={user} />}>
            <Route path="intro" element={<WriteIntro />} />
            <Route path="type01" element={<WriteForm />} />
          </Route>
          <Route path="/detail/:id" element={<Detail />}></Route>
          <Route path="/edit/:id" element={<AuthRoute component={<Edit />} authenticated={user} />} />

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
