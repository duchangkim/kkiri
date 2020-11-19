import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readPost, unloadPost } from '../../modules/post';
import PostViewer from '../../components/setup/PostViewer';
import PostActionButtons from '../../components/setup/PostActionButtons';
import { removePost } from '../../lib/api/setUp';

const MemberDeleteContainer = ({ match, history }) => {
  const { email } = match.params;
  const dispatch = useDispatch();
  const { post, error, loading } = useSelector(({ post, loading }) => ({
    post: post.post,
    error: post.error,
    loading: loading['post/READ_POST'],
  }));

  useEffect(() => {
    dispatch(readPost(email));
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, email]);

  const onRemove = async () => {
    try {
      await removePost(email);
      history.push('/'); // 홈으로 이동
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <PostViewer
      post={post}
      loading={loading}
      error={error}
      actionButtons={<PostActionButtons onRemove={onRemove} />}
    />
  );
};

export default withRouter(MemberDeleteContainer);
