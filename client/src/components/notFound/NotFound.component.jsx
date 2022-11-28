import React from 'react'

const NotFound = () => {

  const styles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
    fontWeight: 400,
    height: 'calc(90vh - 100px)'
  }

  return (
    <div style={styles}>
      404 | Not Found
    </div>
  )
}

export default NotFound