import { useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import logo from "../../assets/Images/logo.jpg";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error

    try {
      // Sign in user
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("✅ User Logged In:", user.email);

      // Checking if the user exists in the "admins" collection
      const adminRef = doc(db, "admins", user.email);
      // Using email instead of UID
      const adminDoc = await getDoc(adminRef);

      if (adminDoc.exists()) {
        console.log("✅ Admin Verified. Redirecting to dashboard...");
        localStorage.setItem("isAdmin", true); // Store admin status
        history.push("/dashboard"); //
      } else {
        console.log("❌ Access Denied! Not an admin.");
        setError("Access Denied! You are not an admin.");
      }
    } catch (error) {
      console.error("🔥 Login Error:", error.message);
      setError(error.message);
    }
  };

  return (
    <div>
      <nav
        style={{
          backgroundColor: "#ffc107",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img src={logo} alt="Restofesto Logo" style={{ height: "50px" }} />
        <h1 style={{ color: "#333" }}>Restofesto</h1>
      </nav>

      <div className="admin-login-container">
        <div className="admin-login-box">
          <h2>Admin Login</h2>
          {error && <p>{error}</p>}
          <form onSubmit={handleAdminLogin}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Admin Email"
              required
              autoComplete="email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              autoComplete="current-password"
            />
            <button type="submit">Login as Admin</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
