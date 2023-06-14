import TimeAgo from 'javascript-time-ago'
// English.
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)
// Create formatter (English).
const timeAgo = new TimeAgo('en-US')

export default function MessageBox({ position,  title, type, text, date }) {
    // console.log(date);
    const timeAgoPosted = timeAgo.format(Date.parse(date));
    // const timeAgoPosted = 'lknlkj'
    if (position === 'right') {
        return (
            <div className="chat chat-end">
                <div className="chat-header flex flex-col items-end gapy-0.5 mb-1">
                    {title}
                    <time className="ml-1 text-xs opacity-50">{timeAgoPosted}</time>
                </div>
                <div className="chat-bubble">{text}</div>
            </div>
        );
    }
    return (
        <div className="chat chat-start">
            <div className="chat-header flex flex-col items-end gapy-0.5 mb-1">
                {title}
                <time className="ml-1 text-xs opacity-50">{timeAgoPosted}</time>
            </div>
            <div className="chat-bubble">{text}</div>
        </div>
    );
}

