import { useAuthUser } from '@react-query-firebase/auth';
import { updatePost, getDetail } from 'api/posts';
import { auth } from 'config/firebase';
import { POST_FORM01, POST_FORM01_ITEM02_OPTIONS } from 'constants/postForm';
import useCheckbox from 'hooks/useCheckbox';
import useInput from 'hooks/useInput';
import React, { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router';
import * as S from './WriteForm.styled';
import { Button, ButtonBox } from 'components/common/Button';
import { Textarea } from 'components/common/Input';

const EditForm = () => {
  const navigate = useNavigate();
  const user = useAuthUser('user', auth);
  const param = useParams();
  const { isLoading, isError, data } = useQuery(['posts', param.id], () => getDetail(param.id));

  const [item01, onChangeItem01Handler, setItem01] = useInput();
  const [item02CheckList, onChangeItem02CheckHandler, setItem02CheckList] = useCheckbox();
  const [item03, onChangeItem03Handler, setItem03] = useInput();
  const [item04, onChangeItem04Handler, setItem04] = useInput();
  const [item05, onChangeItem05Handler, setItem05] = useInput();

  useEffect(() => {
    setItem01(data?.content.item01);
    setItem02CheckList(data?.content.item02);
    setItem03(data?.content.item03);
    setItem04(data?.content.item04);
    setItem05(data?.content.item05);

    if (user.data.uid !== data?.writer) {
      alert('잘못된 접근입니다. 메인페이지로 이동합니다.');
      navigate('/');
    }
  }, [data]);

  const queryClient = useQueryClient();
  const mutation = useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      queryClient.invalidateQueries(['posts', param.id]);
      navigate('/');
    }
  });

  const handleSubmitButtonClick = (event) => {
    event.preventDefault();

    let date = new Date();
    date = date.toLocaleDateString();

    const editPost = {
      content: {
        item01,
        item02: item02CheckList,
        item03,
        item04,
        item05
      }
    };

    mutation.mutate([param.id, editPost]);
  };

  if (isLoading) {
    return <h1>로딩중입니다....!</h1>;
  }

  if (isError) {
    return <h1>오류가 발생하였습니다..!</h1>;
  }

  return (
    <S.FormBox>
      <form onSubmit={handleSubmitButtonClick}>
        <S.FormRow>
          <label>
            <S.StepNum>STEP 01. </S.StepNum>
            {POST_FORM01.item01}
          </label>
          <Textarea
            cols="30"
            rows="5"
            wrap="hard"
            value={item01}
            name="item01"
            onChange={onChangeItem01Handler}
          ></Textarea>
        </S.FormRow>
        <S.FormRow>
          <label>
            <S.StepNum>STEP 02. </S.StepNum>
            {POST_FORM01.item02}
          </label>
          <S.FormCheckList>
            {POST_FORM01_ITEM02_OPTIONS.map(({ title, desc }, i) => {
              return (
                <li key={'item02Item' + i}>
                  테스트
                  <label>
                    <input
                      type="checkbox"
                      checked={item02CheckList?.includes(title)}
                      onChange={(e) => onChangeItem02CheckHandler(e, title)}
                      value={title}
                    />
                    <strong>{title}</strong>
                    <span>{desc}</span>
                  </label>
                </li>
              );
            })}
          </S.FormCheckList>
        </S.FormRow>
        <S.FormRow>
          <label>
            <S.StepNum>STEP 03. </S.StepNum>
            {POST_FORM01.item03}
          </label>
          <Textarea
            cols="30"
            rows="5"
            wrap="hard"
            value={item03}
            name="item03"
            onChange={onChangeItem03Handler}
          ></Textarea>
        </S.FormRow>
        <S.FormRow>
          <label>
            <S.StepNum>STEP 04. </S.StepNum>
            {POST_FORM01.item04}
          </label>
          <Textarea
            cols="30"
            rows="5"
            wrap="hard"
            value={item04}
            name="item04"
            onChange={onChangeItem04Handler}
          ></Textarea>
        </S.FormRow>
        <S.FormRow>
          <label>
            <S.StepNum>STEP 05. </S.StepNum>
            {POST_FORM01.item05}
          </label>
          <Textarea
            cols="30"
            rows="5"
            wrap="hard"
            value={item05}
            name="item05"
            onChange={onChangeItem05Handler}
          ></Textarea>
        </S.FormRow>
        <ButtonBox>
          <Button $size="lg">확인</Button>
          <Button
            $variant="secondary"
            $size="lg"
            onClick={(event) => {
              event.preventDefault();
              navigate(-1);
            }}
          >
            취소
          </Button>
        </ButtonBox>
      </form>
    </S.FormBox>
  );
};

export default EditForm;
