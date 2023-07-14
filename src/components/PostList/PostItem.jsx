import React from 'react';
import { Link } from 'react-router-dom';
import Post from './PostItem.styled';
// import Post, * as S from './PostItem.styled';

const PostItem = ({ item }) => {
  return (
    <Post>
      <Link to={`/detail/${item.id}`}>
        <strong>{item.content.item01}</strong>
        <span>{item.regdate}</span>
        <span>{item.writer}</span>
      </Link>
    </Post>
  );
};

export default PostItem;
