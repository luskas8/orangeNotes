export default function removeHTMLTags(str: string) {
    return str.replace(/<[^>]*>?/gm, '');
};
