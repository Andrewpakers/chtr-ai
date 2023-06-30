import { updateMessage } from '../../../utils/storageManager'
import { useState } from 'react'
import TimeAgo from 'javascript-time-ago'
// English.
import en from 'javascript-time-ago/locale/en'
import Link from 'next/link'
TimeAgo.addDefaultLocale(en)
// Create formatter (English).
const timeAgo = new TimeAgo('en-US')

export default function MessageBox({ position,  title, type, text, date, activeChat, id, userID }) {
    const [messageInput, setMessageInput] = useState('');
    const timeAgoPosted = timeAgo.format(Date.parse(date));

    function handleChange(event) {
        setMessageInput(event.target.value);
    }
    if (position === 'right') {
        return (
            <div className="chat chat-end">
                <Link href={`/profile/${userID}`} className="chat-header flex flex-col items-end gapy-0.5 mb-1">
                    {title}
                    <time className="ml-1 text-xs opacity-50">{timeAgoPosted}</time>
                </Link>
                <div className="chat-bubble chat-bubble-primary break-words hyphens-auto">{text}</div>
                <div className="chat-footer text-xs" onClick={()=> document.getElementById(`editModal-${id}`).classList.add('modal-open')}>Edit</div>
                <dialog id={`editModal-${id}`} className="modal modal-bottom sm:modal-middle">
                    <form method="dialog" className="modal-box">
                        <button onClick={() => document.getElementById(`editModal-${id}`).classList.remove('modal-open')} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        <label htmlFor='messageInput' className="label">
                            <span className="label-text text-base-content">Message</span>
                        </label>
                        <input id='messageInput' type="text" placeholder={text} value={messageInput} onChange={handleChange} className="input input-bordered input-secondary input-sm" />
                        <div className="modal-action">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn" onClick={() => {
                            updateMessage(activeChat, id, messageInput);
                            document.getElementById(`editModal-${id}`).classList.remove('modal-open')}
                        }>Save</button>
                        <button className="btn btn-error" onClick={() => {
                            updateMessage(activeChat, id, '', true);
                            document.getElementById(`editModal-${id}`).classList.remove('modal-open')}
                        }>Delete</button>
                        </div>
                    </form>
                    <form method="dialog" className="modal-backdrop">
                        <button onClick={() => document.getElementById(`editModal-${id}`).classList.remove('modal-open')}>close</button>
                    </form>
                </dialog>
            </div>
        );
    }
    return (
        <div className="chat chat-start">
            <Link href={`/profile/${userID}`} className="chat-header flex flex-col items-end gapy-0.5 mb-1">
                {title}
                <time className="ml-1 text-xs opacity-50">{timeAgoPosted}</time>
            </Link>
            <div className="chat-bubble chat-bubble-secondary break-words hyphens-auto">{text}</div>
        </div>
    );
}

