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

export { getPosts, getDetail, addPost };
