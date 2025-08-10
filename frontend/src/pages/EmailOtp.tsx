import { useState } from "react";
import { auth } from "../firebase";
import { sendSignInLinkToEmail } from "firebase/auth";

const EmailOtpLogin = () => {
  const [email, setEmail] = useState("");

  const actionCodeSettings = {
    url: "http://localhost:5173/verify", // or your hosted frontend URL
    handleCodeInApp: true,
  };

  const sendEmailLink = async () => {
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      alert("OTP Link sent to your email");
    } catch (err) {
      console.error("Error sending email link:", err);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Login via Email Link (OTP)</h1>
      <input
        type="email"
        placeholder="Enter your Gmail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border rounded"
      />
      <button
        onClick={sendEmailLink}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Send Login Link
      </button>
    </div>
  );
};

export default EmailOtpLogin;
