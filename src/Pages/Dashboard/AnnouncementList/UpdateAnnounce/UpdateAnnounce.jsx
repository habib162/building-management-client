import { AwesomeButtonProgress } from "react-awesome-button";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const UpdateAnnounce = () => {
    const {title,announcement, _id} = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const announcement = e.target.announcement.value;
        const newAnnouncment = { title, announcement };
        if (title && announcement) {
            try {
                const res = await axiosSecure.patch(`/announcement/${_id}`, newAnnouncment);

                if (res.data.modifiedCount > 0) {
                    toast.success("Announcement updated successfully");
                    navigate(location?.state ? location.state : "/dashboard/announcement-list");
                }

                
            } catch (error) {
                console.error("Error adding announcement:", error);
            }
        }
    };
    return (
        <div className="max-w-lg flex justify-between gap-4">
        <h2>Hosdlfjl</h2>
        <div className="hero">
            <div className="hero-content flex-col lg:flex-row">
                <div className="card flex-shrink-0 w-full shadow-md bg-base-100 rounded-md">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input type="text" name='title' defaultValue={title} placeholder="Title" className="input input-bordered border-2 border-emerald-300 focus:outline-none focus:border-[#FFD358] rounded-md py-2 px-4  appearance-none leading-normal" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Announcement</span>
                            </label>
                            <textarea type="text" name='announcement' defaultValue={announcement} placeholder="Enter Announcement" className="h-20 input input-bordered border-2 border-emerald-300 focus:outline-none focus:border-[#FFD358] rounded-md py-2 px-4  appearance-none leading-normal" required />
                        </div>
                        <div className="form-control mt-6 justify-center items-center">
                            <AwesomeButtonProgress
                                type="primary"
                                size="large"
                                className="bg-green-500 hover:bg-green-600"

                            ><p className="flex gap-1">
                                    Submit
                                </p>
                            </AwesomeButtonProgress>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>   
    );
}

export default UpdateAnnounce;
