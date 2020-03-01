import React from 'react'

const Loading = () => {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
      }}
    >
      <div style={{ margin: 'auto' }}>Carregando...</div>
    </div>
  )
}

export default Loading
