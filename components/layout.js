import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { Navbar, Footer } from "flowbite-react";
import Image from 'next/image';
import Link from "next/link";
import {
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import logoImage from "../public/assets/logo.png";
import { chatContext, chatroomListContext } from "../context/context";
import { isUserSignedIn, SignIn, UsernameLink } from "../utils/auth";


export default function Layout ({children}) {
    const [isSignedIn, setIsSignedIn] = useState(isUserSignedIn());
    const [activeChat, setActiveChat] = useContext(chatContext);
    const [chatrooms, setChatrooms] = useContext(chatroomListContext);

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
                    height={'auto'}
                    className="mr-4"
                    alt="Chtr.ai Logo"
                    priority={true}
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
                    <Link
                    href="/"
                    >
                    Home
                    </Link>
                    <Link href="/chat">
                    Chat
                    </Link>
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
