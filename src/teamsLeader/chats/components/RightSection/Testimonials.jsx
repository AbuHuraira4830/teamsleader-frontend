import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import leftIcon from "../assets/images/arrow testi left.svg";
// import rightIcon from "../assets/images/arrow testi right.svg";

const testimonials = [
  {
    author: "Amanda W.",
    content:
      "",
  },
  {
    author: " Tyler S.",
    content:
      "",
  },
  {
    author: "Rachel M.",
    content:
      "",
  },
  {
    author: "Daniel K.",
    content:
      "",
  },
  {
    author: "Michelle L.",
    content:
      "",
  },
  {
    author: "Eric B.",
    content:
      "",
  },
  {
    author: "Sarah H.",
    content:
      "",
  },
  {
    author: "Jason D.",
    content:
      "",
  },
];
function Testimonials() {
  const [display, setDisplay] = useState(true);
  const [width, setWidth] = useState(600);
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <div className="w-full   bg-[#e3f5fe]">
    

        <div className="w-9/12 mx-auto">
          <Slider ref={sliderRef} {...settings} className="flex">
            {testimonials.map((testimonial, index) => (
              <div key={index}>
                <div className="text-sm bg-white w-[90%] px-3 py-5 rounded-md flex flex-col gap-5 justify-between h-80">
                  <p>{testimonial?.content}</p>
                  <div className="flex items-center gap-2">
                    {/* <img
                      src={person}
                      className="h-10 rounded-full bg-gray-200"
                      alt=""
                    /> */}
                    <div className="flex flex-col gap-1 text-sm ">
                      <p className="font-bold">{testimonial?.author}</p>
                      <div className="flex items-center gap-1 text-xs text-yellow-300">
                        {/* <FaCircle />
                        <FaCircle />
                        <FaCircle />
                        <FaCircle />
                        <FaCircle /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
         
        </div>
    </div>
  );
}

export default Testimonials;
