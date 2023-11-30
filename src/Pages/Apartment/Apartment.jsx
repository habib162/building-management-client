import React, { useState } from 'react';
import useApartmentItem from '../../hooks/useApartmentItem';
import Feature from "../Shared/Feature/Feature";
import Apartments from "./Apartments";
import { useLocation } from 'react-router-dom';
import BreadCrumb from '../Shared/BreadCrumb/BreadCrumb';
const Apartment = () => {
    const FeatureTitle = {
        title: 'Feature Property'
    };
    const [apartmentItem] = useApartmentItem();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = apartmentItem.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(apartmentItem.length / itemsPerPage);

    const paginate = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) {
            return;
        }
        setCurrentPage(pageNumber);
    };
    const location = useLocation();
    const breadCrumbInfo = {
        title: "All Apartment",
        label1: "Home",
        label2: "Apartments",
    };
    const isNotHome = location.pathname !== "/";
    return (
        <div className={`${isNotHome ? '' : 'mt-32'}`} gap-5>
            {
                isNotHome ? <>
                    <div>
                        <BreadCrumb {...breadCrumbInfo}></BreadCrumb>
                    </div>

                </> : <>
                    <Feature {...FeatureTitle}></Feature>
                </>
            }
            {/* Pagination */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {currentItems.map((item) => (
                    <Apartments item={item} key={item._id}></Apartments>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-blue-500 text-white px-4 py-2 rounded-l disabled:opacity-50"
                >
                    Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => paginate(i + 1)}
                        className={`px-4 py-2 ${currentPage === i + 1 ? 'bg-green-500 text-white' : 'bg-white text-gray-800'} border border-r-0 border-gray-400`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-blue-500 text-white px-4 py-2 rounded-r disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Apartment;
