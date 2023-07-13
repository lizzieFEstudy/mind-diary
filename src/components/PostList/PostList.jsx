import { getPosts } from 'api/posts';
import Loading from 'components/common/Loading';
import React from 'react';
import { useQuery } from 'react-query';
import PostItem from './PostItem';

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
    <ul>
      {data.map((item) => {
        return <PostItem item={item} key={item.id} />;
      })}
    </ul>
  );
};

export default PostList;
