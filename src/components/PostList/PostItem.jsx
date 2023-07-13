import React from 'react';
import { Link } from 'react-router-dom';

const PostItem = ({ item }) => {
  return (
    <li>
      <Link to={`/detail/${item.id}`}>
        <strong>{item.content.item01}</strong>
        <span>{item.regdate}</span>
      </Link>
    </li>
  );
};

export default PostItem;
