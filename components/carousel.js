import { Carousel } from "flowbite-react";
import getImages from "../utils/imageManager";
import Image from "next/image";
// import image1 from "../public/assets/graffitiStyleRobots.png";
export default function ChtrCarousel() {
    const images = getImages();
    return (
        // <div className="h-56 sm:h-64 xl:h-80 2xl:h-96" style={{width: "fit"}}>
        <div className="my-5" style={{height: "500px", display: "flex",}}>
            <Carousel>
                <Image
                src={images[0].img}
                alt={images[0].alt}
                />
                <Image
                src={images[1].img}
                alt={images[1].alt}
                />
                <Image
                src={images[2].img}
                alt={images[2].alt}
                />
            </Carousel>
        </div>
    );
}