import { FaHistory, FaHome, FaUsers } from "react-icons/fa";

import { NavLink, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { RxPerson } from "react-icons/rx";
import { TfiAnnouncement } from "react-icons/tfi";
import usseAuth from "../../hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { MdOutlinePayment } from "react-icons/md";
import { useEffect } from "react";
const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const { user } = usseAuth();
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const navigate = useNavigate();
    const { data: userData } = useQuery({
        queryKey: [user?.email, 'userData'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/member/${user.email}`);
            return res.data;
        }

    })
    useEffect(() => {
        const redirectToDashboard = () => {
            if (location.pathname === "/dashboard") {
                if (isAdmin) {
                    navigate("/dashboard/adminHome");
                }
                if (userData?.role == 'member' || userData?.role == 'user') {
                    navigate("/dashboard/profile");
                }
            }
        };
        redirectToDashboard();

    }, [location.pathname, navigate, isAdmin, userData?.role]);
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-start justify-start ml-10 mt-10">
                {/* Page content here */}

                <label htmlFor="my-drawer-2" className="btn btn-primary bg-[#FFD358] text-black border-none drawer-button lg:hidden"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <Outlet></Outlet>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-emerald-100 text-base-content">
                    {/* Sidebar content here */}
                    {
                        isAdmin ? <>
                            <li className="hover:bg-emerald-400 rounded-sm"> <NavLink to="/dashboard/adminHome">
                                <FaHome></FaHome>
                                Admin Profile</NavLink></li>

                            <li className="hover:bg-emerald-400 rounded-sm"> <NavLink to="/dashboard/manage-user">
                                <FaUsers></FaUsers>
                                Manage Members</NavLink></li>
                            <li className="hover:bg-emerald-400 rounded-sm mt-4"> <NavLink to="/dashboard/add-announcement">
                                <TfiAnnouncement />Create Announcements</NavLink></li>
                            <li className="hover:bg-emerald-400 rounded-sm mt-4"> <NavLink to="/dashboard/announcement-list">
                                <TfiAnnouncement /> Announcement List</NavLink></li>
                            <li className="hover:bg-emerald-400 rounded-sm mt-4"> <NavLink to="/dashboard/agreement-list">
                                <FaHistory /> Agreement Requests</NavLink></li>
                        </> :
                            userData?.role === 'member' ?
                                <>
                                    <li className="hover:bg-emerald-400 rounded-sm"> <NavLink to="/dashboard/profile">
                                        <RxPerson></RxPerson>
                                        My Profile</NavLink></li>
                                    <li className="hover:bg-emerald-400 rounded-sm mt-4"> <NavLink to="/dashboard/make-payment">
                                        <MdOutlinePayment></MdOutlinePayment>
                                        Make payment</NavLink></li>
                                    <li className="hover:bg-emerald-400 rounded-sm mt-4"> <NavLink to="/dashboard/make-payment">
                                        <FaHistory></FaHistory>
                                        Payment History</NavLink></li>
                                    <li className="hover:bg-emerald-400 rounded-sm mt-4"> <NavLink to="/dashboard/announcement">
                                        <TfiAnnouncement />
                                        Announcements</NavLink></li>
                                </>
                                :
                                <>
                                    <li className="hover:bg-emerald-400 rounded-sm"> <NavLink to="/dashboard/profile">
                                        <RxPerson></RxPerson>
                                        My Profile</NavLink></li>
                                    <li className="hover:bg-emerald-400 rounded-sm mt-4"> <NavLink to="/dashboard/announcement">
                                        <TfiAnnouncement />
                                        Announcements</NavLink></li>
                                </>

                    }
                    <div className="divider"></div>
                    <li className="hover:bg-emerald-400 rounded-sm mt-4">
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                </ul>

            </div>
        </div>
    );
}

export default Dashboard;


