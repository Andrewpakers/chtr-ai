import { ThemeContext } from "../../context/themeContext";
import * as Themes from "../../styles/themes/themes"
import { useContext } from "react";

export default function ThemePicker() {
    const { setTheme } = useContext(ThemeContext);

    return (
        <div className="dropdown">
            <div
                tabIndex={1}
                className="flex flex-row justify-center items-center gap-2 btn btn-ghost hover:bg-transparent"
            >
                <svg
                width="18"
                height="18"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 md:h-6 md:w-6 stroke-base-content"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                ></path>
                </svg>
                <span className="text-base-content">Themes</span>
            </div>

            <ul
                tabIndex={1}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-52"
            >
                {Object.keys(Themes).map((key) => {
                return (
                    <li key={key} onClick={() => setTheme(key)}>
                    <a className="capitalize text-base-content">{key}</a>
                    </li>
                );
                })}
            </ul>
        </div>
    );
}