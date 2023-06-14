
export default function ChatInput({ inputRef, handleInput, messageInput }) {

    return (
        <div className="flex w-full h-fit py-3">
            <div className='w-full h-fit mr-3 mb-0 pl-2'>
                <textarea
                className="input input-bordered input-sm w-full resize-none"
                value={messageInput}
                referance={inputRef}
                placeholder="Type here..."
                onChange={handleInput}
                />
            </div>
            <div className='mt-auto mb-[6px] mr-2'>
                <button className='w-20 btn btn-sm h-[34px] btn-secondary' onClick={handleInput} title="Send">
                    Send
                </button>
            </div>
        </div>
    );
}
