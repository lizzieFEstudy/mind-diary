import { useAuthSignInWithEmailAndPassword } from '@react-query-firebase/auth';
import { LoginBox } from 'components/User/Login.styled';
import { Button } from 'components/common/Button';
import { Input } from 'components/common/Input';
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
      alert(ERROR_CODE[error.code]);
    }
  });

  const signIn = async (event) => {
    event.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <>
      <LoginBox>
        <form>
          <div>
            <Input
              type="email"
              value={email}
              name="email"
              onChange={onChangeEmailHandler}
              placeholder="이메일"
              required
            ></Input>
          </div>
          <div>
            <Input
              type="password"
              value={password}
              name="password"
              onChange={onChangePasswordHandler}
              placeholder="비밀번호"
              required
            ></Input>
          </div>
          <Button $size="lg" onClick={signIn}>
            로그인
          </Button>
          <Link to="/join">회원가입</Link>
        </form>
      </LoginBox>
    </>
  );
};

export default Login;
