import { auth } from 'config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import useInput from 'hooks/useInput';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Join = () => {
  const navigate = useNavigate();

  const [email, onChangeEmailHandler] = useInput();
  const [password, onChangePasswordHandler] = useInput();
  const [passwordConfirm, onChangePasswordConfirmHandler] = useInput();

  const signUp = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Signed in
      const user = userCredential.user;
      console.log('user with signUp', user);
      alert('회원가입이 완료되었습니다.');
      navigate('/');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error with signUp', errorCode, errorMessage);
    }
  };

  return (
    <>
      <h1>Join</h1>
      <form>
        <div>
          <label>아이디</label>
          <input type="email" value={email} name="email" onChange={onChangeEmailHandler} required></input>
        </div>
        <div>
          <label>비밀번호</label>
          <input type="password" value={password} name="password" onChange={onChangePasswordHandler} required></input>
        </div>
        <div>
          <label>비밀번호 확인</label>
          <input
            type="password"
            value={passwordConfirm}
            name="password"
            onChange={onChangePasswordConfirmHandler}
            required
          ></input>
        </div>
        <button onClick={signUp}>회원가입</button>
      </form>
    </>
  );
};

export default Join;
