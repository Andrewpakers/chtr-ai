import { isUserSignedIn, subSignIn, getUserName } from "../utils/auth";
import { saveUser } from "../utils/storageManager";
import { useState, useEffect, useContext } from "react";
import { displayNameContext } from "../context/context";


export default function Profile() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useContext(displayNameContext);
    const [displaynameInput, setDisplaynameInput] = useState('');

    function authChangedState(value) {
        setIsLoggedIn(value);
    }

    useEffect(() => {
        setIsLoggedIn(isUserSignedIn());
        subSignIn(authChangedState);
    }, []);

    useEffect(() => {
        getUserName().then((value) => {
            setUsername(value);
        }, (err) => console.error(err))
    }, [isLoggedIn]);

    function handleClick(evt) {
        saveUser(displaynameInput, setUsername);
        setDisplaynameInput("");
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          // 👇 Get input value
          saveUser(displaynameInput, setUsername);
          setDisplaynameInput("");
        }
    };

    function handleChange(event) {
        setDisplaynameInput(event.target.value);
    }

    if (!isLoggedIn) {
        return null
    }
    return (
        <div className="py-4 h-[650px] flex flex-col gap-4">
            <h1 className="text-4xl">Preferences</h1>
            <form>
                <label className="label">
                    <span className="label-text text-base-content">Display name</span>
                </label>
                <div className="flex gap-4 items-center">
                    <input type="text" placeholder={username} onKeyDown={handleKeyDown} value={displaynameInput} onChange={handleChange} className="input input-bordered input-secondary input-sm" />
                    <button className="btn btn-sm btn-secondary" type="button" onClick={handleClick}>Save</button>
                </div>
            </form>
            
        </div>
    );

}