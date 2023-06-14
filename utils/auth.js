import Link from "next/link";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
  } from "firebase/auth";
  import { getUser } from "./storageManager";
import { useEffect, useState } from "react";

export function subSignIn(callback) {
  const callbackArray = []
  if (callbackArray.indexOf(callback) === -1) {
    callbackArray.push(callback);
  }
  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      callbackArray.forEach(callbackFn => {
        callbackFn(true);
      });
    } else {
      callbackArray.forEach(callbackFn => {
        callbackFn(false);
      });
    }
  });
}

export async function signIn() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(getAuth(), provider);
    } catch (error) {
      console.error(error);
    }
}
export function signOutUser() {
    // Sign out of Firebase.
    signOut(getAuth());
}
// Returns the signed-in user's display name.
export async function getUserName() {
    if (isUserSignedIn()) {
      const userObj = await getUser(getAuth().currentUser.uid);
      return userObj.name
    } 
    return null;
}

export function getUserID() {
    if (isUserSignedIn()) {
        return getAuth().currentUser.uid;
    }
    return '';
}
export function getUserObj(){
    if (isUserSignedIn()) {
        return getAuth().currentUser;
    }
    return '';
}
  
  // Returns true if a user is signed-in.
export function isUserSignedIn() {
    return !!getAuth().currentUser;
}
//Sign user in
export function SignIn({ isSignedIn }) {
    if (isSignedIn) {
      return (
        <div >
            <button className="btn btn-secondary" type="button" onClick={signOutUser}>
              Sign Out
            </button>
        </div>
      );
    }
    return (
      <div >
        <button className="btn btn-ghost" type="button" onClick={signIn}>
          Sign in
        </button>
      </div>
    );
}
// If user is signed in, create link to account page
export function UsernameLink(){
  const [username, setUsername] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isUserSignedIn());
    subSignIn(authChangedState);
  }, []);

  useEffect(() => {
    getUserName().then((value) => {
      setUsername(value);
    }, (err) => {console.error(err)});
  }, [isLoggedIn]);

  function authChangedState(value) {
    setIsLoggedIn(value);
}

  if (isLoggedIn) {
      return (
          <Link href="/profile">
                  {username}
          </Link>
      );
  } else {
      return null;
  }
}