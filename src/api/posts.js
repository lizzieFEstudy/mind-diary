import axios from 'axios';

// 조회
const getPosts = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts?_sort=regdate&_order=desc`);

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
const updatePost = async ([id, newPost]) => {
  const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/posts/${id}`, newPost);
  console.log('response ➡️=> ', response);
};

// 삭제
const delPost = async (id) => {
  await axios.delete(`${process.env.REACT_APP_SERVER_URL}/posts/${id}`);
};

export { getPosts, getDetail, addPost, updatePost, delPost };
