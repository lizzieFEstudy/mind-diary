import { addPost } from 'api/posts';
import { POST_FORM01, POST_FORM01_ITEM02 } from 'constants/postForm';
import useCheckbox from 'hooks/useCheckbox';
import useInput from 'hooks/useInput';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import uuid from 'react-uuid';

const Write = () => {
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

    const newPost = {
      id: uuid(),
      type: 'form01',
      item01: item01,
      item02: item02CheckList,
      item03: item03,
      item04: item04,
      item05: item05
    };
    console.log('newPost', newPost);

    mutation.mutate(newPost);
  };

  return (
    <>
      <div>Write</div>
      <form onSubmit={handleSubmitButtonClick}>
        <div>
          <label>{POST_FORM01.item01}</label>
          <textarea
            cols="30"
            rows="5"
            wrap="hard"
            value={item01}
            name="item01"
            onChange={onChangeItem01Handler}
          ></textarea>
        </div>
        <div>
          <label>{POST_FORM01.item02}</label>
          <ul>
            {POST_FORM01_ITEM02.map(({ title, desc }, i) => {
              return (
                <li key={'item02Item' + i}>
                  테스트
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
          </ul>
        </div>
        <div>
          <label>{POST_FORM01.item03}</label>
          <textarea
            cols="30"
            rows="5"
            wrap="hard"
            value={item03}
            name="item03"
            onChange={onChangeItem03Handler}
          ></textarea>
        </div>
        <div>
          <label>{POST_FORM01.item04}</label>
          <textarea
            cols="30"
            rows="5"
            wrap="hard"
            value={item04}
            name="item04"
            onChange={onChangeItem04Handler}
          ></textarea>
        </div>
        <div>
          <label>{POST_FORM01.item05}</label>
          <textarea
            cols="30"
            rows="5"
            wrap="hard"
            value={item05}
            name="item05"
            onChange={onChangeItem05Handler}
          ></textarea>
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
        </div>
        <button>확인</button>
      </form>
    </>
  );
};

export default Write;
