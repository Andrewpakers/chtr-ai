import { ThemeContext } from "../../context/themeContext";
import * as Themes from "../../styles/themes/themes"
import { useContext } from "react";

export default function ThemePickerMobile() {
    const { setTheme } = useContext(ThemeContext);
    

    const themeList = Object.keys(Themes).map((key) => {
        return (
            <button className="" key={key} onClick={() => setTheme(key)}>
            <a className="capitalize text-base-content">{key}</a>
            </button>
        );
        })
    return themeList
}