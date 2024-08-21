export function convertToEmbedURL(url: string) {
    let embedURL = url;

    // Regular expressions to extract video IDs or map parameters
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/;
    const googleMapsRegex = /(?:https?:\/\/)?(?:www\.)?google\.com\/maps\/(?:place\/|search\/)?([^\/]+)\/?(@[^\/]+)?/;

    if (youtubeRegex.test(url)) {
        const match = url.match(youtubeRegex);
        if (match && match[1]) {
            embedURL = `https://www.youtube.com/embed/${match[1]}`;
        }
    } else if (googleMapsRegex.test(url)) {
        const match = url.match(googleMapsRegex);
        if (match && match[1]) {
            embedURL = `https://www.google.com/maps/embed/v1/place?q=${match[1]}${match[2] ? match[2] : ''}&key=YOUR_API_KEY`;
        }
    }

    return embedURL;
}