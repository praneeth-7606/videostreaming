// import { useState,useContext,createContext, useEffect } from "react";
// import axios from "axios";

// const AuthContext=createContext()
// const AuthProvider=({children})=>{
//     const [auth,setauth]=useState(
//         {
//           user:null,
//           token:""  ,
//         }
//     )
//     axios.defaults.headers.common["Authorization"]=auth?.token
//     useEffect(()=>{
//         const data =localStorage.getItem("auth")
//         if(data){
//             const parseData=JSON.parse(data)
//             setauth({
//                 ...auth,
//                 user:parseData.user,
//                 token:parseData.token,

//             })
//         }
//         //eslink-disable-next-line
//     },[])
// return(
//     <AuthContext.Provider value={[auth,setauth]}>
//         {children}
//     </AuthContext.Provider>

// )
// }

// // custom hook
// const  useAuth=()=>useContext(AuthContext)
// export {useAuth,AuthProvider}


import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  axios.defaults.headers.common["Authorization"] = auth?.token;
  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem('auth'));
    if (storedAuth) {
      setAuth(storedAuth);
      axios.defaults.headers.common['Authorization'] = storedAuth.token;
    }
  }, []);
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const userId = auth?.user?._id; // Extract userId if it exists

  return {auth, setAuth, userId}; // Include userId if it exists
};

export { useAuth, AuthProvider };