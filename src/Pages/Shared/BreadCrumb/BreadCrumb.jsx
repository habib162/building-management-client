import banner from "../../../assets/banner/banner5.jpg"
const BreadCrumb = ({title,label1,label2}) => {
    return (
        <div className="hero h-64" style={{ backgroundImage: `url(${banner})` }}>
            <div className="hero-overlay bg-opacity-40"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">{title}</h1>
                    <p className="mb-5 text-xl font-bold"><span className="text-[#FFD358]">{label1}</span> - {label2}</p>
                </div>
            </div>
        </div>
    );
}

export default BreadCrumb;