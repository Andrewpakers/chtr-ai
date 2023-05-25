import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import ChatroomTile from "../../components/chatPicker/chatroomTile";

const exampleCopy = "This is a super long message so that we make sure the string is properly truncated";
const exampleTitle = "test-room-1";

describe("ChatroomTile tests", () => {
    it('Renders ChatroomTile', async () => {
        render(<ChatroomTile title={exampleTitle} lastMessage={exampleCopy} />);
        const chatroomTile = await screen.findByTestId('chatroomTile');
        expect(chatroomTile).toBeInTheDocument();
        expect(screen.getByText('test-room-1')).toBeInTheDocument();
        expect(screen.getByText('This is a super long message s...')).toBeInTheDocument();
    })
})