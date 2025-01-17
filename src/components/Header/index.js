import React from "react";
import "./style.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import account from "../../assets/user.svg";

function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  function logoutFnc() {
    // alert("You have successfully logged out");
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success("User log out successfully!");
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
  }

  return (
    <div className="navbar">
      <p className="logo">TODO</p>
      {user && (
        <div className="nav-left">
          {user.photoURL ? (
            <img
              style={{ width: "2rem", height: "2rem", borderRadius: "50%" }}
              src={user.photoURL}
            />
          ) : (
            <img
              style={{ width: "2rem", height: "2rem", borderRadius: "50%" }}
              src={account  }
            />
          )}
          <p className="logo link" onClick={logoutFnc}>
            Logout
          </p>
        </div>
      )}
    </div>
  );
}

export default Header;