import { getDetail } from 'api/posts';
import * as postForms from 'constants/postForm';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router';

const Detail = () => {
  console.log('✏️리렌더링: Detail.jsx');

  const navigate = useNavigate();

  const param = useParams();
  const { isLoading, isError, data } = useQuery('posts', () => getDetail(param.id));
  console.log('디테일페이지 data => ', data);

  if (isLoading) {
    return <h1>로딩중입니다....!</h1>;
  }

  if (isError) {
    return <h1>오류가 발생하였습니다..!</h1>;
  }

  return (
    <>
      <div>Detail</div>
      <div>
        <label>{postForms[data.type].item01}</label>
        <div>{data.item01}</div>
      </div>
      <div>
        <label>{postForms[data.type].item02}</label>
        <div>{data.item02}</div>
      </div>
      <div>
        <label>{postForms[data.type].item03}</label>
        <div>{data.item03}</div>
      </div>

      <button
        onClick={() => {
          navigate(`/write?postId=${param.id}`);
        }}
      >
        수정
      </button>
      <button>삭제</button>
    </>
  );
};

export default Detail;
