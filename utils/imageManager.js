import carouselImage1 from '../public/assets/graffitiStyleRobots.png';
import carouselImage2 from '../public/assets/humanAndRobot.png';
import carouselImage3 from '../public/assets/threeRobots.png';
import squareImage1 from '../public/assets/squareRobotHead.png';
import squareImage2 from '../public/assets/squareRobotsTable.png';

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
export function getSquareImages() {
    const images = [
        {
            img: squareImage1,
            alt: "Robot head",
        },
        {
            img: squareImage2,
            alt: "Robots sitting at a table",
        },
    ];
    return images;
}