import { useAuthUser } from '@react-query-firebase/auth';
import { addPost } from 'api/posts';
import { Textarea } from 'components/common/Input';
import { auth } from 'config/firebase';
import { POST_FORM01, POST_FORM01_ITEM02_OPTIONS } from 'constants/postForm';
import useCheckbox from 'hooks/useCheckbox';
import useInput from 'hooks/useInput';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';
import * as S from './WriteForm.styled';
import { Button, ButtonBox } from 'components/common/Button';

const WriteForm = () => {
  const navigate = useNavigate();

  const user = useAuthUser('user', auth);

  const [item01, onChangeItem01Handler] = useInput();
  const [item02CheckList, onChangeItem02CheckHandler] = useCheckbox();
  const [item03, onChangeItem03Handler] = useInput();
  const [item04, onChangeItem04Handler] = useInput();
  const [item05, onChangeItem05Handler] = useInput();

  const queryClient = useQueryClient();
  const mutation = useMutation(addPost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    }
  });

  const handleSubmitButtonClick = (event) => {
    event.preventDefault();

    let date = new Date();
    date = date.toLocaleDateString();

    const newPost = {
      type: 'form01',
      regdate: date,
      writer: user.data.uid,
      content: {
        item01,
        item02: item02CheckList,
        item03,
        item04,
        item05
      }
    };

    mutation.mutate(newPost);

    navigate('/');
  };

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
                  <label>
                    <input
                      type="checkbox"
                      checked={item02CheckList.includes(title)}
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
          {/* <div>
      <label>
        <input type="radio" name="item05Rad" /> 전보다는 나아요
      </label>
      <label>
        <input type="radio" name="item05Rad" /> 비슷한 것 같아요
      </label>
      <label>
        <input type="radio" name="item05Rad" /> 전보다 더 안 좋아졌어요
      </label>
    </div> */}
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

export default WriteForm;
