import React from 'react'
import Layout from './layout/layout'
import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
// import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import axios from "axios";
// import { useAuth } from './context/auth';
import {toast} from "react-toastify"
// import Layout from "./layout/layout";
// import { useAuth } from "./context/auth";

function Forgot() {
    // const [auth,setauth]=useAuth()
    const [email, setemail] = useState("")
    const [newpassword, setnewpassword] = useState("")
    const [question, setquestion] = useState("");
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
          const res=await axios.post(
            `http://localhost:3002/api/route/auth/forgot`,{email,newpassword,question,});
          if(res && res.data.success){
            toast.success(res.data && res.data.message);
            navigate("/login")
          }else{
            toast.error(res.data.message)
          }
        }
        catch(error){
          console.log(error)
          toast.error("something went wrong")
        }
      };
  return (
    <Layout title="forgotpassword">
      <div className="container-fluid">
            <div className="row justify-content-center align-items-center" style={{ minHeight: "5vh" }}>
                <div className="col-md-3  pb-5 ">
                    <Card className="pl-2 mt-4">
                        <Card.Body>
                            <h1 className="text-center mb-4"> Reset Password</h1>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <div className="input-group">
                                        <span className="input-group-text"><EmailIcon/></span>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            name="email"
                                            value={email}
                                            onChange={(e)=>setemail(e.target.value)}
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <div className="input-group">
                                        <span className="input-group-text"><KeyIcon/></span>
                                        <Form.Control
                                            type="password"
                                            placeholder="NewPassword"
                                            name="newpassword"
                                            value={newpassword}
                                            onChange={(e)=>setnewpassword(e.target.value)}
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>question</Form.Label>
                                    <div className="input-group">
                                        <span className="input-group-text"><KeyIcon/></span>
                                        <Form.Control
                                            type="text"
                                            placeholder="question"
                                            name="question"
                                            value={question}
                                            onChange={(e)=>setquestion(e.target.value)}
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Remember me" />
                                </Form.Group>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="btn btn-success mt-3 w-100"
                                    // disabled={!verified}
                                >
                                    Reset password
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Forgot
