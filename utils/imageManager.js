import carouselImage1 from '../public/assets/graffitiStyleRobots.png';
import carouselImage2 from '../public/assets/humanAndRobot.png';
import carouselImage3 from '../public/assets/threeRobots.png';

export default function getImages() {
    const images = [
        {
            img: carouselImage1,
            alt: "Graffiti style robots",
        },
        {
            img: carouselImage2,
            alt: "Human and robot talking",
        },
        {
            img: carouselImage3,
            alt: "Three robots",
        },
    ]
    return images;
}