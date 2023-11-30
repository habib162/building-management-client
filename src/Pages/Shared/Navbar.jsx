import { Link, NavLink } from "react-router-dom";
import { FaHome, FaInfo } from "react-icons/fa";
import { CiLogin, CiMail } from "react-icons/ci";
import { MdApartment } from "react-icons/md";
import logo from '../../assets/logo.png'
import { RxAvatar, RxDashboard, RxInfoCircled, RxPerson } from "react-icons/rx";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/Provider/AuthProvider";
import { Watch } from "react-loader-spinner";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
    const { user, logOut, loading } = useContext(AuthContext);
    const handleLogOut = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You wont be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Logout!',
        }).then((result) => {
            if (result.isConfirmed) {
                logOut();
            }
        })
    }
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const handleDropdownClick = (event) => {
        event.stopPropagation();
        setDropdownVisible(!dropdownVisible);
    };

    const handleBodyClick = () => {
        setDropdownVisible(false);
    };

    useEffect(() => {
        document.body.addEventListener('click', handleBodyClick);
        return () => {
            document.body.removeEventListener('click', handleBodyClick);
        };
    }, []);
    const navOptions =
        <>
            <li className="text-lg">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "text-[#FFD358] font-semibold text_hover_animaiton nav-link text-lg" : " font-semibold text_hover_animaiton nav-link text-lg"
                    }
                ><FaHome></FaHome> Home</NavLink></li>
                 <li className="text-lg">
                <NavLink
                    to="/apartment"
                    className={({ isActive }) =>
                        isActive ? "text-[#FFD358] font-semibold text_hover_animaiton nav-link text-lg" : " font-semibold text_hover_animaiton nav-link text-lg"
                    }
                ><MdApartment></MdApartment>All Apartments</NavLink></li>
            <li className="text-lg">
                <NavLink
                    to="about"
                    className={({ isActive }) =>
                        isActive ? "text-[#FFD358] font-semibold text_hover_animaiton nav-link text-lg" : " font-semibold text_hover_animaiton nav-link text-lg"
                    }
                ><RxInfoCircled></RxInfoCircled> About</NavLink></li>


        </>
    const loginOption = <>
        {
            user?.email ?
                <>
                    <li></li>
                    <div
                        className="dropdown dropdown-end relative">
                        <label tabIndex={0} className="btn btn-circle avatar relative" onClick={handleDropdownClick}>
                            <div className="w-10 rounded-full relative z-[2]">
                                {
                                    user.photoURL ? <img src={user.photoURL} alt={user.displayName} /> : <RxAvatar className="w-full h-full"></RxAvatar>
                                }
                            </div>
                        </label>
                        {dropdownVisible && (
                            <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow-lg bg-emerald-50 rounded-box w-150 z-[1000]">
                                <li className='text-red-600 font-bold text-xl disabled'>
                                    <a ><RxPerson></RxPerson> {user.displayName}</a>
                                </li>
                                <li className='text-black font-bold text-xl '><a><CiMail></CiMail>{user.email}</a></li>
                                <li className=" text-black  font-bold text-xl"><Link to="/dashboard"><RxDashboard></RxDashboard> Dashboard</Link></li>
                                <li> <NavLink
                                    onClick={handleLogOut}
                                    className={({ isActive }) =>
                                        isActive ? "text-black font-bold text-sm" : " font-bold text-sm text-black"
                                    }
                                >
                                    <CiLogin></CiLogin> Logout
                                </NavLink></li>
                            </ul>
                        )}
                    </div>

                </> :
                <li className="text-lg"><NavLink
                    to="/login"
                    className={({ isActive }) =>
                        isActive ? "text-[#FFD358] font-semibold text_hover_animaiton nav-link text-lg" : " font-semibold text_hover_animaiton nav-link text-lg"
                    }
                ><CiLogin></CiLogin> Login</NavLink></li>
        }
    </>
    return (
        <>
            {loading ? (
                <Watch
                    height="80"
                    width="80"
                    radius="48"
                    color="#4fa94d"
                    ariaLabel="watch-loading"
                    wrapperStyle={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                    wrapperClassName=""
                    visible={true}
                />
            ) : (
                <div className="relative">
                    <div className="navbar bg-black text-white h-[100px]">
                        <div className="navbar-start">
                            <div className="dropdown dropdown-end ">
                                <label tabIndex={0} className="btn lg:hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                                </label>
                                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 z-[1] shadow bg-base-100 rounded-box w-52 ">
                                    {navOptions}
                                </ul>
                            </div>
                            <a className="normal-case text-xl"><img src={logo} className="w-40 h-36"></img></a>
                        </div>
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal px-1">
                                {navOptions}
                            </ul>
                        </div>
                        <div className="navbar-end hidden lg:flex">
                            <ul className="menu menu-horizontal px-1">
                                {loginOption}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            
        </>
    );
}

export default Navbar;