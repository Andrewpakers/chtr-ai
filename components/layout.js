import Head from "next/head";
import { useState } from "react";
import { Button, Navbar, Footer } from "flowbite-react";
import Image from 'next/image';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import logoImage from "../public/assets/logo.png";

async function signIn() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(getAuth(), provider);
  } catch (error) {
    console.error(error);
  }
}
function signOutUser() {
  // Sign out of Firebase.
  signOut(getAuth());
}
// Returns the signed-in user's display name.
function getUserName() {
  if (isUserSignedIn()) {
    return getAuth().currentUser.displayName;
  } 
  return null;
}

// Returns true if a user is signed-in.
function isUserSignedIn() {
  return !!getAuth().currentUser;
}
//Sign user in
function SignIn({ isSignedIn }) {
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
function UsernameLink(){
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
export default function Layout ({children}) {
    const [isSignedIn, setIsSignedIn] = useState(isUserSignedIn());
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    });
    return (
    <div className="max-w-4xl mx-auto">
        <Head>
            <title>Chtr.ai</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="border-b-2 border-slate-500">
            <Navbar
                fluid={true}
                rounded={true}
                >
                <Navbar.Brand href="/">
                    <Image
                    src={logoImage}
                    width={100}
                    height={100}
                    className="mr-4"
                    alt="Flowbite Logo"
                    />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Chtr.ai
                    </span>
                </Navbar.Brand>
                <div className="flex md:order-2">
                    {/* <Button>
                    Get started
                    </Button> */}
                    <SignIn isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn}>Sign In</SignIn>
                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                    <Navbar.Link
                    href="/"
                    active={true}
                    >
                    Home
                    </Navbar.Link>
                    <Navbar.Link href="/chat">
                    Chat
                    </Navbar.Link>
                    <UsernameLink />
                </Navbar.Collapse>
            </Navbar>
        </div>
        <div className="">
            {children}
        </div>
        <div className="border-t-2 border-slate-500">
          <Footer container={true} className="flex">
            <Footer.Copyright
              href="#"
              by="Chtr.ai™"
              year={2022}
            />
            <Footer.LinkGroup className="ml-auto flex gap-4">
              <Footer.Link href="/site/about">
                About
              </Footer.Link>
              <Footer.Link href="/site/licensing">
                Licensing
              </Footer.Link>
              <Footer.Link href="/site/contact">
                Contact
              </Footer.Link>
            </Footer.LinkGroup>
          </Footer>
        </div>
    </div>
    );
}
