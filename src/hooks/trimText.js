export const trimText = (text, num) => {
    let newText = '';
    if (text) {
        if (text.length > num) {
            newText = text.substr(0, num) + '...';
        } else {
            newText = text;
        }
    }

    return newText;
};