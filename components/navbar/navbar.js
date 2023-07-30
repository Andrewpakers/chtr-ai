import { useState, useRef } from "react";
import Image from 'next/image';
import Link from "next/link";
import {
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import logoImage from "../../public/assets/logo.png"
import { isUserSignedIn, SignIn, UsernameLink } from "../../utils/auth";
import ThemePicker from "./themePicker";
import ThemePickerMobile from "./themePickerMobile";

export default function Navbar() {
    const [isSignedIn, setIsSignedIn] = useState(isUserSignedIn());
    const themePickerRef = useRef(null);

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
                <div className="p-2 btn-secondary rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 btn-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </div>
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
                <li key={4}>
                  <a className="text-base-content" onClick={()=> document.getElementById(`themes-modal`).classList.add('modal-open')}>Themes</a>
                </li>
                <li key={5}>
                  <Link 
                  href="https://github.com/Andrewpakers/chtr-ai"
                  className="text-base-content"
                  >
                  GitHub
                  </Link>
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
          <dialog id={`themes-modal`} className="modal modal-bottom sm:modal-middle">
            <form method="dialog" className="modal-box">
            <button onClick={() => document.getElementById(`themes-modal`).classList.remove('modal-open')} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                <div className="modal-action flex overflow-hidden flex-wrap items-center justify-center">
                <ThemePickerMobile />
                </div>
            </form>
            <form method="dialog" className="modal-backdrop">
                <button onClick={() => document.getElementById(`themes-modal`).classList.remove('modal-open')}>close</button>
            </form>
        </dialog>
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
              <UsernameLink />
              <li key={7}>
                <ThemePicker />
              </li>
              <li key={8}>
                <Link 
                  href="https://github.com/Andrewpakers/chtr-ai"
                  className="text-base-content"
                  >
                  GitHub
                </Link>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <SignIn isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn}>Sign In</SignIn>
          </div>
        </div>
    );
}