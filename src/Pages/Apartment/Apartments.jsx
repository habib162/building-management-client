import { AwesomeButtonProgress } from "react-awesome-button";
import { FaArrowRight } from "react-icons/fa";
import Swal from "sweetalert2";
import usseAuth from "../../hooks/UseAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useApartmentItem from "../../hooks/useApartmentItem";
import { toast } from "react-toastify";
import Aos from "aos";
import { useEffect } from "react";

const Apartments = ({item}) => {
    const {apartmentImage, floorNo, blockName, apartmentNo, rent,_id} = item;
    const { user } = usseAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] =  useApartmentItem();
    const handleAgreement = () => {
        if (user && user.email) {
            const agreementItem = {
                apartmentId: _id,
                email: user.email,
                userName: user?.displayName,
                floorNo,
                blockName,
                apartmentNo,
                rent,
                status: "pending"
            }
            axiosSecure.post('/itemCards', agreementItem)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        toast(`${apartmentNo} no apartment added`)
                        // refetch cart
                        refetch();
                    }

                })
        }
        else {
            Swal.fire({
                title: "You are Logged Out",
                text: "Please login to add agreement?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            });
        }
    }
    useEffect(() => {
        Aos.init({
            duration: 3000,
        });
    });
    return (
        <div>
            <div className="p-4" >
                <div className="card w-[350px] h-[450px] bg-emerald-50 shadow-xl" data-aos="fade-left" >
                    <figure className="px-10 pt-10">
                        <img src={apartmentImage} alt="apartment" className="rounded-xl transform scale-100 hover:scale-125 transition-transform ease-in-out duration-300" />
                    </figure>
                    <div className="card-body items-start text-center">
                        <h2 className="card-title">Block Name: {blockName}</h2>
                        <p>Apartment Number: {apartmentNo}</p>
                        <p>Floor Number: {floorNo}</p>
                        <p className="text-xl">Rent: <span className="text-red-500 font-bold">${rent}</span></p>
                        <div className="card-actions">
                        <AwesomeButtonProgress
                            type="primary"
                            size="large"
                            className="bg-green-500 hover:bg-green-600"
                            onMouseUp={ handleAgreement}
                        ><p className="flex gap-1">
                            Agreement<FaArrowRight className="mt-[5px]"></FaArrowRight>
                        </p>
                        </AwesomeButtonProgress>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Apartments;