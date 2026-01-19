import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";

const USERS = [
    {email: "admin@gmail.com", password: "admin123", role: "admin"},
    {email: "user@gmail.com", password: "user123", role: "user"}
];

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem("auth"));
        if(auth?.isLoggedIn){
            navigate(auth.role === "admin" ? "/admin" : "/");
        }
    }, []);
    
    const handleLogin =(e) => {
        e.preventDefault();
        const foundUser = USERS.find(
            u => u.email === email && u.password === password
        );
        if(!foundUser){
            alert("Invalid credentials");
            return;
        }
        localStorage.setItem("auth", JSON.stringify({
            isLoggedIn: true,
            role: foundUser.role,
            email: foundUser.email
        }));
        navigate(foundUser.role === "admin" ? "/admin" : "/");
    };
    return(
        <div className="container my-5" style={{maxWidth:"400px"}}>
            <h3 className="text-center mb-4">Login</h3>
            <form onSubmit={handleLogin}>
                <input type="email" className="form-control mb-3" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />

                <input type="password" className="form-control mb-3" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />

                <button className="btn btn-primary w-100">Login</button>
            </form>
        </div>
    )
}

export default Login;