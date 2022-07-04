import React, { useState } from 'react';
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

  }
  return (
    <QuillWrapper
      theme='snow'
      className='editor'
      onChange={handleChaneg}
    />
  )
}
