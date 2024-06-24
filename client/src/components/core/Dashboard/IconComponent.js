import React from 'react'
import * as Icons from "react-icons/vsc";
export const IconComponent = ({name}) => {
    const IconComponents = Icons[name];
  return (
    <IconComponents/>
  )
}
