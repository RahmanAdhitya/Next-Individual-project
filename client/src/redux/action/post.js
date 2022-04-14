import api from '../../lib/api';
// import { post_types } from '../types';

export const fetchContent = async (routes = '') => {
  try {
    const res = await api.get('/posts');
    return res.data.result;
    // console.log(postList);
    //   const res = await api.get('/posts', {
    //     params: {
    //       _expand: 'user',
    //     },
    //   });
    // kalo mau like bikin like dislike di tablenya pake boolean
    // res.data.result kalo mau ambil data dari backend

    // dispatch({
    //   type: post_types.FETCH_POST,
    //   payload: postList,
    // });
  } catch (err) {
    console.log(err);
    // err.response.data.message kalo mo nerima message error dari backend
    // pake network message wrapper gitu trs interceptor masuk ke situ
  }
};
