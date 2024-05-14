import React from 'react';
import { Carousel } from 'react-bootstrap'; // Assurez-vous d'avoir installé react-bootstrap
import image1 from "../img/image1.png";
import image2 from "../img/image2.png";
import image3 from "../img/maitai.png";

const ImageCarousel = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block col w-100"
                    src={image1}
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block col w-100"
                    src={image2}
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block col w-100"
                    src={image3}
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    );
}

export default ImageCarousel;
