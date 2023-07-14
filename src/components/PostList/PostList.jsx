import { getPosts } from 'api/posts';
import Loading from 'components/common/Loading';
import React from 'react';
import { useQuery } from 'react-query';
import PostItem from './PostItem';
import { styled } from 'styled-components';

const PostList = () => {
  const { isLoading, isError, data } = useQuery('posts', getPosts);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h1>오류가 발생하였습니다..!</h1>;
  }

  if (!data) return;

  return (
    <S.PostBox>
      {data.map((item) => {
        return <PostItem item={item} key={item.id} />;
      })}
    </S.PostBox>
  );
};

export const S = {
  PostBox: styled.ul`
    display: flex;
    gap: 5%;
    flex-wrap: wrap;
    padding: 0 30px;
  `
};

export default PostList;
