import { FaAward, FaBuilding, FaHome, FaUsers } from "react-icons/fa";
import banner from "../../assets/banner/jumbotron.jpg"
const Services = () => {
    return (
        <div className="hero h-64 mt-10 " style={{ backgroundImage: `url(${banner})` }}>
            <div className="hero-overlay bg-opacity-80"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="grid grid-cols-4 gap-20 mx-auto">
                    <div className="text-2xl font-bold text-white inline-block">
                        <div className="flex  gap-2"><FaHome></FaHome> 860</div>
                        <p>Complete Projects</p>
                    </div>
                    <div className="text-2xl font-bold text-white inline-block">
                        <div className="flex  gap-2"><FaBuilding></FaBuilding> 860</div>
                        <p>Property Sold</p>
                    </div>
                    <div className="text-2xl font-bold text-white">
                        <div className="flex  gap-2"><FaUsers></FaUsers> 860</div>
                        <p className="inline-block">Happy Clients</p>
                    </div>
                    <div className="text-2xl font-bold text-white">
                        <div className="flex  gap-2"><FaAward></FaAward> 860</div>
                        <p className="inline-block">Awards Win</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Services;