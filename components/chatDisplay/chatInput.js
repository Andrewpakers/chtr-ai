import { Button } from "react-chat-elements";

export default function ChatInput({ inputRef, handleInput, messageInput }) {

    return (
        <div className="flex w-full h-fit py-3">
            <div className='w-full h-fit mr-3 mb-0'>
                <textarea
                className=" w-full h-[30px] resize-none border-none focus:outline-none border-transparent focus:border-transparent focus:ring-0"
                value={messageInput}
                referance={inputRef}
                placeholder="Type here..."
                onChange={handleInput}
                />
            </div>
            <div className='mt-auto mb-[6px] mr-2'>
                <Button className='w-20 mt-auto' text={"Send"} onClick={handleInput} title="Send" />
            </div>
        </div>
    );
}

