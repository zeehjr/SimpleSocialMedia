import React from 'react'

const CreatePost = () => {
  return (
    <div className='flex flex-col bg-white mt-4'>
      <header className='px-4 py-4 border-b'>
        <h5 className='font-semibold text-gray-800'>Create Post</h5>
      </header>
      <textarea
        className='p-4 bg-gray-200 hover:bg-white focus:bg-white'
        rows={3}
        placeholder='Tell your friends what are you thinking...'
      />
      <footer className='border-t'>
        <button className='text-indigo-700 border-indigo-700 hover:bg-indigo-600 hover:text-white m-2 font-semibold px-4 py-2 mr-auto'>
          Publish
        </button>
      </footer>
    </div>
  )
}

export default CreatePost
