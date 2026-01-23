import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { ref, get, set } from "firebase/database";
import { auth, provider, db } from "../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (authData?.isLoggedIn) {
      navigate(authData.role === "admin" ? "/admin" : "/");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "admin123") {
      saveAuthAndRedirect("admin", email);
    } else if (email === "user@gmail.com" && password === "user123") {
      saveAuthAndRedirect("user", email);
    } else {
      alert("Invalid credentials");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = ref(db, "users/" + user.uid);
      const snapshot = await get(userRef);

      let role = "user"; 

      if (snapshot.exists()) {
        role = snapshot.val().role || "user";
      } else {
        await set(userRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          role: "user",
          lastLogin: new Date().toISOString()
        });
      }

      saveAuthAndRedirect(role, user.email);
    } catch (error) {
      console.error(error);
      alert("Google login failed");
    }
  };

  const saveAuthAndRedirect = (role, email) => {
    localStorage.setItem(
      "auth",
      JSON.stringify({
        isLoggedIn: true,
        role,
        email
      })
    );

    navigate(role === "admin" ? "/admin" : "/");
  };

  return (
    <div className="container my-5" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-4">Login</h3>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-primary w-100 mb-3">
          Login
        </button>
      </form>

      <button
        className="btn btn-outline-danger w-100"
        onClick={handleGoogleLogin}
        style={{ borderRadius: "30px" }}
      >
        Continue with Google
      </button>
    </div>
  );
}

export default Login;