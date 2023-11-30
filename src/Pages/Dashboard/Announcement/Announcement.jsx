import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Watch } from "react-loader-spinner";

const Announcement = () => {
    const axiosSecure = useAxiosSecure();
    const { data: anounceItem, isPending: loading, refetch } = useQuery({
        queryKey: ['anounceItem'],
        queryFn: async () => {
            const res = await axiosSecure.get('/announcement');
            return res.data;

        }

    })
    return (
        <div>
            <div className=" bg-gray-100">
                {/* Main Content */}
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
                            </tr>
                        </thead>
                        <tbody>
                            {
                                anounceItem?.map((item, index) => <tr key={item._id}>
                                    <th>{index + 1}</th>
                                    <td>{item.title}</td>
                                    <td>{item.announcement}</td>
                                </tr>)}
                        </tbody>
                    </table>
                }
                    
                </div>
            </div>
            </div>
        </div>
    );
}

export default Announcement;