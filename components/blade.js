import Image from "next/image";
import testImage from '../public/assets/squareRobotHead.png';
export default function Blade({image, copy, headline, direction}) {
    if (direction === "right") {
        return (
            <div className="flex justify-evenly gap-x-12 mx-6 items-center my-6">
                <div className="flex flex-col flex-nowrap max-w-md">
                    <h2 className="font-bold text-lg mb-4" data-testid="blade-headline">
                        {headline}
                    </h2>
                    <p data-testid="blade-copy">
                        {copy}
                    </p>
                </div>
                <Image
                src={image.img}
                alt={image.alt}
                data-testid="blade-image"
                height={250}
                width={250}
                className="rounded-full max-sm:h-40 max-sm:w-40"
                />
            </div>
        );
    }
    return (
        <div className="flex justify-evenly gap-x-12 mx-6 items-center my-6">
                <Image
                src={image.img}
                alt={image.alt}
                data-testid="blade-image"
                height={250}
                width={250}
                className="rounded-full max-sm:h-40 max-sm:w-40"
                />
                <div className="flex flex-col flex-nowrap max-w-md">
                    <h2 className="font-bold text-lg mb-4" data-testid="blade-headline">
                        {headline}
                    </h2>
                    <p data-testid="blade-copy">
                        {copy}
                    </p>
                </div>
        </div>
    );
}