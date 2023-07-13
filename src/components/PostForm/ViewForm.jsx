import { delPost, getDetail } from 'api/posts';
import Loading from 'components/common/Loading';
import { POST_FORM01 } from 'constants/postForm';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router';

const ViewForm = () => {
  const navigate = useNavigate();

  const param = useParams();
  const { isLoading, isError, data } = useQuery(['posts', param.id], async () => await getDetail(param.id));

  const queryClient = useQueryClient();
  const mutation = useMutation(delPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      queryClient.invalidateQueries(['posts', param.id]);
      navigate('/');
    }
  });

  const handleDeleteButtonClick = (event) => {
    event.preventDefault();
    mutation.mutate(param.id);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h1>데이터를 불러올 수 없습니다.</h1>;
  }

  return (
    <div>
      <div>
        <div>
          <label>{POST_FORM01.item01}</label>
          <div>{data.content.item01}</div>
        </div>
        <div>
          <label>{POST_FORM01.item02}</label>
          <div>{data.content.item02}</div>
        </div>
        <div>
          <label>{POST_FORM01.item03}</label>
          <div>{data.content.item03}</div>
        </div>
      </div>

      <div>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          뒤로가기
        </button>
        <button
          onClick={() => {
            navigate(`/edit/${param.id}`);
          }}
        >
          수정
        </button>
        <button onClick={handleDeleteButtonClick}>삭제</button>
      </div>
    </div>
  );
};

export default ViewForm;
