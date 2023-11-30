import { FaLocationArrow } from "react-icons/fa";
import BreadCrumb from "../Shared/BreadCrumb/BreadCrumb";
import React, { useState, useEffect } from "react";
import GoogleMapReact from 'google-map-react';
import axios from 'axios';


const AnyReactComponent = ({ text }) => (
    <div>
    <div style={{ color: 'red', fontSize: '16px' }}>{text}</div>
    <div style={{ width: '30px', height: '30px' }} > <FaLocationArrow></FaLocationArrow></div>
  </div>
  );

const About = () => {

    const breadCrumbInfo = {
        title: 'About Us',
        label1: 'Home',
        label2: 'About'
    };
    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627
        },
        zoom: 11
    };
    return (
        <div>
            <BreadCrumb {...breadCrumbInfo}></BreadCrumb>
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                <h2 className="text-xl text-center font-bold text-emerald-400">About Us</h2>
                    <p>
                    Nestled in the heart of Gulshan, Dhaka, Dhaka Home Control stands as a testament to architectural brilliance and historical significance. This iconic structure has been a cornerstone of the cityscape for [number] years, captivating both residents and visitors alike. Its distinctive design, a harmonious blend of [architectural style], showcases the craftsmanship of its builders. Beyond its aesthetic appeal, the building holds a rich history, witnessing [historical events or milestones]. Today, it serves as a hub for [purpose of the building, e.g., cultural events, commerce, etc.], welcoming people from all walks of life. Whether admired for its grandeur, historical importance, or contemporary functionality, DHC continues to be an integral part of the vibrant tapestry of Gulshan, Dhaka.
                    </p>
                </div>
                <div style={{ height: '100vh', width: '100%' }} className="mr-4">
                <h2 className="text-xl text-center font-bold text-emerald-400 pb-4">Here See Our Location</h2>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "" }}
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                    >
                        <AnyReactComponent
                            lat={23.796979}
                            lng={90.432449}
                            text="My Location" 
                        />
                    </GoogleMapReact>
                </div>
            </div>
        </div>
    );
}

export default About;