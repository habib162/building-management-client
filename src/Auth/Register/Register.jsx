import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLottie } from "lottie-react";
import loginImg from '../../assets/Lottie/Login.json';
import { toast } from 'react-toastify';
import UseAuth from '../../hooks/UseAuth';
import { useEffect, useState } from "react";
import Aos from "aos";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
    const options = {
        animationData: loginImg,
        loop: true
    };

    const { View } = useLottie(options);
    useEffect(() => {
        Aos.init({
            duration: 3000,
        });
    });
    const { createUser, updateUserProfile } = UseAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };
    const handleSignUp = async (e) => {
        e.preventDefault();
        const displayName = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const role = 'member';
        const formData = new FormData();
        formData.append('image', selectedFile);

        const response = await axiosPublic.post(image_hosting_api, formData, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        });
        const photoUrl = response.data.data.display_url || null;
       


        const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-]).{6,}$/;

        if (!regex.test(password)) {
            if (password.length < 6) {
                toast.error("Password is less than 6 characters");
            }
            else if (!/[A-Z]/.test(password)) {
                toast.error("Don't have capital letter");
            }
            else if (!/[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(password)) {
                toast.error("Don't have Special Character");
            }
        } else {
            if (email) {
                createUser(email, password)
                    .then(result => { 
                        updateUserProfile(displayName,photoUrl,role)
                        const createdAt = result.user?.metadata?.creationTime;
                        const newUser = { email, password, displayName,photoUrl, createdAt,role:'user'}
                        axiosPublic.post('/users',newUser)
                        .then(res => {
                            if (res.data.insertedId) {
                                toast.success("user registered successfully")
                            }
                        })
                        navigate(location?.state ? location.state : "/");
                        console.log(result);

                    })
                    .catch(error => { console.log(error)});
            }

        }
    }
    return (
        <div>

            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left w-1/2 mr-12 mx-auto my-10" data-aos="fade-right">
                        {View}
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-xl shadow-md bg-base-100 rounded-md " data-aos="fade-left">
                        <SocialLogin></SocialLogin>
                        <form className="card-body" onSubmit={handleSignUp}>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Full Name</span>
                                    </label>
                                    <input type="text" name='name' placeholder="Enter Name" className="input input-bordered border-2 border-emerald-300 focus:outline-none focus:border-emerald-500 rounded-md py-2 px-4  appearance-none leading-normal" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Profile Image</span>
                                    </label>
                                    <input
                                        type="file"
                                        name="photoUrl"
                                        onChange={handleFileChange}
                                        className="input input-bordered border-2 border-emerald-300 focus:outline-none focus:border-emerald-500 rounded-md py-2 px-4 appearance-none leading-normal"
                                        required
                                    />
                                </div>

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered border-2 border-emerald-300 focus:outline-none focus:border-emerald-500 rounded-md py-2 px-4  appearance-none leading-normal" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered border-2 border-emerald-300 focus:outline-none focus:border-emerald-500 rounded-md py-2 px-4  appearance-none leading-normal" required />
                            </div>
                            <div className="form-control mt-6">
                                <input className='btn btn-success text-white' type='submit' value="Sign Up"></input>
                            </div>
                        </form>
                        <p className='mb-4 text-center'>
                            Already have an account ?<Link to="/login" className='label-text-alt link link-hover'> Login Here</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;