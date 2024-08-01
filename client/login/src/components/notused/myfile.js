import React,{useContext} from 'react'
import Themecontext from './themecontext'
import themecontext from './themecontext'

function Myfile() {
    const theme=useContext(themecontext)
  return (
    <div>
      <button style={{background:theme==="dark"?"black":"white",  color:theme==="dark"?"white":"black"}}>{theme==="dark"?"Dark":"Light"}theme</button>
    </div>
  )
}

export default Myfile
