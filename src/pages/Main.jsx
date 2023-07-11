import { getPosts } from 'api/posts';
import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

const Main = () => {
  const { isLoading, isError, data } = useQuery('posts', getPosts);

  if (isLoading) {
    return <h1>로딩중입니다....!</h1>;
  }

  if (isError) {
    return <h1>오류가 발생하였습니다..!</h1>;
  }

  return (
    <>
      <div>Main</div>
      <ul>
        {data.map((item) => {
          return (
            <li key={item.id}>
              <Link to={`/detail/${item.id}`}>
                <strong>{item.item01}</strong>
                <span>{item.date}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Main;
