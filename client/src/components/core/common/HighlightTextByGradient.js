import React from 'react'

export function HighlightTextByGradient({text}) {
  return (
    <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">{text}</span>
  )
}
