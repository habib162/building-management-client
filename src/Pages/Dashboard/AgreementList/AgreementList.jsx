import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Watch } from "react-loader-spinner";
import { FaSave, FaTrashAlt } from "react-icons/fa";
import { CiEraser } from "react-icons/ci";
import { toast } from "react-toastify";

const AgreementList = () => {
    const axiosSecure = useAxiosSecure();
    const { data: agreement = [], refetch, isLoading } = useQuery({
        queryKey: ['agreement'],
        queryFn: async () => {
            const res = await axiosSecure.get('/agreements');
            return res.data;
        }
    });

    const handleAcceptBtn =(item) => {
        Promise.all([
            axiosSecure.patch(`/agreements/${item._id}`),
            axiosSecure.patch(`/usersRole/admin/${item.email}`),
          ])
            .then((responses) => {
              const [agreementRes, adminRes] = responses;
      
              if (agreementRes.data.modifiedCount > 0) {
                toast(`${item.userName}'s status checked`);
              }
      
              if (adminRes.data.modifiedCount > 0) {
                toast("Role changed");
              }
      
              // Refetch the data after both operations are complete
              refetch();
            })
            .catch((error) => {
              console.error("Error in handleAcceptBtn:", error);
            });
    }
    const handleRejectBtn =(item) => {
        Promise.all([
            axiosSecure.patch(`/agreements/${item._id}`),
            axiosSecure.patch(`/usersRole/${item.email}`),
          ])
            .then((responses) => {
              const [agreementRes, adminRes] = responses;
      
              if (agreementRes.data.modifiedCount > 0) {
                toast(`${item.userName}'s status checked`);
              }
      
              if (adminRes.data.modifiedCount > 0) {
                toast("Role changed");
              }
      
              // Refetch the data after both operations are complete
              refetch();
            })
            .catch((error) => {
              console.error("Error", error);
            });
    }
    return (
        isLoading ? <><Watch
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
                      <th>User Name</th>
                      <th>User Email</th>
                      <th>Floor no</th>
                      <th>Block name</th>
                      <th>Rent</th>
                      <th>Agreement request date</th>
                      <th>Status</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                  {
                    agreement.map((item, index) => <tr key={item._id}>
                          <th>{index + 1}</th>
                          <td>
                          {item.userName}
                          </td>
                          <td>{item.email}</td>
                          <td>{item.floorNo}</td>
                          <td>
                          {item.blockName}
                          </td>
                          <td>
                          ${item.rent}
                          </td>
                          <td>
                          {item.date}
                          </td>
                          <td>
                          {item.status == 'pending' ? <span className="badge badge-primary">Pending</span> : <span className="badge badge-success">Checked</span>}
                          </td>
                          <td>
                              <button
                                  onClick={() => handleAcceptBtn(item)}
                                  className="btn bg-emerald-300 btn-sm">
                                 Accept <FaSave className="text-red-600"></FaSave>
                              </button>
                              <button
                                  onClick={() => handleRejectBtn(item)}
                                  className="btn bg-red-300 btn-sm">
                                 Reject <CiEraser className="text-red-600"></CiEraser>
                              </button>
                          </td>
                      </tr>)}
              </tbody>
          </table>
      </div>
    );
}

export default AgreementList;