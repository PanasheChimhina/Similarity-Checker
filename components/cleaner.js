module.exports = class cleaner {
    textCleaner(text) {
        /* replace all 3 types of line breaks with a dot
        Replace all multiple white spaces with single space
        Replace all multiple dots with single dot
        separate all sentences of the paragraph
        split into array of all sentences of paragraph*/

        let cleanedSource = text.replace(/(\r\n|\n|\r)/gm, ".")
            .replace(/\s+/g, " ")
            .replace(/\.+/g, ".")
            .replace(/([.?!])\s*(?=[A-Z])/g, "$1|")
            .split("|");

        return cleanedSource
    }

}