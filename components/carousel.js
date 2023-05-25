import { Carousel } from "flowbite-react";
import getImages from "../utils/imageManager";
import Image from "next/image";
// import image1 from "../public/assets/graffitiStyleRobots.png";
export default function ChtrCarousel() {
    const images = getImages();
    return (
        // <div className="h-56 max-sm:h-64 style={{height: "500px"}} max-xl:h-80 max-2xl:h-96" style={{width: "fit"}}>
        <div className="my-5 h-[500px] max-md:h-[400px] max-sm:h-[300px]">
            <Carousel>
                <div>
                    <Image
                    src={images[0].img}
                    alt={images[0].alt}
                    priority={true}
                    />
                    <h2 className="text-white absolute bottom-20 right-20 text-4xl font-bold">TEST</h2>
                </div>
                <Image
                src={images[1].img}
                alt={images[1].alt}
                priority={true}
                />
                <Image
                src={images[2].img}
                alt={images[2].alt}
                priority={true}
                />
            </Carousel>
        </div>
    );
}