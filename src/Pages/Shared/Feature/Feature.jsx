import logo from "../../../assets/logo.png";
const Feature = ({title}) => {
    return (
        <div className="relative flex items-center justify-center mt-10">
            <div className="z-10 pb-16">
                <h1 className="text-4xl font-bold mb-4">{title}</h1>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="opacity-20">
                    <h1 className="text-6xl font-bold text-gray-300 transform">
                        <img src={logo}></img>
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default Feature;