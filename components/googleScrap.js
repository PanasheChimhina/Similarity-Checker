module.exports = class scrapper {
    async searcher(textScruit) {
        for (let j = 0; j < textScruit.length; j++) {
            const check = await search(textScruit[j])

            //console.log(check)
            if (check.length > 0) {
                report['plagiarisedText'].push({ text: textScruit[j], url: check[0].url });
                report.plagiarised += 1
            }
            else {
                report.unplagiarised.push(textScruit[j])
            }
        }
    }
}