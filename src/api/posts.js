import axios from 'axios';

// 조회
const getPosts = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts`);

  return response.data;
};

// 상세페이지
const getDetail = async (id) => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts/${id}`);

  return response.data;
};

// 추가
const addPost = async (newPost) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/posts`, newPost);
};

// 수정
const editPost = async ([id, newPost]) => {
  console.log('api 테스트 ➡️=> ', id, newPost);
  await axios.patch(`${process.env.REACT_APP_SERVER_URL}/posts/b71f0531-a438-a6de-526e-3e16f6710538`, newPost);
};

// 삭제
const delPost = async (id) => {
  await axios.delete(`${process.env.REACT_APP_SERVER_URL}/posts/b71f0531-a438-a6de-526e-3e16f6710538`);
};

export { getPosts, getDetail, addPost, editPost, delPost };
