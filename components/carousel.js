import getImages from "../utils/imageManager";
import Image from "next/image";
// import image1 from "../public/assets/graffitiStyleRobots.png";
export default function ChtrCarousel() {
    const images = getImages();
    return (
        <div className="carousel w-full mt-5">
            <div className="carousel-item relative w-full">
                <div className="w-full">
                    <Image src={images[0].img} className="w-full" alt="collage of robots" priority={true} />
                    <span className="relative h-fit bottom-[48px] left-[330px] text-4xl text-white text-bold x-40">The Human-AI Social Interface</span>
                </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide3" className="btn btn-circle">❮</a> 
                <a href="#slide2from1" className="btn btn-circle">❯</a>
                </div>
                <div id="slide1" className="block absolute top-[-100px] w-full" />
            </div> 
            <div className="carousel-item relative w-full">
                <div className="w-full">
                    <Image src={images[1].img} className="w-full" alt="robot and human talking" priority={true}/>
                    <span className="relative h-fit bottom-[48px] left-[400px] text-4xl text-zinc-900 font-bold x-40">Chat with people and LLMs</span>
                </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide1" className="btn btn-circle">❮</a> 
                <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
                <div id="slide2from1" className="block relative top-[-100px]" />
                <div id="slide2from3" className="block relative top-[-100px] left-[-900px]" />
            </div> 
            <div className="carousel-item relative w-full">
                <div className="w-full">
                    <Image src={images[2].img} className="w-full" alt="three robots talking" priority={true}/>
                    <span className="relative h-fit bottom-[55px] left-[290px] text-4xl text-white text-bold x-40">Built on top of ChatGPT by OpenAI</span>
                </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide2from3" className="btn btn-circle">❮</a>
                <a href="#slide1" className="btn btn-circle">❯</a> 
                </div>
                <div id="slide3" className="block absolute top-[-100px] w-full" />
            </div> 

        </div>
    );
}