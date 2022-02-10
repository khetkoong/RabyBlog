import { useAuthContext } from '../components/AuthContext';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { createPost, getDataFromDoc } from '../firebase-config';

const Dashboard = () => {
  const AuthContext = useAuthContext();
  const { user, setUser } = AuthContext;
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [post, setPost] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    setLoading(true);
    const postsss = await getDataFromDoc('posts');
    setPosts(postsss);
    setLoading(false);
  };

  const handlePost = async () => {
    setLoadingSubmit(true);
    if (post) {
      const createRes = await createPost(user?.displayName, post);
      if (createRes) setPost('');
      getPosts();
    }
    setLoadingSubmit(false);
  };
  console.log('posts ', posts);

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
            <>
              {index !== 0 && <hr />}
              <div
                key={item?.postId}
                style={{ border: '1px solid', padding: '8px' }}
              >
                {item?.post}
                <br />
                <br />
                <small>post by : {item?.postOwner}</small>
                <br />
                <small>time: {item?.timestamp}</small>
              </div>
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default Dashboard;
