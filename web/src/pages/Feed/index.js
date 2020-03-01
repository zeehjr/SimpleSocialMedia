import React from 'react'
import CreatePost from './CreatePost'
import Posts from './Posts'

const Feed = () => {
  return (
    <div className='w-full min-h-screen bg-indigo-700'>
      <div className='flex flex-col container mx-auto'>
        <CreatePost />
        <Posts />
      </div>
    </div>
  )
}

export default Feed
