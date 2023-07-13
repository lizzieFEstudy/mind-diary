import { useAuthUser } from '@react-query-firebase/auth';
import { auth } from 'config/firebase';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const { isLoading, isError, data } = useAuthUser('user', auth);

  if (isLoading) {
    return <h1>로딩중입니다....!</h1>;
  }

  if (isError) {
    return <h1>오류가 발생하였습니다..!</h1>;
  }

  const logOut = async (event) => {
    event.preventDefault();

    await signOut(auth);

    navigate('/');
  };

  return (
    <>
      <h1>단-데기 마음일기장</h1>
      {data ? (
        <>
          닉네임: {data.displayName} <button onClick={logOut}>로그아웃</button>
          <div style={{ width: '100px' }}>
            <img src={data.photoURL} alt="프로필 사진" style={{ width: '100%' }} />
          </div>
        </>
      ) : (
        <button
          onClick={(event) => {
            event.preventDefault();
            navigate('/login');
          }}
        >
          로그인
        </button>
      )}

      <button
        onClick={(event) => {
          event.preventDefault();
          navigate('/write');
        }}
      >
        새 글 쓰기
      </button>
    </>
  );
};

export default Header;
