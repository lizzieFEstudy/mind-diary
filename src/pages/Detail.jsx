import { delPost, getDetail } from 'api/posts';
import { POST_FORM01 } from 'constants/postForm';
// import * as postForms from 'constants/postForm';
import React from 'react';
import { QueryClient, useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router';

const Detail = () => {
  console.log('✏️리렌더링: Detail.jsx');

  const navigate = useNavigate();

  const param = useParams();
  console.log('상세페이지 param => ', param);
  const { isLoading, isError, data } = useQuery('posts', () => getDetail(param.id));
  console.log('디테일페이지 data => ', data);

  const mutation = useMutation(delPost, {
    onSuccess: () => {
      QueryClient.invalidateQueries('posts');
    }
  });

  const handleDeleteButtonClick = (event) => {
    event.preventDefault();
    mutation.mutate(param.id);
  };

  if (isLoading) {
    return <h1>로딩중입니다....!</h1>;
  }

  if (isError) {
    return <h1>오류가 발생하였습니다..!</h1>;
  }

  if (!data) return;

  return (
    <>
      <div>Detail</div>
      <div>
        <label>{POST_FORM01.item01}</label>
        <div>{data.item01}</div>
      </div>
      <div>
        <label>{POST_FORM01.item02}</label>
        <div>{data.item02}</div>
      </div>
      <div>
        <label>{POST_FORM01.item03}</label>
        <div>{data.item03}</div>
      </div>

      <button
        onClick={() => {
          navigate(`/edit/${param.id}`);
        }}
      >
        수정
      </button>
      <button onClick={handleDeleteButtonClick}>삭제</button>
    </>
  );
};

export default Detail;
