import { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { cheminPHP } from '../components/VarGlobal.js';


export default function ImageCarousel(){
	const [images, setImageUrls] = useState([]);

	useEffect(() => {
		fetch(cheminPHP + "config/GetImgAcceuil.php")
			.then((response) => {
				return response.json()
			})
			.then((data) => {
				setImageUrls(data);
			})
			.catch((error) => {
				console.error("Une erreur s'est produite :", error);
			});
	}, []);

	return (
		<Carousel>
		{images.map((url) => (
				<Carousel.Item key={url}>
					<img
						className="imgcarr"
						src={url}
						alt={`${url}`}
					/>
				</Carousel.Item>
			))}
		</Carousel>
	);
}