import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';


const QuillWrapper = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

export default function Test() {
  const [state, setState] = useState("")
  const handleChaneg = (e) => {
    setState(e);
    console.log(state)

  }
  return (
    <QuillWrapper
      theme='snow'
      className='editor'
      value={state}
      onChange={handleChaneg}
    />
  )
}
