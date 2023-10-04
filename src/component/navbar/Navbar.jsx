import { Link } from "react-router-dom";
import Header from "./header/Header";
import "./navbar.css";

const Navbar = (props) => {
    return(
        <>
        
        <div className={props.type === "list" ? "bg-img listImg": "bg-img"}></div>
        <div className={props.type === "list" ? "navbarContainer listImg": "navbarContainer"}>
            <div className="navbar">
               <div className="logo"><Link to="/"> Booking<span>App</span></Link></div>
                <div className="navButton">
                    <button>Login</button>
                    <button>Signin</button>
                </div>
            </div>
            
            {
  (props.type === "list" ? (
    <h1>Select your favourite Place! </h1>
  ) : (
    <h1>Are you ready to travel?</h1>
  ))
}

            
            <Header type={props.type} />
        </div>
        </>
    )
}

export default Navbar;