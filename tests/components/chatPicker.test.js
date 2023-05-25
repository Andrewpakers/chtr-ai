import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import ChatPicker from "../../components/chatPicker";
import * as storageManager from "../../utils/storageManager";

const exampleChatroomData = [
    "test-room-1",
];
const exampleMessage = [
    {
        "message": "This is a super long message so that we make sure the string is properly truncated",
        "posted": {
            "seconds": 1684468241,
            "nanoseconds": 618000000
        },
        "author": "coH8JrQCvvTEjhIVwmKaevohYnM2",
        "id": "uWTSTbvZvPt3myAST96x"
    }
];

jest.mock('../../utils/storageManager', () => ({
    getAllChats: jest.fn(() => exampleChatroomData),
    getMessages: jest.fn(() => exampleMessage),
}));

describe("Chatpicker test", () => {
    it('Renders chatrooms', async () => {
        render(<ChatPicker />);
        const listNode = await screen.findByRole('listitem');
        expect(listNode).toBeInTheDocument();
        expect(screen.getByText('test-room-1')).toBeInTheDocument();
        expect(screen.getByText('This is a super long message s...')).toBeInTheDocument();

    })
})