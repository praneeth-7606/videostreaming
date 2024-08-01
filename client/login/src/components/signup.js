// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import axios from "axios";
// import {toast} from "react-toastify"
import toast from "react-hot-toast"
import Layout from "./layout/layout";

function Signup() {
    // const [data, setData] = useState({ email: "", password: "" });
    const [email, setemail] = useState("")
    const [name, setname] = useState("")
    const [role, setrole] = useState("")
    const [password, setpassword] = useState("")
    const [question, setquestion] = useState("")
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // const handleChange = (e) => {
    //     setData({ ...data, [e.target.name]: e.target.value });
    //     setError(null); 
    // };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        const res=await axios.post(
          `http://localhost:3002/api/route/auth/register`,{name,email,password,role,question});
        if(res && res.data.success){
          toast.success(res.data && res.data.message);
          await Promise.resolve();
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
    console.log("http://localhost:3002/api/route/auth/register")

    

    return (
      <Layout title="signupform" >
        <div className="container-fluid">
            <div className=" row justify-content-center align-items-center" style={{ minHeight: "5vh" }}>
                <div className="col-md-3  pb-5 ">
                    <Card className=" pl-2 mt-4  ">
                        <Card.Body>
                            <h1 className="text-center mb-3">Welcome To Signup Page</h1>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <div className="input-group">
                                        <span className="input-group-text"><EmailIcon/></span>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            name="email"
                                            required
                                            value={email}
                                            onChange={(e)=>setemail(e.target.value)}
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <div className="input-group">
                                        <span className="input-group-text"><KeyIcon/></span>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            value={password}
                                            required
                                            onChange={(e)=>setpassword(e.target.value)}
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="formBasicName">
                                    <Form.Label>Name</Form.Label>
                                    <div className="input-group">
                                        <span className="input-group-text"><KeyIcon/></span>
                                        <Form.Control
                                            type="text"
                                            placeholder="Name"
                                            name="name"
                                            required
                                            value={name}
                                            onChange={(e)=>setname(e.target.value)}
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="formBasicRole">
                                    <Form.Label>Role</Form.Label>
                                    <div className="input-group">
                                        <span className="input-group-text"><KeyIcon/></span>
                                        <Form.Control
                                            type="number"
                                            placeholder="role"
                                            name="role"
                                            value={role}
                                            required
                                            onChange={(e)=>setrole(e.target.value)}
                                        />
                                    </div>
                                    </Form.Group>
                                    <Form.Group className="mb-2" controlId="formBasicName">
                                    <Form.Label>Your Question</Form.Label>
                                    <div className="input-group">
                                        <span className="input-group-text"><KeyIcon/></span>
                                        <Form.Control
                                            type="text"
                                            placeholder="what is your  favorite  sports "
                                            name="question"
                                            required
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
                                    className="btn btn-primary w-100" 
                                >
                                    Submit
                                </Button>
                                <div className="text-center pt-2">
                               <p>Already have an account <a   style={{textDecoration:"none"}}href="/login">login</a> here</p> 
                                </div>
                                
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
        </Layout>
    );
}

export default Signup;
