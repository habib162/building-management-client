import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { Watch } from "react-loader-spinner";
import Swal from "sweetalert2";

const ManageUser = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })
    

    const handleMakeUser = user =>{
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res =>{
            if(res.data.modifiedCount > 0){
                refetch();
               toast(`${user.displayName} is User now`)
            }
        })
    }
    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>
           {
            isLoading ? <> <Watch
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
                /></> :
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>
                                <div className="avatar">
                                        <div className="w-20 rounded-full">
                                            <img src={user.photoUrl} />
                                        </div>
                                    </div>
                                </td>
                                <td>{user.displayName}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'admin' ? <button className="badge badge-primary">Admin</button> : user.role === 'member' ? <button className="badge badge-secondary tooltip" onClick={() => handleMakeUser(user)} data-tip="Make User">Member</button> :<button className="badge badge-success">User</button> }
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="btn btn-ghost btn-sm">
                                        <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                    </button>
                                </td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
           }
        </div>
    );
}

export default ManageUser;