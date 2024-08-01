
// import HomeIcon from '@mui/icons-material/Home';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
// import { red } from '@mui/material/colors';
import ChatIcon from '@mui/icons-material/Chat';
import toast from "react-hot-toast";
import { DropdownButton,Dropdown } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
// import Searchinput from '../form/searchinput';
// import useCategory from '../hooks/usecategory';
// import { useCart } from "../../context/cart1.js";
// import { useCart } from '../context/cart1';
import { Badge } from "antd";
function Header1() {
  const {auth,setAuth,userId}=useAuth()
//   const [cart] = useCart();
//   const categories = useCategory();
  const navigate = useNavigate();

  const handlelogout=()=>{
    setAuth({
      ...auth,user:null,token:""
    })
    localStorage.removeItem("auth")
    toast.success("logout sucessfully ")
    navigate("/login")
  }

  return (
    <>
      <Navbar bg="dark"   data-bs-theme="dark">
        <Container>
            <div className='logo'>
        < ChatIcon style={{size:"large",paddingBottom:"1%",backgroundColor:"white"}} />
          <Navbar.Brand  style={{marginLeft:"10px"}}href="/">Live video Streaming</Navbar.Brand>
          {/* hi hello */}
          </div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Item className="me-3 d-flex align-items-center">
                
              {/* <Nav.Link href="/" style={{ color: "orange" }}>Home</Nav.Link> */}
              {/* <Searchinput/> */}
                <Nav.Link href="/" style={{ color: "orange" }}>Home</Nav.Link>
              </Nav.Item>
              <Nav className="mr-auto">
  {/* <NavDropdown title="Categories" id="basic-nav-dropdown">
    <NavDropdown.Item href={"/categories"}>All Categories</NavDropdown.Item>
    {categories.map((c, index) => (
      <NavDropdown.Item key={index} href={`/category/${c.slug}`}>
        {c.name}
      </NavDropdown.Item>
    ))}
  </NavDropdown> */}
</Nav>


              {
                !auth.user? (<>
                {/* <Nav.Item className="me-3"> */}
                <Nav.Link href="/login" style={{ color: "orange" }}>Login</Nav.Link>
              {/* </Nav.Item> */}
                <Nav.Item className="me-3">
                <Nav.Link href="/signup" style={{ color: "orange" }}>Sign up</Nav.Link>
              </Nav.Item>
              </>): (<>
  
    <NavDropdown
              id="nav-dropdown-dark-example"
              title={auth?.user?.name}
              style={{color:"green"}}
              menuVariant="primary"
              
            >
              {/* <NavDropdown.Item href={`/dashboard/${auth?.user?.role===1?"admin":"user"}`}>Dashboard</NavDropdown.Item> */}
              <NavDropdown.Item onClick={handlelogout}>
                Logout
              </NavDropdown.Item>
              
            </NavDropdown>

              </>)
              }

              {/* <Nav.Item className="me-3">
              <Badge count={cart?.length} showZero>
                <Nav.Link href="/cart" style={{ color: "orange" }}><strong>Cart</strong></Nav.Link>
                </Badge>
              </Nav.Item>
               */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header1;
