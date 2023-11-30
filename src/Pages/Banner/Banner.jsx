import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import banner5 from '../../assets/banner/banner5.jpg';
import banner6 from '../../assets/banner/banner6.jpg';
import banner1 from '../../assets/banner/banner1.jpg';
import banner4 from '../../assets/banner/banner4.jpg';
import '../../style.css';
import { AwesomeButtonProgress } from 'react-awesome-button';


const AutoplaySlider = withAutoplay(AwesomeSlider);

const Banner = () => {
  return (
    <div className="carousel-container relative z-[1]">
      <AutoplaySlider
        play={true}
        cancelOnInteraction={false}
        interval={9000}
        style={{ height: '600px' }}
      >
        {[
          { src: banner5, title: 'Building Management Services', content: 'Providing top-notch management solutions for your property' },
          { src: banner6, title: 'Professional Property Management', content: 'Efficient and reliable services for your building' },
          { src: banner1, title: 'Smart Solutions for Building Owners', content: 'Streamlining operations for a smarter living experience' },
          { src: banner4, title: 'Your Trusted Building Partner', content: 'Building management that you can rely on' },
        ].map((banner, index) => (
          <div key={index} style={{ position: 'relative', overflow: 'hidden' }} data-src={banner.src}>
            <div className="overlay" style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <h2 className='text-4xl text-red-500 font-bold mt-64'>{banner.title}</h2>
              <p className='mb-4 text-xl text-blue-400 font-bold'>{banner.content}</p>
              <AwesomeButtonProgress
                type="primary"
                size="medium"
              >
                Learn More
              </AwesomeButtonProgress>
            </div>
          </div>
        ))}
      </AutoplaySlider>
    </div>
  );
}

export default Banner;
