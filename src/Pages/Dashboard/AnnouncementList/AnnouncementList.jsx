import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Watch } from "react-loader-spinner";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AnnouncementList = () => {
    const axiosSecure = useAxiosSecure();
    const { data: anounceItem, isPending: loading, refetch } = useQuery({
        queryKey: ['anounceItem'],
        queryFn: async () => {
            const res = await axiosSecure.get('/announcement');
            return res.data;

        }

    })
    const handleDeleteAnnounce = (id) => {
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

                axiosSecure.delete(`/announcement/${id}`)
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
            <div className="overflow-x-auto">
                <div className=" bg-emerald-50 shadow-lg">
                    <header className="bg-blue-400 text-white p-2 text-center">
                        <h1 className="text-3xl font-semibold">Announcement List</h1>
                    </header>
                {
                    loading ? <>
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
                    </> :
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Title</th>
                                <th>Announcement</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                anounceItem?.map((item, index) => <tr key={item._id}>
                                    <th>{index + 1}</th>
                                    <td>{item.title}</td>
                                    <td>{item.announcement}</td>
                                    <td className="flex">
                                    <Link to={`/dashboard/announcement/${item._id}`}>
                                            <button
                                                 className="btn btn-ghost btn-sm">
                                                <FaEdit className="text-red-600"></FaEdit>
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteAnnounce(item._id)}
                                            className="btn btn-ghost btn-sm">
                                            <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                        </button>
                                    </td>
                                </tr>)}
                        </tbody>
                    </table>
                }
                    
                </div>
            </div>
        </div>
    );
}

export default AnnouncementList;