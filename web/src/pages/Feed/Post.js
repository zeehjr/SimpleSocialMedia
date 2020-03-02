import React from 'react'
import useApi from '../../hooks/useApi'

const LikeButton = ({ liked, onClick }) => (
  <button
    onClick={onClick}
    className={
      'py-2 px-4 font-semibold hover:bg-indigo-600 hover:text-white focus:outline-none ' +
      (liked ? 'bg-indigo-600 text-white' : 'text-indigo-700')
    }
  >
    {liked ? 'Liked' : 'Like'}
  </button>
)

const Post = ({ data, setPost }) => {
  const {
    id,
    author,
    pub_date: pubDate,
    content,
    likes,
    comments,
    liked
  } = data
  const { api } = useApi()
  const handleToggleLike = () => {
    if (!liked) {
      api.post(`/v1/posts/${id}/likes/`).then(res => {
        if (res.status === 201) {
          setPost({ ...data, liked: true })
        }
      })
    } else {
      api.post(`/v1/posts/${id}/likes/unlike/`).then(res => {
        if (res.status === 200) {
          setPost({ ...data, liked: false })
        }
      })
    }
  }

  const date = new Date(pubDate)
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
  return (
    <div className='flex flex-col bg-white shadow mt-4'>
      <header className='flex p-4 border-b border-gray-200'>
        <h4 className='text-sm text-gray-700'>{author.username}</h4>
        <h5 className='ml-auto text-sm text-gray-500'>{formattedDate}</h5>
      </header>
      <main className='p-4'>
        <p>{content}</p>
      </main>
      <footer className='flex border-t border-gray-200'>
        <LikeButton liked={liked} onClick={handleToggleLike} />
        <button className='py-2 px-4 rounded text-indigo-700 font-semibold'>
          Comment
        </button>
        <h5 className='py-2 ml-auto text-gray-500 font-semibold'>
          {likes} likes
        </h5>
        <h5 className='py-2 ml-4 text-gray-500 font-semibold mr-4'>
          {comments} comments
        </h5>
      </footer>
    </div>
  )
}

export default Post
