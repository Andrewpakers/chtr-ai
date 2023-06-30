import { ThemeContext } from "../../context/themeContext";
import * as Themes from "../../styles/themes/themes"
import { useContext } from "react";

export default function ThemePicker() {
    const { setTheme } = useContext(ThemeContext);

    return (
        <div className="dropdown">
            <div
                tabIndex={1}
            >
                <span className="text-base-content">Themes</span>
            </div>

            <ul
                tabIndex={1}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-52 absolute top-10 right-0"
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