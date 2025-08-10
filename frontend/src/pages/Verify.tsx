import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";

const Verify = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      const auth = getAuth();
      const email = window.localStorage.getItem("emailForSignIn");

      if (!email) {
        alert("Email not found. Please sign up again.");
        navigate("/signup");
        return;
      }

      if (isSignInWithEmailLink(auth, window.location.href)) {
        try {
          const result = await signInWithEmailLink(auth, email, window.location.href);
          const token = await result.user.getIdToken();

          // ✅ Store user & token before redirecting
          window.localStorage.setItem("token", token);
          window.localStorage.setItem(
            "user",
            JSON.stringify({
              name: result.user.displayName || "Anonymous",
              email: result.user.email,
            })
          );

          alert("Login successful!");
          navigate("/dashboard");
        } catch (err) {
          console.error("❌ Verification failed:", err);
          alert("Verification failed.");
        }
      }
    };

    verifyUser();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
      Verifying...
    </div>
  );
};

export default Verify;
