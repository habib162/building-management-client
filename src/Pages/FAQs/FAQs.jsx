import React, { useEffect, useState } from 'react';
import { useLottie } from 'lottie-react';
import faqsImge from '../../assets/Lottie/faqs.json';
import Aos from 'aos';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
const axiosPublic = useAxiosPublic();

const FAQs = () => {
    const options = {
        animationData: faqsImge,
        loop: true,
    };
    const { View } = useLottie(options);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; 

    const { data: loadedFaqs = [], refetch, loading } = useQuery({
        queryKey: ['agreement'],
        queryFn: async () => {
            const res = await axiosPublic.get('/faqs');
    
            return res.data;
        }
    });
    useEffect(() => {
        Aos.init({
            duration: 3000,
        });
    });
    const totalPages = Math.ceil(loadedFaqs.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentFaqs = loadedFaqs.slice(startIndex, endIndex);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <h1 data-aos="fade-left" className="text-4xl font-bold py-6 bg-gradient-to-r text-transparent bg-clip-text from-indigo-500 from-10% via-emerald-500 via-30% to-emerald-500 to-90% ">
                Frequently Asked Questions (FAQ)
            </h1>
            {loading && (
                <div className="flex justify-center py-20">
                    <span className="loading loading-spinner text-success"></span>
                </div>
            )}
            <div className="flex flex-1 mx-auto font-poppins" >
                <div className="">
                    {currentFaqs.map((faq, index) => (
                        <div className="collapse collapse-plus w-[600px] bg-base-100 my-4 shadow-md rounded-md" data-aos="fade-right" key={index}>
                            <input type="radio" name="my-accordion" defaultChecked={index === 0 ? 'checked' : ''} />
                            <div className="collapse-title text-xl font-medium">
                                {faq.question}
                            </div>
                            <div className="collapse-content ">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                    <div className="join my-5 mx-auto">
                        <button onClick={handlePrevPage} disabled={currentPage === 1} className="join-item btn">
                            Prev
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                className={`join-item btn ${currentPage === index + 1 ? 'btn-success' : ''}`}
                                onClick={() => handlePageClick(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="join-item btn">
                            Next
                        </button>
                    </div>
                </div>
                <div className="h-[500px] w-[500px] mx-auto my-10" data-aos="fade-left">
                    {View}
                </div>
            </div>
        </div>
    );
};

export default FAQs;
