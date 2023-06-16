import { useState } from "react";
import Image from 'next/image';
import Link from "next/link";
import {
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import logoImage from "../../public/assets/logo.png"
import { isUserSignedIn, SignIn, UsernameLink } from "../../utils/auth";
import ThemePicker from "./themePicker";

export default function Navbar() {
    const [isSignedIn, setIsSignedIn] = useState(isUserSignedIn());

    onAuthStateChanged(getAuth(), (user) => {
        if (user) {
          setIsSignedIn(true);
        } else {
          setIsSignedIn(false);
        }
      });

    return (
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
                    className="text-base-content"
                    >
                    Home
                  </Link>
                </li>
                <li key={2}>
                  <Link href="/chat"
                  className="text-base-content">
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
              // priority={true}
              placeholder="blur"
              />
              <span className="self-center whitespace-nowrap text-xl font-semibold text-base-content">
              Chtr.ai
              </span>
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li key={4}>
                <Link
                href="/"
                className="text-base-content"
                >
                Home
                </Link>
              </li>
              <li key={5}>
                <Link href="/chat"
                className="text-base-content">
                Chat
                </Link>
              </li>
              <li key={6}>
                <UsernameLink />
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <ThemePicker />
            <SignIn isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn}>Sign In</SignIn>
          </div>
        </div>
    );
}