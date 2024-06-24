import React from 'react'

export default function HighlightText(props) {
  return (
    <span className=' bg-clip-text text-transparent font-bold bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]'>{ props.text}</span>
  )
}
