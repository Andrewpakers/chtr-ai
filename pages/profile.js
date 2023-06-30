import { isUserSignedIn, subSignIn, getUserName } from "../utils/auth";
import { saveUser, getUser } from "../utils/storageManager";
import { useState, useEffect, useContext } from "react";
import { displayNameContext } from "../context/context";
import { getUserID } from "../utils/auth";

export async function getServerSideProps(context) {
    return {
        props: {},
    };
}

export default function Profile() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useContext(displayNameContext);
    const [displaynameInput, setDisplaynameInput] = useState('');
    const [occupationInput, setOccupationInput] = useState('');
    const [backgroundInput, setBackgroundInput] = useState('');

    function authChangedState(value) {
        setIsLoggedIn(value);
    }

    useEffect(() => {
        setIsLoggedIn(isUserSignedIn());
        subSignIn(authChangedState);
        getUser(getUserID(), true).then((value) => {
            console.log('user value', value);
            setDisplaynameInput(value?.name);
            setOccupationInput(value?.occupation);
            setBackgroundInput(value?.background);
        }, (err) => console.error(err));
    }, []);

    useEffect(() => {
        getUserName().then((value) => {
            setUsername(value);
        }, (err) => console.error(err))
    }, [isLoggedIn]);

    function handleClick(evt) {
        saveUser(displaynameInput, setUsername, occupationInput, backgroundInput);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          // 👇 Get input value
          saveUser(displaynameInput, setUsername);
          setDisplaynameInput("");
        }
    };

    function handleChange(event) {
        switch (event.target.id) {
            case 'displayName':
                setDisplaynameInput(event.target.value);
                break;
            case 'occupation':
                setOccupationInput(event.target.value);
                break;
            case 'background':
                setBackgroundInput(event.target.value);
                break;
            default:
                break;
        }
    }

    if (!isLoggedIn) {
        return null
    }
    return (
        <div className="py-4 h-[650px] flex flex-col gap-4">
            <h1 className="text-4xl">Preferences</h1>
            <form>
                <div>
                    <label htmlFor="displayName" className="label">
                        <span className="label-text text-base-content">Display name</span>
                    </label>
                    <div className="flex gap-4 items-center">
                        <input id="displayName" type="text" onKeyDown={handleKeyDown} value={displaynameInput} onChange={handleChange} className="input input-bordered input-secondary input-sm" />
                    </div>
                </div>
                <div>
                    <label htmlFor="occupation" className="label">
                        <span className="label-text text-base-content">Occupation</span>
                    </label>
                    <div className="flex gap-4 items-center">
                        <input id="occupation" type="text" onKeyDown={handleKeyDown} value={occupationInput} onChange={handleChange} className="input input-bordered input-secondary input-sm" />
                    </div>
                </div>
                <div>
                    <label htmlFor="background" className="label">
                        <span className="label-text text-base-content">Background</span>
                    </label>
                    <div className="flex gap-4 items-center">
                        <textarea id="background" type="text" onKeyDown={handleKeyDown} value={backgroundInput} onChange={handleChange} className="textarea h-40 textarea-bordered textarea-secondary resize-none w-3/4 px-1 py-0" />
                    </div>
                </div>
                <button className="mt-5 btn btn-sm btn-secondary" type="button" onClick={handleClick}>Save</button>
            </form>
            
        </div>
    );

}