import { useAuthContext } from '../components/AuthContext';
import React, { useState, useEffect } from 'react';
import { createPost, getDataFromDoc, commentPost } from '../firebase-config';

const Dashboard = () => {
  const AuthContext = useAuthContext();
  const { user, setUser } = AuthContext;

  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [comment, setComment] = useState({
    [`value:${1}`]: '',
  });
  const [commentSubmit, setCommentSubmit] = useState(false);

  const [post, setPost] = useState('');
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    setLoading(true);
    const postsss = await getDataFromDoc('posts');
    console.log('postsss: ', postsss);
    setPosts(postsss);
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handlePost = async () => {
    setLoadingSubmit(true);
    if (post) {
      const createRes = await createPost(user?.displayName, post);
      if (createRes) setPost('');
      getPosts();
    }
    setLoadingSubmit(false);
  };

  const handleComment = async (postId) => {
    setCommentSubmit(true);
    if (comment) {
      const commentRes = await commentPost(
        user?.displayName,
        comment[`value:${postId}`],
        postId
      );
      if (commentRes)
        setComment({
          [`value:${1}`]: '',
        });
      getPosts();
    }
    setCommentSubmit(false);
  };

  console.log('comment: ', comment);

  return (
    <>
      dashboard
      <br />
      email: {user?.email}
      <br />
      name: {user?.displayName || '-'}
      <div style={{ marginTop: 1 }}>
        <p style={{ marginButtom: 1 }}>post some shit: </p>
        <textarea
          value={post}
          onChange={(e) => setPost(e.target.value)}
          id="post"
          name="post"
          rows="4"
          cols="50"
        />
        <br />
        <button
          disabled={loadingSubmit}
          style={{ marginTop: '8px' }}
          onClick={() => handlePost()}
        >
          {loadingSubmit ? 'loading...' : 'post!'}
        </button>
      </div>
      <h1>Feed: </h1>
      {loading && (
        <div
          style={{
            width: '100%',
            display: 'flex',
            // alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h1>loading...</h1>
        </div>
      )}
      {posts.length > 0 && (
        <div>
          {posts.map((item, index) => (
            <div key={item?.postId}>
              {index !== 0 && <hr />}
              <div style={{ border: '1px solid', padding: '8px' }}>
                {item?.post}
                <br />
                <br />
                <small>post by : {item?.postOwner}</small>
                <br />
                <small>time: {item?.timestamp}</small>
                <div style={{ marginTop: '8px' }}>
                  comments:
                  <br />
                  <textarea
                    name={`comment/${item?.postId}`}
                    type="text"
                    rows="2"
                    cols="40"
                    value={comment?.[`value:${item?.postId}`]?.value}
                    onChange={(e) => {
                      console.log('item?.postId', item?.postId);
                      setComment((prev) => ({
                        ...prev,
                        [`value:${item?.postId}`]: e.target.value,
                      }));
                    }}
                  />
                  <br />
                  <button
                    disabled={commentSubmit}
                    style={{ marginTop: '8px' }}
                    onClick={() => handleComment(item?.postId)}
                  >
                    {commentSubmit ? 'loading...' : 'post'}
                  </button>
                  {item?.comments?.length > 0 && (
                    <>
                      {item?.comments.map((comment, index) => (
                        <div
                          key={index}
                        >{`${comment?.commentedBy}: ${comment?.comment}`}</div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Dashboard;
