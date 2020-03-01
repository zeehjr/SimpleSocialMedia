import React from 'react'

const Post = ({ data: { author, date, content } }) => {
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
  return (
    <div className='flex flex-col bg-white shadow mt-4'>
      <header className='flex p-4 border-b border-gray-200'>
        <h4 className='text-sm text-gray-700'>{author.name}</h4>
        <h5 className='ml-auto text-sm text-gray-500'>{formattedDate}</h5>
      </header>
      <main className='p-4'>
        <p>{content}</p>
      </main>
      <footer className='flex border-t border-gray-200'>
        <button className='py-2 px-4 rounded-lb text-indigo-700 font-semibold hover:bg-indigo-600 hover:text-white focus:bg-indigo-600 focus:text-white focus:outline-none'>
          Like
        </button>
        <button className='py-2 px-4 rounded text-indigo-700 font-semibold'>
          Comment
        </button>
        <h5 className='py-2 ml-auto text-gray-500 font-semibold'>55 likes</h5>
        <h5 className='py-2 ml-4 text-gray-500 font-semibold mr-4'>
          12 comments
        </h5>
      </footer>
    </div>
  )
}

export default Post
