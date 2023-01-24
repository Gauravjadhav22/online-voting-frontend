import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import firebase from 'firebase/app';
import { auth } from '../firebase/Config';
import { useLocalStorage } from "../hooks/userLocalStorage";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(()=>setUser({name:auth.currentUser.displayName,email:auth.currentUser.email,pic:auth.currentUser.photoURL}));

  };

  // call this function to sign out logged in user
  const logout = () => {
    auth.signOut()
    setUser(null);
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("uniqueId");
    window.localStorage.removeItem("roomkey");
    // navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  );

  
  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};