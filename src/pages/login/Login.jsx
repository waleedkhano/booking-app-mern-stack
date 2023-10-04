import { useContext, useState } from "react";
import "./login.css";
import {AuthContext} from "../../context/authContext"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: "", 
        password: ""
    })

    const {loading, error, dispatch} = useContext(AuthContext);

    const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
        const res = await axios.post("http://localhost:5000/auth/login", credentials);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/");
    } catch (err) {
        dispatch({ type: "LOGIN_FAIL", payload: err.response.data });
    }
};

  

    return(
        <>
        <div className="login">
      <div className="lContainer">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        <span><Link to="/register">Create account</Link></span>
        <div className="error">
        {error && <p>{error.message}</p>}
        </div>
     </div>
    </div>
  
        </>
    )
}

export default Login;