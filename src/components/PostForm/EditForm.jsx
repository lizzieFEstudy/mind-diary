import { useAuthUser } from '@react-query-firebase/auth';
import { updatePost, getDetail } from 'api/posts';
import { auth } from 'config/firebase';
import { POST_FORM01, POST_FORM01_ITEM02_OPTIONS } from 'constants/postForm';
import useCheckbox from 'hooks/useCheckbox';
import useInput from 'hooks/useInput';
import { async } from 'q';
import React, { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router';

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
      </div>
      <button>확인</button>
    </form>
  );
};

export default EditForm;
