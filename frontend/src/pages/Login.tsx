import {
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const firebaseToken = await user.getIdToken();
      console.log("firebase Token : ", firebaseToken);

      const response = await fetch("http://localhost:3000/api/auth/firebase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firebaseToken }),
      });
      const data = await response.json();
      console.log("backend response:", data);
      localStorage.setItem("token", data.token);
      navigate("/notes");
    } catch (error) {
      console.log("login error", error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded shadow"
        onClick={handleGoogleLogin}
      >
        Sign in with google
      </button>
    </div>
  );
};

export default Login;
