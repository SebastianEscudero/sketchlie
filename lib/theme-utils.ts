export const updateThemeColor = (theme: 'light' | 'dark') => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
        const newMeta = document.createElement('meta');
        newMeta.name = 'theme-color';
        document.head.appendChild(newMeta);
    }
    
    const color = theme === 'dark' ? '#101011' : '#F9FAFB';
    meta?.setAttribute('content', color);
};

export const themeCheck = () => {
    const userTheme = localStorage.getItem("theme");
    const defaultTheme = 'light';
    const theme = userTheme || defaultTheme;
    document.documentElement.classList.add(theme);
    updateThemeColor(theme as 'light' | 'dark');
    return theme;
}

export const themeSwitch = () => {
    if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        updateThemeColor('light');
        return "light";
    }

    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    updateThemeColor('dark');
    return "dark";
}

export function setCursorWithFill(svgUrl: string, fillColor: string, x: number, y: number): Promise<string> {
    return fetch(svgUrl)
        .then(response => response.text())
        .then(svgText => {
            // Replace the stroke color in the SVG text
            const updatedSvgText = svgText.replace(/stroke="currentColor"/g, `stroke="${fillColor}"`);
            // Encode the SVG for use in CSS
            const encodedSvg = encodeURIComponent(updatedSvgText);
            // Return the cursor style
            return `url("data:image/svg+xml,${encodedSvg}") ${x} ${y}, auto`;
        })
        .catch(error => {
            console.error('Error setting the cursor:', error);
            return 'default'; // Fallback cursor
        });
}

export const themeColors = {
    light: "#E5C100",
    dark: "#5A7DFF",
};