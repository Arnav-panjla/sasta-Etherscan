import React from 'react'
import "./Counter.css"

interface Props {
    title: string,
    count: number
}

const Counter = ({title,count}:Props) => {
  return (
    <div className='counter-container'>
      <span className='counter-heading'>{title}</span>
      <br/>
      <h2>{count.toLocaleString()}</h2>
    </div>
  )
}

export default Counter