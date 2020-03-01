import React from 'react'
import Post from './Post'

const mock = [
  {
    id: 1,
    author: {
      name: 'José'
    },
    date: new Date(),
    content: 'Olá, hoje hablaremos de macaquitos'
  },
  {
    id: 2,
    author: {
      name: 'Tiago'
    },
    date: new Date(),
    content: 'Apenas um post de teste'
  },
  {
    id: 3,
    author: {
      name: 'Simaria'
    },
    date: new Date(),
    content: 'Um post sobre "música"'
  }
]

const Posts = () => {
  return (
    <div className='flex flex-col'>
      <div>
        {mock.map(post => (
          <Post key={post.id} data={post} />
        ))}
      </div>
    </div>
  )
}

export default Posts
