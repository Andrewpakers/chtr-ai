import { Navbar, Button } from "flowbite-react";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
  } from "firebase/auth";

export function subSignIn(callback) {
  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      callback(true);
    } else {
      callback(false);
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
export function getUserName() {
    if (isUserSignedIn()) {
      return getAuth().currentUser.displayName;
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
            <Button type="button" onClick={signOutUser}>
              Sign Out
            </Button>
        </div>
      );
    }
    return (
      <div >
        <Button type="button" onClick={signIn}>
          Sign in
        </Button>
      </div>
    );
}
// If user is signed in, create link to account page
export function UsernameLink(){
      if (isUserSignedIn) {
          return (
              <Navbar.Link href="/">
                      {getUserName()}
              </Navbar.Link>
          );
      } else {
          return null;
      }
}