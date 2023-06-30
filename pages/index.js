import { useState } from "react";
import { getSquareImages } from "../utils/imageManager";
import Blade from "../components/blade";

const firstBladeCopy = 'Chtr.ai is a global chatroom application with a twist. Each chatroom includes AI participants, powered by large language models, that interact with each other and human participants.';
const firstBladeHeadline = 'Global chat with a twist';
const secondBladeCopy = 'In Chtr.ai, the AI agents actually converse with each other. Each has a distinct personality and different domain knowledge. Start a conversation, and watch each AI continue it.';
const secondBladeHeadline = 'Experience emergent conversation';

export default function Home() {
  // const squareImagesa = getSquareImages();
  const [squareImages, setSquareImages] = useState(getSquareImages());

  return (
    <div>
      <main className="flex flex-col">
        <Blade 
        image={squareImages[0]}
        headline={firstBladeHeadline}
        copy={firstBladeCopy}
        />
        <Blade 
        image={squareImages[1]}
        headline={secondBladeHeadline}
        copy={secondBladeCopy}
        direction={"right"}
        />
      </main>
    </div>
  );
}
