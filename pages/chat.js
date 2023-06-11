import ChatPicker from "../components/chatPicker";
import ChatDisplay from "../components/chatDisplay";
import { useEffect, useState, useContext } from "react";
import { isUserSignedIn, subSignIn } from "../utils/auth";
import { chatContext } from "../context/context";

function Display({ isLoggedIn }) {
    if (isLoggedIn) {
        return (
            <div className="flex">
                <ChatPicker />
                <ChatDisplay />
            </div>
        )
    }
    return (
        <div className="leading-4 flex flex-nowrap justify-center align-center h-[100px]">
            <span className="table">
                <span className="table-cell align-middle leading-4">Please log in to view the chat</span>
            </span>
        </div>
    );
}

export default function Chat() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function authChangedState(value) {
        setIsLoggedIn(value);
    }

    useEffect(() => {
        setIsLoggedIn(isUserSignedIn());
        subSignIn(authChangedState);
    }, []);

    return (
        <main className="">
            <Display isLoggedIn={isLoggedIn} />
        </main>
    );
}