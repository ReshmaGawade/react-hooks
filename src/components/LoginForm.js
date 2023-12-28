import React, {useState} from "react";
import { TextField, FormControl, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"
 
const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setEmailError(false)
        setPasswordError(false)
        if (email === '') {
            setEmailError(true)
        }
        if (password === '') {
            setPasswordError(true)
        }
        console.log(email, password)
        if (email && password) {
          //This way to access history for React Router v5 and below
          //this.props.history.push("/dashboard");
          // For React Router v6
          navigate('/dashboard');
        }
    }
     
    return ( 
        <React.Fragment>
          <h2>Welcome to contact manager application login</h2>
        <form autoComplete="off" onSubmit={handleSubmit}>
            <h2>Login Form</h2>
                <TextField label="Email" onChange={e => setEmail(e.target.value)} required variant="outlined" 
                    color="secondary" type="email" sx={{mb: 3}} fullWidth value={email} error={emailError}/>

                 <TextField label="Password" onChange={e => setPassword(e.target.value)} required variant="outlined"
                    color="secondary" type="password" value={password} error={passwordError} fullWidth sx={{mb: 3}}/>

                 <Button variant="outlined" color="secondary" type="submit">Login</Button>            
        </form>
        <medium>Need an account? <Link to="/register">Register here</Link></medium>
        </React.Fragment>
     );
}
 
export default LoginForm;
