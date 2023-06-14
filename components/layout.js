import Head from "next/head";
import { useState, useEffect } from "react";
import Image from 'next/image';
import Link from "next/link";
import {
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import logoImage from "../public/assets/logo.png";
import { isUserSignedIn, SignIn, UsernameLink } from "../utils/auth";

/**
 * 
 * TODO: fix the subpages, carousel, and autoscrolling on the chat
 * 
 */
export default function Layout ({children}) {
    const [isSignedIn, setIsSignedIn] = useState(isUserSignedIn());
    const [isMounted, setIsMounted] = useState(false);

    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    });

    useEffect(() => {
      setIsMounted(true);
    }, []);

    // This prevents a hydration error by ensuring the screen isn't rendered until
    // the theme is mounted
    if (!isMounted) {
      return null
    }

    return (
    <div className="max-w-4xl mx-auto bg-transparent text-slate-950">
        <Head>
            <title>Chtr.ai</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="navbar bg-base-100 sticky top-0 z-40 border-b-2 border-secondary">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li key={1}>
                  <Link
                    href="/"
                    >
                    Home
                  </Link>
                </li>
                <li key={2}>
                  <Link href="/chat">
                  Chat
                  </Link>
                </li>
                <li key={3}>
                  <UsernameLink />
                </li>
              </ul>
            </div>
            <a className="flex" href="/">
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
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li key={4}>
                <Link
                href="/"
                >
                Home
                </Link>
              </li>
              <li key={5}>
                <Link href="/chat">
                Chat
                </Link>
              </li>
              <li key={6}>
                <UsernameLink />
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <SignIn isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn}>Sign In</SignIn>
          </div>
        </div>
        <div className="">
            {children}
        </div>
        <div className="border-t-2 border-secondary">
          <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded gap-6 py-6">
            <div className="grid grid-flow-col gap-4">
              <Link href="/site/about" className="link link-hover">About us</Link> 
              <Link href="/site/licensing" className="link link-hover">Licensing</Link> 
              <Link href="/site/contact" className="link link-hover">Contact</Link> 
            </div> 
            <div>
              <div className="grid grid-flow-col gap-4">
                <a href="https://twitter.com/AndrewPAkers"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a> 
                <a href="https://www.linkedin.com/in/andrewpakers/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg></a> 
                <a href="https://infosec.exchange/@andrewpakers"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path xmlns="http://www.w3.org/2000/svg" d="M21.327 8.566c0-4.339-2.843-5.61-2.843-5.61-1.433-.658-3.894-.935-6.451-.956h-.063c-2.557.021-5.016.298-6.45.956 0 0-2.843 1.272-2.843 5.61 0 .993-.019 2.181.012 3.441.103 4.243.778 8.425 4.701 9.463 1.809.479 3.362.579 4.612.51 2.268-.126 3.541-.809 3.541-.809l-.075-1.646s-1.621.511-3.441.449c-1.804-.062-3.707-.194-3.999-2.409a4.523 4.523 0 0 1-.04-.621s1.77.433 4.014.536c1.372.063 2.658-.08 3.965-.236 2.506-.299 4.688-1.843 4.962-3.254.434-2.223.398-5.424.398-5.424zm-3.353 5.59h-2.081V9.057c0-1.075-.452-1.62-1.357-1.62-1 0-1.501.647-1.501 1.927v2.791h-2.069V9.364c0-1.28-.501-1.927-1.502-1.927-.905 0-1.357.546-1.357 1.62v5.099H6.026V8.903c0-1.074.273-1.927.823-2.558.566-.631 1.307-.955 2.228-.955 1.065 0 1.872.409 2.405 1.228l.518.869.519-.869c.533-.819 1.34-1.228 2.405-1.228.92 0 1.662.324 2.228.955.549.631.822 1.484.822 2.558v5.253z"/></svg></a>
              </div>
            </div> 
            <div>
              <p>Copyright © 2023 - All right reserved by Chtr.ai™</p>
            </div>
          </footer>
        </div>
    </div>
    );
}
