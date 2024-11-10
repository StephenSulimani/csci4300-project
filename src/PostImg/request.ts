import axios from 'axios';

/**
 * Function to upload a Base64 encoded image to PostImages.org for storage.
 *
 * @param b64img - Base64 encoded image.
 * @returns - Promise resolving to a string representing the direct URL for the image.
 */
export default async function UploadImg(b64img: string): Promise<string> {
    try {
        const session = axios.create();

        const ts = Date.now();

        const formBody = new FormData();

        formBody.append('gallery', '');
        formBody.append('optsize', '0');
        formBody.append('expire', '0');
        formBody.append('numfiles', '1');
        formBody.append('upload_session', `${ts}`);
        formBody.append('upload_referer', 'aHR0cHM6Ly9wb3N0aW1nLmNjLw==');

        const byteCharacters = atob(b64img);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'img/jpeg' });
        formBody.append('file', blob);

        const response = await session.post(
            'https://postimages.org/json/rr',
            formBody
        );

        const img_url = response.data.url;

        const secondResp = await axios.get(img_url);

        const regex = /meta property="og:image" content="(.*?)"/;

        const match = regex.exec(secondResp.data);

        if (!match) {
            return '';
        }
        return match[1];
    } catch (error) {
        return '';
    }
}
