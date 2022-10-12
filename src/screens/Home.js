import React, {useState, useEffect} from 'react'
import PostForm from '../components/PostForm';
import {srvUsers, srvDelete} from '../api/ApiService';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(5);
  const [editingPost, setEditingPost] = useState({ title: '', body: '' });

  const getUsers = async () => {
    const data = await srvUsers();
    setPosts(data);
  }

  const deteleId = async (id) => {
    await srvDelete(id);
    const updatePosts = posts.filter((p) => p.id !== id);
    setPosts(updatePosts);
  }

  const addPost = (post) => {
    if (posts.find((p) => p.id === post.id)) {
      const index = posts.findIndex((p) => p.id === post.id);
      const postsUpdated = [...posts];
      postsUpdated.splice(index, 1, post);
      setPosts(postsUpdated);
    } else {
      const postsUpdated = [post, ...posts];
      setPosts(postsUpdated);
    }
  }

  const editPost = (post) => setEditingPost(post);

  const getNumberOfPosts = async () => {
    const resp = await srvUsers();
    const data = resp.slice(0, limit);
    setPosts(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <div className='row'>
        <div className="col s6">
          <PostForm addPost={addPost} editingPost={editingPost} />
        </div>
        <div className="col s3 push-in">
          <p>Limitar número de publicaciones</p>
          <input
            type="number"
            value={limit}
            onChange={(event) => setLimit(event.target.value)}
          />
          <button
            onClick={getNumberOfPosts}
            className="blue lighten-3 btn"
          >
            Establecer
          </button>
        </div>
      </div>
      <div className='row'>
        {posts.map((post) => (
          <div key={post.id} className='col s6'>
            <div className='card'>
              <div className='card-content'>
                <div className='card-title'>
                  {post.title}
                </div>
                <p className='card-body'>
                  {post.body}
                </p>
              </div>
              <div className='card-action'>
                <button className='btn orange lighten-3 mr' onClick={() => editPost(post)}>Editar</button>
                <button className='btn red accent-2' onClick={() => deteleId(post.id)}>Eliminar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home