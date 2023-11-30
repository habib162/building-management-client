
import { FcGoogle } from "react-icons/fc";
import {  toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import usseAuth from "../../hooks/UseAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";


function SocialLogin() {
    const {googleLogin} = usseAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const handleSocialLogin = (e) =>{
        e.preventDefault();
        googleLogin().then(res => {
            const userInfo = {
                email: res.user?.email,
                name: res.user?.displayName
            }
            useAxiosPublic.post('/users', userInfo)
            .then(res =>{
                navigate (location?.state ? location.state : "/");
            })
            
            toast("Sign in successfully")
        })
        .catch((err) => console.log(err))
    }
    return (
        <div>
            <div className='divider font-bold'>Continue With</div>
            <div className='text-center py-3'>
                <button className='btn btn-success btn-circle btn-emerald-outline bg-emerald-50' onClick={handleSocialLogin}><FcGoogle></FcGoogle></button>
            </div>
            <div className='divider font-bold'>Or</div>
        </div>
    );
}

export default SocialLogin;