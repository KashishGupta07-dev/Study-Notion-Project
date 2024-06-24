import React from 'react'

export default function GradientBall({from="#8A2BE2",via="#FFA500",to="#F8F8FF"}) {
  return (
    <div className={`z-[-1] absolute blur-[34px] w-[350px] h-[280px] opacity-20 -top-10 rounded-full bg-gradient-to-tr from-[${from}] via-[${via}] to-[${to}]`}></div>
  )
}
