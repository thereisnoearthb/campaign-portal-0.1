import React from 'react';
import { Image } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


interface Slide {
  image: string;
}

interface ImageSliderProps {
  slides: Slide[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ slides }) => {
  return (
    <Carousel infiniteLoop>
      {slides.map((slide, index) => (
        <Image key={index} src={slide.image} height="900px" width="800px" />
      ))}
    </Carousel>
  );
};

export default ImageSlider;
