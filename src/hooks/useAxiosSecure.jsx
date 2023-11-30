import axios from "axios";
import { useNavigate } from "react-router-dom";
import usseAuth from "./UseAuth";

const axiosSecure = axios.create({
    baseURL: 'https://building-management-server-side.vercel.app'
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {logOut} = usseAuth();

    axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem('access-token')
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    }, (error) => {
        return Promise.reject(error)
    });

    axiosSecure.interceptors.response.use((response) => {
        return response;
    }, async(error) => {
        const status = error.response.status;

        if (status === 401 || status === 403) {
            await logOut();
            navigate('/login')
            
        }
        return Promise.reject(error);
    })

    return axiosSecure;
}

export default useAxiosSecure;