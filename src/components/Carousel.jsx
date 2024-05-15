    import React from 'react';
    import { Carousel } from 'react-bootstrap';

    // Importer toutes les images (.jpg et .png) du dossier img
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }
    
    const images = importAll(require.context('../img/imgAccueil/', false, /\.(png|jpe?g)$/));

    const ImageCarousel = () => {
    return (
        <Carousel>
        {Object.keys(images).map((image, index) => (
            <Carousel.Item key={index}>
            <img
                className="d-block col w-100"
                src={images[image]}
                alt={`Slide ${index + 1}`}
            />
            </Carousel.Item>
        ))}
        </Carousel>
    );
    }

    export default ImageCarousel;