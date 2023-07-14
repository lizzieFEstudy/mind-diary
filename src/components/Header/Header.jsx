import { useAuthUser } from '@react-query-firebase/auth';
import { Button } from 'components/common/Button';
import { auth } from 'config/firebase';
import { signOut } from 'firebase/auth';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const Header = () => {
  const navigate = useNavigate();

  const { isLoading, isError, data } = useAuthUser('user', auth);

  // if (isLoading) {
  //   return <h1>로딩중입니다....!</h1>;
  // }

  // if (isError) {
  //   return <h1>오류가 발생하였습니다..!</h1>;
  // }

  const logOut = async (event) => {
    event.preventDefault();

    await signOut(auth);

    navigate('/');
  };

  return (
    <S.HeaderBox>
      <h1>
        <Link to={'/'}>단-데기 마음일기장</Link>
      </h1>
      {data ? (
        <>
          <S.ProfileImgBoxSM>
            <img src={data.photoURL} alt="프로필 사진" />
          </S.ProfileImgBoxSM>
          {data.displayName}님 안녕하세요!
          <Button $variant="secondary" onClick={logOut}>
            로그아웃
          </Button>
        </>
      ) : (
        <Button
          $variant="secondary"
          onClick={(event) => {
            event.preventDefault();
            navigate('/login');
          }}
        >
          로그인
        </Button>
      )}

      <Button
        onClick={(event) => {
          event.preventDefault();
          navigate('/write');
        }}
      >
        새 글 쓰기
      </Button>
    </S.HeaderBox>
  );
};

export const S = {
  HeaderBox: styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    padding: 50px 0;

    h1 {
      margin-right: auto;
      font-size: 22px;
      font-weight: 600;
    }
  `,
  ProfileImgBoxSM: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: none;
    overflow: hidden;
    width: 50px;
    height: 50px;
    border-radius: 100%;

    img {
      width: 100%;
    }
  `
};

export default Header;
