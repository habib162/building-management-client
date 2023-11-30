import { useQuery } from "@tanstack/react-query";
import usseAuth from "../../../hooks/UseAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Watch } from "react-loader-spinner";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { user } = usseAuth();
  const axiosSecure = useAxiosSecure();
  const {data: apartmentItems,isPending: loading, refetch} = useQuery({
    queryKey: [user?.email,'apartmentItems'],
    queryFn: async () => {
      const items = await axiosSecure.get(`/itemCarts/${user.email}`)
      return items.data;
    }
  })
  const handleItemDelete = (id) => {
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

          axiosSecure.delete(`/itemCarts/${id}`)
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
    <div className="flex justify-between gap-4">
      <div className="flex items-center justify-start bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-auto">
          <img
            src={user?.photoURL}
            alt="Profile"
            className="w-32 h-32 mx-auto rounded-full"
          />
          <h1 className="text-2xl font-semibold text-center mt-4">{user?.displayName}</h1>
          <div className="mt-6">
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span> {user?.email}
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Location:</span> N/A
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Bio:</span> N/A
            </p>
          </div>
          {/* <div className="mt-6">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Edit Profile
          </button>
        </div> */}
        </div>
      </div>
      <div className=" bg-emerald-50 shadow-lg">
        {/* Header */}
        <header className="bg-blue-400 text-white p-4 text-center">
          <h1 className="text-3xl font-semibold">Apartment Info</h1>
        </header>

        {/* Main Content */}
        <div className="container mx-auto mt-8 p-4">
          {
            loading ? <><Watch
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
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Block Name</th>
                    <th>Floor No</th>
                    <th>Apartment No</th>
                    <th>Rent</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                    {
                      apartmentItems?.map((item,index) => (<tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.blockName}</td>
                        <td>{item.floorNo}</td>
                        <td>{item.apartmentNo}</td>
                        <td>{item.rent}</td>
                        <td className={`badge ${item.status === 'pending' ? 'badge-warning' : 'badge-success'} badge-sm mt-4`}>{item.status}</td>
                        <td><button className="btn btn-sm text-red-500" onClick={()=>handleItemDelete(item._id)}><FaTrashAlt></FaTrashAlt></button></td>
                      </tr>))
                    }
                </tbody>
              </table>

          }
        </div>
      </div>
    </div>
  );
}

export default MyProfile;