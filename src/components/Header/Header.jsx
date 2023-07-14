import { useAuthUser } from '@react-query-firebase/auth';
import { Button } from 'components/common/Button';
import { auth } from 'config/firebase';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const Header = () => {
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(false);

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
          <nav>
            <ul>
              <li>
                <NavLink to={'/'} activeClassName="active">
                  모두의 이야기
                </NavLink>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => {
                    alert(
                      '현재 페이지는 준비중입니다. \n빠른 시일내에 서비스를 제공할 수 있도록 노력하겠습니다. 감사합니다.'
                    );
                  }}
                >
                  내 이야기
                </a>
              </li>
            </ul>
          </nav>
          <S.ProfileImgBoxSM>
            <img src={data.photoURL} alt="프로필 사진" />
          </S.ProfileImgBoxSM>
          <Link
            onClick={() => {
              alert(
                '현재 페이지는 준비중입니다. \n빠른 시일내에 서비스를 제공할 수 있도록 노력하겠습니다. 감사합니다.'
              );
            }}
          >
            {data.displayName}
          </Link>

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
          navigate('/write/intro');
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
      font-size: 24px;
      font-weight: 600;
    }

    nav {
      flex: none;
      margin-right: auto;

      ul {
        display: flex;
        flex-direction: row;
        gap: 32px;

        li > a {
          font-size: 20px;

          &.active {
            font-weight: 600;
            color: #82c722;
          }
        }
      }
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
