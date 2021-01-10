const { customAlphabet } =require('nanoid');
var alphabet ='1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nanoid = customAlphabet(alphabet, 6)

const isNanoId=(id) => {
    if (!id || typeof id !== 'string' || id.length < 4 ) {
        return false;
    }

    var nonAlphabetic = new RegExp('[^' +
      alphabet.replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&') +
    ']');
    return !nonAlphabetic.test(id);
}



exports.isNanoId = isNanoId;

exports.nanoid=nanoid;