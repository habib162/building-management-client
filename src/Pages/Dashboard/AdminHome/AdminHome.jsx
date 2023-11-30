import usseAuth from "../../../hooks/UseAuth";

const AdminHome = () => {
    const { user } = usseAuth();
    return (
        <div>
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
    );
}

export default AdminHome;