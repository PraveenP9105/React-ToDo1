import { signInWithPopup } from "firebase/auth";
import {set, ref} from "firebase/database";
import {auth, provider, db} from "../firebase";

function Home() {
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            await set(ref(db, "users/" + user.uid), {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
                lastLogin: new Date().toISOString()
            });
            alert("User logged in successfully!");
        }
        catch(error) {
            console.error(error);
            alert("Login failed!");
        }
    };
    return(
        <div style={{textAlign:"center", marginTop:"50px"}}>
            <button onClick={handleGoogleLogin}
                style={{
                    padding: "10px 20px",
                    fontSize:"16px",
                    cursor:"pointer",
                    borderRadius: "30px"
                }}>Continue with Google</button>
        </div>
    )
}
export default Home;