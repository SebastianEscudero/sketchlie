export const themeCheck = () => {
    const userTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const theme = userTheme || systemTheme;
    document.documentElement.classList.add(theme);
    return theme;
}

export const themeSwitch = () => {
    if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        return "light";
    }

    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    return "dark";
}