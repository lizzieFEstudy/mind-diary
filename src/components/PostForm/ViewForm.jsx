import { delPost, getDetail } from 'api/posts';
import * as S from './WriteForm.styled';
import { Button, ButtonBox } from 'components/common/Button';
import Loading from 'components/common/Loading';
import { POST_FORM01 } from 'constants/postForm';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router';
import { useAuthUser } from '@react-query-firebase/auth';
import { auth } from 'config/firebase';

const ViewForm = () => {
  const navigate = useNavigate();

  const param = useParams();

  const queryUser = useAuthUser('user', auth);

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

  if (isLoading || queryUser.isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h1>데이터를 불러올 수 없습니다.</h1>;
  }

  return (
    <S.FormBox>
      <div>
        <S.FormRow>
          <label>
            <S.StepNum>STEP 01. </S.StepNum>
            {POST_FORM01.item01}
          </label>
          <div>{data.content.item01}</div>
        </S.FormRow>
        <S.FormRow>
          <label>
            <S.StepNum>STEP 02. </S.StepNum>
            {POST_FORM01.item02}
          </label>
          <div>
            <ul>
              {data.content.item02.map((item, i) => {
                return <li key={`${(item, i)}`}>{item}</li>;
              })}{' '}
            </ul>
          </div>
        </S.FormRow>
        <S.FormRow>
          <label>
            <S.StepNum>STEP 03. </S.StepNum>
            {POST_FORM01.item03}
          </label>
          <div>{data.content.item03}</div>
        </S.FormRow>
        <S.FormRow>
          <label>
            <S.StepNum>STEP 04. </S.StepNum>
            {POST_FORM01.item04}
          </label>
          <div>{data.content.item04}</div>
        </S.FormRow>
        <S.FormRow>
          <label>
            <S.StepNum>STEP 05. </S.StepNum>
            {POST_FORM01.item05}
          </label>
          <div>{data.content.item05}</div>
        </S.FormRow>
      </div>

      <ButtonBox>
        <Button
          $variant="secondary"
          $size="lg"
          onClick={() => {
            navigate(-1);
          }}
        >
          뒤로가기
        </Button>
        {queryUser.data && queryUser.data.uid == data.writer ? (
          <>
            <Button
              $size="lg"
              onClick={() => {
                navigate(`/edit/${param.id}`);
              }}
            >
              수정
            </Button>
            <Button $variant="secondary" $size="lg" onClick={handleDeleteButtonClick}>
              삭제
            </Button>
          </>
        ) : null}
      </ButtonBox>
    </S.FormBox>
  );
};

export default ViewForm;
