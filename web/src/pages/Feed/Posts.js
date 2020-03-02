import React, { useState, useEffect } from 'react'
import Post from './Post'
import useApi from '../../hooks/useApi'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const { api } = useApi()

  useEffect(() => {
    ;(async () => {
      const res = await api.get('/v1/posts')

      setPosts(res.data)
    })()
  }, [])

  return (
    <div className='flex flex-col'>
      <div>
        {posts.map(post => (
          <Post
            key={post.id}
            data={post}
            setPost={post =>
              setPosts(posts.map(p => (p.id === post.id ? post : p)))}
          />
        ))}
      </div>
    </div>
  )
}

export default Posts
