import React from 'react'
// import Header from './header'
import Footer from './footer'
import Header1 from './header1'
import {Helmet} from "react-helmet"
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
function Layout({children,title,description,keywords,author}) {
  return (
    <div>
      <Helmet>
      <meta charSet='utf-8'/>
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords} />
  <meta name="author" content={author} />
<title>{title}</title>

         </Helmet>
      <Header1 />
      <br></br>
      <main style={{minHeight:"68.7vh"}}>
      {/* <h5>hello this is layout page indication</h5> */}
      <ToastContainer/>
      {children}
      </main >
      <Footer/>
     
    </div>
  )
}

export default Layout
