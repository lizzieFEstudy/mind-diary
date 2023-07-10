import { useAuthSignInWithEmailAndPassword } from '@react-query-firebase/auth';
import { auth } from 'config/firebase';
import useInput from 'hooks/useInput';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [email, onChangeEmailHandler] = useInput();
  const [password, onChangePasswordHandler] = useInput();

  const ERROR_CODE = {
    'auth/user-not-found': '존재하지 않는 사용자 정보입니다',
    'auth/wrong-password': '비밀번호가 일치하지 않습니다'
  };

  const mutation = useAuthSignInWithEmailAndPassword(auth, {
    onSuccess: () => {
      navigate('/');
    },
    onError: (error) => {
      // alert(error.code);
      alert(ERROR_CODE[error.code]);
    }
  });

  const signIn = async (event) => {
    event.preventDefault();

    mutation.mutate({ email, password });
  };

  return (
    <>
      <h1>Login</h1>
      <form>
        <div>
          <label>아이디</label>
          <input type="email" value={email} name="email" onChange={onChangeEmailHandler} required></input>
        </div>
        <div>
          <label>비밀번호</label>
          <input type="password" value={password} name="password" onChange={onChangePasswordHandler} required></input>
        </div>
        <button onClick={signIn}>로그인</button>
        <Link to="/join">회원가입</Link>
      </form>
    </>
  );
};

export default Login;
