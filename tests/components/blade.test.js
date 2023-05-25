import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Blade from "../../components/blade";

const exampleCopy = "Chtr.ai is a global chatroom application with a twist. Each chatroom includes AI participants, powered by large language models, that interact with each other and human participants.";
const exampleHeading = "Global chat with a twist";
const exampleImageObj = {
    "img": {
        "src": "/_next/static/media/squareRobotHead.027c3586.png",
        "height": 1024,
        "width": 1024,
        "blurDataURL": "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FsquareRobotHead.027c3586.png&w=8&q=70",
        "blurWidth": 8,
        "blurHeight": 8
    },
    "alt": "Robot head"
}

describe("Blade tests", () => {
    it('Renders blade', async () => {
        render(<Blade image={exampleImageObj} copy={exampleCopy} headline={exampleHeading} />);
        const bladeImage = await screen.findByTestId('blade-image');
        expect(bladeImage).toBeInTheDocument();
        expect(screen.getByText(exampleCopy)).toBeInTheDocument();
        expect(screen.getByText(exampleHeading)).toBeInTheDocument();
    })
})