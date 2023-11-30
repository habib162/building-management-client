import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import About from "../Pages/About/About";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import Announcement from "../Pages/Dashboard/Announcement/Announcement";
import ManageUser from "../Pages/Dashboard/ManageUser/ManageUser";
import Addannouncement from "../Pages/Dashboard/AddAnnouncement/Addannouncement";
import AnnouncementList from "../Pages/Dashboard/AnnouncementList/AnnouncementList";
import AdminRoute from "../Auth/PrivateRoute/AdminRoute";
import UpdateAnnounce from "../Pages/Dashboard/AnnouncementList/UpdateAnnounce/UpdateAnnounce";
import AgreementList from "../Pages/Dashboard/AgreementList/AgreementList";
import Apartment from "../Pages/Apartment/Apartment";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
            {
                path: 'about',
                element: <About></About>
            },
            {
                path: 'apartment',
                element: <Apartment></Apartment>
            },
        ]

    },
    {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: "adminHome",
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },
            {
                path: "profile",
                element: <MyProfile></MyProfile>
            },
            {
                path:"announcement",
                element: <Announcement></Announcement>
            },
            {
                path:"manage-user",
                element: <AdminRoute><ManageUser></ManageUser></AdminRoute>
            },
            {
                path:"add-announcement",
                element: <AdminRoute><Addannouncement></Addannouncement></AdminRoute>
            },
            {
                path:"announcement-list",
                element: <AdminRoute><AnnouncementList></AnnouncementList></AdminRoute>
            },
            {
                path:'announcement/:id',
                element: <AdminRoute><UpdateAnnounce></UpdateAnnounce> </AdminRoute>,
                loader: ({params}) => fetch(`https://building-management-server-side.vercel.app/announcement/${params.id}`)
            },
            {
                path:'agreement-list',
                element: <AdminRoute><AgreementList></AgreementList> </AdminRoute>
            },

        ]
    },
])