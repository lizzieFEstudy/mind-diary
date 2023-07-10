import { useAuthSignInWithEmailAndPassword } from '@react-query-firebase/auth';
import { auth } from 'config/firebase';
// import { signInWithEmailAndPassword } from 'firebase/auth';
import useInput from 'hooks/useInput';
import React from 'react';
// import { QueryClient, useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [email, onChangeEmailHandler] = useInput();
  const [password, onChangePasswordHandler] = useInput();

  const mutation = useAuthSignInWithEmailAndPassword(auth, {
    onError: (error) => {
      alert(error.code);
      console.log('useAuthSignInWithEmailAndPassword error => ', error);
      // alert('Could not sign you in!');
    }
  });

  // const signIn = async () => {
  const signIn = async (event) => {
    event.preventDefault();

    mutation.mutate({ email, password });
    navigate('/');

    // try {
    //   const userCredential = await signInWithEmailAndPassword(auth, email, password);
    //   console.log('user with signIn', userCredential.user);
    //   navigate('/');
    // } catch (error) {
    //   alert('error', error.code);
    // }
  };

  // const mutation = useMutation(signIn, {
  //   onSuccess: () => {
  //     QueryClient.invalidateQueries('currentUser');
  //     console.log('성공하였습니다.');
  //   }
  // });

  // const handleSignInButtonClick = (event) => {
  //   event.preventDefault();
  //   mutation.mutate({ email, password });
  // };

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
        {/* <button onClick={handleSignInButtonClick}>로그인</button> */}
        <button onClick={signIn}>로그인</button>
        <Link to="/join">회원가입</Link>
      </form>
    </>
  );
};

export default Login;
