export const themeCheck = () => {
    const userTheme = localStorage.getItem("theme");
    const defaultTheme = 'light';
    const theme = userTheme || defaultTheme;
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

export function setCursorWithFill(svgUrl: any, fillColor: any, x: any, y: any) {
    fetch(svgUrl)
        .then(response => response.text())
        .then(svgText => {
            // Replace the fill color in the SVG text
            const updatedSvgText = svgText.replace(/stroke="[^"]*"/g, `stroke="${fillColor}"`);
            const svgBlob = new Blob([updatedSvgText], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(svgBlob);
            // Set the cursor
            document.body.style.cursor = `url(${url}) ${x} ${y}, auto`;
        })
        .catch(error => console.error('Error setting the cursor:', error));
}

export const themeColors = {
    light: "#E5C100",
    dark: "#5A7DFF",
};