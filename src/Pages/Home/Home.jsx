import React from 'react';
import Banner from '../Banner/Banner';
import 'react-awesome-button/dist/styles.css';
import Coupon from '../Coupon/Coupon';
import Apartment from '../Apartment/Apartment';
import Services from '../Services/Services';
import FAQs from '../FAQs/FAQs';

const Home = () => {
    

    return (
        <div>
            <Banner />
            <div  className='max-w-screen-xl mx-auto'>
                <Apartment></Apartment>
            </div>
            <Services></Services>
            <div  className='max-w-screen-xl mx-auto'>
            <FAQs></FAQs>
            </div>
        </div>
    );
};

export default Home;
