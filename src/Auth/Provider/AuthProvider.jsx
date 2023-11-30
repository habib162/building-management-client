import { createContext, useEffect, useState } from "react";
import { app } from "../../firebase/firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
   
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const updateUserProfile = (displayName,photoUrl,role) => {
        return updateProfile(auth.currentUser, {
            displayName: displayName, photoURL: photoUrl, role:role
        });
    }

    const signIn = (email,password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,currentUser =>{
            setUser(currentUser);
            if (currentUser) {
                // get token from local storage
                const userInfo = {email: currentUser.email}
                axiosPublic.post('/jwt',userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token',res.data.token)
                            setLoading(false)
                        }
                    })
            }
            else{
                localStorage.removeItem('access-token')
                setLoading(false)
            }
        });
        return () => {
            return unSubscribe();
        }
    },[axiosPublic])

    const AuthInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        googleLogin,
        updateUserProfile
    }

    return (
        <AuthContext.Provider value = {AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;