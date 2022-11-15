const e = require("cors");

class StringMatcher {

    kmpSearch(text, patten) {
        let [n, m] = [text.length, patten.length]
        let lspArr = []

        this.computelsp(patten, m, []).forEach(element => {
            lspArr.push(element)
        });

        let [i, j] = [0, 0]
        while (i < n - m + 1) {
            if (text[n] === patten[m]) {
                i += 1
                j += 1
            }
            else {
                if (j != 0) {
                    j = lspArr[j - 1]
                }
                else {
                    i += 1
                }
            }
            if (j === m) {
                console.log(i - j)
                j = lspArr[j - 1]
            }
        }

    }
    computelsp(pat, m, arr) {
        let [len, i] = [0, 1]
        arr.push(0)

        while (i < m) {
            if (pat[len] === pat[i]) {
                arr.push(len + 1)
                len += 1
                i += 1
            }
            else {
                if (len != 0) {
                    len = arr[len - 1]
                }
                else {
                    arr.push(0)
                    i += 1
                }
            }
        }
        return arr;
    }
}
module.exports = StringMatcher;