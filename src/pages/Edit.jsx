import { useAuthUser } from '@react-query-firebase/auth';
import { addPost, editPost, getDetail } from 'api/posts';
import { auth } from 'config/firebase';
import { POST_FORM01, POST_FORM01_ITEM02 } from 'constants/postForm';
import useCheckbox from 'hooks/useCheckbox';
import useInput from 'hooks/useInput';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router';
import uuid from 'react-uuid';

const Write = () => {
  const navigate = useNavigate();

  //   const [editData, setEditData] = useState();

  const param = useParams();
  console.log('수정페이지 param => ', param);
  const { isLoading, isError, data } = useQuery('posts', () => getDetail(param.id));

  //   set;
  //   setEditData(useQuery('posts', getDetail(param.id).data));
  console.log('수정페이지 data=> ', data);

  const [item01, onChangeItem01Handler, setItem01] = useInput();
  const [item02CheckList, onChangeItem02CheckHandler, setItem02CheckList] = useCheckbox();
  const [item03, onChangeItem03Handler, setItem03] = useInput();
  const [item04, onChangeItem04Handler, setItem04] = useInput();
  const [item05, onChangeItem05Handler, setItem05] = useInput();

  useEffect(() => {
    setItem01(data?.item01);
    setItem02CheckList(data?.item02);
    setItem03(data?.item03);
    setItem04(data?.item04);
    setItem05(data?.item05);
  }, [data]);

  const queryClient = useQueryClient();

  const mutation = useMutation(editPost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    }
  });

  const authUser = useAuthUser('user', auth);

  const handleSubmitButtonClick = (event) => {
    event.preventDefault();

    let date = new Date();
    date = date.toLocaleDateString();

    const editPost = {
      item01,
      item02: item02CheckList,
      item03,
      item04,
      item05
    };
    console.log('editPost ➡️ ➡️', editPost);
    console.log('data.id ➡️ ➡️', data.id);

    mutation.mutate([param.id, editPost]);
  };

  if (isLoading) {
    return <h1>로딩중입니다....!</h1>;
  }

  if (isError) {
    return <h1>오류가 발생하였습니다..!</h1>;
  }

  if (!data) {
    return;
  }

  return (
    <>
      <div>수정페이지</div>
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
